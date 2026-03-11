<!-- Save to computer -->
<div class="modal fade" id="modalSaveLocal" tabindex="-1" role="dialog" aria-labelledby="modalSaveLocalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" >Save to computer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <div class="form-group">
               <label for="txtProgramName">Program name</label>
               <input type="text" class="form-control" id="txtProgramName" autocomplete="off" maxlength="255">
               <div id="divProgramNameMessageLocal" class="alert" role="alert" style="display: none;"></div>
            </div>
         </div>
         <div class="modal-footer">
            <button id="btnSaveLocal" type="button" class="btn btn-primary">Save to computer</button>
         </div>
      </div>
   </div>
</div>


<!-- Load from computer -->

<div class="modal fade" id="modalLoadLocal" tabindex="-1" role="dialog" aria-labelledby="modalLoadLocalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Load from computer</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

         <div class="container-fluid">
            <div class="row">
               <div class="col load-instructions">
                  Please select an Invention Engine save file.<br><span style="font-size: 85%;">All Invention Engine save files are file type <strong>.ieb</strong></span>.
               </div>
               <div class="col load-file-element">
                  <input type="file" id="modalLoadLocalFiles" name="files[]" accept=".ieb" />
                  <label for="modalLoadLocalFiles" />Select a file to upload...</label>
               </div>
            </div>
         </div>

         <div class="container-fluid load-file-feedback">
            <div class="row">
               <div class="col">
                  <div id="modalLoadLocalWarning"></div>
                  <div id="modalLoadLocalDetails"></div>
               </div>
            </div>
         </div>

      </div>

		<div class="modal-footer">
			<button id="btnLoadLocal" type="button" class="btn btn-primary" disabled>Load program</button>
		</div>

      </div>
    </div>
  </div>



<!-- USB Controls -->

<div class="modal draggable fade" id="modalUSB" tabindex="-1" role="dialog" aria-labelledby="modalUSBLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >USB Controls</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


         <div id="usb controls">

            <div class="container usb-connect">
               <div class="row">
                  <div class="col">
                     <input type="button" value="Run USB" id="usbRun" class="btn btn-primary" >
                     <span class="usb-status"><span id="usbStatus"></span>
                  </div>
               </div>
            </div>

            <div class="container usb-send">
               <div class="row">
                  <div class="col">
                     <span class="label">Data to USB</span>
                     <input type="number" id="SendUSBData" name="quantity" min="-30000" max="30000" >
                     <input type="button" value="Send to USB" onclick="sendDataButtonPressed()" id="SendUsb" class="btn btn-primary" >
                  </div>
               </div>
            </div>


            <div class="container usb-response">
               <div class="row">
                  <div class="col">


                     <span class="label">Data from USB</span>
                     <div id="fromUSBdataHolder" class="card">
                        <div class="card-body">
                           <textarea id="fromUSBdata" readonly></textarea>
                           <div class="container usb-actions-buttons">
                              <div class="row">
                                 <div class="col">
                                    <input type="button" value="Clear" id="usbClear" class="btn btn-primary" >
                                    <input type="button" value="Copy to clipboard" id="usbExport" class="btn btn-primary" data-clipboard-target="#fromUSBdata" >
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

            </div>


         </div>


      </div>
    </div>
  </div>
</div>



<!-- Load demo -->
<div class="modal fade" id="modalLoadDemo" tabindex="-1" role="dialog" aria-labelledby="modalLoadDemoLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Load demo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

         <div id="demo-program-list"></div>

      </div>
    </div>
  </div>
</div>


<!-- Load how to -->
<div class="modal fade" id="modalLoadHowTo" tabindex="-1" role="dialog" aria-labelledby="modalLoadHowToLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Load how to</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div id="how-to-program-list"></div>
      </div>
    </div>
  </div>
</div>



