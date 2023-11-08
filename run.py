
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from flask import Flask,request,jsonify,json,Response,render_template,url_for,redirect


app = Flask(__name__)

cred = credentials.Certificate('mydb.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://easmanagement-52782-default-rtdb.firebaseio.com'
})
ref_account = "0"
parameter_ref = db.reference('Parameters')
Change_ref = db.reference('Changes')
SymbolRef = db.reference('Symbols')

#allowed_symbols = ""




#hourly_price = coin_ref.child("hourlyPrice").get()




"""@app.route('/',methods=['GET','POST'])
def index():
    return render_template("index1.html")"""




@app.route('/',methods=['GET','POST'])
def home():
    return render_template("home1.html")


@app.route('/login',methods=['GET','POST'])
def login():
    return render_template("index.html")


@app.route('/symbols',methods=['GET','POST'])
def symbols():
    return render_template("symbols.html")


@app.route('/account',methods=['GET','POST'])
def account():
    return render_template("accountpage.html")




@app.route('/test',methods=['GET','POST'])
def test():
    return render_template("test.html")




@app.route('/getdata',methods=['GET','POST'])
def getdata():
	if request.method == "POST":
		symbols_list = []
		status_list = []
		direction_list = []
		children = SymbolRef.get()
		if children:
			for key, value in children.items():
				if key not in symbols_list:
					sts = SymbolRef.child(key).child("status").get()
					drn = SymbolRef.child(key).child("direction").get()
					if sts != None:
						symbols_list.append(key)
						status_list.append(sts)
						direction_list.append(drn)

		print(symbols_list)
		#print(status_list)
		#print(direction_list)
		allowed_symbols = '_'.join(symbols_list)
		symbols_status = '_'.join(status_list)
		my_direction = '_'.join(direction_list)
		mql_data = request.get_json()
		print(mql_data)
		mPNL = mql_data["PNL"]
		Eqt = mql_data["Eqt"]
		mql_symbol0 = mql_data["symbol"]
		mql_balance = mql_data["balance"]
		mql_equity = mql_data["equity"]
		account = mql_data["account"]

		symbol_broker_list = mql_symbol0.split("**")
		mql_symbol = symbol_broker_list[0]
		broker = symbol_broker_list[1]
		#symbol_ref = db.reference('Accounts/'+str(account)+"/"+mql_symbol)
		if mql_symbol.upper() in symbols_list:
			symbol_ref = db.reference('Symbols/'+mql_symbol.upper())
			symbol_ref.child("Accounts").update({"account":account})

			input_string = mPNL
			pairs = input_string.split("and")
			symbol_number_dict = {}
			for pair in pairs:
			    parts = pair.split("_")
			    if len(parts) == 2:
			        symbol, number = parts
			        symbol_number_dict[symbol] = number
			for symbol, number in symbol_number_dict.items():
			    #checkStatus = symbol_ref.child("status").get()
			    #if checkStatus:
			    SymbolRef.child(symbol.upper()).update({"PNL":number,"Eqt":number,"broker":broker})
			resStatus = symbol_ref.child("status").get()
			resDirection = symbol_ref.child("direction").get()
			resSymbol = symbol_ref.child("symbol").get()
			
			res = jsonify({
				"status":resStatus,
	        	"direction":resDirection,
	        	"symbol":resSymbol,
	        	"symbolList":allowed_symbols,
	        	"statusList":symbols_status,
	        	"directionList":my_direction
			})
			return res
		else:
			res = jsonify({
				"status":"noSymbol",
	        	"direction":"noSymbol",
	        	"symbol":"noSymbol",
	        	"symbolList":"noSymbol",
	        	"statusList":"noSymbol",
	        	"direction" :"noSymbol" 	
			})
			return res

	else:
		return render_template("index.html")



@app.route("/APIResult/<data>", methods=['GET', 'POST'])
def APIResult(data):
    if request.method == "POST":
        data_list = data.split("=")
        #print(data_list)
        #print(request)
        try:
	        ClosePanicText = data_list[0]
	        CloseBySymbol = data_list[1]
	        password = data_list[2]

	        """Sell_Counter = data_list[3]
	        LotInfo = data_list[4]
	        ClosePanicText = data_list[5]
	        Close_Buy_Trend = data_list[6]
	        Close_Sell_Trend = data_list[7]
	        Close_Buy_Counter = data_list[8]
	        Close_Sell_Counter = data_list[9]
	        StartHour = data_list[10]
	        StopHour = data_list[11]
	        Lot_mode = data_list[12]
	        Manage_Lot = data_list[13]
	        Fix_lot = data_list[14]
	        password = data_list[15]
	        Close_All_Trade = data_list[16]"""
	        parameter_ref.child("1").update({
	        	"ClosePanicText":"VALUE",
	        	"CloseBySymbol":"SYMBOL"
	        })
	        parameter_ref.child(CloseBySymbol).update({
	        	"ClosePanicText":ClosePanicText,
	        	"CloseBySymbol":CloseBySymbol
	        })
	        Change_ref.update({
	        	"CloseBySymbol":CloseBySymbol,
	        	"ClosePanicText":ClosePanicText
	        })
	        response = jsonify({'code': "200", 'body': "success"})
        except Exception as e:
        	Print(e)
        	response = jsonify({'code': "400", 'body': "error"})
        return response






if __name__ == '__main__':
    app.run(debug=True)



"""


"Buy_Trend":Buy_Trend,
"Sell_Trend":Sell_Trend,
"Buy_Counter":Buy_Counter,
"Sell_Counter":Sell_Counter,
"LotInfo":LotInfo,
"Close_Buy_Trend":Close_Buy_Trend,
"Close_Sell_Trend":Close_Sell_Trend,
"Close_Buy_Counter":Close_Buy_Counter,
"Close_Sell_Counter":Close_Sell_Counter,
"Close_All_Trade":Close_All_Trade,
"StartHour":StartHour,
"StopHour":StopHour,
"Lot_mode":Lot_mode,
"Manage_Lot":Manage_Lot,

"Buy_Trend":Buy_Trend,
"Sell_Trend":Sell_Trend,
"Buy_Counter":Buy_Counter,
"Sell_Counter":Sell_Counter,
"LotInfo":LotInfo,
"Close_Buy_Trend":Close_Buy_Trend,
"Close_Sell_Trend":Close_Sell_Trend,
"Close_Buy_Counter":Close_Buy_Counter,
"Close_Sell_Counter":Close_Sell_Counter,
"Close_All_Trade":Close_All_Trade,
"StartHour":StartHour,
"StopHour":StopHour,
"Lot_mode":Lot_mode,
"Manage_Lot":Manage_Lot,
"Fix_lot":Fix_lot

1. Fix existing bugs
2. When Close Panic is set to false for GBPUSD, it should also set 
	Buy_Counter=false and Buy_Trend=False
3. I should be able to see Close Panic state of each currency pair on the dashboard 
	and when I flip close panic then it should reflect the new state
4. Show the floating PnL by currency pair for each account
5. Set Listen on Web Server to 'true' by default
6. Fixing all the bugs found for the first 4 requirements in the price you quoted?



"""