import React, { useState,useEffect,useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import NoteContext from "./noteContext";
import Notes from "../Components/Notes";
import Alert from "../Components/Alert";


//creating a notestate and sending to the NoteContext provider
const NoteState=(props)=>{

  
  //useNavigate is use to redirect to another page after successfully login
  const navigate = useNavigate(); // initialize navigation
  
  const [notes,setnotes]=useState([]);

  var email;
  const [auth_Token, setAuthToken] = useState('');


  var token;


  const [alertMessage, setAlertMessage] = useState(false);

  
  const [pendingDeleteId, setPendingDeleteId] = useState();
  
  const [alert_type,setalert_type]=useState('danger');




  var allnotes;
  const host="http://localhost:5000";


  //to fetch all notes of the specific user
const initialNotes= useCallback(async ()=>{

  //  Use token from either prop or localStorage
   const token1=(localStorage.getItem('auth_token'))? localStorage.getItem('auth_token') :token;
  
   if (!token1) {
     console.error('No token available for API call');
     return;
   }
  const response = await fetch(`${host}/notes/getnotes`, {
    method: "POST",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json",
      "Authorization": `${token1}`
    },
    body: JSON.stringify({

     }),
    // ...
  });

  if(response.ok){
const data=await response.json();
 allnotes=data.notes;
// console.log(allnotes);
setnotes(data.notes);
setAuthToken(auth_Token);

//storing the no of notes 
localStorage.setItem('No_Notes',data.notes.length);

  }
  else{
    console.log("Unable to fetch the data",response.status);
  }


},
[]);


// //it act as the componentdidmount() to initally fetch the data
useEffect(() => {
  let token_test = localStorage.getItem('auth_token');
  if (token_test) {
    initialNotes();
  }

// <-- CALL the function when component mounts
},[]); // empty dependency array means it runs only once




    

    

    


//function to add notes
const addNote = async (title, description, tag,) => {


  const token1 = localStorage.getItem('auth_token');
  //api call to add note
  if(!token1){
    console.log("No token to added new Notes");
  }

  const response = await fetch(`${host}/notes/addnotes`, {
    method: "POST",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json",
      "Authorization": `${token1}`
    },
    body: JSON.stringify({
      title:title,
      tag:tag,
      description:description

     }),
    // ...
  });
  

  if(response.ok){

    const note = {
      _id: Math.random().toString(36).substr(2, 9), // fake unique id
      user: "6807039a4c516ec1acd60895", // you can replace this with the actual user ID
      title,
      description,
      tag,
      date: new Date().toISOString()
      // __v: 0
    };

    setnotes(notes.concat(note));
    await initialNotes();
  }
};



//function to editnote
const editNote=async (id,title,tag,description)=>{


  const token1 = localStorage.getItem('auth_token');
  
  if (!token1) {
    console.error('No token available for deletion');
    return;
  }

  // api call for update the notes

  const response = await fetch(`${host}/notes/update`, {
    method: "PUT",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json",
      "Authorization":`${token1}`,
    },
    body: JSON.stringify({
      credentials:'default',
       id:id,
       title:title,
       tag:tag,
       description:description

     }),
    // ...
  });
  const result=response.json();
  return result;
    

}



//function to store the id of note to be delete
const deleteNote=(id)=>{


  setalert_type('danger')

  setPendingDeleteId(id); // store the note id waiting for confirmation
  setAlertMessage("Are you sure you want to delete this note?");


};


//function to cancel delete 
const cancelDelete = () => {
  setPendingDeleteId(null); // Clear pending delete ID
  setAlertMessage(false); // Dismiss alert
};



