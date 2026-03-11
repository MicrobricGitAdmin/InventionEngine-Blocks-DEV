/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling variables.
 * @author ben@microbric.com <Ben Hayton>
 */


'use strict';

/**
 * @name Blockly.motionFlyOut
 * @namespace
 **/
goog.provide('Blockly.motionFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.motionFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    var disabled = "true";

    if(Blockly.connectedServos.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_MOTION_SETUP_SERVO+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);//


        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_MOTION_SERVO+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="motion_servo_to_position" disabled="'+disabled+'"><value name="DEGREES"><shadow type="math_angle"><field name="NUM">90</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="motion_servo_release" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    //
    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedMotors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_MOTION_SETUP_MOTOR+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);//


        disabled = "true";
    }else{
        //LEDs setup

        blockText = '<xml><label text="'+Blockly.Msg.LABEL_MOTION_MOTOR+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);


        disabled = "false";

    }
    blockText = '<xml><block type="motion_motor_rotate_time"  disabled="'+disabled+'"><value name="SPEED"><shadow type="math_speed_volume_number"><field name="NUM">5</field></shadow></value><value name="TIME"><shadow type="math_16_bit_positive_number"><field name="NUM">1000</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="motion_motor_rotate"  disabled="'+disabled+'"><value name="SPEED"><shadow type="math_speed_volume_number"><field name="NUM">5</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><block type="motion_motor_break" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);



    return xmlList;

};
