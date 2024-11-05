import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt'


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor proporciona tu nombre'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    },
    lastname: {
        type: String,
        required: [true, 'Por favor proporciona tu apellido'],
        minlength: [3, 'El apellido debe tener al menos 3 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'Por favor ingresa un correo valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo electronico valido'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña necesita tener al menos 8 caracteres'],
    } 
}, { timestamps: true });


UserSchema.virtual('passwordConfirmation')
  .get(function() { return this._passwordConfirmation; })
  .set(function(value) { this._passwordConfirmation = value; });

UserSchema.pre('validate', function(next) {
  if (this.password !== this.passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Las contraseñas no coinciden');
  }
  next();
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = model("User", UserSchema);

export default User