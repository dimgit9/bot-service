import { Markup, Telegraf } from "telegraf"

import type { TelegrafContext } from "@/shared/interfaces"
import { CONFIG } from "@/config"

export function registerStartHandler(bot: Telegraf<TelegrafContext>) {
  bot.start(async (ctx) => {
    const sessionId = ctx.payload

    if (!sessionId) {
      return ctx.reply(
        "Здравствуйте! Чтобы продолжить, пожалуйста, авторизуйтесь на сайте",
        Markup.inlineKeyboard([
          [
            Markup.button.url(
              "Перейти к авторизации",
              `${CONFIG.TELEGRAM_REDIRECT_ORIGIN}/auth/login`,
            ),
          ],
        ]),
      )
    }

    ctx.session.id = sessionId

    await ctx.reply(
      "Для завершения регистрации отправьте свой номер телефона",
      Markup.keyboard([[Markup.button.contactRequest("Поделиться номером")]]),
    )
  })
}
