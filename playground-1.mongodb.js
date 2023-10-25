// The current database to use.
use('users');

// Create a new document in the collection with an 'address' field.
db.getCollection('user').insertOne({
    username: 'ROBINDAHOOD',
    name: 'ORIOL',
    surname: 'PORTA',
    id: '48524569D',
    address: {
        country: 'SPAIN',
        street: 'C/ARISTOTIL,BAJOS',
        city: 'SABADELL',
    }
});
