module.exports = {
    apps: [{
        name: 'web-app',
        script: 'app/server.js',
        env_production: {
            NODE_ENV: 'production',
        },
    },],
    deploy: {
        "production": {
            "user": "nahum",
            "host": "192.168.56.100",
            "ref": "origin/master",
            "repo": "https://github.com/NahumBarradas/Tec-BD-API.git",
            "path": "/home/server/deploy",
            "pre-setup": "pwd",
            "pre-deploy-local": "echo 'This is a local executed command'",
            "post-deploy": "cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production"
        },
    },
};
