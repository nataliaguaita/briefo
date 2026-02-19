import { Header } from "@/components/shared/header"

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return (
    <div className="min-h-screen bg-slate-50">
    <Header />
    <main className="container mx-auto px-4 py-8">
        {children}
    </main>
    </div>
)
}