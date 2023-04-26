import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope ,faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../Provider/AuthProvider';



const Login = () => {
    
    const {userSignIn} = useContext(AuthContext)

    const [show,setShow] = useState(true);

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

                <div className='password'>
                    <label htmlFor="">Password</label> <br />
                    <input type={show ? 'text' : 'password'} required name='pass' />
                    <span className='pass-icon' onClick={() => setShow(!show)}>
                        {
                            show ? <span> <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>  </span>: <span> <FontAwesomeIcon icon={faEye} /> </span>
                        }
                    </span>
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

