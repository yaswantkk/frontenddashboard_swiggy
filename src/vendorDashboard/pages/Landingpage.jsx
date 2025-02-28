import React ,{useState,useEffect}from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Addfirm from '../components/forms/Addfirm'
import Addproduct from '../components/forms/Addproduct'
import Welcome from '../components/Welcome'
import Allproducts from '../components/Allproducts'

const Landingpage = () => {
  const [showlogin, setshowlogin] = useState(false)
  const [showregister, setshowregister] = useState(false)
  const [showfirm, setshowfirm] = useState(false)
  const [showproduct, setshowproduct] = useState(false)
  const [showwelcome, setshowwelcome] = useState(false)
  const [showallproducts, setshowallproducts] = useState(false)
  const [showlogout, setshowlogout] = useState(false)
  const [showfirmtitle, setshowfirmtitle] = useState(true)

  useEffect(()=>{
    const logintoken = localStorage.getItem('logintoken');
    if(logintoken){
        setshowlogout(true)
        setshowwelcome(true)
    }
  }, [])

  useEffect(()=>{
      const firmname = localStorage.getItem('firmname');
      const firmid = localStorage.getItem('firmid')
      if(firmname || firmid ){
          setshowfirmtitle(false)
          setshowwelcome(true)
      }
  },[])


  const logouthandler =()=>{
    confirm("are you sure to logout?")
      localStorage.removeItem("logintoken");
      localStorage.removeItem("firmid");
      localStorage.removeItem('firmname');
      setshowlogout(false)
      setshowfirmtitle(true)
      setshowwelcome(false)
  }

const showloginhandler =()=>{
    setshowlogin(true)
    setshowregister(false)
    setshowfirm(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)

}

const showregisterhandler = ()=>{
    setshowregister(true)
    setshowlogin(false)
    setshowfirm(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)

}

const showfirmhandler = ()=>{
  if(showlogout){
    setshowregister(false)
    setshowlogin(false)
    setshowfirm(true)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)
  }else{
    alert("please login");
    setshowlogin(true)
  }
}
const showproducthandler = ()=>{
  if(showlogout){
    setshowregister(false)
    setshowlogin(false)
    setshowfirm(false)
    setshowproduct(true)
    setshowwelcome(false)
    setshowallproducts(false)
    }else{
        alert("please login")
        setshowlogin(true)
    }

}
const showwelcomehandler = ()=>{
    setshowregister(false)
    setshowlogin(false)
    setshowfirm(false)
    setshowproduct(false)
    setshowwelcome(true)
    setshowallproducts(false)

}
const showallproductshandler = ()=>{
  if(showlogout){
    setshowregister(false)
    setshowlogin(false)
    setshowfirm(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(true)

}else{
    alert("please login")
    setshowlogin(true)
 }
}
  return (
    <>
        <section className='landingsection'>
            <Navbar showloginhandler = {showloginhandler} showregisterhandler = {showregisterhandler}
            showlogout = {showlogout}
            logouthandler = {logouthandler}
            />
            <div className="collectionsection">
            <Sidebar showfirmhandler={showfirmhandler} showproducthandler ={showproducthandler}
            showallproductshandler = {showallproductshandler}
            showfirmtitle={showfirmtitle}
            />
          {showfirm && showlogout && <Addfirm />}
          {showproduct && showlogout && <Addproduct />}
          {showwelcome && <Welcome />}
          {showallproducts && showlogout && <Allproducts />}
          {showlogin && <Login showwelcomehandler ={showwelcomehandler}/>}
          {showregister && <Register showloginhandler = {showloginhandler}/>}
        
            </div>
        </section>
    </>
  )
}

export default Landingpage
