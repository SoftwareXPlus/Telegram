import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import config from "./config.json"
import Payload from "./payload"
import axios from "axios"
const bot = new Telegraf(config.token)

bot.start((ctx) => {
    ctx.reply("Hello! I'm your Telegram bot.")
})

bot.help((ctx) => {
    ctx.reply("This is the help message.")
})

bot.on(message("text"), (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`)
    SendWebhook({
        embeds: [
            {
                color: 0x5865f2,
                description: ctx.message.text,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${
                        ctx.message.from.last_name
                            ? `${ctx.message.from.first_name} \| ${ctx.message.from.last_name}`
                            : ctx.message.from.first_name
                    } \| @${ctx.message.from.username} \| ${ctx.message.from.id}`
                }
            }
        ]
    })
})

bot.on(message("text"), (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`)
})

bot.launch()

async function SendWebhook(payload: Payload) {
    axios
        .post(config.webhook, payload)
        .then((x) => {
            if (x.status !== 204) {
                console.error("Failed to send webhook message. Status:", x.status)
                console.error("Response data:", x.data)
            }
        })
        .catch(console.log)
}
