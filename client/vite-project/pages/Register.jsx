import React, { useState } from 'react';
import '../style/style.css';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password:password,
          name:name
        })
      })
      const message = await res.json()
      if (res.ok) {
        alert(message.message)
        navigate('/');
      } else {
        alert(message.message)
         
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  return (
    <div className="container">
      <video autoPlay loop muted playsInline>
        <source src="../images/background-video.mp4" type="video/mp4" />
      </video>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} >
         <input type="text" name='name' placeholder="Name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" name='email' placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name='password' placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}