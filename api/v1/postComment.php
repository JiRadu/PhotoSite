<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$table_name = 'comment';
$column_names = array('pid', 'uid', 'text');
$db = new DbHandler();
$result = $db->insertIntoTable($r, $column_names, $table_name);
if($result !== 0){
  $date = $db->getOneRecord("select created from comment where cid = '$result'");
  if($comment !== 0) {
    $response["cid"] = $result;
    $response["created"] = $date["created"];
    $response["status"] = "success";
    $response["message"] = "Comment added";
    echo json_encode($response);
  } else {
    $response["status"] = "error";
    $response["message"] = "Something went wrong";
    echo json_encode($response);
  }
}

?>