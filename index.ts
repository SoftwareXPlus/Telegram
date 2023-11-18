import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import { QuickDB } from "quick.db"
import config from "./config.json"
import Payload from "./payload"
import "node-fetch"

const bot = new Telegraf(config.token)
const db = new QuickDB()
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

bot.help((ctx) => {
    // if (ctx.message.chat.type !== "private") return
    // ctx.reply(
    //     "Welcome to SoftwareX Plus bot. This bot is in development Check out our social media pages:",
    //     Markup.inlineKeyboard([
    //         [{ text: "SoftwareX Plus Discord", url: "https://dsc.gg/SoftwareXPlus" }],
    //         [{ text: "SoftwareX Plus YouTube", url: "https://www.youtube.com/@SoftwareXPlus" }],
    //         [{ text: "Floating Sandbox YouTube", url: "https://www.youtube.com/@FloatingSandbox" }],
    //         [{ text: "SoftwareX Plus Twitter", url: "https://twitter.com/SoftwareXPlus" }],
    //         [{ text: "SoftwareX Plus GitHub", url: "https://github.com/SoftwareXPlus" }],
    //         [{ text: "Floating Sandbox Facebook", url: "https://www.facebook.com/FloatingSandbox" }]
    //     ])
    // )
})

bot.command("config", (ctx) => {
    // if (ctx.message.from.id !== 1288318509) return ctx.reply("An unknown error happen")
    // ctx.reply(
    //     "Config Option",
    //     Markup.inlineKeyboard([
    //         [
    //             Markup.button.callback("Add Moderator", "add-moderator"),
    //             Markup.button.callback("Remove Moderator", "remove-moderator")
    //         ],
    //         [
    //             Markup.button.callback("Add Support", "add-support"),
    //             Markup.button.callback("Remove Support", "remove-support")
    //         ]
    //     ])
    // )
})

process.on("multipleResolves", () => console.trace)
process.on("uncaughtException", () => console.trace)
process.on("unhandledRejection", () => console.trace)
process.on("uncaughtExceptionMonitor", () => console.trace)
