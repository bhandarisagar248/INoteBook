import './App.css';
import Navbar from './Components/Navbar.js';
import Addnote from'./Components/Addnote.js';
import About from './Components/About.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/NoteState.js';
import LoginSignup from './Components/LoginSignup.jsx';
import Notes from './Components/Notes.js';
import Alert from './Components/Alert.js';
import { useState } from 'react';
import Home from './Components/Home.js';
function App() {
const [isdelete,setdelete]=useState("danger");

const [isconfirm,setconfirm]=useState(false);



  
  return (
    
  <>

  <NoteState>



<Navbar />

<Alert success={isdelete} updatedelete={setdelete} cancel={isconfirm} confirm={setconfirm}/>
  



<Routes>

  <Route exact path='/' element={<Home />} />

  <Route exact path='/notes/*' element={<Notes />}/>

  <Route exact path="/createnote" element={<Addnote />}/>

 <Route exact path='/about' element={<About></About>} /> 

 <Route exact path='/signup' element={<LoginSignup setIsLogin={false} />} />

 <Route exact path='/login' element={<LoginSignup setIsLogin={true} />}/>
  
</Routes>
  </NoteState>
  </>
  );
}

export default App;
