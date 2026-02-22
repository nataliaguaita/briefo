    import { NewBriefingForm } from "@/components/forms/new-briefing-form"
    import { ChevronLeft } from "lucide-react"
    import Link from "next/link"
    import { Button } from "@/components/ui/button"

    export default function NewBriefingPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div>
            <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar para dashboard
            </Link>
            </Button>
        </div>

        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Novo Briefing</h1>
            <p className="text-slate-600 mt-2">
            Preencha as informações iniciais do projeto. A IA vai usar esses dados
            para criar perguntas personalizadas para o seu cliente.
            </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
            <NewBriefingForm />
        </div>
        </div>
    )
    }