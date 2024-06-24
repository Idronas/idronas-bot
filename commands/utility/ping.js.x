const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .addStringOption((option) =>
            option.setName("input").setDescription("this is an option wow")
        )
        .addChannelOption((option) =>
            option.setName("channel").setDescription("the channel to ping")
        )
        .addBooleanOption((option) =>
            option
                .setName("ephemeral")
                .setDescription("whether or not the ping will be ephemeral")
        ),
    async execute(interaction) {
        await interaction.reply("Pong!");
        const message = await interaction.fetchReply();
        //console.log(message);
    },
    path: "../utility/ping"
};
