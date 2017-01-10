<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$table_name = "likes";
$table2_name = "photo";
$column_names = array('pid', 'uid');
$db = new DbHandler();
$result = $db->insertIntoTable($r, $column_names, $table_name);
if($result == 0) {
  $result2 = $db->editValuesInTable($table2_name,$r->pid,"likes","+",1,"pid");
  if($result2 == 0){
    $response["status"] = "success";
    $response["message"] = "Liked";
    echo json_encode($response);
  } else {
    $response["status"] = "error";
    $response["message"] = "Something went wrong";
    echo json_encode($response);
  }
} else {
  $response["status"] = "error";
  $response["message"] = "Something went wrong";
  echo json_encode($response);
}

?>