<!-- About Invention Engine -->
<div class="modal fade" id="modalAbout" tabindex="-1" role="dialog" aria-labelledby="modalAboutLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >About Invention Engine</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <p><strong>Copyright 2022 Microbric Pty Ltd</strong></p>

         <p>The Invention Engine Blocks app was developed using the Scratch Blocks code base developed by MIT. Scratch Blocks was built on the Blockly code base developed by Google.</p>

         <p>Contributions and credits:<br>
         Invention Engine firmware and Invention Engine Blocks app built by Ben Hayton, Microbric<br>
         User management system built by Sean Killian, Killian Web Development</p>

      </div>
    </div>
  </div>
</div>



<!-- Help -->
<div class="modal draggable fade" id="modalHelp" tabindex="-1" role="dialog" aria-labelledby="modalAboutLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Diagnostics</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

         <h6>Connectivity issues</h6>

         <p>To ensure that your program can be compiled and sent to the Invention Engine, it is a good idea to check your connection with the Invention Engine compiler.</p>
			<p><button type="button" id="navPopHelpConnection" class="btn btn-primary btn-sm">Run the connection checker</button></p>

         <p>&nbsp;</p>

         <h6>Firmware and unique id</h6>
         <p>The firmware version in your hub and its unique identifier number can be useful to know when talking to our tech support team. Check them here:</p>
         <p><button type="button" id="navPopHelpGetStatus" class="btn btn-primary btn-sm">Get status</button></p>

      </div>
    </div>
  </div>
