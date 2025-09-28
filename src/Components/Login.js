import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function Login(props) {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId: credentials.email, passWord: credentials.password }),
            });

            const json = await response.json();

            if(json.success){
                //Save the auth token
                localStorage.setItem('token',json.authToken);
                if(localStorage.getItem("token")){
                    props.showAlert("Login Successfully","success");
                    navigate("/"); 
                }
                else{
                    navigate("/login"); 
                }                               
            }
            else{
                props.showAlert("Login Failed","danger");
            }
            
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-2">
            <h2>Login to continue iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={credentials.email} 
                        onChange={handleChange} 
                        aria-describedby="emailHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
