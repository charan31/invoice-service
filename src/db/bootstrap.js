import knex from './knex';
export class Bootstrap {
    async run() {
        await this.runMigrations();
    }

    async runMigrations() {
        try {
            console.log('running migrations');
            await knex.migrate.latest();
            console.log('running migrations complete.');
        } catch (err) {
            console.log('running migrations failed.');
            console.log(err);
            throw err;
        }
    }
}

const bootstrap = new Bootstrap();
export default bootstrap;