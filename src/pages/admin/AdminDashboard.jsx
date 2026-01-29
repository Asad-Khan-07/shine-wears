import React from 'react';
import { Package, Tags, ShoppingCart, DollarSign, TrendingUp, Users } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { products, categories, orders } = useData();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Products',
      value: products.length,
      icon: Package,
      change: '+3',
      changeType: 'positive'
    },
    {
      name: 'Categories',
      value: categories.length,
      icon: Tags,
      change: '0',
      changeType: 'neutral'
    },
    {
      name: 'Pending Orders',
      value: pendingOrders,
      icon: ShoppingCart,
      change: '-2',
      changeType: 'negative'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl luxury-heading">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to Luxe Jewels Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="admin-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  stat.changeType === 'positive' ? 'text-green-500' :
                  stat.changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
                }`} />
                <span className={
                  stat.changeType === 'positive' ? 'text-green-500' :
                  stat.changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
                }>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="admin-card">
          <h2 className="text-xl luxury-heading mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-4 font-medium">#{order.id}</td>
                    <td className="py-4">{order.customerName}</td>
                    <td className="py-4 text-muted-foreground">{order.date}</td>
                    <td className="py-4">${order.total.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card">
            <h2 className="text-xl luxury-heading mb-6">Top Categories</h2>
            <div className="space-y-4">
              {categories.map((category) => {
                const productCount = products.filter(p => p.categoryId === category.id).length;
                const percentage = (productCount / products.length) * 100 || 0;
                return (
                  <div key={category.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">{productCount} products</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-xl luxury-heading mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="/admin/products" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">Add Product</p>
              </a>
              <a href="/admin/categories" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center">
                <Tags className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">Add Category</p>
              </a>
              <a href="/admin/orders" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">View Orders</p>
              </a>
              <a href="/" target="_blank" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">View Store</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
