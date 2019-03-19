var request = require("request");
var SlackBot = require("slackbots");

const thanksMeme = "https://i.pinimg.com/originals/9f/85/6b/9f856bf0211eca6a4a6fe7b98bb51ade.jpg";
const envKey = process.env.JOKES_BOT_TOKEN;

//create a bot
var bot = new SlackBot({
    token: envKey,
    name: "Jokes Bot"
});


bot.on("message", msg => {
    switch (msg.type) {
        case "message":
            let msgText = msg.text;
            console.log(msgText);
            if (msgText.toUpperCase().includes("JOKE")) {
                if (msg.channel[0] === "D" && msg.bot_id === undefined) {
                    getRandomJoke(postMessage, msg.user);
                }
            } else if (msgText.toUpperCase().includes("THANKS")) {
                postThanksMeme(postMessage, msg.user);
            }
            break;

    }
});

const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
};

const postThanksMeme = (callback, user) => {
    return callback(thanksMeme, user);
}

const getRandomJoke = (callback, user) => {
    return request("https://icanhazdadjoke.com/slack", (error, response) => {
        if (error) {
            console.log("Error: ", error)
        } else {
            let jokeJSON = JSON.parse(response.body);
            let joke = jokeJSON.attachments[0].text;
            return callback(joke, user)
        }
    })
};