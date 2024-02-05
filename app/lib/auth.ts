import { prisma } from '@/app/lib/prisma';
import { session } from '@/app/lib/session';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

/* Defines authentication options */
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/"
    },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
        if (account?.provider === "google") {
            console.log("trying to log in with google")
        }
      if (!profile?.email) {
        throw new Error('No profile');
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name!,
        },
        update: {
          name: profile.name!,
        },
      });
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          throw new Error('No user found');
        }
        token.id = user.id;
      }
      return token;
    },
  },
};
