// load environment variables
require('dotenv').config();
const Web3 = require('web3')
const open = require('open')

// connect to BSC endpoint
const URL = 'https://bsc-dataseed.binance.org/'
// Websockets endpoint
const WS_URL = 'wss://bsc.getblock.io/mainnet/?api_key=' + process.env.API_KEY

const web3 = new Web3(URL)

// Get the Lender address and relevant info
const BNBFury_ABI = [{"inputs":[{"internalType":"address payable","name":"_walletProject","type":"address"},{"internalType":"address payable","name":"_walletMarketing","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"high","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current","type":"uint256"}],"name":"InitiateInsurance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"InsuranseFeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MarketingFeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"planIdx","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newcomer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ProjectFeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"refLevel","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefDividends","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"RefInvited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvested","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"DEPOSIT_HISTORY","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INSURANCE_CONTRACT","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INSURANCE_LOWBALANCE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"INSURANCE_MAXBALANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INSURANCE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INSURANCE_TRIGGER_BALANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LAUNCHED","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKETING_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PLANS","outputs":[{"internalType":"uint256","name":"durationDays","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROJECT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REINVEST_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_CLAIMED","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_DEPOSITS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_INVESTED","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_REFDIVIDENDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"USERS","outputs":[{"internalType":"uint256","name":"checkpoint","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"refDividends","type":"uint256"},{"internalType":"uint256","name":"debtBuffer","type":"uint256"},{"internalType":"uint256","name":"totalInvested","type":"uint256"},{"internalType":"uint256","name":"totalRefDividends","type":"uint256"},{"internalType":"uint256","name":"totalClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WALLET_MARKETING","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WALLET_PROJECT","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositHistory","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct BNBFURY.THistoryDeposit[20]","name":"o_historyDeposits","type":"tuple[20]"},{"internalType":"uint256","name":"o_timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProjectInfo","outputs":[{"internalType":"uint256","name":"o_totDeposits","type":"uint256"},{"internalType":"uint256","name":"o_totInvested","type":"uint256"},{"internalType":"uint256","name":"o_totRefDividends","type":"uint256"},{"internalType":"uint256","name":"o_totClaimed","type":"uint256"},{"internalType":"uint256","name":"o_ensBalance","type":"uint256"},{"internalType":"uint256","name":"o_ensTriggerBalance","type":"uint256"},{"internalType":"uint256","name":"o_timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_numBack","type":"uint256"}],"name":"getUserDepositHistory","outputs":[{"components":[{"internalType":"uint256","name":"planIdx","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timeStart","type":"uint256"},{"internalType":"uint256","name":"timeEnd","type":"uint256"},{"internalType":"bool","name":"isReinvest","type":"bool"}],"internalType":"struct BNBFURY.TDeposit[5]","name":"o_deposits","type":"tuple[5]"},{"internalType":"uint256","name":"o_total","type":"uint256"},{"internalType":"uint256","name":"o_idxFrom","type":"uint256"},{"internalType":"uint256","name":"o_idxTo","type":"uint256"},{"internalType":"uint256","name":"o_timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserInfo","outputs":[{"components":[{"internalType":"uint256","name":"dividends","type":"uint256"},{"internalType":"uint256","name":"mActive","type":"uint256"},{"internalType":"uint256","name":"rActive","type":"uint256"}],"internalType":"struct BNBFURY.TPlanInfo","name":"o_planInfo","type":"tuple"},{"components":[{"internalType":"uint256[5]","name":"count","type":"uint256[5]"},{"internalType":"uint256","name":"dividends","type":"uint256"},{"internalType":"uint256","name":"totalEarned","type":"uint256"}],"internalType":"struct BNBFURY.TRefInfo","name":"o_refInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"claimable","type":"uint256"},{"internalType":"uint256","name":"checkpoint","type":"uint256"},{"internalType":"uint256","name":"totalDepositCount","type":"uint256"},{"internalType":"uint256","name":"totalInvested","type":"uint256"},{"internalType":"uint256","name":"totalClaimed","type":"uint256"}],"internalType":"struct BNBFURY.TUserInfo","name":"o_userInfo","type":"tuple"},{"internalType":"uint256","name":"o_timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"uint8","name":"_planIdx","type":"uint8"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"stat_depositsReusedCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stat_maxDepositArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stat_maxDepositArrayUser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const BNBFury_ADDRESS = process.env.contract

let bnbfury = new web3.eth.Contract(BNBFury_ABI, BNBFury_ADDRESS)


// Grab the New Deposit events if above a certain amount
//
// 0.12 BNB = 120000000000000000  ($45)

var newDeposits = function() {
	// Get Contract Balance
	var balance = new web3.eth.getBalance(BNBFury_ADDRESS).then((bal) => {
		var bnbBalance = web3.utils.fromWei(bal, 'ether')

		// only grab the event info if there is a balance in the contract
		if (bnbBalance > 0) {
			console.log('BNB Balance: ' + bnbBalance)
			// get the event details
			bnbfury.getPastEvents('NewDeposit', 
				{
					fromBlock: 16113102,
					toBlock: 'latest'
				}).then((events) => {
					console.log('Number of Transactions: ' + events.length)
					// lets make an aray to hold the events
					var eventsArray = []

					// Garb the details we are intersted in from each event
					events.map(event => {
						// check the amount of BNB invested, only show deposits greater then 0.12 BNB
						let txAmount = event.returnValues.amount;
						let targetAmount = 120000000000000000

						// only show Tx if over 0.12 BNB
						if (txAmount >= targetAmount) {
							var block = event.blockNumber,
									TxHash = event.transactionHash,
									amount = web3.utils.fromWei(event.returnValues.amount, 'ether');
							// add the event details we want ot the array
							eventsArray.push([block, TxHash, amount])
							// log the array to the console
							console.table(eventsArray)
						}
					})
				})

		} else {
			// Get the current block and console log a 0 balance message
			bnbfury.getPastEvents('allEvents').then((events) => {
					events.map(event => {
						var block = event.blockNumber;
						console.log('Event: ', event.event)
						console.log('Current Block: ', block)
					})
				})
			console.log('--------------------------------------')
			console.log('Balance is at 0')
			console.log('--------------------------------------')
		}
	})

}

// run the function to check the contract once every second
setInterval(newDeposits, 1000)




/*********************************************

Phase I: Get the basic data from the smart contract everytime a new Deposit is made
Phase II: Get the code to check the contract every second
	- since websockets kept breaking, I used setInterval, seems to be working fine now
Next Phase: connect to a websocket to get realtime data feed
	- this kind of worked, kept disconneting after every new event captured

Phase III: check the cntract balance just in case
	- 
**********************************************/

