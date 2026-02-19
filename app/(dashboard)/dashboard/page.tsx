import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default function DashboardPage() {
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

    {/* Empty State */}
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

    {/* Exemplo de como os cards vão ficar (quando tiver dados) */}
    <div className="hidden">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                <CardTitle className="text-lg">🏢 Café Moema</CardTitle>
                <CardDescription className="mt-1">
                    Cliente: Maria Silva • Restaurante
                </CardDescription>
                </div>
                <Badge>Em andamento</Badge>
            </div>
            </CardHeader>
            <CardContent>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progresso</span>
                <span className="font-medium">15/20 perguntas</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '75%' }} />
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    </div>
    </div>
)
}