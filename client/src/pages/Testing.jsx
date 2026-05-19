import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient';
import { getPattern } from '../utils/patterns';

export default function Testing() {
  const [characters,setCharacters] = useState([])
  
    //Retrieve data characters from supabase
    useEffect(()=>{
      const fetchCharacters = async()=>{
        const {data, error} = await supabase.from('characters').select('*').limit(10)
        if (error) {
          console.error('Error fetching characters:', error)
        } else {
          setCharacters(data)
        }
      }
      fetchCharacters()
    }, [])
  //Render characters with patterns (It's a simple example)
    return (
      <>
          <div>
        {characters.map(char => (
          <div key={char.name} style={{
            ...getPattern(char.pattern, char.primary_color, char.secondary_color),
            height: '100px',
            marginBottom: '10px'
          }}>
            <p style={{color: 'white', padding: '10px'}}>{char.name}</p>
          </div>
        ))}
      </div>
      </>
    )
}
