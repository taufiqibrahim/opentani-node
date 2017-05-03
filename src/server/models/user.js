import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		citizen_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: {
				message: "Nomor EKTP/NIK sudah terdaftar."
			},
			isNumeric: {
				message: "Format nomor EKTP/NIK salah."
			}
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				message: "Username sudah terdaftar."
			},
			validate: {
				notEmpty: {message: "Username tidak boleh kosong."},
				is: {args: /^[a-z0-9\_\-]+$/i, message: "Username harus berupa kombinasi huruf, angka, '-' dan '_'"}		
			}
		  },
		phone_number: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: {
				message: "Nomor telepon sudah terdaftar."
			},
			isNumeric: {
				message: "Format nomor telepon salah."
			}
		},
		email: {
			type: DataTypes.STRING,
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
			type: DataTypes.STRING  
	    },
	    token: {
			type: DataTypes.STRING  
	    },
		hashed_pw: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {message: "Password tidak boleh kosong."},
				len: {args: [6,50], message: "Password minimal 6 karakter"}
			}
		},
		salt: {
			type: DataTypes.STRING
		}
	  },
	  {
		hooks: {
			// Hook used for hashing the password before inserted into db
			beforeCreate: (createdUser, options, cb) => {
				let hash = bcrypt.hashSync(createdUser.hashed_pw, 10);
				createdUser.hashed_pw = hash;

			}
		}  
	  },
	  {
		classMethods: {
		  associate: (models) => {
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
	  },
	  {
		underscored: true,
		timestamps: false
	  });
	  return User;
}