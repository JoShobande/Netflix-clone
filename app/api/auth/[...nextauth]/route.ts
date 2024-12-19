// import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from '../../../../lib/prismadb'
import {compare} from 'bcrypt'
import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             id: 'credentials',
//             name: 'Credentials',
//             credentials:{
//                 email:{
//                     label: "Email",
//                     type: 'text'
//                 },
//                 password:{
//                     label: 'Password',
//                     type: 'password'
//                 }
//             },
//             async authorize(credentials){
//                 if(!credentials?.email || !credentials.password){
//                     throw new Error('Email and pasword required')
//                 }
//                 const user = await prismadb.user.findUnique({
//                     where:{
//                         email:credentials.email
//                     } 
//                 })
//                 if(!user || !user.hashedPassword){
//                     throw new Error('Email does not exist')
//                 }

//                 const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

//                 if(!isCorrectPassword){
//                     throw new Error('Incorrect password')
//                 }

//                 return user;
//             }
//         })
//     ],
//     pages:{
//         signIn: '/auth'
//     },
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: 'jwt'
//     },
//     jwt:{
//         secret: process.env.NEXTAUTH_JWT_SECRET,
//     },
//     secret: process.env.NEXTAUTH_SECRET
// }

// export function POST(req: Request) {
//     return NextAuth(authOptions)(req);
// }