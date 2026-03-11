"use strict";

var inputFile = document.getElementById("modalLoadLocalFiles");
inputFile.addEventListener('change', handleFileSelect, false);

jQuery(document).ready(function() {
   console.log("and loaded...");
   setInterval(function() {
      saveToStorage();
   }, 5000);
});


// TRY CATCH PAGE RELOAD AND SAVE LOCALY
window.onbeforeunload = function(event) {
   saveToStorage();
};


// LOAD FROM STORAGE
function loadFromStorage() {

   console.log('loadFromStorage...');

   if (localStorage.getItem("iePN")) {

      console.log('load from session storage...');

      var strProgramName = localStorage.getItem("iePN");
      var strProgramString = localStorage.getItem("iePS");

      strProgramString = b64DecodeUnicode( strProgramString );

      //console.log( strProgramName );
      //console.log( strProgramString );

      jQuery(".ie-program-title").html(strProgramName);


      if ( workspace ) {
         
         Blockly.LoadingCode = true;
         Blockly.mainWorkspace.clear();
         resetSetupBlocks();
         var xml = Blockly.Xml.textToDom( strProgramString );
         Blockly.Xml.domToWorkspace(xml, workspace);
         workspace.clearUndo();
         return true;

   // if ( workspace ) {

   //    var xml = Blockly.Xml.textToDom( strProgramString );
   //    Blockly.Xml.domToWorkspace(xml, workspace);
   //    workspace.clearUndo();
   //    return true;

      } else {

         console.log ( 'No workspace' );
         return false;

      }

   }
}



// SAVE TO STORAGE
function saveToStorage() {

   console.log('saveToStorage...');
   localStorage.setItem("iePN", jQuery(".ie-program-title").text());
   localStorage.setItem("iePS", getBlocksForDownload());

}




// RUN PROGRAMMING
jQuery('#navProgram').click(function() {
   console.log('start program...');
   programInventionEngine();
});





// SAVE LOCAL
jQuery("#btnSaveLocal").on("click", function(e) {

   console.log('SAVE LOCAL');

   var strProgramName = jQuery("#modalSaveLocal #txtProgramName").val();

   console.log(strProgramName);

   strProgramName = fileNameClean(strProgramName);

   console.log(strProgramName);

   var strContent = getBlocksForDownload();

   var isValidResult = fileNameIsValid(strProgramName);

   if ( isValidResult ) {

      var displayDiv = "#modalSaveLocal #divProgramNameMessageLocal";
      nameDisplayMessage (displayDiv, isValidResult, "alert-warning", "show");

   } else {


      jQuery('#btnSaveLocal').prop('disabled', true);

      jQuery(".ie-program-title").html(strProgramName);

      //localStorage.setItem("iePN", strProgramName);

      var displayDiv = "#modalSaveLocal #divProgramNameMessageLocal";
      nameDisplayMessage (displayDiv, "Okay! Your program is being saved. The download of your program should begin soon.", "alert-success", "show");

      setTimeout(function(){

         var strFilename = strProgramName;

         var form = document.createElement("form");
         form.setAttribute("method", "post");
         form.setAttribute("action", "_download.php");
         form.style.display = 'none';

         var filenameField = document.createElement("input");
         filenameField.setAttribute("name", "fn");
         filenameField.setAttribute("value", strFilename);
         form.appendChild(filenameField);

         var contentField = document.createElement("input");
         contentField.setAttribute("name", "content");
         contentField.setAttribute("value", strContent);
         form.appendChild(contentField);

         form.setAttribute("target", "_blank");

         document.body.appendChild(form);    // Not entirely sure if this is necessary
         form.submit();

         console.log (form);

         jQuery("#modalSaveLocal").modal('hide');

         jQuery('#btnSaveLocal').prop('disabled', false);

      }, 2500);

      saveToStorage();

      window.dataLayer.push({
         'event': 'analyticsEvent',
         'analyticsCategory': 'Program',
         'analyticsAction': 'Click',
         'analyticsLabel': 'Save - Local',
         'analyticsValue': 1
      });

   }

});








// POP CREATE SNIP
function snippetCreateMenu(currentWorkspace) {
   jQuery(".modal").modal("hide");
   jQuery("#divCreateSnipMessage").hide();
   //Blockly.loadDOMhold="";
   jQuery("#modalCreateSnip").modal();
   jQuery("#modalCreateSnip").on("shown.bs.modal", function () {
      jQuery("#txtCreateSnipName").focus();
   });

}

// POP CREATE SNIP - CREATE
jQuery("#modalCreateSnip #btnCreateSnip").on("click", function(e) {
   e.preventDefault();
   var strSnipName = varCleanName( jQuery("#modalCreateSnip #txtCreateSnipName").val() );
   var displayDiv = "#modalCreateSnip #divCreateSnipMessage";
   var isValidResult = snipIsValid(strSnipName);
   console.log("Create Snip - Create - " + strSnipName + " - " + isValidResult);
   if ( isValidResult ) {
      snipDisplayMessage (displayDiv, isValidResult, "alert-warning", "show");
   } else {
      workspace.createSnippet( strSnipName );
      snipDisplayMessage (displayDiv, "New snippet created successfully.", "alert-success", "hide");
      jQuery("#modalCreateSnip #txtCreateSnipName").val("");
   }
})



