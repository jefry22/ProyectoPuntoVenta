import { UserRepository } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    const {username,password,role} = req.body;
    
    try {
            const id = await UserRepository.create({username,password,role});
            res.status(201).json({message:'Usuario creado con exito'},id);
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}

export const login = async (req,res) => {
    const {username,password} = req.body;
    try {
        const user = await UserRepository.login({username,password});
        const token = jwt.sign({userId:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({message:'Login exitoso',token});
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}
