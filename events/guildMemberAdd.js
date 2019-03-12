const mapping = (function(object) {
    let numbers = [];
    for(let key in object) {
        numbers.push({regex: new RegExp(key, 'ig'), replacement: object[key]
     });
    };
    return numbers;
})({"0": ":zero:", "1": ":one:", "2": ":two:", "3": ":three:", "4": ":four:", "5": ":five:", "6": ":six:", "7": ":seven:", "8": ":eight:", "9": ":nine:"});


module.exports = async function onGuildMemberAdd(member) {
  const memberrole = member.guild.roles.find(r => r.name == "Membro's")
  const message = {
    'content': '',
    'embed': {
      'color': 15614245,
      'description': `➦ Olá ${member}, seja bem vindo(a)!\n➦ Leia as regras do servidor!`,
      'author': {
        'name': `${member.user.username}`,
        'icon_url': member.user.displayAvatarURL
      }
    }
  }

  const channel = process.env.GREETCHANNEL && member.guild.channels.get(process.env.GREETCHANNEL)
  if (channel) channel.send(message)
  if (!channel) return;
  let count = member.guild.memberCount.toString(); 
  mapping.forEach(r => count = count.replace(r.regex, r.replacement));
  channel.setTopic(`Temos ${count} membros no servidor!`); 
  member.setRoles([memberrole])
}

