<?php
require_once 'passwordHash.php';
require_once 'dbHandler.php';
$db = new DbHandler();
$r = file_get_contents('php://input');
$r = json_decode($r);
$phone = $r->customer->phone;
$name = $r->customer->name;
$email = $r->customer->email;
$address = $r->customer->address;
$password = $r->customer->password;
$isUserExists = $db->getOneRecord("select * from customers_auth where phone='$phone' or email='$email'");
if(!$isUserExists){
    $r->customer->password = passwordHash::hash($password);
    $table_name = "customers_auth";
    $column_names = array('phone', 'name', 'email', 'password', 'city', 'address');
    $result = $db->insertIntoTable($r->customer, $column_names, $table_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "User account created successfully";
        $response["uid"] = $result;
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $response["uid"];
        $_SESSION['phone'] = $phone;
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        echo json_encode($response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to create customer. Please try again";
        echo json_encode($response);
    }
}else{
    $response["status"] = "error";
    $response["message"] = "An user with the provided phone or email exists!";
    echo json_encode($response);
}
?>