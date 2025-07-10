import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogSubmit from "./pages/BlogSubmit";
import Contact from "./pages/Contact";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingPosts from "./pages/admin/PendingPosts";
import ApprovedPosts from "./pages/admin/ApprovedPosts";
import Users from "./pages/admin/Users";
import NotFound from "./pages/NotFound";
import WriteBlog from "./pages/admin/WriteBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
        <Route path="/admin/posts" element={<AdminBlogPosts />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin/gallery" element={<Gallery />} />
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/submit" 
              element={
                <ProtectedRoute requiredRole="author">
                  <BlogSubmit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="pending" element={<PendingPosts />} />
              <Route path="approved" element={<ApprovedPosts />} />
              <Route path="users" element={<Users />} />
              <Route path="write-blog" element={<WriteBlog />} />
            </Route>
            {/* Service pages placeholders */}
            <Route path="/prevention" element={<div className="-md scale-105  -200 -out btn-hover:border min-h-screen flex items-center justify-center"><h1 className="-md scale-105  -200 -out btn-hover:border text-4xl font-bold">Prévention - Page en construction</h1></div>} />
            <Route path="/formation" element={<div className="-md scale-105  -200 -out btn-hover:border min-h-screen flex items-center justify-center"><h1 className="-md scale-105  -200 -out btn-hover:border text-4xl font-bold">Formation - Page en construction</h1></div>} />
            <Route path="/interventions" element={<div className="-md scale-105  -200 -out btn-hover:border min-h-screen flex items-center justify-center"><h1 className="-md scale-105  -200 -out btn-hover:border text-4xl font-bold">Interventions - Page en construction</h1></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;