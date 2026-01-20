"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import AccessDenied from "@/components/AccessDenied";

export default function AdminPage() {
  const { isLoaded, user: clerkUser } = useUser();

  const myRole = useQuery(api.users.getMyRole);

  const users = useQuery(
    api.users.listAllUsers,
    myRole === "admin" ? {} : "skip"
  );

  const updateRole = useMutation(api.users.updateRole);

  if (!isLoaded || myRole === undefined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-red-600 font-mono text-xs tracking-widest uppercase">Validando Acceso...</p>
        </div>
      </div>
    );
  }

  if (myRole !== "admin") {
    return <AccessDenied />;
  }

  const handleRoleChange = async (userId: any, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await updateRole({ userId, newRole });
    } catch (error) {
      console.error(error);
      alert("Error: No se pudo actualizar el rol del usuario.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-start mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            <a href="/">To Do</a>
          </h1>
          <div className="text-right">
            <h2 className="text-2xl font-bold mt-1">
              Panel de Control
            </h2>
            <p className="text-gray-500 text-sm font-mono mt-1">
              Gestión de privilegios de usuario
            </p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-900/50 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-gray-800">
                <th className="px-8 py-5">Usuario</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {users?.map((user) => {
                const isMe = user.tokenIdentifier === clerkUser?.id;

                return (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6 font-bold text-gray-200 group-hover:text-white">
                      {user.nombre}
                    </td>
                    <td className="px-8 py-6 text-gray-500 font-mono text-sm">{user.email}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                        user.role === "admin" 
                          ? "bg-red-600/10 text-red-500" 
                          : "bg-gray-800 text-gray-400"
                      }`}>
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        disabled={isMe}
                        onClick={() => handleRoleChange(user._id, user.role || "user")}
                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded transition-all ${
                          isMe 
                            ? "opacity-20 cursor-not-allowed border border-gray-800 text-gray-700" 
                            : user.role === "admin"
                              ? "border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                              : "bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg shadow-red-900/20"
                        }`}
                      >
                        {isMe ? "Protegido" : user.role === "admin" ? "Degradar" : "Hacer Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {users?.length === 0 && (
            <div className="p-20 text-center text-gray-600 font-mono text-xs uppercase tracking-widest">
              No hay registros en la base de datos
            </div>
          )}
        </div>
      </div>
    </div>
  );
}