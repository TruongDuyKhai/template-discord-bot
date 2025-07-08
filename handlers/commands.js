/* const { readFiles } = require("@khaidev1012/funcs");

exports.load = () => {
    return readFiles(`${process.cwd()}/commands`, {
        extensions: [".js"],
        noPromise: true,
    }).map(require);
};
 */
const { readFiles } = require("@khaidev1012/funcs");

exports.loadTextCommands = () => {
    const commandFiles = readFiles(`${process.cwd()}/commands/text`, {
        extensions: [".js", ".json"],
        noPromise: true,
    });
    var res = [];
    commandFiles.forEach((commandFile) => {
        if (commandFile.endsWith(".json")) return;
        const command = require(commandFile);
        command.config = commandFiles.find(
            (e) =>
                e.endsWith(".json") && require(e).category === command.category
        );
        res.push(command);
    });
    return res;
};

exports.loadSlashCommands = () => {
    return readFiles(`${process.cwd()}/commands/slash`, {
        extensions: [".js"],
        noPromise: true,
    }).map(require);
};

exports.loadCategories = () => {
    return readFiles(`${process.cwd()}/commands/text`, {
        extensions: [".json"],
        noPromise: true,
    }).map(require);
};