// POP MANAGE SNIP
function snippetChangeMenu() {

   console.log("snippetChangeMenu...");

   jQuery(".modal").modal("hide");
   jQuery( "#listSnip" ).html("");

   var htmlSnipList = "";

   var currentSnippets = workspace.snippetsList;

   //for (var i=0;i<currentSnippets.length;i++){

      // if (currentSnippets[i]=="bob"){
      //     workspace.renameSnippet("bob","blink");
         //  break;
      // }
      // if (currentSnippets[i]=="blink"){
           //alert(workspace.getNumVariableUses("bob2"));
      //     workspace.deleteSnippet("blink");
           //workspace.deleteVariable("bob2");
   //    }

//   }



   if (currentSnippets) {

      if (currentSnippets.length == 0) {

         htmlSnipList = htmlSnipList + '<div class="row ie-list-item">';
            htmlSnipList = htmlSnipList + '<div class="col ie-name-var">na</div>';
         htmlSnipList = htmlSnipList + '</div>';

      } else {

         for ( var i=0; i<currentSnippets.length; i++ ) {
            htmlSnipList = htmlSnipList + '<div class="row ie-list-item">';
               htmlSnipList = htmlSnipList + '<div id="ie-manage-snip-name-' + i + '" class="col ie-name-snip">';
               htmlSnipList = htmlSnipList + currentSnippets[i];
               htmlSnipList = htmlSnipList + '</div>';
               htmlSnipList = htmlSnipList + '<div id="ie-manage-snip-actions-' + i + '" class="col ie-actions-snip">';
               htmlSnipList = htmlSnipList + '<a href="#" class="ie-delete-snip" data-name="' + currentSnippets[i] + '" data-id="' + i + '" >delete</a> | ';
               htmlSnipList = htmlSnipList + '<a href="#" class="ie-rename-snip" data-name="' + currentSnippets[i] + '" data-id="' + i + '" >rename</a>';
               htmlSnipList = htmlSnipList + '</div>';
               htmlSnipList = htmlSnipList + '<div id="ie-manage-snip-feedback-' + i + '" class="alert ie-manage-snip-feedback" role="alert" style="display: none;"></div>';
            htmlSnipList = htmlSnipList + '</div>';
         }

      }

      jQuery('#listSnip').html(htmlSnipList);
      jQuery("#modalManageSnip").modal();

   }
}



function snipDisplayMessage (displayDiv, displayMessage, displayType, displayBehaviour) {
   jQuery(displayDiv).hide();
   jQuery(displayDiv).html(displayMessage);
   jQuery(displayDiv).removeClass( "alert-warning alert-success" ).addClass( displayType );
   jQuery(displayDiv).slideDown(200);
      if (displayBehaviour == 'hide') {
      setTimeout(function() {
         jQuery(displayDiv).slideUp(200)
      }, 3000);
   }
}

function snipIsValid (strSnip) {
   var strReturn = null;
   if (snipIsExist(strSnip)) {
      strReturn = "You already have a snippet with that name.";
   }
   if ( !(strSnip.match(/^([A-z0123456789_])+$/) ) ) {
      //console.log ( "error: " + strVar.match(/^([A-z0123456789_])+$/) );
      strReturn = "Snippet name contains an unsupported character. Variable names can only contain lowercase English letters, uppercase English letters, numbers, and underscores ( _ ).";
   }
   if (strSnip.match(/^\d/)) {
        strReturn = "Snippet names cannot start with a number.";
   }
   if (strSnip == "" ) {
        strReturn = "Please enter a snippet name.";
   }
   return strReturn;
}




// RENAME SNIP
jQuery( "#listSnip" ).on( "click", "a.ie-rename-snip", function (e) {

   //jQuery(".ie-manage-var-feedback").fadeOut(200);

   e.preventDefault();

   var snipName = jQuery(this).data("name");
   var snipID = jQuery(this).data("id");

   console.log(snipName);
   console.log(snipID);

   var snipRenameDiv = "#ie-manage-snip-name-" + snipID;
   var snipActionsDiv = "#ie-manage-snip-actions-" + snipID;
   var snipTxtInputID = "txtRenameSnipName-" + snipID;

   jQuery(snipRenameDiv).html("<input class='form-control txtRenameSnipInput' id='" + snipTxtInputID + "' autocomplete='off' maxlength='25' type='text' value='" + snipName +"'>");
   jQuery(snipActionsDiv).html("<a href='#' class='ie-rename-snip-confirm' data-name='" + snipName+  "' data-id='" + snipID + "'>confirm</a> | <a href='#' class='ie-rename-snip-cancel' data-name='" + snipName+  "' data-id='" + snipID + "'>cancel</a>");
   //jQuery(varTxtInputID).focus();

})


// RENAME SNIP - CONFIRM
jQuery( "#listSnip" ).on( "click", "a.ie-rename-snip-confirm", function (e) {

   e.preventDefault();
   var snipName = jQuery(this).data("name");
   var snipID = jQuery(this).data("id");
   var displayDiv = "#modalManageSnip #ie-manage-snip-feedback-" + snipID;
   var txtSnipNewName = "#modalManageSnip #txtRenameSnipName-" + snipID;

   //var strVarNewName = varCleanName( jQuery(txtVarNewName).val() );
   var strSnipNewName =  jQuery(txtSnipNewName).val();

   if (snipName == strSnipNewName) {
      snipDisplayMessage (displayDiv, "You did not change the snippet name. Please try again.", "alert-warning", "show");
      return false;
   }

   var isValidResult = snipIsValid(strSnipNewName);

   if ( isValidResult ) {

      snipDisplayMessage (displayDiv, isValidResult, "alert-warning", "show");
      console.log('isValidResult');

   } else {

      console.log(workspace.snippetsList);

      for (var i=0; i<workspace.snippetsList.length; i++) {

         console.log(workspace.snippetsList[i]);

         if (workspace.snippetsList[i]==snipName){
            workspace.renameSnippet(snipName,strSnipNewName);
            workspace.toolbox_.refreshSelection();
         }
      }

      snipDisplayMessage (displayDiv, "Snippet renamed successfully!", "alert-success", "hide");

      var snipRenameDiv = "#ie-manage-snip-name-" + snipID;
      var snipActionsDiv = "#ie-manage-snip-actions-" + snipID;

      jQuery(snipRenameDiv).html("<div id='ie-manage-snip-name-" + snipID + "' class='col-xs-9 ie-name-var'>" + strSnipNewName + "</div>");
      jQuery(snipActionsDiv).html("<a href='#' class='ie-delete-snip' data-name='" + strSnipNewName + "' data-id='" + snipID + "'>delete</a> | <a href='#' class='ie-rename-snip' data-name='" + strSnipNewName + "' data-id='" + snipID + "'>rename</a>");

   }

})


