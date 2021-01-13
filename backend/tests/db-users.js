const User = require('../library/model/user');
const bcryptjs = require('bcryptjs');
const crypto = require("crypto");

async function initial() {
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");

    bcryptjs.genSalt(parseInt(process.env.BCRYPT_SALT, 10), (err, salt) => {
        bcryptjs.hash('1234', salt, (err, hash) => {
            User.create({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                password: hash,
                favorites: [],
                images: [],
            }).then(value => {
                User.findAll({
                    where: {
                        email: 'john.doe@email.com'
                    }
                }).then(results => {
                    console.log("All users:", JSON.stringify(results, null, 2));
                    console.log(results[0].id);
                });
            }).catch(err => {
                console.log(err)
            });
        });
    });
}

// initial()

initial().catch(err => {
    console.log(err);
});