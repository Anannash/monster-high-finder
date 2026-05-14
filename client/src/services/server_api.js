const URL_API = import.meta.env.VITE_SERVER_API_URL;

export const getListings = async () => {
    try {
        const response = await fetch(`${URL_API}/listings`);
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        return data;
    }   
    catch (error) {
        console.error('Error fetching listings:', error);
        throw error;
    }
}

export const createListing = async (listingData) => {
    try {
        const response = await fetch(`${URL_API}/listings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listingData)
        });
        if (!response.ok) {
            throw new Error('Failed to create listing');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating listing:', error);
        throw error;
    }
}
export const getListingFilters = async(idCharacter, idCollection, generation) => {
    try {
        const repsonse = await fetch(`${URL_API}/listings/filters?idCharacter=${idCharacter}&idCollection=${idCollection}&generation=${generation}`);
        if (!repsonse.ok) {
            throw new Error('Failed to fetch listings with filters');
        }
        const data = await repsonse.json();
        return data;
    } catch (error) {
        console.error('Error fetching listings with filters:', error);
        throw error;
    }
}
    
