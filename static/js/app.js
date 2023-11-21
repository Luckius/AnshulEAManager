var firebaseConfig = {
    apiKey: "AIzaSyAsqNEmJruurMvi03ycdQgxLQdO95wpWiM",
    authDomain: "easmanagement-52782.firebaseapp.com",
    databaseURL: "https://easmanagement-52782-default-rtdb.firebaseio.com",
    projectId: "easmanagement-52782",
    storageBucket: "easmanagement-52782.appspot.com",
    messagingSenderId: "343583306103",
    appId: "1:343583306103:web:c8008df6e954482d043172",
    measurementId: "G-DHQ88EVSF8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics(); 

const database = firebase.database();
const ParameterRef = database.ref('/Parameters');
const AccountsRef = database.ref('/Accounts');
const ChangeRef = database.ref('/Changes');
const OptionsRef = database.ref('/Options');




var ClosePanicText;
var CloseBySymbol;
var options = [];
var allSymbolOptions = [];

var PasswordID = document.getElementById('Password');

/*var Buy_Trend;
var Sell_Trend;
var Buy_Counter;
var Sell_Counter;
var LotInfo;
var ClosePanicText;
var Close_Buy_Trend;
var Close_Sell_Trend;
var Close_Buy_Counter;
var Close_Sell_Counter;
var Close_All_Trade;

var StartHour;
var StopHour ;//= document.getElementById('Stop_Hour').value;
var Lot_mode ;//= document.getElementById('Lot_mode').value;
var Manage_Lot ;//= document.getElementById('Manage_Lot').value;
var Fix_lot ;//= document.getElementById('Fix_lot').value;
var password;// = document.getElementById('Password').value;

var StartHourID = document.getElementById('Start_Hour');
var StopHourID = document.getElementById('Stop_Hour');
var Lot_modeID = document.getElementById('Lot_mode');
var Manage_LotID = document.getElementById('Manage_Lot');
var Fix_lotID = document.getElementById('Fix_lot');*/


var myTimeoutID;


var ClosePanicText1;
var CloseBySymbol1;

var AccountNo;
var AccountEquity;
var AccountBalance;
var mTradeSymbol;
var sellPnl;
var buyPnl;




//console.log("data called here");
retriveData();
function retriveData() {
    
    ParameterRef.on('value', snapshot => {
        var text = "<small>"+"Symbols Status..."+"</small>";
        if (snapshot) {
            var data = snapshot.val();
            if (data) {
              // Loop through the children and process them
              const table = document.getElementById('symbol-table');
              /*while (table.firstChild) {
                table.removeChild(table.firstChild);
              }*/
              const rowsToRemove = table.querySelectorAll('tr:not(:first-child)');
              rowsToRemove.forEach(row => row.remove());

              //console.log(data);
              Object.keys(data).forEach(function(key) {
                var childData = data[key];
                    ClosePanicText1 = snapshot.child(key).child("ClosePanicText").val();
                    CloseBySymbol1 = snapshot.child(key).child("CloseBySymbol").val();
                    /*text = text + "<br>"+CloseBySymbol1+" :______________"+ClosePanicText1;
                    var element = document.getElementById("mydata"); 
                    element.innerHTML = text;*/

                      //create table here
                      var mytr1 = document.getElementById("tr1");
                      mytr1.style.display = "none";
                      
                      //row.style.fontWeight = "bold";

                      const row = document.createElement('tr');
                      if(CloseBySymbol1 == "SYMBOL"){
                        row.style.fontWeight = "bold";
                      }
                      const symbolColumn = document.createElement('td');
                      symbolColumn.textContent = CloseBySymbol1;
                      row.appendChild(symbolColumn);
                      const valueColumn = document.createElement('td');
                      valueColumn.textContent = ClosePanicText1;
                      row.appendChild(valueColumn);
                      table.appendChild(row);
                      //data = null;
                });

                
              //});
            } else {
              console.log('No data found at the specified path.');
            }           

            /*var Buy_Trend = snapshot.child("Buy_Trend").val();
            var Sell_Trend = snapshot.child("Sell_Trend").val();
            var Buy_Counter = snapshot.child("Buy_Counter").val();
            var Sell_Counter = snapshot.child("Sell_Counter").val();
            //var Sell_Counter = snapshot.child("Sell_Counter").val();
            var LotInfo = snapshot.child("LotInfo").val();          
            var Close_Buy_Trend = snapshot.child("Close_Buy_Trend").val();
            var Close_Sell_Trend = snapshot.child("Close_Sell_Trend").val();
            var Close_Buy_Counter = snapshot.child("Close_Buy_Counter").val();
            var Close_Sell_Counter = snapshot.child("Close_Sell_Counter").val();
            var StartHour = snapshot.child("StartHour").val();
            var StopHour = snapshot.child("StopHour").val();
            var Lot_mode = snapshot.child("Lot_mode").val();
            var Fix_lot = snapshot.child("Fix_lot").val();
            var Manage_Lot = snapshot.child("Manage_Lot").val();
            var Close_All_Trade = snapshot.child("Close_All_Trade").val();*/
            //console.log(snapshot);
            //console.log("mydata: "+ checkData(Buy_Counter));
            $("#Close_Panic").val(checkData(ClosePanicText1)).change();
            $("#Close_Buy_Trend1").val(checkData(CloseBySymbol1)).change();

            /*$("#Buy_Trend").val(checkData(Buy_Trend)).change();
            $("#Sell_Trend").val(checkData(Sell_Trend)).change();
            $("#Buy_Counter").val(checkData(Buy_Counter)).change();
            $("#Sell_Counter").val(checkData(Sell_Counter)).change();
            $("#Lot_Info").val(checkData(LotInfo)).change();       
            $("#Close_Buy_Trend").val(checkData(Close_Buy_Trend)).change();
            $("#Close_Sell_Trend").val(checkData(Close_Sell_Trend)).change();
            $("#Start_Hour").val(checkData(StartHour));
            $("#Stop_Hour").val(checkData(StopHour));
            $("#Lot_mode").val(checkData(Lot_mode));
            $("#Fix_lot").val(checkData(Fix_lot));
            $("#Manage_Lot").val(checkData(Manage_Lot));
            $("#Close_Buy_Counter").val(checkData(Close_Buy_Counter)).change();
            $("#Close_Sell_Counter").val(checkData(Close_Sell_Counter)).change();
            $("#Close_All_Trade").val(checkData(Close_All_Trade)).change();*/
            
        }
    });  
}


retriveTrades();
function retriveTrades(){

        AccountsRef.on('value', snapshot => {
        var text1 = "<small>"+"Trade Status..."+"</small>";
        if (snapshot) {
            var data = snapshot.val();
            const table = document.getElementById('symbol-table2');
            const rowsToRemove = table.querySelectorAll('tr:not(:first-child)');
            rowsToRemove.forEach(row => row.remove());
            if (data) {
              // Loop through the children and process them
              Object.keys(data).forEach(function(key) {
                var childData = data[key];
                //console.log('Key: ' + key);
                AccountsRef.child(key).on('value', snapshot2 => {
                    if (snapshot2) {
                        var data2 = snapshot2.val();
                        Object.keys(data2).forEach(function(key2) {
                            var childData2 = data2[key2];                    
                                //console.log('Key2: ' + key2);
                                //console.log(snapshot3);
                                //console.log(data2);
                                
                                /*while (table.firstChild) {
                                  table.removeChild(table.firstChild);
                                }*/
                                //const rowsToRemove = table.querySelectorAll('tr:not(:first-child)');
                                //rowsToRemove.forEach(row => row.remove());
                                AccountNo = key;
                                AccountBalance = snapshot2.child(key2).child("AccountBalance").val();// data2.AccountBalance;
                                AccountEquity = snapshot2.child(key2).child("AccountEquity").val();//data2.AccountEquity; 
                                mTradeSymbol = snapshot2.child(key2).child("currentSymbol").val();//data2.currentSymbol; 
                                buyPnl = snapshot2.child(key2).child("buyTradePnl").val();//data2.buyTradePnl;
                                sellPnl = snapshot2.child(key2).child("sellTradePnl").val();//data2.sellTradePnl; 
                                /*text1 = text1 +"<br>"+AccountNo+"<br>Symbol: "+mTradeSymbol+"<br>Balance: "+" "+AccountBalance+" ====> Equity : "+AccountEquity+"<br>Buy PNL : "+buyPnl+" ===> Sell PNL : "+sellPnl+"<br>----------------------------------------------";
                                
                                var element = document.getElementById("mydata2"); 
                                element.innerHTML = text1;*/
                                //console.log(AccountBalance);
                                var totalPNL = parseFloat(buyPnl)+parseFloat(sellPnl);

                                //start here

                                  var mytr1 = document.getElementById("tr2");
                                  mytr1.style.display = "none";

                                  //const table = document.getElementById('symbol-table2');
                                  const row = document.createElement('tr');


                                  const symbolColumn = document.createElement('td');
                                  if(AccountNo != 1){
                                    symbolColumn.textContent = AccountNo;
                                  }else{
                                    row.style.fontWeight = "bold";
                                    symbolColumn.textContent = "Account";
                                  }
                                  
                                  row.appendChild(symbolColumn);
                                  const valueColumn = document.createElement('td');
                                  if(AccountEquity != "Equity"){
                                    valueColumn.textContent = AccountEquity.toFixed(2);
                                  }else{
                                    valueColumn.textContent = AccountEquity;
                                  }
                                  row.appendChild(valueColumn);

                                  const symbolColumn1 = document.createElement('td');
                                  symbolColumn1.textContent = mTradeSymbol;
                                  row.appendChild(symbolColumn1);
                                  const valueColumn1 = document.createElement('td');
                                  if(AccountEquity != "Equity"){
                                    valueColumn1.textContent = totalPNL.toFixed(2);
                                  }else{
                                    valueColumn1.textContent = "PNL";
                                  }
                                  
                                  row.appendChild(valueColumn1);


                                  table.appendChild(row);

                        });
                        
                    }else{console.log("No datasnap")}
                });
                
              });
            } else {
              console.log('No data found at the specified path.');
            }           

            //$("#Close_Panic").val(checkData(ClosePanicText1)).change();
            //$("#Close_Buy_Trend1").val(checkData(CloseBySymbol1)).change();

            
        }
    }); 

}


var ClosePanicText2;
var CloseBySymbol2;
//retriveChanges();
function retriveChanges(){
    //loadOptions();
    ChangeRef.on('value', snapshot => {
        if (snapshot) {
            var data = snapshot.val();
            //console.log("Data for changes");
            //console.log(data);
            ClosePanicText2 = snapshot.child("ClosePanicText").val();
            CloseBySymbol2 = snapshot.child("CloseBySymbol").val();

            
            //$("#Close_Buy_Trend1").val(checkData(CloseBySymbol2)).change();
            //console.log("This is my options");
            //console.log(options);
            //console.log(options.length);
            if(options.length > 0){

            for (var i = 0; i < options.length; i++) {
              if (options[i].label == CloseBySymbol2) {
                    console.log("another loop");
                    console.log(options[i].value);
                    $("#Close_Panic").val(checkData(ClosePanicText2)).change();
                    $("#Close_Buy_Trend1").val(options[i].value).change();
                    break; 
                  }
                  
                }
            }
            
            



        }

    });

}


function checkAllSymboOptions(){
    if(options.length > 0){
    for (var i = 0; i < options.length; i++) {
      if (!allSymbolOptions.includes(options[i].label)) {
            allSymbolOptions.push(options[i].label);
        }
          
        }
    }
}



window.onload = function() {
    loadOptions();
};



function loadOptions(){
    OptionsRef.on('value', snapshot => {
    if (snapshot) {
        options = [];
        var data = snapshot.val();
        Object.keys(data).forEach(function(key) {
            var childData = data[key];
            var Label = snapshot.child(key).child("label").val();
            var Value = snapshot.child(key).child("value").val();
            options.push({ value: Value, label: Label });


        });
        //console.log(data);
        addOptions(options);
        setTimeout(function(){
            retriveChanges();
        },1000)
        
    }

});
}



function addOptions(myOptions) {
      var selectElement = document.getElementById("Close_Buy_Trend1");
      // Remove existing options (optional)
      selectElement.innerHTML = "";

      // Define the options as an array of objects
      var options = myOptions;

      // Create and append the option elements
      for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].value;
        option.text = options[i].label;
        selectElement.appendChild(option);
      }
      //retriveChanges();
    }


