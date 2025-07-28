import React, { useEffect, useState } from 'react';
import '../style/style.css';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/logout', {
      method: 'GET',
      credentials: 'include',
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8000/api', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (res.ok) {
        navigate('/movies');
      } else {
        alert("Can not log in")
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