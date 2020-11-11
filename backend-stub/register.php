<?php
require_once __DIR__ . "/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH');
    header('Access-Control-Allow-Headers: content-type');
    exit();
}

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
        'error' => 'User with this email already exist.'
    ]);
}

$password = password_hash($data['password'], PASSWORD_DEFAULT);
$active = 1;

$stmt = $conn->prepare('INSERT INTO accounts (email, password, active) VALUES (?,?,?)');
$stmt->bind_param('ssd', $data['school_email'], $password, $active);
$success = $stmt->execute();
if (!$success) {
    jsonResponse([
        'success' => false,
        'error' => $stmt->error
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
        'error' => $stmt->error
    ]);
} else {
    jsonResponse([
        'success' => true,
    ]);
}
