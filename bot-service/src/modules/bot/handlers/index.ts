import { Telegraf } from "telegraf"

import { TelegrafContext } from "@/shared/interfaces"

import { registerStartHandler } from "./start.handler"
import { registerContactHandler } from "./contact.handler"

export function registerBotHandlers(bot: Telegraf<TelegrafContext>) {
  registerStartHandler(bot)
  registerContactHandler(bot)
}
