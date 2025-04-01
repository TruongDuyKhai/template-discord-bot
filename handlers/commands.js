const { readFiles } = require("@khaidev1012/funcs");

exports.load = () => {
    return readFiles(`${process.cwd()}/commands`, {
        extensions: [".js"],
        noPromise: true,
    }).map(require);
};
