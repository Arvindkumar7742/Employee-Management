import React, { useEffect, useState } from 'react'
import { getAllEmployees } from '../services/operations/emloyee';
import { formattedDate } from '../utils/dateFormatter';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const [loading, setLaoding] = useState(false);
    const [ num, setNum ] = useState(0);

    async function fetchAllEmployee() {
        setLaoding(true);
        try {
            const res = await getAllEmployees();
            setEmployees(res);
            console.log(employees);
        } catch (error) {
            console.log(error);
        }
        setLaoding(false);
    }
    useEffect(() => {
        fetchAllEmployee();
    }, []);
    return (
        <div className='text-white'>
            {
                loading ? (<div className='spinner'></div>) : (
                    employees.length == 0 ? (<div>No Employes in the list</div>) : (
                        <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th className='w-[200px]'>Create Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((item) => (
                            <tr key={item.id}>
                              <td>{num}</td>
                              <td><img className='rounded-full'
                              src={item.f_Image} alt={item.name} width="50"/></td>
                              <td>{item.f_Name}</td>
                              <td>{item.f_Email}</td>
                              <td>{item.f_Mobile}</td>
                              <td>{item.f_Designation}</td>
                              <td>{item.f_gender}</td>
                              <td>{item.f_Course}</td>
                              <td className='w-[200px]'>{formattedDate(item.f_createdate)}</td>
                              <td className='flex flex-row gap-5'>
                                <button className='bg-richblack-500 p-3 text-white rounded-lg hover:bg-richblack-700'>Edit</button>
                                <button className='bg-richblack-500 p-3 text-white rounded-lg hover:bg-richblack-700'>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                )
            }
        </div>
    )
}
