import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt"

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    username:{
     type:DataTypes.STRING,
     allowNull:false,
     unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

export class UserRepository {

    static async create({username,password}){
          // Validaciones básicas
    if (typeof username !== 'string') throw new Error('El username no es un string');
    if (username.length < 3) throw new Error('El usuario no puede tener menos de 3 caracteres');

    if (typeof password !== 'string') throw new Error('El password no es de tipo string');
    if (password.length < 6) throw new Error('El password debe tener al menos 6 caracteres');

    // Verificar si ya exisiste
    const existingUser = await User.findOne({where:{username}});
    if(existingUser) throw new Error('El usuario ya existe');
    // Encryptamos el password
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({username,password:hashedPassword});

    return newUser.id
    }

    static async login({username,password}){
        const user = await User.findOne({where:{username}})
        if(!user)throw new Error('El usuario no existe')
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) throw new Error('contraseña incorrecta');
        return user
    }
}
export default User