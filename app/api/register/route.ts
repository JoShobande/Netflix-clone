import bcrypt from 'bcrypt'
// import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../lib/prismadb'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json(); // Parse the request body
      const { email, name, password } = body;
  
      const existingUser = await prismadb.user.findUnique({
        where: {
          email,
        },
      });
  
      if (existingUser) {
        return NextResponse.json({ error: "Email taken" }, { status: 422 });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await prismadb.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      });
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}

// export default async function handler(req:NextApiRequest, res:NextApiResponse){
//     // if(req.method !== 'post'){
//     //     return res.status(405).end()
//     // }

//     try{
//         const {email, name, password} = req.body

//         const existingUser = await prismadb.user.findUnique({
//             where:{
//                 email
//             }
//         })
//         if(existingUser){
//             return res.status(422).json({error: 'Email taken'})
//         }
//         const hashedPassword = await bcrypt.hash(password, 12)

//         const user = await prismadb.user.create({
//             data:{
//                 email, 
//                 name,
//                 hashedPassword,
//                 image: "",
//                 emailVerified: new Date()
//             }
//         })

//         return res.status(200).json(user)
//     }catch(error){
//         console.log(error)
//         return res.status(400).end()
//     }
// }