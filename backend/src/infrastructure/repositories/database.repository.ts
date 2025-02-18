import { connect } from "http2";
import { Connection } from "typeorm";


export const DatabaseRepositories = [
    {
        provide: 'DATABASE_QUERY',
        useFactory: (connection: Connection) => ({
            exampleRepository: connection.getRepository(Example),
        }),

        inject: ['DATABASE_CONNECTION']
    }
]