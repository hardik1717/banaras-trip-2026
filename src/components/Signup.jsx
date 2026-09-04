import { useState } from "react";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

function Signup({ onSignup, onLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }


    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }


    const users =
      JSON.parse(
        localStorage.getItem("banarasUsers")
      ) || [];


    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );


    if (existingUser) {
      alert("An account with this email already exists.");
      return;
    }


    const newUser = {

      id: Date.now(),

      name,

      email,

      password,

      role: "MEMBER",

    };


    users.push(newUser);


    localStorage.setItem(
      "banarasUsers",
      JSON.stringify(users)
    );


    localStorage.setItem(
      "banarasCurrentUser",
      JSON.stringify(newUser)
    );


    onSignup(newUser);

  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <span>BH</span>
        </div>


        <span className="section-label">
          BANARAS 2026
        </span>


        <h1>Create account</h1>


        <p className="auth-subtitle">
          Join the journey.
        </p>


        <form onSubmit={handleSubmit}>


          <div className="auth-field">

            <User size={18} />

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="auth-field">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <div className="auth-field">

            <LockKeyhole size={18} />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />


            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>


          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>


        <div className="auth-switch">

          <span>
            Already have an account?
          </span>

          <button onClick={onLogin}>
            Sign in
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;