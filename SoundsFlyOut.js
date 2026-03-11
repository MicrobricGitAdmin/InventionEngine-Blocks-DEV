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
 * @name Blockly.soundsFlyOut
 * @namespace
 **/
goog.provide('Blockly.soundsFlyOut');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');


Blockly.soundsFlyOut.flyoutCategory = function(workspace) {
    var xmlList = [];
    var blockText;
    var block ;
    if(Blockly.connectedSpeaker.length<=1){
        //no speakers setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SOUND_SETUP_SPEAKER+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_note" disabled="true">'+
            '<value name="NOTE">'+
              '<shadow type="math_note_number">'+
               '<field name="NUM">12</field>'+
              '</shadow>'+
              '<block type="sound_note_constants_5th_octave" disabled="true"></block>'+
            '</value>'+
            '<value name="NOTEDUR">'+
              '<shadow type="math_note_dur_number">'+
                '<field name="NUM">4</field>'+
              '</shadow>'+
              '<block type="sound_note_constants_duration" disabled="true"><field name="DUR">4</field></block>'+//"4"
            '</value>'+

        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_play_rest" disabled="true">'+
            '<value name="NOTEDUR">'+
              '<shadow type="math_note_dur_number">'+
                '<field name="NUM">4</field>'+
              '</shadow>'+
              '<block type="sound_note_constants_duration" disabled="true"><field name="DUR">4</field></block>'+//"4"
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_set_music_volume" disabled="true">'+
            '<value name="VOL">'+
              '<shadow type="math_speed_volume_number">'+
                '<field name="NUM">5</field>'+
              '</shadow>'+
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_set_tempo" disabled="true">'+
            '<value name="TEMPO">'+
              '<shadow type="math_note_tempo_number">'+
               '<field name="NUM">100</field>'+
              '</shadow>'+
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_tone" disabled="true">'+
            '<value name="FREQ">'+
              '<shadow type="math_frequency_number">'+
               '<field name="NUM">1000</field>'+
              '</shadow>'+
            '</value>'+
            '<value name="DUR">'+
              '<shadow type="math_tone_dur_number">'+
                '<field name="NUM">500</field>'+
              '</shadow>'+
            '</value>'+
            '<value name="VOL">'+
              '<shadow type="math_speed_volume_number">'+
                '<field name="NUM">5</field>'+
              '</shadow>'+
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_long_effect" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_medium_effect" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_short_effect" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><sep gap="32"></sep></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_4th_octave" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_5th_octave" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_6th_octave" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_duration" disabled="true" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
    }else{
        //Speaker setup
        blockText = '<xml><label text="'+Blockly.Msg.LABEL_SOUND_SPEAKER+'" ></label></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_note">'+
        '<value name="NOTE">'+
        '<shadow type="math_note_number">'+
         '<field name="NUM">12</field>'+
          '</shadow>'+
          '<block type="sound_note_constants_5th_octave" ></block>'+
        '</value>'+
        '<value name="NOTEDUR">'+
          '<shadow type="math_note_dur_number">'+
            '<field name="NUM">4</field>'+
          '</shadow>'+
          '<block type="sound_note_constants_duration" ><field name="DUR">4</field></block>'+//"4"
        '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_play_rest">'+
            '<value name="NOTEDUR">'+
              '<shadow type="math_note_dur_number">'+
                '<field name="NUM">4</field>'+
              '</shadow>'+
              '<block type="sound_note_constants_duration"><field name="DUR">4</field></block>'+//"4"
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_set_music_volume">'+
            '<value name="VOL">'+
              '<shadow type="math_speed_volume_number">'+
                '<field name="NUM">5</field>'+
              '</shadow>'+
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

        blockText = '<xml><block type="sound_speaker_set_tempo">'+
            '<value name="TEMPO">'+
              '<shadow type="math_note_tempo_number">'+
               '<field name="NUM">100</field>'+
              '</shadow>'+
            '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_tone">'+
        '<value name="FREQ">'+
          '<shadow type="math_frequency_number">'+
           '<field name="NUM">1000</field>'+
          '</shadow>'+
        '</value>'+
        '<value name="DUR">'+
          '<shadow type="math_tone_dur_number">'+
            '<field name="NUM">500</field>'+
          '</shadow>'+
        '</value>'+
        '<value name="VOL">'+
          '<shadow type="math_speed_volume_number">'+
            '<field name="NUM">5</field>'+
          '</shadow>'+
        '</value>'+
        '</block></xml>';
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_long_effect" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_medium_effect" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_speaker_play_short_effect" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><sep gap="32"></sep></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_4th_octave" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_5th_octave" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_6th_octave" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);
        blockText = '<xml><block type="sound_note_constants_duration" ></block></xml>'
        block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block);

    }
    return xmlList;

};
