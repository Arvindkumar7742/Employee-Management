const T_Login = require("../models/t_login");

exports.register = async (req, res) => {
    try {
        const { userName, password } = req.body;

        //validate the username ans password - should not be empty 
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "username and password is required."
            });
        }

        //validate the username - user alresy exist in db 
        const userExist = await T_Login.findOne({ f_userName: userName });
        
        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "user already exist."
            });
        }

        //create the user entry in database
        const user = await T_Login.create({
            f_userName: userName,
            f_Pwd: password
        })

        //send the success response
        return res.status(200).json({
            success: true,
            message: "user created successfully.",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in registering the user.",
            error: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        //validate the username ans password - should not be empty 
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "username and password is required"
            });
        }

        const user = await T_Login.findOne({ f_userName: userName });
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "user doesn't exist."
            });
        }

        //validation for password
        if( user.f_Pwd !=password ){
            return res.status(408).json({
                success: false,
                message: "Password does not match."
            });
        }

        //send the success response
        return res.status(200).json({
            success: true,
            message: "user logged in successfully.",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in loging in the user.",
            error: error.message
        });
    }
}
