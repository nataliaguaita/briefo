"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { briefingFormSchema, type BriefingFormValues } from "@/lib/validations/briefing"
import { BUSINESS_SEGMENTS, BUDGET_RANGES, BRAZILIAN_STATES } from "@/lib/constants/briefing"

export function NewBriefingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [additionalClients, setAdditionalClients] = useState<string[]>([])

  const form = useForm<BriefingFormValues>({
  resolver: zodResolver(briefingFormSchema) as any,
    defaultValues: {
      projectName: "",
      clientNames: "",
      clientEmail: "",
      clientPhone: "",
      businessSegment: "",
      spaceType: "",
      city: "",
      state: "",
      approximateArea: undefined,
      estimatedBudget: "",
      desiredDeadline: "",
      isRenovation: false,
      initialNotes: "",
    },
  })

  const addClientField = () => {
    setAdditionalClients([...additionalClients, ""])
  }

  const removeClientField = (index: number) => {
    setAdditionalClients(additionalClients.filter((_, i) => i !== index))
  }

  const updateClientField = (index: number, value: string) => {
    const updated = [...additionalClients]
    updated[index] = value
    setAdditionalClients(updated)
  }

  async function onSubmit(values: BriefingFormValues) {
    setIsLoading(true)
    
    try {
      // Combinar cliente principal com adicionais
      const allClients = [
        values.clientNames,
        ...additionalClients.filter(c => c.trim() !== "")
      ].join(", ")

      const dataToSend = {
        ...values,
        clientNames: allClients,
      }

      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar briefing")
      }

      toast.success("Briefing criado com sucesso!")
      router.push(`/briefing/${data.id}/perguntas`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Algo deu errado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Seção: Identificação do Projeto */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Identificação do Projeto</h3>
            <p className="text-sm text-slate-600">
              Informações de controle interno e identificação
            </p>
          </div>

          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Projeto (Controle Interno) *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: C124.VILLAP" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Código ou nome usado internamente para identificar o projeto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Seção: Dados do Cliente */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Dados do Cliente</h3>
            <p className="text-sm text-slate-600">
              Informações de contato e identificação do cliente
            </p>
          </div>

          <FormField
            control={form.control}
            name="clientNames"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente Principal *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Maria Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Clientes Adicionais */}
          {additionalClients.map((client, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Cliente ${index + 2}`}
                value={client}
                onChange={(e) => updateClientField(index, e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeClientField(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addClientField}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar outro cliente/interessado
          </Button>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="cliente@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Seção: Informações do Projeto */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Informações do Projeto</h3>
            <p className="text-sm text-slate-600">
              Detalhes sobre o espaço comercial
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="businessSegment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segmento do Negócio *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {BUSINESS_SEGMENTS.map((segment) => (
                        <SelectItem key={segment.value} value={segment.value}>
                          {segment.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spaceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Espaço *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Café com coworking" {...field} />
                  </FormControl>
                  <FormDescription>
                    Descreva brevemente o tipo de espaço
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Curitiba" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white max-h-75">
                      {BRAZILIAN_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="approximateArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metragem Aproximada (m²)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 120"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value === "" ? undefined : parseFloat(value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Estimado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {BUDGET_RANGES.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="desiredDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prazo Desejado</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 3 meses, Dezembro 2026" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRenovation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Este é um projeto de reforma?</FormLabel>
                  <FormDescription>
                    Marque se for uma reforma/renovação de espaço existente
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Seção: Observações Iniciais */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Observações Iniciais</h3>
            <p className="text-sm text-slate-600">
              Anotações da primeira conversa com o cliente
            </p>
          </div>

          <FormField
            control={form.control}
            name="initialNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Cliente quer um ambiente moderno e acolhedor, mencionou preferência por tons neutros..."
                    className="min-h-30"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Qualquer informação relevante que você já tenha sobre o projeto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Criando..." : "Continuar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}