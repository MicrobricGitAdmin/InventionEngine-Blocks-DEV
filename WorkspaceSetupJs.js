'use strict';

  var fakeDragStack = [];
  var workspace = null;

  function start() {
    var soundsEnabled = true;
    /*if (sessionStorage) {
      // Restore sounds state.
      soundsEnabled = sessionStorage.getItem('soundsEnabled');
      if (soundsEnabled === null) {
        soundsEnabled = true;
      } else {
        soundsEnabled = (soundsEnabled === 'true');
      }
    } else {
      soundsEnabled = true;
  }*/

      //motion
      Blockly.connectedServos = [["noID","-","-99",]];
      Blockly.connectedMotors = [["noID","-","-99",]];
      //LEDS
      Blockly.connectedLEDS = [["noID","-","-99",]];
      Blockly.connectedDigitalDisplays = [["noID","-","-99",]];
      Blockly.connectedIRtransmitter = [["noID","-","-99",]];
      //sounds
      Blockly.connectedSpeaker = [["noID","-","-99",]];
      //sensors
      Blockly.connectedButtons = [["noID","-","-99",]];
      Blockly.connectedDials = [["noID","-","-99",]];
      Blockly.connectedLightSensors = [["noID","-","-99",]];
      Blockly.connectedTemperatureSensors = [["noID","-","-99",]];
      Blockly.connectedProximitySensors = [["noID","-","-99",]];
      Blockly.connectedIRreceiver = [["noID","-","-99",]];
      Blockly.connectedNoiseSensors = [["noID","-","-99",]];
      Blockly.connectedMagnetSensors = [["noID","-","-99",]];
      Blockly.connectedTiltSensors = [["noID","-","-99",]];
      //advanced
      Blockly.connectedGPO = [["noID","-","-99",]];
      Blockly.connectedGPI = [["noID","-","-99",]];

      Blockly.portsUsed=["noID","noID","noID","noID","noID","noID","noID","noID"];

      Blockly.bitArrays = [Blockly.connectedServos,Blockly.connectedMotors,Blockly.connectedLEDS,Blockly.connectedDigitalDisplays, Blockly.connectedIRtransmitter,
                          Blockly.connectedSpeaker, Blockly.connectedButtons, Blockly.connectedDials, Blockly.connectedLightSensors, Blockly.connectedTemperatureSensors,
                          Blockly.connectedProximitySensors, Blockly.connectedIRreceiver, Blockly.connectedNoiseSensors, Blockly.connectedMagnetSensors, Blockly.connectedTiltSensors,
                          Blockly.connectedGPO, Blockly.connectedGPI];
      Blockly.userProgStartDelay = "delayMilliseconds(500);\n";


    Blockly.bitTypesToBlockNames={
        SERVO: ["motion_servo_to_position","motion_servo_release"],
        MOTOR: ["motion_motor_rotate","motion_motor_break","motion_motor_rotate_time"],
        LED: ["leds_led_on_off","leds_led_to_level"],
        DIGITALDISPLAY: ["leds_digital_display_number","leds_digital_display_temperature","leds_digital_display_level","leds_digital_display_effect","leds_digital_display_clear","leds_digital_display_word"],
        IRTX: ["leds_IR_TX_send"],
        SPEAKER: ["sound_speaker_play_note","sound_speaker_play_tone","sound_speaker_play_long_effect","sound_speaker_play_medium_effect","sound_speaker_play_short_effect"],
        BUTTON: ["sensing_button_pressed","sensing_button_released"],
        DIAL: ["sensing_dial_read"],
        LIGHTSENSOR: ["sensing_light_read"],
        TEMPSENSOR: ["sensing_temperature_read"],
        PROXSENSOR: ["sensing_proximity_detected","sensing_proximity_read","sensing_proximity_range_detected"],
        IRRX: ["sensing_IRRX_data"],
        NOISESENSOR: ["sensing_noise_detected"],
        MAGSENSOR: ["sensing_magnet_read"],
        TILTSENSOR: ["sensing_tilt_detected"],
        GPI: ["advanced_GPI_high_low"],
        GPO: ["advanced_GPO_high_low","advanced_GPO_pulse"],
    }

    Blockly.LoadingCode = false;
    Blockly.CompileFwVersion = -99;
    Blockly.demoPrograms = [];


    setSoundsEnabled(soundsEnabled);

    // Setup blocks
    // Parse the URL arguments.
    var match = location.search.match(/dir=([^&]+)/);
    var rtl = match && match[1] == 'rtl';
    //document.forms.options.elements.dir.selectedIndex = Number(rtl);
    var toolbox = getToolboxElement();
    //console.log(toolbox);
    //document.forms.options.elements.toolbox.selectedIndex =
      //toolbox ? 1: 0;

    match = location.search.match(/side=([^&]+)/);

    var side = match ? match[1] : 'start';

    //document.forms.options.elements.side.value = side;

    // Create main workspace.
    workspace = Blockly.inject('blocklyDiv', {
      comments: false,
      disable: false,
      collapse: false,
      media: 'media/',
      readOnly: false,
      rtl: rtl,
      scrollbars: true,
      toolbox: toolbox,
      toolboxWidth: 400,
      trashcan: true,
      toolboxPosition: side == 'top' || side == 'start' ? 'start' : 'end',
      horizontalLayout: side == 'top' || side == 'bottom',
      sounds: soundsEnabled,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    });


    //workspace.registerToolboxCategoryCallback('SETUPFLYOUT', Blockly.setupFlyOut.flyoutCategory);
    //Setup flyout callback needs to be set in the inject.js file in the core otherwise it throws an error soundsFlyOut

    workspace.registerToolboxCategoryCallback('LEDFLYOUT', Blockly.LEDsFlyOut.flyoutCategory);//AdvancedFlyOut
    workspace.registerToolboxCategoryCallback('MOTIONFLYOUT', Blockly.motionFlyOut.flyoutCategory);
    workspace.registerToolboxCategoryCallback('SOUNDFLYOUT', Blockly.soundsFlyOut.flyoutCategory);
    workspace.registerToolboxCategoryCallback('SENSORSFLYOUT', Blockly.sensorsFlyOut.flyoutCategory);
    workspace.registerToolboxCategoryCallback('ADVANCEDFLYOUT', Blockly.AdvancedFlyOut.flyoutCategory);
    workspace.registerToolboxCategoryCallback('SNIPPETSFLYOUT', Blockly.SnippetsFlyOut.flyoutCategory);
    workspace.toolbox_.refreshSelection();
    restBothErrors();




    if (sessionStorage) {
      // Restore previously displayed text.
      var text = sessionStorage.getItem('textarea');
      if (text) {
        document.getElementById('importExport').value = text;
      }
      taChange();
    }

    if (sessionStorage) {
      // Restore event logging state.
      var state = sessionStorage.getItem('logEvents');
      //logEvents(Boolean(state));

      // Restore flyout event logging state.
      state = sessionStorage.getItem('logFlyoutEvents');
      //logFlyoutEvents(Boolean(state));
    }



    var xml_text='<xml xmlns="http://www.w3.org/1999/xhtml"> <variables></variables> <block type="event_Setup" id="eg|%=FMH1VW/Kzo1%]9/" x="144" y="171" deletable="false" movable="false"></block> <block type="event_Start" id="QX2AZ)FGzHLa3W;tp,Zh" x="675" y="171" deletable="false" movable="false"></block></xml>';
    var xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(xml, workspace);
    loadFromStorage();
    workspace.clearUndo();
    workspace.toolbox_.refreshSelection();

    workspace.addChangeListener(updateToolBox);
    workspace.addChangeListener(updateErrors);
  }

  function getToolboxElement() {
    var match = location.search.match(/toolbox=([^&]+)/);
    return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
  }




  function removeSetUpID(blockID){
      Blockly.bitArrays = [Blockly.connectedServos,Blockly.connectedMotors,Blockly.connectedLEDS,Blockly.connectedDigitalDisplays, Blockly.connectedIRtransmitter,
                          Blockly.connectedSpeaker, Blockly.connectedButtons, Blockly.connectedDials, Blockly.connectedLightSensors, Blockly.connectedTemperatureSensors,
                          Blockly.connectedProximitySensors, Blockly.connectedIRreceiver, Blockly.connectedNoiseSensors, Blockly.connectedMagnetSensors, Blockly.connectedTiltSensors,
                          Blockly.connectedGPO, Blockly.connectedGPI];
      var currentBitArray;
      for (var k = 0; k < Blockly.bitArrays.length; k++) {
          currentBitArray = Blockly.bitArrays[k];
          if(currentBitArray.length>1){
               for (var j = currentBitArray.length- 1; j >= 0; j--) {
                   if(currentBitArray[j][0]==blockID){
                       //A setupblock is found in this array and needs to be removed
                       currentBitArray.splice(j, 1);
                   }
               }
           }
      }
      //now need to rmove it from the used ports
      for (var k = 0; k < Blockly.portsUsed.length; k++) {
          if(Blockly.portsUsed[k]==blockID){
              //found the id, remove it
              Blockly.portsUsed[k] = "noID";
              workspace.toolbox_.refreshSelection();
          }
      }
  }

  function removeFromDropDowns(bitType){
      var blockExists=false;
      var arrayToMod = null;
      var removed = false;
      var codeBlockTypes = [];
      switch(bitType){
          case "SERVO":
              arrayToMod = Blockly.connectedServos;
              codeBlockTypes.push("motion_servo_to_position");
              codeBlockTypes.push("motion_servo_release");
          break;
          case "MOTOR":
              arrayToMod = Blockly.connectedMotors;
              codeBlockTypes.push("motion_motor_rotate");
              codeBlockTypes.push("motion_motor_break");
          break;
          case "LED":
              //led added
              arrayToMod = Blockly.connectedLEDS;
              codeBlockTypes.push("leds_on_off");
              codeBlockTypes.push();
          break;
          case "DIGITALDISPLAY":
              arrayToMod = Blockly.connectedDigitalDisplays;
              codeBlockTypes.push();
          break;
          case "IRTX":
              arrayToMod = Blockly.connectedIRtransmitter;
              codeBlockTypes.push();
          break;
          case "SPEAKER":
              arrayToMod = Blockly.connectedSpeaker;
              codeBlockTypes.push();
          break;
          case "BUTTON":
              arrayToMod = Blockly.connectedButtons;
              codeBlockTypes.push();
          break;
          case "DIAL":
              arrayToMod = Blockly.connectedDials;
              codeBlockTypes.push();
          break;
          case "LIGHTSENSOR":
              arrayToMod = Blockly.connectedLightSensors;
              codeBlockTypes.push();
          break;
          case "TEMPSENSOR":
              arrayToMod = Blockly.connectedTemperatureSensors;
              codeBlockTypes.push();
          break;
          case "PROXSENSOR":
              arrayToMod = Blockly.connectedProximitySensors;
              codeBlockTypes.push();
          break;
          case "IRRX":
              arrayToMod = Blockly.connectedIRreceiver;
              codeBlockTypes.push();
          break;
          case "NOISESENSOR":
              arrayToMod = Blockly.connectedNoiseSensors;
              codeBlockTypes.push();
          break;
          case "MAGSENSOR":
              arrayToMod = Blockly.connectedMagnetSensors;
              codeBlockTypes.push();
          break;
          case "TILTSENSOR":
              arrayToMod = Blockly.connectedTiltSensors;
              codeBlockTypes.push();
          break;
          case "GPI":
              arrayToMod = Blockly.connectedGPI;
              codeBlockTypes.push();
          break;
          case "GPO":
              arrayToMod = Blockly.connectedGPO;
              codeBlockTypes.push();
          break;
      }
      if(arrayToMod!=null){

          for (var i = 0; i < Blockly.bitTypesToBlockNames[bitType].length; i++) {
              var blocksToChange = workspace.getBlocksByType(Blockly.bitTypesToBlockNames[bitType][i]);
              for (var k = 0; k < blocksToChange.length; k++) {
                  var currentBlock = blocksToChange[k];
                  //var dropdown = currentBlock.getInput('PORT');
                  var dropField = currentBlock.getField("PORT");
                  dropField.setText("-")
                  dropField.callValidator("-");
              }
          }

      }

  }

  function portNumberError(blockFrom){
      alert("Your program is missing a bit selection for a command. \nPlease select bit for: "+ blockFrom);
      throw "port undefined "+blockFrom;
  }


  function updateErrors(){
      restBothErrors();

      var topBlocks = workspace.getTopBlocks();

      var startPlace=-1;
      var setupPlace=-1;
		for (var j = 0; j < topBlocks.length; j++){
			if (topBlocks[j].type == "event_Start"){
				startPlace=j;
				/*if (Blockly.emptyStartCheckFlag&&checkEmptyStart()){
					setErrorFlag("red","NoMainBlocks");
				}*/
			} else if (topBlocks[j].type == "event_Setup"){
				setupPlace=j;
			}else if((topBlocks[j].type == "snippets_copy_code")){
                Blockly.errorFlags['inSnippet']= true;
                Blockly.errorFlags['SnippetNumBlocks'] = 0;
                checkBlock(topBlocks[j]);
                Blockly.errorFlags['inSnippet']= false;
            }else{
                setErrorFlag("yellow","disconnectedBlocks");
            }

		}

        if (setupPlace==-1){
			setErrorFlag("red","noSetupBlock");
		}else{
			checkSetUpStack(topBlocks[setupPlace]);
		}


		if (startPlace==-1){
			setErrorFlag("red","noStartBlock");
		}else{
			checkBlock(topBlocks[startPlace]);
		}

        //console.log();
        //code to show the error:
        //- USB blocks will not work unless IE is connected to this website, connect to your IE using the USB tools
        /*var inputBlocks = workspace.getBlocksByType("advanced_USB_data",false);
        if(inputBlocks.length != 0){
            var index;
            for (index = 0; index < usbBlocks.length; index++) {
                if(inputBlocks[index].getRootBlock().type=="event_Start"){
                    //first valid use of a advanced_USB_data block we set the flag and move on
                    setErrorFlag("yellow", "usbNeededForUsbBlocks");
                    break;
                }
            }
        }*/


        showErrors(Blockly.redErrors,Blockly.yellowErrors);


  }

  /*function checkSetUpStack(setupBlock){
      //set up block checks:
      // constant name not blank
      //constant name not a dupe
      console.log("Hi HI");
      var constName;
      constName = setupBlock.getInputTargetBlock("COMMENTTEXT");
      console.log(constName);
  }*/


