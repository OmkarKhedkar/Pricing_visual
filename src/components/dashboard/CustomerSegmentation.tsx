import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  Download,
  Filter,
  Share2,
  RefreshCw,
  Users,
  DollarSign,
  TrendingUp,
  BarChart2,
  ChevronRight,
  Target,
  ArrowUpRight,
} from "lucide-react";

interface CustomerSegmentationProps {
  data?: {
    segmentDistribution?: SegmentDistributionData[];
    profitabilityMatrix?: ProfitabilityMatrixData[];
    lifetimeValue?: LifetimeValueData[];
    growthPotential?: GrowthPotentialData[];
  };
  timeFrame?: string;
  onFilterChange?: (filter: string) => void;
  onTimeFrameChange?: (timeFrame: string) => void;
  onExport?: () => void;
}

interface SegmentDistributionData {
  name: string;
  value: number;
  color: string;
  revenue: number;
  growth: number;
}

interface ProfitabilityMatrixData {
  segment: string;
  revenue: number;
  margin: number;
  size: number;
  color: string;
}

interface LifetimeValueData {
  segment: string;
  value: number;
  color: string;
}

interface GrowthPotentialData {
  segment: string;
  current: number;
  potential: number;
  gap: number;
}

const defaultSegmentDistribution: SegmentDistributionData[] = [
  {
    name: "Enterprise",
    value: 35,
    color: "#4ade80",
    revenue: 4200000,
    growth: 8.5,
  },
  {
    name: "Mid-Market",
    value: 28,
    color: "#60a5fa",
    revenue: 2800000,
    growth: 12.3,
  },
  { name: "SMB", value: 22, color: "#f97316", revenue: 1650000, growth: 5.2 },
  {
    name: "Public Sector",
    value: 15,
    color: "#a78bfa",
    revenue: 1200000,
    growth: -2.1,
  },
];

const defaultProfitabilityMatrix: ProfitabilityMatrixData[] = [
  {
    segment: "Enterprise - Financial",
    revenue: 1800000,
    margin: 62,
    size: 120,
    color: "#4ade80",
  },
  {
    segment: "Enterprise - Healthcare",
    revenue: 1400000,
    margin: 58,
    size: 95,
    color: "#4ade80",
  },
  {
    segment: "Enterprise - Technology",
    revenue: 1000000,
    margin: 52,
    size: 75,
    color: "#4ade80",
  },
  {
    segment: "Mid-Market - Financial",
    revenue: 950000,
    margin: 48,
    size: 85,
    color: "#60a5fa",
  },
  {
    segment: "Mid-Market - Healthcare",
    revenue: 850000,
    margin: 45,
    size: 70,
    color: "#60a5fa",
  },
  {
    segment: "Mid-Market - Technology",
    revenue: 1000000,
    margin: 42,
    size: 90,
    color: "#60a5fa",
  },
  {
    segment: "SMB - Financial",
    revenue: 550000,
    margin: 38,
    size: 120,
    color: "#f97316",
  },
  {
    segment: "SMB - Healthcare",
    revenue: 450000,
    margin: 35,
    size: 100,
    color: "#f97316",
  },
  {
    segment: "SMB - Technology",
    revenue: 650000,
    margin: 32,
    size: 150,
    color: "#f97316",
  },
  {
    segment: "Public - Federal",
    revenue: 750000,
    margin: 28,
    size: 50,
    color: "#a78bfa",
  },
  {
    segment: "Public - State",
    revenue: 450000,
    margin: 25,
    size: 40,
    color: "#a78bfa",
  },
];

const defaultLifetimeValue: LifetimeValueData[] = [
  { segment: "Enterprise", value: 850000, color: "#4ade80" },
  { segment: "Mid-Market", value: 420000, color: "#60a5fa" },
  { segment: "SMB", value: 125000, color: "#f97316" },
  { segment: "Public Sector", value: 380000, color: "#a78bfa" },
];

