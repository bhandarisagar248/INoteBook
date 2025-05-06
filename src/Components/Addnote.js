import React,{useContext, useState} from "react";
import { useLocation } from 'react-router-dom';
import NoteContext from "../context/noteContext";
import Notes from "./Notes";

const Addnote=()=>{

    const context= useContext(NoteContext);


    //uselocation is used to retrieve data from the useNavigation()

    const location=useLocation();
    const user=location.state?.user;//safely get user
    const auth_Token=location.state?.auth_Token;//safely get auth token



    const {addNote}=context;

    const [note,setNote]=useState({title:"",tag:"",description:""});
    
    //to handle the addnotes button
    const handleClick = (e) => {
        e.preventDefault(); // 🔴 prevent page reload
        const { title, description, tag } = note;
    
        if (!title.trim() || !description.trim()) {
          alert("Title and Description are required.");
          return;
        }
    
        addNote(title, description, tag); // ✅ send separate values
        setNote({ title: "", tag: "", description: "" }); // reset form
      };
    
    
    //function to handle the changes to the  input note
    const onChange=(e)=>{
        

        setNote({...note,[e.target.name]:e.target.value});
    





    }




return (
<>
<div>
      <h1>Welcome {user?.name}!</h1>
      <p>Your email: {user?.email}</p>
      <p>Your Authentication Token is:{auth_Token}</p>
    </div>




{/* <div className="container" style={{display:'flex',alignItems:"center",justifyContent:'center'}}>

<div className="mx-5 container" style={{width:'50%' ,display:'flex',flexDirection:'column',alignItems: 'center', color:'white', backgroundColor:' #0093E9',backgroundImage:'linear-gradient(160deg, #003366 31%, #2877b1 100%)',borderRadius:'5.375rem'}}>

<h2 className="text-center mt-4">Add Notes</h2>

<form style={{width:'80%'}}>
  <div className="mb-3">
    <div id="emailHelp" style={{color:'#4dad80',textAlign:'center'}} className="form-text container">We'll never share your notes with anyone else.</div>
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" onChange={onChange} id="title" name="title" aria-describedby="emailHelp" required minLength={3}/>
    <div id="emailHelp" style={{color:'#c04a55'}} className="form-text">* Title is required.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange} id="tag"  name="tag" aria-describedby="emailHelp" required minLength={3}/>
    <div id="emailHelp" style={{color:'#c04a55'}} className="form-text">* Tag is required.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea type="text" className="form-control" onChange={onChange} id="description" name="description" required minLength={3}/>  

    <div id="emailHelp" style={{color:'#c04a55'}} className="form-text">* Description is required.</div>
  </div>
  <button  disabled={note.title.length<3 || note.description.length<3 || note.tag.length<3}type="submit" style={{marginBottom:'0.85rem',backgroundColor:'#0c6eff', height:'45px'}} className="btn btn-primary" onClick={handleClick}>Add note</button>
</form>

</div>
</div> */}

<Notes />

</>

)




}

export default Addnote;