import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
} from "../features/authentication/authSelectors";
import { logIn } from "../features/authentication/authThunks";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

const SigninPage = () => {
  // Inner State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Routing
  const navigate = useNavigate();

  // Redux State
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);
  const { hasError, errorMessage } = error;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(logIn({ user: email, pass: password }))
      .unwrap()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="mid-row">
      {loading && <LoadingBox />}
      {hasError && <MessageBox message={errorMessage} />}
      <form className="login-form" onSubmit={submitHandler}>
        <h1>Sign In</h1>
        <div>
          <label htmlFor="email">E-mail</label> <br />
          <input
            type="email"
            id="email"
            placeholder={`e.g. "example@example.com" `}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            placeholder={`e.g. "password" `}
            minLength="8"
            maxLength="25"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;