const defaultGrowthPotential: GrowthPotentialData[] = [
  { segment: "Enterprise", current: 4200000, potential: 5800000, gap: 1600000 },
  { segment: "Mid-Market", current: 2800000, potential: 4500000, gap: 1700000 },
  { segment: "SMB", current: 1650000, potential: 3200000, gap: 1550000 },
  {
    segment: "Public Sector",
    current: 1200000,
    potential: 1800000,
    gap: 600000,
  },
];

const CustomerSegmentation = ({
  data = {
    segmentDistribution: defaultSegmentDistribution,
    profitabilityMatrix: defaultProfitabilityMatrix,
    lifetimeValue: defaultLifetimeValue,
    growthPotential: defaultGrowthPotential,
  },
  timeFrame = "yearly",
  onFilterChange = () => {},
  onTimeFrameChange = () => {},
  onExport = () => {},
}: CustomerSegmentationProps) => {
  const [activeView, setActiveView] = useState<string>("distribution");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  // Calculate total revenue
  const totalRevenue =
    data.segmentDistribution?.reduce(
      (sum, segment) => sum + segment.revenue,
      0,
    ) || 0;

  // Calculate weighted average margin
  const weightedMargin =
    data.profitabilityMatrix?.reduce(
      (sum, segment) => sum + segment.revenue * segment.margin,
      0,
    ) /
      data.profitabilityMatrix?.reduce(
        (sum, segment) => sum + segment.revenue,
        0,
      ) || 0;

  // Calculate total growth potential
  const totalGrowthPotential =
    data.growthPotential?.reduce((sum, segment) => sum + segment.gap, 0) || 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Customer Segmentation Analysis
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Breakdown of customer segments by profitability and revenue
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
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="ttm">Trailing 12 Months</SelectItem>
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
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Total Customers</div>
              <div className="font-semibold">1,248</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Total Revenue</div>
              <div className="font-semibold">
                {formatCurrency(totalRevenue)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Avg. Margin</div>
              <div className="font-semibold">{weightedMargin.toFixed(1)}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
            <Target className="h-4 w-4 text-orange-600" />
            <div>
              <div className="text-xs text-gray-500">Growth Potential</div>
              <div className="font-semibold">
                {formatCurrency(totalGrowthPotential)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === "distribution" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("distribution")}
              className="flex items-center gap-1"
            >
              <PieChart className="h-4 w-4" />
              <span>Distribution</span>
            </Button>
            <Button
              variant={activeView === "profitability" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("profitability")}
              className="flex items-center gap-1"
            >
              <DollarSign className="h-4 w-4" />
              <span>Profitability</span>
            </Button>
            <Button
              variant={activeView === "lifetime" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("lifetime")}
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              <span>Lifetime Value</span>
            </Button>
            <Button
              variant={activeView === "growth" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("growth")}
              className="flex items-center gap-1"
            >
              <BarChart2 className="h-4 w-4" />
              <span>Growth Potential</span>
            </Button>
          </div>

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
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-grow overflow-hidden">
          {activeView === "distribution" && (
            <div className="h-full flex" style={{ minHeight: "400px" }}>
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.segmentDistribution}
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
                      {data.segmentDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.name}</p>
                              <p className="text-sm text-gray-600">
                                Segment Size:{" "}
                                <span className="font-semibold">
                                  {data.value}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Revenue:{" "}
                                <span className="font-semibold">
                                  {formatCurrency(data.revenue)}
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
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold mb-4">Segment Analysis</h3>
                <div className="space-y-4">
                  {data.segmentDistribution?.map((item, index) => (
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
                        <span className="font-semibold">
                          {formatCurrency(item.revenue)}
                        </span>
                        <span
                          className={`text-xs ${item.growth >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                        >
                          {item.growth > 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          ) : (
                            <TrendingUp className="h-3 w-3 mr-0.5 transform rotate-180" />
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
                        Enterprise segment generates{" "}
                        {data.segmentDistribution?.[0].value}% of customers but{" "}
                        {Math.round(
                          (data.segmentDistribution?.[0].revenue /
                            totalRevenue) *
                            100,
                        )}
                        % of revenue
                      </span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-blue-500">•</span>
                      <span>
                        Mid-Market showing strongest growth at{" "}
                        {data.segmentDistribution?.[1].growth}%, representing
                        significant expansion opportunity
                      </span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-red-500">•</span>
                      <span>
                        Public Sector declining at{" "}
                        {Math.abs(data.segmentDistribution?.[3].growth)}%,
                        requires strategic intervention
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeView === "profitability" && (
            <div className="h-full" style={{ minHeight: "400px" }}>
              <div className="text-sm text-gray-500 mb-2">
                Segment profitability matrix by revenue and margin
              </div>
              <div className="h-[calc(100%-2rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="revenue"
                      name="Revenue"
                      domain={[0, 2000000]}
                      tickFormatter={(value) => `$${value / 1000000}M`}
                      label={{
                        value: "Revenue",
                        position: "bottom",
                        offset: 0,
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="margin"
                      name="Margin %"
                      domain={[20, 70]}
                      label={{
                        value: "Margin %",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="size"
                      range={[50, 400]}
                      name="Customer Count"
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{data.segment}</p>
                              <p className="text-sm text-gray-600">
                                Revenue:{" "}
                                <span className="font-semibold">
                                  {formatCurrency(data.revenue)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Margin:{" "}
                                <span className="font-semibold">
                                  {data.margin}%
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Customers:{" "}
                                <span className="font-semibold">
                                  {data.size}
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    {data.profitabilityMatrix?.map((item, index) => {
                      // Extract the segment type from the segment name (before the dash)
                      const segmentType = item.segment.split(" - ")[0];
                      return (
                        <Scatter
                          key={index}
                          name={segmentType}
                          data={[item]}
                          fill={item.color}
                        />
                      );
                    })}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeView === "lifetime" && (
            <div className="h-full" style={{ minHeight: "400px" }}>
              <div className="text-sm text-gray-500 mb-2">
                Customer lifetime value by segment
              </div>
              <div className="h-[calc(100%-2rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.lifetimeValue}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="segment" />
                    <YAxis
                      tickFormatter={(value) => `$${value / 1000}k`}
                      label={{
                        value: "Lifetime Value ($)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${(value as number).toLocaleString()}`,
                        "Lifetime Value",
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Lifetime Value"
                      radius={[4, 4, 0, 0]}
                    >
                      {data.lifetimeValue?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeView === "growth" && (
            <div className="h-full" style={{ minHeight: "400px" }}>
              <div className="text-sm text-gray-500 mb-2">
                Revenue growth potential by segment
              </div>
              <div className="h-[calc(100%-2rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.growthPotential}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="segment" />
                    <YAxis
                      tickFormatter={(value) => `$${value / 1000000}M`}
                      label={{
                        value: "Revenue ($)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${(value as number).toLocaleString()}`,
                        "Revenue",
                      ]}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-bold">{label}</p>
                              <p className="text-sm text-gray-600">
                                Current Revenue:{" "}
                                <span className="font-semibold">
                                  {formatCurrency(data.current)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Potential Revenue:{" "}
                                <span className="font-semibold">
                                  {formatCurrency(data.potential)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Growth Opportunity:{" "}
                                <span className="font-semibold text-green-600">
                                  {formatCurrency(data.gap)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                Growth %:{" "}
                                <span className="font-semibold text-green-600">
                                  +
                                  {((data.gap / data.current) * 100).toFixed(1)}
                                  %
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
                      dataKey="current"
                      name="Current Revenue"
                      fill="#60a5fa"
                    />
                    <Bar dataKey="gap" name="Growth Potential" fill="#4ade80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
