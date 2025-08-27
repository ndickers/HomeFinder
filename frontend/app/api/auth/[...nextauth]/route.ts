import NextAuth, { AuthOptions, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signin, TLoginData } from "../../authentication/authApi";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface AuthUser extends User {
    accessToken: string;
    profile: string;
    role: "TENANT" | "ADMIN" | "AGENT";
    status: string
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "google custom",
            name: "Google",
            credentials: {
                accessToken: { label: "Access Token", type: "text" },
                user: { label: "User", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.user || !credentials?.accessToken) return null
                const user = JSON.parse(atob(credentials?.user));
                user.accessToken = credentials.accessToken
                return user
            }
        }),
        CredentialsProvider({
            id: "email-password",
            name: "Email",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "text" },
            },
            async authorize(credentials) {
                const userCredential = { email: credentials?.email, password: credentials?.password }
                const response = await signin(userCredential as TLoginData)
                if (!response) return null

                const user = response.user
                user.accessToken = response.accessToken
                return user
            }
        })
    ],
    pages: {
        signIn: "/login", error: "/login?error="
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: any }): Promise<JWT> {
            if (user) {
                token.accessToken = user.accessToken
                token.name = user.name
                token.email = user.email
                token.profile = user.profile
                token.role = user.role
                token.userId = user.id
                token.status = user.status
            }
            return token;
        },
        async session({ session, token }: { session: any, token: JWT }) {
            if (token) {
                session.accessToken = token.accessToken
                session.user.id = token.userId
                session.user.name = token.name
                session.user.email = token.email
                session.user.profile = token.profile
                session.user.role = token.role
                session.user.status = token.status
            }
            return session;
        },
    },
    session: {
        strategy: "jwt" as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

