import signupImg from "../data/signup.jpg"
import Template from "../components/Template"

function Signup() {
  return (
    <Template
      title="Employee Management System Sign Up"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup