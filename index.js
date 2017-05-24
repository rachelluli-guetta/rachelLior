/**
 * Created by rachelg on 24/05/2017.
 */

const AWS = require('aws-sdk');
const express = require('express');
const app = express();

//User is stored by:
//key: Base64(username_password)
//user data: {firstName: ..., lastName: ..., email: ..., phoneNo: ...}


app.listen(3000, function() {
    console.log('Listening on port 3000..');
})