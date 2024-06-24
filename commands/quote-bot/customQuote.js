const { quotesChannelId } = require("../../config.json");
const {
    SlashCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    quote,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("customquote")
        .setDescription("Create a custom quote")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("discord")
                .setDescription("quote a discord user")
                .addUserOption((option) =>
                    option
                        .setName("target")
                        .setDescription("The user")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("text")
                        .setDescription("Quote Text")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("irl")
                .setDescription("quote a normie")
                .addStringOption((option) =>
                    option
                        .setName("target")
                        .setDescription("The normie")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("text")
                        .setDescription("Quote Text")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const quotesChannel =
            interaction.client.channels.cache.get(quotesChannelId);

        user = null;
        quoteSayer = null;
        quoteSayerIconURL = null;
        text = interaction.options.getString("text")

        if (interaction.options.getSubcommand() === "discord") {
            user = interaction.options.getUser("target");
            quoteSayer = user.username;
            quoteSayerIconURL = user.displayAvatarURL();
        }
        if (interaction.options.getSubcommand() === "irl") { 
            quoteSayer = interaction.options.getString("target");
        }

        const quoteEmbed = new EmbedBuilder()
            .setColor([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
            ])
            .setAuthor({
                name: quoteSayer,
                iconURL: quoteSayerIconURL,
            })
            .setDescription(`"${text}"`)
            .setTimestamp(Date.now())
            .setFooter({
                text: `Quote Posted by: ${interaction.user.username}`,
                iconURL: `${interaction.user.displayAvatarURL()}`
            });

        await quotesChannel.send({ embeds: [quoteEmbed] }).then((quote) => {
            interaction.reply(`quote created! ${quote.url}`);
        });

        // await interaction.reply({
        //     content: "There was a problem with this message!",
        //     ephemeral: true,
        // });
    },
    path: "../quote-bot/customQuote",
};
