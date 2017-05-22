const options = {
  errors: ['time'],
  max: 1,
  time: 30000
};

exports.run = async (client, message) => {
  try {
    await message.channel.send('Are you sure you want to reboot?\n\nReply with \`cancel\` to abort the reboot. The reboot will self-abort in 30 seconds');
    const resp = await message.channel.awaitMessages(m => m.author.id === message.author.id, options);

    if (!resp) return;
    const response = resp.first();
    let validAnswers = ['yes', 'y', 'no', 'n', 'cancel'];
    if (validAnswers.includes(response.content)) {
      if (/\b(cancel|no?)\b/.test(response.content)) {
        await message.channel.send('Aborting reboot');
      } else if (/\by(es)?\b/.test(response.content)) {
        await client.destroy();
        process.exit();
      }
    } else {
      await message.channel.send(`Only \`${validAnswers.join('`, `')}\` are valid, please supply one of those.`);
    }
  } catch (error) {
    console.error(error);
    message.channel.send('Reboot timed out');
  }
};
exports.conf = {
  aliases: ['restart'],
  permLevel: 10
};

exports.help = {
  name: 'reboot',
  description: 'This reboots the bot.',
  usage: 'reboot',
  category:'System'
};
