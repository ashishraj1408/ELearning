<?php
require_once('./PHPMailer/src/SMTP.php');
require_once('./PHPMailer/src/PHPMailer.php');
require_once('./PHPMailer/src/Exception.php');

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
    $mail->Body='Thank you for Registering with InfiLearn. Keep Learning, Keep Growing!';
    $mail->AltBody='This is the body in plain text for non-HTML mail clients';

    $mail->send();

    echo 'Message has been sent';
} 
catch(Exception $e) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: '.$mail->ErrorInfo;
}

}
?>