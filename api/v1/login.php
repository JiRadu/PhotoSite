<?php
  require_once 'dbHandler.php';
  require_once 'passwordHash.php';
  $r = file_get_contents('php://input');
  $r = json_decode($r);
  $db = new DbHandler();
  $password = $r->customer->password;
  $email = $r->customer->email;
  $user = $db->getOneRecord("select uid,name,password,email,created from customers_auth where phone='$email' or email='$email'");
  if ($user != NULL) {
      if(passwordHash::check_password($user['password'],$password)){
      $response['status'] = "success";
      $response['message'] = 'Logged in successfully.';
      $response['name'] = $user['name'];
      $response['uid'] = $user['uid'];
      $response['email'] = $user['email'];
      $response['createdAt'] = $user['created'];
      if (!isset($_SESSION)) {
          session_start();
      }
      $_SESSION['uid'] = $user['uid'];
      $_SESSION['email'] = $email;
      $_SESSION['name'] = $user['name'];
      } else {
          $response['status'] = "error";
          $response['message'] = 'Login failed. Incorrect credentials';
      }
  }else {
          $response['status'] = "error";
          $response['message'] = 'No such user is registered';
      }
  echo json_encode($response)
?>