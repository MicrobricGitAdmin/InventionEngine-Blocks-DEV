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
 * @name Blockly.AdvancedFlyOut
 * @namespace
 **/
goog.provide('Blockly.AdvancedFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.AdvancedFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    var disabled = "true";

    blockText = '<xml><label text="'+Blockly.Msg.LABEL_ADVANCED_USB+'" ></label></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><block type="advanced_USB_data"></block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="advanced_send_USB_data">'+
                  '<value name="DATA">'+
                    '<shadow type="math_16_bit_number">'+
                      '<field name="NUM">1</field>'+
                    '</shadow>'+
                  '</value>'+
                '</block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="advanced_send_USB_line_break"></block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    blockText = '<xml><sep gap="32"></sep></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);




    if(Blockly.connectedGPO.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_ADVANCED_SETUP_GPO+'" ></label></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_ADVANCED_GPO+'" ></label></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="advanced_GPO_high_low" disabled="'+disabled+'"></block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
    blockText = '<xml><block type="advanced_GPO_pulse" disabled="'+disabled+'">'+
      '<value name="SIGNAL">'+
        '<shadow type="math_pwm_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
      '<value name="TIME">'+
        '<shadow type="math_16_bit_positive_number">'+
          '<field name="NUM">500</field>'+
        '</shadow>'+
      '</value>'+
    '</block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);

    if(Blockly.connectedGPI.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_ADVANCED_SETUP_GPI+'" ></label></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        disabled = "true";

    }else{
        //LEDs setup
        /*blockText = '<xml><sep gap="64"></sep></xml>'
        var gap = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(gap);*/
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_ADVANCED_GPI+'" ></label></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        disabled = "false";

    }
    blockText = '<xml><block type="advanced_GPI_high_low" disabled="'+disabled+'"></block></xml>';
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    blockText = '<xml><sep gap="32"></sep></xml>'
    block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);


    return xmlList;

};
