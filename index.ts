import { Context, Markup, Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import config from "./config.json"
import Payload from "./payload"
import { post } from "axios"
import fs from "node:fs"

const bot = new Telegraf(config.token)
bot.launch()

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

function database(ctx: Context) {
    try {
        const directory = `./database/ticket/${ctx.from.id}`
        return fs.readdirSync(directory, { withFileTypes: true })
    } catch (error: any) {
        if (error.message.startsWith("ENOENT: no such file or directory")) {
            ctx.reply("You don't have any ticket")
        } else {
            console.log(error)
        }
    }
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

bot.help((ctx) => {
    ctx.reply(
        `Available commands:\n/addticket - Add a new ticket to the system\n/showticket - Show list of all tickets in the system\n/other - Link of our other social media`
    )
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

bot.command("addticket", async (ctx) => {
    ctx.reply(`What is your questions ?`)
    bot.on(message("text"), (collect) => {
        const object = {
            User: collect.message.from.id,
            Message: collect.message.text,
            Time: new Date()
        }
        fs.mkdirSync(`./database/ticket/${ctx.from.id}`, { recursive: true })
        fs.writeFileSync(`./database/ticket/${ctx.from.id}/${new Date().getTime()}.json`, JSON.stringify(object))
        return collect.sendMessage("Collected")
    })
    setTimeout(() => {
        return ctx.reply("Time up")
    }, 20000)
})

bot.command("showticket", (ctx) => {
    let keyboard = []
    let f = []
    const c = database(ctx)

    for (const x of c) {
        f.push(x.name.replace(/\\/g, "/").split("/").pop().split(".").shift())
    }
    for (const x of f) {
        keyboard.push([Markup.button.callback(String(new Date(Number(x))), x)])
    }
    ctx.reply("Here is the list of all your tickets", Markup.inlineKeyboard(keyboard))
})

bot.on("callback_query", (ctx: any) => {
    try {
        const c = database(ctx)
        const x = c.find((xf) => xf.name.split(".").shift() === ctx.callbackQuery.data)
        if (x) {
            const xf = require(`${String(x.path)}/${String(x.name)}`)
            ctx.reply(xf.toString)
        } else {
            ctx.reply("No ticket found")
        }
    } catch (error) {
        ctx.reply("An Unknown Error happen to fetching tickets")
        console.log(error)
    }
})

process.on("multipleResolves", () => console.log)
process.on("uncaughtException", () => console.log)
process.on("unhandledRejection", () => console.log)
process.on("uncaughtExceptionMonitor", () => console.log)
