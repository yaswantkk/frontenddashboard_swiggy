import React,{useState} from 'react'
import { api_url} from '../../data/Apipath'

const Addproduct = () => {
const[productname,setproductname]=useState(' ')
const[price,setprice]=useState('')
const[category,setcategory]=useState([]);
const[bestseller,setbestseller]=useState(false);
const[image,setimage]=useState(null);
const[description,setdescription]=useState('');

const handlecategorychange = (event) => {
  const value = event.target.value;
  if (category.includes(value)) {
    setcategory(category.filter((item) => item !== value));
  } else {
    setcategory([...category, value]);
  }
};

const handleimageupload=(event)=>{
  const image=event.target.files[0]
  setfile(image)
}
const handlebestseller=(e)=>{
  const value=e.target.value === 'true'
  setbestseller(value)
}

const handleaddproduct=async(e)=>{
e.preventDefault()
try {
  const logintoken = localStorage.getItem('logintoken');
          const firmid = localStorage.getItem('firmid')

          if(!logintoken || !firmid){
              console.error("user not authenticated")
          }
  const formdata=new FormData();
  formdata.append('productname',productname)
  formdata.append('price',price)
  formdata.append('description',description)
  formdata.append('image',image)
  category.forEach((value)=>{
    formdata.append("category",value)
 });

 const response=await fetch(`${api_url}/product/add-product/${firmid}`,{
     method:'POST',
     
     body:formdata
   })
   const data=await response.json();
   if(response.ok){
    alert("product added successfully")
    setproductname('')
    setprice('')
    setimage(null)
    setcategory([])
    setbestseller(false)
    setdescription('')

   }
} catch (error) {
  alert("failed to add product")
}
}


  return (
    <div className="product" onSubmit={handleaddproduct}> 
        <h3>Adding product</h3>
    <form  className='allforms'>
        <label>Product name</label>
        <input type="text"  value={productname} onChange={(e)=>{setproductname(e.target.value)}} placeholder='Enter your firm name'/><br />
        <label>price</label>
        <input type="text" placeholder='Enter your price' onChange={(e)=>{setprice(e.target.value)}} /><br />
        
        
        <div className="checkinp">
            <label >Category</label>
               <div className="inputcontainer">
               
               <div className="checkboxcontainer">
            <label >veg</label>
            <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handlecategorychange} /><br />
            </div>
            <div className="checkboxcontainer">
              <label >non-veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg"  onChange={handlecategorychange}/>
             </div>
               
               </div>
           </div>
        
        
           <div className="checkinp">
            <label >Bestseller</label>
               <div className="inputcontainer">
               
               <div className="checkboxcontainer">
            <label >yes</label>
            <input type="radio"  value="yes" checked={bestseller===true} onChange={handlebestseller}/><br />
            </div>
            <div className="checkboxcontainer">
              <label >no</label>
              <input type="radio"  value="no" checked={bestseller===false} onChange={handlebestseller}/>
             </div>
               
               </div>
           </div>
        
        <label>Description</label>
        <input type="text"  value={description} placeholder='Enter your description'onChange={(e)=>{setdescription(e.target.value)}} /><br />
        <label>product image</label>
        <input type="file"  onChange={handleimageupload}/><br />
        <div className="btnsubmit">
            <button type='submit'>Submit</button>
        </div>
    </form>
    </div>
  )
}

export default Addproduct
