var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.PORT || 3000, function () {
   console.log('%s listening to %s', server.name, server.url);
});

console.log(process.env.APP_ID);
console.log(process.env.APP_PASSWORD);


var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Sorry, I am not smart enough");
});

var luisModel = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c643a5ff-cd26-4ba3-8e66-a7aac1c7af4d?subscription-key=b941ec65336246d3bb59dc4f0aa996c1&timezoneOffset=0&verbose=true";

var recognizer = new builder.LuisRecognizer(luisModel);

bot.recognizer(recognizer);

bot.dialog('Hello', function (session) {
    session.send("Hello there! :) I am cat bot :)");
}).triggerAction({
    matches: 'Hello'
});

bot.dialog('HowAreYou', function (session) {
    session.send("I am fine, thank you :)");
}).triggerAction({
    matches: 'HowAreYou'
});



var game = require('./game');

game(bot,builder);