//  function variableCreateMenu(currentWorkspace) {

//   console.log('variableCreateMenu...');

   //SEAN change this funtion!!
   //note it is currently not hooked up to anything, this will be updated later

   //this function creates an alert pop up that checks the validitiy of a variable name.
   //Blockly.Variables.createVariable(currentWorkspace)
   //variables can also be created calling: workspace.createVariable(name)
   //this function will no create variables with the same name as an existing variable (it will do nothing if a duplicate name is given)
   //You can check for a duplicate name by calling: workspace.getVariable(name)
   //the function will return null if the variable name is not used.
//   workspace.createVariable("bob");

   //valid variable names must start with a letter [a-z]|[A-Z]

 //}


//  function variableChangeMenu(currentVariables){

//         console.log('variableChangeMenu...');

        //SEAN change this funtion!!
        //note it is currently not hooked up to anything, this will be updated later
//        console.log(currentVariables)
        //currentVariables is an array of variable names
        //When no variables have been created, it is empty

        //variables can be deleated by calling: "workspace.deleteVariable(name)" Workspace functions can be found here: https://developers.google.com/blockly/reference/js/Blockly.Workspace
        //variables can be renamed by calling: "workspace.renameVariable(oldName, newName)"
//        for (var i=0;i<currentVariables.length;i++){
//            if (currentVariables[i]=="bob"){
//                workspace.renameVariable("bob","bob2");
   //             break;
