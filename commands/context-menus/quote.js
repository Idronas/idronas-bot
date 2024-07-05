const { quotesChannelId } = require("../../config.json");
const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    quote,
} = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("quote")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const quotesChannel =
            interaction.client.channels.cache.get(quotesChannelId);
        if (interaction.targetMessage.content.length > 0) {
            const quoteEmbed = new EmbedBuilder()
                .setColor([
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                ])
                .setAuthor({
                    name: `${interaction.targetMessage.author.username} in ${interaction.targetMessage.channel.name}`,
                    iconURL:
                        interaction.targetMessage.author.avatarURL(),
                    url: interaction.targetMessage.url,
                })
                .setDescription(`"${interaction.targetMessage.content}"`)
                .setThumbnail(interaction.targetMessage.attachments?.at(0).url)
                .setTimestamp(interaction.targetMessage.createdTimestamp)
                .setFooter({
                    text: `Quote Posted by: ${interaction.user.username}`,
                    iconURL: `${interaction.user.displayAvatarURL()}`,
                });

            await quotesChannel.send({ embeds: [quoteEmbed] }).then((quote) => {
                interaction.reply(`quote created! ${quote.url}`);
            });
        } else {
            await interaction.reply({
                content: "There was a problem with this message!",
                ephemeral: true,
            });
        }
    },
    path: "../context-menus/quote",
};
