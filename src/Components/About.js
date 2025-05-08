import React ,{Component} from 'react'
// import LoadingBar from "react-top-loading-bar"; 


const About=()=>{

    
        return(

            <>
            <div style={{display:'flex',alignItems: 'flex-start',flexDirection: 'row',justifyContent: 'flex-start', width:'auto'}}>


                <div id='' style={{marginRight:'2rem' ,marginLeft:'5rem'}}>


            <div className="card text-bg-info mb-3" style={{maxWidth: '18rem', marginTop:'5rem'}}>
  <div className="card-header text-center">INoteBook</div>
  <div className="card-body">
    <h5 className="card-title text-center">1. CloudStorage</h5>
    <p className="card-text">"All your notes are securely stored in the cloud, ensuring access from any device, anytime, anywhere. Say goodbye to losing notes due to device failure."</p>
  </div>
</div>
<div className="card text-bg-warning mb-3" style={{maxWidth: '18rem'}}>
  <div className="card-header text-center">INoteBook</div>
  <div className="card-body">
    <h5 className="card-title text-center">2. CRUD functionality</h5>
    <p className="card-text">"Create, Read, Update, and Delete notes effortlessly. The app provides an intuitive interface for managing your content with ease and speed."</p>
  </div>
</div>
<div className="card text-bg-danger mb-3" style={{maxWidth: '18rem'}}>
  <div className="card-header text-center">INoteBook</div>
  <div className="card-body">
    <h5 className="card-title text-center">3. User Authentication</h5>
    <p className="card-text">"Your data is protected with a secure login system, ensuring that only you can access and manage your notes."</p>
  </div>
</div>
                </div>





            <div className="accordion accordion-flush" id="accordionFlushExample" style={{marginTop:'5rem' ,width:'50%', marginLeft: 'rem'}}>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed text-bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      4. Real-Time Sync
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
    <div className="accordion-body bg-body-tertiary">"Changes you make are saved and reflected instantly across all your devices, giving you a seamless note-taking experience."</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed text-bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      5. Responsive Design
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body bg-body-tertiary">"iNotebook is fully responsive, providing a clean and optimized interface whether you're using a desktop, tablet, or smartphone.

"</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed text-bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      6. Search and Organize
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body bg-body-tertiary">"Quickly find the notes you need with an integrated search feature, and organize your ideas using tags or categories for better clarity."</div>
    </div>
  </div>

  <div id='news'>

    {/* <AboutNews ApiKey={this.apikey} setProgress={this.setProgress} key="general" PageSize={3} category="general"/> */}

  </div>
</div>
            
            
            
            
            
            

  </div>
            
            
            </>
            
            
            
            
            
        );
        
        
        
        









      }

export default About;
