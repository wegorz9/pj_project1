import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "~/app/api/data/data"


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [],
})