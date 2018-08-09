import knex from '../db/knex.js';


export default class CustomerService {

    constructor() {}

    async createCustomer(payload) {
        try {
            const results = await knex('customer')
                .insert({
                    'name': payload.name,
                    'address': payload.address,
                    'state': payload.state,
                    'created_user_guid': 'cashReceiptObj',
                    'created_date': knex.fn.now(),
                    'modified_user_guid': 'cashReceiptObj',
                    'modified_date': knex.fn.now()
                });
            return true;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }

    async getCustomers(payload) {
        try {
            const results = await knex('customer')
                .select('id', 'name', 'address', 'state', 'created_user_guid',
                    'created_date', 'modified_user_guid', 'modified_date'
                )
                .orderBy('created_date', 'desc');
            return results;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }

    async getCustomer(customerId) {
        try {
            const results = await knex('customer')
                .where({
                    'id': 1
                })
                .select('id', 'name', 'address', 'state', 'created_user_guid',
                    'created_date', 'modified_user_guid', 'modified_date'
                );
            return results;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }
}