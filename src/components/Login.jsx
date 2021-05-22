import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import fire, { auth, provider } from '../FireBaseAuth'
import './Style.css'
import { MyContext } from '../App'
function Login() {
    const history = useHistory();
    const { loginuser, setLoginUser } = useContext(MyContext);
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
        fire.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
            alert("Login success")
            setLoginUser(user.email)
            history.push('/dashboard')
        }).catch((error) => {
            if (error.code === "auth/user-not-found") {
                setError({ hasError: true, errormsg: "user does not exist with your email" })
                return
            }
            if (error.code === "auth/wrong-password") {
                setError({ hasError: true, errormsg: "Invalid password" })
                return
            }
            if (error.code === "auth/invalid-email") {
                setError({ hasError: true, errormsg: "Invalid email" })
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

    function SignInGoogle() {
        auth.signInWithPopup(provider)
            .then((result) => {
        
                const { email } = result.user
                setLoginUser(email)
                history.push('/dashboard')
            })
            .catch((error) => {
                setError({ hasError: true, errormsg: "Something went wrong" })
            }
            )
    }
    return (
        <div className="body">
            <div className="container">
                <h1>Login</h1>
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

                    <button type="submit" className="btn">Login</button>
                </form>
                <button onClick={SignInGoogle} className="btn">Login with Google</button>

                <p className="text">Don't have an account? <Link to="/register">Register</Link> </p>

            </div>
        </div>
    )
}

export default Login
