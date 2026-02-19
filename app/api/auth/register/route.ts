import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
try {
    const { name, email, password } = await req.json()

    // Validações
    if (!name || !email || !password) {
    return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
    )
    }

    if (password.length < 6) {
    return NextResponse.json(
        { error: "A senha deve ter no mínimo 6 caracteres" },
        { status: 400 }
    )
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
    where: { email }
    })

    if (existingUser) {
    return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
    )
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
    data: {
        name,
        email,
        passwordHash,
    }
    })

    return NextResponse.json(
    {
        message: "Conta criada com sucesso",
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        }
    },
    { status: 201 }
    )
} catch (error) {
    console.error("Erro ao criar usuário:", error)
    return NextResponse.json(
    { error: "Erro ao criar conta" },
    { status: 500 }
    )
}
}