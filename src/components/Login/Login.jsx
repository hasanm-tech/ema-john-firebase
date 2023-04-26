import React, { useContext } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../Provider/AuthProvider';


const Login = () => {
    
    const {userSignIn} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '';


    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        console.log(email,pass);

        form.reset();

        userSignIn(email,pass)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, {replace: true})
        })

        .catch(error => {
            console.error(error)
        })
    }
    return (
        <div>
            <form onSubmit={handleSignIn} className='form-container'>
                <div className="title">
                    <h2>Login</h2>
                </div>
                <div>
                    <label htmlFor="">Email</label> <br />
                    <input type="email" required name='email' />
                </div>

                <div>
                    <label htmlFor="">Password</label> <br />
                    <input type="password" required name='pass' />
                </div>

                <div>
                    <input type="submit" value="Login" />
                    <p className='new-p'>New to Ema-John <Link className='createNewBtn' to="/signUP">Create new Account</Link></p>
                </div>

                <div className="line-container">
                <hr className="line" />
                <span className="word">or</span>
                </div>

                <div>
                    <button className='signBtn'> <FontAwesomeIcon icon={faEnvelope}/> Continue with Google  </button>
                </div>

            </form>
        </div>
    );
};

export default Login;