// RENAME SNIP - CANCEL
jQuery( "#listSnip" ).on( "click", "a.ie-rename-snip-cancel", function (e) {
   e.preventDefault();
   var snipName = jQuery(this).data("name");
   var snipID = jQuery(this).data("id");
   var snipRenameDiv = "#ie-manage-snip-name-" + snipID;
   var snipActionsDiv = "#ie-manage-snip-actions-" + snipID;

   //jQuery(varRenameDiv).html("<div id='ie-manage-var-name-" + varID + "' class='col ie-name-var'>" + varName + "</div>");
   //jQuery(varActionsDiv).html("<a href='#' class='ie-delete-var' data-name='" + varName + "' data-id='" + varID + "'>delete</a> | <a href='#' class='ie-rename-var' data-name='" + varName + "' data-id='" + varID + "'>rename</a>");
   jQuery(snipRenameDiv).html(snipName);
   jQuery(snipActionsDiv).html("<a href='#' class='ie-delete-snip' data-name='" + snipName + "' data-id='" + snipID + "'>delete</a> | <a href='#' class='ie-rename-snip' data-name='" + snipName + "' data-id='" + snipID + "'>rename</a>");

   jQuery(".ie-manage-snip-feedback").slideUp(200);
})







// DELETE SNIP
jQuery( "#listSnip" ).on( "click", "a.ie-delete-snip", function (e) {
   e.preventDefault();

   var snipName = jQuery(this).data("name");
   var snipID = jQuery(this).data("id");

   console.log('snipName: ' + snipName);
   //console.log(snipID);
   console.log('snip used: ' +  Blockly.Snippets.allUsedSnippets(workspace).includes(snipName) );

   if ( Blockly.Snippets.allUsedSnippets(workspace).includes(snipName) ) {

      var arrUses = workspace.getSnippetUses(snipName);
      var intNumUses = arrUses.length;

      console.log('snip used num: ' +  intNumUses );

      var displayDiv = "#modalManageSnip #ie-manage-snip-feedback-" + snipID;

      if (intNumUses > 0) {
         snipDisplayMessage ( displayDiv, "This snippet is currently being used in your program <strong>" + intNumUses + "</strong> times. Are you sure you want to delete it? <span data-name='" + snipName + "' class='ie-delete-snip-confirm'>Yes</span> | <span class='ie-delete-snip-cancel'>No</span>", "alert-warning", "show");
      } else {
         snipDisplayMessage ( displayDiv, "This snippet is currently being used in your program. Are you sure you want to delete it? <span data-name='" + snipName + "' class='ie-delete-snip-confirm'>Yes</span> | <span class='ie-delete-snip-cancel'>No</span>", "alert-warning", "show");
      }

   } else {

      workspace.deleteSnippet(snipName);
      workspace.toolbox_.refreshSelection();
      jQuery(this).closest(".ie-list-item").slideUp(200);
      jQuery(".ie-manage-snip-feedback").slideUp(200);

   }

});


// DELETE SNIP - CONFIRM
jQuery( "#listSnip" ).on( "click", "span.ie-delete-snip-confirm", function (e) {
   e.preventDefault();
   var snipName = jQuery(this).data("name");
   workspace.deleteSnippet(snipName);
   workspace.toolbox_.refreshSelection();
   jQuery(this).closest(".ie-list-item").slideUp(200);
   jQuery(".ie-manage-snip-feedback").slideUp(200);
});


// DELETE SNIP - CANCEL
jQuery( "#listSnip" ).on( "click", "span.ie-delete-snip-cancel", function (e) {
   e.preventDefault();
   jQuery(this).closest(".ie-manage-snip-feedback").slideUp(200);
});






function snipIsExist (strSnip) {
   var strReturn = false;
   var currSnips = workspace.snippetsList;
   if ( currSnips.includes(strSnip) ) {
      strReturn = true;
   }
   return strReturn;
}

// POP CREATE SNIP - DONE
$("#modalCreateSnip #btnCreateSnipDone").on("click", function(e) {
   e.preventDefault();
   $('#modalCreateSnip').modal('hide');
});


















// POP CREATE VAR
function variableCreateMenu(currentWorkspace) {
   jQuery(".modal").modal("hide");
   jQuery("#divCreateVarsMessage").hide();
   //Blockly.loadDOMhold="";
   jQuery("#modalCreateVars").modal();
   jQuery("#modalCreateVars").on("shown.bs.modal", function () {
      jQuery("#txtCreateVarsName").focus();
   });
}


// HANDLER RETURN
jQuery(document).on("keypress",function(e) {

   if (e.which == 13) {

      event.preventDefault();
      var elemFocus = document.activeElement.id;

      if (elemFocus==="txtCreateVarsName") {
         jQuery( "#btnCreateVar" ).trigger( "click" );
      }

      if (elemFocus==="txtProgramName") {
         jQuery( "#btnSaveLocal" ).trigger( "click" );
      }

   }

});





// POP MANAGE VAR
function variableChangeMenu(currentVariables) {
   jQuery(".modal").modal("hide");
   jQuery( "#listVars" ).html("");
   var htmlVarsList = "";

   if (currentVariables) {

      if (currentVariables.length == 0) {

         htmlVarsList = htmlVarsList + '<div class="row ie-list-item">';
            htmlVarsList = htmlVarsList + '<div class="col ie-name-var">na</div>';
         htmlVarsList = htmlVarsList + '</div>';

      } else {

         for ( var i=0; i<currentVariables.length; i++ ) {
            htmlVarsList = htmlVarsList + '<div class="row ie-list-item">';
               htmlVarsList = htmlVarsList + '<div id="ie-manage-var-name-' + i + '" class="col ie-name-var">';
               htmlVarsList = htmlVarsList + currentVariables[i];
               htmlVarsList = htmlVarsList + '</div>';
               htmlVarsList = htmlVarsList + '<div id="ie-manage-var-actions-' + i + '" class="col ie-actions-var">';
               htmlVarsList = htmlVarsList + '<a href="#" class="ie-delete-var" data-name="' + currentVariables[i] + '" data-id="' + i + '" >delete</a> | ';
               htmlVarsList = htmlVarsList + '<a href="#" class="ie-rename-var" data-name="' + currentVariables[i] + '" data-id="' + i + '" >rename</a>';
               htmlVarsList = htmlVarsList + '</div>';
               htmlVarsList = htmlVarsList + '<div id="ie-manage-var-feedback-' + i + '" class="alert ie-manage-var-feedback" role="alert" style="display: none;"></div>';
            htmlVarsList = htmlVarsList + '</div>';
         }

      }

      jQuery('#listVars').html(htmlVarsList);
      jQuery("#modalManageVars").modal();

   }
}



