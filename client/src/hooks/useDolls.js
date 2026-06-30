import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

const useDolls = () => {
    
    //State for characters data, loading status, and error handling
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch characters from the database when the component mounts
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.from("characters").select("*");
                if (error) throw error;
                setCharacters(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

   const getCollectionByCharacterId = async (characterId) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("character_collections")
                .select("*, collections(name, generation_id)")
                .eq("character_id", characterId);
            if (error) throw error;
            return data; // Return the collections data for the specified character ID
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
   }
    const getTypeCollection = async (generationId) =>{
        try{
            const {data, error} = await supabase
                .from("collections")
                .select("id, name")
                .eq("generation_id",generationId);
                
                if (error) throw error;
                return data; 
        }catch (error) {
            setError(error.message);
        }
    }


    return { characters, loading, error, getCollectionByCharacterId, getTypeCollection  };

}


export default useDolls;