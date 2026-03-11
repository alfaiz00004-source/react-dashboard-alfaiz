import { DollarSign, TrendingUp, Package, Users, ShoppingCart, Target } from "lucide-react";

export const analyticsCards = [
  {
    key: "monthlyRevenue",
    title: "Monthly Revenue",
    icon: DollarSign,
    description: "Revenue generated this month"
  },
  {
    key: "growthRate",
    title: "Revenue Growth",
    icon: TrendingUp,
    description: "Growth compared to last month"
  },
  {
    key: "completedOrders",
    title: "Completed Orders",
    icon: Package,
    description: "Orders successfully delivered"
  },
  {
    key: "activeUsers",
    title: "Active Users",
    icon: Users,
    description: "Users active this month"
  },
  {
    key: "avgOrderValue",
    title: "Avg Order Value",
    icon: ShoppingCart,
    description: "Average value per order"
  },
  {
    key: "conversionRate",
    title: "Conversion Rate",
    icon: Target,
    description: "Visitors converted to customers"
  }
];