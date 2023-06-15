import React, { useState } from "react";
import useAuth from "../../auth/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';

import './login.css';

import userService from "../../services/UserService";
const LOGIN_URL = '/api/auth/signin';

export default function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [errors, setErrors] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleRegisterRedirect() {
        navigate('/register')
    }

    function handleForgotPassword() {
        navigate('/forgot-password')
    }

    function handleFormChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const response = await userService.post(LOGIN_URL, formData,
                {
                    headers: {'Content-Type': 'application/json'}
                });
                const accessToken = response.data.accessToken;
                const roles = response.data.roles;
                const name = response.data.username;
                const pass = response.data.password;
                setAuth({ name, pass, roles, accessToken})
            setFormData({
                username: '',
                password: ''
            })
            navigate(from, { replace: true });
        } catch(err) {
            setErrors('Invalid Username and/or Password')
        }
    }

    return (
        <div className="login-page">
            <div className="login">
                <h1 className="login--title">Login</h1>
                <div className="login--field">
                    <input 
                        placeholder="Username"
                        name="username"
                        onChange={handleFormChange}
                        value={formData.username}
                        maxLength={20}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleFormChange}
                        value={formData.password}
                        maxLength={40}
                    />
                    {errors && <p className="errors">{errors}</p>}
                    <button onClick={handleFormSubmit}>Log In</button>
                </div>
                <div className="login--links">
                    <button onClick={handleForgotPassword}>Forgot password?</button>
                    <button onClick={handleRegisterRedirect}>Register new user!</button>
                </div>
            </div>
        </div>
        
    )
}