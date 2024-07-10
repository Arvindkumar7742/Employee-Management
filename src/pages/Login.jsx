import loginImg from "../data/login.jpg"
import Template from "../components/Template"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const {user} = useSelector((state)=>state.auth);
  const navigate = useNavigate();

  console.log("user printing -->",user);
  useEffect(()=>{
    if(user){
      navigate("/dashboard/my-profile");
    }
  },[]);
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