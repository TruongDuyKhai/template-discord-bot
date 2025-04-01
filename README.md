# template-discord-bot

A Discord bot template built with Discord.js, designed for easy customization and expansion.

## Features and Functionality

-   **Slash Command Handling:** Uses Discord.js slash commands for intuitive user interaction. Commands are dynamically loaded from the `commands` directory.
-   **Event Handling:** Handles Discord events, such as `ready`, `guildCreate`, and `interactionCreate`. Events are dynamically loaded from the `events` directory.
-   **Configuration Loading:** Loads configuration settings from the `configs` directory.
-   **Customizable Embeds:** Includes a helper function `client.embed()` for creating standardized and visually appealing embeds. The base embed color is defined in `configs/embed.js`.
-   **Database Support:** Uses QuickDB for simple data persistence. Includes a custom extension `QuickDBExtension` in `extensions/QuickDB.js` with added functionalities like `create`, `crateMany`, `find`, `findOne`, `findOneAndUpdate`, `findOneAndDelete` and `deleteMany`.
-   **Error Handling:** Implements comprehensive error handling to catch and log errors, unhandled rejections, and uncaught exceptions, sending detailed reports to a Discord webhook specified via `process.env.WEBHOOK_LOG`. See `handlers/antiCrash.js`.
-   **Developer Eval Command:** Includes a developer-only `eval` command for executing arbitrary JavaScript code within the bot context (located in `commands/developers/eval.js`). **Use with extreme caution in production environments.**
-   **Automatic Guild Management:** The bot is designed to only operate within a single specified guild (defined by `guildId` in `configs/settings.js`). It automatically leaves any other guilds it's added to.
-   **Express Server (Optional):** Can optionally run an Express server (if `process.env.EXPRESS` is set to `"true"`) to provide a basic health check endpoint, accessible at the port defined in `configs/settings.js`.

## Technology Stack

-   [Node.js](https://nodejs.org/) - JavaScript runtime environment
-   [Discord.js](https://discord.js.org/) - A powerful Node.js module for interacting with the Discord API
-   [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file
-   [QuickDB](https://quickdb.js.org/) - A simple and fast JSON database for Node.js
-   [axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js
-   [@khaidev1012/funcs](https://www.npmjs.com/package/@khaidev1012/funcs) - Package with utility functions

## Prerequisites

-   [Node.js](https://nodejs.org/en/download/) (v16 or higher)
-   [npm](https://www.npmjs.com/) (Node Package Manager)
-   A Discord bot token.
-   A Discord server to add the bot to.
-   Environment variables configured (see `.env.example` below).

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/TruongDuyKhai/template-discord-bot.git
    cd template-discord-bot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    -   Create a `.env` file in the root directory.
    -   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        TOKEN=YOUR_BOT_TOKEN
        PORT=3000 # Optional, if using the express server
        WEBHOOK_LOG=YOUR_WEBHOOK_URL # Webhook for logging errors
        WEBHOOK_BACKUP=YOUR_WEBHOOK_URL # Webhook for database backup
        EXPRESS=true # Set to true to enable the express server, false to disable.
        ```

        **Note:** It's crucial to protect your bot token. Never commit it directly to your repository.

4.  **Configure `configs/settings.js`:**

    -   Open the `configs/settings.js` file.
    -   Set the `token`, `devUserIds`, `ownerUserIds`, `guildId`, and `inviteCode` values according to your bot and server configuration:

        ```javascript
        module.exports = {
            token: process.env.TOKEN || "",
            devUserIds: ["871329074046435338", "1133037157527859230"],
            ownerUserIds: [],
            port: process.env.PORT || 3000,
            guildId: "YOUR_GUILD_ID",
            inviteCode: "YOUR_INVITE_CODE",
        };
        ```

        Replace `YOUR_GUILD_ID` with the ID of the Discord server where you want the bot to operate. Replace `YOUR_INVITE_CODE` with the invite code of your Discord server. Add your Discord user ID to `devUserIds` to use the `eval` command. Add the ID of bot owner to the `ownerUserIds` array.

5.  **Start the bot:**

    ```bash
    npm start
    ```

## Usage Guide

1.  **Invite the bot to your server:**

    -   The bot logs an invite link to the console when it starts. Use this link to invite the bot to your specified guild. The link will be in the following format: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${client.configs.settings.guildId}`

2.  **Interact with the bot using slash commands:**

    -   Type `/` in a Discord channel to see the available commands. The `eval` command is only available to users listed in the `devUserIds` array in `configs/settings.js`.

## API Documentation (Example)

The core `Client` class extends Discord.js' `Client` and adds several helper methods.

-   **`client.embed(description, options = {})`:** Creates a standardized embed object.

    -   `description`: The description of the embed (string or options object).
    -   `options`: An object containing embed properties (e.g., `title`, `color`, `fields`, `footer`). The `color` property overrides the default color defined in `configs/embed.js`.

-   **`client.fetch(url, method, body, timeout = 5000)`:** Makes an HTTP request with a timeout.

    -   `url`: The URL to fetch.
    -   `method`: The HTTP method (e.g., "GET", "POST").
    -   `body`: The request body (optional).
    -   `timeout`: The request timeout in milliseconds (default: 5000).

-   **`client.sendWebhook(url, options)`:** Sends a message to a Discord webhook.

    -   `url`: The webhook URL.
    -   `options`: An object containing the webhook message options (e.g., `content`, `embeds`, `files`).

-   **`client.getUser(id, message, i = 0)`:** Tries to get a user from the id, message, or user cache.
    -   `id`: User ID.
    -   `message`: Discord message object.
    -   `i`: the index of the mentioned user.

The extended QuickDB class contains methods:

-   **`db.create(model, data)`:** Creates data in the model.

    -   `model`: The model name.
    -   `data`: The data to create.

-   **`db.crateMany(model, arrayData)`:** Creates multiple data in the model.

    -   `model`: The model name.
    -   `arrayData`: An array of data to create.

-   **`db.find(model, query = {})`:** Finds data in the model.

    -   `model`: The model name.
    -   `query`: An object containing the query.

-   **`db.findOne(model, query)`:** Finds one data in the model.

    -   `model`: The model name.
    -   `query`: An object containing the query.

-   **`db.findOneAndUpdate(model, query, data)`:** Finds one data and updates it in the model.

    -   `model`: The model name.
    -   `query`: An object containing the query.
    -   `data`: An object containing the data to update.

-   **`db.findOneAndDelete(model, query)`:** Finds one data and deletes it in the model.

    -   `model`: The model name.
    -   `query`: An object containing the query.

-   **`db.deleteMany(model, query)`:** Deletes many data in the model.
    -   `model`: The model name.
    -   `query`: An object containing the query.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request to the `main` branch.

## License Information

License not specified. All rights reserved.

## Contact/Support Information

For questions or support, please contact the repository owner [TruongDuyKhai](https://github.com/TruongDuyKhai) through GitHub.
