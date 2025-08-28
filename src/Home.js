import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Home = ({items,setitems,isLoading,checkboxchange,deleteitem,setisLoggedIn}) => {
  
  return (
    <div>
       <Header  setisLoggedIn={setisLoggedIn}/>
       
       <Content 
       items={items}
       setitems = {setitems}
       isLoading={isLoading}
       checkboxchange={checkboxchange}
       deleteitem={deleteitem}
      />
       <Footer
       length={items.length}
       />
    </div>
  )
}

export default Home
