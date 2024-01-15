import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('req.body:');
    console.log(req.body);

    // We only want to allow post calls to the register route.
    if(req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        // Define three vars extracted from req.body
        const {email, name, password} = req.body;

        // Check to see if there is already an email registered for the email provided by the user.
        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email
            }
        });

        if(existingUser){
            return res.status(422).json({error:'Email already registered :('})
        }

        // Hash the user's password.
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save the hashed password into a new user model.
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log('im in the catch');
        console.log(error);
        return res.status(400).end(); 
    }
}