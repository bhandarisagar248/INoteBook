import React ,{useContext,useEffect,useState} from "react";
import NoteContext from "../context/noteContext";
import NoteItems from "./NoteItems";
import img from '../assets/addnote.png'
import {useLocation, Link, useNavigate} from "react-router-dom";
import Alert from "./Alert";



const Notes=()=>{
  const navigate=useNavigate();
  
  const context= useContext(NoteContext);
  const { alertMessage, setAlertMessage ,ConfirmDeleteNote,cancelDelete ,alert_type} = context;
  const { initialNotes } = useContext(NoteContext);
  

  
  //defining state to hide and show the alert 
  const location=useLocation();
  const alert1=location.state?.isdelete || false;//safely get user
  const setalert_type2=location.state?.setalert_type;
  
    const auth_Token=location.state?.auth_Token;
    
    const [alert_type1,setalert_type1]=useState(alert_type);
    
    const [alert,setalert]=useState(alert1);
    
    
    //destructing of context values
    const {notes,addNote,editNote,}=context;
    
    
    
    useEffect(() => {
      const fetchNotes = async () => {
        if (localStorage.getItem('auth_token')) {
          await initialNotes();
        } else {
          navigate('/login');
        }
      };
      fetchNotes();
    }, []);

    //logic for adding new notes container
    
        const [note,setNote]=useState({title:"",tag:"",description:""});

        //to hide and show the add container 
        const [clicked,setclicked]=useState(true);

        const Show_Add=()=>{
          
         setclicked(false)

        }
        const Hide_Add=()=>{
          setclicked(true);
        }
        
        //to handle the addnotes button
        const handleClick = (e) => {
            e.preventDefault(); // 🔴 prevent page reload

            //calling hide_add note
            Hide_Add();

            //to show alert when the note is added 
              // Success alert
              setalert_type1('success');
        setAlertMessage("Note Added Successfully!");


        setTimeout(() => {
         setAlertMessage(false);
        }, 3000);
        

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
    
    
    
    const [id, setid] = useState('');
    const [title, settitle] = useState('');
    const [tag, settag] = useState('');
    const [description, setdescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const handleButtonClick = (id,title,tag,description) => {
      setid({
        id:id
      });


      settitle({
        title:title
      });
      settag({
        tag:tag
      });

      setdescription({
        description:description
      });


      // console.log(setid);
      // console.log(settitle);
      // console.log(settag);
      // console.log(setdescription);
 

      setShowModal(true);
      document.body.style.overflow = 'hidden'; //disable scrolling 



    };


    

      //to make apin call using editnotes from usecontext api
const ConfirmUpdate= async()=>{

const data=await editNote(id.id,title.title,tag.tag,description.description)
  if(data){

  
  //it act as the componentdidmount() to initally fetch the data


  

   await initialNotes(); // <-- CALL the function when component mounts
// empty dependency array means it runs only once
    


    //to hide the model after success update
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Enable scrolling again

    setalert_type1("success");
  
  // Success alert
  

  setAlertMessage("Note Updated successfully!");

  setTimeout(() => {
    setAlertMessage(false);
  }, 3000);
  setalert_type1("danger");
  navigate('/notes',{state:{setalert_type:'danger'}});
  }
  
  else{
    console.log("Some error occur while updating");
  }

}

  
    //function to handle edit button ;
  
    const handleClose = () => {
      setShowModal(false);
      document.body.style.overflow = 'auto'; // Enable scrolling again

    };
  
    

return(
<>





        {/* Trigger button */}
        {/* <button 
          onClick={() => handleButtonClick('John Doe')}
          className="btn btn-primary"
        >
          Open Modal
        </button> */}
  
        {/* Modal */}
        {showModal && (
          <>

<div
className="modal-backdrop"
style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent dark
  zIndex: 1040
}}
></div>



          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Title:{title.title}</h5>
                </div>
                <div className="modal-body">
                  <label htmlFor="new_title">Title</label>
                  <input 
                    type="text" id="new_title" name="new_title"
                    className="form-control" 
                    value={title.title}
                    onChange={(e) => settitle({title:e.target.value})}
                  />
                </div>
                <div className="modal-body">
                  <label htmlFor="new_tag">Tag</label>
                  <input 
                    type="text" id="new_tag" name="new_tage"
                    className="form-control" 
                    value={tag.tag}
                    onChange={(e) => settag({tag:e.target.value})}
                  />
                </div>
                <div className="modal-body">
                  <label htmlFor="new_description">Description</label>
                  <textarea 
                    type="text" id="new_description" name="new_description" 
                    className="form-control" 
                    value={description.description}
                    onChange={(e) => setdescription({description:e.target.value})}
                  />
                </div>
                <div className="modal-footer">
                <button onClick={handleClose} style={{backgroundColor:'', borderRadius:'1.375rem'}}  className="btn btn-danger mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg></button>
                  <button type="button" onClick={ConfirmUpdate}style={{backgroundColor:'#3a7ee3', borderRadius:'1.375rem'}}  className="btn btn-primary mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                         <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
                           </svg></button>

                </div>
              </div>
            </div>
          </div>
          </>
        )}

<Alert 
  cancel={alertMessage} 
  setalert={setAlertMessage} 
  onConfirm={ConfirmDeleteNote} 
  onCancel={cancelDelete}
  alert_type={alert_type1}
/>





<Link to="/notes" onClick={Show_Add} hidden={notes.length===0 ? true:false}><button onClick={Show_Add} type="button" className="btn btn_danger" style={{position:'sticky',top:'82vh',left:'91.5vw',background:'ghostwhite',borderRadius:'1.2rem',padding:'3px',paddingRight:'0px'}}>
       <img src={img} height={"65px"} width={"65px"} alt="Image"></img>
  </button></Link>


{/* to display no notes found when there is no notes */}

<div hidden={notes.length===0 ? false:true} className="container my-4" style={{textAlign:'center',color:'white',fontSize:'20px', fontWeight:'500', position:'relative'}}>
  
 {notes.length===0 && "No Notes to Display..."}
 <Link to="/notes" onClick={Show_Add}><button onClick={Show_Add} type="button" className="btn btn_danger" style={{position:'absolute',top:'12vh',left:'43.5vw',background:'ghostwhite',borderRadius:'1.2rem',padding:'3px',paddingRight:'0px'}}>
       <img src={img} height={"65px"} width={"65px"} alt="Image"></img>
  </button></Link>
<h3 className="container" style={{textAlign:'center'}}>
 Click to add Note

</h3>
</div>




{/* to display add notes container when clicked add notes */}



  <h3 className="container my-3" style={{textAlign:'center' ,color:'white',marginTop:'-2.5rem',marginBottom:'.5rem'}}>Your Notes</h3>
<div className="container" hidden={clicked} style={{display:'flex',alignItems:"center",justifyContent:'center'}}>

<div className="mx-5 container" hidden={clicked}  style={{width:'50%' ,display:'flex',flexDirection:'column',alignItems: 'center', color:'white', backgroundColor:' #0093E9',backgroundImage:'linear-gradient(160deg, #003366 31%, #2877b1 100%)',borderRadius:'5.375rem'}}>

<h2 className="text-center mt-4">Add Notes</h2>

<form style={{width:'80%'}} hidden={clicked} >
  <div className="mb-3">
    <div id="emailHelp" hidden={clicked} style={{color:'#4dad80',textAlign:'center'}} className="form-text container">We'll never share your notes with anyone else.</div>
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
    {/* background-color: #0093E9;
background-image: linear-gradient(160deg, #0093E9 31%, #80D0C7 100%); */}

    <div id="emailHelp" style={{color:'#c04a55'}} className="form-text">* Description is required.</div>
  </div>
  <button  disabled={note.title.length<3 || note.description.length<3 || note.tag.length<3}type="submit" style={{marginBottom:'0.85rem',backgroundColor:'#0c6eff', height:'45px'}} className="btn btn-primary" onClick={handleClick}>Add note</button>
</form>

</div>
</div>





  <div className="container"style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>


  {notes && notes.map((note)=>{
    
    localStorage.setItem('No_Notes',notes.length);
    
    return(




      


      <NoteItems key={note._id} note={note} handleButtonClick={handleButtonClick} initialNotes={initialNotes}/>

    )
    
    
  })}


</div>





{/* <Route exact path="/createnote" element={<Addnote/>}/> */}




</>







);












}

export default Notes;