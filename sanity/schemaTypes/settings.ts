import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Ajustes del Sistema',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título de la Landing',
      type: 'string',
      description: 'El titular principal que aparece al entrar.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción de la Landing',
      type: 'text',
      description: 'El párrafo que explica qué hace la app.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Botón (CTA)',
      type: 'string',
      description: 'Ejemplo: "Empieza Gratis" o "Crear Tarea".',
    }),

    defineField({
      name: 'limitReachedMessage',
      title: 'Mensaje de Límite Alcanzado',
      type: 'text',
      description: 'Texto que sale cuando el usuario llega a 5 To-Dos.',
    }),
    defineField({
      name: 'successPaymentMessage',
      title: 'Mensaje de Pago Exitoso',
      type: 'text',
      description: 'Texto que aparece en la pantalla de /success.',
    }),

    defineField({
      name: 'freePlanDescription',
      title: 'Descripción Plan Gratuito',
      type: 'string',
      description: 'Ej: "Hasta 5 tareas para siempre".',
    }),
    defineField({
      name: 'proPlanDescription',
      title: 'Descripción Plan Pro',
      type: 'string',
      description: 'Ej: "Tareas ilimitadas y soporte VIP".',
    }),
  ],
})