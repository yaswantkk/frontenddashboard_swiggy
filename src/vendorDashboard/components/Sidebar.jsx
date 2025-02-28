import React from 'react'

const Sidebar = ({showfirmhandler,showproducthandler,showfirmtitle,showallproductshandler}) => {
  return (
    <div>
      <div className="sidebar">
        <ul>
         {showfirmtitle ?  <li onClick={showfirmhandler}> Add firm</li> : ""}

           
            <li onClick={showproducthandler}>Add product</li>
            <li onClick={showallproductshandler}>All products</li>
            <li>User details</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
