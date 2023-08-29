import { City, CityImage } from '../models/cities';
import { connectDB } from '../configs/db.config.js';

export const getCities = async (req, res) => {
    try {
        await connectDB();
        const attractions = await 
    }