import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./pages/MyProfile";
import { CreateEmployee } from "./components/CreateEmployee";
import { EmployeeList } from "./components/EmployeeList";

function App() {
 
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile"
            element={<MyProfile />}
          ></Route>
          <Route path="/dashboard/create-employee"
            element={<CreateEmployee />}
          ></Route>
          <Route path="/dashboard/get-all-employee"
            element={<EmployeeList/>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
