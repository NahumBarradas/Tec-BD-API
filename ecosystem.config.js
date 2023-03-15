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
            "host": "192.168.10.80",
            "ref": "origin/master",
            "repo": "https://github.com/NahumBarradas/Tec-BD-API.git",
            "path": "/home/nahum/deploy",
            "pre-setup": "pwd",
            "pre-deploy-local": "echo 'This is a local executed command'",
            "post-deploy": "cp../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production"
        },
    },
};