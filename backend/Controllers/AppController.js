import UserModel from "../Models/User.Model.js";
import bcrypt from 'bcrypt';

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req, res) {
  try {
    const { userName, password, profile, email } = req.body;

    // check if the user exists
    const existUserName = new Promise((resolve, reject) => {
      UserModel.findOne({ userName }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });
        resolve();
      });
    });

    // check if the mail address'
    const existemail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique Email" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
    .then(() => {
        if(password){
            bcrypt.hash(password, 10)
                .then( hashedPassword => {
                    
                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email
                    });

                    // return save result as a response
                    user.save()
                        .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                        .catch(error => res.status(500).send({error}))

                }).catch(error => {
                    return res.status(500).send({
                        error : "Enable to hashed password"
                    })
                })
        }
    }).catch(error => {
        return res.status(500).send({ error })
    })



  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(req, res) {
  res.json("login route");
}

export async function getUser(req, res) {
  res.json("GetUSer route");
}

export async function updateUser(req, res) {
  res.json("update user route");
}

export async function generateOTP(req, res) {
  res.json("generate otp route");
}

export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

export async function cereateResetSession(req, res) {
  res.json("Resert route");
}
export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
