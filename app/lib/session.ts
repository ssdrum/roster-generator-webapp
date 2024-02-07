import { Session } from '@/app/lib/types';
import { User, getServerSession } from 'next-auth';

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  session.image = token.picture;
  return session;
};

export const getUserSession = async (): Promise<Session> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};
