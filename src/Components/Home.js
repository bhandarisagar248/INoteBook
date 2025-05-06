import React ,{useContext,useEffect, useState,useRef} from "react";
import "../Home.css"
import { useLocation,useNavigate,Link} from "react-router-dom";
import NoteContext from "../context/noteContext";


const Home = () => {

  const { initialNotes } = useContext(NoteContext);
  const navigate=useNavigate();

  const location=useLocation();
  const user=location.state?.user;
  const user_photo=location.state?.photo;
    
  
  useEffect(() => {
    const fetchNotes = async() => {
          if (localStorage.getItem('auth_token')) {
            await initialNotes();
          } else {
            navigate('/login');
          }


          
          if(localStorage.getItem('No_Notes')){

            var Number_Notes=localStorage.getItem('No_Notes');
            localStorage.setItem("Number_Notes",Number_Notes);
        }
        else{
          navigate('/login');

        
        }

  // Only set once if not already saved
  if (!localStorage.getItem("user_data_saved") && user) {
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("id", user.id);
    
  // After getting the photo data from the backend
if (user_photo?.data && user_photo?.contentType) {
  // Stringify the photo object before saving to localStorage
  localStorage.setItem('photo', JSON.stringify(user_photo));
}
    
    localStorage.setItem("date", user.date);
    localStorage.setItem("user_data_saved", "true"); // set flag

  }

        };
        fetchNotes();
        initialNotes();
      }, []);

      // if (user?.photo) {
      //   localStorage.setItem('photo', JSON.stringify(user.photo));
      // }
      
      // console.log("user.photo:", localStorage.getItem('photo'));


//to change and store photo to the mongodb
      const [isEditing, setIsEditing] = useState(false);

      //file refrence to trigger input field when the button is clicked
      const fileInputRef = useRef();


  const[photo,setphoto]=useState(null);
  const[preview,setpreview]=useState("");

//to handle function to change photo
  const handlePhotoChange=(e)=>{

    const file=e.target.files[0];
    setphoto(file);
    setpreview(URL.createObjectURL(file)); // Preview

  }

;

  //setting the refrence of the input filed for the button
  const triggerFileInput = () => {
    fileInputRef.current.click();
     //setting photoediting
     setIsEditing(true);
  };


  const handlephotoUpload=async ()=>{
const formdata=new FormData();

//appending id and form to the body to send to the backend
formdata.append('photo',photo);   //photo must match the backend filed
formdata.append('_id',localStorage.getItem("id"));

setIsEditing(false);
//api request to backend

try{

  const response=await fetch("http://localhost:5000/api/auth/upload-photo",{
    method: "POST",
    credentials:'include',
    headers: {
      'Authorization': `${localStorage.getItem('auth_token')}`
      // Don't set 'Content-Type' manually!
    },
    body: formdata
  });
  
  const data = await response.json();

  if (response.ok) {
    alert("Photo Upload Success");

  console.log(data.photo);



    // //accessing user after updating the photo to get all photo details

    // const response1 = await fetch('http://localhost:5000/api/auth/getuser', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: localStorage.getItem('auth_token'),
    //   },
    //   body:JSON.stringify({
    //     password:'sagar123',
    //   })
    // });
    // const updatedUser = await response1.json();
    // localStorage.setItem('photo', JSON.stringify(updatedUser.photo));

    // console.log("User Photo from get users:"+localStorage.getItem('photo'));


  } else {
    console.error("Upload failed:", data);
    alert("Upload failed: " + (data?.message || "Unknown error"));
  }
} catch (error) {
  console.error("Error uploading photo:", error);
  alert("Something went wrong while uploading.");
}
};


  // //to print photo
 // Retrieve the photo object from localStorage
const photoObjString = localStorage.getItem('photo');
let photoObj = null;

// Check if the photo object exists and is a valid string
if (photoObjString) {
  try {
    // Try to parse the string to an object
    photoObj = JSON.parse(photoObjString);
  } catch (error) {
    console.error("Error parsing photo object:", error);
  }
}
// Construct the photo source URL if the photo object exists
const photoSrc = photoObj?.data && photoObj?.contentType
  ? `data:${photoObj.contentType};base64,${photoObj.data}`
  : null;
console.log(localStorage.getItem('photo'));
console.log(photoSrc);

//function to get the clean photo src
const getCleanPhotoSrc = (src) => {
  if (!src) return '';
  return src.startsWith('Photo:') ? src.replace('Photo:', '') : src;
};



  
  return (
    <>

      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="profilecard card p-4">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <div className="btn btn2 btn-secondary" id="btn2" style={{display:'flex',alignItems:'center', position:'relative',justifyContent:'center',alignItems:'center'}}>
              {" "}
              <img src={preview || getCleanPhotoSrc(photoSrc) || "https://i.imgur.com/wvxPV9S.png"} height="120" width="120" alt="profile" style={{height:'120px !important',width:'120px !important',borderRadius:'50%'}} />


              {!isEditing ? (
              

            <button onClick={triggerFileInput} className="btn" style={{background: '#efefef',borderRadius:'50%',padding:'0.2rem 0.3rem',fontSize:'1.3rem', position:'absolute', right:'10px', bottom:"1px"}}>
          <i className="bi bi-file-image-fill" style={{color: 'green', scale:'1.1'}}></i>
            </button>
              )
            :
            (
            <button  onClick={handlephotoUpload} className="btn btn-outline-primary" style={{background: '#efefef',borderRadius:'25%',fontSize:'1.3rem', position:'absolute', right:'-30px', bottom:"-7px",width:'41px', height:'41px',display:'flex', alignItems:"center",justifyContent:"center"}}>
          <i className="bi bi-cloud-upload-fill" style={{color: 'blue', scale:'1.1'}}></i>
            </button>

            )
                }
            </div>
                <input type="file"  ref={fileInputRef}accept="image/*" hidden onChange={handlePhotoChange} />
            <span className="name mt-3">{localStorage.getItem('name')}</span>{" "}
            <span className="idd">{localStorage.getItem('email')}</span>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd">{localStorage.getItem('id')}</span>
            <span  style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(localStorage.getItem('id') );
                                        alert("User id copied to clipboard!"); }}>
 
                <i className="fa fa-copy"></i>
              </span>{" "}
              </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <span className="idd1"><strong>Token:</strong> {localStorage.getItem('auth_token')}</span>
              <span  style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(localStorage.getItem('auth_token'));
                                        alert("Auth token copied to clipboard!"); }}>
 
                <i className="fa fa-copy"></i>
              </span>{" "}
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              <span className="number">
                {localStorage.getItem('Number_Notes') ? localStorage.getItem('Number_Notes') : "0"} <span className="follow">Notes</span>
              </span>{" "}
            </div>
            <Link to="/notes"><div className=" d-flex mt-2">
              {" "}
           <button className="btn1 btn-dark">View Notes</button>{" "}
            </div></Link>
            <div className="text mt-3">
              {" "}
              <span>
                Eleanor Pena is a creator of minimalistic x bold graphics and
                digital artwork.
                <br /> Artist/ Creative Director by Day #NFT minting@ with FND
                night.{" "}
              </span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              {" "}
              <span>
                <i className="fa fa-twitter"></i>
              </span>
              <span>
                <i className="fa fa-facebook-f"></i>
              </span>{" "}
              <span>
                <i className="fa fa-instagram"></i>
              </span>
              <span>
                <i className="fa fa-linkedin"></i>
              </span>{" "}
            </div>
            <div className=" px-2 rounded mt-4 date ">
              <span className="join">Joined {new Date(localStorage.getItem('date')).toDateString()}</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;


