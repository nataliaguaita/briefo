import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditQuestionsPage() {
return (
    <div className="max-w-4xl mx-auto space-y-6">
    <div>
        <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para dashboard
        </Link>
        </Button>
    </div>

    <div>
        <h1 className="text-3xl font-bold text-slate-900">Gerar Perguntas</h1>
        <p className="text-slate-600 mt-2">
        Esta página será desenvolvida na próxima etapa
        </p>
    </div>

    <Card>
        <CardHeader>
        <CardTitle>🤖 Próxima Etapa</CardTitle>
        <CardDescription>
            Aqui vamos integrar a IA para gerar perguntas personalizadas
        </CardDescription>
        </CardHeader>
        <CardContent>
        <p className="text-sm text-slate-600">
            Por enquanto, seu briefing foi salvo com sucesso! Na próxima etapa vamos:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-slate-600 space-y-1">
            <li>Integrar Claude API para gerar perguntas</li>
            <li>Criar editor de perguntas</li>
            <li>Permitir adicionar/remover/editar perguntas</li>
            <li>Gerar link compartilhável</li>
        </ul>
        </CardContent>
    </Card>
    </div>
)
}