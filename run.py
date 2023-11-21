
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




#hourly_price = coin_ref.child("hourlyPrice").get()




@app.route('/',methods=['GET','POST'])
def index():
    return render_template("index1.html")


@app.route('/getdata',methods=['GET','POST'])
def getdata():
	if request.method == "POST":
		mql_data = request.get_json()
		#print(mql_data)
		buy_pnl_list = mql_data["buypnl"].split("and")
		sell_pnl_list = mql_data["sellpnl"].split("and")
		mql_symbol = mql_data["symbol"]
		mql_balance = mql_data["balance"]
		mql_equity = mql_data["equity"]
		account = mql_data["account"]
		#ref_account = buy_pnl_list[0]
		accounts_ref = db.reference('Accounts/'+str(account)+"/"+mql_symbol)
		save_symbol = "";
		if '_' in mql_symbol:
			symbol_lst = mql_symbol.split(mql_symbol)
			save_symbol = symbol_lst[0]
		else:
			save_symbol = mql_symbol
		accounts_ref.update({
			"currentSymbol":save_symbol,
			"AccountBalance":mql_balance,
			"AccountEquity":mql_equity,
			"buyTradeSymbol":buy_pnl_list[1],
			"buyTradePnl":buy_pnl_list[2],
			"sellTradeSymbol":sell_pnl_list[1],
			"sellTradePnl":sell_pnl_list[2]
		})
		#print(buy_pnl_list)
		#print(sell_pnl_list)
		Fix_lot = parameter_ref.child("Fix_lot").get()
		#Close_All_Trade = parameter_ref.child("ALL SYMBOLS").child("ClosePanicText").get()
		ClosePanicText = parameter_ref.child(save_symbol).child("ClosePanicText").get()
		CloseBySymbol = parameter_ref.child(save_symbol).child("CloseBySymbol").get()
		#if Close_All_Trade == "TRUE":
			#parameter_ref.update({"Close_All_Trade":"FALSE"})
			#"Close_All_Trade":Close_All_Trade
		res = jsonify({
			"ClosePanicText":ClosePanicText,
        	"CloseBySymbol":CloseBySymbol   	
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