"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_json_1 = __importDefault(require("./config.json"));
const axios_1 = __importDefault(require("axios"));
const filters_1 = require("telegraf/filters");
const bot = new telegraf_1.Telegraf(config_json_1.default.token);
bot.start((ctx) => {
    ctx.reply("Hello! I'm your Telegram bot.");
});
bot.help((ctx) => {
    ctx.reply("This is the help message.");
});
bot.on((0, filters_1.message)("text"), (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`);
    SendWebhook({
        embeds: [
            {
                color: 0x5865f2,
                description: ctx.message.text,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${ctx.message.from.last_name
                        ? `${ctx.message.from.first_name} \| ${ctx.message.from.last_name}`
                        : ctx.message.from.first_name} \| @${ctx.message.from.username} \| ${ctx.message.from.id}`
                }
            }
        ]
    });
});
bot.on((0, filters_1.message)("text"), (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`);
});
bot.launch();
async function SendWebhook(payload) {
    axios_1.default
        .post(config_json_1.default.webhook, payload)
        .then((x) => {
        if (x.status !== 204) {
            console.error("Failed to send webhook message. Status:", x.status);
            console.error("Response data:", x.data);
        }
    })
        .catch(console.log);
}
