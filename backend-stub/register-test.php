<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/functions.php';

function userWithEmailExistTest(){
    $headers = array('Accept' => 'application/json');
    $data = array(
        'school_email' => 'test@mail.com',
        'username' => 'test',
        'school_id' => 'W12345678',
        'password' => 'test',
    );

    $body = Unirest\Request\Body::json($data);

    $response = Unirest\Request::post('http://localhost:8000/register.php', $headers, $body);

    $responseBody = json_decode($response->raw_body, true);

    if(isset($responseBody['errors']['school_email'])){
        echo "Test pass\n";
    } else {
        echo "Test fail\n";
    }
}

function deleteUser($email){
    $conn = connectDb();
    $conn->query(sprintf("DELETE FROM accounts WHERE email='%s'", $email));
}

function registerTest() {
    deleteUser('test@mail.com');

    $headers = array('Accept' => 'application/json');
    $data = array(
        'school_email' => 'test@mail.com',
        'username' => 'test',
        'school_id' => 'W12345678',
        'password' => 'test',
    );

    $body = Unirest\Request\Body::json($data);

    $response = Unirest\Request::post('http://localhost:8000/register.php', $headers, $body);

    $responseBody = json_decode($response->raw_body, true);

    if(isset($responseBody['success'])&& $responseBody['success']==1){
        echo "Test pass\n";
    } else {
        echo "Test fail\n";
    }
}

registerTest();
userWithEmailExistTest();