<?php

	if($_POST["fn"]) {
		//$filename = htmlspecialchars($_POST["fn"]) . '.ees';
		$filename = $_POST["fn"] . '.ieb';
		$content = htmlspecialchars($_POST["content"]);
	} else {
		die("");
	}

	header('Content-Type: application/force-download');
	header("Content-Transfer-Encoding: Binary");
	header("Content-disposition: attachment; filename=\"" . $filename . "\"");

	echo $content;

?>
