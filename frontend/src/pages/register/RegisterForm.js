import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './register.css';
import userService from "../../services/UserService";
const REGISTER_URL = 'api/auth/signup';

export default function RegisterForm() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    const [errors, setErrors] = useState('');
    const [usernameErrors, setUsernameErrors] = useState('');
    const [emailErrors, setEmailErrors] = useState('');
    const [passwordErrors, setPasswordErrors] = useState('');
    

    function handleLoginRedirect() {
        navigate('/login')
    }

    function handleForgotPassword(){
        navigate('/forgot-password')
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleVerify(event) {
        setVerify(event.target.value)
    }

    function errorCheck(username, email, password) {
        if (username.length >= 3 && username.length <= 20) {
            setUsernameErrors('');
        }
        if (email.length <= 50 && email.includes('@') && email.includes('.com')) {
            setEmailErrors('');
        }
        if (password && verify) {
            setErrors('');
        }
        if (password === verify) {
            setPasswordErrors('')
        }
    }

    async function handleFormSubmit(event) {
        try {
            const payload = {
                username: username,
                email: email,
                password: password
            }

            errorCheck(username, email, password);

            if (username.length < 3 || username.length > 20) {
                setUsernameErrors('Username must be between 3 and 20 characters.')
            } else if (email.length > 50) {
                setEmailErrors('Email is too long.');
            } else if (!email.includes("@") || !email.includes('.com')) {
                setEmailErrors('Not a valid email.')
            } else if (!username || !email || !password || !verify) {
                setErrors("Fields cannot be blank!")
            } else if (password !== verify) {
                setPasswordErrors('Passwords do not match!')
                setVerify('');
                setPassword('');
            } else {
                event.preventDefault();
                const response = await userService.post(REGISTER_URL, payload);
                if (response.status === 200) {
                    navigate('/');
                }
            }
        }
        catch(e) {
            setErrors('User already exists or unable to process request.')
        }
    }

    return (
        <div className="register-page">
            <div className="register">
                <h1 className="register--title">Register</h1>
                <div className="register--fields">
                    <input 
                        className="register--inputs"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleUsername}
                        value={username} 
                    />
                    {usernameErrors && <p className="error">{usernameErrors}</p>}
                    <input 
                        className="register--inputs"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleEmail}
                        value={email} 
                    />
                    {emailErrors && <p className="error">{emailErrors}</p>}
                    <input 
                        className="register--inputs"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handlePassword}
                        value={password} 
                    />
                    {passwordErrors && <p className="error">{passwordErrors}</p>}
                    <input 
                        className="register--inputs"
                        type="password"
                        name="verify"
                        placeholder="Confirm Password"
                        onChange={handleVerify}
                        value={verify}
                    />
                    {errors && <p className="error">{errors}</p>}
                    <button onClick={handleFormSubmit} className="registerButton">Register</button>
                </div>
                <div className="register--links">
                    <button onClick={handleForgotPassword}>Forgot password?</button>
                    <button onClick={handleLoginRedirect}>Already a user? Log in!</button>
                </div>
            </div>
        </div>
    )
}