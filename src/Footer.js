import React from 'react'

const Footer = ({length}) => {
    const year=new Date();
  return (
    <><p></p>
    <footer>Copyrigth &copy; {year.getFullYear()} --------------- No of {length === 1?"item":"items"}: {length}</footer></>
  )
}

export default Footer