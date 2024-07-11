import React, { useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployees } from '../services/operations/emloyee';
import { formattedDate } from '../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import { Logoutmodal } from './Logoutmodal';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const [confirmationModal, setConfirmationmodal] = useState(null);
  const [loading, setLaoding] = useState(false);

  const navigate = useNavigate(); 
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
      <div className='text-3xl text-richblack-100 text-3xl mb-4'>Employee List</div>
      {
        loading ? (<div className='spinner'></div>) : (
          employees.length == 0 ? (<div className='text-richblack-300 text-2xl text-center'>No Employes in the list</div>) : (
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
                    <td>{item.f_Id}</td>
                    <td><img className='rounded-full'
                      src={item.f_Image} alt={item.name} width={50} height={50} /></td>
                    <td>{item.f_Name}</td>
                    <td>{item.f_Email}</td>
                    <td>{item.f_Mobile}</td>
                    <td>{item.f_Designation}</td>
                    <td>{item.f_gender}</td>
                    <td>{item.f_Course}</td>
                    <td className='w-[200px]'>{formattedDate(item.f_createdate)}</td>
                    <td className='flex flex-row gap-5'>
                      <Link to="/dashboard/editEmployee" state={item}><button className='bg-richblack-500 p-3 text-white rounded-lg hover:bg-richblack-700'>Edit</button></Link>
                      <button
                        onClick={() => {
                          setConfirmationmodal({
                            text1: "Are you sure?",
                            text2: `Do you want to delete the employee - ${item.f_Name}`,
                            btn1: "Delete",
                            btn2: "Cancel",
                            onclick1: () => {
                              deleteEmployee(item._id,navigate);
                              setConfirmationmodal(null);
                            },
                            onclick2: () => {
                              setConfirmationmodal(null);
                            }
                          })
                        }}
                        className='bg-richblack-500 p-3 text-white rounded-lg hover:bg-richblack-700'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )
      }
      {
        confirmationModal && <Logoutmodal data={confirmationModal} />
      }
    </div>
  )
}
