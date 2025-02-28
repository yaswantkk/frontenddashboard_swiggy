import React from 'react'

const Navbar=({showloginhandler,showregisterhandler,showlogout,logouthandler})=>{
   const firmname=localStorage.getItem("firmname")
    return(
       <div className="navbar">
        <div className="company">
            Vendor dashboard
        </div>
        <div className="firmname">
            <h4>Firmname-{firmname}</h4>
        </div>
        <div className="userAuth">
            {!showlogout ?  <>
            <p onClick={showloginhandler}>Login/</p>
            <p onClick={showregisterhandler}>Register</p> </>:
            <span onClick={logouthandler}>Logout</span>
            }
           
            

        </div>
       </div> 
    )
}

export default Navbar