import React from 'react'
import Items from './Items'
import Additem from './Additem'


const Content = ({items,isLoading,checkboxchange,deleteitem,newItem, setNewItem,setitems,handleSubmit,search,setSearch,error}) => {
   
  return (
    <main>
      <Additem 
      newItem={newItem}
      setNewItem={setNewItem}
      setitems={setitems}
      handleSubmit={handleSubmit}
      search={search}
      setSearch={setSearch}
      />
     
        {(items.length)?
      (
        <Items 
        items={items}
       checkboxchange={checkboxchange}
       deleteitem={deleteitem}
       
       />
      )
      :
      (
      <div id='empty'>
       {(isLoading)? (<p>"Loading Data..</p>):(<p >Your List is Empty</p>)}
      </div>
      )}
      
      
   </main>
  )
}

export default Content