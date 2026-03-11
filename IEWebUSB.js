'use strict';

let connectedHub;

var readUsbLoop = 0;
const readLoopDelay = 200;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 function inventionEngineConnected(){
    if(typeof connectedHub == 'undefined'){
        return false;
    }else{
        //console.log(device);
        if(connectedHub.opened){
          return true;
        }else{
          //await connectedHub.open();
          //await connectedHub.selectConfiguration(1);
          //await connectedHub.claimInterface(0);
          //await connectedHub.transferOut(3, data);
          return false;
        }

    }
}

async function programInventionEngine() {

   if (!inventionEngineConnected()) {
      await connectHub();
      //await connectedHub.transferOut(3, data);
   }

   var versionNumber = await getInventionEngineFirmwareVersion();

   if (versionNumber>0) {

      var uid = '000';
      var uid = await getInventionEngineUID();
      localStorage.setItem("ieUID", uid);

      //correct version
      compileAndSend(versionNumber);

   } else {

      alert("fimrware version error");
   }

}

async function connectHubAndReadOnLoop() {

    if(!inventionEngineConnected()){
        await connectHub();
	    //await connectedHub.transferOut(3, data);
    }
    readUsbLoop =1;
    hubDataToBox();

}

function dropUSBLoop(){
    readUsbLoop=2;
}

function sign16BitValue(val) {
   if (val & 0x8000) {
      val = val|0xffff0000;
   }
   return val;
}


const hubDataToBox = async () => {

   // SK: To update UI
   usbUpdateStatus();
   //console.log("called hubDataToBox");
  // Read the serial buffer on the device
  var fromUSBdata = document.getElementById('fromUSBdata');
  var readUSB1;
  readUSB1 = await connectedHub.transferIn(1, 8);
  // console.log(resultIn);
  if(readUSB1.status != "ok") {
      console.log("controlTransferIn failed.");
  }else if(readUsbLoop==1){
      //only using data and looking again, if we want to collect data
    const resultArray = new Uint8Array(readUSB1.data.buffer); // This is the serial buffer.
    //console.log(resultArray);
    const len = resultArray[1]; // This is the transfer command bit
    //console.log(len);
    const opt = resultArray[0]; // This IE indentifier bit
    var dat;
    if(opt==0x08&&len==0x81){
        //data transfer
        if(resultArray[2]==1){
            //data for this box specifically
            if(resultArray[6]==1){
                //data is ascii, convert
                dat = String.fromCharCode(resultArray[4]);
            }else{
                //data is a value
                dat = sign16BitValue(resultArray[4]+(resultArray[5]<<8))+'\r\n';
            }
        }
    }

	fromUSBdata.value = fromUSBdata.value+dat;
    fromUSBdata.scrollTop = fromUSBdata.scrollHeight;
    setTimeout(hubDataToBox, readLoopDelay);

   }else if(readUsbLoop==2){
        readUsbLoop=0;
   }


   //usbUpdateStatus();


}; // end listten function





async function sendProgramViaUSB(userProgram) {

    //jQuery('#divProgrammingMessage').html('Sending code to hub');
    programOutput('Sending code to hub.', 'append', 'info');


   var size = userProgram.length;
   if ( size<2 ) {

       //jQuery('#divProgrammingMessage').html('No blocks detected, please try again');
       programOutput('No blocks detected, please try again.', 'append', 'error');

       return false;
   }
   //console.log(userProgram);
   //console.log(userProgram.length);
   const data = new Uint8Array([8, 130, 0, 0,0,0,0,0]);
   data[2] = size;
   data[3] = size>>8;
   //console.log(data);
   var lowerByte = true;
   var checkSum = 0;
   for (var i = 0; i < userProgram.length; i++) {
      //userProgram[i]
      if(lowerByte) {
         checkSum = checkSum^userProgram[i];
         lowerByte = false;
      } else {
         checkSum = checkSum^(userProgram[i]<<8);
         lowerByte = true;
      }
   }
   //console.log(checkSum);
   data[5] = checkSum;
   data[6] = checkSum>>8;
   //console.log(data);

   await connectedHub.transferOut(2, data);
   await sleep(500);
   //console.log(userProgram);
   await connectedHub.transferOut(2, userProgram);

   //jQuery('#divProgrammingMessage').html('download done');
   programOutput('Download complete.', 'append', 'success');

   return true;

}

