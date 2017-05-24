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

app.listen(3000, function() {
    console.log('Listening on port 3000..');

    // s3.listBuckets(function(error, data) {
    //     if (error) {
    //         console.log(error); // error is Response.error
    //     } else {
    //         console.log(data); // data is Response.data
    //     }
    // });

    params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

    s3.putObject(params, function(err, data) {

        if (err) {

            console.log(err)

        } else {

            console.log("Successfully uploaded data to myBucket/myKey");

        }

    });


})