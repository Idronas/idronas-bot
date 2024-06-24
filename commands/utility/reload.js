const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads a command.")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("The command to reload.")
                .setRequired(true)
        ),
    async execute(interaction) {
        // get the name of the command to reload
        const commandName = interaction.options
            .getString("command", true)
            .toLowerCase();
        const command = interaction.client.commands.get(commandName);

        // if that conmmand does not exist return error
        if (!command) {
            return interaction.reply(
                `There is no command with name \`${commandName}\`!`
            );
        }

        //delete command from require cache
        delete require.cache[require.resolve(`${command.path}.js`)];

        // then re-require the command, this is done by overwriting it in the collection, in case the require fails the command will not be deleted
        try {
            const newCommand = require(`${command.path}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(
                `Command \`${newCommand.data.name}\` was reloaded!`
            );
        } catch (error) {
            console.error(error);
            await interaction.reply(
                `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
            );
        }
    },
    path: "../utility/reload"
};
