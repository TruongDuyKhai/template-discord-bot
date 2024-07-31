console.checked = (type, text) => console.log(`[${type} | ${`✔`.green}] ${text}`);
console.error = (type, text) => console.log(`[${type} | ${`✖`.red}] ${text}`);
console.warning = (type, text) => console.log(`[${type} | ${`⚠`.yellow}] ${text}`);