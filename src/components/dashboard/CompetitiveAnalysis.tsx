import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";
import {
  Download,
  Filter,
  Info,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Share2,
  Zap,
  Target,
  ArrowUpRight,
} from "lucide-react";

interface CompetitiveAnalysisProps {
  data?: {
    marketComparison?: MarketComparisonData[];
    pricePositioning?: PricePositioningData[];
    competitorTrends?: CompetitorTrendData[];
    marketShare?: MarketShareData[];
    competitorPriceMatrix?: CompetitorPriceMatrixData[];
    competitorActivity?: CompetitorActivityData[];
  };
  timeFrame?: string;
  onFilterChange?: (filter: string) => void;
  onTimeFrameChange?: (timeFrame: string) => void;
  onExport?: () => void;
}

interface MarketComparisonData {
  category: string;
  yourPrice: number;
  marketAverage: number;
  marketLow: number;
  marketHigh: number;
  margin: number;
  volume: number;
}

interface PricePositioningData {
  competitor: string;
  premium: number;
  value: number;
  budget: number;
  growth: number;
}

interface CompetitorTrendData {
  month: string;
  yourPrice: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
  marketAverage: number;
}

interface MarketShareData {
  name: string;
  value: number;
  color: string;
  growth: number;
  forecast: number;
}

interface CompetitorPriceMatrixData {
  name: string;
  price: number;
  quality: number;
  marketShare: number;
  color: string;
}

interface CompetitorActivityData {
  date: string;
  competitor: string;
  action: string;
  impact: "high" | "medium" | "low";
  description: string;
}

const defaultMarketComparison: MarketComparisonData[] = [
  {
    category: "Enterprise Server",
    yourPrice: 8500,
    marketAverage: 8000,
    marketLow: 6500,
    marketHigh: 9500,
    margin: 42,
    volume: 120,
  },
  {
    category: "Cloud Security",
    yourPrice: 12000,
    marketAverage: 11000,
    marketLow: 9000,
    marketHigh: 13000,
    margin: 58,
    volume: 85,
  },
  {
    category: "Managed Services",
    yourPrice: 6500,
    marketAverage: 7500,
    marketLow: 6000,
    marketHigh: 9000,
    margin: 35,
    volume: 210,
  },
  {
    category: "Data Analytics",
    yourPrice: 9500,
    marketAverage: 9000,
    marketLow: 7500,
    marketHigh: 10500,
    margin: 48,
    volume: 95,
  },
  {
    category: "Network Bundle",
    yourPrice: 15000,
    marketAverage: 14000,
    marketLow: 12000,
    marketHigh: 16000,
    margin: 52,
    volume: 65,
  },
  {
    category: "Storage Solutions",
    yourPrice: 7200,
    marketAverage: 7500,
    marketLow: 6800,
    marketHigh: 8200,
    margin: 44,
    volume: 150,
  },
  {
    category: "AI Platform",
    yourPrice: 18500,
    marketAverage: 17000,
    marketLow: 15500,
    marketHigh: 19500,
    margin: 62,
    volume: 40,
  },
];

const defaultPricePositioning: PricePositioningData[] = [
  {
    competitor: "Your Company",
    premium: 35,
    value: 45,
    budget: 20,
    growth: 8.2,
  },
  {
    competitor: "TechGiant Inc",
    premium: 40,
    value: 35,
    budget: 25,
    growth: 12.5,
  },
  {
    competitor: "CloudServe Ltd",
    premium: 25,
    value: 50,
    budget: 25,
    growth: 5.8,
  },
  {
    competitor: "DataSystems Corp",
    premium: 45,
    value: 30,
    budget: 25,
    growth: -2.3,
  },
  {
    competitor: "NetSolutions",
    premium: 30,
    value: 40,
    budget: 30,
    growth: 7.1,
  },
];