// POP CREATE VAR - CREATE
jQuery("#modalCreateVars #btnCreateVar").on("click", function(e) {
   e.preventDefault();
   var strVarName = varCleanName( jQuery("#modalCreateVars #txtCreateVarsName").val() );
   var displayDiv = "#modalCreateVars #divCreateVarsMessage";
   var isValidResult = varIsValid(strVarName);
   console.log("Create Var - Create - " + strVarName + " - " + isValidResult);
   if ( isValidResult ) {
      varDisplayMessage (displayDiv, isValidResult, "alert-warning", "show");
   } else {
      workspace.createVariable( strVarName );
      varDisplayMessage (displayDiv, "New variable created successfully.", "alert-success", "hide");
      jQuery("#modalCreateVars #txtCreateVarsName").val("");
   }
})




// RENAME VAR
jQuery( "#listVars" ).on( "click", "a.ie-rename-var", function (e) {

   //jQuery(".ie-manage-var-feedback").fadeOut(200);

   e.preventDefault();

   var varName = jQuery(this).data("name");
   var varID = jQuery(this).data("id");

   console.log(varName);
   console.log(varID);

   var varRenameDiv = "#ie-manage-var-name-" + varID;
   var varActionsDiv = "#ie-manage-var-actions-" + varID;
   var varTxtInputID = "txtRenameVarsName-" + varID;

   jQuery(varRenameDiv).html("<input class='form-control txtRenameVarsInput' id='" + varTxtInputID + "' autocomplete='off' maxlength='25' type='text' value='" + varName +"'>");
   jQuery(varActionsDiv).html("<a href='#' class='ie-rename-var-confirm' data-name='" + varName+  "' data-id='" + varID + "'>confirm</a> | <a href='#' class='ie-rename-var-cancel' data-name='" + varName+  "' data-id='" + varID + "'>cancel</a>");
   //jQuery(varTxtInputID).focus();

})


// RENAME VAR - CONFIRM
jQuery( "#listVars" ).on( "click", "a.ie-rename-var-confirm", function (e) {

   e.preventDefault();
   var varName = jQuery(this).data("name");
   var varID = jQuery(this).data("id");
   var displayDiv = "#modalManageVars #ie-manage-var-feedback-" + varID;
   var txtVarNewName = "#modalManageVars #txtRenameVarsName-" + varID;

   //var strVarNewName = varCleanName( jQuery(txtVarNewName).val() );
   var strVarNewName =  jQuery(txtVarNewName).val();

   if (varName == strVarNewName) {
      varDisplayMessage (displayDiv, "You did not change the variable name. Please try again.", "alert-warning", "show");
      return false;
   }

   var isValidResult = varIsValid(strVarNewName);

   if ( isValidResult ) {
      varDisplayMessage (displayDiv, isValidResult, "alert-warning", "show");
   } else {
      for (var i=0;i<workspace.variableList.length;i++) {
         if (workspace.variableList[i]==varName){
            workspace.renameVariable(varName,strVarNewName);
            workspace.toolbox_.refreshSelection();
         }
      }

      varDisplayMessage (displayDiv, "Variable renamed successfully!", "alert-success", "hide");

      var varRenameDiv = "#ie-manage-var-name-" + varID;
      var varActionsDiv = "#ie-manage-var-actions-" + varID;

      jQuery(varRenameDiv).html("<div id='ie-manage-var-name-" + varID + "' class='col-xs-9 ie-name-var'>" + strVarNewName + "</div>");
      jQuery(varActionsDiv).html("<a href='#' class='ie-delete-var' data-name='" + strVarNewName + "' data-id='" + varID + "'>delete</a> | <a href='#' class='ie-rename-var' data-name='" + strVarNewName + "' data-id='" + varID + "'>rename</a>");

   }

})


// RENAME VAR - CANCEL
jQuery( "#listVars" ).on( "click", "a.ie-rename-var-cancel", function (e) {
   e.preventDefault();
   var varName = jQuery(this).data("name");
   var varID = jQuery(this).data("id");
   var varRenameDiv = "#ie-manage-var-name-" + varID;
   var varActionsDiv = "#ie-manage-var-actions-" + varID;

   //jQuery(varRenameDiv).html("<div id='ie-manage-var-name-" + varID + "' class='col ie-name-var'>" + varName + "</div>");
   //jQuery(varActionsDiv).html("<a href='#' class='ie-delete-var' data-name='" + varName + "' data-id='" + varID + "'>delete</a> | <a href='#' class='ie-rename-var' data-name='" + varName + "' data-id='" + varID + "'>rename</a>");
   jQuery(varRenameDiv).html(varName);
   jQuery(varActionsDiv).html("<a href='#' class='ie-delete-var' data-name='" + varName + "' data-id='" + varID + "'>delete</a> | <a href='#' class='ie-rename-var' data-name='" + varName + "' data-id='" + varID + "'>rename</a>");

   jQuery(".ie-manage-var-feedback").slideUp(200);
})


// DELETE VAR
jQuery( "#listVars" ).on( "click", "a.ie-delete-var", function (e) {
   e.preventDefault();
   var varName = jQuery(this).data("name");
   var varID = jQuery(this).data("id");
   if ( Blockly.Variables.allUsedVariables(workspace).includes(varName) ) {

      var arrUses = workspace.getVariableUses(varName);
      var intNumUses = arrUses.length;

      var displayDiv = "#modalManageVars #ie-manage-var-feedback-" + varID;

      if (intNumUses > 1) {
         varDisplayMessage ( displayDiv, "This variable is currently being used in your program <strong>" + intNumUses + "</strong> times. Are you sure you want to delete it? <span data-name='" + varName + "' class='ie-delete-var-confirm'>Yes</span> | <span class='ie-delete-var-cancel'>No</span>", "alert-warning", "show");
      } else {
         varDisplayMessage ( displayDiv, "This variable is currently being used in your program. Are you sure you want to delete it? <span data-name='" + varName + "' class='ie-delete-var-confirm'>Yes</span> | <span class='ie-delete-var-cancel'>No</span>", "alert-warning", "show");
      }

   } else {
      workspace.deleteVariable(varName);
      workspace.toolbox_.refreshSelection();
      jQuery(this).closest(".ie-list-item").slideUp(200);
      jQuery(".ie-manage-var-feedback").slideUp(200);
   }
});


// DELETE VAR - CONFIRM
jQuery( "#listVars" ).on( "click", "span.ie-delete-var-confirm", function (e) {
   e.preventDefault();
   var varName = jQuery(this).data("name");
   workspace.deleteVariable(varName);
   workspace.toolbox_.refreshSelection();
   jQuery(this).closest(".ie-list-item").slideUp(200);
   jQuery(".ie-manage-var-feedback").slideUp(200);
});


