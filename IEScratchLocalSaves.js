function getBlocksForDownload() {
	//var output = document.getElementById('importExport');
	var xml = Blockly.Xml.workspaceToDom(workspace);
	return b64EncodeUnicode(Blockly.Xml.domToPrettyText(xml));
}

function b64EncodeUnicode(str) {
	// first we use encodeURIComponent to get percent-encoded UTF-8,
	// then we convert the percent encodings into raw bytes which
	// can be fed into btoa.
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode('0x' + p1);
	}));
}

function b64DecodeUnicode(str) {
	// Going backwards: from bytestream, to percent-encoding, to original string.
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}


function handleFileSelect(evt) {

	var files = evt.target.files; // FileList object
	console.log(files);

	var Modalerror = document.getElementById("modalLoadLocalWarning");
	var ButtonUpload = document.getElementById("btnLoadLocal");

	// Loop through the FileList and render image files as thumbnails.
	var xmlHold = Blockly.Xml.workspaceToDom(workspace);

	for (var i = 0, f; f = files[i]; i++) {

		// Only process image files.
		//if (!f.type.match('image.*')) {
		//	continue;
		//}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {

			return function(e) {

				var title = theFile.name;
				title = title.split(".");
				//alert(title[1]);

				if (title[title.length-1]=="txt"||title[title.length-1]=="ieb") {

					var noError = true;

					try {

						var xml2 = Blockly.Xml.textToDom(b64DecodeUnicode(e.target.result));

					} catch {

						alert("Incorrect file data, please upload an Invention Engine blocks save file (.ieb)");
						noError = false;
						/*var xml_text='<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="event_Start" id="}A_v`14$6amsK;Jm!`00" x="336" y="108" deletable="false" movable="false"></block></xml>'
						var xml = Blockly.Xml.textToDom(xml_text);
						Blockly.Xml.domToWorkspace(xml, workspace);
						workspace.clearUndo();*/

					} finally {

						if (noError) {

							console.log('no error - ready to load');
							ButtonUpload.disabled = false;
							Modalerror.innerHTML = "<mark class='alert alert-success'><strong>Ready to load program:</strong> " + title[0] + "</mark>";
							Blockly.loadDOMhold=xml2;
							//Blockly.FileReady=true;
						}

					}

				} else {
					alert("Incorrect File type, please upload an Invention Engine blocks save file (.ieb)");
				}

			};

		  })(f);

	  // Read in the image file as a data URL.
	  reader.readAsText(f);
	}
}



function modalLoadLocalBtnPress() {


	console.log( 'modalLoadLocalBtnPress...' );

	var inputFile = document.getElementById("modalLoadLocalFiles");
	var Modalerror = document.getElementById("modalCompLoadFWarning");

	//console.log(inputFile.value);

	if (Blockly.loadDOMhold=="") {

		console.log("Please select a file before attempting to load it");
		Modalerror.innerHTML = "<mark class='alert alert-danger' >You haven't selected a file yet. Please first select an EdScratch save file from your computer, then load the file. [All EdScratch save files are file type (.ees).]</mark>";

	} else {

		var xmlHold = Blockly.Xml.workspaceToDom(workspace);

		//if(Blockly.FileReady){

			try {

				//loadXml(Blockly.loadDOMhold);
				Blockly.LoadingCode = true;
				Blockly.mainWorkspace.clear();
				resetSetupBlocks();

				console.log("removed all blocks about to load new code ");
				//Blockly.Xml.domToWorkspace(xml2, workspace);
				Blockly.Xml.domToWorkspace(Blockly.loadDOMhold, workspace);
				workspace.toolbox_.setSelectedItem(workspace.toolbox_.categoryMenu_.categories_[0]);
				taChange();
				workspace.clearUndo();
				//loadXml(xml2);
				console.log("All done, returning from the button code");
				//Blockly.FileReady=false;
				return inputFile.value;


			} catch {

				alert("Incorrect block data, please upload an Invention Engine blocks save file (.ieb)");
				//var xml_text=;
				var xml = xmlHold;
				Blockly.Xml.domToWorkspace(xml, workspace);
				workspace.clearUndo();
				//Blockly.FileReady=false;
				return false;

			}

		//}


	}
}
