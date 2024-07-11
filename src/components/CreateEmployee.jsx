import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { createEmployee } from '../services/operations/emloyee';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const CreateEmployee = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  async function submitHandler(data) {
    setLoading(true);
    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobileNo", data.mobileNo);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("course", data.course);

    try {
      createEmployee(formData, navigate);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    reset({
      name: "",
      email: "",
      mobileNo: "",
      designation: "",
      gender: "",
      course: [],
      img: []
    })
  }, [reset, isSubmitSuccessful]);

  return (
    <div >
      {
        loading ? (<div className='spinner mx-auto mt-[300px]'></div>) : (<div>
          <h1 className='text-richblack-200 text-[30px] mb-10'>Create Employee</h1>
          <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-2 w-[700px]'>
            <div className='flex flex-col gap-5' >

              <label htmlFor='name' className='flex flex-row items-center text-white gap-20'>
                <span>Name</span>
                <input
                  type="text"
                  id='name'
                  className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                  name='name'
                  placeholder='Enter Name'
                  {...register("name", { "required": true })}
                />
                {
                  errors.name && (
                    <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your name*</span>
                  )
                }
              </label>
              <label htmlFor='email' className='flex flex-row items-center text-white gap-20'>
                <span>Email</span>
                <input
                  type="email"
                  id='email'
                  className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                  name='email'
                  placeholder='Enter Email'
                  {...register("email", { "required": true })}
                />
                {
                  errors.email && (
                    <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your Email*</span>
                  )
                }
              </label>
              <label htmlFor='mobileNo' className='flex flex-row items-center text-white gap-12'>
                <span>Mobile No</span>
                <input
                  type="tel"
                  id='mobileNo'
                  className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                  name='mobileNo'
                  placeholder='Enter mobile No'
                  {...register("mobileNo", { "required": true })}
                />
                {
                  errors.mobileNo && (
                    <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your Mobile No*</span>
                  )
                }
              </label>
              <div className='flex flex-row gap-10'>
                <label className='text-white' htmlFor="designation">Designation</label>
                <select name="designation" id="designation" className='text-white bg-richblack-700 rounded-md p-[17px] border-neutral-500  border-b-[1pt] outline-none w-[90px] p-[9px] '
                  {...register("designation", { required: true })}>
                  <option value="" selected disabled hidden>Select</option>
                  <option className='text-richbalck-100 bg-richblack-800 rounded-md' value="HR">HR</option>
                  <option className='text-richbalck-100 bg-richblack-800 rounded-md' value="Manager">Manager</option>
                  <option className='text-richbalck-100 bg-richblack-800 rounded-md' value="Sales">sales</option>
                </select>
                {
                  errors.designation && (
                    <span className='text-[13px] mt-2 text-yellow-200'>
                      Enter your designation*
                    </span>
                  )
                }
              </div>
              <div className='flex flex-row text-white'>
                <label className='mr-[75px]'>Gender</label>
                <div className='flex flex-row gap-2'>
                  <div>
                    <input type="radio" id="male" value="M" {...register("gender", { required: true })} />
                    <label htmlFor="male">M</label>
                  </div>
                  <div>
                    <input type="radio" id="female" value="F" {...register("gender", { required: true })} />
                    <label htmlFor="female">F</label>
                  </div>
                </div>
                {errors.gender && <p>This field is required</p>}
              </div>
              <div className='flex flex-row gap-10 text-white'>
                <label className='mr-10'>Course</label>
                <div className=''>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="MCA"
                        {...register('course')}
                      />
                      MCA
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="BCA"
                        {...register('course')}
                      />
                      BCA
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="BSC"
                        {...register('course')}
                      />
                      BSC
                    </label>
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-8 text-white'>
                <label htmlFor="img">Upload Image</label>
                <input
                  type="file"
                  id="img"
                  {...register('img')}
                  accept=".jpg,.png"
                />
              </div>

            </div>
            <button type='submit' className='flex justify-center items-center bg-yellow-200 text-richblack-900 rounded-md p-3 w-[60%] mt-5'>Create</button>
          </form>
        </div>)
      }
    </div>
  )
}
