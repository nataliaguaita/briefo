    import { Button } from "@/components/ui/button"
    import { Card, CardContent } from "@/components/ui/card"
    import Link from "next/link"
    import { PlusIcon } from "lucide-react"
    import { getCurrentUser } from "@/lib/auth"
    import { prisma } from "@/lib/prisma"
    import { BriefingCard } from "@/components/briefing/briefing-card"
    import { redirect } from "next/navigation"

    export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user?.email) {
        redirect("/login")
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email }
    })

    if (!dbUser) {
        redirect("/login")
    }

    const briefings = await prisma.briefing.findMany({
        where: {
        userId: dbUser.id,
        },
        orderBy: {
        createdAt: 'desc',
        },
    })

    return (
        <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-slate-900">Seus Briefings</h1>
            <p className="text-slate-600 mt-1">
                Gerencie e acompanhe todos os seus briefings
            </p>
            </div>
            <Button asChild size="lg">
            <Link href="/briefing/novo">
                <PlusIcon className="mr-2 h-5 w-5" />
                Novo Briefing
            </Link>
            </Button>
        </div>

        {/* Lista de Briefings */}
        {briefings.length === 0 ? (
            <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                <PlusIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nenhum briefing ainda</h3>
                <p className="text-slate-600 text-center mb-6 max-w-md">
                Comece criando seu primeiro briefing. A IA vai ajudar a criar
                perguntas personalizadas para o seu projeto.
                </p>
                <Button asChild>
                <Link href="/briefing/novo">Criar primeiro briefing</Link>
                </Button>
            </CardContent>
            </Card>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {briefings.map((briefing) => (
                <BriefingCard
                key={briefing.id}
                id={briefing.id}
                projectName={briefing.projectName}
                clientNames={briefing.clientNames}
                businessSegment={briefing.businessSegment}
                spaceType={briefing.spaceType}
                status={briefing.status}
                createdAt={briefing.createdAt}
                />
            ))}
            </div>
        )}
        </div>
    )
    }