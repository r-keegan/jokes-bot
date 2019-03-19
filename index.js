var request = require("request")
var SlackBot = require("slackbots")


const envKey = process.env.JOKES_BOT_TOKEN

//create a bot
var bot = new SlackBot({
    token: envKey,
    name: "Jokes Bot"
})

bot.on("message", msg => {
    switch (msg.type) {
        case "message":
            if (msg.channel[0] === "D" && msg.bot_id === undefined) {
                getRandomJoke(postMessage, msg.user)
            }
            break
    }
})

const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
}

const getRandomJoke = (callback, user) => {
    return request("https://icanhazdadjoke.com/slack", (error, response) => {
        if (error) {
            console.log("Error: ", error)
        } else {
            let jokeJSON = JSON.parse(response.body)
            let joke = jokeJSON.attachments[0].text
            return callback(joke, user)
        }
    })
}