const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    favorites: {
      type: DataTypes.JSON,
      allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    }
  }, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true

async function test() {
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");

    const user1 = User.build({firstName:'John', lastName:'Doe', email:'john.doe@email.com', password:'1234'});
    await user1.save();
    console.log('user1 was saved to the database!');

    // selecting a user based on id and extracting result
    const results = await User.findAll({
        where: {
            // id: 1,
            email: 'john.doe@email.com'
        }
    });

    console.log("All users:", JSON.stringify(results, null, 2));
    console.log(results[0].id);
}
// test()

module.exports = User;
