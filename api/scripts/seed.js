const path = require('path');
const { Seeder } = require('mongo-seeding');

const configSeed = {
    database: {
        name: 'employee-app'
    },
    dropDatabase: true
}

const seeder = new Seeder(configSeed);
const collections = seeder.readCollectionsFromPath(
    path.resolve('./setup/database')
);

seeder
    .import(collections)
    .then(() => {
        console.log(collections)
        console.log('Success');
    })
    .catch(error => {
        console.log('Error', error);
    });