import { Routes, Route } from 'react-router-dom'
import CreateListing from './pages/CreateListing'
import Testing from './pages/Testing'

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Testing />} />
       <Route path="/create-listing" element={<CreateListing />} />
    </Routes>
  )
}

export default App
