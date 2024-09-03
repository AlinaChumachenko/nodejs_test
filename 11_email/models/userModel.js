import { model, Schema } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import crypto from 'crypto';

import { userRoles } from '../constants/index.js';

const userSchema = new Schema(
  {
    // name: String,
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
    avatar: String,
    passwordResetToken: String,
    passwordResetTokenExp: Date
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
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

    this.avatar = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }

  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// CUSTOM METHODS
userSchema.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

// тут буде генеруватись рандомний пароль для відновлення
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExp = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model('User', userSchema);

export { User };
