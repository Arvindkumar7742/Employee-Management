const T_Employee = require("../models/t_employee");
const { uploadOnCloudinary } = require("../utiils/cloudinary");

exports.createEmployee = async (req, res) => {
    try {
        //fetch the data
        const { name, email, mobileNo, designation, gender, course } = req.body;

        //fetch the file
        const img = req.files.img;

        //validate the data - to be non empty
        if (!name || !email || !mobileNo || !designation || !gender || !course || !img) {
            return res.status(400).json({
                success: false,
                message: "All the field are required."
            })
        }

        //validation check -- email already exist ?
        const emailExist = await T_Employee.findOne({ f_Email: email });
        if (emailExist) {
            return res.status(409).json({
                success: false,
                message: "email already Exist."
            })
        }

        //upload image on cloudinary
        const uploadedImage = await uploadOnCloudinary(img);

        const employee = await T_Employee.create({
            f_Name: name, f_Email: email, f_Mobile: mobileNo,
            f_Designation: designation, f_gender: gender,
            f_Course: course,
            f_Image: uploadedImage.secure_url
        });

        return res.status(200).json({
            success: true,
            meassge: "Employe created successfully.",
            employee: employee,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in creating the employee.",
            error: error.message
        });
    }
}

exports.fetchAllEmployee = async (req, res) => {
    try {
        //fetch all the employee
        const employees = await T_Employee.find({});

        //return a successsfully response
        return res.status(200).json({
            success: true,
            message: "All employees are fetched successfully.",
            data: employees
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in fetching all the employees.",
            error: error.message
        });
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const { id, name, email, mobileNo, designation, gender, course } = req.body;

        //fetch the file
        const img = req.files.img;

        //validate the data - to be non empty
        if (!name || !email || !mobileNo || !designation || !gender || !course || !img) {
            return res.status(400).json({
                success: false,
                message: "All the field are required."
            })
        }

        //validation check -- employee exist ?
        const employeeExist = await T_Employee.findById(id);
        if (!employeeExist) {
            return res.status(409).json({
                success: false,
                message: "email not exist."
            });
        }

        //upload image on cloudinary
        const uploadedImage = await uploadOnCloudinary(img);

        //update the employee
        const updatedEmployee = await T_Employee.findByIdAndUpdate(id, {
            f_Name: name, f_Email: email, f_Mobile: mobileNo,
            f_Designation: designation, f_gender: gender,
            f_Course: course,
            f_Image: uploadedImage.secure_url
        },{new:true})

        //return the success response
        return res.status(200).json({
            success:true,
            message:"Employee updated successfully,",
            employee:updatedEmployee
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in updating the employee.",
            error: error.message
        });
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        //Fetch the id of employee that need to be deleted
        const { id } = req.body;

        //validate the employee
        const employeeExist = await T_Employee.findById(id);
        if (!employeeExist) {
            return res.status(409).json({
                success: false,
                message: "employee does not exist."
            });
        }

        //Delete the employee
        await T_Employee.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "employee deleted succcesfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in deleting the employee",
            error: error.message
        })
    }
}