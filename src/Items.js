import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import { deletetodo, editTodoText, updatetick } from './utils/Handleapi'
import { useNavigate } from 'react-router-dom'

const Items = ({ items, setitems }) => {
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")
  const [showModal, setShowModal] = useState(false)
  const Navigate = useNavigate();

  // helper: calculate days remaining
  // const getDaysRemaining = (dueDate) => {
  //   const now = new Date()
  //   const due = new Date(dueDate)
  //   const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24))

  //   if (diff > 0) return `${diff}d`
  //   if (diff === 0) return "0d"
  //   return `-${Math.abs(diff)}d`
  // }

  const handleEdit = (item) => {
    setEditId(item._id)
    setEditText(item.text)
    setShowModal(true) // open popup
  }


  const checkboxchange = (id) => {
     updatetick(id, setitems,Navigate);
  }

  const deleteitem = (id) => {
    deletetodo(id, setitems,Navigate);
  }
  
  const handleedittextupdate = () => {
      editTodoText(editText,editId,setitems,Navigate);
      setEditId(null)
      setEditText("")
      setShowModal(false)
  }
  return (
    <>
      <ul className="items-ul">
        {items?.map((item) => (
          <li className="items" key={item._id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => checkboxchange(item._id)}
            />

            <label
              style={item.checked ? { textDecoration: "line-through" } : null}
            >
              {item.text}
            </label>

            {/* <span className="days">{getDaysRemaining(item.deadline)}</span> */}
            {
              item.checked!==true
              &&

                  <fa.FaEdit
                  id="editicon"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleEdit(item)}
                  style={{ cursor: "pointer", marginLeft: "8px", color: "grey" }}
                />

            }
              <fa.FaTrashAlt
                  id="trashicon"
                  role="button"
                  tabIndex="0"
                  onClick={() => deleteitem(item._id)}
                  style={{ cursor: "pointer", marginLeft: "8px", color: "red" }}
                />
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px"
            }}
          >
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
              autoFocus
            />
            <button onClick={()=>handleedittextupdate()} style={{ marginRight: "10px" }}>
              Save
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Items
