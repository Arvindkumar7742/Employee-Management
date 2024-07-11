import React, { useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployees } from '../services/operations/emloyee';
import { formattedDate } from '../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import { Logoutmodal } from './Logoutmodal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 3;
  const [confirmationModal, setConfirmationmodal] = useState(null);
  const [loading, setLaoding] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [sort, setSort] = useState('');

  // let totalPage = pageNumber+1;
  const navigate = useNavigate();
  async function fetchAllEmployee() {
    setLaoding(true);
    try {
      console.log('pageNumber', pageNumber)
      let offset = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;
      let params = {
        offset,
        limit
      }
      const res = await getAllEmployees(params);
      setEmployees(res);
    } catch (error) {
      console.log(error);
    }
    setLaoding(false);
  }
  useEffect(() => {
    fetchAllEmployee();
  }, [pageNumber]);
  function handleSort(event) {

    let sorttype = event.target.value;
    setSort(sorttype)
    let emp = employees;
    emp.sort((a, b) => {
      // Compare f_Name
      if (sorttype == 'Name') {
        if (a.f_Name < b.f_Name) return -1;
        if (a.f_Name > b.f_Name) return 1;
      }
      // If f_Name is equal, compare f_Id
      else if (sorttype == 'Id') {
        if (a.f_Id < b.f_Id) return -1;
        if (a.f_Id > b.f_Id) return 1;
      }
      // If f_Id is also equal, compare f_Email
      else if (sorttype == 'Email') {
        if (a.f_Email < b.f_Email) return -1;
        if (a.f_Email > b.f_Email) return 1;
      }
      // If f_Email is also equal, compare f_createdate
      else if (sorttype == 'Date') {
        if (a.f_createdate < b.f_createdate) return -1;
        if (a.f_createdate > b.f_createdate) return 1;
      }
      // If all keys are equal, return 0
      else return 0;
    });
    console.log(emp);
    setEmployees(emp);
  }

  return (
    <div className='text-white'>
      <div className='text-3xl text-richblack-100 text-3xl mb-4'>Employee List</div>
      <div className='mb-2 mt-2 w-[200px]'>
        <FormControl fullWidth sx={{ margin: 1, minWidth: 120 }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: 'white', fontSize: '0.8rem' }}
          >
            Sort By
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={handleSort}
            sx={{
              color: 'white',
              fontSize: '0.8rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Changing outline/border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Changing outline/border color on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Changing outline/border color when focused
              },
            }}
          >
            <MenuItem
              value={'Id'}
              sx={{ color: 'black', fontSize: '0.8rem' }}
            >
              Id
            </MenuItem>
            <MenuItem
              value={'Name'}
              sx={{ color: 'black', fontSize: '0.8rem' }}
            >
              Name
            </MenuItem>
            <MenuItem
              value={'Email'}
              sx={{ color: 'black', fontSize: '0.8rem' }}
            >
              Email
            </MenuItem>
            <MenuItem
              value={'Date'}
              sx={{ color: 'black', fontSize: '0.8rem' }}
            >
              Date
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
                <label htmlFor="search"> Search </label>
                <input
                  id='search'
                  type="text"
                  placeholder="Search employees"
                  value={searchQuery}
                  onChange={(e) => {
                    const { value } = e.target;
                    setSearchQuery(value);
                    
                    // Create a case-insensitive regular expression
                    const regex = new RegExp(value, 'i');
                    
                    // Filter employees based on f_Name matching the regex
                    const filteredEmployees = employees.filter((employee) => regex.test(employee.f_Name));
                    
                    // Update the filtered employees state
                    setEmployees(filteredEmployees);
                  }}
                  className='mt-5 mb-5 rounded-md text-black'
                />
              </div>
      {
        loading ? (<div className='spinner'></div>) : (
          employees.length == 0 ? (<div className='text-richblack-300 text-2xl text-center'>No Employes in the list</div>) : (
            <div>
            
              <div>
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
                                  deleteEmployee(item._id, navigate);
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
              </div>
            </div>
          )
        )
      }

      <div className='text-richblack-5 mt-10'>
        <Stack spacing={2}>
          <Pagination count={employees.length === limit ? pageNumber + 1 : pageNumber} sx={{ '& .MuiPaginationItem-page': { color: 'white' } }}
            onChange={(event, page) => setPageNumber(page)} color="primary" />

        </Stack>
      </div>

      {
        confirmationModal && <Logoutmodal data={confirmationModal} />
      }
    </div>
  )
}
