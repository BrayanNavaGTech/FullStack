"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Plus, Loader2 } from "lucide-react";

interface TodoFormProps {
  limitMessage: string;
  freePlanText?: string;
}

export default function TodoForm({ limitMessage, freePlanText }: TodoFormProps) {
  const [titulo, setTitulo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const createTodo = useMutation(api.todos.create);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || isLoading) return;

    setIsLoading(true);

    try {
      await createTodo({ titulo });
      setTitulo("");
    } catch (error: any) {
      if (error.message.includes("REACHED_LIMIT")) {
        const confirmar = confirm(limitMessage);
        
        if (confirmar) {
          try {
            await createCheckoutSession();
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        alert("Ocurrió un error al crear la tarea.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="¿Qué hay que hacer hoy?"
          disabled={isLoading}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !titulo.trim()}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-800 text-white p-2 rounded-lg transition-all flex items-center justify-center min-w-[44px]"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
        {freePlanText || "Plan Gratuito: 5 tareas máx."}
      </p>
    </form>
  );
}