// DELETE VAR - CANCEL
jQuery( "#listVars" ).on( "click", "span.ie-delete-var-cancel", function (e) {
   e.preventDefault();
   jQuery(this).closest(".ie-manage-var-feedback").slideUp(200);
});









function varDisplayMessage (displayDiv, displayMessage, displayType, displayBehaviour) {
   jQuery(displayDiv).hide();
   jQuery(displayDiv).html(displayMessage);
   jQuery(displayDiv).removeClass( "alert-warning alert-success" ).addClass( displayType );
   jQuery(displayDiv).slideDown(200);
      if (displayBehaviour == 'hide') {
      setTimeout(function() {
         jQuery(displayDiv).slideUp(200)
      }, 3000);
   }
}


function varCleanName (strVar) {
   strVar = $.trim(strVar);
   strVar =  strVar.substring(0, 24);
   return strVar;
}


function varIsValid (strVar) {
   //console.log( "varIsValid: " + strVar );
   var strReturn = null;
   if (varIsExist(strVar)) {
      strReturn = "You already have a variable with that name.";
   }
   if ( !(strVar.match(/^([A-z0123456789_])+$/) ) ) {
      //console.log ( "error: " + strVar.match(/^([A-z0123456789_])+$/) );
      strReturn = "Variable name contains an unsupported character. Variable names can only contain lowercase English letters, uppercase English letters, numbers, and underscores ( _ ).";
   }
   if (strVar.match(/^\d/)) {
        strReturn = "Variable names cannot start with a number.";
   }
   if (strVar == "" ) {
        strReturn = "Please enter a variable name.";
   }
   return strReturn;
}


function varIsExist (strVar) {
   //console.log( "varIsExist: " + strVar );
   var strReturn = false;
   var currVars = workspace.variableList;
   if ( currVars.includes(strVar) ) {
      strReturn = true;
   }
   //console.log(currVars);
   return strReturn;
}


// POP CREATE VAR - DONE
$("#modalCreateVars #btnCreateVarDone").on("click", function(e) {
   e.preventDefault();
   $('#modalCreateVars').modal('hide');
});






// POP LOAD LOCAL
jQuery('#navPopLoadLocal').click(function() {
   jQuery('.modal').modal('hide');
   jQuery("#modalLoadLocalFiles").val('');
   Blockly.loadDOMhold="";
   jQuery("#modalLoadLocalWarning").html("");
   jQuery("#modalLoadLocal").modal();
});


// LOAD LOCAL UPLOAD
jQuery( "#btnLoadLocal" ).on( "click", function (e) {

   //e.preventDefault();

   console.log ('#btnLoadLocal...');

   var txtFile =  modalLoadLocalBtnPress();
   console.log ('txtFile:' + txtFile);

   if ( txtFile ) {

      txtFile = txtFile.replace(/^.*[\\\/]/, "");
      txtFile = txtFile.replace(".ieb", "");

      jQuery(".ie-program-title").html(txtFile);
      localStorage.setItem("iePS", "");
      localStorage.setItem("iePN", txtFile);

      jQuery("#modalLoadLocal").modal('hide');

      window.dataLayer.push({
         'event': 'analyticsEvent',
         'analyticsCategory': 'Program',
         'analyticsAction': 'Click',
         'analyticsLabel': 'Load Saved - Local',
         'analyticsValue': 1
      });


   }

});



// POP SAVE
jQuery('#navPopLoadSave, #navPopLoadSaveAlt').click(function() {
   jQuery('.modal').modal('hide');
   jQuery("#modalSaveLocal #txtProgramName").val(jQuery(".ie-program-title").text());
   jQuery('#modalSaveLocal').modal();
   jQuery('#modalSaveLocal').on('shown.bs.modal', function () {
      jQuery('#txtProgramName').focus();
   });
});



jQuery('#navNew').click(function() {
   clearBlocks();
   jQuery(".ie-program-title").html('Untitled Program');
   localStorage.setItem("iePN", 'Untitled Program');
   localStorage.setItem("iePS", '');
});



// POP HOW TO PROGRAM MODAL AND LIST
jQuery('#navPopLoadHowTo').click(function() {
   jQuery('.modal').modal('hide');
   var htmlList = 'na';
   //console.log(Blockly.demoProgramsArray);
   //jQuery.each( Blockly.demoProgramsArray, function( key, value ) {
      //console.log('key:' . key );
      //console.log('value:' . value );
      //htmlList = htmlList + '<div class="divDemoProgram" data-id="' + key + '"><span class="spanDemoProgramName">' + get_program_title (value) + '</span></div>';
   //});
   jQuery('#how-to-program-list').html(htmlList);
   jQuery('#modalLoadHowTo').modal();
});




// POP DEMO PROGRAM MODAL AND LIST
jQuery('#navPopLoadDemo').click(function() {
   jQuery('.modal').modal('hide');
   var htmlList = '<div class="container h-100">';
   jQuery.each( Blockly.demoProgramsArray, function( key, value ) {

      //console.log(key);
      //console.log(value);
      //console.log(value[0]);
      //console.log(value[1]);
      //console.log(value[2]);

      htmlList = htmlList + '<div class="row align-items-center h-100 divDemoProgramHolder"  data-id="' + key + '" data-name="' + get_program_title (value[0]) + '" >';

      htmlList = htmlList + '<div class="col-9">';
      htmlList = htmlList + '<div class="divDemoProgram"><span class="spanDemoProgramName">' + get_program_title (value[0]) + '</span><span class="spanDemoProgramDesc">' + get_program_description(value[2]) + '</span></div>';
      htmlList = htmlList + '</div>';

      htmlList = htmlList + '<div class="col-3">';
      //htmlList = htmlList + '<span class="spanDemoProgramLoad">load program</span>';
      htmlList = htmlList + '<button type="button" class="btn btn-primary btn-sm btnDemoProgramLoad" >Load program</button>';

      htmlList = htmlList + '</div>';

      htmlList = htmlList + '</div>';


   });

   htmlList = htmlList + '</div>';
   jQuery('#demo-program-list').html(htmlList);
   jQuery('#modalLoadDemo').modal();
});

