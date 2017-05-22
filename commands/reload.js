exports.run = async (client, msg, params) => {
  let command;
  if (client.commands.has(params[0])) {
    command = params[0];
  } else if (client.aliases.has(params[0])) {
    command = client.aliases.get(params[0]);
  }

  if (!command) {
    return msg.channel.send(`I cannot find the command: ${params[0]}`);
  } else {
    const m = await msg.channel.send(`Reloading: ${command}`);
    try {
      client.reload(command);
      m.edit(`Successfully reloaded: ${command}`);
    } catch (e) {
      m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
    }
  }
};

exports.conf = {
  aliases: ['r', 'rld', 'refresh'],
  permLevel: 3
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  usage: 'reload <commandname>',
  category:'System'
};