function addSymbol(){
    checkAllSymboOptions();
    var addSymbolElm = document.getElementById("addsymbol");
    var symbol = addsymbol.value;
    if(!allSymbolOptions.includes(symbol)){
        if(symbol != ""){
            if(symbol.length == 6){
                var value = "val"+((options.length)+1);

                OptionsRef.child(value).update({
                    "label":symbol,
                    "value":value
                });
                swal("Success","Symbol added successfully","success");
                addSymbolElm.value = "";
            }else{
               swal("Sorry","Invalid Symbol format","error"); 
            }
        }else{
            swal("Sorry","Symbol can't be empty","error");
        }

    }else{
        swal("Failed",symbol+" already exist","error"); 
    }

}







function checkData(mydata) {
    //loadOptions();
    var myStr = "";
    if(mydata == "TRUE"){
        myStr = "val1";
    }
    if(mydata == "FALSE"){
        myStr = "val2";
    }
    return myStr;

}










//console.log(Buy_Trend);



function getClosePanic() {
    var Close_Panic_Id = document.getElementById("Close_Panic");
    ClosePanicText = Close_Panic_Id.options[Close_Panic_Id.selectedIndex].text;
    console.log(ClosePanicText);
}

function getCloseBySymbol() {
    var symbolID = document.getElementById("Close_Buy_Trend1");
    CloseBySymbol = symbolID.options[symbolID.selectedIndex].text;
}

