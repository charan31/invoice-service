
exports.up = function (knex, Promise) {
    return Promise.all([
      knex.schema.hasTable('customer').then(async (isTableExist) => {
        if (!isTableExist) {
          await knex.schema.createTable('customer', table => {
            table.increments('id');
            table.string('name');
            table.string('address');
            table.string('state');
            table.string('created_user_guid');
            table.dateTime('created_date').defaultTo(knex.fn.now());
            table.string('modified_user_guid');
            table.dateTime('modified_date');
            table.string('deleted_user_guid');
            table.dateTime('deleted_date');
          });
        }
        return Promise.resolve(true);
      }), 
      knex.schema.hasTable('invoice').then(async (isTableExist) => {
        if (!isTableExist) {
          await knex.schema.createTable('invoice', table => {
            table.increments('id');
            table.string('no');
            table.integer('customer_id');
            table.string('invoice_date');
            table.string('dc_no');
            table.string('reverse_charge');
            table.string('state');
            table.string('transport_mode');
            table.string('vehicle_no');
            table.string('date_of_supply');
            table.string('place_of_supply');
            table.string('po_no');
            table.string('po_date');
            table.string('created_user_guid');
            table.dateTime('created_date').defaultTo(knex.fn.now());
            table.string('modified_user_guid');
            table.dateTime('modified_date');
            table.string('deleted_user_guid');
            table.dateTime('deleted_date');
          });
        }
        return Promise.resolve(true);
      }),
      knex.schema.hasTable('invoice_products').then(async (isTableExist) => {
        if (!isTableExist) {
          await knex.schema.createTable('invoice_products', table => {
            table.increments('id');
            table.integer('invoice_id');
            table.string('product_description');
            table.string('hsn_code');
            table.string('quantity');
            table.string('rate');
            table.string('created_user_guid');
            table.dateTime('created_date').defaultTo(knex.fn.now());
            table.string('modified_user_guid');
            table.dateTime('modified_date');
            table.string('deleted_user_guid');
            table.dateTime('deleted_date');
          });
        }
        return Promise.resolve(true);
      })
    ]);
  
  };
  
  exports.down = function (knex, Promise) {
    return Promise.resolve(true);
  };
  