// GET PROGRAM TITLE FROM ARRAY
function get_program_title (str) {
   if (str === undefined) {
      str = 'Undefined';
   }
   return str;
}

// GET PROGRAM DESCRIPTION FROM ARRAY
function get_program_description (str) {

   //var str = str + '';
   //var res = str.split(',');
   //var res = res[2];

   return str;

}


// LOAD DEMO PROGRAM BY INDEX
jQuery( '#demo-program-list' ).on( 'click', '.spanDemoProgramName, .spanDemoProgramLoad, .btnDemoProgramLoad', function () {
   var demoIndex = jQuery(this).closest('.divDemoProgramHolder').data('id');
   var demoTitle = jQuery(this).closest('.divDemoProgramHolder').data('name');
   //var demoTitle = jQuery(this);
   loadDemo(demoIndex);
   jQuery(".ie-program-title").html(demoTitle);
   jQuery('.modal').modal('hide');
});


// USB CONTROLS
jQuery("#navPopUSB").on("click", function(e) {
   jQuery('.modal').modal('hide');
   jQuery('#modalUSB').modal();

   console.log ('readUsbLoop:' + readUsbLoop);


});



// USB CONTROLS - Run
jQuery('#usbRun').on('click', function(e) {
   e.preventDefault();
   connectHubAndReadOnLoop();
   usbUpdateStatus();
});


// USB CONTROLS - Clear
jQuery('#usbClear').on('click', function(e) {
   e.preventDefault();
   jQuery('#fromUSBdata').val('');
});


function usbUpdateStatus() {

   console.log('usbUpdateStatus:' + readUsbLoop);

   switch(readUsbLoop) {

      case 0:
         //jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>PENDING</span>');
         jQuery("#usbStatus").html('<span>PENDING</span>');

         break;
      case 1:
         //jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="green" /></svg><span>RUNNING</span>');
         jQuery("#usbStatus").html('<span>RUNNING</span>');

         break;
      default:
         //jQuery("#usbStatus").html('<svg height="10" width="10" class="blinking"><circle cx="5" cy="5" r="5" fill="yellow" /></svg><span>WAITING</span>');
         jQuery("#usbStatus").html('...');
   }


}




var clipboard = new ClipboardJS('#usbExport');

clipboard.on('success', function(e) {

   jQuery('#usbExport').prop('value', 'Copied!');

   setTimeout( function() {
      jQuery('#usbExport').prop('value', 'Copy to clipboard');
   }, 1000);

    //console.info('Text:', e.text);

    e.clearSelection();

});






jQuery('#navLoadLocal').click(function() {
   //clearBlocks();
});







jQuery('#navPopAbout').click(function() {
   jQuery('#modalAbout').modal();
});


// HELP
jQuery('#navPopHelp, #lnkPopHelp').click(function() {
   jQuery('.modal').modal('hide');
   jQuery('#modalHelp').modal();
});


// CONNECTION
jQuery('#navPopHelpConnection').click(function() {
   jQuery('.modal').modal('hide');
   jQuery('#modalConnection').modal();
   findAPI();
});


// HUB STATUS
jQuery('#navPopHelpGetStatus').click(function() {
   jQuery('.modal').modal('hide');
   jQuery('#modalStatus').modal();
   jQuery("#hubStatusConnectionStatus").html("not connected");
   jQuery("#hubStatusFirmwareVersion").html("");
   jQuery("#hubStatusFirmwareVersionHolder").hide();
   jQuery("#hubStatusUniqueID").html("");
   jQuery("#hubStatusUniqueIDHolder").hide();

   if (inventionEngineConnected()) {
      alert('alreday connected...');
   }

});

// HUB STATUS - CLOSE
jQuery('#modalStatus').on('hidden.bs.modal', function (e) {
   jQuery('#hubStatusConnectionStatus').html('not connected');
   jQuery('#hubStatusConnectionStatus').removeClass('isConnected');
   jQuery('#hubStatusConnectionStatus').addClass('notConnected');
   jQuery('#hubStatusFirmwareVersion').html('');
   jQuery('#hubStatusFirmwareVersionHolder').hide();
   jQuery('#hubStatusUniqueID').html('');
   jQuery('#hubStatusUniqueIDHolder').hide();
})

// HUB STATUS - CONNECTION
jQuery("#btnStatusHubConnect").on("click", async function(e) {
   await connectHub();
   var strFirmwareVersion;
   var strUniqueID;
   if (inventionEngineConnected()) {
      jQuery("#hubStatusConnectionStatus").html("Connected");
      jQuery("#hubStatusConnectionStatus").addClass( "isConnected" );
      jQuery("#hubStatusConnectionStatus").removeClass( "notConnected" );

      //strFirmwareVersion = await getInventionEngineUserFirmwareVersion();
      strFirmwareVersion = await getInventionEngineUserFirmwareVersion();
      //strFirmwareVersion = strFirmwareVersion * 10;
      jQuery("#hubStatusFirmwareVersion").html(strFirmwareVersion);
      jQuery("#hubStatusFirmwareVersionHolder").fadeIn(500);

      strUniqueID = await getInventionEngineUID();
      jQuery("#hubStatusUniqueID").html(strUniqueID);
      jQuery("#hubStatusUniqueIDHolder").fadeIn(500);

   }
});








// CONNECTION - REFRESH
jQuery("#apiStatusRefresh").on("click", function(e) {
   findAPI();
});







// FIRMWARE
// ----------------------------------------------------------

// POP FIRMWARE UPDATE MODAL
jQuery("#navPopFirmwareUpdate").on("click", function(e) {
   jQuery(".modal").modal("hide");
   jQuery("#modalFirmwareUpdate").data("bs.modal",null);
   jQuery("#modalFirmwareUpdate").modal({backdrop:"static", keyboard:false});
   fuButtonStatus("start");
});

// CLOSE FIRMWARE UPDATE MODAL
jQuery("#modalFirmwareUpdate").on("hidden.bs.modal", function (e) {
   fuButtonStatus("start");
   fuFeebackCardClear();
})

// RUN FIRMWARE UPDATE
jQuery('#btnFUHubConnect').click(function() {
   //fuFeebackCardPrepend('Starting firmware update', 'info');
   updateInventionEngine();
});


// RUN FIRMWARE UPDATE
jQuery('#btnFUHubReconnect').click(function() {
   firmwareUpdateReconnectInventionEngine();
});









