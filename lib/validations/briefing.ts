import { z } from "zod"

export const briefingFormSchema = z.object({
  // Dados do Projeto/Cliente
  projectName: z.string().min(2, {
    message: "Nome do projeto deve ter pelo menos 2 caracteres",
  }),
  clientNames: z.string().min(2, {
    message: "Nome do cliente deve ter pelo menos 2 caracteres",
  }),
  clientEmail: z.string().email({
    message: "Email inválido",
  }),
  clientPhone: z.string().optional(),

  // Dados do Projeto
  businessSegment: z.string().min(1, {
    message: "Selecione um segmento",
  }),
  spaceType: z.string().min(2, {
    message: "Tipo de espaço é obrigatório",
  }),
  city: z.string().optional(),
  state: z.string().optional(),
  approximateArea: z.coerce
    .number()
    .positive({
      message: "Área deve ser maior que zero",
    })
    .optional()
    .or(z.literal("")),
  estimatedBudget: z.string().optional(),
  desiredDeadline: z.string().optional(),
  isRenovation: z.boolean().default(false),
  initialNotes: z.string().optional(),
})

export type BriefingFormValues = z.infer<typeof briefingFormSchema>