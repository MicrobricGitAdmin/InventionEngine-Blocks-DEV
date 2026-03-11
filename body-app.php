<body onload="start();">

   <!-- Google Tag Manager (noscript) -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N4S5GZ4" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
   <!-- End Google Tag Manager (noscript) -->

   <div class="container-fluid ie-header">
      <div class="row">
         <div class="col ie-menu-main">
            <ul class="nav nav-pills">
              <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><span class="oi oi-menu"></span> Menu</a>
                <div class="dropdown-menu">
                  <a id="navNew" class="dropdown-item" href="#">New</a>
                  <div class="dropdown-divider"></div>
                  <a id="navPopLoadDemo" class="dropdown-item" href="#">Load demo</a>
                  <a id="navPopLoadLocal" class="dropdown-item" href="#">Load from computer</a>
                  <div class="dropdown-divider"></div>
                  <a id="navPopLoadSave" class="dropdown-item" href="#">Save to computer</a>
                  <div class="dropdown-divider"></div>
                  <a id="navPopFirmwareUpdate" id="navUpdateFirmware" class="dropdown-item" href="#">Update firmware</a>
                  <a id="navPopHelp" class="dropdown-item" href="#">Diagnostics</a>
                  <div class="dropdown-divider"></div>
                  <a id="navPopAbout" class="dropdown-item" href="#">About</a>
                  <a class="dropdown-item" href="https://inventionengine.net/privacy/" target="_blank">Terms of use <span class="oi oi-share-boxed"></span></a>
                  <a style="display: none;" class="dropdown-item" href="https://www.inventionengine.app/docs/" target="_blank">Documentation <span class="oi oi-share-boxed"></span></a>
                </div>
              </li>
              <li class="nav-item">
                <a id="navPopUSB" class="nav-link" href="#"><span class="oi oi-fork"></span> USB</a>
              </li>
              <li class="nav-item">
                <a id="navPopLoadSaveAlt" class="nav-link" href="#"><span class="oi oi-pencil"></span> Save</a>
              </li>
            </ul>
         </div>
         <div class="col ie-menu-title-holder">
            <ul class="nav nav-pills">
               <li class="nav-item">
                  <span class="ie-program-title nav-link">Untitled Program</span>
               </li>
            </ul>
         </div>
         <div class="col ie-menu-program">
            <ul class="nav nav-pills">
            <li class="nav-item">
                  <a class="nav-link" href="https://inventionengine.net/" target="_blank" title="Invention Engine lesson plans">
                     inventionengine.net
                  </a>
              </li>
               <li class="nav-item">
                  <a id="navProgram" class="nav-link" href="#">
                     <span class="oi oi-media-play"></span> Program
                  </a>
              </li>
           </ul>
         </div>
      </div>
   </div>

   <div id="collaborators"></div>


   <div id="blocklyDiv"></div>

   <div class="container-fluid ie-footer">
      <div class="row">
         <div class="col ie-errors">
            <div>
               <a id="errorsText"></a>
               <textarea id="importExport" onchange="taChange();" onkeyup="taChange()"></textarea>
            </div>
         </div>
      </div>
   </div>

   <?php include 'modals.php'; ?>

   <script src="js/invention-engine.js"></script>

<!--
   <script>
      var inputFile = document.getElementById("filesBob");
      inputFile.addEventListener('change', handleFileSelect, false);
   </script>
-->

</body>