async function sendNumberToInventionEngine(usbNum){
    const data = new Uint8Array([8, 129, 0, 0,0,0,0,0]);
    data[4] = usbNum;
    data[5] = (usbNum >> 8);
    if(inventionEngineConnected()){

    }else{
        await connectHub();
	    //await connectedHub.transferOut(3, data);
    }
    //console.log(data);
    //console.log('start transfer');
    await connectedHub.transferOut(3, data);
    //console.log('end transfer');
}

async function connectHub() {
    //console.log("connecting hub");
	const VENDOR_ID = 0x8888
    const RELESE_VENDOR_ID = 0x16D0
    const RELESE_PRODUCT_ID = 0x111D
    //console.log("connecting hub - consts set");

        connectedHub = await navigator.usb.requestDevice({
            filters: [{ vendorId: VENDOR_ID }, {vendorId: RELESE_VENDOR_ID, productId: RELESE_PRODUCT_ID}]
        });
        //console.log("connecting hub - pop up run and USB selected");
  await connectedHub.open();
  //console.log("connecting hub - hub opened");
  await connectedHub.selectConfiguration(1);
  //console.log("connecting hub - Config selected");
  await connectedHub.claimInterface(0);
  //console.log("connecting hub - interface claimed");
}

async function getInventionEngineUserFirmwareVersion(){
    var result;
    result =  await getInventionEngineFirmwareVersion();
    result=result/10;
    return result;
}

async function getInventionEngineFirmwareVersion(){
    const data = new Uint8Array([8, 134, 0, 0,0,0,0,0]);
    //data[4] = usbNum;
    //data[5] = (usbNum >> 8);
    if(inventionEngineConnected()){

    }else{
        await connectHub();
	    //await connectedHub.transferOut(3, data);
    }

    var result;
    if(readUsbLoop==1||readUsbLoop==2){
        //the first firmware data is going to the USB box
        //clear flag
        readUsbLoop=0;
        //send a dummy
        await connectedHub.transferOut(3, data);
        console.log("dummy transfer out");

    }
    await connectedHub.transferOut(3, data);
    result =  await connectedHub.transferIn(1,8);
    //var versionNumber
    //versionNumber =
    if(result.status =="ok"){
        if(result.data.getUint8(1)!=0x86 ||result.data.getUint8(0)!=0x08 ){
            //data back is invalid, need new data
            var i=0;
            //console.log("start loop");
            //try multiple times to get firmware data back from the hub
            while (result.data.getUint8(1)!=0x86&&i<6){
                await connectedHub.transferOut(3, data);
                result =  await connectedHub.transferIn(1,8);
                i++;
            }
            if(i==6){
                //error state, return 0 as a signifier for higher level functions
                return 0;
            }
            //console.log("end loop");
            //console.log(i);
        }
        var numBytes = result.data.getUint8(3);
        var versionNum = 0;
        for (var i = 0; i < numBytes; i++) {
            var byte = result.data.getUint8(4+i);
            byte = byte << 8*i;
            versionNum = versionNum|byte;
        }
        console.log(versionNum);
        return versionNum;
    }else{
        console.log("Fail");
        console.log("result.status");
        return false;
    }

}

function byteToHexString(byteVal){
    //simplistic function to convert 16 bit numbers into 2 character hex strings
    if(byteVal>255){
        return null;
    }
    if(byteVal<0){
        return null;
    }
    //array with hex characters indexed to their dec number
    var hexmap = ["0", "1", "2", "3", "4", "5", "6", "7", "8","9","a","b","c","d","e","f"];
    //seperate out the number for conversion
    var low = byteVal&0x0F;
    var high = byteVal&0xF0;
    high = high>>4;
    //convert, concatinate and return
    return hexmap[high]+hexmap[low]
}

async function getInventionEngineUID(){
    const data = new Uint8Array([8, 132, 0, 0,0,0,0,0]);

    if(inventionEngineConnected()){

    }else{
        //alert("error cannot get firmware number of disconnected IE")
        await connectHub();
    }

    var result;
    var versionNumber = await getInventionEngineFirmwareVersion();

    await connectedHub.transferOut(3, data);
    //console.log("transfer out");
    result =  await connectedHub.transferIn(1,8);
    //var versionNumber
    //console.log("got result");
    //versionNumber =
    if(result.status =="ok"){
    //if(result){
        //console.log(result.data) ;
        //console.log(result.data.getUint8(4));
        //var numBytes = result.data.getUint8(3);
        var uidString;
        if(versionNumber<5){
            //error in older firmware versions that needs to be acounted for
            uidString = byteToHexString(result.data.getUint8(6))+
                        byteToHexString(result.data.getUint8(7))+
                        byteToHexString(result.data.getUint8(4))+
                        byteToHexString(result.data.getUint8(5))+
                        byteToHexString(result.data.getUint8(2))+
                        byteToHexString(result.data.getUint8(3));

        }else{
            uidString = byteToHexString(result.data.getUint8(7))+
                        byteToHexString(result.data.getUint8(6))+
                        byteToHexString(result.data.getUint8(5))+
                        byteToHexString(result.data.getUint8(4))+
                        byteToHexString(result.data.getUint8(3))+
                        byteToHexString(result.data.getUint8(2));
        }
        return uidString;

    }else{
        console.log("Fail");
        console.log("result.status");
        return false;
    }
    //return 28920000;
}

