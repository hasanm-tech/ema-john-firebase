import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {

    const {createUser} = useContext(AuthContext)
    const [error,setError] = useState(null)

    const handleSignUp = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        const confirm = form.confirm.value;

        console.log(email,pass,confirm)
        setError('')

        if(pass !== confirm){
            setError('password did not matched');
            return;
        }
        else if(pass.length < 6){
            setError('password length need to at least 6')
        }

        createUser(email,pass)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .then(error => {
            console.error(error);
            setError(error)
        })
    }
    return (
        <div>
        <form onSubmit={handleSignUp} className='form-container'>
            <div className="title">
                <h2>Sign Up </h2>
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
                <label htmlFor="">Confirm Password</label> <br />
                <input type="password" required name='confirm' />
            </div>

            <div>
                <input type="submit" value="Login" />
                <p className='new-p'>Already have an account <Link className='createNewBtn' to="/login"> Login</Link></p>
                <br />
                <p style={{color:"red"}}>{error}</p>
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

export default SignUp;