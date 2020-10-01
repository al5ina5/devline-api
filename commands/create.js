var { createChannel, createJobPosting } = require('../lib/lib')

exports.run = (client, message, args) => {
    // createChannel(`test`, [message.author.id])
    createJobPosting({
        description:
            'Culpa sint excepteur qui incididunt reprehenderit ex enim dolore. Ullamco ex magna magna consequat duis ea minim enim et. Cupidatat duis id enim duis reprehenderit ipsum ad consectetur nisi aute. Enim cupidatat proident irure velit eu non.',
        skillset: ['react', 'express', 'php']
    })
}

exports.help =
    'Just an example command. Usage: `${process.env.BOT_PREFIX}example`'
exports.aliases = ['test', 'admin']
