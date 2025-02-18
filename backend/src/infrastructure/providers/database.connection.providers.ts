import { DataSource } from "typeorm"


export const databaseConnectionProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                //port: process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.ENVIRONMENT === 'production'
                            ? process.env.DATABASE_PRODUCTION
                            : process.env.DATABASE_DEVELOPMENT,
                entities: [
                    __dirname + '/../../main/entities/*.entity{.ts,.js}'
                ],
                synchronize: false,
            });

        return dataSource.initialize();
        }
    }
]