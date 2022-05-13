export const log4js = {
    appenders: {
        out: {
            type: 'stdout',
            layout: { type: 'basic' }
        },
        file: {
            type: 'file',
            filename: 'logs/sdk.log',
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy/MM/dd:hh.mm.ss}] %p %c - %m%n'
            }
        }
    },
    categories: { default: { appenders: ['file'], level: 'info' } }
};
