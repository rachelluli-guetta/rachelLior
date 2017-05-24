/**
 * Created by rachelg on 24/05/2017.
 */

const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const s3 = new AWS.S3();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


//User is stored by:
//key: username
//user data: {firstName: ..., lastName: ..., email: ..., phoneNo: ...}

const bucketName = 'rachel-lior-users';
const getAllUsersParams = {
    Bucket: bucketName,
    Prefix: 'users'
};

app.use(jsonParser);

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

});

app.post('/addUser', function (req, res) {
    console.log(req.body);
    params = {Bucket: bucketName, Key: 'users/lior', Body: JSON.stringify(req.body), ContentType: 'text/plain',};

    s3.putObject(params, function(err, data) {

        if (err) {
            console.log(err)
        } else {
            res.send('Successfully uploaded data');
            console.log("Successfully uploaded data to myBucket/myKey");
        }

    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000..');
});