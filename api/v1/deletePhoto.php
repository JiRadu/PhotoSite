<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$pid = $r->pid;
$uid = $r->uid;
$db = new DbHandler();
$poster = $db->getOneRecord("select uid from photo where pid= '$pid'");
if($poster["uid"] != NULL && $poster["uid"] == $uid){
  $commentDeletion = $db->deleteRecords("delete from comment where pid = '$pid'");
  $likeDeletion = $db->deleteRecords("delete from likes where pid = '$pid'");
  $photoDeletion = $db->deleteRecords("delete from photo where pid = '$pid'");
  if($commentDeletion == true && $likeDeletion == true && $photoDeletion == true){
      $response["status"] = "success";
      $response["message"] = "Photo deleted";
      echo json_encode($response);
  }
} else {
  $response["status"] = "error";
  $response["message"] = "User doesen't exist or not authorized";
  echo json_encode($response);
}

?>