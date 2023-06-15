import React, { useState } from "react";
import UserService from "../../services/UserService";
import './forgotPassword.css';

const FORGOT_PASS_URL = '/api/recovery/forgot_password'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleEmailChange(event) {
        const {value} = event.target;
        setEmail(prevEmail => value)
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {
            email: email
        }
        try {
            const response = await UserService.post(FORGOT_PASS_URL, payload,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setMessage(response.data)
        } catch(err) {
            setMessage("Email not found. Please enter a valid email.")
        }
    }

    return (
        <div className="forgot-password">
            <div className="forgot-password-form">
                {!message && <p>Enter your account email to reset the password.</p>}
                {message && <p className="request-received">{message}</p>}
                <input 
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleEmailChange}
                />
                <button className="button-email" onClick={handleSubmit}>Send Reset Email</button>
            </div>
        </div>
    )
}