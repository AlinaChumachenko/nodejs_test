// import bcrypt from 'bcrypt';
import { genSalt, hash, compare } from 'bcrypt';
import { model, Schema } from 'mongoose';

import { userRoles } from '../constants/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.USER,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ЗРАЗОК MANGOOSE HOOKS

// userSchema.pre(/^find/, () => { // хук буде відпрацьовувати на всьому що починається з find
//   console.log('ALL FIND HOOK');
// });

// userSchema.pre('find', () => { // хук буде відпрацьовувати під час пошуку даних
//   console.log('FIND HOOK');
// });

userSchema.pre('save', async function(next) { // хук що відпрацьовує на метод save та create
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// CUSTOM METHODS
userSchema.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

const User = model('User', userSchema);

export { User };
