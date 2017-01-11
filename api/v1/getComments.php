<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$pid = $r->pid;
$db = new DbHandler();
$users = $db->getAllRecords("select * from comment WHERE pid = '$pid'");
if($users != NULL) {
  echo json_encode($users);
} else {
  $response["status"] =  "error";
  $response["message"] = "No such user";
  echo json_encode($response);
}

?>