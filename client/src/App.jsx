import { useState, useEffect } from 'react'
import { supabase } from './config/superbaseClient';

function App() {
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

  return (
    <>
      <div>
      <h1>Monster High Finder</h1>
      {characters.map(c => (
        <p key={c.id}>{c.name}</p>
      ))}
    </div>
    </>
  )
}

export default App
