// Dashboard card configuration (key used to map into selector results for values).
import { Users, ShoppingCart, DollarSign, Clock } from "lucide-react";

export const dashboardCards = [
  {
    key: "revenue",
    title: "Total Revenue",
    icon: DollarSign,
    description: "Total earnings from all completed orders",
  },
  {
    key: "users",
    title: "Total Users",
    icon: Users,
    description: "Registered users on the platform",
  },
  {
    key: "orders",
    title: "Total Orders",
    icon: ShoppingCart,
    description: "Orders placed by customers",
  },
  {
    key: "pendingOrders",
    title: "Pending Orders",
    icon: Clock,
    description: "Orders currently being processed",
  },
];