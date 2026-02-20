export { default } from "next-auth/middleware"

export const config = {
matcher: [
    "/dashboard/:path*",
    "/briefing/:path*",
    "/perfil/:path*",
    "/configuracoes/:path*",
]
}