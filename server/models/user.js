'use strict';
var Sequelize = require('sequelize')
var bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    ektp_id: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
		    msg: "Nomor EKTP/NIK sudah terdaftar."
		},
		isNumeric: {
			msg: "Format nomor EKTP/NIK salah."
		},
		validate: {
			notEmpty: {msg: "eKTP/NIK tidak boleh kosong."}
		}
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
			msg: "Username sudah terdaftar."
		},
		validate: {
			notEmpty: {msg: "Username tidak boleh kosong."},
			is: {args: /^[a-z0-9\_\-]+$/i, msg: "Username harus berupa kombinasi huruf, angka, '-' dan '_'"}		
		}
	  },	
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
			msg: "Email sudah terdaftar."
		},
		validate: {
			notEmpty: {msg: "Email tidak boleh kosong."},
			isEmail: {
				msg: "Format email salah."
			}
		}
	},
	namalengkap: {
		type: Sequelize.STRING  
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: {msg: "Password tidak boleh kosong."},
			len: {args: [6,50], msg: "Password minimal 6 karakter"}
		}
	},
	salt: {
		type: Sequelize.STRING  
	},
	token: {
		type: Sequelize.STRING  
	}	
  }, 

  {
	hooks: {
		// Hook used for hashing the password before inserted into db
		beforeCreate: function(createdUser, options, cb) {
			var hash = bcrypt.hashSync(createdUser.password, 10);
			createdUser.password = hash;
			cb(null, createdUser);
		}
	}  
  },
  {
    classMethods: {
      associate: function(models) {
        // single User has many Geo
		User.hasMany(models.Geo);
      }
    },
	instanceMethods: {
		validPassword: function(value) {
			// return true if password matches the hash
			return bcrypt.compareSync(value, this.password)
		}
	} 		
  }
  );
  return User;
};