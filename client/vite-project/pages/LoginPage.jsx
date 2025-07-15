import React from 'react';
import '../style/style.css';

export default function LoginPage() {

  return (
    <div className="container">
      <h2>Login</h2>
      <form >
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}