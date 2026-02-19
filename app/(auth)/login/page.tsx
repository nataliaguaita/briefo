"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
const router = useRouter()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
    })

    if (result?.error) {
        setError("Email ou senha inválidos")
        setLoading(false)
        return
    }

    router.push("/dashboard")
    router.refresh()
    } catch {
    setError("Algo deu errado. Tente novamente.")
    setLoading(false)
    }
}

return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 to-secondary/10 p-4">
    <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
        <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-primary">briefo</h1>
        </div>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
            Entre com seu email e senha para acessar
        </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
            />
            </div>
            {error && (
            <p className="text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
            </Button>
        </form>
        <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline">
            Criar conta
            </Link>
        </div>
        </CardContent>
    </Card>
    </div>
)
}