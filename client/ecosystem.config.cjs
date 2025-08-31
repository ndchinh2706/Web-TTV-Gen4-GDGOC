module.exports = {
  apps: [
    {
      name: 'gdgoc-frontend',
      script: 'npx',
      args: ['serve', '-s', 'dist', '-p', '3000'],
      instances: 1,
      exec_mode: 'fork',
      cwd: '/home/guser/Web-TTV-Gen4-GDGOC/client',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/pm2_error.log',
      out_file: './logs/pm2_out.log',
      log_file: './logs/pm2_combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      watch: false
    }
  ]
};
