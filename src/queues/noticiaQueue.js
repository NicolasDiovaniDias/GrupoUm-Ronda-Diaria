const { Queue } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379)
};

const noticiaQueue = new Queue('noticiasQueue', { connection });

console.log(`Fila 'noticiasQueue' configurada para conectar em ${connection.host}:${connection.port}`);

module.exports = noticiaQueue;
