import authOptions from '../../../../auth';

import NextAuth from 'next-auth/next';
import prismadb from '@/lib/prismadb';

import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { compare } from 'bcrypt';
import { AuthOptions, NextAuthOptions } from 'next-auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };