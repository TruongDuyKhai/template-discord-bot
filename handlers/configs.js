const funcs = require("@khaidev1012/funcs");

exports.load = () => {
    var f = {};
    funcs
        .readFiles(`${process.cwd()}/configs`, {
            extensions: [".js"],
            noPromise: true,
        })
        .forEach((file) => {
            var fileName = file.split(/(\\|\/)/g).pop();
            f[
                fileName.substring(0, fileName.lastIndexOf(".")) || fileName
            ] = require(file);
        });
    return f;
};
