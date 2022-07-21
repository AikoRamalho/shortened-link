import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { auth, signInWitFacebook } from "../client/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate ();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={signInWitFacebook}>
          Login with Facebook
        </button>
      </div>
    </div>
  );
}
export default Login;