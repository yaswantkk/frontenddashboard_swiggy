import React,{useState} from 'react'
import { api_url} from '../../data/Apipath'

const Register = ({showloginhandler}) => {
  const[username,setusername]=useState("");
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[error,seterror]=useState('');
  const[loading,setloading]=useState('');

  const handlesubmit=async(e)=>{
    e.preventDefault();
try {
   const response=await fetch(`${api_url}/vendor/register`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username,email,password})
  });
  
  
  if(response.ok){
    alert("vendor registered successfully")
   setusername('')
    setemail('')
    setpassword('')
    showloginhandler()
  }
  
} catch (error) {
  console.error("registration failed");
  alert("registration failed")
}
  }

  return (
    
      <div className="register">
      <h3>Vendor Register</h3>
      <form  className='allforms' onSubmit={handlesubmit}> 
           <label>Username</label>
            <input type="text" name="username" value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder='Enter your Username'/><br />
            <label>Email</label>
            <input type="text"  name="email" value={email} onChange={(e)=>{setemail(e.target.value)}}  placeholder='Enter your email'/><br />
            <label>password</label>
            <input type="text" name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Enter your password'/><br />
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
      </div>
    
  )
}

export default Register
