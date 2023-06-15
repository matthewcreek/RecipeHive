import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './resetPassword.css'
import userService from "../../services/UserService";

const RESET_PASS_URL = '/api/recovery/reset_password';

export default function ResetPassword() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [errors, setErrors] = useState('');
    const [token, setToken] = useState('');

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleVerify(event) {
        setVerify(event.target.value);
    }

    function handleToken(event) {
        setToken(event.target.value);
    }

    function handleSuccess() {
        navigate("/login");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {
            password: password,
            token: token
        };
        try {
            if (password && verify && password === verify){
                await userService.post(RESET_PASS_URL, payload,
                    {
                        headers: {
                            "Content-Type":'application/json'
                        }
                    });
                setErrors('');
                setIsChanged(true);
            } else if (password !== verify) {
                setPassword('');
                setVerify('');
                setErrors('Passwords do not match!')
            } else if (!password && !verify){
                setErrors('Password cannot be blank.')
            }
        } catch(err) {
            setErrors("Invalid Code: Password Not Updated")
        }
    }
    
    return (
        <div className="reset-password">
            {!isChanged && <>
                <div className="reset-password-form">
                    <p>Please enter the temporary code from your email.</p>
                    <input
                        type="text"
                        placeholder="Temporary Code"
                        name="token"
                        onChange={handleToken} 
                        value={token}
                    />
                    {!errors && <p>Enter your new password:</p>}
                    {errors && <p className="errors">{errors}</p>}
                    <input 
                        type="password" 
                        placeholder="New Password"
                        name="password"
                        onChange={handlePassword}
                        value={password}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password"
                        name="verify"
                        onChange={handleVerify}
                        value={verify}
                    />
                    <button className="reset-button" onClick={handleSubmit}>Reset Password</button>
                </div>    
            </>}
            {isChanged && <>
                <div className="success-field">
                    <p className="success">Success!</p>
                    <button className="success-button" onClick={handleSuccess}>Return to Login</button>
                </div>
            </>}
        </div>
    )
}