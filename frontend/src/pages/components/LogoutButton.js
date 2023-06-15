import React from "react";
import useAuth from "../../auth/useAuth";

export default function LogoutButton() {
    const { setAuth } = useAuth();

    function handleClick() {
        setAuth(['', '', '', '']);
    }
    return (
        <div className="logout-button">
            <p onClick={handleClick}>Log Out</p>
        </div>
    );
}