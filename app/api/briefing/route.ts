import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueLink } from "@/lib/utils/generate-link";
import { briefingFormSchema } from "@/lib/validations/briefing";

    export async function POST(req: Request) {
    try {
        // Verificar autenticação
        const user = await getCurrentUser()
        if (!user?.email) {
        return NextResponse.json(
            { error: "Não autenticado" },
            { status: 401 }
        )
        }

        // Buscar usuário completo do banco
        const dbUser = await prisma.user.findUnique({
        where: { email: user.email }
        })

        if (!dbUser) {
        return NextResponse.json(
            { error: "Usuário não encontrado" },
            { status: 404 }
        )
        }

        // Validar dados recebidos
        const body = await req.json()
        const validatedData = briefingFormSchema.parse(body)

        // Gerar link único
        let uniqueLink = generateUniqueLink()
        
        // Garantir que o link é único
        let existingBriefing = await prisma.briefing.findUnique({
        where: { uniqueLink }
        })
        
        while (existingBriefing) {
        uniqueLink = generateUniqueLink()
        existingBriefing = await prisma.briefing.findUnique({
            where: { uniqueLink }
        })
        }

        // Criar briefing no banco
        const briefing = await prisma.briefing.create({
        data: {
            userId: dbUser.id,
            projectName: validatedData.projectName,
            clientNames: validatedData.clientNames,
            clientEmail: validatedData.clientEmail,
            clientPhone: validatedData.clientPhone || null,
            businessSegment: validatedData.businessSegment,
            spaceType: validatedData.spaceType,
            city: validatedData.city || null,
            state: validatedData.state || null,
            approximateArea: validatedData.approximateArea || null,
            estimatedBudget: validatedData.estimatedBudget || null,
            desiredDeadline: validatedData.desiredDeadline || null,
            isRenovation: validatedData.isRenovation,
            initialNotes: validatedData.initialNotes || null,
            uniqueLink,
            status: "DRAFT",
        },
        })

        return NextResponse.json(
        {
            id: briefing.id,
            uniqueLink: briefing.uniqueLink,
            message: "Briefing criado com sucesso",
        },
        { status: 201 }
        )
    } catch (error) {
        console.error("Erro ao criar briefing:", error)
        
        if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
            { error: "Dados inválidos" },
            { status: 400 }
        )
        }

        return NextResponse.json(
        { error: "Erro ao criar briefing" },
        { status: 500 }
        )
    }
    }

export async function GET() {
try {
    // Verificar autenticação
    const user = await getCurrentUser()
    if (!user?.email) {
    return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
    )
    }

    // Buscar usuário completo do banco
    const dbUser = await prisma.user.findUnique({
    where: { email: user.email }
    })

    if (!dbUser) {
    return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
    )
    }

    // Buscar todos os briefings do usuário
    const briefings = await prisma.briefing.findMany({
    where: {
        userId: dbUser.id,
    },
    orderBy: {
        createdAt: 'desc',
    },
    select: {
        id: true,
        clientNames: true,
        businessSegment: true,
        spaceType: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        uniqueLink: true,
    },
    })

    return NextResponse.json(briefings)
} catch (error) {
    console.error("Erro ao buscar briefings:", error)
    return NextResponse.json(
    { error: "Erro ao buscar briefings" },
    { status: 500 }
    )
}
}
