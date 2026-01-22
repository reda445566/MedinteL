const { default: bcrypt } = require("bcryptjs")
const usermodel = require("../models/user.model")
const bcrypt = require(bcrypt)

//functions for apis
exports.register =  async function (req,res) {
try{
let newuser =  await new usermodel(req.body)
const hashpassword = await bcrypt.hash(req.body.password , 10)
newuser.password = hashpassword;
let user = newuser.save();
res.status(201);
}catch(err){

    console.log(err)
    res.status(400);
}
}

exports.login=  async function (req,res) {
try{
let user = await usermodel.findone(req.body.email)
if(!user|| await user.comparepassword(req.body.password)){


    res.status(400);



}else{
res.status(200);

}


}catch(err){

    console.log(err)
}
}


exports.delete =  async function (req,res){

let user = user.delete
if(!user){

    res.status(404);

}else{

res.status(200);
}


}