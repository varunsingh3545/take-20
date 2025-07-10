import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="-md scale-105  -200 -out btn-hover:border min-h-screen flex w-full">
        <AdminSidebar />
        <main className="-md scale-105  -200 -out btn-hover:border flex-1 overflow-hidden">
          <header className="-md scale-105  -200 -out btn-hover:border h-12 flex items-center border-b px-4">
            <SidebarTrigger />
          </header>
          <div className="-md scale-105  -200 -out btn-hover:border p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}