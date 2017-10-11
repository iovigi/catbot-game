module.exports = function(bot, builder) {
    var thinkNumber;

    bot.dialog('LetPlay', function(session) {
        session.send("Ok, Let play. I will think one number from 1 to 100 and you need to figure it out what is the number :) Let start! :)");
        thinkNumber = Math.floor((Math.random() * 100) + 1);
        session.beginDialog("LetPlayGuessNumber");
    }).triggerAction({
        matches: 'LetPlay'
    })

    bot.dialog("LetPlayGuessNumber", [
        function(session) {
            builder.Prompts.number(session, "Tell me the number :P");
        },
        function(session, args, next) {
            if (args) {

                var guessNumber = args.response;

                if (guessNumber == thinkNumber) {
                    session.send("You found it. You won! :):):):):)");

                    return;
                } else if (guessNumber < thinkNumber) {
                    session.send("Your number is less than my number :) Try again :)");
                } else {
                    session.send("Your number is higher than my number :) Try again :)");
                }
            }

            session.beginDialog("LetPlayGuessNumber");
        }
    ]);
};