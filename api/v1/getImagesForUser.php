<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$uid = $r->uid;
$db = new DbHandler();
$photos = $db->getAllRecords("select photoName, likes, descr, created, pid, uid from photo where uid = '$uid'");
if($photos != NULL) {
  echo json_encode($photos);
} else {
  $response["status"] =  "error";
  $response["message"] = "No photos";
  echo json_encode($response);
}

?>