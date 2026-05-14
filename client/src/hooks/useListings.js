import { useEffect, useState } from "react";
import { getListings, createListing, getListingFilters } from "../services/server_api"; 

const useListings =() =>{
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchListings = async () =>{
            try {
                setLoading(true); // Set loading to true before fetching data
                const data = await getListings(); // Fetch listings from the server
                setListings(data);// Update the listings state with the fetched data
            } catch (error) {
                setError(error.message);// Set error message if fetching fails
            }finally{
                setLoading(false);// Set loading to false after fetching data or if an error occurs
            }
        }
        fetchListings();
    }, []) 

    const addListing = async (listingData) => {
        try {
            setLoading(true);// Set loading to true before creating a new listing
            const newListing = await createListing(listingData); // Create a new listing on the server
            setListings(prevListings => [newListing, ...prevListings]); // Add the new listing to the existing listings state
        } catch (error) {
            setError(error.message); // Set error message if creating a new listing fails
        } finally {
            setLoading(false);// Set loading to false after creating a new listing or if an error occurs
        }   
    }

    //Fetch specific listings based on character, collection, and generation filters
     const fetchCharacter = async (id, collection, generation) => {
        
        try {
            setLoading(true);
            const data = await getListingFilters(id, collection, generation); // Fetch listings based on filters from the server
            setListings(data); // Update the listings state with the filtered data
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { listings, loading, error, addListing, fetchCharacter };
}

export default useListings;