"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
const { data: session } = useSession()

const getInitials = (name: string) => {
    return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

return (
    <header className="border-b border-slate-200 bg-white">
    <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">briefo</span>
        </Link>

        {/* User Menu */}
        {session?.user && (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                    {getInitials(session.user.name || 'U')}
                    </AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-slate-500">{session.user.email}</p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                <Link href="/perfil">Meu Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link href="/configuracoes">Configurações</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => signOut({ callbackUrl: '/login' })}
                >
                Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )}
        </div>
    </div>
    </header>
)
}