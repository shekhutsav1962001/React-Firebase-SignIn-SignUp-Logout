import React, { useContext } from 'react'
import { MyContext } from '../App'
import './Style.css'
function Dashboard() {
    const { loginuser, setLoginUser } = useContext(MyContext);

    return (
        <div className="body">
            <div className="container">
                <h1>welcome {loginuser}</h1>
                <button type="submit" onClick={()=>{
                    setLoginUser("")
                }} className="btn">Logout</button>
            </div>
        </div>
    )
}

export default Dashboard
