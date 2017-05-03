'use strict';

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('user', {
		citizen_id: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: {
				message: "Nomor EKTP/NIK sudah terdaftar."
			},
			isNumeric: {
				message: "Format nomor EKTP/NIK salah."
			}
		},
		user_name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: {
				message: "Username sudah terdaftar."
			},
			validate: {
				notEmpty: { message: "Username tidak boleh kosong." },
				is: { args: /^[a-z0-9\_\-]+$/i, message: "Username harus berupa kombinasi huruf, angka, '-' dan '_'" }
			}
		},
		phone_number: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: {
				message: "Nomor telepon sudah terdaftar."
			},
			isNumeric: {
				message: "Format nomor telepon salah."
			}
		},
		email: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: {
				message: "Email sudah terdaftar."
			},
			validate: {
				isEmail: {
					message: "Format email salah."
				}
			}
		},
		full_name: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: { message: "Password tidak boleh kosong." },
				len: { args: [6, 50], message: "Password minimal 6 karakter" }
			}
		}
	}, {
		hooks: {
			// Hook used for hashing the password before inserted into db
			beforeCreate: function beforeCreate(createdUser, options, cb) {
				var hash = bcrypt.hashSync(createdUser.password, 10);
				createdUser.password = hash;
				cb(null, createdUser);
			}
		}
	}, {
		classMethods: {
			associate: function associate(models) {
				// single User has many Geo
				User.hasMany(models.Geo);
			}
		},
		instanceMethods: {
			validPassword: function validPassword(value) {
				// return true if password matches the hash
				return bcrypt.compareSync(value, this.password);
			}
		}
	}, {
		// add the timestamp attributes (updatedAt, createdAt).
		timestamps: true,

		// don't delete database entries but set the newly added attribute deletedAt
		// to the current date (when deletion was done). paranoid will only work if
		// timestamps are enabled
		// paranoid: true,

		// don't use camelcase for automatically added attributes but underscore style
		// so updatedAt will be updated_at
		underscored: true
	});
	return User;
};
//# sourceMappingURL=user_bak.js.map