<?php
include ('config.php');

$protocol = $_SERVER['HTTPS'] == 'on' ? 'https://' : 'http://';

$ourlink = "https://".$host.$_SERVER['REQUEST_URI'];

if ($ourlink!=$protocol.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])
{
	header("Location: ".$ourlink, true, 301);
	exit();
}

file_put_contents("logs/access.log", date("Y-m-d H:i")." - ".$_SERVER['REMOTE_ADDR']." - ".$_SERVER['HTTP_USER_AGENT']." - ".$_SERVER['REQUEST_URI']." - ".$_SERVER['HTTP_REFERER']."\r\n", FILE_APPEND);

$ex = explode("/", $_SERVER['REQUEST_URI']);

if (!$ex[1])
	$ex[1] = 'index.html';

if (!strpos($ex[1], '.'))
	$ex[1].='.php';

if (file_exists('./templates/'.$ex[1]))
{
	include ('./templates/'.$ex[1]);
} else {
	header('HTTP/1.0 404 Not Found');
	die("404 not Found");
}

?>