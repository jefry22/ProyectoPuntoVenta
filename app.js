import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);

sequelize.sync()
.then(()=>console.log('Base de datos sincronizada'))
.catch(err=>console.log('Error al sincronizar la base de datos'));

export default app;