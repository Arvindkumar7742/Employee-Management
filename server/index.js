const express =require("express");
const { connect } = require("./config/database");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require('cors');
const loginRoute = require("./routes/login");
const employeeEoute = require("./routes/employee");
const { cloudinaryConnect } = require("./config/cloudinary");

//To fetch the dotenv variable
require("dotenv").config();

//To connect the database
connect();
//To connect clodinary
cloudinaryConnect();

//To pass the data from body
app.use(express.json());
//to file uplaod
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

//to use sereve the request from frontend
app.use(
	cors({
		origin:process.env.FRONTEND_REQ_URL,
		credentials:true,
	})
)

//use all the routes 
app.use("/api/v1",loginRoute);
app.use("/api/v1/employee",employeeEoute);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Hey, server is listening on :",PORT);
});

//BASE ROUTE
app.get("/",(req,res)=>{
	res.send("<h1>Server is running...</h1>")
})