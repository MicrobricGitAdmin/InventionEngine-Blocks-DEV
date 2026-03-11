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
 /*
 '<block type="sensing_button_pressed"></block>'+
 '<block type="sensing_temperature_light_dial_read"></block>'+
 '<block type="sensing_proximity_detected"></block>'+
 '<block type="sensing_proximity_read"></block>'+
 '<block type="sensing_IRRX_data"></block>'+
 '<block type="sensing_noise_detected"></block>'+
 '<block type="sensing_magnet_read"></block>'+
 '<block type="sensing_tilt_detected"></block>'+
 */

'use strict';

/**
 * @name Blockly.sensorsFlyOut
 * @namespace
 **/
goog.provide('Blockly.sensorsFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.sensorsFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    var disabled = "true";

    if(Blockly.connectedButtons.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_BUTTON+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_BUTTON+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_button_pressed" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><block type="sensing_button_released" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    if(Blockly.connectedDials.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_DIAL+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_DIAL+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_dial_read" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedLightSensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_LIGHT+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_LIGHT+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_light_read" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedTemperatureSensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_TEMPERATURE+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_TEMPERATURE+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_temperature_read" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);



    /*if(Blockly.connectedDials.length>1||Blockly.connectedLightSensors.length>1 ||Blockly.connectedTemperatureSensors.length>1){


        disabled = "false";


    }else{
        //no sensors
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_TEMP_LIGHT_DIAL+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }
    blockText = '<xml><block type="sensing_temperature_light_dial_read" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);*/

    if(Blockly.connectedProximitySensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_PROXIMITY+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_PROXIMITY+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_proximity_range_detected" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    //blockText = '<xml><block type="sensing_proximity_detected" disabled="'+disabled+'"></block></xml>'
    //block = Blockly.Xml.textToDom(blockText).firstChild;
    //xmlList.push(block);
    //blockText = '<xml><block type="sensing_proximity_read" disabled="'+disabled+'"></block></xml>'
    //block = Blockly.Xml.textToDom(blockText).firstChild;
    //xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedIRreceiver.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_IR_RECEIVER+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_IR_RECEIVER+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_IRRX_data" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedNoiseSensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_NOISE+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_NOISE+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_noise_detected" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedMagnetSensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_MAGNET+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_MAGNET+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_magnet_read" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedTiltSensors.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_SETUP_TILT+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SENSORS_TILT+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/

        disabled = "false";

    }
    blockText = '<xml><block type="sensing_tilt_detected" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    //console.log(xmlList);
    return xmlList;


};