//            }
//            if (currentVariables[i]=="bob2"){
//                alert(workspace.getNumVariableUses("bob2"));
//                workspace.deleteVariable("bob2");
                //workspace.deleteVariable("bob2");
//            }
//        }
//    }

    //function snippetCreateMenu(currentWorkspace) {

        //SEAN change this funtion!!
        //note it is currently not hooked up to anything, this will be updated later
        //this function creates an alert pop up that checks the validitiy of a variable name.
        //Blockly.Variables.createVariable(currentWorkspace)
        //variables can also be created calling: workspace.createVariable(name)
        //this function will no create variables with the same name as an existing variable (it will do nothing if a duplicate name is given)
        //You can check for a duplicate name by calling: workspace.getVariable(name)
        //the function will return null if the variable name is not used.

        //workspace.createSnippet("bob");

        //Blockly.Variables.createVariable(workspace);

        //valid variable names must start with a letter [a-z]|[A-Z]
    //}

    function ZZZsnippetChangeeMenu(){
        //workspace.renameSnippet("bob","bob2");
        var currentSnippets = workspace.snippetsList;
        for (var i=0;i<currentSnippets.length;i++){
            if (currentSnippets[i]=="bob"){
                workspace.renameSnippet("bob","blink");
                break;
            }
            if (currentSnippets[i]=="blink"){
                //alert(workspace.getNumVariableUses("bob2"));
                workspace.deleteSnippet("blink");
                //workspace.deleteVariable("bob2");
            }
        }
    }




   function showErrors(redErrors, yellowErrors) {
       var errorsOutput = document.getElementById('errorsText');
       var errorText = "";
       for (var key in redErrors) {
          if (redErrors[key]) {
             errorText = errorText + "<div class='alert alert-danger'><span class='oi oi-warning'></span>" + Blockly.redErrorMessages[key]  + "</div>";
          }
 		}
 		for (var key in yellowErrors) {
 			if(yellowErrors[key]) {
             errorText = errorText + "<div class='alert alert-warning'><span class='oi oi-warning'></span>" + Blockly.yellowErrorMessages[key]  + "</div>";
 			}
 		}
 		errorsOutput.innerHTML = errorText;
 	}


  function updateToolBox(event){

		if(event.type == Blockly.Events.CREATE){
			var tools = Blockly.Xml.textToDom(Blockly.Blocks.defaultToolbox);
			var events = tools.getElementsByTagName('category')[4];
			var eventXML = event.xml;

            var blockID = event.blockId;
			var createdBlock = workspace.getBlockById(blockID);

            if(createdBlock.type=="snippets_copy_code"){
                //one of a kind block created
                console.log(createdBlock.getFieldValue("SNIPPET"));
                workspace.snippetInUse(createdBlock.getFieldValue("SNIPPET"));
                workspace.toolbox_.refreshSelection();
            }

            //created blocks run their own change listners
            //to change block behgaviour on creation look into the blocks_vertical folder
		}
		if(event.type == Blockly.Events.DELETE){
			var eventXML = event.oldXml;
            //console.log(eventXML.getElementsByTagName("field")); //.getAttribute("type")
			/*if(eventXML.getAttribute("type").includes("event")&&eventXML.getAttribute("type")!="event_Start"){

				Blockly.UnusedEvents[eventXML.getAttribute("type")]=true;
				workspace.toolbox_.refreshSelection();
			}*/
            if(!Blockly.LoadingCode){
                if(eventXML.getAttribute("type").includes("setup")||eventXML.getAttribute("type").includes("Setup")){
                    //top block is a setup block, which means that all of the blocks are set up blocks
                    console.log("removing setup blocks");
                    //var tempArray = [];
                    var eventIds = event.ids;
                    for (var i = 0; i < eventIds.length; i++) {
                        //eventIds[i]
                        removeSetUpID(eventIds[i]);

                    }

                    var xmlFeilds = eventXML.getElementsByTagName("field");
                    var blockTypesToUpdate = [];
                    for (var i = 0; i < xmlFeilds.length; i++) {
                        //console.log(xmlFeilds[i].outerText);
                        //console.log(xmlFeilds[i].getAttribute("name"));
                        if(xmlFeilds[i].getAttribute("name")=="FIELDNAME"){
                            //drop down field
                            var bitType = xmlFeilds[i].outerText;
                            if(blockTypesToUpdate.indexOf(bitType)==-1){
                                //new bit type
                                blockTypesToUpdate.push(bitType)
                            }

                        }
                    }
                    console.log(blockTypesToUpdate);
                    for(var i = 0; i < blockTypesToUpdate.length; i++){
                        removeFromDropDowns(blockTypesToUpdate[i])
                    }
                    workspace.toolbox_.refreshSelection();
                    //Create a junk event that the code blocks use to update themselves
                    //Blockly.Events.fire(new Blockly.Events.Abstract(this));

                }else if(eventXML.getAttribute("type")=='snippets_copy_code'){
                    //deleted snippet top block
                    console.log(eventXML.childNodes[0].innerText);
                    workspace.removeSnippetFromUse(eventXML.childNodes[0].innerText);
                    workspace.toolbox_.refreshSelection();
                }
            }



            //var eventIds = event.ids;

		}

		if(event.type == Blockly.Events.MOVE){
			//var eventXML = event.xml;
			var blockID = event.blockId;
			var movedBlock = workspace.getBlockById(blockID);


			if(movedBlock===null){
				//deleting block case, do not attempt to read a block that is being removed
			}else if(movedBlock.type.includes("setup")){
                //moving an event block only happens on page load or file load
            }else if(movedBlock.type.includes("event_Start")){
                if(Blockly.LoadingCode == true){
                    Blockly.LoadingCode = false;
                    //console.log("End of loading code apparently");
                    var blocksToChange = workspace.getAllBlocks();
                    for (var k = 0; k < blocksToChange.length; k++) {
                        var currentBlock = blocksToChange[k];
                        //var dropdown = currentBlock.getInput('PORT');
                        var dropField = currentBlock.getField("PORT");
                        if(dropField){
                            dropField.callValidator();
                        }


                    }

                }
            }else{
				/*if(movedBlock.type.includes("event")&&movedBlock.type!="event_Start"&&Blockly.newEventBlockMade){
					workspace.toolbox_.refreshSelection();
					//console.log(movedBlock.type)
                    unplug
				}*/
                //console.log(movedBlock.getParent().type);
                /*if(movedBlock.getParent().type == "event_Start"&&movedBlock.type.includes("setup")){
                    //movedBlock.unplug();
                    console.log("unplug");
                }*/

			}

			//Blockly.newEventBlockMade = false;

		}

        if(event.type == Blockly.Events.CHANGE){
            //look at the block that was changed
            var blockID = event.blockId;
			var movedBlock = workspace.getBlockById(blockID);
            if(movedBlock.type=="setup_text"||movedBlock.type.includes("setup_bit_on_port")){
                if(event.element=='field'){
                    if(event.newValue.length>event.oldValue.length){
                        var startBlockobj = workspace.getBlockById("QX2AZ)FGzHLa3W;tp,Zh");
                        //console.log("longer name");

                        var startBlockXcord = startBlockobj.getRelativeToSurfaceXY().x;
                        //console.log(startBlockXcord);
                        //console.log(movedBlock);

                        var parentBlock = movedBlock.parentBlock_;
                        if(movedBlock.type.includes("setup_bit_on_port")){parentBlock=movedBlock;}
                        var parentWidth = parentBlock.width;
                        var parentBlockXcord = parentBlock.getRelativeToSurfaceXY().x;

                        var endOfParentXcord = parentBlockXcord+parentWidth;

                        //console.log(endOfParentXcord);
                        if(endOfParentXcord>startBlockXcord){
                            //console.log("big boiii");
                            //<block type="event_Start" id="QX2AZ)FGzHLa3W;tp,Zh" x="675" y="171" deletable="false" movable="false">
                            //x="144"

                            startBlockobj.moveBy(Math.ceil(endOfParentXcord-startBlockXcord)+5,0);

                        }
                    }
                }
            }
        }
		//console.log(event);
	  }

      function resetSetupBlocks(){
          //motion
          Blockly.connectedServos = [["noID","-","-99",]];
          Blockly.connectedMotors = [["noID","-","-99",]];
          //LEDS
          Blockly.connectedLEDS = [["noID","-","-99",]];
          Blockly.connectedDigitalDisplays = [["noID","-","-99",]];
          Blockly.connectedIRtransmitter = [["noID","-","-99",]];
          //sounds
          Blockly.connectedSpeaker = [["noID","-","-99",]];
          //sensors
          Blockly.connectedButtons = [["noID","-","-99",]];
          Blockly.connectedDials = [["noID","-","-99",]];
          Blockly.connectedLightSensors = [["noID","-","-99",]];
          Blockly.connectedTemperatureSensors = [["noID","-","-99",]];
          Blockly.connectedProximitySensors = [["noID","-","-99",]];
          Blockly.connectedIRreceiver = [["noID","-","-99",]];
          Blockly.connectedNoiseSensors = [["noID","-","-99",]];
          Blockly.connectedMagnetSensors = [["noID","-","-99",]];
          Blockly.connectedTiltSensors = [["noID","-","-99",]];
          //advanced
          Blockly.connectedGPO = [["noID","-","-99",]];
          Blockly.connectedGPI = [["noID","-","-99",]];

          Blockly.portsUsed=["noID","noID","noID","noID","noID","noID","noID","noID"];
      }

      function emptyWorkspace(){
          Blockly.mainWorkspace.clear();
          while(workspace.getTopBlocks().length!=0){
              //console.log(workspace.getTopBlocks());
          }
      }

  function toXml() {
    var output = document.getElementById('importExport');
    var xml = Blockly.Xml.workspaceToDom(workspace);
    //output.value = Blockly.Xml.domToPrettyText(xml);
    output.value = Blockly.Xml.domToText(xml);
    output.focus();
    output.select();
    taChange();
  }

  function fromXml() {
      Blockly.LoadingCode = true;
    Blockly.mainWorkspace.clear();
    resetSetupBlocks();
    var input = document.getElementById('importExport');
    var xml = Blockly.Xml.textToDom(input.value);
    Blockly.Xml.domToWorkspace(xml, workspace);
    taChange();
  }

    function fromBase64Blocks() {
        Blockly.LoadingCode = true;
        Blockly.mainWorkspace.clear();
        resetSetupBlocks();
        var input = document.getElementById('importExport');
        var xml = Blockly.Xml.textToDom(b64DecodeUnicode(input.value));
        Blockly.Xml.domToWorkspace(xml, workspace);
        taChange();
        workspace.clearUndo();

    }//

    function toBase64Blocks() {
        var output = document.getElementById('importExport');
        //var xml = Blockly.Xml.workspaceToDom(workspace);

        output.value = getBlocksForDownload();
        output.focus();
        output.select();
        taChange();
    }

  function loadXml(savedXml) {
      Blockly.LoadingCode = true;
    Blockly.mainWorkspace.clear();
    resetSetupBlocks();
    //var input = document.getElementById('importExport');
    var xml = Blockly.Xml.textToDom(savedXml);
    Blockly.Xml.domToWorkspace(xml, workspace);
    workspace.toolbox_.setSelectedItem(workspace.toolbox_.categoryMenu_.categories_[0]);
    taChange();
  }

  function loadDemo(demoNumber){
      //var demoNumber = 0;
      if(demoNumber<Blockly.demoProgramsArray.length){
          console.log("good size")
          console.log(Blockly.demoProgramsArray[demoNumber][0]);
          loadXml(b64DecodeUnicode(Blockly.demoProgramsArray[demoNumber][1]));
          workspace.toolbox_.setSelectedItem(workspace.toolbox_.categoryMenu_.categories_[0]);
      }
  }

  function clearBlocks() {
      workspace.clear();
      Blockly.mainWorkspace.clear();
      var xml_text='<xml xmlns="http://www.w3.org/1999/xhtml"> <variables></variables> <block type="event_Setup" id="eg|%=FMH1VW/Kzo1%]9/" x="144" y="171" deletable="false" movable="false"></block> <block type="event_Start" id="QX2AZ)FGzHLa3W;tp,Zh" x="675" y="171" deletable="false" movable="false"></block></xml>';
      var xml = Blockly.Xml.textToDom(xml_text);
      Blockly.Xml.domToWorkspace(xml, workspace);
       resetSetupBlocks();
      workspace.clearUndo();
      workspace.toolbox_.setSelectedItem(workspace.toolbox_.categoryMenu_.categories_[0]);
  }

  function toCode(lang) {
    var output = document.getElementById('importExport');
    output.value = Blockly[lang].workspaceToCode(workspace);//InventionEngineC
    //output.value = Blockly.InventionEngineC.workspaceToCode(workspace);
    taChange();
  }

  function compileAndSend(fwVersion) {
      Blockly.CompileFwVersion = fwVersion;
      //check red errors
      var anyRedErrors = false;
      for (var key in Blockly.redErrors) {
         if (Blockly.redErrors[key]) {
            anyRedErrors = true;
         }
      }

		if (anyRedErrors) {
			//alert to warn that red errors exist and the user cannot program the Edison
			alert("cannot download with Red Errors");
		} else {
			var ieC = Blockly['InventionEngineC'].workspaceToCode(workspace);
			console.log(ieC);
			APIcall(ieC,fwVersion);
		}

  }

  function sendDataButtonPressed(){

      var usbNum = document.getElementById('SendUSBData');
      var x = usbNum.value;
      sendNumberToInventionEngine(x);
  }

   function APIcall(mbc,fwVersion) {

      jQuery('.modal').modal('hide');
      jQuery('#modalProgramming').modal();

      if(fwVersion<1||fwVersion>10){
         //error, wrong frimware version
         //alert("wrong firmware version");

         //jQuery('#divProgrammingMessage').html('wrong firmware version');
         programOutput('Wrong firmware version.', 'append', 'error');

         return;
      } else {

         //jQuery('#divProgrammingMessage').html('Sending blocks to server');
         programOutput('Sending blocks to server.', 'append', 'info');

      }

      console.log("calling API with version"+fwVersion)
      var URL = "https://api.edisonrobotics.net/ie/compile?v="+fwVersion;
      console.log(URL);

      var request = new XMLHttpRequest();
      request.onload = function(e) {

         try {

            var response = JSON.parse(this.responseText);
            console.log(response);

   			if (response.error == false) {

                //jQuery('#divProgrammingMessage').html('Received code');
                programOutput('Received code.', 'append', 'info');

               //alert("wav file created, press ok to download") -- SK: DO WE NEED THIS?
               //console.log(response.hex);
               var hexString = response.hex;
               var userProgString = hexString.substring(122880);
               var progSize = userProgString.length/2;
               var userProgData = new Uint8Array(progSize);
               var i,j;
               j=0;
               for ( i = 0; i < userProgString.length; i=i+2) {
                  var numString = "0x"+userProgString.substring(i,i+2);
                  var numData = parseInt(numString);
                  userProgData[j] = numData;
                  j++;
               }
               //console.log(userProgData);
               if (progSize>1028) {

                   //jQuery('#divProgrammingMessage').html('Error: program too big for Invention Engine Memory');
                   programOutput('Program too big for Invention Engine Memory.', 'append', 'error');
                   return;

               }


               checkUID( localStorage.getItem("ieUID") );

               logCompile( localStorage.getItem("ieUID") );

               sendProgramViaUSB(userProgData);


            } else {
               alert("fail "+mbc);
               alert(response.message);
            }
         } catch(e) {
            console.log("Response is not JSON!");
            console.log(this.responseText);
         }
      };

      request.onerror = function() {
         console.log("Unknown Error!");
         console.log(this.responseText);
      };

   	request.open("POST", URL, true);

   	request.send(mbc);

	}





   function startFirmwareCheck(){
      getInventionEngineFirmwareVersion();
   }




  // Disable the "Import from XML" button if the XML is invalid.
  // Preserve text between page reloads.
  function taChange() {
    var textarea = document.getElementById('importExport');
    if (sessionStorage) {
      sessionStorage.setItem('textarea', textarea.value)
    }
    var valid = true;
    try {
      Blockly.Xml.textToDom(textarea.value);
    } catch (e) {
      valid = false;
    }
    //document.getElementById('import').disabled = !valid;
  }

  function APIcallFimrware(mbc, IEFrimversion) {

		var URL = "https://api.edisonrobotics.net/ie/compile";
        //public API URL: https://api.edisonrobotics.net/ie/complie
        //https://api.edisonrobotics.net/ie/compile/text
        //https://dev.edisonrobotics.net/ie/compile

		var request = new XMLHttpRequest();

		request.onload = function(e) {
			try {
				var response = JSON.parse(this.responseText);
				if (response.error == false) {
					//alert("wav file created, press ok to download")
					//var a = new Audio(response.wav_url);
					//a.play();
                    //console.log(response);
                    //console.log(response.bin_url);
                    //console.log(response.hex);
                    var hexString = response.hex;
                    //122880
                    var userProgString = hexString.substring(0,61696);
                    var progSize = userProgString.length/2;
                    var userProgData = new Uint8Array(progSize);
                    var i,j;
                    j=0;
                    for ( i = 0; i < userProgString.length; i=i+2) {
                        var numString = "0x"+userProgString.substring(i,i+2);
                        var numData = parseInt(numString);
                        userProgData[j] = numData;
                        j++;
                    }
                    //console.log(userProgData);
                    //console.log(userProgString.length);
                    //fuFeebackCardClear();
                    //fuFeebackCardPrepend('Hub firmware version: v'+IEFrimversion);
                    //fuFeebackCardPrepend('Latest firmware version: '+response.v);
                    fuButtonStatus ('downloading');
                    updateHubFirmware(userProgData);
                    //sendProgramViaUSB(userProgData);
				} else {
					alert("fail");
					alert(response.message);
               fuFeebackCardPrepend(response.message, 'error');
				}
			} catch(e) {
				console.log("Response is not JSON!");
				console.log(this.responseText);
            fuFeebackCardPrepend(this.responseText, 'error');
			}
		};

		request.onerror = function() {
			console.log("Unknown Error!");
			console.log(this.responseText);
         fuFeebackCardPrepend(this.responseText, 'error');
		};

		request.open("POST", URL, true);

		request.send(mbc);

	}

  /*function logEvents(state) {
    var checkbox = document.getElementById('logCheck');
    checkbox.checked = state;
    if (sessionStorage) {
      sessionStorage.setItem('logEvents', state ? 'checked' : '');
    }
    if (state) {
      workspace.addChangeListener(logger);
    } else {
      workspace.removeChangeListener(logger);
    }
}

  function logFlyoutEvents(state) {
    //var checkbox = document.getElementById('logFlyoutCheck');
    //checkbox.checked = state;
    var soundsEnabled = null;
    if (sessionStorage) {
      sessionStorage.setItem('logFlyoutEvents', state ? 'checked' : '');
    }
    var flyoutWorkspace = (workspace.flyout_) ? workspace.flyout_.workspace_ :
      workspace.toolbox_.flyout_.workspace_;
    if (state) {
      flyoutWorkspace.addChangeListener(logger);
    } else {
      flyoutWorkspace.removeChangeListener(logger);
    }
  }

  function logger(e) {
    console.log(e);
  }

  function glowBlock() {
    if (Blockly.selected) {
      workspace.glowBlock(Blockly.selected.id, true);
    }
  }

  function unglowBlock() {
    if (Blockly.selected) {
      workspace.glowBlock(Blockly.selected.id, false);
    }
  }

  function glowStack() {
    if (Blockly.selected) {
      workspace.glowStack(Blockly.selected.id, true);
    }
  }

  function unglowStack() {
    if (Blockly.selected) {
      workspace.glowStack(Blockly.selected.id, false);
    }
  }

  function sprinkles(n) {
    var prototypes = [];
    var toolbox = getToolboxElement();
    var blocks = toolbox.getElementsByTagName('block');
    for (var i = 0; i < n; i++) {
      var blockXML = blocks[Math.floor(Math.random() * blocks.length)];
      var block = Blockly.Xml.domToBlock(blockXML, workspace);
      block.initSvg();
      block.moveBy(
        Math.round(Math.random() * 450 + 40),
        Math.round(Math.random() * 600 + 40)
      );
    }
  }*/

  var equalsXml = [
    '  <shadow type="operator_equals">',
    '    <value name="OPERAND1">',
    '     <shadow type="text">',
    '      <field name="TEXT">foo</field>',
    '     </shadow>',
    '    </value>',
    '    <value name="OPERAND2">',
    '      <shadow type="operator_equals"></shadow>',
    '    </value>',
    '  </shadow>'
  ].join('\n');

  var spaghettiXml = [
    '  <block type="control_if_else">',
    '    <value name="CONDITION">',
    '      <shadow type="operator_equals"></shadow>',
    '    </value>',
    '    <statement name="SUBSTACK"></statement>',
    '    <statement name="SUBSTACK2"></statement>',
    '    <next></next>',
    '  </block>'
  ].join('\n');

  function spaghetti(n) {
    console.log("Starting spaghetti.  This may take some time...");
    var xml = spaghettiXml;
    // Nest if/else statements deeply.
    for(var i = 0; i < 2 * n; i++) {
      xml = xml.replace(/(<statement name="SUBSTACK2?"?>)<\//g,
          '$1' + spaghettiXml + '</');
    }
    // Stack a bit.
    for(var i = 0; i < n; i++) {
      xml = xml.replace(/(<next>)<\//g,
      '$1' + spaghettiXml + '</');
    }

    // Nest boolean comparisons.
    var equalsBlock = equalsXml;
    for (var i = 0; i < n; i++) {
      equalsBlock = equalsBlock.replace(
          /(<shadow( type="operator_equals")?>)<\/shadow>/g, equalsXml);
    }

    // Put the nested boolean comparisons into if/else statements.
    xml = xml.replace(/(<shadow( type="operator_equals")?>)<\/shadow>/g,
        equalsBlock);

    xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml + '</xml>';
    var dom = Blockly.Xml.textToDom(xml);
    console.time('Spaghetti domToWorkspace');
    Blockly.Xml.domToWorkspace(dom, workspace);
    console.timeEnd('Spaghetti domToWorkspace');
  }

  function setSoundsEnabled(state) {
    //var checkbox = document.getElementById('soundsEnabled');
    //checkbox.checked = (state) ? 'checked' : '';
    if (sessionStorage) {
      sessionStorage.setItem('soundsEnabled', state);
    }
  }

  function fakeDrag(id, dx, dy, opt_workspace) {
    var ws = opt_workspace || Blockly.getMainWorkspace();
    var blockToDrag = ws.getBlockById(id);

    if (!blockToDrag) {
      fakeDragWrapper();
      return;
    }
    var blockTop = blockToDrag.svgGroup_.getBoundingClientRect().top;
    var blockLeft = blockToDrag.svgGroup_.getBoundingClientRect().left;

    // Click somewhere on the block.
    var mouseDownEvent = new MouseEvent('mousedown',
        {clientX: blockLeft + 5, clientY: blockTop + 5});
    blockToDrag.onMouseDown_(mouseDownEvent);

    // Throw in a move for good measure.
    setTimeout(
      function() {
        var mouseMoveEvent = new MouseEvent('mousemove',
            {clientX: blockLeft + dx,
            clientY: blockTop + dy});
        blockToDrag.onMouseMove_(mouseMoveEvent);

        // Drop at dx, dy.
        setTimeout(
          function() {
            var mouseUpEvent = new MouseEvent('mouseup',
                {clientX: blockLeft + dx,
                clientY: blockTop + dy});
            blockToDrag.onMouseUp_(mouseUpEvent);

            setTimeout(fakeDragWrapper(), 100);
          }, 30);
      }, 30);
  };

  function fakeDragWrapper() {
    var dragInfo = fakeDragStack.pop();
    if (dragInfo) {
      fakeDrag(dragInfo.id, dragInfo.dx, dragInfo.dy, dragInfo.workspace);
    }
  }

  function fakeManyDrags() {
    var blockList = workspace.getAllBlocks();
    for (var i = 0; i < 2 * blockList.length; i++) {
      fakeDragStack.push(
        {
          id: blockList[Math.round(Math.random() * (blockList.length - 1))].id,
          // Move some blocks up and to the left, but mostly down and to the right.
          dx: Math.round((Math.random() - 0.25) * 200),
          dy: Math.round((Math.random() - 0.25) * 200),
          workspace: workspace
        });
    }
    fakeDragWrapper();
  }

  function reportDemo() {
    if (Blockly.selected) {
      workspace.reportValue(
        Blockly.selected.id,
        document.getElementById('reportValue').value
      );
    }
  }
