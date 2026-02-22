import { nanoid } from 'nanoid'

export function generateUniqueLink(): string {
  // Gera um ID único de 10 caracteres
  // Ex: "AbC123XyZ4"
    return nanoid(10)
}