async function updateInventionEngine() {

    //fuButtonStatus ('connecting');
    if (!inventionEngineConnected()) {
        await connectHub();
	    //await connectedHub.transferOut(3, data);
    }

    var versionNumber = await getInventionEngineFirmwareVersion();
    fuButtonStatus ('connecting-done');

    fuFeebackCardPrepend('Hub connected', 'info');

    if (versionNumber) {

        //correct version
        //compileAndSend();
        var blankFile;
        var codeStart = '//Do not edit, created automatically by Invention Engine\n'+ //do not change this line it is being tracked by the API
                      '//Functions to be put into flash\n'+
                      '#include "ch547.h"\n'+
                      '#include "debug.h"\n'+
                      '#include "InternalFunctions.h"\n'+
                      '\n'+
                      'void begin_absolute_code(void) __naked{\n'+
                      '    __asm\n'+
                      '          .area ABSCODE (ABS,CODE)\n'+
                      '          .org 0xF000        // YOUR FUNCTIONS DESIRED ADDRESS HERE.\n'+
                      '    __endasm;\n'+
                      '}\n'+
                      'void userProg(){\n'+
                      '\n'+
                      '//User variables\n';
          var codeEnd = '}\n'+
                      '\n'+
                      'void end_absolute_code(void) __naked{\n'+
                      '    __asm\n'+
                      '        .area CSEG (REL,CODE)\n'+
                      '    __endasm;\n'+
                      '}\n';
        blankFile = codeStart+"\n"+codeEnd;
        APIcallFimrware(blankFile, versionNumber);
    } else {
        alert("fimrware version error");
        fuFeebackCardPrepend('Fimrware version error', 'error');
    }

}

async function updateHubFirmware(firmware) {

   fuFeebackCardPrepend('Downloading firmware', 'info');

    var size = firmware.length;
    //console.log(firmware);
    //console.log(firmware.length);
    const data = new Uint8Array([8, 253, 0, 0,0,0,0,0]);
    data[2] = size;
    data[3] = size>>8;
    //console.log(data);
    var lowerByte = true;
    var checkSum = 0;
    for (var i = 0; i < firmware.length; i++) {
        //userProgram[i]
        if(lowerByte){
            checkSum = checkSum^firmware[i];
            lowerByte = false;
        }else{
            checkSum = checkSum^(firmware[i]<<8);
            lowerByte = true;
        }
    }
    //console.log(checkSum);
    data[5] = checkSum;
    data[6] = checkSum>>8;
    //console.log(data);

    await connectedHub.transferOut(2, data);
    await sleep(200);
    //console.log(firmware);
	await connectedHub.transferOut(2, firmware);

    //fuFeebackCardClear();
    fuButtonStatus ('downloading-done');
    fuFeebackCardPrepend('Firmware downloaded', 'info');

   fuFeebackCardPrepend('Please reconnect hub...', 'prompt');

}

async function firmwareUpdateReconnectInventionEngine() {
    fuButtonStatus ('reconnecting');
    if (!inventionEngineConnected()) {
        await connectHub();
	    //await connectedHub.transferOut(3, data);
    }

    var versionNumber = await getInventionEngineFirmwareVersion();
    fuButtonStatus ('reconnecting-done');
    fuFeebackCardPrepend('Hub reconnected.', 'info');
    //fuFeebackCardClear();
    if(versionNumber==5){
        versionNumber = versionNumber/10;
        fuFeebackCardPrepend('Firmware updated to version: v' + versionNumber, 'success');
    }else{
        versionNumber = versionNumber/10;
        fuFeebackCardPrepend('Firmware stuck on version: v' + versionNumber, 'fail');
    }


}
