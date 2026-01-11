/* 
const { readFiles } = require("@khaidev1012/funcs");

exports.load = () => {
    const commandFiles = readFiles(`${process.cwd()}/commands`, {
        extensions: [".js"],
        noPromise: true,
    })
        .map(require)
        .map((e) => {
            e.data = e.data.setContexts(0).setIntegrationTypes(0);
            return e;
        });
    return commandFiles;
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
    const commandFiles = readFiles(`${process.cwd()}/commands/slash`, {
        extensions: [".js"],
        noPromise: true,
    })
        .map(require)
        .map((e) => {
            e.data = e.data.setContexts(0).setIntegrationTypes(0);
            return e;
        });
    return commandFiles;
};

exports.loadCategories = () => {
    return readFiles(`${process.cwd()}/commands/text`, {
        extensions: [".json"],
        noPromise: true,
    }).map(require);
};
