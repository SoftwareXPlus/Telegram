import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import Payload from "./payload"

const config = {} as any
const bot = new Telegraf(config.token)
bot.launch()

function SendWebhook(payload: Payload) {
    fetch(config.webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((x) => {
            if (x.status !== 204) {
                console.log("Failed to send webhook message. Status:", x.status)
            }
        })
        .catch(console.trace)
}

bot.on(message("text"), (ctx, next) => {
    SendWebhook({
        embeds: [
            {
                color: 0x5865f2,
                description: ctx.message.text,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${
                        ctx.message.from.last_name
                            ? `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
                            : ctx.message.from.first_name
                    } \| @${ctx.message.from.username} \| ${ctx.message.from.id}`
                }
            }
        ]
    })
    next()
})

bot.start((ctx) =>
    ctx.reply(
        "This bot is in development. Check out development status on [Github](https://github.com/softwarexplus/Telegram)",
        { parse_mode: "Markdown" }
    )
)

process.on("multipleResolves", console.trace)
process.on("uncaughtException", console.trace)
process.on("unhandledRejection", console.trace)
process.on("uncaughtExceptionMonitor", console.trace)
