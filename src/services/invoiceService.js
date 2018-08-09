import knex from '../db/knex.js';


export default class CustomerService {

    constructor() {}

    async createInvoice(payload) {
        try {
            // payload.invoice_products = [{
            //     product_description: 'product_description',
            //     hsn_code: 'hsn_code',
            //     quantity: 1,
            //     rate: 2
            // }]
            const results = await knex('invoice')
                .insert({
                    'customer_id': payload.customer_id,
                    'invoice_date': payload.invoice_date,
                    'dc_no': payload.dc_no,
                    'reverse_charge': payload.reverse_charge,
                    'state': payload.state,
                    'transport_mode': payload.transport_mode,
                    'vehicle_no': payload.vehicle_no,
                    'date_of_supply': payload.date_of_supply,
                    'place_of_supply': payload.place_of_supply,
                    'po_no': payload.po_no,
                    'po_date': payload.po_date,
                    'created_user_guid': 'created_user_guid',
                    'created_date': knex.fn.now(),
                    'modified_user_guid': 'created_user_guid',
                    'modified_date': knex.fn.now()
                }, 'id');

            let batchInvoiceProductRecords = payload.invoice_products.map((record) => {
                record.invoice_id = results[0];
                return record;
            });

            console.log('sdf',batchInvoiceProductRecords )

            knex.batchInsert('invoice_products', batchInvoiceProductRecords)
                .returning('id')
                .then(function (ids) {})
                .catch(function (error) {});
            return true;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }

    async getInvoiceDetails(invoiceId) {
        try {

            let invoiceDetails = {};
            invoiceDetails = await knex
                .select('invoice.id',
                    'invoice.no', 'invoice.customer_id', 'invoice.invoice_date', 'invoice.dc_no',
                    'invoice.reverse_charge', 'invoice.state', 'invoice.transport_mode',
                    'invoice.vehicle_no', 'invoice.date_of_supply',
                    'invoice.place_of_supply', 'invoice.po_no',
                    'invoice.po_date', 'invoice.created_user_guid',
                    'invoice.created_date', 'invoice.modified_user_guid',
                    'invoice.modified_date', 'customer.id',
                    'customer.name AS customer_name', 'customer.address',
                    'customer.state as customer_state',
                ).from('invoice')
                .innerJoin('customer', 'customer.id', 'invoice.customer_id')
                .where('invoice.id', '=', invoiceId);
            invoiceDetails = invoiceDetails[0];
            invoiceDetails.invoice_products = await this.getInvoiceProductDetails(invoiceId);;
            return invoiceDetails;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }

    async getInvoiceProductDetails(invoiceId) {
        try {
            const results = await knex
                .where('invoice_products.invoice_id', '=', invoiceId)
                .select('*').from('invoice_products')
            return results;
        } catch (err) {
            console.log('Error occured ', err);
            throw new Error(err);
        }
    }

}