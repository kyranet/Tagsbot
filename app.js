const Discord = require('discord.js');

const client = new Discord.Client();
client.sql = require('sqlite');

client.sql.open('./tagsbot.sqlite');
const config = require('./config.json');
const moment = require('moment');
const fs = require('fs');
require('./util/eventLoader')(client);

client.login(config.token);
const log = (message) => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach((f) => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. ✔`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = (command) => {
  delete require.cache[require.resolve(`./commands/${command}`)];
  const newCmd = require(`./commands/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });

  client.commands.set(command, newCmd);
  newCmd.conf.aliases.forEach((alias) => {
    client.aliases.set(alias, newCmd.help.name);
  });
};

client.elevation = (message) => {
  let permlvl = 0;
  if (config.ownerId.includes(message.author.id)) return 10;
  if (!message.guild) return permlvl;
  if (message.guild) {
    const modRole = message.guild.roles.find('name', config.modRole);
    if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;

    const adminRole = message.guild.roles.find('name', config.adminRole);
    if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;

    if (message.author.id === message.guild.owner.id) permlvl = 4;
  }
  return permlvl;
};

process.on('unhandledRejection', (err) => {
  console.error(`Uncaught Promise Error: \n${err}`);
});
