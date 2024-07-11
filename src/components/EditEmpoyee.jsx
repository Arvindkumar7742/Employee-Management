import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateEmployee } from '../services/operations/emloyee';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const EditEmployee = () => {

    const location = useLocation();
    const { _id, f_Name, f_Email, f_Mobile, f_gender, f_Course, f_Image, f_Designation } = location.state || {};
    console.log("location==>>", location.state);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        formData.append("id", _id);
        formData.append("email", data.email);
        formData.append("mobileNo", data.mobileNo);
        formData.append("designation", data.designation);
        formData.append("gender", data.gender);
        formData.append("course", data.course);

        try {
            updateEmployee(formData, navigate);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div >
            {
                loading ? (<div className='spinner mx-auto mt-[300px]'></div>) : (<div>
                    <h1 className='text-richblack-200 text-[30px] mb-10'>Edit Employee</h1>
                    <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-2 w-[700px]'>
                        <div className='flex flex-col gap-5' >

                            <label htmlFor='name' className='flex flex-row items-center text-white gap-20'>
                                <span>Name</span>
                                <input
                                    type="text"
                                    id='name'
                                    defaultValue={f_Name}
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
                                    defaultValue={f_Email}
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
                                    defaultValue={f_Mobile}
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
                                    {...register("designation", { required: true })}
                                    defaultValue={f_Designation}>
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
                                        <input type="radio" id="male" value="M"
                                            {...register("gender", { required: true })}
                                            checked={f_gender == "M"}
                                        />
                                        <label htmlFor="male">M</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" value="F"
                                            checked={f_gender == "F"}
                                            {...register("gender", { required: true })} />
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
                                                checked={f_Course[0].includes("MCA")}
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
                                                checked={f_Course[0].includes("BCA")}
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
                                                checked={f_Course[0].includes("BSC")}
                                            />
                                            BSC
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row gap-8 text-white'>
                                <label htmlFor="img">Upload Image</label>
                                <div className='flex flex-row gap-4 items-center'>
                                    <img src={f_Image} alt="img" width={50} height={50} className='rounded-full' />
                                    <input
                                        type="file"
                                        id="img"
                                        {...register('img')}
                                        accept=".jpg,.png"
                                    />
                                </div>
                            </div>

                        </div>
                        <button type='submit' className='flex justify-center items-center bg-yellow-200 text-richblack-900 rounded-md p-3 w-[60%] mt-5'>Save</button>
                    </form>
                </div>)
            }
        </div>
    )
}
