import React from 'react'
import './Box.css'
export default function Box() {
    return (
        <div className='box-container'>
            <div className="heading">
                Sign In
            </div>
            <form action="">
                <div className="input">
                    <div className="user_name">
                        <input type="text" name="" id="user_name" required />
                        <label htmlFor="user_name" className='user_name_label'>Email</label>
                    </div>
                    <div className="password">
                        <input type="password" name="" id="password" required />
                        <label htmlFor="password" className='password_label'>Password</label>
                    </div>
                    <div className="submit">
                        <button type="submit">
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
            <div style={{
                padding:"20px", 
                color:"#ffffff",
                fontSize:"25px",
                textAlign:"center"
                }}>Or</div>
            <div className="submit">
                <button type="submit" style={{
                backgroundColor:"rgba(187, 187, 187, 0.5)",
                 color:"#ffffff"
            }}>
                    Sign up
                </button>
            </div>
        </div>
    )
}
