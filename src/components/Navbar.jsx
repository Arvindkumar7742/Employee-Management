import React from 'react'
import product from "../data/employee.png"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authOperation';

export const Navbar = () => {
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clickHandler(){
    dispatch(logout(navigate));
  }

  return (
    <div className='w-full min-h-[50px] bg-richblack-700 flex flex-col gap-2 items-center justify-center'>
      <div className='flex flex-row justify-between gap-10 mt-6'>
        <img src={product} alt="" width={70} height={90} className='rounded-full' />
        <p className='text-richblack-50 text-3xl mx-auto my-auto'>Employee Management System</p>
      </div>
      {
        user && (
          <div className='flex flex-col items-center justify-center'>
            <div className='w-screen h-[0.01rem] bg-richblack-200 mt-2'></div>
            <div className='flex flex-row gap-[180px] text-xl text-richblack-50 mt-5 mb-2 mx-auto'>
            <div className='hover:bg-richblack-200 hover:rounded-lg p-1 transition-all transition-200'>
              <Link to="/dashboard/my-profile">Home</Link>
            </div>
            <div className='hover:bg-richblack-200 hover:rounded-lg p-1 transition-all transition-200'>
              <Link to="/dashboard/get-all-employee">Employee List</Link>
            </div>
            <div className='hover:bg-richblack-200 hover:rounded-lg p-1 transition-all transition-200 cursor-pointer'>
              <p>
              {
                user.f_userName
              }
              </p>
            </div>
            <div className='hover:bg-richblack-200 hover:rounded-lg p-1 transition-all transition-200'>
              <button onClick={clickHandler}>
                logout
              </button>
            </div>
          </div>
          </div>
        )
      }
    </div>
  )
}
