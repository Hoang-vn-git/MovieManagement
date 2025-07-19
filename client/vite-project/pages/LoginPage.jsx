import React from 'react';
import '../style/style.css';

export default function LoginPage() {

  return (
    <div className="container">
      <video autoPlay loop muted playsInline>
        <source src="../images/background-video.mp4" type="video/mp4" />
      </video>
      <h2>Login</h2>
      <form >
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}