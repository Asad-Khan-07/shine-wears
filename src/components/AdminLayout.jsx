import React from 'react';
import AdminSidebar from './AdminSidebar';
import ProtectedRoute from './ProtectedRoute';

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-muted">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
