<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$uid = $r->uid;
$pid = $r->pid;
$db = new DbHandler();
$result = $db->getOneRecord("select * from likes where uid = '$uid' AND pid = '$pid' ");
if($result != NULL) {
  $response = true;
  echo json_encode($response);
} else {
  $response = false;
  echo json_encode($response);
}

?>