import { model, Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

/* email and password regex */
const EMAIL_REGEX = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/);
const PASSWORD_REGEX = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const UserSchema = new Schema(
    {
        "firstName": {
            "type": String,
            "required": [true, "First Name is required"],
            "minlength": [2, "First Name must be at least 2 characters long"]
        },
        "lastName": {
            "type": String,
            "required": [true, "Last Name is required"],
            "minlength": [2, "Last Name must be at least 2 characters long"]
        },
        "email": {
            "type": String,
            "required": [true, "Email is required"],
            "validate": {
                "validator": (value) => EMAIL_REGEX.test(value),
                "message": "Please enter a valid email"
            },
            "unique": [true, "Email is already in use"]
        },
        "password": {
            "type": String,
            "required": [true, "Password is required"],
            "validate": {
                "validator": (value) => PASSWORD_REGEX.test(value),
                "message": '1 uppercase, 1 lowercase, 1 number, at least 8 characters.',
            },
        }
    },
    { "timestamps": true }
)

UserSchema.plugin(mongooseUniqueValidator, {
    "message": "Email is already in use"
});

UserSchema.virtual('confirmPassword')
    .get(function () { return this._confirmPassword; })
    .set(function (value) { this._confirmPassword = value; });

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password and Confirm Password must match');
    }
    next();
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
})

const UserModel = model('User', UserSchema);
export default UserModel;