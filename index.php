<!DOCTYPE html>
<html lang="en">

   <head>

      <!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-N4S5GZ4');</script>
      <!-- End Google Tag Manager -->

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="">
      <meta name="author" content="">

      <title>Invention Engine</title>

      <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      <link href="vendor/open-iconic/font/css/open-iconic-bootstrap.css" rel="stylesheet">

      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">

      <link href="css/invention-engine.css" rel="stylesheet">

      <!-- core environment code includes -->
      <script src="closure/goog/base.js"></script>
      <script src="blockly_compressed_vertical.js"></script>
      <script src="msg/messages.js"></script>
      <script src="blocks_compressed.js"></script>
      <script src="blocks_compressed_vertical.js"></script>
      <script src="InventionEngineC_compressed.js"></script>
      <!-- translatable text include -->
      <!-- dynamic catagory code includes -->
      <script src="LEDsFlyOut.js"></script>
      <script src="SetUpFlyOut.js"></script>
      <script src="MotionFlyOut.js"></script>
      <script src="SoundsFlyOut.js"></script>
      <script src="SensorsFlyOut.js"></script>
      <script src="AdvancedFlyOut.js"></script>
      <script src="SnippetsFlyOut.js"></script>
      <!-- utility code includes -->
      <script src="IEWebUSB.js"></script>
      <script src="IEScratchLocalSaves.js"></script>
      <script src="WorkspaceSetupJs.js"></script>
      <script src="errorChecking.js"></script>
      <script src="demoPrograms.js"></script>

      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/jquery/jquery-ui.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery.loadingdotdotdot.js"></script>
      <script src="js/js.cookie.js"></script>
      <script src="js/pgwbrowser.min.js"></script>

      <script src="js/clipboard.min.js"></script>

      <script>

         jQuery( document ).ready(function() {

            var pgwBrowser = jQuery.pgwBrowser();
            var pgwBrowserGroup = pgwBrowser["browser"]["group"];
            //var pgwOSGroup = pgwBrowser['os']['group'];

            console.log(pgwBrowserGroup);

            if ( (pgwBrowserGroup != "Chrome") ) {
               console.log(pgwBrowserGroup);
               jQuery('.modal').modal('hide');
               jQuery('#modalBrowserCheck .exBrowserDetected').html(pgwBrowserGroup);
               jQuery('#modalBrowserCheck').modal();
            }

         });

      </script>

   </head>

   <?php

   	$flgLanding = true;

      if ( $_COOKIE['launch'] == 1 ) {
         $flgLanding = false;
      } else {
         if ( isset( $_POST['exGo'] ) && $_POST['exGo'] == 'go' ) {

            $flgLanding = false;

            if ( isset( $_POST['exApp'] ) && $_POST['exApp'] == 'on' ) {
               setcookie('launch', 1, strtotime( '+365 days' ) );
            }

         }
      }


   	if ($flgLanding) {
   		include 'body-landing.php';
   	} else {
   		include 'body-app.php';





   	}

   ?>


</html>
