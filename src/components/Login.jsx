import { useState } from "react";
import {
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx13H3QlqThrXVPvBRVGh-u8e6ovEawk75UcXF3c9MDlhmohUJHqLs5SZmXSNyhAQosjQ/exec";


function Login({ onLogin, onCreateAccount }) {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // =========================
    // VALIDATION
    // =========================

    if (!phone.trim() || !password) {

      setError(
        "Phone number and password are required."
      );

      return;
    }


    try {

      setLoading(true);


      // =========================
      // SEND LOGIN REQUEST
      // =========================

      const formData =
        new URLSearchParams();

      formData.append(
        "phone",
        phone.trim()
      );

      formData.append(
        "password",
        password
      );


      const response =
        await fetch(
          GOOGLE_SCRIPT_URL,
          {
            method: "POST",
            body: formData,
          }
        );


      const result =
        await response.json();


      // =========================
      // LOGIN FAILED
      // =========================

      if (!result.success) {

        setError(
          result.message ||
          "Invalid phone number or password."
        );

        return;
      }


      // =========================
      // LOGIN SUCCESS
      // =========================

      localStorage.setItem(
        "banaras_user",
        JSON.stringify(result.user)
      );


      if (onLogin) {

        onLogin(result.user);

      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-card">


        {/* Logo */}

        <div className="auth-logo">

          <span>BH</span>

        </div>


        {/* Header */}

        <div className="auth-header">

          <span className="section-label">
            BANARAS 2026
          </span>


          <h1>
            Welcome back
          </h1>


          <p className="auth-subtitle">
            Sign in to continue your journey.
          </p>

        </div>


        {/* Form */}

        <form onSubmit={handleSubmit}>


          {/* PHONE */}

          <div className="auth-field">

            <Phone size={18} />


            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {

                setPhone(
                  e.target.value
                );

                setError("");

              }}
              autoComplete="tel"
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-field">

            <LockKeyhole size={18} />


            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => {

                setPassword(
                  e.target.value
                );

                setError("");

              }}
              autoComplete="current-password"
            />


            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >

              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>


          {/* ERROR */}

          {error && (

            <div className="auth-error">

              {error}

            </div>

          )}


          {/* SIGN IN */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        {/* CREATE ACCOUNT */}

        <div className="auth-switch">

          <span>
            Don't have an account?
          </span>


          <button
            type="button"
            onClick={onCreateAccount}
          >
            Create account
          </button>

        </div>


      </div>

    </div>

  );

}


export default Login;