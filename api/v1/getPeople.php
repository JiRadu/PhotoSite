<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$uid = $r->uid;
$db = new DbHandler();
$users = $db->getAllRecords("select name,uid from customers_auth");
if($users != NULL) {
  echo json_encode($users);
} else {
  $response["status"] =  "error";
  $response["message"] = "No such user";
  echo json_encode($response);
}

?>