function findAPI() {

   var testURL = "https://api.edisonrobotics.net/";
   var strServerLocation = "https://api.edisonrobotics.net/";

   jQuery("#apiStatusOutput").html( "" );
   jQuery("<div id='divServerResult'></span>Server: <span id='spanServerResultLocation'></span></div>").hide().appendTo("#apiStatusOutput").fadeIn(500);
   jQuery("#spanServerResultLocation").Loadingdotdotdot({
      "speed": 150,
      "maxDots": 3,
      "word": "searching"
   });

   jQuery.ajax({
      url: testURL,
      type: "post",
      dataType: "html",
      success: function (data) {
         setTimeout(
            function() {
               jQuery("#spanServerResultLocation").Loadingdotdotdot("Stop");
               jQuery( "#spanServerResultLocation" ).addClass("spanServerResultLocationSuccess");
               jQuery("#spanServerResultLocation").html(data);
               setTimeout(
                  function() {
                     testAPI();
                  }, 1000);
               }, 1000);
      },
      error: function (data) {
         jQuery("#spanServerResultLocation").Loadingdotdotdot("Stop");
         jQuery( "#spanServerResultLocation" ).addClass("spanServerResultLocationError");
         jQuery("#spanServerResultLocation").html("NO SERVER FOUND");
      }
   });
}


function testAPI() {

   var testURL = "https://api.edisonrobotics.net/";

   var mbc = [

      '//Do not edit, created automatically by Invention Engine',
      '//Compiled for version: 10',
      '//Functions to be put into flash',
      '#include "ch547.h"',
      '#include "debug.h"',
      '#include "InternalFunctions.h"',

      'void begin_absolute_code(void) __naked{',
      '    __asm',
      '          .area ABSCODE (ABS,CODE)',
      '          .org 0xF000',
      '    __endasm;',
      '}',
      'void userProg(){',

      '//User variables',

      '//setup blocks',

      '//start blocks',
      '//loop forever',
      'while (1) {',
      '}',
      '}',

      'void end_absolute_code(void) __naked{',
      '    __asm',
      '        .area CSEG (REL,CODE)',
      '    __endasm;',
      '}',
      ''

   ].join('\n');

   jQuery("<div id='divCompileResult'></span>Compile Test: <span id='spanCompileResultDetails'></span></div>").hide().appendTo("#apiStatusOutput").fadeIn(500);

   jQuery("#spanCompileResultDetails").Loadingdotdotdot({
      "speed": 150,
      "maxDots": 3,
      "word": "working"
   });

   var timeStart = new Date().getTime();
   var timeEnd = 0;
   var timeTotal =  0;

   var request = new XMLHttpRequest();

   request.onload = function(e) {

      try {

         var response = JSON.parse(this.responseText);

         console.log (response);

         if (response.error) {

            jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
            jQuery( "#spanCompileResultDetails" ).addClass("spanServerResultLocationError");
            jQuery("#spanCompileResultDetails").html("compile error<br>");
            jQuery("#spanCompileResultDetails").append(this.responseText);


         } else {

            timeEnd = new Date().getTime();
            timeTotal = timeEnd - timeStart;
            jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
            jQuery( "#spanCompileResultDetails" ).addClass("spanServerResultLocationSuccess");
            jQuery("#spanCompileResultDetails").html("compile complete in " + timeTotal + "ms");

         }

      } catch(e) {


         console.log ('in ctach...');
         console.log (e);

         jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
         jQuery( "#spanCompileResultDetails" ).addClass("spanServerResultLocationError");
         jQuery("#spanCompileResultDetails").html("compile error<br>");
         jQuery("#spanCompileResultDetails").append(this.responseText);

      }
   };

   request.onerror = function() {

      jQuery("#spanCompileResultDetails").Loadingdotdotdot("Stop");
      jQuery( "#spanCompileResultDetails" ).addClass("spanServerResultLocationError");
      jQuery("#spanCompileResultDetails").html("compile error<br>");
      jQuery("#spanCompileResultDetails").append(this.responseText);

   };

   var gaClientId = '';
   //var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
   //if (ga) {
   //   ga(function() {
   //      gaClientId = ga.getAll()[0].get('clientId');
   //      console.log (gaClientId);
   //   });
   //}

   //request.open("POST", testURL + "ie/compile?v=1&mcid=" + gaClientId, true);
   //request.open("POST", testURL + "ie/compile?v=6", true);

   request.open("POST", testURL + "ie/compile", true);

   request.send(mbc);

}





function fileNameClean(strInFileName) {
   var strProgramName = strInFileName.replace(/(<([^>]+)>)/ig,"");
   strProgramName = strProgramName.trim();
   strProgramName = strProgramName.replace(/^\.+/g, '');
   return strProgramName;
}


function fileNameIsValid (strFN) {
   var strReturn = null;
    strFN = strFN.trim();
   if (strFN == "" ) {
        strReturn = "Please enter a name for your program. You need to name the program in order to save it.";
   } else if (strFN.length > 254) {
      strReturn = "Whoops. There's a problem with that program name. Program names can be a maximum of 255 characters long.";
   }
   return strReturn;
}



function nameDisplayMessage (displayDiv, displayMessage, displayType, displayBehaviour) {

   jQuery(displayDiv).hide();
   jQuery(displayDiv).html(displayMessage);
   jQuery(displayDiv).removeClass( "alert-warning alert-success" ).addClass( displayType );
    jQuery(displayDiv).slideDown(200);
   if (displayBehaviour == 'hide') {
      setTimeout(function() {
         jQuery(displayDiv).slideUp(200)
      }, 3000);
   }
}


function fuFeebackCardPrepend(strLineEntry, strType) {

   //switch(strType) {
   //   case 'error':
   //   break;
   //case 'info':
      // code block
   //   break;

   //case 'prompt':
      // code block
//      break;

   //default:
      // code block
//   }

   jQuery('#fuStatusHolder div.card-body').prepend( '<div class="card-body-line card-body-line-' + strType + '">' + strLineEntry + '</div>' );

   jQuery('#fuStatusHolder div.card-body div.card-body-line').css('opacity', '0.6');

   jQuery('div.card-body div.card-body-line:first-of-type').css('opacity', '1');

}

function fuFeebackCardClear(strLineEntry) {
   jQuery( "#fuStatusHolder div.card-body" ).html("");
}