const defaultCompetitorTrends: CompetitorTrendData[] = [
  {
    month: "Jan",
    yourPrice: 100,
    competitor1: 95,
    competitor2: 105,
    competitor3: 90,
    marketAverage: 97,
  },
  {
    month: "Feb",
    yourPrice: 102,
    competitor1: 97,
    competitor2: 103,
    competitor3: 92,
    marketAverage: 98,
  },
  {
    month: "Mar",
    yourPrice: 101,
    competitor1: 99,
    competitor2: 102,
    competitor3: 94,
    marketAverage: 99,
  },
  {
    month: "Apr",
    yourPrice: 103,
    competitor1: 100,
    competitor2: 101,
    competitor3: 95,
    marketAverage: 100,
  },
  {
    month: "May",
    yourPrice: 105,
    competitor1: 102,
    competitor2: 100,
    competitor3: 97,
    marketAverage: 101,
  },
  {
    month: "Jun",
    yourPrice: 107,
    competitor1: 103,
    competitor2: 102,
    competitor3: 98,
    marketAverage: 102,
  },
  {
    month: "Jul",
    yourPrice: 108,
    competitor1: 105,
    competitor2: 103,
    competitor3: 99,
    marketAverage: 104,
  },
  {
    month: "Aug",
    yourPrice: 110,
    competitor1: 107,
    competitor2: 104,
    competitor3: 101,
    marketAverage: 105,
  },
  {
    month: "Sep",
    yourPrice: 112,
    competitor1: 108,
    competitor2: 106,
    competitor3: 102,
    marketAverage: 107,
  },
];

const defaultMarketShare: MarketShareData[] = [
  {
    name: "Your Company",
    value: 28,
    color: "#4ade80",
    growth: 2.3,
    forecast: 30,
  },
  {
    name: "TechGiant Inc",
    value: 32,
    color: "#60a5fa",
    growth: 1.1,
    forecast: 33,
  },
  {
    name: "CloudServe Ltd",
    value: 22,
    color: "#f97316",
    growth: -0.8,
    forecast: 21,
  },
  {
    name: "DataSystems Corp",
    value: 18,
    color: "#a78bfa",
    growth: -1.5,
    forecast: 16,
  },
];

const defaultCompetitorPriceMatrix: CompetitorPriceMatrixData[] = [
  {
    name: "Your Company",
    price: 75,
    quality: 82,
    marketShare: 28,
    color: "#4ade80",
  },
  {
    name: "TechGiant Inc",
    price: 85,
    quality: 88,
    marketShare: 32,
    color: "#60a5fa",
  },
  {
    name: "CloudServe Ltd",
    price: 65,
    quality: 72,
    marketShare: 22,
    color: "#f97316",
  },
  {
    name: "DataSystems Corp",
    price: 90,
    quality: 80,
    marketShare: 18,
    color: "#a78bfa",
  },
  {
    name: "NetSolutions",
    price: 70,
    quality: 75,
    marketShare: 12,
    color: "#f43f5e",
  },
];

const defaultCompetitorActivity: CompetitorActivityData[] = [
  {
    date: "2023-09-15",
    competitor: "TechGiant Inc",
    action: "Price Increase",
    impact: "high",
    description: "Raised enterprise solution prices by 8% across all tiers",
  },
  {
    date: "2023-09-02",
    competitor: "CloudServe Ltd",
    action: "New Product Launch",
    impact: "medium",
    description:
      "Launched new AI-powered analytics platform at competitive price point",
  },
  {
    date: "2023-08-28",
    competitor: "DataSystems Corp",
    action: "Promotional Discount",
    impact: "medium",
    description: "Offering 15% discount on annual contracts for next 30 days",
  },
  {
    date: "2023-08-15",
    competitor: "TechGiant Inc",
    action: "Bundle Offering",
    impact: "high",
    description:
      "New security + cloud storage bundle at 12% discount to individual products",
  },
  {
    date: "2023-08-10",
    competitor: "NetSolutions",
    action: "Market Exit",
    impact: "low",
    description: "Discontinuing legacy storage product line by end of quarter",
  },
];

