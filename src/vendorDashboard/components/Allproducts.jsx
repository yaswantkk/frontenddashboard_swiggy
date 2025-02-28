import React,{useState,useEffect} from 'react'
import { api_url} from './../data/Apipath'

const Allproducts = () => {
const[products,setproducts]=useState([]);
const deleteProductById = async(productid)=>{
    try {
            const response = await fetch(`${api_url}/product/delete/${productid}`,{
                method: 'DELETE'
            })
        if(response.ok){
            setproducts(products.filter(product =>product._id !== productid));
            confirm("are you sure, you want to delete?")
            alert("Product deleted Successfully")
        }
    } catch (error) {
        console.error('Failed to delete product');
        alert('Failed to delete product')
    }
}
const producthandler=async()=>{
   const firmid=localStorage.getItem('firmid')
   console.log(firmid)
   try {
      const response=await fetch(`${api_url}/product/get-allproducts/${firmid}`)
      const newproductsdata=await response.json();
      setproducts(newproductsdata.product);
      console.log(newproductsdata)
   } catch (error) {
     console.log(error)
     alert("failed to fetch products")
   } 
}

useEffect(()=>{
  producthandler()
  
},[])

return (
    <div className='productSection'>
        {!products ? (
            <p>No products added</p>
        ) : (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                            return (
                                <>
                                    <tr key={item._id}>
                                        <td>{item.productname}</td>
                                        <td>₹{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${api_url}/product/uploads/${item.image}`} 
                                            alt={item.productname}
                                            style={{ width: '50px', height:'50px'  }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteProductById(item._id)}
                                        className='deleteBtn'
                                        >Delete</button>
                                    </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         )}
    </div>
  )

}

export default Allproducts
