import React, { useState } from 'react'
import { loginPageStyles, toastStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = "doctorToken_v1";

const LoginPage = () => {

const API_BASE = 'http://localhost:4000';
    const [formDate, setFormDate] = useState({ email: "", password: "" });
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    const handleChange =(e) => {
        setFormDate((s) => ({
            ...s,
            [e.target.name] : e.target.value
        }));
    }

    return (
        <div className={loginPageStyles.mainContainer}>
            <Toaster position='top-right' reverseOrder={false} />
            <button onClick={() => }>

            </button>

        </div>
    )
}

export default LoginPage
