import React,{useState} from 'react'
import { api_url} from '../../data/Apipath'


const Login = ({showwelcomehandler}) => {
 const[email,setemail]=useState('');
 const[password,setpassword]=useState(''); 
  
 const loginhandler=async (e)=>{
e.preventDefault();
try {
  const response=await fetch(`${api_url}/vendor/login`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  })
  const data =await response.json();
   if(response.ok){
    alert("login success")
    setemail('')
    setpassword('')
    localStorage.setItem("logintoken",data.token)
    showwelcomehandler();
    window.location.reload()
   }
   const vendorid = data.vendorid
          console.log("checking for VendorId:",vendorid)
          const vendorresponse = await fetch(`${api_url}/vendor/single-vendor/${vendorid}`)
          window.location.reload()
          const vendordata = await vendorresponse.json();
          if(vendorresponse.ok){
            const vendorfirmid = vendordata.vendorfirmid;
           const vendorfirmname=vendordata.vendor.firm[0].firmname;
            localStorage.setItem('firmid', vendorfirmid);
            localStorage.setItem('firmname', vendorfirmname);
            window.location.reload()
          }           
} catch (error) {
  console.error(error);
}

 }
  
  return (
    
      <div className="login">
        <h3>Vendor Login</h3>
        <form  className='allforms' onSubmit={loginhandler}>
            <label>Email</label>
            <input type="text" name="email" value={email} onChange={(e)=>{setemail(e.target.value)}}  placeholder='Enter your email'/><br />
            <label>password</label>
            <input type="text"  name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Enter your password'/><br />
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
      </div>
    
  )
}

export default Login
