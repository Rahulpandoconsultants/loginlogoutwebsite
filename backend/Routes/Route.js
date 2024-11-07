import {Router} from 'express';
import * as controller from '../Controllers/AppController.js'
const router= Router();

//post method
router.route('/register').post((req,res)=>res.json(controller.register));//register user
// router.route('./registerMail').post();//to send the mail
router.route('./authenticate').post((req,res)=>res.end());// authenticate the user
router.route('./login').post(controller.login);//login in app

//get method

router.route('/user/:username').get(controller.getUser); // user with userName
router.route('generateOTP').get(controller.generateOTP); //generate randon OTP
router.route('verifyOTP').get(controller.verifyOTP);  //verify generated OTp
router.route('createResetSession').get(controller.cereateResetSession); // reset all the variable

//put method
router.route('/updateuser').put(controller.updateUser);// to upadte the user profile
router.route("/reserPassword").put(controller.resetPassword);// use to reset the password 





export default router;