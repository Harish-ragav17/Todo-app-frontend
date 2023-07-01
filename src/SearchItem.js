import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form
    
      onSubmit={(e)=>(e.preventDefault())}
    >
    <input id='addItem'
    placeholder='search'
    required
    autoFocus
     value={search}
     onChange={(e)=>setSearch(e.target.value)}
    ></input>
    </form>
  )
}

export default SearchItem