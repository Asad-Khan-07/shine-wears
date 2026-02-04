import React, { useContext, useState } from 'react';
import { Search, Eye, Edit, X } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
// import { CategoryContext } from '../../context/Category';
// import { useData } from '../../context/DataContext';
import { OrderContext } from '../../context/OrderContext';
import { UpdateOrder } from '../../services/UpdateOrder';

export default function AdminOrders() {
  // const { orders } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [uuid, setUuid] = useState();
  const [status, setStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { order } = useContext(OrderContext);
  
  // console.log(order.uuid || []);
  
  
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  
  const orders = (order || []).map((o) => ({
    id: o.id,
  customerName: `${o.first_Name} ${o.last_Name}`,
  customerEmail: o.email,
  phone:o.Phone,
  date: new Date(o.created_at).toLocaleDateString("en-GB"),
  items: (o.items || []).map((i) => ({
    name: i.Item,
    quantity: i.Quantity,
    price: i.Quantity ? i.Total / i.Quantity : 0
  })),
  total: o.Total,
  quantity: o.Quantity,
  status: o.status,
  address:o.Address,
  city:o.City,
  state:o.State,
  zipcode:o.zip_Code,
  uuid:o.uuid
}));
const filteredOrders = orders.filter(order => {
  const matchesSearch = 
  order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  order.id.toString().includes(searchQuery);
  const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
  return matchesSearch && matchesStatus;
});

const open=(u)=>{
  setIsModalOpen(true);
  console.log(u);
  console.log(status);
  setUuid(u)
  
}

const close=()=>{
  setIsModalOpen(false)
}
  return (
    <AdminLayout>
     
     



{isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-background w-full max-w-xl rounded-xl shadow-2xl border border-border flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">
          Update Order Status
        </h2>
        <button
          onClick={close}
          className="text-muted-foreground hover:text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 flex-1 overflow-y-auto space-y-4">
        <label className="text-sm font-medium">Order Status</label>
<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full luxury-input"
>
  <option value="all">All Status</option>

  {statuses.map((status) => (
    <option key={status} value={status.toLowerCase()}>
      {status}
    </option>
  ))}
</select>

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button
          onClick={close}
          className="px-4 py-2 rounded-md border hover:bg-muted transition"
        >
          Cancel
        </button>

        <button
          onClick={() => UpdateOrder(uuid,status)}
          className="luxury-button px-6"
        >
          Update Status
        </button>
      </div>

    </div>
  </div>
)}

     
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl luxury-heading">Orders</h1>
          <p className="text-muted-foreground mt-1">View and manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statuses.map((status) => {
            const count = orders.filter(o => o.status === status.toLowerCase()).length;
            return (
              <div key={status} className="admin-card text-center">
                <p className="text-2xl font-semibold">{count}</p>
                <p className="text-sm text-muted-foreground">{status}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxury-input pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="luxury-input w-full md:w-48"
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status.toLowerCase()}>{status}</option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Items</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-4 font-medium">#{order.id}</td>
                    <td className="py-4">
                      <div>
                        <p>{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{order.date}</td>
                    <td className="py-4 text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="py-4 font-medium">${order.total.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-muted rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                       <button onClick={()=>open(order.uuid)}
                       
                       className="p-2 hover:bg-muted rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No orders found
              </div>
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background w-full max-w-lg rounded-lg shadow-xl">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl luxury-heading">Order #{selectedOrder.id}</h2>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer</h3>
                  <p>{selectedOrder.customerName}</p>
                  <p className="text-muted-foreground">email: {selectedOrder.customerEmail}</p>
                  <p className="text-muted-foreground">phone: {selectedOrder.phone}</p> 
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Date</h3>
                  <p>{selectedOrder.date}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                        {/* <span>{item.address}</span> */}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>${selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-medium">
                    <span>City</span>
                    <span>{selectedOrder.city}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-medium">
                    <span>State</span>
                    <span>{selectedOrder.state}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Address</span>
                    <span>{selectedOrder.address}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Zip Code</span>
                    <span>{selectedOrder.zipcode}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full luxury-button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}


