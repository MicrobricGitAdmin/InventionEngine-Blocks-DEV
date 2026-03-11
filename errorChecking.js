
function restBothErrors(){

    Blockly.errorFlags = {
        "motorsRunning": false,
        "servosRunning": false,
        'Inside':false,
        'insideNumLoop':false,
        'snippetInNumLoop':false,
        'inSnippet':false,
        'SnippetNumBlocks':0,
        'NumSnippetsInMain':0,
        'totalBlocks':0,
    }

    Blockly.constantNames = [];

    Blockly.redErrorMessages={
        "constantNameBlank": Blockly.Msg.RED_ERROR_CONSTANT_NAME_BLANK,
        "bitNotAssigned": Blockly.Msg.RED_ERROR_BIT_NOT_ASSIGNED,
        "ifBlockMissingOperator": Blockly.Msg.RED_ERROR_IF_MISSING_OPERATOR,
        "elseIfBlockMissingOperator": Blockly.Msg.RED_ERROR_ELSE_IF_MISSING_OPERATOR,
        "waitUntilBlockMissingOperator": Blockly.Msg.RED_ERROR_WAIT_UNTIL_MISSING_OPERATOR,
        "repeatUntilBlockMissingOperator": Blockly.Msg.RED_ERROR_REPEAT_MISSING_OPERATOR,
        "notBlockMissingOperator": Blockly.Msg.RED_ERROR_NOT_MISSING_OPERATOR,
        "andBlockMissingOperator": Blockly.Msg.RED_ERROR_AND_MISSING_OPERATOR,
        "orBlockMissingOperator": Blockly.Msg.RED_ERROR_OR_MISSING_OPERATOR,
        "noStartBlock": Blockly.Msg.RED_ERROR_NO_START,
        "noSetupBlock": Blockly.Msg.RED_ERROR_NO_SETUP,
        "setBlockMissingVariable": Blockly.Msg.RED_ERROR_SET_MISSING_VARIABLE,
        "incrementBlockMissingVariable": Blockly.Msg.RED_ERROR_INCREMENT_MISSING_VARIABLE,
        "decrementBlockMissingVariable": Blockly.Msg.RED_ERROR_DECREMENT_MISSING_VARIABLE,
        "constrainBlockMissingVariable": Blockly.Msg.RED_ERROR_CONSTRAIN_MISSING_VARIABLE,
        "mapBlockMissingVariable": Blockly.Msg.RED_ERROR_MAP_MISSING_VARIABLE,
        "bitShiftBlockMissingVariable": Blockly.Msg.RED_ERROR_BIT_SHIFT_MISSING_VARIABLE,
        "noCodeBlocksConnected": Blockly.Msg.RED_ERROR_NO_MAIN_BLOCKS ,
        "snippetInSnippet": Blockly.Msg.RED_ERROR_SNIPPET_IN_SNIPPET ,
        "tooManyBlocksInSnippet": Blockly.Msg.RED_ERROR_TOO_MANY_BLOCKS_IN_SNIPPET,
        "tooManySnippetInMain": Blockly.Msg.RED_ERROR_TOO_MANY_SNIPPETS_IN_MAIN,

    }

    Blockly.yellowErrorMessages={
        "servoOffLEDtoLevel": Blockly.Msg.YELLOW_ERROR_SERVO_OFF_DURING_LED,
        "motorOffLEDtoLevel": Blockly.Msg.YELLOW_ERROR_MOTOR_OFF_DURING_LED,
        "servoOffGPOsignal": Blockly.Msg.YELLOW_ERROR_SERVO_OFF_DURING_GPO_SIGNAL,
        "motorOffGPOsignal": Blockly.Msg.YELLOW_ERROR_MOTOR_OFF_DURING_GPO_SIGNAL,
        "servoOffSound": Blockly.Msg.YELLOW_ERROR_SERVO_OFF_DURING_SOUND,
        "motorOffSound": Blockly.Msg.YELLOW_ERROR_MOTOR_OFF_DURING_SOUND,
        "disconnectedBlocks": Blockly.Msg.YELLOW_ERROR_DISCONNECTED_BLOCKS,
        "commentsUsed": Blockly.Msg.YELLOW_ERROR_COMMENTS,
        "inputBlocksCantOverflow": Blockly.Msg.YELLOW_ERROR_INPUT_BLOCKS_CANNOT_OVERFLOW,
        "sensorsBlocksCantOverflow": Blockly.Msg.YELLOW_ERROR_SENSORS_BLOCKS_CANNOT_OVERFLOW,
        "operatorBlocksCantOverflow": Blockly.Msg.YELLOW_ERROR_OPERATOR_BLOCKS_CANNOT_OVERFLOW,
        "dataBlocksCantOverflow": Blockly.Msg.YELLOW_ERROR_DATA_BLOCKS_CANNOT_OVERFLOW,
        "usbNeededForUsbBlocks": Blockly.Msg.YELLOW_ERROR_USB_NEEDED_FOR_USB,
        "duplicateConstantNamesAreConfusing": Blockly.Msg.YELLOW_ERROR_DUPLICATE_CONSTANT_NAMES,
        "foreverLoopInSubstack": Blockly.Msg.YELLOW_ERROR_FOREVER_LOOP_IN_SUBSTACK,
        "maybeTooManyBlocks": Blockly.Msg.YELLOW_ERROR_MAYBE_TOO_MANY_BLOCKS,
        "snippetPasteWithNoHeader": Blockly.Msg.YELLOW_ERROR_SNIPPET_PASTE_WITH_NO_HEADER,
    }

    Blockly.redErrors={
        "constantNameBlank": false,
        "bitNotAssigned": false,
        "ifBlockMissingOperator": false,
        "elseIfBlockMissingOperator": false,
        "waitUntilBlockMissingOperator": false,
        "repeatUntilBlockMissingOperator": false,
        "notBlockMissingOperator": false,
        "andBlockMissingOperator": false,
        "orBlockMissingOperator": false,
        "noStartBlock": false,
        "noSetupBlock": false,
        "setBlockMissingVariable": false,
        "incrementBlockMissingVariable": false,
        "decrementBlockMissingVariable": false,
        "constrainBlockMissingVariable": false,
        "mapBlockMissingVariable": false,
        "bitShiftBlockMissingVariable": false,
        "noCodeBlocksConnected": false,
        "snippetInSnippet": false,
        "tooManyBlocksInSnippet": false, //
        "tooManySnippetInMain": false,

    }

    Blockly.yellowErrors={
        "servoOffLEDtoLevel": false,
        "motorOffLEDtoLevel": false,
        "servoOffGPOsignal": false,
        "motorOffGPOsignal": false,
        "servoOffSound": false,
        "motorOffSound": false,
        "disconnectedBlocks": false,
        "commentsUsed": false,
        "inputBlocksCantOverflow": false,
        "sensorsBlocksCantOverflow": false,
        "operatorBlocksCantOverflow": false,
        "dataBlocksCantOverflow": false,
        "usbNeededForUsbBlocks": false,
        "duplicateConstantNamesAreConfusing": false,
        "foreverLoopInSubstack": false,
        "maybeTooManyBlocks": false,
        "snippetPasteWithNoHeader": false,
    }
}


 function checkBlock(blockr){
     //code block checks:
     /*
     red:
     - Block has no bit assigned v
     - missing conditional in if, else if, wait until and repeat until v
     - missing conditional in not, and, or v
     - missing variable in variable blocks v
     yellow:
     - Servos will be turned off while a pwm signal v
     - Servos will be turned off while a note is being played v
     - Servos will be turned off while a sound effect is played v
     - Comments will not be programmed into IE v
     - Sensors, operators and data blocks input to movement, LEDs, sound, data or advanced blocks will not be able to push the input above its limit
     - USB blocks will not work unless IE is connected to this website, connect to your IE using the USB tools
     - operators inside loop until
     - operators inside wait until
     - forever loop inside if or loop
     */
     var blocksHold = Blockly.errorFlags['totalBlocks'];
     var blockName = blockr.type;

     if(blockr.outputShape_==2){
         //number input, check catagory Blockly.Categories.operators
         if(blockr.category_=="operators"){
                if(blockName=="operator_random"){
                    Blockly.errorFlags['totalBlocks']++;
                    //console.log("adding "+blockName);
                }
                if(blockName=="operator_ABS"){
                    Blockly.errorFlags['totalBlocks']++;
                    //console.log("adding "+blockName);
                }
                if(blockName=="operator_is_between"){
                    Blockly.errorFlags['totalBlocks']++;
                    //console.log("adding "+blockName);
                }
         }else if(blockName.includes("sound")){ //blockr.category_=="sound"
             //ignoring these
         }else if(blockName.includes("data")){ //blockr.category_=="data"
             //ignoring these
         }else if(blockName.includes("math")){ //blockr.category_=="math"
             //ignoring these
         }else{
             Blockly.errorFlags['totalBlocks']++;
             //console.log("adding "+blockName);
         }

     }else{
         // boolian inputs or full blocks,
         if(blockName != "snippets_copy_code"){
             Blockly.errorFlags['totalBlocks']++;
             //console.log("adding "+blockName);
         }
     }

     if (Blockly.errorFlags['totalBlocks']>50){
         //too many blocks in the workspace
         setErrorFlag("yellow","maybeTooManyBlocks");
     }



     if(Blockly.errorFlags['inSnippet']){
         //error, snippet in snippet, red error
         //need to check for type here
         var dif;
         dif = Blockly.errorFlags['totalBlocks'] - blocksHold;
         //if any blocks we care about have been added to the total we need to add them to the snippet total too
         Blockly.errorFlags['SnippetNumBlocks'] += dif;


         if(Blockly.errorFlags['SnippetNumBlocks']>20){
             setErrorFlag("red","tooManyBlocksInSnippet");
         }
     }


     if(blockr.getFieldValue("PORT")=="99"){
         setErrorFlag("red","bitNotAssigned");
     }
     if(blockr.getFieldValue("PORT")=="-99"){
         setErrorFlag("red","bitNotAssigned");
     }


    if(blockName=="Comment_userComment"){
		setErrorFlag("yellow", "commentsUsed");
    }else if (blockName=="control_if") {
        var conditionInput = blockr.getInputTargetBlock("CONDITION");
        if(conditionInput==null){
            setErrorFlag("red", "ifBlockMissingOperator");
        }

        var currentInside = Blockly.errorFlags['Inside'];
		var subBlock = blockr.getInputTargetBlock("SUBSTACK");
		var subBlock2 = blockr.getInputTargetBlock("SUBSTACK2");
		Blockly.errorFlags['Inside']= true;
		if (subBlock != null){
			checkBlock(subBlock);
		}
		if (subBlock2 != null){
			checkBlock(subBlock2);
		}
		Blockly.errorFlags['Inside']= currentInside;

    }else if (blockName=="control_if_else") {
        var conditionInput = blockr.getInputTargetBlock("CONDITION");
        if(conditionInput==null){
            setErrorFlag("red", "elseIfBlockMissingOperator");
        }
        var currentInside = Blockly.errorFlags['Inside'];
		var subBlock = blockr.getInputTargetBlock("SUBSTACK");
		var subBlock2 = blockr.getInputTargetBlock("SUBSTACK2");
		Blockly.errorFlags['Inside']= true;
		if (subBlock != null){
			checkBlock(subBlock);
		}
		if (subBlock2 != null){
			checkBlock(subBlock2);
		}
		Blockly.errorFlags['Inside']= currentInside;
    }else if (blockName=="control_wait_until") {
        var conditionInput = blockr.getInputTargetBlock("CONDITION");
        if(conditionInput==null){
            setErrorFlag("red", "waitUntilBlockMissingOperator");
        }
    }else if (blockName=="control_repeat_until") {
        var conditionInput = blockr.getInputTargetBlock("CONDITION");
        if(conditionInput==null){
            setErrorFlag("red", "repeatUntilBlockMissingOperator");
        }
        var currentInside = Blockly.errorFlags['Inside'];
		var subBlock = blockr.getInputTargetBlock("SUBSTACK");
		Blockly.errorFlags['Inside']= true;
		if (subBlock != null){
			checkBlock(subBlock);
		}
		Blockly.errorFlags['Inside']= currentInside;
    }else if (blockName=="control_repeat") {
        var currentInside = Blockly.errorFlags['Inside'];
        var currentInsideNumLoop = Blockly.errorFlags['insideNumLoop'];
		var subBlock = blockr.getInputTargetBlock("SUBSTACK");
		Blockly.errorFlags['Inside']= true;
        Blockly.errorFlags['insideNumLoop']= true;
		if (subBlock != null){
			checkBlock(subBlock);
		}
		Blockly.errorFlags['Inside']= currentInside;
        Blockly.errorFlags['insideNumLoop']= currentInsideNumLoop;

    }else if (blockName=="control_forever") {
        if(Blockly.errorFlags['Inside']){
            setErrorFlag("yellow", "foreverLoopInSubstack");
        }
        var currentInside = Blockly.errorFlags['Inside'];
		var subBlock = blockr.getInputTargetBlock("SUBSTACK");
		Blockly.errorFlags['Inside']= true;
		if (subBlock != null){
			checkBlock(subBlock);
		}
		Blockly.errorFlags['Inside']= currentInside;
    }else if (blockName=="operator_not") {
        var conditionInput = blockr.getInputTargetBlock("OPERAND");
        if(conditionInput==null){
            setErrorFlag("red", "notBlockMissingOperator");
        }
    }else if (blockName=="operator_and") {
        var conditionInput1 = blockr.getInputTargetBlock("OPERAND1");
        var conditionInput2 = blockr.getInputTargetBlock("OPERAND2");
        if(conditionInput1==null||conditionInput2==null){
            setErrorFlag("red", "andBlockMissingOperator");
        }
    }else if (blockName=="operator_or") {
        var conditionInput1 = blockr.getInputTargetBlock("OPERAND1");
        var conditionInput2 = blockr.getInputTargetBlock("OPERAND2");
        if(conditionInput1==null||conditionInput2==null){
            setErrorFlag("red", "orBlockMissingOperator");
        }
    }else if (blockName=="data_setvariableto") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "setBlockMissingVariable");
        }
    }else if (blockName=="data_incvariable") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "incrementBlockMissingVariable");
        }
    }else if (blockName=="data_decvariable") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "decrementBlockMissingVariable");
        }
    }else if (blockName=="data_variable_constrain") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "constrainBlockMissingVariable");
        }
    }else if (blockName=="data_variable_map") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "mapBlockMissingVariable");
        }
    }else if (blockName=="data_variable_bit_shift") {
        var conditionInput = blockr.getInputTargetBlock("VARIABLE");
        if(conditionInput==null){
            setErrorFlag("red", "bitShiftBlockMissingVariable");
        }
    }else if (blockName=="motion_servo_to_position") {
        Blockly.errorFlags["servosRunning"] = true;
    }else if (blockName=="motion_motor_rotate") {
        Blockly.errorFlags["motorsRunning"] = true;
    }else if (blockName=="motion_motor_rotate_time") {
        Blockly.errorFlags["motorsRunning"] = true;
    }else if (blockName=="leds_led_to_level") {
        //Blockly.errorFlags["motorsRunning"] = true;
        if(Blockly.errorFlags["motorsRunning"]){
            setErrorFlag("yellow", "motorOffLEDtoLevel");
        }
        if(Blockly.errorFlags["servosRunning"]){
            setErrorFlag("yellow", "servoOffLEDtoLevel");
        }
    }else if (blockName=="advanced_GPO_pulse") {
        //Blockly.errorFlags["motorsRunning"] = true;
        if(Blockly.errorFlags["motorsRunning"]){
            setErrorFlag("yellow", "motorOffGPOsignal");
        }
        if(Blockly.errorFlags["servosRunning"]){
            setErrorFlag("yellow", "servoOffGPOsignal");
        }
    }else if (blockName.includes("sound_speaker")) {
        //Blockly.errorFlags["motorsRunning"] = true;
        if(Blockly.errorFlags["motorsRunning"]){
            setErrorFlag("yellow", "motorOffSound");
        }
        if(Blockly.errorFlags["servosRunning"]){
            setErrorFlag("yellow", "servoOffSound");
        }
    }else if (blockName=="advanced_USB_data") {
        setErrorFlag("yellow", "usbNeededForUsbBlocks");
    }else if (blockName=="advanced_send_USB_data") {
        setErrorFlag("yellow", "usbNeededForUsbBlocks");
    }else if (blockName=="advanced_send_USB_line_break") {
        setErrorFlag("yellow", "usbNeededForUsbBlocks");
    }else if (blockName=="snippets_paste_code") {
        //setErrorFlag("yellow", "usbNeededForUsbBlocks");
        if(Blockly.errorFlags['insideNumLoop']){
            //snippet in a repeat loop, need extended variables flag set
            Blockly.errorFlags['snippetInNumLoop'] = true;
            //used in generator.js to set the numebr of loop variables
        }
        if(Blockly.errorFlags['inSnippet']){
            //error, snippet in snippet, red error
            setErrorFlag("red", "snippetInSnippet");
        }else{
            Blockly.errorFlags['NumSnippetsInMain']++;
            if(Blockly.errorFlags['NumSnippetsInMain']>8){
                setErrorFlag("red", "tooManySnippetInMain");
            }
        }
        var field = blockr.getField("SNIPPET");
        var name = field.getValue();
        if(workspace.snippetUsedIndexOf(name)==-1){
          //set an error as theres a paste block without a copy
          //snippetPasteWithNoHeader
          setErrorFlag("yellow", "snippetPasteWithNoHeader");
        }
    }

    var inputBlocks = blockr.getChildren(false);
    var numInputs = inputBlocks.length;

    var nextBlock = blockr.getNextBlock();
    var j;
    for(j=0;j<numInputs;j++){
        //console.log(inputBlocks[j].outputShape_);
        if(inputBlocks[j]!=nextBlock){
            if(inputBlocks[j].outputShape_==2){
                //number based input
                var inputBlockName = inputBlocks[j].type;
                if(inputBlockName.includes("USB_data")){
                    setErrorFlag("yellow", "usbNeededForUsbBlocks");
                }else if(inputBlockName.includes("sensing_")){
                    setErrorFlag("yellow", "sensorsBlocksCantOverflow");
                }else if(inputBlockName.includes("operator_")){
                    setErrorFlag("yellow", "operatorBlocksCantOverflow");
                }else if(inputBlockName=="data_variable"){
                    setErrorFlag("yellow", "dataBlocksCantOverflow");
                }
                checkBlock(inputBlocks[j]);
            }else if(inputBlocks[j].outputShape_==1){
                checkBlock(inputBlocks[j]);
            }
        }

    }


    //console.log();

    /*
    "inputBlocksCantOverflow": false,
    "sensorsBlocksCantOverflow": false,
    "operatorBlocksCantOverflow": false,
    "dataBlocksCantOverflow": false,
    else if (blockName=="motion_servo_release") {
        Blockly.errorFlags["servosRunning"] = false;
    }else if (blockName=="motion_motor_break") {
        if(.getFieldValue("DIRECTION")=="COAST"){
            Blockly.errorFlags["motorsRunning"] = false;
        }

    }
    */

    //var nextBlock = blockr.getNextBlock();
	if (nextBlock != null){
		checkBlock(nextBlock);
	}
 }


function checkSetUpStack(blockS){
    //set up block checks:
    // constant name not blank
    //constant name not a dupe
    var blockName = blockS.type;
    if(blockName.includes("setup_bit_on_port")){
        var constantNameInput = blockS.getInputTargetBlock("COMMENTTEXT");
        if(constantNameInput!= null){
          var constantName = constantNameInput.getFieldValue('TEXT');
          if(!constantName.replace(/\s/g, '').length){
              setErrorFlag("red","constantNameBlank");
          }
          if(Blockly.constantNames.includes(constantName)){
              //duplicate name
              setErrorFlag("yellow","duplicateConstantNamesAreConfusing");
          }else{
              Blockly.constantNames.push(constantName);
          }
        }else{
          //alert("whoa, something happened please save out the console log and note your last actions");
          //console.log("error, setup block does not have a comment text target block");
          //console.log(blockS);
          //console.log(blockName);
          //console.log(constantNameInput);
        }

    }

    var nextBlock = blockS.getNextBlock();
	if (nextBlock != null){
		checkSetUpStack(nextBlock);
	}
}


function setErrorFlag(type,name){

    if(type == "red"){
        Blockly.redErrors[name]=true;
    }else{
        Blockly.yellowErrors[name]=true;
    }

}
