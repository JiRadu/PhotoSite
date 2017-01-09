<?php
require_once 'dbHandler.php';

$db = new DbHandler();
$session = $db->getSession();
$response["uid"] = $session['uid'];
$response["email"] = $session['email'];
$response["name"] = $session['name'];

echo json_encode($session);

?>