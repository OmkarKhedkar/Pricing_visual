import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  BarChart,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
  color?: "default" | "success" | "warning" | "danger";
}

const KPICard = ({
  title = "Metric",
  value = "0",
  change = 0,
  changeLabel = "vs last period",
  icon,
  trend = "neutral",
  description = "",
  color = "default",
}: KPICardProps) => {
  const getColorClass = () => {
    switch (color) {
      case "success":
        return "bg-green-50 border-green-100";
      case "warning":
        return "bg-yellow-50 border-yellow-100";
      case "danger":
        return "bg-red-50 border-red-100";
      default:
        return "bg-white";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    } else if (trend === "down") {
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getChangeColor = () => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card className={`h-full ${getColorClass()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          <div className="p-2 rounded-full bg-gray-100">
            {icon || <BarChart className="h-5 w-5 text-gray-600" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          {getTrendIcon()}
          <span className="text-xs text-gray-500 ml-1">{changeLabel}</span>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

interface KPIOverviewProps {
  metrics?: KPICardProps[];
}

const KPIOverview = ({ metrics }: KPIOverviewProps) => {
  const defaultMetrics: KPICardProps[] = [
    {
      title: "Overall Margin Health",
      value: "28.4%",
      change: 2.1,
      changeLabel: "vs last quarter",
      trend: "up",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      description: "Margin is improving across most product categories",
      color: "success",
    },
    {
      title: "Pricing Optimization Potential",
      value: "$1.2M",
      change: -0.5,
      changeLabel: "vs target",
      trend: "down",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      description: "Opportunity to recover margin through price adjustments",
      color: "warning",
    },
    {
      title: "Anomalies Detected",
      value: "12",
      change: 4,
      changeLabel: "new this week",
      trend: "up",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      description: "Pricing inconsistencies requiring attention",
      color: "danger",
    },
    {
      title: "AI Recommendations",
      value: "24",
      change: 8,
      changeLabel: "pending review",
      trend: "up",
      icon: <BarChart className="h-5 w-5 text-purple-600" />,
      description: "Price adjustment suggestions based on market data",
      color: "default",
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayMetrics.map((metric, index) => (
          <KPICard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KPIOverview;
