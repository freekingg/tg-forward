const TelegramBot = require("node-telegram-bot-api");

// 机器人token
const token = "5123537610:AAFHmEPzHEuEhT-yLIXwLBsvTd5WYpu5k8c";

// 机器人用户名
const botUsername = 'leoyydsBot'

// 转发目标用户ID  可能过@userinfobot进行获取
const targetUserId = 5184261552


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const chatText = msg.text;
  console.log("msg", msg);

  // 群组内的只接收@转发
  if (chatId < 0) {
    let reg = new RegExp(`^@${botUsername}`);
    if (reg.test(chatText)) {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "👌🏻👌🏻👌🏻",
                url: `https://t.me/${botUsername}`,
              },
            ],
          ],
        },
      };
      bot.sendMessage(chatId, "Ok received your message", opts);
      bot.sendMessage(targetUserId, chatText);
    }
    return
  }

  // 转发私聊
  let message = {
    text:chatText,
    from:chatId,
    sendName:msg.chat.first_name,
  }
  if(msg.reply_to_message){
    let reply_to_message = JSON.parse(msg.reply_to_message.text)
    bot.sendMessage(reply_to_message.from, msg.text);
    return
  }else{
    if(chatText !== '/start'){
      bot.sendMessage(targetUserId, JSON.stringify(message));
    }
  }
});
