import React, { useState } from "react";
import {
  ArrowUpDown,
  AlertTriangle,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LeakageItem {
  id: string;
  category: string;
  impact: number;
  percentage: number;
  trend: "up" | "down" | "neutral";
  severity: "high" | "medium" | "low";
  description: string;
}

interface LeakageTableProps {
  data?: LeakageItem[];
  onRowClick?: (item: LeakageItem) => void;
  title?: string;
}

const LeakageTable = ({
  data = [
    {
      id: "1",
      category: "Discount Overrides",
      impact: 125000,
      percentage: 4.2,
      trend: "up",
      severity: "high",
      description: "Manual discount overrides exceeding policy guidelines",
    },
    {
      id: "2",
      category: "Volume Pricing",
      impact: 87500,
      percentage: 2.9,
      trend: "down",
      severity: "medium",
      description: "Volume pricing tiers not optimally configured",
    },
    {
      id: "3",
      category: "Contract Terms",
      impact: 62000,
      percentage: 2.1,
      trend: "up",
      severity: "high",
      description: "Unfavorable contract terms with key accounts",
    },
    {
      id: "4",
      category: "Promotional Pricing",
      impact: 45000,
      percentage: 1.5,
      trend: "neutral",
      severity: "low",
      description: "Extended promotional pricing periods",
    },
    {
      id: "5",
      category: "Cost Increases",
      impact: 38000,
      percentage: 1.3,
      trend: "up",
      severity: "medium",
      description: "Unaccounted cost increases not reflected in pricing",
    },
  ],
  onRowClick = () => {},
  title = "Margin Leakage Analysis",
}: LeakageTableProps) => {
  const [sortColumn, setSortColumn] = useState<string>("impact");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn as keyof LeakageItem];
    const bValue = b[sortColumn as keyof LeakageItem];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "down":
        return (
          <TrendingDown className="h-4 w-4 text-green-600 transform rotate-180" />
        );
      default:
        return <div className="h-4 w-4 border-t border-gray-400 mx-auto" />;
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <AlertTriangle className="h-3.5 w-3.5 text-yellow-600" />
          <span>{data.length} Issues</span>
        </Badge>
      </div>

      <div className="overflow-auto flex-grow">
        <Table>
          <TableCaption>
            Showing top margin leakage issues by impact
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer w-1/4"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("impact")}
              >
                <div className="flex items-center justify-end">
                  Impact ($)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("percentage")}
              >
                <div className="flex items-center justify-end">
                  % of Revenue
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-center">Trend</TableHead>
              <TableHead className="text-center">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick(item)}
              >
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <DollarSign className="h-3.5 w-3.5 text-gray-500 mr-1" />
                    {item.impact.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.percentage.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getTrendIcon(item.trend)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getSeverityColor(item.severity)}>
                    {item.severity.charAt(0).toUpperCase() +
                      item.severity.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeakageTable;
