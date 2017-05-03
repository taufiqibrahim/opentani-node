'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  citizen_id: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		isNumeric: true		  
	  },
	  user_name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			is: /^[a-z0-9\_\-]+$/i
		}
	  },
	  phone_number: {
		  type: Sequelize.STRING,
	  },
      email: {
        type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
      },
	  full_name: {
		type: Sequelize.STRING  
	  },
	  token: {
		type: Sequelize.STRING  
	  },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};