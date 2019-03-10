const Command = require('../strucutres/Command')
const {
  RichEmbed
} = require('discord.js')
class Help extends Command {
  constructor(client) {
    super(client)
    this.category = 'Help'
    this.description = 'Mostra todos os comandos disponíveis do bot.'
  }

  async run(message, _, {
    prefix
  }) {
    const embed = new RichEmbed()
      .setColor(15614245)
      .setTitle('Lista de Comandos')
      .setDescription('➦ Todos os comandos disponíveis')

    for (const command of this.client.commands.array()) {
      if (command.name !== 'help') {
        if (command.category == 'Dono' && message.author.id == process.env.OWNERID) {
          const permissions = message.guild && command.permissions.filter(p => !message.channel.permissionsFor(message.member).has(p)).map(p => `\`${p}\``)
          if (permissions.length == 0) {
            embed.addField(`**${command.name}**`, `**Descrição**: ${command.description}\n **Como Usar**: ${command.getUsage(prefix)}`)
          }
        }
      }
    }

    try {
      const m = await message.author.send(embed)
      await message.react('👌')
    } catch (_) {
      message.reply('Desculpe, mas eu não tenho permissões para enviar mensagens por DM para você!')
    }
  }
}

module.exports = Help
