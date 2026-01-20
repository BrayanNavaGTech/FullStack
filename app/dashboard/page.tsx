import { UserButton } from "@clerk/nextjs";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import { getSettings } from "@/sanity/lib/queries";

export default async function DashboardPage() {
  const settings = await getSettings();

  const limitMsg = settings?.limitReachedMessage;
  const freeText = settings?.freePlanDescription;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold">
          <a href="/">To Do</a>
        </h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        <TodoForm limitMessage={limitMsg} freePlanText={freeText} />
        <TodoList />
      </main>
    </div>
  );
}