/*function getCloseSellTrend() {
    var Trade_Type_Id = document.getElementById("Close_Sell_Trend");
    Close_Sell_Trend = Trade_Type_Id.options[Trade_Type_Id.selectedIndex].text;
}

function getCloseBuyCounter() {
    var Entry_Type_Id = document.getElementById("Close_Buy_Counter");
    Close_Buy_Counter = Entry_Type_Id.options[Entry_Type_Id.selectedIndex].text;
}

function getCloseSellCounter() {
    var Trade_Duration_Id = document.getElementById("Close_Sell_Counter");
    Close_Sell_Counter = Trade_Duration_Id.options[Trade_Duration_Id.selectedIndex].text;
}



function getBuyTrend() {
    var Outcome_Id = document.getElementById("Buy_Trend");
    Buy_Trend = Outcome_Id.options[Outcome_Id.selectedIndex].text;
}

function getSellTrend() {
    var Stop_Loss_Type_Id = document.getElementById("Sell_Trend");
    Sell_Trend = Stop_Loss_Type_Id.options[Stop_Loss_Type_Id.selectedIndex].text;
}

function getBuyCounter() {
    var Profit_Target_Type_Id = document.getElementById("Buy_Counter");
    Buy_Counter = Profit_Target_Type_Id.options[Profit_Target_Type_Id.selectedIndex].text;
}


function getSellCounter() {
    var Profit_Target_Type_Id = document.getElementById("Sell_Counter");
    Sell_Counter = Profit_Target_Type_Id.options[Profit_Target_Type_Id.selectedIndex].text;
}

function getSell_Counter() {
    var Position_Size_Type_Id = document.getElementById("Sell_Counter");
    Sell_Counter = Position_Size_Type_Id.options[Position_Size_Type_Id.selectedIndex].text;
}


function getLotInfo() {
    var Position_Size_Type_Id = document.getElementById("Lot_Info");
    LotInfo = Position_Size_Type_Id.options[Position_Size_Type_Id.selectedIndex].text;
}


function getCloseAllTrade() {
    var Position_Size_Type_Id = document.getElementById("Close_All_Trade");
    Close_All_Trade = Position_Size_Type_Id.options[Position_Size_Type_Id.selectedIndex].text;
}*/








