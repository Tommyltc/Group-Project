module.exports = {
    apps: [
        {
            name: "web",
            script: "./server.js",
            watch: false, // Must restart pm2 after deploy
            exec_mode: "cluster",
            instances: "max",
            env: {
                NODE_ENV: "production",
                HOST: "0.0.0.0",
                PORT: 8080,
            },
        },
    ],
};
