<?php
  $to = "nicole.teo91@gmail.com";
  $from = $_REQUEST['email'];
  $name = $_REQUEST['name'];
  $phone = $_REQUEST['phone'];
  $courseName = $_REQUEST['courseName'];
  $schoolName = $_REQUEST['schoolName'];
  $headers = "From: $from";
  $subject = "YOUniversity enquiries";

  $fields = array();
  $fields{"name"} = "name";
  $fields{"email"} = "email";
  $fields{"phone"} = "phone";
  $fields{"courseName"} = "courseName";
  $fields{"schoolName"} = "schoolName";

  $body = "You got a new enquiry!\n\n";
  foreach($fields as $a => $b){
    $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]);
  }

  $send = mail($to, $subject, $body, $headers);
?>
