import { useState } from "react";
import { useEffect } from "react";
import { gettodo, deletetodo, updatetick } from "./utils/Handleapi";
import {  Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { useNavigate } from 'react-router-dom';
import Register from "./Register";

function App() {
  const [items, setitems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoggedin, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }

      if (isLoggedin) {
        gettodo(setitems);
        navigate("/");
      } else {
        if (window.location.pathname !== "/register") {
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  }, [isLoggedin,navigate]);
  

  const checkboxchange = (_id) => {
    const updatetickitems = items.map((item) =>
      item._id === _id ? { ...item, checked: !item.checked } : item
    );
    setitems(updatetickitems);
    updatetick(_id, setitems);
  };

  const deleteitem = (_id) => {
    const deleteditems = items.filter((item) => item._id !== _id);
    deletetodo(_id, setitems);
    setitems(deleteditems);
  };


  return (
    <div>
        <Routes>
          <Route
            index
            path="/"
            element={
              <Home
                items={items}
                setitems={setitems}
                isLoading={isLoading}
                checkboxchange={checkboxchange}
                deleteitem={deleteitem}
                setisLoggedIn={setisLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setisLoggedIn={setisLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register/>}
            />
          
        </Routes>

    </div>
  );
}

export default App;
