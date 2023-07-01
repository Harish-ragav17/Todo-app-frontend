import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState} from "react";
import { useEffect } from "react";
import {gettodo,settodo,deletetodo,updatetick} from "./utils/Handleapi"

function App()
{
  
  const [items,setitems]=useState([])
  const [search,setSearch]=useState('')
  const [newItem,setNewItem]=useState('')
  const [isLoading,setisLoading]=useState(true)

  useEffect(()=>{
    try{
      gettodo(setitems)
    }catch(err){
      console.log(err)
    }finally{
      setisLoading(false)
    }  
    

    },[])
   const checkboxchange=(_id)=>
   {
     const updatetickitems=items.map((item)=>
      item._id===_id? {...item,checked:!item.checked}:item)
      setitems(updatetickitems)
      updatetick(_id,setitems)
      
   }
   const deleteitem=(_id)=>
   {
     const deleteditems=items.filter((item)=> item._id!==_id)
     deletetodo(_id,setitems)
     setitems(deleteditems)
   }
   const handleSubmit=(e)=>
   {
    e.preventDefault()
    if(!newItem) return;
     settodo(newItem,setNewItem,setitems)
   }
   
   return(
    <div>
       <Header title="To-Do List" />
       
       <Content 
       items={items.filter((item)=>(item.text).toLowerCase().includes(search.toLowerCase()))}
       isLoading={isLoading}
       checkboxchange={checkboxchange}
       deleteitem={deleteitem}
       newItem={newItem}
       setNewItem={setNewItem}
       setitems={setitems}
       handleSubmit={handleSubmit}
       search={search}
       setSearch={setSearch}
       

      />
       <Footer
       length={items.length}
       />
    </div>
  );
}

export default App