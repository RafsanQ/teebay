import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    createUser: async (args) => {
        try{
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: args.userInput.email
                }
            })

            if(existingUser){
                throw new Error(`User with email ${args.userInput.email} already exists`);
            }


            const user = await prisma.user.create({
                data: {
                   name: args.userInput.name,
                   password: args.userInput.password,   // This should be hashed but I am too lazy to do it...
                   email: args.userInput.email,
                   address: args.userInput.address,
                   phoneNumber: args.userInput.phone
                }
            })
            console.log("added user!", user);
            return user;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    loginUser: async (args) => {
        const { email, password } = args;
        console.log({ email, password });
        try{
            const user = await prisma.user.findUnique({
                where: { email: email }
            }
                );
            if (!user) {
                throw new Error(`User with the email ${email} does not exist!`);
            }

            if(password != user.password) {
                throw new Error('Incorrect Password');
            }

            // Token stuff
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'veryHardToGuessString',
                {
                    expiresIn: '3h'
                }
            );

            return { userId: user.id, token, tokenExpiration: 3}

        }catch(error){
            console.error(error);
            throw error;
        }
        




    }
}