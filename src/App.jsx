import Register from "./Register"
import SignUp from './SignUp.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Register />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
