    import Link from "next/link"
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
    import { Badge } from "@/components/ui/badge"
    import { formatDistanceToNow } from "date-fns"
    import { ptBR } from "date-fns/locale"

    interface BriefingCardProps {
    id: string
    projectName: string
    clientNames: string
    businessSegment: string
    spaceType: string
    status: string
    createdAt: Date
    }

    const statusMap = {
    DRAFT: { label: "Rascunho", color: "bg-slate-100 text-slate-700" },
    SENT: { label: "Enviado", color: "bg-blue-100 text-blue-700" },
    IN_PROGRESS: { label: "Em andamento", color: "bg-yellow-100 text-yellow-700" },
    COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-700" },
    ARCHIVED: { label: "Arquivado", color: "bg-slate-100 text-slate-500" },
    }

    const segmentEmojis: Record<string, string> = {
    office: "🏢",
    retail: "🏪",
    restaurant: "🍽️",
    clinic: "🏥",
    coworking: "💼",
    showroom: "🎨",
    hotel: "🏨",
    gym: "💪",
    other: "📋",
    }

    export function BriefingCard({
    id,
    projectName,
    clientNames,
    businessSegment,
    spaceType,
    status,
    createdAt,
    }: BriefingCardProps) {
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.DRAFT

    return (
        <Link href={`/briefing/${id}/perguntas`}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                    <span>{segmentEmojis[businessSegment] || "📋"}</span>
                    {projectName}
                </CardTitle>
                <CardDescription className="mt-1 text-slate-600">
                    {clientNames}
                </CardDescription>
                <CardDescription className="mt-1 text-xs text-slate-500">
                    {spaceType}
                </CardDescription>
                </div>
                <Badge className={statusInfo.color} variant="secondary">
                {statusInfo.label}
                </Badge>
            </div>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-slate-500">
                Criado {formatDistanceToNow(new Date(createdAt), { 
                addSuffix: true,
                locale: ptBR 
                })}
            </p>
            </CardContent>
        </Card>
        </Link>
    )
    }