import express from "express";
const router = express.Router();
import UserPool from './saasAdmin-userPool.js'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import saasAdminUserPool from "./saasAdmin-userPool.js";

router.post('/signup', (req, res) => {
    const payload = req.body;
    const email = payload.email
    const password = payload.password

    UserPool.signUp(email,password,[],null,(err,data)=>{
        if(err){
          console.log(err)
          res.send(err);
        }
        else{
        //   console.log(data);
          res.send(data);
        }
      })
})


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = new CognitoUser({
        Username: email,
        Pool: saasAdminUserPool
    })
    const AuthDetails= new AuthenticationDetails({
        email: email,
        Password: password
    })
    user.authenticateUser(AuthDetails,{
        onSuccess:(data)=>{
            // console.log(data)
            res.send(data);
        },
        onFailure:(err)=>{
            console.log(err)
            res.send(err)
        },
        newPasswordRequired:(data)=>{
            console.log("newPasswordReq",data);
        }
    })


    
})

export default router;