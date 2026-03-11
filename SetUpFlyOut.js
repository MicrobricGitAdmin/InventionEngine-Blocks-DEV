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
 * @name Blockly.setupFlyOut
 * @namespace
 **/
goog.provide('Blockly.setupFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.setupFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    /*if(Blockly.connectedLEDS.length<=1){
        //no LEDs setup
        blockText = '<xml><label text="Please set up LED bit to use the LED block" ></label></xml>'
        var block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="leds_on_off_diasbled" disabled="true"></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
    }else{
        //LEDs setup
        blockText = '<xml><block type="leds_on_off"></block></xml>'
        var block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        '<value name="COMMENTTEXT">'+
            '<shadow type="setup_text">'+
              '<field name="TEXT" fill="#575E75">bit 1</field>'+
            '</shadow>'+
        '</value>'+






    }*/
    for (var k = 0; k < Blockly.portsUsed.length; k++) {
        if(Blockly.portsUsed[k]=="noID"){
            //block for this port does not exist yet, add it to the toolbox
            blockText = '<xml><block type="setup_bit_on_port_'+k+'" ><value name="COMMENTTEXT"><shadow type="setup_text"><field name="TEXT">'+Blockly.Msg.BLOCK_SETUP_BIT_DEFULT_CONSTANT_NAME+k+'</field></shadow></value></block></xml>';
            block = Blockly.Xml.textToDom(blockText).firstChild;
    		xmlList.push(block);

        }
    }
    return xmlList;

};
