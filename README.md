Este es un proyecto desarrollado con [Next.js](https://nextjs.org) y potenciado por un ecosistema moderno de herramientas para aplicaciones SaaS.

## Acerca del Proyecto

Esta plataforma es un sistema integral de gestión de tareas que ofrece persistencia de datos en tiempo real y una experiencia de usuario optimizada. La arquitectura permite gestionar un modelo de negocio con planes gratuitos y profesionales mediante la sincronización de roles y pagos automatizados.

## Stack Tecnológico

* [Next.js](https://nextjs.org) - Framework principal para renderizado híbrido.
* [Convex](https://www.convex.dev) - Base de datos reactiva y funciones de backend.
* [Sanity](https://www.sanity.io) - Sistema de gestión de contenidos (CMS) desacoplado.
* [Clerk](https://clerk.com) - Gestión de autenticación e identidades.
* [Stripe](https://stripe.com) - Procesamiento de pagos y suscripciones.

## Empezando

Primero, instala las dependencias:

```bash
npm install

```

Configura tus variables de entorno en un archivo `.env.local` con las claves necesarias de Clerk, Convex, Sanity y Stripe.

Luego, inicia el entorno de desarrollo:

```bash
# Inicia el backend de Convex
npx convex dev

# Inicia el servidor de Next.js (en una nueva terminal)
npm run dev

```

Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) en tu navegador para ver el resultado. Puedes acceder al panel de administración de contenidos en [http://localhost:3000/studio](https://www.google.com/search?q=http://localhost:3000/studio).

## Arquitectura General

El proyecto sigue una estricta separación de responsabilidades:

* **Gestión Operativa:** Los componentes de cliente se conectan a [Convex](https://www.convex.dev) para actualizaciones en tiempo real y lógica de negocio segura.
* **Gestión Editorial:** Los componentes de servidor recuperan contenido dinámico (mensajes, títulos y descripciones) desde [Sanity](https://www.sanity.io) mediante consultas GROQ, permitiendo cambios de contenido sin modificar el código.

## Aprender Más

Para profundizar en las tecnologías utilizadas, consulta los siguientes recursos:

* [Documentación de Next.js](https://nextjs.org/docs) - Funcionalidades y API de Next.js.
* [Documentación de Convex](https://docs.convex.dev) - Aprende sobre funciones y esquemas reactivos.
* [Documentación de Sanity](https://www.sanity.io/docs) - Guías sobre esquemas y consultas GROQ.
