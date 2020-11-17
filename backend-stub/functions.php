<?php

function jsonResponse(array $data){
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH');
    header('Access-Control-Allow-Headers: content-type');

    $jsonString = json_encode($data);
    echo $jsonString;
    exit;
}

function connectDb() {
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = 'root';
    $DATABASE_NAME = 'cs4230';
    $DATABASE_PORT = 3307;

//try the connection to see if it works
    $conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME, $DATABASE_PORT);

    if (mysqli_connect_errno()) {
        //if there is an error stop and display error
        exit('Failed to connect to MySQL: ' .mysqli_connect_error());
    }

    return $conn;
}

function getRequestData(): array {
    return json_decode(file_get_contents('php://input'), true);
}

function checkOptionRequest() {
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH');
        header('Access-Control-Allow-Headers: content-type');
        exit();
    }
}