function fuButtonStatus(strStatus) {

   console.log('fuButtonStatus:' + strStatus);

   var arrIconClasses = [ 'rotate', 'oi-chevron-right', 'oi-cog', 'oi-check' ];

   switch(strStatus) {

      case "start":

         fuFeebackCardClear();
         fuFeebackCardPrepend('Please connect your hub...', 'prompt');

         jQuery("#btnFUHubConnect").prop("disabled", false);
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");

         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUDownload span.oi").removeClass(arrIconClasses);

         jQuery("#btnFUHubReconnect").prop("disabled", true);
         jQuery("#btnFUHubReconnect span.oi").removeClass(arrIconClasses).addClass("oi-chevron-right");

         break;

      case "connecting":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-cog").addClass("rotate");
         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUHubReconnect").prop("disabled", true);
         break;


      case "connecting-done":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect").addClass("btn-success");
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUDownload").prop("disabled", false);
         jQuery("#btnFUHubReconnect").prop("disabled", true);
         break;


      case "downloading":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUHubConnect").addClass("btn-success");
         jQuery("#btnFUDownload span.oi").removeClass(arrIconClasses).addClass("oi-cog").addClass("rotate");
         jQuery("#btnFUDownload span.downloadStatus").html("Downloading...");
         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUHubReconnect").prop("disabled", true);
         break;


      case "downloading-done":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUHubConnect").addClass("btn-success");
         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUDownload span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUDownload span.downloadStatus").html("Downloaded");
         jQuery("#btnFUDownload").addClass("btn-success");
         jQuery("#btnFUHubReconnect").prop("disabled", false);
         break;


      case "reconnecting":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUHubConnect").addClass("btn-success");
         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUDownload span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUDownload").addClass("btn-success");
         jQuery("#btnFUHubReconnect span.oi").removeClass(arrIconClasses).addClass("oi-cog").addClass("rotate");
         jQuery("#btnFUHubReconnect").prop("disabled", false);
         break;

      case "reconnecting-done":
         jQuery("#btnFUHubConnect").prop("disabled", true);
         jQuery("#btnFUHubConnect span.oi").removeClass("rotate").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUHubConnect").addClass("btn-success");
         jQuery("#btnFUDownload").prop("disabled", true);
         jQuery("#btnFUDownload span.oi").removeClass("rotate").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUDownload").addClass("btn-success");
         jQuery("#btnFUHubReconnect span.oi").removeClass(arrIconClasses).addClass("oi-check");
         jQuery("#btnFUHubReconnect").prop("disabled", true);
         jQuery("#btnFUHubReconnect").addClass("btn-success");
         break;



      default:
         // code block

   }

}








jQuery('#modalSaveLocal').on('hidden.bs.modal', function (e) {

   jQuery('#modalSaveLocal #divProgramNameMessageLocal').hide();
   saveToStorage();

})





function toggleDropdown (e) {
   const _d = jQuery(e.target).closest('.dropdown'),
   _m = jQuery('.dropdown-menu', _d);
   setTimeout(function() {
      const shouldOpen = e.type !== 'click' && _d.is(':hover');
      _m.toggleClass('show', shouldOpen);
      _d.toggleClass('show', shouldOpen);
      jQuery('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
   }, e.type === 'mouseleave' ? 300 : 0);
}
jQuery('body').on('mouseenter mouseleave','.dropdown',toggleDropdown).on('click', '.dropdown-menu a', toggleDropdown);


jQuery('.modal.draggable>.modal-dialog').draggable({
    cursor: 'move',
    handle: '.modal-header'
});
jQuery('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css('cursor', 'move');




function programOutput (strIn, strMode, strType) {

   if (strMode == 'clear') {
      jQuery('#divProgrammingMessage').html('');
   }

   var strOut = '<div class="' + strType + '">' + strIn + '</div>';

   jQuery(strOut).hide().appendTo("#divProgrammingMessage").fadeIn(1000);

   jQuery(strOut).Loadingdotdotdot({
      'speed': 150,
      'maxDots': 3,
      'word': strOut
   });

   setTimeout(function () {

      jQuery(strOut).Loadingdotdotdot("Stop");

   }, 5000);

   //console.log( strOut );
   //jQuery("<div id='divServerResult'></span>Server: <span id='spanServerResultLocation'></span></div>").hide().appendTo("#apiStatusOutput").fadeIn(500);
   //.appendTo("#apiStatusOutput").fadeIn(500)

}


// CLOSE PROGRAM MODAL
jQuery("#modalProgramming").on("hidden.bs.modal", function (e) {
   programOutput('','clear','');
})








// CHECK UID TEST
jQuery('span.ie-program-title').click(function() {

   //checkUID( '000040b05566-AAA' );

   //window.dataLayer.push({
   //   'event': 'analyticsEvent',
   //   'analyticsCategory': 'Testing',
   //   'analyticsAction': 'Click',
   //   'analyticsLabel': 'Zebra',
   //   'analyticsValue': 1
   //});

});

// CHECK UID

function checkUID( uid ) {

   console.log('checkUID: ' + uid);

   const data = {
      act: 'check',
      uid: uid,
      nce: 'KGUs^986itugk)'
   }

   jQuery.ajax({
      url: "_ute.php",
      type: "post",
      data: data,
      success: function (response) {
         console.log (response);
      },
      error: function (response) {
         console.log (response);
      }
   });

}


// LOG COMPILE

function logCompile( uid ) {

   console.log('logCompile: ' + uid);

   const data = {
      act: 'log',
      uid: uid,
      note: '',
      nce: 'KGUIFToilygkui8(*^986itugk)'
   }

   jQuery.ajax({
      url: "_ute.php",
      type: "post",
      //dataType: "json",
      data: data,
      success: function (response) {
         console.log (response);
      },
      error: function (response) {
         console.log (response);
      }
   });


   logCode( uid );

}


// LOG CODE

function logCode( uid ) {

   console.log('logCode: ' + uid);

   let code = getBlocksForDownload();

   const data = {
      act: 'log_compile',
      uid: uid,
      note: '',
      code: code,
      nce: 'sfdKGUIFTo(*^986itu'
   }

   jQuery.ajax({
      url: "_ute.php",
      type: "post",
      //dataType: "json",
      data: data,
      success: function (response) {
         console.log (response);
      },
      error: function (response) {
         console.log (response);
      }
   });

}


console.log ('john goodman');
