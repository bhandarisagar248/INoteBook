import React from "react";
import { FaTrashAlt, FaTimes } from "react-icons/fa"; // Import icons from react-icons

const Alert=({ cancel,  onConfirm, onCancel,alert_type }) => {
  if (!cancel) return null;

  const isConfirmation = cancel.includes("Are you sure");

  return (
    <div
      className={`alert alert-${alert_type} d-flex flex-column justify-content-center align-items-center`}
      style={{
        height: isConfirmation ? "140px" : "60px",
        padding: "15px",
        borderRadius: "8px",
        // backgroundColor:   '#f8d7da', // Soft red color
        // color: "#721c24",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "350px",
        margin: "0 auto",
      }}
      role="alert"
    >
      <div className="alert-message" style={{ fontSize: "16px", marginBottom: "10px" }}>
        {cancel}
      </div>

      {isConfirmation && (
        <div className="d-flex justify-content-around w-100">
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={onConfirm}
            style={{
              borderRadius: "5px",
              padding: "5px 12px",
              backgroundColor: "#dc3545",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <FaTrashAlt style={{ marginRight: "5px" }} /> Confirm Delete
          </button>

          <button
            className="btn btn-secondary btn-sm d-flex align-items-center"
            onClick={onCancel}
            style={{
              borderRadius: "5px",
              padding: "5px 12px",
              backgroundColor: "#6c757d",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <FaTimes style={{ marginRight: "5px" }} /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;




// // Alert.jsx
// import React from "react";

// const Alert = ({ cancel, setalert, onConfirm }) => {
//   if (!cancel) return null;

//   const isConfirmation = cancel.includes("Are you sure");

//   return (
//     <div
//       className="alert alert-warning d-flex flex-column justify-content-center align-items-center"
//       style={{ height: isConfirmation ? "120px" : "55px", padding: "10px" }}
//       role="alert"
//     >
//       <div>{cancel}</div>

//       {isConfirmation && (
//         <button
//           className="btn btn-danger btn-sm mt-2"
//           onClick={onConfirm}
//         >
//           Confirm Delete
//         </button>
//       )}
//     </div>
//   );
// };

// export default Alert;



















// import React, { useContext, useState } from "react";
// import NoteContext from "../context/noteContext";
 

// const Alert=(props)=>{

// const context=useContext(NoteContext);
//   const {ConfirmDeleteNote}=context;


//   //function to delete and hide the alert box
//   const [success,setsuccess]=useState("danger");

//   //state to store success and danger 
  
//   const ConfirmDelete=()=>{
    
//     setsuccess("success");
//     setTimeout(() => {
//       props.setalert(false);
//     }, 2000);
//     // props.updatedelete="success";
//     // props.confirm=false;
    
// ConfirmDeleteNote();
// }

// const CancelDelete=()=>{
  
//   props.setalert(false);
    
//   }

  
// return(

// <>



// <div hidden={props.cancel===false ? true:false}style={{display:'flex',alignItems:'center',justifyContent:'space-around', height:'55px'}} className={`alert alert-${success}`} role="alert">
//   {props.success==='danger' ?
//   "Are you sure to delete ?":"Note Deleted Successfully..."}

//   <div style={{gap:'0.5rem',display:"flex"}}>

//   <button type="button" onClick={ConfirmDelete}  hidden={success==='success' ? true:false} className="btn btn-outline-success" style={{padding:'0.2rem',paddingBottom:'0.1',borderColor:'transparent'}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
//   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
//   <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
// </svg></button>
//   <button type="button"  onClick={CancelDelete}hidden={ success==='success' ? true:false} className="btn btn-outline-danger" style={{padding:'0.2rem',paddingBottom:'0.1',borderColor:'transparent'}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
//   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
//   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
// </svg></button>

// </div>
// </div>





// </>
// )



// }

// export default Alert;