function saveToDatabase(){

    /*StartHour = StartHourID.value;
    StopHour = StopHourID.value;
    Lot_mode = Lot_modeID.value;
    Manage_Lot = Manage_LotID.value;
    Fix_lot = Fix_lotID.value;*/
    password = "123";
    /*if(CloseBySymbol == "ALL SYMBOLS"){
        CloseBySymbol = "ALLSYMBOLS";
    }*/

    swal("Please wait...");
    //var data = Buy_Trend + "=" +Sell_Trend + "=" +Buy_Counter + "=" +Sell_Counter + "=" +LotInfo + "=" +ClosePanicText + "=" +Close_Buy_Trend + "=" +Close_Sell_Trend + "=" +Close_Buy_Counter + "=" +Close_Sell_Counter + "=" +StartHour + "=" +StopHour + "=" +Lot_mode + "=" +Manage_Lot + "=" +Fix_lot+"="+password+"="+Close_All_Trade;
    var data = ClosePanicText + "=" +CloseBySymbol+"="+password;
    //console.log(data);
    $.ajax({
            type:'POST',
            url: "/APIResult/"+data
    }).done(function(res) {
        console.log(res.code);
        if(res.code == "200"){
            swal("Data Updated","Your data has changed and saved","success");
        }else{
            swal("Failed","Some data didn't Updated well Please try again","error");
        }

        //myTimeout = setTimeout(mReload, 5000);

        
    });
}


function mReload() {
    window.location.reload();
    myStopFunction();
}

function myStopFunction() {
    clearTimeout(myTimeout);
}




/*ParameterRef.update({
    "Buy_Trend":Buy_Trend,
    "Sell_Trend":Sell_Trend,
    "Buy_Counter":Buy_Counter,
    "Sell_Counter":Sell_Counter,
    "LotInfo":LotInfo,
    "ClosePanicText":ClosePanicText,
    "Close_Buy_Trend":Close_Buy_Trend,
    "Close_Sell_Trend":Close_Sell_Trend,
    "Close_Buy_Counter":Close_Buy_Counter,
    "Close_Sell_Counter":Close_Sell_Counter,
    "StartHour":StartHour,
    "StopHour":StopHour,
    "Lot_mode":Lot_mode,
    "Manage_Lot":Manage_Lot,
    "Fix_lot":Fix_lot
}, (error) => {
  if (error) {
     console.log("error");
     swal("Failed","Some data didn't Updated well Please try again","error");
  } else {
    // Data saved successfully!
    swal("Data Updated","Your data has changed and saved","success");
  }
});*/


