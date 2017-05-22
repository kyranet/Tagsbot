exports.run = async (client, message, args) => {

  let reason = args.splice(1, args.length).join(' ');
  let guild = message.guild;
  let person = message.mentions.users.first();
  try {
    if (!reason) return await message.reply('You must supply a reason for the kick.');
    if (!guild.me.permissions.has('KICK_MEMBERS')) return await message.reply('I do not have the correct permissions');
    if (!person) return await message.reply('You must mention someone to kick them.');
    if (!message.guild.member(person).kickable) return await message.reply('This member is not kickable.');
    await person.send(`${person.username}, you have been kicked from **${guild.name}** because _${reason}_`);
    await guild.member(person).kick(reason);
    await message.reply(`Successfully kicked: ${person.username}`);
  } catch (error) {
    await guild.member(person).kick(reason);
    await message.reply(`Successfully kicked: ${person.username}`);
    console.log(error);
  }
};

exports.conf = {
  aliases: ['boot', 'toss'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'kicks a user from the server.',
  usage: 'kick <mention> <reason>',
  category:'Moderation',
};
