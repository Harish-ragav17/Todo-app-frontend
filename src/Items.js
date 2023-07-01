import React from 'react'
import * as fa from 'react-icons/fa'

const Items = ({items,checkboxchange,deleteitem,newItem, setNewItem,handleSubmit}) => {
  return (
    <ul className='items-ul'>
      {items.map(item=>(
        <li className='items' key={item._id}>
         <input
              type='checkbox'
              checked={item.checked} 
              onChange={()=>checkboxchange(item._id)} 
         ></input>
        <label onDoubleClick={()=>checkboxchange(item._id)}
         style={(item.checked)? {textDecoration:'line-through'}:null}
        >{item.text}</label>
        <fa.FaTrashAlt 
        id='trashicon'
        role='button'
        tabIndex='0'
        onClick={()=>deleteitem(item._id)}
        />
        </li>
      ))}
  </ul>
  )
}

export default Items