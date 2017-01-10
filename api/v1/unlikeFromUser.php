<?php

require_once 'dbHandler.php';
$r = file_get_contents('php://input');
$r = json_decode($r);
$table_name = "likes";
$table2_name = "photo";
$db = new DbHandler();
$query = "DELETE FROM $table_name WHERE pid = $r->pid AND uid = $r->uid ";
$result = $db->deleteOneLike($query);
if($result == true) {
  $result2 = $db->editValuesInTable($table2_name,$r->pid,"likes","-",1,"pid");
  if($result2 == 0){
    $response["status"] = "info";
    $response["message"] = "Unliked";
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