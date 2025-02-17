<?php 
if(!isset($_SESSION)){ 
  session_start(); 
}
include_once('../dbConnection.php');

require_once('../PHPMailer/src/SMTP.php');
require_once('../PHPMailer/src/PHPMailer.php');
require_once('../PHPMailer/src/Exception.php');

use \PHPMailer\PHPMailer\PHPMailer;
use \PHPMailer\PHPMailer\Exception;

function sendMail($email){


  $mail=new PHPMailer(true); // Passing `true` enables exceptions
  
  try {
      //settings
      $mail->SMTPDebug=0; // Enable verbose debug output
      $mail->isSMTP(); // Set mailer to use SMTP
      $mail->Host='smtp.gmail.com';
      $mail->SMTPAuth=true; // Enable SMTP authentication
      $mail->Username='karishmakumar5304@gmail.com'; // SMTP username
      $mail->Password='pjsfxcmfsxcxfvxm'; // SMTP password
      $mail->SMTPSecure=PHPMailer::ENCRYPTION_SMTPS;
      $mail->Port=465;
  
      $mail->setFrom('karishmakumar5304@gmail.com', 'Karishma Kumar');
  
      //recipient
      $mail->addAddress($email);     // Add a recipient
  
      //content
      $mail->isHTML(true); // Set email format to HTML
      $mail->Subject='Successfully registered';
      $mail->Body='Thank you for Registering with Us. You have been successfully registered!';
      $mail->AltBody='This is the body in plain text for non-HTML mail clients';
  
      $mail->send();
  
  } 
  catch(Exception $e) {
      echo 'Message could not be sent.';
      echo 'Mailer Error: '.$mail->ErrorInfo;
  }
  
  }

// setting header type to json, We'll be outputting a Json data
header('Content-type: application/json');

// Checking Email already Registered
if(isset($_POST['stuemail']) && isset($_POST['checkemail'])){
  $stuemail = $_POST['stuemail'];
  $sql = "SELECT stu_email FROM student WHERE stu_email='".$stuemail."'";
  $result = $conn->query($sql);
  $row = $result->num_rows;
  echo json_encode($row);
  return;
  }
 
  // Inserting or Adding New Student
  if(isset($_POST['stusignup']) && isset($_POST['stuname']) && isset($_POST['stuemail']) && isset($_POST['stupass']) && isset($_POST['pass2'])){
    $stuname = $_POST['stuname'];
    $stuemail = $_POST['stuemail'];
    $stupass = $_POST['stupass'];
    $pass2 = $_POST['pass2'];
    sendMail($stuemail);
    $sql = "INSERT INTO student(stu_name, stu_email, stu_pass, pass2) VALUES ('$stuname', '$stuemail', '$stupass','$pass2')";
    if($conn->query($sql) == TRUE){
      echo json_encode("OK");
      return;
    } else {
      echo json_encode("Failed");
      return;
    }
  }

  // Student Login Verification
  if(!isset($_SESSION['is_login'])){
    if(isset($_POST['checkLogemail']) && isset($_POST['stuLogEmail']) && isset($_POST['stuLogPass'])){
      $stuLogEmail = $_POST['stuLogEmail'];
      $stuLogPass = $_POST['stuLogPass'];
      $sql = "SELECT stu_email, stu_pass FROM student WHERE stu_email='".$stuLogEmail."' AND stu_pass='".$stuLogPass."'";
      $result = $conn->query($sql);
      $row = $result->num_rows;
      
      if($row === 1){
        $_SESSION['is_login'] = true;
        $_SESSION['stuLogEmail'] = $stuLogEmail;
        echo json_encode($row);
        return;
      } else if($row === 0) {
        echo json_encode($row);
        return;
      }
    }
  }

?>