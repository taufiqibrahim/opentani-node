'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Model) {
	_inherits(User, _Model);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
	}

	_createClass(User, null, [{
		key: 'fields',


		/* FIELDS */
		value: function fields() {
			return {
				citizen_id: {
					type: _sequelize2.default.STRING,
					allowNull: true,
					unique: {
						message: "Nomor EKTP/NIK sudah terdaftar."
					},
					isNumeric: {
						message: "Format nomor EKTP/NIK salah."
					}
				},
				user_name: {
					type: _sequelize2.default.STRING,
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
					type: _sequelize2.default.STRING,
					allowNull: true,
					unique: {
						message: "Nomor telepon sudah terdaftar."
					},
					isNumeric: {
						message: "Format nomor telepon salah."
					}
				},
				email: {
					type: _sequelize2.default.STRING,
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
					type: _sequelize2.default.STRING
				},
				password: {
					type: _sequelize2.default.STRING,
					validate: {
						notEmpty: { message: "Password tidak boleh kosong." },
						len: { args: [6, 50], message: "Password minimal 6 karakter" }
					}
				}
			};
		}

		/* RELATIONSHIPS */

	}, {
		key: 'associate',
		value: function associate(models) {}

		/* CLASS-LEVEL FUNCTIONS */

	}, {
		key: 'create',
		value: function create(args) {}

		/* GRAPHQL MUTATIONS */

		/* OTHERS */

	}]);

	return User;
}(_sequelize.Model);

/* Old version
module.exports = function(sequelize, DataTypes) {
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
			notEmpty: {message: "Username tidak boleh kosong."},
			is: {args: /^[a-z0-9\_\-]+$/i, message: "Username harus berupa kombinasi huruf, angka, '-' dan '_'"}		
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
			notEmpty: {message: "Password tidak boleh kosong."},
			len: {args: [6,50], message: "Password minimal 6 karakter"}
		}
	},
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
  },
  {
	  // add the timestamp attributes (updatedAt, createdAt).
	  timestamps: true,

	  // don't delete database entries but set the newly added attribute deletedAt
	  // to the current date (when deletion was done). paranoid will only work if
	  // timestamps are enabled
	  // paranoid: true,

	  // don't use camelcase for automatically added attributes but underscore style
	  // so updatedAt will be updated_at
	  underscored: true,
  }
  );
  return User;
};
*/


exports.default = User;
//# sourceMappingURL=user.js.map