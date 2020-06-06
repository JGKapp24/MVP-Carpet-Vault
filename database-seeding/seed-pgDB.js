const path = require('path');
const db = require('../database/index.js');

const clearDb = () => db.query('DROP TABLE IF EXISTS vendors CASCADE')
  .then(() => db.query('DROP TABLE IF EXISTS carriers CASCADE'))
  .then(() => db.query('DROP TABLE IF EXISTS shipments CASCADE'))
  .then(() => db.query('DROP TABLE IF EXISTS carpet'));

const createVendorsTable = () => {
  const sqlString = `CREATE TABLE vendors(
    vendor_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(60)
  )`;

  return db.query(sqlString);
};

const createCarriersTable = () => {
  const sqlString = `CREATE TABLE carriers(
    carrier_id SERIAL PRIMARY KEY,
    carrier_name VARCHAR(30)
  )`;

  return db.query(sqlString);
};

const createShipmentsTable = () => {
  const sqlString = `CREATE TABLE shipments(
    shipment_id SERIAL PRIMARY KEY,
    trailer_num INT,
    ship_date DATE,
    carrier_id INT REFERENCES carriers (carrier_id)
  )`;

  return db.query(sqlString);
};

const createCarpetTable = () => {
  const sqlString = `CREATE TABLE carpet(
    carpet_id SERIAL PRIMARY KEY,
    roll_num VARCHAR(20),
    shipment_id INT REFERENCES shipments (shipment_id),
    shipper_id INT REFERENCES vendors (vendor_id),
    consignee_id INT REFERENCES vendors (vendor_id),
    piece_qty INT,
    roll_width REAL,
    roll_length REAL,
    roll_yards REAL,
    tag_num INT,
    location VARCHAR(6),
    tag_date DATE,
    location_date DATE
  )`;

  return db.query(sqlString);
};

const seedVendors = () => {
  const pathToCSV = process.env.NODE_ENV === 'prod' ? '' : path.resolve(__dirname, './vendors.csv');
  const sqlString = `COPY vendors(vendor_name) FROM '${pathToCSV}' DELIMITER ',' CSV HEADER`;

  return db.query(sqlString);
};

const seedCarrier = () => {
  const sqlString = 'INSERT INTO carriers (carrier_name) VALUES ($1)';

  return db.query(sqlString, ['Storey']);
};

const seedShipment = () => {
  const sqlString = `INSERT INTO shipments (trailer_num, ship_date, carrier_id)
  VALUES ($1, $2, $3)`;
  const sqlValues = [5475, '2020-06-05', 1];

  return db.query(sqlString, sqlValues);
};

const seedCarpet = () => {
  const pathToCSV = process.env.NODE_ENV === 'prod' ? '' : path.resolve(__dirname, './carpet.csv');
  const sqlString = `COPY carpet(
    roll_num, shipment_id, shipper_id, consignee_id, piece_qty, roll_width, roll_length, roll_yards
  ) FROM '${pathToCSV}' DELIMITER ',' CSV HEADER`;

  return db.query(sqlString);
};

clearDb()
  .then(() => console.log('Cleared Database now creating vendors table'))
  .then(createVendorsTable)
  .then(() => console.log('Now creating carriers table'))
  .then(createCarriersTable)
  .then(() => console.log('Now creating shipments table'))
  .then(createShipmentsTable)
  .then(() => console.log('Now creating carpet table'))
  .then(createCarpetTable)
  .then(() => console.log('Now seeding vendors'))
  .then(seedVendors)
  .then(() => console.log('Now seeding carriers'))
  .then(seedCarrier)
  .then(() => console.log('Now seeding shipments'))
  .then(seedShipment)
  .then(() => console.log('Now seeding carpet'))
  .then(seedCarpet)
  .then(() => console.log('Finished - exiting'))
  .then(process.exit);