</div>




   <!-- Connection -->
   <div class="modal draggable fade" id="modalConnection" tabindex="-1" role="dialog" aria-labelledby="modalConnectionLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" >Connection</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div id="apiStatusHolder" class="card">
                  <div class="card-body">
                     <span id="apiStatusRefresh" style="float: right;">
                        <button type="button" class="btn btn-outline-secondary btn-sm"><span class="oi oi-reload"></span></button>
                     </span>
                     <span id="apiStatusOutput"></span>
                  </div>
               </div>

               <p><strong>If the test above has the result "<span style="font-family: monospace;">NO SERVER FOUND</span>" then a firewall may be blocking access to the compiler.</strong></p>
               <p>To rectify this, ask your network administrator to whitelist these addresses:</p>
               <ul>
                  <li>api.edisonrobotics.net</li>
                  <li>wavs.edisonrobotics.net</li>							
               </ul>

               <!-- <p><strong>If the test above is showing "<span style="font-family: monospace;">NO SERVER FOUND</span>" then you may be behind a firewall blocking access to the compiler.</strong></p>
               <p>You need the network administrator to white list these addresses:</p>
               <ul>
                  <li>https://www.inventionengine.app</li>
                  <li>https://api.edisonrobotics.net</li>
                  <li>13.210.175.93</li>
                  <li>52.8.213.196</li>
                  <li>52.52.166.106</li>
                  <li>52.79.71.19</li>
               </ul>
               <p>The network administrator also needs to unblock ports 80, 8080, 443 and 8443.</p> -->

               <div class="help-footer">
                  <a title="Back" href="#" id="lnkPopHelp">
                     <span class="icon ebicon-chevron-left"></span>Back to diagnostics
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>


   <!-- Update firmware -->
   <div class="modal draggable fade" id="modalFirmwareUpdate" tabindex="-1" role="dialog" aria-labelledby="modalFirmwareUpdateLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title">Update firmware</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">

            <p><strong>The latest firmware version is: V1.0</strong></p>
            <p>Use this pop-up to update the firmware in your Invention Engine hub.</p>
            <p>Please do not update your firmware if you are having trouble with your hub. Instead contact our technical support team.</p>
            <p><a href="https://inventionengine.net/support/contact-us/" target="_blank">Contact technical support</a></p>

            <p><strong>To update your hub’s firmware:</strong></p>
            <p>Plug in your hub and click the 'Connect hub' button below then follow the prompts.</p>

            <div id="fuButtonsHolder" class=" d-flex w-100" role="group" aria-label="Basic example">

               <button id="btnFUHubConnect" type="button" class="btn btn-primary" disabled>Connect Hub <span class="oi oi-chevron-right"></span></span></button>
               <button id="btnFUDownload" type="button" class="btn btn-primary" disabled><span class="downloadStatus">Waiting</span> <span class="oi"></span></button>
               <button id="btnFUHubReconnect" type="button" class="btn btn-primary" disabled>Reconnect Hub <span class="oi oi-chevron-right"></span></button>

            </div>

            <div id="fuStatusHolder" class="card">
               <div class="card-body">
                  <div style="display:none;">Status: <span id="fuStatusConnectionStatus" class="notConnected">not connected</span></div>
                  <div style="display:none;"id="hubStatusFirmwareVersionHolder">Firmware Version: <span id="fuStatusFirmwareVersion">...</span></div>
               </div>
            </div>



         </div>
       </div>
     </div>
   </div>



   <!-- Status -->
   <div class="modal draggable fade" id="modalStatus" tabindex="-1" role="dialog" aria-labelledby="modalStatusLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" >Firmware and Unique ID</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">

               <button id="btnStatusHubConnect" type="button" class="btn btn-primary">Connect Hub</button>

               <div id="hubStatusHolder" class="card">

                  <div class="card-body">
                     <div>Status: <span id="hubStatusConnectionStatus" class="notConnected">not connected</span></div>
                     <div id="hubStatusFirmwareVersionHolder">Firmware Version: <span id="hubStatusFirmwareVersion">...</span></div>
                     <div id="hubStatusUniqueIDHolder">Unique ID: <span id="hubStatusUniqueID">...</span></div>
                  </div>

               </div>
            </div>
         </div>
      </div>
   </div>






   <!-- Snip - Create -->
   <div class="modal fade" id="modalCreateSnip" tabindex="-1" role="dialog" aria-labelledby="modalCreateSnipLabel">
   	<div class="modal-dialog modal-dialog-centered " role="document">
   		<div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Create snippet</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
   			<div class="modal-body">
					<div class="form-group">
						<label for="txtCreateSnipName">Snippet name</label>
						<div style="display: none;"><small class="form-text text-muted">Alphanumeric characters only and must begin with a letter.</small></div>
						<input type="text" class="form-control" id="txtCreateSnipName" autocomplete="off" maxlength="25">
						<div id="divCreateSnipMessage" class="alert" role="alert" style="display: none;"></div>
					</div>
   			</div>
   			<div class="modal-footer modal-footer-CreateSnip">
   				<button id="btnCreateSnip" type="button" class="btn btn-primary eb-create-snip">Create Snippet</button>
   				<button id="btnCreateSnipDone" type="button" class="btn btn-primary eb-create-snip-done">Exit</button>
   			</div>
   		</div>
   	</div>
   </div>




   <!-- Snip - Manage -->
   <div class="modal fade" id="modalManageSnip" tabindex="-1" role="dialog" aria-labelledby="modalManageSnipLabel">
   	<div class="modal-dialog modal-dialog-centered " role="document">
   		<div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Snippets</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
   			</div>
   			<div class="modal-body">
   				<div id="listLoadingSnip" style="display:none;">
   					<img src="https://www.edscratchapp.com/images/loading.gif" alt="loading" style="height: 50px;" />
   				</div>
               <div class="container">

                  <div class="row">
                     <div class="col ie-name-var-title">Snippet Name</div>
                     <div class="col ie-name-var-action">Action</div>
                  </div>

      				<div id="listSnip"></div>

               </div>
   			</div>
   		</div>
   	</div>
   </div>







   <!-- Vars - Create -->
   <div class="modal fade" id="modalCreateVars" tabindex="-1" role="dialog" aria-labelledby="modalCreateVarsLabel">
   	<div class="modal-dialog modal-dialog-centered " role="document">
   		<div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Create variable</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
   			<div class="modal-body">
					<div class="form-group">
						<label for="txtCreateVarsName">Variable name</label>
						<div style="display: none;"><small class="form-text text-muted">Alphanumeric characters only and must begin with a letter.</small></div>
						<input type="text" class="form-control" id="txtCreateVarsName" autocomplete="off" maxlength="25">
						<div id="divCreateVarsMessage" class="alert" role="alert" style="display: none;"></div>
					</div>
   			</div>
   			<div class="modal-footer modal-footer-CreateVars">
   				<button id="btnCreateVar" type="button" class="btn btn-primary eb-create-var">Create Variable</button>
   				<button id="btnCreateVarDone" type="button" class="btn btn-primary eb-create-var-done">Exit</button>
   			</div>
   		</div>
   	</div>
   </div>



   <!-- Vars - Rename -->
   <div class="modal fade" id="modalRenameVars" tabindex="-1" role="dialog" aria-labelledby="modalRenameVarsLabel">
   	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
   		<div class="modal-content">
   			<div class="modal-header">
   				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
   				<h4 class="modal-title">Rename Variable - [var name]</h4>
   			</div>
   			<div class="modal-body">
   				<form>
   					<div class="form-group">
   						<label for="txtRenameVarsName">New Variable Name</label>
   						<div style="display: none;"><small class="form-text text-muted">Alphanumeric characters only and must begin with a letter.</small></div>
   						<input type="text" class="form-control" id="txtRenameVarsName" autocomplete="off" maxlength="25">
   						<div id="divRenameVarsMessage" class="alert" role="alert" style="display: none;"></div>
   					</div>
   				</form>
   			</div>
   			<div class="modal-footer modal-footer-RenameVars">
   				<div style="width: 50%; float:left;">
   					<button id="btnRenameVar" type="button" class="btn btn-primary eb-rename-var">Rename</button>
   				</div>
   				<div style="width: 50%; float:right;">
   					<button id="btnRenameVarDone" type="button" class="btn btn-primary eb-rename-var-done">Cancel</button>
   				</div>
   			</div>
   		</div>
   	</div>
   </div>



   <!-- Vars - Manage -->
   <div class="modal fade" id="modalManageVars" tabindex="-1" role="dialog" aria-labelledby="modalManageVarsLabel">
   	<div class="modal-dialog modal-dialog-centered " role="document">
   		<div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Variables</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
   			</div>
   			<div class="modal-body">
   				<div id="listLoadingVars" style="display:none;">
   					<img src="https://www.edscratchapp.com/images/loading.gif" alt="loading" style="height: 50px;" />
   				</div>
               <div class="container">

                  <div class="row">
                     <div class="col ie-name-var-title">Variable Name</div>
                     <div class="col ie-name-var-action">Action</div>
                  </div>

      				<div id="listVars"></div>

               </div>
   			</div>
   		</div>
   	</div>
   </div>


   <!-- Programming -->
   <div class="modal fade draggable" id="modalProgramming" tabindex="-1" role="dialog" aria-labelledby="modalProgrammingLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" >Program Invention Engine</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">

            <div id="programStatusHolder" class="card">
               <div class="card-body">
                  <div id="divProgrammingMessage"></div>
               </div>
            </div>

         </div>
       </div>
     </div>
   </div>


   <!-- Browser Check -->
   <div class="modal fade" id="modalBrowserCheck" tabindex="-1" role="dialog" aria-labelledby="modalBrowserCheckLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" >Unsupported browser</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">

               <p>You appear to be using: <strong><span class="exBrowserDetected"></span></strong></p>
               <p>The Invention Engine hub is programmed directly from your web browser via USB. This requires that your web browser supports USB connections. Unfortunately, <span class="exBrowserDetected"></span> does not currently support USB connections, so cannot program your Invention Engine hub.</p>
               <p>We recommend using Google Chrome.</p>
               <p><a href="https://www.google.com.au/chrome/" target="_blank" >Get Chrome</a></p>


            </div>
         </div>
      </div>
   </div>
