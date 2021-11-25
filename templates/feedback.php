
<?php
if (!$_SERVER['HTTP_REFERER'] || !$_POST['c'] || !$_POST['captcha'] || $_POST['c']!=md5($_POST['captcha']))
	exit();
$to      = 'igor.k@voqus.net';
$subject = 'Feedback from '.$_SERVER['HTTP_HOST'];
$message = json_encode($_POST, JSON_PRETTY_PRINT);
$headers = 'From: info@'.$_SERVER['HTTP_HOST']."\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
	die("<html><head><title>Thank you for your Feedback! | ".$_SERVER['HTTP_HOST']."</title></head><body><script>alert('Thank you for your Feedback!'); location='".$_SERVER['HTTP_REFERER']."'</script></body></html>");
?>

