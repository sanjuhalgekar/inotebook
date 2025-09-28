import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function Signup(props) {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({name: "", email: "", password: "" });
    let navigate = useNavigate();    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({name: credentials.name, emailId: credentials.email, passWord: credentials.password }),
            });
    
            const json = await response.json();
            if(json.success){
                //Save the auth token
                localStorage.setItem('token',json.authToken);
                props.showAlert("Signup Successfully","success");
                navigate("/login");
                setCredentials({name: "",email: "", password: ""})
            }
            else{
                props.showAlert("Signup Failed","Danger");
                //alert("Signup Failed");
            }
                //console.log(json); // Handle response appropriately
        } catch (error) {
                console.error("Login failed:", error);
        }
    };
    
        const handleChange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        };
  return (
    <div className='container mt-2'>
        <h2>Create account to use iNoteBook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="name" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={credentials.name} 
                    onChange={handleChange} 
                    aria-describedby="emailHelp" 
                    minLength={5}
                    required
                />
            </div>
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
                    minLength={5}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="cpassword" 
                    name="cpassword" 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
