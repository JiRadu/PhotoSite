<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$db = new DbHandler();
$photos = $db->getRecords("select uid, photoName, likes, descr, created, pid from photo order by created desc", $r->nr);
if($photos != NULL) {
  $response = $db->getOneRecord("select count(*) as maxPosts from photo");
  if($response["maxPosts"] != NULL){
    $response["status"] = "success";
    $response["posts"] = $photos;
    echo json_encode($response);
  } else {
    $response["status"] = "error";
    $response["message"] = "No posts";
  }
} else {
  $response["status"] =  "error";
  $response["message"] = "No posts";
  echo json_encode($response);
}

?>