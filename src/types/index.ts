export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessNumber: string;
  bankAccount: string;
  bankName: string;
  accountHolder: string;
  joinedAt: string;
  status: "active" | "inactive" | "pending";
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "sale" | "soldout" | "hidden";
  createdAt: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  orderedAt: string;
}

export interface Settlement {
  id: string;
  period: string;
  totalSales: number;
  commission: number;
  netAmount: number;
  status: "pending" | "processing" | "completed" | "requested";
  settledAt?: string;
}

export interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  totalPartners: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
  partnersChange: number;
  conversionChange: number;
}

export interface ChartData {
  label: string;
  value: number;
}
