const supbase = require('../config/supbase');
const {validatorURL} = require('../services/validator')
const {ConditionEnum, CurrencyEnum, MarketplaceEnum} = require('../utils/Enums');

//Retrieve all approved and non-expired listings with their associated links and character information
const getListings = async (req, res) => {
    try {
        const {data, error} = await supbase.from('listings')
        .select(`
            *, 
                listing_links(*), 
                listing_characters(
                    condition,
                    character_collections(
                        characters(
                            name
                        ),
                        collections(
                            name
                        )
                    )
                )
            `)
        .eq('approved', true)// verify if the listing is approved
        .or('expires_at.is.null,expires_at.gt.now()')//verify if the listing is not expired
        .order('created_at', { ascending: false })

        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//Retrieve all listings based on character, collection, and generation filters with their associated links and character information

const getListingsFilters = async (req, res) => {
    try {
        const { idCharacter, idCollection, generation } = req.query;
        // Build the query with the necessary filters
        let query =  supbase.from('listings')
            .select(`
            *, 
                listing_links(*), 
                listing_characters(
                    condition,
                    character_collections(
                        characters(
                            name
                        ),
                        collections(
                            name
                        )
                    )
                )
            `)
            .eq('approved', true)// verify if the listing is approved
            .or('expires_at.is.null,expires_at.gt.now()')//verify if the listing is not expired
            .order('created_at', { ascending: false })
            // Apply filters based on the presence of query parameters
            if(idCharacter)query = query.eq("id", idCharacter);
            
            if (idCollection) query = query.eq("collection", idCollection);

            if (generation) query = query.eq("generation", generation);
        // Execute the query and handle the response
        const { data, error } = await query;
        // Handle any errors that occur during the query execution
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//Create a new listing with validation, expiration handling, and associated links and character information
const createListing = async (req, res) => {
    try {
        // Get today's date and set the time to the start of the day
        const today = new Date();
        today.setHours(0,0,0,0); // Set time to the start of the day for accurate comparison

        // Extract listing details from the request body
        const { 
            title, description, price, currency, image_url,  
            characters, condition, id_collection,
            urls, marketplaces
        } = req.body;

        //validate urls
        if(!urls||urls.length === 0){
            return res.status(400).json({ error: 'At least one URL is required' });
        }

        // Validate each URL
        for (const url of urls) {   
            if (!validatorURL(url)) {
                return res.status(400).json({ error: `Invalid URL: ${url}` });
            }
        }

        //count the number of approved listings
        const {count} = await supbase.from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('approved', true)
        .gte('created_at', today.toISOString())
        .not('expires_at', 'is', null)
        //verify if there are not more of 5 listenings 
        if (count >= 5) {
            return res.status(409).json({ message: 'Its a personal project. we are limited to 5 approved listings at a time.' ,error: 'Maximum number of approved listings reached. Please try again later.' });
        }        
        // Calculate the expiration date (7 days from now)
        const expiresAtDate = new Date(today.setDate(today.getDate() +7));

        // Insert the new listing into the database
        const { data: listingData, error: listingError } = await supbase
            .from('listings')
            .insert({
                title,
                description,
                price,
                currency: CurrencyEnum[currency] || 'USD',
                expires_at: expiresAtDate.toISOString(), // Store the expiration date in ISO format
                image_url,
            }).select().single();
        
        // Get the ID of the newly created listing
        if(listingError) throw listingError;

        const listingId = listingData.id;  
        // Prepare the links to be inserted into the database
        const linksToInsert = urls.map((url, index) => ({
            url,
            marketplace: MarketplaceEnum[marketplaces[index]] || 'Unknown',
            listing_id: listingId,
        }));

        //Insert the associated links into the database
        const { error: linksError } = await supbase
        .from('listing_links')
        .insert(linksToInsert)

        if (linksError) throw linksError;

        //Insert the associated listing_characters into the database
        const { data: listingCharactersData, error: listingCharactersError } = await supbase
            .from('listing_characters')
            .insert(
                characters.map((character) => ({
                    listing_id: listingId,
                    condition: ConditionEnum[character.condition],
                    character_collection_id: character.id_collection,
                }))
            );
        if (listingCharactersError) throw listingCharactersError;
        res.status(201).json({ message: 'Publicación creada', id: listingId })

    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getListings, createListing, getListingsFilters };