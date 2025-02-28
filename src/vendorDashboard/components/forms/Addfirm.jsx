import React,{useState} from 'react'
import { api_url} from '../../data/Apipath'



const Addfirm = () => {


   const[firmname,setfirmname]=useState(" ")
const[area,setarea]=useState(" ")
const[category,setcategory]=useState([])
const[region,setregion]=useState([])
const[offer,setoffer]=useState(" ")
const[file,setfile]=useState(null)

const handleimageupload=(event)=>{
   const image=event.target.files[0]
   setfile(image)
}
const handlecategorychange = (event) => {
   const value = event.target.value;
   if (category.includes(value)) {
     setcategory(category.filter((item) => item !== value));
   } else {
     setcategory([...category, value]);
   }
 };
 
 const handleregionchange = (event) => {
   const value = event.target.value;
   if (region.includes(value)) {
     setregion(region.filter((item) => item !== value));
   } else {
     setregion([...region, value]); // Fixed from setCategory to setRegion
   }
 };
 

const handlefirmsubmit=async (e)=>{
e.preventDefault();
try {
  const logintoken=localStorage.getItem('logintoken')
  if(!logintoken){
   alert("please login")
  } 

  const formdata=new FormData();
   formdata.append('firmname',firmname)
   formdata.append('area',area)
   formdata.append('offer',offer)
   formdata.append('image',file)

   category.forEach((value)=>{
      formdata.append("category",value)
   });

   region.forEach((value)=>{
      formdata.append("region",value)
   });

const response=await fetch(`${api_url}/firm/add-firm`,{
    method:'POST',
    headers:{
      'token':`${logintoken}`
    },
    body:formdata
  })
const data=await response.json()
if(response.ok){
   alert("firm added successfully")
   setfirmname('')
   setarea('')
   setcategory('')
   setregion('')
   setoffer('')
   setfile(null)
}else if(data.message ==="vendor can have only one firm"){
   alert("only 1 firm can be added")
}else{
  alert("failed to add firm")
}
const firmid=data.firmid;
localStorage.setItem("firmid",firmid)

} catch (error) {
   console.error("failed to add",error);
}
}



  return (
    <div className="firm">
         <h3>Adding firm</h3>
        <form  className='allforms' onSubmit={handlefirmsubmit}>
            <label>Firm name</label>
            <input type="text" name='firmname' value={firmname} onChange={(e)=>{setfirmname(e.target.value)}} placeholder='Enter your firm name'/><br />
            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>{setarea(e.target.value)}} placeholder='Enter your password'/><br />
    

           <div className="checkinp">
            <label >Category</label>
               <div className="inputcontainer">
               
               <div className="checkboxcontainer">
            <label >veg</label>
            <input type="checkbox" checked={category.includes('veg')} onChange={handlecategorychange} value="veg"/><br />
            </div>
            <div className="checkboxcontainer">
              <label >non-veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} onChange={handlecategorychange} value="non-veg"/>
             </div>
               
               </div>
           </div>


            
            <label>offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>{setoffer(e.target.value)}} placeholder='Enter your offer'/><br />
            
            <label>Firm image</label>
            <input type="file" onChange={handleimageupload} /><br />
            
            <div className="checkinp">
            <label >Region</label>
               <div className="inputcontainer">
                   <div className="checkboxcontainer">
                       <label >south-indian</label>
                       <input type="checkbox" checked={region.includes('south-indian')} onChange={handleregionchange} value="south-indian"/><br />
                    </div>
                    <div className="checkboxcontainer">
                       <label >north-indian</label>
                       <input type="checkbox" checked={region.includes('north-indian')} onChange={handleregionchange}  value="north-indian"/>
                    </div>
                    <div className="checkboxcontainer">
                       <label >Chinese</label>
                       <input type="checkbox" checked={region.includes('chinese')} onChange={handleregionchange}  value="chinese"/>
                    </div>
                    <div className="checkboxcontainer">
                       <label >Bakery</label>
                       <input type="checkbox" checked={region.includes('bakery')} onChange={handleregionchange}  value="bakery"/>
                    </div>
               
               </div>
           </div>            
            
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Addfirm
