/**
 * Created by rachelg on 24/05/2017.
 */

const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const s3 = new AWS.S3();

//User is stored by:
//key: Base64(username_password)
//user data: {firstName: ..., lastName: ..., email: ..., phoneNo: ...}

const bucketName = 'rachel-lior-users';
const getAllUsersParams = {
    Bucket: bucketName,
    Prefix: 'users'
}


app.get('/getAllUsers', function(req, res){

    console.log('Getting all the users..');

    s3.listObjects(getAllUsersParams, function (err, data) {
        if(err) {
            console.log('Error when listing the bucket objects: ' + JSON.stringify(err));
        }

        var contents = data.Contents;

        res.send(JSON.stringify(contents))
        console.log('Found data: ' + JSON.stringify(data));
    });

})


app.listen(3000, function() {
    console.log('Listening on port 3000..');
})