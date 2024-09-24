import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import { PersonFill, EnvelopeFill, LockFill, X } from 'react-bootstrap-icons';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div className="register_container" style={{width: "50%"}}>
      <div className="header" style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
          <span className="text" style={{flexGrow:"1"}}>SignUp</span> 
          <div className="close-icon-container">
          <a href="/" onClick={()=>{gohome()}}>
            <X className="bi bi-x-lg" style={{ fontSize: "24px", color: "white"}} />
          </a>
          </div>
          <hr/>
        </div>

        <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <PersonFill className="bi-icon" />
            <input type="text"  name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div>
             <PersonFill className="bi-icon" />
            <input type="text"  name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}/>
          </div>

          <div>
            <PersonFill className="bi-icon" />
            <input type="text"  name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)}/>
          </div>

          <div>
            <EnvelopeFill className="bi-icon" />
            <input type="email"  name="email" placeholder="email" className="input_field" onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="input">
            <LockFill className="bi-icon" />
            <input name="psw" type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>
          </div>

        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register"/>
        </div>
      </form>
      </div>
  )
}

export default Register;