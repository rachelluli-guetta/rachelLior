/**
 * Created by rachelg on 24/05/2017.
 */

const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const s3 = new AWS.S3();

//User is stored by:
//key: username
//user data: {firstName: ..., lastName: ..., email: ..., phoneNo: ...}

const bucketName = 'rachel-lior-users';
const usersFolder = 'users/';
const getAllUsersParams = {
    Bucket: bucketName,
    Prefix: usersFolder
};

app.get('/getAllUsers', function(req, res){
    console.log('Getting all the users..');

    s3.listObjects(getAllUsersParams, function (err, data) {
        if(err) {
            console.log('Error when listing the bucket objects: ' + JSON.stringify(err));
            res.send('An error occurred when getting all the users :(')
        } else {
            var contents = data.Contents;

            res.send(JSON.stringify(contents))
            console.log('Found data: ' + JSON.stringify(data));
        }

    });

});


app.get('/getUser/:username', function(req, res) {

    const username = req.params.username;

    const getUserParams = {
        Bucket: bucketName,
        Key: usersFolder + username
    }

    s3.getObject(getUserParams, function(err, data) {
        if(err) {
            console.log('Error when getting user ' + username + ': ' + JSON.stringify(err));
            const statusCode = err.statusCode;

            if (statusCode == 404) {
                res.status(statusCode).send('User ' + username + ' not found');
            }

            res.status(500).send('Error when getting user ' + username)

        } else {
            res.send(data.Body.toString())
            console.log('Found data: ' + data.Body.toString());
        }

    })

});


app.listen(3000, function() {
    console.log('Listening on port 3000..');
});