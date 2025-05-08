import {React, useEffect, useState} from "react";
import { Link ,useLocation, useNavigate} from 'react-router-dom';


const Navbar=()=>{

//creating a instance of location 
let location=useLocation();

const navigate=useNavigate();

const [logoutclicked,setLogout]=useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

//to hide login and signup after to login or signup page
const [isclicked,setclicked]=useState(false);
const HideLogin=()=>{

setclicked(true);
}



useEffect(() => {
  const token = localStorage.getItem('auth_token');
  setIsLoggedIn(token && token !== 'null' && token !== 'undefined');
}, [location]); // update on route change (covers login/logout navigation)


const HandleLogout=()=>{

  localStorage.removeItem('auth_token');

  localStorage.removeItem('No_Notes');

  //to remove session for user details when logout is clicked 
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('user_data_saved'); 
  localStorage.removeItem("date");
   localStorage.removeItem('photo');

   // Clear all localStorage data
localStorage.clear();





  setIsLoggedIn(false);
 setLogout(true);
  navigate("/login");
  window.location.reload(); // <– forces Navbar to re-evaluate token

}


return(
<>



<nav className="navbar navbar-expand-lg navbar-dark  bg-dark" style={{height:'56px'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/notes' ? "active":""}`} to="/notes">Notes</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about' ? "active":""}`} to="/about">About</Link>
        </li>
      </ul>


            {/* Conditional buttons */}
            {isLoggedIn ? (
              <button onClick={HandleLogout} className="btn btn-primary mx-2" style={{ height: '40px', width: '81.05px' }}>
                Logout
              </button>
            ) : (
              <form className="d-flex" style={{ height: '40px' }}>
                <Link to="/signup">
                  <button type="button" className="btn btn-primary mx-2" style={{ height: '40px', width: '81.05px' }}>
                    Signup
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" className="btn btn-outline-success" style={{ height: '40px', width: '81.05px' }}>
                    Login
                  </button>
                </Link>
              </form>
            )}
    
    </div>
  </div>
</nav>

</>





);



}

export default Navbar;