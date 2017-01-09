<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$uid = $r->uid;
$db = new DbHandler();
$user = $db->getOneRecord("select name, email, phone, address from customers_auth where uid = '$uid'");
if($user != NULL) {
  $response["name"] = $user['name'];
  $response["email"] = $user['email'];
  $response["phone"] = $user['phone'];
  $response["address"] = $user['address'];
  echo json_encode($response);
} else {
  $response["status"] =  "error";
  $response["message"] = "No such user";
  echo json_encode($response);
}

?>