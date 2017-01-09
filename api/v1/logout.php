<?php
  require_once 'dbHandler.php';
  $db = new DbHandler();
  $session = $db->destroySession();
  $response["status"] = "info";
  $response["message"] = "Logged out successfully";
  echo json_encode($response);
 ?>