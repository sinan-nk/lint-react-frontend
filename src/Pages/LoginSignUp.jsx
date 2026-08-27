import React, { useState } from 'react'
import './css/LoginSignup.css'

const LoginSignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreed) return
    // submit logic goes here
    console.log(form)
  }

  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="loginsignup-divider" />

        <div className="loginsignup-fields">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={!agreed}>Continue</button>

        <p className="loginsignup-login">
          Already have an account?
          <span role="button" tabIndex={0}> Login here</span>
        </p>

        <div className="loginsignup-agree">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agree">
            By continuing, I agree to the terms of use &amp; privacy policy.
          </label>
        </div>
      </form>
    </div>
  )
}

export default LoginSignUp