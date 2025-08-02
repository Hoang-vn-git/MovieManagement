import React, { useEffect, useState } from 'react';
import '../style/style.css';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      const message = await res.json()

      if (res.ok) {
        navigate('/movies');
        alert(message.message)
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <Link to='/register'>Register</Link>
    </div>
  );
}