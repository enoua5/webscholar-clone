<?php
require_once __DIR__ . "/functions.php";

checkOptionRequest();

$conn = connectDb();
$data = getRequestData();

$stmt = $conn->prepare("SELECT accountKey, username, password FROM accounts WHERE username=?");
$stmt->bind_param('s', $data['username'] );
$result = $stmt->execute();
$stmt->store_result();

if($stmt->num_rows === 0){
    jsonResponse([
        'success' => false,
        'error' => 'User does not exist.',
    ]);
}

$stmt->bind_result($accountKey, $username, $password);
$stmt->fetch();

if(!password_verify($data['password'], $password)){
    jsonResponse([
        'success' => false,
        'error' => 'Password does not match.',
    ]);
}

session_start();
$_SESSION['accountKey'] = $accountKey;
jsonResponse([
    'success' => true,
]);