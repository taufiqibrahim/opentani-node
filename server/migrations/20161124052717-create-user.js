'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  ektp_id: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		isNumeric: true		  
	  },
	  username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			is: /^[a-z0-9\_\-]+$/i
		}
	  },
      email: {
        type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
      },
	  namalengkap: {
		type: Sequelize.STRING  
	  },
	  password: {
		type: Sequelize.STRING  
	  },
	  salt: {
		type: Sequelize.STRING  
	  },
	  token: {
		type: Sequelize.STRING  
	  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};