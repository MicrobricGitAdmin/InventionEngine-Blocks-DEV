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
goog.provide('Blockly.SnippetsFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.SnippetsFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block;
    var disabled = "true";
    var snippetList = workspace.snippetsList;
    var usedSnippetList = workspace.usedSnippetsList;


    //var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', Blockly.Msg.BUTTON_SNIPPET_MAKE_TEXT_1);
    button.setAttribute('callbackKey', 'CREATE_SNIPPET');

    workspace.registerButtonCallback('CREATE_SNIPPET', function(button) {
      snippetCreateMenu();
    });

    xmlList.push(button);

    var button = goog.dom.createDom('button');
    button.setAttribute('text', Blockly.Msg.BUTTON_SNIPPET_MANAGE_TEXT_1);
    button.setAttribute('callbackKey', 'MANAGE_SNIPPET');

    workspace.registerButtonCallback('MANAGE_SNIPPET', function(button) {
      snippetChangeMenu();
    });

    xmlList.push(button);

    for (var i = 0; i < snippetList.length; i++) {
      if(!usedSnippetList.includes(snippetList[i])){
          if (Blockly.Blocks['snippets_copy_code']) {
            // <block type="data_variable">
            //    <field name="VARIABLE">variablename</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'snippets_copy_code');
            block.setAttribute('gap', 8);

            var field = goog.dom.createDom('field', null, snippetList[i]);
            field.setAttribute('name', 'SNIPPET');
            block.appendChild(field);

            xmlList.push(block);
          }
      }

    }


    for (var i = 0; i < snippetList.length; i++) {
      if (Blockly.Blocks['snippets_paste_code']) {
        // <block type="data_variable">
        //    <field name="VARIABLE">variablename</field>
        // </block>
        var block = goog.dom.createDom('block');
        block.setAttribute('type', 'snippets_paste_code');
        block.setAttribute('gap', 8);

        var field = goog.dom.createDom('field', null, snippetList[i]);
        field.setAttribute('name', 'SNIPPET');
        block.appendChild(field);

        xmlList.push(block);
      }
    }


    return xmlList;

};
