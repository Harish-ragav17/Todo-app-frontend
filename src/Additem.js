import React from 'react'
import { FaPlus } from 'react-icons/fa'
import SearchItem from './SearchItem'

const Additem = ({newItem, setNewItem,handleSubmit,search,setSearch}) => {
  return (
    <form
    className='addform'
    onSubmit={handleSubmit}>
     <input
     autoFocus
     id='addItem'
     type="text"
     placeholder='Add Item'
     required
     value={newItem}
     onChange={(e)=>setNewItem(e.target.value)}
     >
     </input>
     <button
     type='sumit'>
        <FaPlus/>
     </button>
     <SearchItem
     search={search}
     setSearch={setSearch}
     />
    </form>
  )
}

export default Additem