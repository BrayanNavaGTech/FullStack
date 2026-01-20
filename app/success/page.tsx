import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getSettings } from "@/sanity/lib/queries"

export default async function SuccessPage() {
  const settings = await getSettings();

  const successMessage = 
    settings?.successPaymentMessage || 
    "¡Tu pago ha sido procesado con éxito! Ahora tienes acceso a todas las funciones Pro.";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 animate-pulse" />
      
      <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">
        ¡Pago <span className="text-green-500">Confirmado</span>!
      </h1>

      <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
        {successMessage}
      </p>

      <Link 
        href="/dashboard" 
        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all uppercase text-sm tracking-widest"
      >
        Volver a mis tareas
      </Link>
    </div>
  );
}