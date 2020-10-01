const shortid = require('shortid')

var Discord = require('discord.js')
var { client } = require('../bot')

var db = require('./db')

exports.createChannel = (channelName, allowedUsers, callback) => {
    client.guilds.fetch(process.env.DISCORD_SERVER_ID).then((guild) => {
        var channels = guild.channels

        var name = `${channelName}-${shortid.generate()}`
        channels
            .create(name, {
                parent: process.env.DISCORD_SESSION_CATEGORY_ID
            })
            .then((channel) => {
                var perms = allowedUsers.map((user, index) => {
                    return {
                        id: user,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                })

                channel.overwritePermissions([
                    {
                        id: guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    ...perms
                ])

                if (callback) callback(channel)
            })
    })
}

exports.getConversation = () => {
    client.channels.fetch('761064783457288192').then((channel) => {
        channel.messages.fetch().then((messages) => {
            messages.map((message, index) => {
                console.log(message.author.tag, message.content)
            })
        })
    })
}

exports.createJobPosting = async (params) => {
    var title = params.title || 'New Job Posting'
    var description = params.description || 'No information... :('
    var skillset = params.skillset || ['none']

    const job = new db.Job({
        title,
        description,
        skillset,
        channel: {},
        isPaid:false,
    })
    await job.save()

    var embed = new Discord.MessageEmbed()
        .setTitle('New Job Posting')
        .setColor('#3CD67F')
        .setDescription(description)
        .addField(
            'Skillset',
            skillset.map((skill) => `\`${skill}\``).join(', ')
        )
        .addField('Available?', `To claim this job, type \`+book ${job._id}\`.`)
        .setFooter(
            `Job ID: ${job._id}`,
            'https://assets.processtruth.com/avatars/ToyFaces_Transparent_BG_120_Small.png'
        )

    client.channels
        .fetch(process.env.DISCORD_VIP_JOB_BOARD_CHANNEL_ID)
        .then(async (channel) => {
            channel.send(embed)
        })
    setTimeout(() => {
        client.channels
            .fetch(process.env.DISCORD_JOB_BOARD_CHANNEL_ID)
            .then(async (channel) => {
                channel.send(embed)
            })
    }, 60 * 1000 * 3)
}
