<?php
require_once __DIR__ . "/functions.php";

checkOptionRequest();

$conn = connectDb();
$data = getRequestData();

function UserWithEmailExist($email, mysqli $conn): bool
{
    $result = $conn->query("SELECT count(*) as accountCount FROM accounts WHERE email='$email'");
    $data = $result->fetch_assoc();

    if ($data['accountCount'] == 0) {
        return false;
    }
    return true;
}

if (UserWithEmailExist($data['school_email'], $conn)) {
    jsonResponse([
        'success' => false,
        'error' => null,
        'errors' => ['school_email' => 'User with this email already exist.']
    ]);
}

$password = password_hash($data['password'], PASSWORD_DEFAULT);
$active = 1;

$stmt = $conn->prepare('INSERT INTO accounts (email, username, password, schoolid, active) VALUES (?,?,?,?,?)');
if ($stmt === false) {
    echo $conn->error;
    jsonResponse([
        'success' => false,
        'error' => $conn->error,
        'errors' => []
    ]);
}
$stmt->bind_param('ssssd',
    $data['school_email'],
    $data['username'],
    $password,
    $data['school_id'],
    $active);

$success = $stmt->execute();
if (!$success) {
    jsonResponse([
        'success' => false,
        'error' => $stmt->error,
        'errors' => []
    ]);
}

$accountKey = $stmt->insert_id;
$userType = 'student';
$emptyString = '';
$stmt = $conn->prepare('INSERT INTO users (accountKey, usertype, firstname, middlename, lastname,
                              address1, address2, city, `state`, zipcode, school, sex, race)
                              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
$stmt->bind_param('sssssssssssss', $accountKey, $userType, $emptyString, $emptyString, $emptyString,
    $emptyString, $emptyString, $emptyString, $emptyString, $emptyString,
    $emptyString, $emptyString, $emptyString);
$success = $stmt->execute();
if (!$success) {
    jsonResponse([
        'success' => false,
        'error' => $stmt->error,
        'errors' => []
    ]);
} else {
    jsonResponse([
        'success' => true,
    ]);
}
