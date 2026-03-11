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
 * @name Blockly.LEDFlyOut
 * @namespace
 **/
goog.provide('Blockly.LEDsFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.LEDsFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    var disabled = "true";


    if(Blockly.connectedLEDS.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_SETUP_LED+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "true";
    }else{
        //LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_LED+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="leds_led_on_off" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_led_to_level" disabled="'+disabled+'"><value name="LEVEL"><shadow type="math_pwm_number"><field name="NUM">50</field></shadow></value><value name="TIME"><shadow type="math_16_bit_positive_number"><field name="NUM">1000</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    if(Blockly.connectedDigitalDisplays.length<=1){
        //no displays setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_SETUP_DISPLAY+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";


    }else{
        //displays setup <value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_DISPLAY+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);*/
        disabled = "false";

    }

    blockText = '<xml><block type="leds_digital_display_number" disabled="'+disabled+'"><value name="NUM"><shadow type="math_display_num_number"><field name="NUM">1</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_digital_display_temperature" disabled="'+disabled+'"><value name="TEMP"><shadow type="math_display_temp_number"><field name="NUM">25</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_digital_display_level" disabled="'+disabled+'"><value name="LEVEL"><shadow type="math_display_level_number"><field name="NUM">3</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_digital_display_effect" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_digital_display_word" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="leds_digital_display_clear" disabled="'+disabled+'"></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedIRtransmitter.length<=1){
        //no displays setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_SETUP_IRTX+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";


    }else{
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_LEDS_IRTX+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);*/
        disabled = "false";
    }

    blockText = '<xml><block type="leds_IR_TX_send" disabled="'+disabled+'"><value name="DATA"><shadow type="math_IR_data_number"><field name="NUM">1</field></shadow></value></block></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    return xmlList;

};
