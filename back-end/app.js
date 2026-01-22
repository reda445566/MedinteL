const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const express = require(express);
const bodyparser = require("bodyParser")
const router = require("./rourters/user.router")
const mongoose = require("mongoose");
const app = express()

app.use(bodyParser.json());
const port = 3000;

const url = "mongodb+srv://mag:<1234@cluster0.r1vfnch.mongodb.net/?appName=Cluster0"

// connect with datebase 

const connectDB = async ()=>{
try{
await mongoose.connect(url)
    console.log("DB connected")



}catch(err){
    console.log(error,"err", )
    res.json({ message: "server error" })

}

}
connectDB();

// router handel 

app.use('/', userRouter)

// error routers handling

app.use((req,res)=>{

res.status(404);
})
app.listen(port);



