const moment = require('moment');

module.exports = async (member) => {
  let guild = member.guild;
  let memberLog = guild.channels.find('name', 'member-log');
  if (!memberLog) return console.log('Can\'t find it');
  await memberLog.send('', {
    embed: {
      color: 0x00FF00,
      author: {
        name: `${member.user.tag} (${member.user.id})`,
        icon_url: member.user.avatarURL,
      },
      fields: [{
        name: '\u200b',
        value: `User Created | ${moment(member.user.createdTimestamp).format('ddd MMM Do, YYYY [at] h:mm a')}\nUser Joined | ${moment().format('ddd MMM Do, YYYY [at] h:mm a')}`
      }]
    }
  });
};
