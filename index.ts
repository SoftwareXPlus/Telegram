import { Markup, Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import config from "./config.json"
import Payload from "./payload"
import { post } from "axios"

const bot = new Telegraf(config.token)
bot.launch()

bot.start((ctx) => {
    ctx.reply("Hello! I'm your Telegram bot.")
})

bot.help((ctx) => {
    ctx.reply(
        "Available commands:\n/addticket - Add a new ticket to the system\n/showticket - Show list of all tickets in the system\n/other - Link of our other social media'"
    )
})

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

bot.command("addticket", (ctx) => {
    if (ctx.message.chat.type !== "private") return
    ctx.reply("Coming Soon...........")
})

bot.command("showticket", (ctx) => {
    if (ctx.message.chat.type !== "private") return
    ctx.reply("Coming Soon...........")
})

bot.command("other", (ctx) => {
    if (ctx.message.chat.type !== "private") return
    ctx.reply(
        "Check out our social media pages:",
        Markup.inlineKeyboard([
            [{ text: "SoftwareX Plus Discord", url: "https://dsc.gg/SoftwareXPlus" }],
            [{ text: "SoftwareX Plus YouTube", url: "https://www.youtube.com/@SoftwareXPlus" }],
            [{ text: "Floating Sandbox YouTube", url: "https://www.youtube.com/@FloatingSandbox" }],
            [{ text: "SoftwareX Plus Twitter", url: "https://twitter.com/SoftwareXPlus" }],
            [{ text: "SoftwareX Plus GitHub", url: "https://github.com/SoftwareXPlus" }],
            [{ text: "Floating Sandbox Facebook", url: "https://www.facebook.com/FloatingSandbox" }]
        ])
    )
})

async function SendWebhook(payload: Payload) {
    post(config.webhook, payload)
        .then((x) => {
            if (x.status !== 204) {
                console.error("Failed to send webhook message. Status:", x.status)
                console.error("Response data:", x.data)
            }
        })
        .catch(console.log)
}
