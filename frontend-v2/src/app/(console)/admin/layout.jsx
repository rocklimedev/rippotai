// app/admin/layout.jsx

import AdminLayout from './AdminLayout';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }) {
  return (
    <AdminLayout>
      {children} <Toaster />
    </AdminLayout>
  );
}
