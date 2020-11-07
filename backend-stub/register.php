<?php
require_once __DIR__ . "/functions.php";

$conn =connectDb();

$data = getRequestData();

function UserWithEmailExist($email): bool {

}

if(UserWithEmailExist($data['school_email'])){
    jsonResponse([
            'success'=> false,
            'errors'=> ['school_email' => "Email is already in use."]
        ]
    );
}
//todo finish user with email exist function and insert user into database