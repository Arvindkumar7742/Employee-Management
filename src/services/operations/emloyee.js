import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { EMPLOYEE } from "../apis";

export function CreateEmployee(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", EMPLOYEE.CREATE_EMPLOYEE_API, formData);

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Employe created succefully");
      navigate("/get-employee-list");

    } catch (error) {
      console.log("CREATE EMPLOYEE API ERROR............", error)
      toast.error("Could not create employee");
    }
    toast.dismiss(toastId);
  }
}

export function updateEmployee(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", EMPLOYEE.UPDATE_EMPLOYEE_API, formData);

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Employe updated succefully");
      navigate("/get-employee-list");

    } catch (error) {
      console.log("CREATE UPADATE API ERROR............", error)
      toast.error("Could not update employee");
    }
    toast.dismiss(toastId);
  }
}

export async function getAllEmployees() {
  let result;
  const toastId = toast.loading("loading....");
  try {
    const res = await apiconnector("GET", EMPLOYEE.GET_EMPLOYEES_API);

    console.log("res:::=====>>>>>", res);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    result = res.data.data;
    toast.success("Employee list fetched successfully");

  } catch (error) {
    console.log("GET ALL EMPLOYEES API ERROR............", error)
    toast.error("Could not get employee list");
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteEmployee(id,navigate) {
  let result;
  const toastId = toast.loading("loading....");
  try {
    const res = await apiconnector("DELETE", EMPLOYEE.DELETE_EMPLOYEE_API, {id});

    console.log("res:::=====>>>>>", res);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("Employee deleted succefully");
    navigate("/get-employee-list");

  } catch (error) {
    console.log("CREATE UPADATE API ERROR............", error)
    toast.error("Could not get employee list");
  }
  toast.dismiss(toastId);
}