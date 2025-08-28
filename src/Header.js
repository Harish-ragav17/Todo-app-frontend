import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchUsernameAndPoints } from './utils/Handleapi';

function Header({setisLoggedIn}) {
    const navigate = useNavigate();
    const [userdata,setuserdata]=React.useState("");
    
    useEffect(() => {
        fetchUsernameAndPoints(setuserdata)    
    },[setuserdata])

    const handleLogout = () => {    
        localStorage.removeItem("token");
        setisLoggedIn(false);
        navigate("/login");
    }

    return (
       <header>
        <div>
            <h1>To Do Pro</h1>
            <h2 style={{ fontSize: "17px", cursor: "pointer" , borderBottom:"1px solid grey", paddingBottom:"1px"}}>
            {userdata ? (
                <>
                <span>Welcome, {userdata.username}</span>
                <span style={{ marginLeft: "20px" }}>Points: {userdata.points} 🌟</span>
                </>
            ) : (
                "Fetching Data..."
            )}
            </h2>            
            <button onClick={() => handleLogout()} style={{background:"none",border:"none"}}><span style={{color:"red" , fontSize:"16px",cursor:"pointer"}}>Logout</span></button>
        </div>
       </header>
    )
}
Header.defaultProps=
{
 title:"ToDo List"
}

export default Header