//to delete note when only confirm deletion is clicked 
const ConfirmDeleteNote=async()=>{
  

  const token1 = localStorage.getItem('auth_token'); // Get token from state or localStorage
  
  if (!token1) {
    console.error('No token available for deletion');
    return;
  }
  if (!pendingDeleteId){
    return;
  } 
    
  
  // api call for deletion
  const response = await fetch(`${host}/notes/delete`, {
    method: "DELETE",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json",
      "Authorization":`${token1}`
    },
    body: JSON.stringify({
      _id:pendingDeleteId
      
      
    }),
    // ...
  });
  
  setalert_type('success');

  
  const NewNotes=notes.filter((note)=>
    note._id!==pendingDeleteId);
  setnotes(NewNotes);

//setting color of alert to green

  // Clear pending
  setPendingDeleteId(null);
  
  // Success alert
  setAlertMessage("Note deleted successfully!");

  setTimeout(() => {
    setAlertMessage(false);
  }, 3000);

  navigate('/notes' ,{state:{setalert_type:alert_type}});
};


//to handle login 
const HandleLogin=async ()=>{
    email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
   var password_error=document.getElementById('password_error');

   if(!email){
    alert("Email is require");
    return false;
   }

   if(!password){
    alert("Password is required");
    return false;//to prevent form from submission

   }

//api call for login
  const response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email:`${email}`,
      password:`${password}`,

     }),
     


  
  });

  if(response.ok){
    const data=await response.json();

    setAuthToken(data.auth_Token);
    
    // Save to localStorage

    // Check the length of the token before storing it
token = localStorage.getItem('auth_token');
if (token && token.length > 300) { // Assuming 5000 characters is too large
    console.warn("The token is too large to store in localStorage!");
} else {
    localStorage.setItem('auth_token', data.auth_Token);
}


    // navigate('/notes',{state:{user:data.user,auth_Token:data.auth_Token}});
    navigate('/',{state:{user:data.user,auth_Token:data.auth_Token,photo:data.photo}});

      }
      else{
        password_error.innerHTML="* Email or Password is incorrect.";
        console.log("Unable to fetch the data",response.status);
      }

   }





//to handle signup user registration
 const HandleSignup= async()=>{

var name=document.getElementById('name').value;
var email=document.getElementById('email_sign').value;
var address=document.getElementById('address').value;
var password=document.getElementById('password-sign').value;
var confirmpassword=document.getElementById('confirmpassword').value;

if(!name){
  alert("Name is required");
  return false;//which prevent the form submission
}

if(!email){
  alert("Email is required");
  return false;
}

if(!address){
  alert("Address is required");
  return false;
}
if(!password ){
  alert("Password is required.")
  return false;

}

if(password.length<8){
  alert("Password length should be Minimum 8");
  return false;
}

if(!confirmpassword){
  alert("Please! Enter confirm Password");
  return false;
}

if(confirmpassword!==password){
  alert("Confirm Password doesn't match !");
  return false;
}


//apicall to register user in database

const response = await fetch(`${host}/api/auth/createUser`, {
  method: "POST",
  credentials:'include',
  headers: {
    "Accept":"*/*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name:`${name}`,
    address:`${address}`,
    email:`${email}`,
    password:`${password}`,

   }),

});

if(response.ok){
  const data=await response.json();


  setAuthToken(data.auth_Token);

    // Save to localStorage
    localStorage.setItem('auth_token',data.auth_Token);
localStorage.setItem('user', JSON.stringify(data.user));

token=localStorage.getItem('auth_token');
  
  // to navigate to home after success login with user details
  navigate('/',{state:{user:data.user,auth_Token:data.auth_Token}});
    }

    else{
      console.log("Unable to register User",response.status);
    }

 

 }  


  









    return(

<NoteContext.Provider value={{notes,setnotes,addNote,editNote,deleteNote,ConfirmDeleteNote,HandleLogin,HandleSignup,initialNotes,alertMessage, setAlertMessage,cancelDelete,alert_type,setalert_type,setPendingDeleteId,auth_Token }}>

{props.children}
    
</NoteContext.Provider>


    );
   




    
  }

export default NoteState;