const CompetitiveAnalysis = ({
  data = {
    marketComparison: defaultMarketComparison,
    pricePositioning: defaultPricePositioning,
    competitorTrends: defaultCompetitorTrends,
    marketShare: defaultMarketShare,
    competitorPriceMatrix: defaultCompetitorPriceMatrix,
    competitorActivity: defaultCompetitorActivity,
  },
  timeFrame = "quarterly",
  onFilterChange = () => {},
  onTimeFrameChange = () => {},
  onExport = () => {},
}: CompetitiveAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("market-comparison");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompetitor, setSelectedCompetitor] = useState("all");

  // Calculate price position relative to market
  const pricePositionSummary = data.marketComparison?.reduce(
    (acc, item) => {
      if (item.yourPrice > item.marketAverage) {
        acc.above += 1;
      } else if (item.yourPrice < item.marketAverage) {
        acc.below += 1;
      } else {
        acc.equal += 1;
      }
      return acc;
    },
    { above: 0, equal: 0, below: 0 },
  );

  // Calculate average premium/discount
  const averagePremium =
    data.marketComparison?.reduce((sum, item) => {
      return (
        sum + ((item.yourPrice - item.marketAverage) / item.marketAverage) * 100
      );
    }, 0) / (data.marketComparison?.length || 1);

  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get impact badge color
  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Competitive Analysis
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Market price comparison and competitive positioning
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={timeFrame}
              onValueChange={(value) => onTimeFrameChange(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center mt-4 gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge
              className={`${averagePremium >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} flex items-center gap-1`}
            >
              {averagePremium >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {Math.abs(averagePremium).toFixed(1)}%{" "}
                {averagePremium >= 0 ? "Premium" : "Discount"}
              </span>
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Average price premium/discount compared to market average
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Price Position:</span>
            <Badge className="bg-green-100 text-green-800">
              {pricePositionSummary?.above || 0} Above
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {pricePositionSummary?.equal || 0} Equal
            </Badge>
            <Badge className="bg-red-100 text-red-800">
              {pricePositionSummary?.below || 0} Below
            </Badge>
          </div>

          <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Last Updated: Sep 15, 2023</span>
          </Badge>

          {averagePremium > 10 && (
            <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 ml-auto">
              <AlertTriangle className="h-3 w-3" />
              <span>Premium Pricing Risk</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="market-comparison">
                Market Comparison
              </TabsTrigger>
              <TabsTrigger value="price-positioning">
                Price Positioning
              </TabsTrigger>
              <TabsTrigger value="competitor-trends">
                Competitor Trends
              </TabsTrigger>
              <TabsTrigger value="market-share">Market Share</TabsTrigger>
              <TabsTrigger value="price-quality">Price/Quality</TabsTrigger>
              <TabsTrigger value="competitor-activity">
                Recent Activity
              </TabsTrigger>
              <TabsTrigger value="win-loss">Win/Loss Analysis</TabsTrigger>
              <TabsTrigger value="price-elasticity">
                Price Elasticity
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="enterprise-server">
                    Enterprise Server
                  </SelectItem>
                  <SelectItem value="cloud-security">Cloud Security</SelectItem>
                  <SelectItem value="managed-services">
                    Managed Services
                  </SelectItem>
                  <SelectItem value="data-analytics">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-grow overflow-hidden">
            <TabsContent
              value="market-comparison"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Your price compared to market range across product categories
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.marketComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      label={{
                        value: "Price ($)",
                        angle: -90,
                        position: "insideLeft",
                        style: { fontSize: 12 },
                      }}
                    />
                    <RechartsTooltip
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()}`,
                        name.replace(/([A-Z])/g, " $1").trim(),
                      ]}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.category}</p>
                              <p className="text-sm text-gray-600">
                                Your Price:{" "}
                                <span className="font-semibold">
                                  ${data.yourPrice.toLocaleString()}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Market Avg:{" "}
                                <span className="font-semibold">
                                  ${data.marketAverage.toLocaleString()}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Market Range:{" "}
                                <span className="font-semibold">
                                  ${data.marketLow.toLocaleString()} - $
                                  {data.marketHigh.toLocaleString()}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Margin:{" "}
                                <span className="font-semibold">
                                  {data.margin}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Volume:{" "}
                                <span className="font-semibold">
                                  {data.volume} units
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="marketLow"
                      fill="#d1d5db"
                      name="Market Low"
                      stackId="a"
                    />
                    <Bar
                      dataKey="marketAverage"
                      fill="#93c5fd"
                      name="Market Average"
                      stackId="b"
                    />
                    <Bar
                      dataKey="marketHigh"
                      fill="#bfdbfe"
                      name="Market High"
                      stackId="c"
                    />
                    <Bar
                      dataKey="yourPrice"
                      fill="#4ade80"
                      name="Your Price"
                      stackId="d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent
              value="price-positioning"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Competitive positioning across price segments
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.pricePositioning}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      dataKey="competitor"
                      type="category"
                      tick={{ fontSize: 12 }}
                      width={100}
                    />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.competitor}</p>
                              <p className="text-sm text-gray-600">
                                Premium Segment:{" "}
                                <span className="font-semibold">
                                  {data.premium}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Value Segment:{" "}
                                <span className="font-semibold">
                                  {data.value}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Budget Segment:{" "}
                                <span className="font-semibold">
                                  {data.budget}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600 mt-2">
                                YoY Growth:{" "}
                                <span
                                  className={`font-semibold ${data.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {data.growth > 0 ? "+" : ""}
                                  {data.growth}%
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="premium"
                      stackId="a"
                      fill="#4ade80"
                      name="Premium Segment"
                    />
                    <Bar
                      dataKey="value"
                      stackId="a"
                      fill="#60a5fa"
                      name="Value Segment"
                    />
                    <Bar
                      dataKey="budget"
                      stackId="a"
                      fill="#f97316"
                      name="Budget Segment"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent
              value="competitor-trends"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Price trend analysis over time compared to key competitors
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.competitorTrends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis
                      domain={["dataMin - 5", "dataMax + 5"]}
                      label={{
                        value: "Price Index",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{label}</p>
                              {payload.map((entry, index) => (
                                <p
                                  key={`item-${index}`}
                                  className="text-sm"
                                  style={{ color: entry.color }}
                                >
                                  {entry.name}:{" "}
                                  <span className="font-semibold">
                                    {entry.value}
                                  </span>
                                </p>
                              ))}
                              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                                Index: 100 = January base price
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="yourPrice"
                      stroke="#4ade80"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Your Price"
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor1"
                      stroke="#60a5fa"
                      dot={{ r: 3 }}
                      name="TechGiant Inc"
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor2"
                      stroke="#f97316"
                      dot={{ r: 3 }}
                      name="CloudServe Ltd"
                    />
                    <Line
                      type="monotone"
                      dataKey="competitor3"
                      stroke="#a78bfa"
                      dot={{ r: 3 }}
                      name="DataSystems Corp"
                    />
                    <Line
                      type="monotone"
                      dataKey="marketAverage"
                      stroke="#94a3b8"
                      strokeDasharray="5 5"
                      dot={{ r: 0 }}
                      name="Market Average"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent
              value="market-share"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Market share distribution among key competitors
              </div>
              <div className="flex-grow flex">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.marketShare}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                        labelLine={true}
                      >
                        {data.marketShare?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded shadow-sm">
                                <p className="font-bold">{data.name}</p>
                                <p className="text-sm text-gray-600">
                                  Market Share:{" "}
                                  <span className="font-semibold">
                                    {data.value}%
                                  </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  YoY Growth:{" "}
                                  <span
                                    className={`font-semibold ${data.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {data.growth > 0 ? "+" : ""}
                                    {data.growth}%
                                  </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  Forecast (EOY):{" "}
                                  <span className="font-semibold">
                                    {data.forecast}%
                                  </span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Market Share Analysis
                  </h3>
                  <div className="space-y-4">
                    {data.marketShare?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{item.value}%</span>
                          <span
                            className={`text-xs ${item.growth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                          >
                            {item.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-0.5" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-0.5" />
                            )}
                            {item.growth > 0 ? "+" : ""}
                            {item.growth}%
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-1">
                        <span className="text-green-500">•</span>
                        <span>
                          Your company holds {data.marketShare?.[0].value}%
                          market share, ranking #2 in the industry with{" "}
                          {data.marketShare?.[0].growth > 0
                            ? "positive"
                            : "negative"}{" "}
                          growth of {Math.abs(data.marketShare?.[0].growth)}%
                        </span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-yellow-500">•</span>
                        <span>
                          TechGiant leads with {data.marketShare?.[1].value}%
                          share but growth has slowed to just{" "}
                          {data.marketShare?.[1].growth}%
                        </span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        <span>
                          Both CloudServe and DataSystems are losing market
                          share, creating an opportunity to gain 2-3% through
                          targeted pricing
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="price-quality"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Price vs. Quality positioning matrix
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="quality"
                      name="Quality Score"
                      domain={[60, 100]}
                      label={{
                        value: "Quality Score (0-100)",
                        position: "bottom",
                        offset: 0,
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="price"
                      name="Price Index"
                      domain={[60, 100]}
                      label={{
                        value: "Price Index (0-100)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="marketShare"
                      range={[50, 400]}
                      name="Market Share"
                    />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.name}</p>
                              <p className="text-sm text-gray-600">
                                Quality Score:{" "}
                                <span className="font-semibold">
                                  {data.quality}/100
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Price Index:{" "}
                                <span className="font-semibold">
                                  {data.price}/100
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Market Share:{" "}
                                <span className="font-semibold">
                                  {data.marketShare}%
                                </span>
                              </p>
                              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                                {data.name === "Your Company" ? (
                                  <span>Your position in the market</span>
                                ) : (
                                  <span>Competitor position</span>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    {data.competitorPriceMatrix?.map((item, index) => (
                      <Scatter
                        key={index}
                        name={item.name}
                        data={[item]}
                        fill={item.color}
                        shape={item.name === "Your Company" ? "star" : "circle"}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h4 className="text-sm font-medium">
                    Strategic Positioning Insight
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your company offers better value (quality-to-price ratio) than
                  TechGiant and DataSystems, but CloudServe is positioned as the
                  value leader. Consider emphasizing quality advantages in
                  marketing materials to justify premium over CloudServe.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="competitor-activity"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Recent competitor pricing activities and market moves
              </div>
              <div className="flex-grow overflow-auto">
                <div className="space-y-3">
                  {data.competitorActivity?.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactBadgeColor(item.impact)}>
                              {item.impact.charAt(0).toUpperCase() +
                                item.impact.slice(1)}{" "}
                              Impact
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatDate(item.date)}
                            </span>
                          </div>
                          <h4 className="font-medium mt-1">
                            {item.competitor}: {item.action}
                          </h4>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Zap className="h-3 w-3 text-yellow-500" />
                          <span>Action Required</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {item.description}
                      </p>
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                        >
                          View Analysis
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="win-loss"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Win/loss analysis by competitor and price point
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { competitor: "Your Company", won: 68, lost: 32 },
                      { competitor: "TechGiant Inc", won: 72, lost: 28 },
                      { competitor: "CloudServe Ltd", won: 58, lost: 42 },
                      { competitor: "DataSystems Corp", won: 45, lost: 55 },
                      { competitor: "NetSolutions", won: 52, lost: 48 },
                    ]}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      dataKey="competitor"
                      type="category"
                      tick={{ fontSize: 12 }}
                      width={100}
                    />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.competitor}</p>
                              <p className="text-sm text-gray-600">
                                Win Rate:{" "}
                                <span className="font-semibold text-green-600">
                                  {data.won}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Loss Rate:{" "}
                                <span className="font-semibold text-red-600">
                                  {data.lost}%
                                </span>
                              </p>
                              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                                Based on last 100 competitive deals
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="won"
                      name="Win Rate"
                      fill="#4ade80"
                      stackId="a"
                    />
                    <Bar
                      dataKey="lost"
                      name="Loss Rate"
                      fill="#f87171"
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h4 className="text-sm font-medium">
                    Win/Loss Analysis Insights
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your company's win rate is 4% below the market leader
                  (TechGiant). Analysis shows that 65% of losses were due to
                  pricing issues, with deals lost most frequently when pricing
                  is more than 8% above competitors.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="price-elasticity"
              className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="text-sm text-gray-500 mb-2">
                Price elasticity analysis across product categories
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      {
                        priceChange: -15,
                        volumeChange: 22,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: -10,
                        volumeChange: 15,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: -5,
                        volumeChange: 7,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: 0,
                        volumeChange: 0,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: 5,
                        volumeChange: -4,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: 10,
                        volumeChange: -12,
                        category: "Enterprise Server",
                      },
                      {
                        priceChange: 15,
                        volumeChange: -18,
                        category: "Enterprise Server",
                      },

                      {
                        priceChange: -15,
                        volumeChange: 35,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: -10,
                        volumeChange: 25,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: -5,
                        volumeChange: 12,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: 0,
                        volumeChange: 0,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: 5,
                        volumeChange: -8,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: 10,
                        volumeChange: -20,
                        category: "Cloud Security",
                      },
                      {
                        priceChange: 15,
                        volumeChange: -30,
                        category: "Cloud Security",
                      },

                      {
                        priceChange: -15,
                        volumeChange: 18,
                        category: "Managed Services",
                      },
                      {
                        priceChange: -10,
                        volumeChange: 12,
                        category: "Managed Services",
                      },
                      {
                        priceChange: -5,
                        volumeChange: 5,
                        category: "Managed Services",
                      },
                      {
                        priceChange: 0,
                        volumeChange: 0,
                        category: "Managed Services",
                      },
                      {
                        priceChange: 5,
                        volumeChange: -3,
                        category: "Managed Services",
                      },
                      {
                        priceChange: 10,
                        volumeChange: -8,
                        category: "Managed Services",
                      },
                      {
                        priceChange: 15,
                        volumeChange: -14,
                        category: "Managed Services",
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="priceChange"
                      label={{
                        value: "Price Change (%)",
                        position: "bottom",
                        offset: 0,
                      }}
                      tickFormatter={(value) =>
                        `${value > 0 ? "+" : ""}${value}%`
                      }
                    />
                    <YAxis
                      label={{
                        value: "Volume Change (%)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      tickFormatter={(value) =>
                        `${value > 0 ? "+" : ""}${value}%`
                      }
                    />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const elasticity =
                            Math.abs(data.volumeChange / data.priceChange) || 0;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.category}</p>
                              <p className="text-sm text-gray-600">
                                Price Change:{" "}
                                <span className="font-semibold">
                                  {data.priceChange > 0 ? "+" : ""}
                                  {data.priceChange}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Volume Change:{" "}
                                <span className="font-semibold">
                                  {data.volumeChange > 0 ? "+" : ""}
                                  {data.volumeChange}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Elasticity:{" "}
                                <span className="font-semibold">
                                  {elasticity.toFixed(2)}
                                </span>
                              </p>
                              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                                {elasticity > 1
                                  ? "Elastic (price sensitive)"
                                  : "Inelastic (price insensitive)"}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="volumeChange"
                      stroke="#4ade80"
                      name="Enterprise Server"
                      strokeWidth={2}
                      dot={{ fill: "#4ade80", r: 4 }}
                      connectNulls={true}
                      data={[
                        { priceChange: -15, volumeChange: 22 },
                        { priceChange: -10, volumeChange: 15 },
                        { priceChange: -5, volumeChange: 7 },
                        { priceChange: 0, volumeChange: 0 },
                        { priceChange: 5, volumeChange: -4 },
                        { priceChange: 10, volumeChange: -12 },
                        { priceChange: 15, volumeChange: -18 },
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="volumeChange"
                      stroke="#60a5fa"
                      name="Cloud Security"
                      strokeWidth={2}
                      dot={{ fill: "#60a5fa", r: 4 }}
                      connectNulls={true}
                      data={[
                        { priceChange: -15, volumeChange: 35 },
                        { priceChange: -10, volumeChange: 25 },
                        { priceChange: -5, volumeChange: 12 },
                        { priceChange: 0, volumeChange: 0 },
                        { priceChange: 5, volumeChange: -8 },
                        { priceChange: 10, volumeChange: -20 },
                        { priceChange: 15, volumeChange: -30 },
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="volumeChange"
                      stroke="#f97316"
                      name="Managed Services"
                      strokeWidth={2}
                      dot={{ fill: "#f97316", r: 4 }}
                      connectNulls={true}
                      data={[
                        { priceChange: -15, volumeChange: 18 },
                        { priceChange: -10, volumeChange: 12 },
                        { priceChange: -5, volumeChange: 5 },
                        { priceChange: 0, volumeChange: 0 },
                        { priceChange: 5, volumeChange: -3 },
                        { priceChange: 10, volumeChange: -8 },
                        { priceChange: 15, volumeChange: -14 },
                      ]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h4 className="text-sm font-medium">Elasticity Insights</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Cloud Security shows the highest price elasticity (2.0),
                  indicating customers are most sensitive to price changes in
                  this category. Enterprise Server has moderate elasticity
                  (1.2), while Managed Services is relatively inelastic (0.8),
                  suggesting opportunity for targeted price increases.
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
