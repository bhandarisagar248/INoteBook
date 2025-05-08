import React ,{useContext, useState}from "react";
import "../Login-signup.css"; // Your CSS
import NoteContext from "../context/noteContext";

const Login_Signup = (props) => {
  const [isLogin, setIsLogin] = useState(props.setIsLogin);


  const context=useContext(NoteContext)
  const {HandleLogin,HandleSignup}=context

  const handleLoginClick = () => setIsLogin(true);
  // const handleSignupClick = () => setIsLogin(false);
  const handleSignupClick = () =>setIsLogin(false);
  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setIsLogin(false);
  };

  return (
    <div className="wrapper container my-5">
      <div className="title-text" style={{ marginLeft: isLogin ? "0%" : "-100%" }}>
        <div className="title login">Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>

      <div className="form-container">
        <div className="slide-controls">
          <label className="slide login"  style={{ color: isLogin ? "#fff" : "#000" }}  onClick={handleLoginClick}>Login</label>
          <label className="slide signup" style={{color: isLogin ? "#000" :"#fff"}} onClick={handleSignupClick}>Signup</label>
          <div className="slider-tab" style={{ left: isLogin ? "0%" : "50%" }}></div>
        </div>

        <div className="form-inner" style={{ marginLeft: isLogin ? "0%" : "-100%" }}>
          {/* Login Form */}
          <form className="login" action={HandleLogin}>
            <div className="field">
              <input type="email" id="email" name="email" placeholder="Email Address" required />
              {/* <div id="email_error" name="email_error" style={{color:'#c04a55'}} className="form-text my-2"></div> */}
            </div>
            <div className="field">
              <input type="password" id="password" name="password" placeholder="Password" required />
              <div id="password_error" name="password_error" style={{color:'#c04a55',marginTop:'-0.1rem!important',textAlign:'center'}} className="form-text my-2"></div>
            </div>
            <div style={{marginTop:'35px',marginBottom:'-16px'}} className="pass-link"><a href="/">Forgot password?</a></div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <a href="/" onClick={handleSignupLinkClick}>Signup now</a>
            </div>
          </form>

          {/* Signup Form */}
          <form className="signup" action={HandleSignup}>
            <div className="field">
              <input type="text" id="name" name="name" placeholder="Name" required />
            </div>
            <div className="field">
              <input type="text" id="address" name="address" placeholder="Address" required />
            </div>
            <div className="field">
              <input type="email" id="email_sign" name="email_sign" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" id="password-sign"  name="password-sign" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
