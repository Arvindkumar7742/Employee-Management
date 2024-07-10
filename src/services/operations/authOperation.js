import toast from "react-hot-toast";
import {setLoading, setUser} from "../../slices/authSlice"
const { apiconnector } = require("../apiConnector");
const { AUTH } = require("../apis");

export function Signup(userName, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", AUTH.REGISTER_API, {
        userName , password
      });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("User Sign Up successfully");
      navigate("/");

    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Could not signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function login( userName, password, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      const res = await apiconnector("POST", AUTH.LOG_IN_API, { userName, password });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Logged in Succesfully");
      dispatch(setUser(res.data.data));
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Could not login")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    toast.success("Logeed out successfully");
    navigate("/");
  }
}

