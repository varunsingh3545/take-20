import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckCircle, Users, LogOut, PenTool, FolderOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const writingItems = [
  { title: 'Write Article', url: '/submit', icon: PenTool },
  { title: 'Write Blog', url: '/admin/write-blog', icon: PenTool },
];

const managementItems = [
  { title: 'Pending Posts', url: '/admin/pending', icon: FileText },
  { title: 'Approved Posts', url: '/admin/approved', icon: CheckCircle },
];

const adminItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const { signOut, userRole } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: st) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-muted text-primary font-medium' : 'bg-muted/50';

  // Filter items based on role
  const filteredAdminItems = adminItems.filter(item => {
    if (item.url === '/admin/users' && userRole !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible="icon">
      <SidebarTrigger className="-md scale-105  -200 -out btn-hover:border m-2 self-end" />
      
      <SidebarContent>
        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredAdminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="-md scale-105  -200 -out btn-hover:border mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Writing Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Écriture</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {writingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="-md scale-105  -200 -out btn-hover:border mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Blog Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestion des Articles</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="-md scale-105  -200 -out btn-hover:border mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="-md scale-105  -200 -out btn-hover:border mt-auto p-4">
          <Button
            variant=""
            onClick={signOut}
            className="-md scale-105  -200 -out btn-hover:border w-full"
            size={collapsed ? "icon" : "default"}
          >
            <LogOut className="-md scale-105  -200 -out btn-hover:border h-4 w-4" />
            {!collapsed && <span className="-md scale-105  -200 -out btn-hover:border ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}