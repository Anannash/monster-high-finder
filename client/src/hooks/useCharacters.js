import { useEffect, useState } from "react";
import supabase from "../../../server/src/config/supbase";

const useCharacters = () => {
    
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

   

    return { characters, loading, error };

}

export default useCharacters;