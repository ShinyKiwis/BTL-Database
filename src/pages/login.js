import LoginStyle from "../styles/Login.module.css";

const Login = () => {

    const submit = (e) => {
        e.preventDefault()
    }

  return (
    <main className={LoginStyle.container}>
      <div className={LoginStyle.left_column}>
        <div className={LoginStyle.intro}>
          <h1>"People should pursue</h1>
          <h1>what they're passionate about"</h1>
        </div>
      </div>
      <div className={LoginStyle.right_column}>
        <h2>Welcome back</h2>
        <form className={LoginStyle.form} onSubmit={(e)=> {submit(e)}}>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <button>Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
