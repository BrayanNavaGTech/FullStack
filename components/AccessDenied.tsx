import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-900/20 border border-red-500 p-8 rounded-2xl max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Acceso Denegado</h1>
        <p className="text-gray-400 mb-8">
          No tienes los permisos necesarios para ver esta sección. 
          Si crees que esto es un error, contacta al administrador.
        </p>
        <Link 
          href="/" 
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}