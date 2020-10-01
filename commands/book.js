var { createChannel, createJobPosting, getConversation } = require('../lib/lib')
var db = require('../lib/db')
exports.run = (client, message, args) => {
    var jobID = args[1]

    if (!jobID) return message.channel.send('No code.')

    createChannel(
        message.author.username,
        [message.author.id],
        async (channel) => {
            var webhook = await channel.createWebhook(message.author.username)
            var job = await db.Job.findByIdAndUpdate(
                jobID,
                {
                    channel: {
                        id: channel.id,
                        webhook: webhook.url,
                        helper: message.author.id
                    }
                },
                (error, docs) => {
                    if (error) return console.log(error)
                    console.log(docs)
                }
            )
            await job.save()
        }
    )
    // createJobPosting({
    //     description:
    //         'Nostrud tempor consequat quis cillum eu ut ex sunt commodo ex exercitation elit dolor duis. Ad sint aliqua quis aliqua sit elit occaecat. Lorem consequat aliqua ipsum officia eiusmod ad cupidatat nisi aliqua. Officia commodo aute exercitation magna commodo eu nulla do excepteur. Consequat aliquip ipsum velit mollit ipsum eu culpa velit et amet. Cupidatat nisi ad reprehenderit voluptate do officia veniam id.',
    //     skillset: ['html', 'react']
    // })
}

exports.help =
    'Just an example command. Usage: `${process.env.BOT_PREFIX}example`'
exports.aliases = ['test', 'admin']
