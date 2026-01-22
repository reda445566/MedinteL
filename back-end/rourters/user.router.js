const Router = express();
const router = Router();
const usercontroller = require("../controrels/user.contoller")
router.post("/api/register/users" , usercontroller.register )//call the controller 
router.post("/api/login/users" ,usercontroller.login )//call the controller


userSchema.methods.comparePassword = async function (password) {
return await bcrypt.compare(password, this.password)
}

model.export = router;



