const base_url = process.env.REACT_APP_BASE_URL;

export const AUTH = {
    LOG_IN_API:base_url + '/login',
    REGISTER_API:base_url+ '/register'
}

export const EMPLOYEE = {
    CREATE_EMPLOYEE_API: base_url + '/employee/createEmployee',
    UPDATE_EMPLOYEE_API: base_url + '/employee/updateEmployee',
    GET_EMPLOYEES_API: base_url + '/employee/getAllEmployees',
    DELETE_EMPLOYEE_API: base_url + '/employee/deleteEmployee'
}

