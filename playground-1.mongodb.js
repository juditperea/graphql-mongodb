
// The current database to use.
use('users');

// Create a new document in the collection.
db.getCollection('user').insertOne({
    username: 'MAXPOWER',
    name: 'JUDIT',
    surname: 'PEREA',
    country: 'SPAIN',
    id: '49220078D'
});
