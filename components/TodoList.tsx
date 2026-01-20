"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function TodoList() {
  const todos = useQuery(api.todos.get);
  const toggleTodo = useMutation(api.todos.toggle);
  const deleteTodo = useMutation(api.todos.remove);

  if (todos === undefined) return <p>Cargando tareas...</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <input 
            type="checkbox" 
            checked={todo.completada} 
            onChange={() => toggleTodo({ id: todo._id, completada: !todo.completada })}
          />
          {todo.titulo}
          <button onClick={() => deleteTodo({ id: todo._id })}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}