import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = await prisma.usuario.findUnique({
          where: { email: credentials?.email },
        });
        if (!users || !credentials?.password) {
          return null;
        }

        const senhaValida = await bcrypt.compare(
          credentials.password,
          users.senha
        );

        if (!senhaValida) {
          return null;
        }
        return {
          id: users.id.toString(),
          name: users.nome,
          email: users.email,
        };
        //   const res = await fetch("/your/endpoint", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()

        //   if (res.ok && user) {
        //     return user
        //   }
      },
    }),
  ],
});
export { handler as GET, handler as POST };
