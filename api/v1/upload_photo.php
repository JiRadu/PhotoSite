<?php
    require_once 'dbHandler.php';
    $db = new DbHandler();
    $target_dir = "../../../uploaded_files/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)){
      $r->photo->name = $_POST['name'];
      $r->photo->uid = $_POST['uid'];
      $r->photo->likes = 0;
      $r->photo->descr = $_POST['descr'];
      $r->photo->photoName = $_FILES["file"]["name"];
      $table_name = "photo";
      $column_names = array('uid', 'descr', 'photoName', 'likes');
      $result = $db->insertIntoTable($r->photo, $column_names, $table_name);
      if($result != NULL){
        $response["status"] = "success";
        $response["message"] = "Photo uploaded!";
        echo json_encode($response);
      } else {
        $response["status"] = "error";
        $response["message"] = "Failed to insert photo";
        echo json_encode($response);
      }
    } else {
      $response["status"] = "error";
      $response["message"] = "failed to save file!";
      echo json_encode($response);
    }
?>