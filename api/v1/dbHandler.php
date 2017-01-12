<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();
    }
    public function getAllRecords($query){
      $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
      $rows = array();
      while($row = $r->fetch_assoc()) {
          $rows[] = $row;
      }
      return $rows;
    }
    public function getRecords($query, $nr){
      if($nr !== NULL){
        $r = $this->conn->query($query.' LIMIT '.$nr) or die($this->conn->error.__LINE__);
        $rows = array();
        while($row = $r->fetch_assoc()) {
          $rows[] = $row;
        }
        return $rows;
      }
    }
    public function deleteOneLike($query){
      $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
      return $r;
    }
    public function editValuesInTable($table,$key,$field,$operation,$value, $keyField){
      if($operation == "+"){
        $r = $this->conn->query("UPDATE $table SET $field=$field+$value WHERE $keyField=$key") or die($this->conn->error.__LINE__);
        return r;
      } else if($operation == "-"){
          $r = $this->conn->query("UPDATE $table SET $field=$field-$value WHERE $keyField=$key") or die($this->conn->error.__LINE__);
          return r;
        } else {
          $r = $this->conn->query("UPDATE $table SET $field=$value WHERE $keyField=$key") or die($this->conn->error.__LINE__);
          return r;
        }
    }
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }
  public function getSession(){
      if (!isset($_SESSION)) {
          session_start();
      }
      $sess = array();
      if(isset($_SESSION['uid']))
      {
          $sess["uid"] = $_SESSION['uid'];
          $sess["name"] = $_SESSION['name'];
          $sess["email"] = $_SESSION['email'];
      }
      else
      {
          $sess["uid"] = '';
          $sess["name"] = 'Guest';
          $sess["email"] = '';
      }
      return $sess;
  }
  public function destroySession(){
      if (!isset($_SESSION)) {
      session_start();
      }
      if(isSet($_SESSION['uid']))
      {
          unset($_SESSION['uid']);
          unset($_SESSION['name']);
          unset($_SESSION['email']);
          $info='info';
          if(isSet($_COOKIE[$info]))
          {
              setcookie ($info, '', time() - $cookie_time);
          }
          $msg="Logged Out Successfully...";
      }
      else
      {
          $msg = "Not logged in...";
      }
      return $msg;
  }
}

?>
