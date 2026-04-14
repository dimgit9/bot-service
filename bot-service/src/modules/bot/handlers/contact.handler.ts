import { Telegraf } from "telegraf"
import {
  TelegramCompleteRequest,
  TelegramCompleteResponse,
} from "@dimgit9/contracts/gen/ts/auth"

import { CONFIG } from "@/config"
import type { TelegrafContext } from "@/shared/interfaces"
import { callUnary } from "@/shared/utils"
import { authClient } from "@/infrastructure/grpc/auth.client"

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
  bot.on("contact", async (ctx) => {
    const phone = ctx.message.contact.phone_number

    if (!ctx.chat.id || !ctx.session.id)
      return ctx.reply(
        "Произошла ошибка. Пожалуйста, начните процесс заново через сайт",
      )

    const request: TelegramCompleteRequest = {
      sessionId: ctx.session.id,
      phone,
    }

    const { sessionId } = await callUnary<TelegramCompleteResponse>(
      authClient.telegramComplete.bind(authClient),
      request,
    )

    await ctx.reply("Регистрация успешно завершена!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Вернуться на сайт",
              url: `${CONFIG.TELEGRAM_REDIRECT_ORIGIN}/auth/tg-finalize?session_id=${sessionId}`,
            },
          ],
        ],
        remove_keyboard: true,
      },
    })
  })
}
