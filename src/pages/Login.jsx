import loginImg from "../data/login.jpg"
import Template from "../components/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Login from your username ans password."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login