const steamAccount = require('steam-user');
const steamTotp = require('steam-totp');
const keepAlive = require('./keepAlive.js');

var username = ""; // Steam username
var password = ""; // Steam password
var sharedSecret = ""; //Steam shared secret - not required if you don't have 2FA enabled

var game = [730]; // CS:GO game id, change it if needed!

var online_status = 1; // 1 = Online, 2 = Busy, 3 = Away, 4 = Snooze, 5 = Looking to trade, 6 = Looking to play 

user = new steamAccount();
try {
    user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(sharedSecret)});
} catch (err) {
    console.log(err);
}
user.on('loggedOn', () => {
    if (user.steamID != null) console.log("Logged in as " + user.steamID);
    user.setPersona(online_status);
    user.gamesPlayed(game);
});