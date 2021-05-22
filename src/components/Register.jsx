import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Style.css'
import fire from '../FireBaseAuth'
function Register() {
    const history = useHistory();
    const [error, setError] = useState({
        hasError: false,
        errormsg: null
    });
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    setTimeout(function () {
        const labels = document.querySelectorAll('.form-control label')

        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('')
        })
    }, 100);
    function handleSubmit(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {
            alert("Successfully registered")
            history.push('/')
        }).catch((error) => {

            if (error.code === "auth/email-already-in-use") {
                setError({ hasError: true, errormsg: "This email is already in use" })
                return
            }
            if (error.code === "auth/invalid-email") {
                setError({ hasError: true, errormsg: "Invalid email" })
                return
            }
            if (error.code === "auth/weak-password") {
                setError({ hasError: true, errormsg: "Please provide strong password" })
                return
            }
            setError({ hasError: true, errormsg: "Something went wrong" })

        })

    }
    function handleEvent(e) {
        setUser((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <div className="body">
            <div className="container">
                <h1>Register</h1>
                {error.hasError ? <p className="tomato">{error.errormsg}</p> : null}
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input name="email" type="text" value={user.email} onChange={handleEvent} autoComplete="off" required />
                        <label>Email</label>

                    </div>

                    <div className="form-control">
                        <input name="password" type="password" value={user.password} onChange={handleEvent} autoComplete="off" required />
                        <label>Password</label>
                    </div>


                    <button type="submit" className="btn">Register</button>

                    <p className="text">Already have an account? <Link to="/">Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Register
