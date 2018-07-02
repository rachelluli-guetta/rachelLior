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

const bucketNamesss = 'rachel-lior-userssss';
const usersFolder = 'users/';

const getAllUsersParams = {
    Bucket: bucketName,
    Prefix: usersFolder
};

app.use(jsonParser);

app.get('/getAllUsers', function(req, res){
    console.log('Getting all the users..');

    s3.listObjects(getAllUsersParams, function (err, data) {
        if(err) {
            console.log('Error when listing the bucket objects: ' + JSON.stringify(err));
            res.send('An error occurred when getting all the users :(')
        } else {
            var contents = data.Contents;

            var foundUsers = JSON.stringify(contents.map(getKey));

            res.send(foundUsers);
            console.log('Found data: ' + foundUsers);
        }

    });

});

function getKey(item, index) {
    return item.Key;
}

app.get('/getUser/:username', function(req, res) {

    const username = req.params.username;

    const getUserParams = {
        Bucket: bucketName,
        Key: usersFolder + username
    };

    s3.getObject(getUserParams, function(err, data) {
        if(err) {
            console.log('Error when getting user ' + username + ': ' + JSON.stringify(err));
            const statusCode = err.statusCode;

            if (statusCode == 404) {
                res.status(statusCode).send('User ' + username + ' not found');
            }

            res.status(500).send('Error when getting user ' + username)

        } else {
            res.send(data.Body.toString());
            console.log('Found data: ' + data.Body.toString());
        }

    })

});

app.post('/addUser', function (req, res) {

    const username = req.body.name;

    params = {Bucket: bucketName, Key: 'users/' + username, Body: JSON.stringify(req.body), ContentType: 'text/plain'};

    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error occurred when adding user ' + username);
        } else {
            res.send('Successfully uploaded data ' + JSON.stringify(req.body));
        }

    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});