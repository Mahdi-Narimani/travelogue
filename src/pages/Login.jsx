import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Login()
{

  const { LogIn, isAuthentication } = useAuth();

  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const submitHandler = (e) =>
  {
    e.preventDefault();

    if (email && password)
      LogIn(email, password);
  }

  useEffect(() =>
  {
    if (isAuthentication)
      navigate('/app', { replace: true })
  }, [isAuthentication, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">LOGIN</Button>
        </div>
      </form>
    </main>
  );
}
