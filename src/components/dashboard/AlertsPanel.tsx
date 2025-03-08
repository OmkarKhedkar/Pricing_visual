import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  X,
  ChevronRight,
  Settings,
  Eye,
  MoreHorizontal,
} from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "pricing" | "competitive" | "margin";
  severity: "critical" | "high" | "medium" | "low";
  status: "new" | "acknowledged" | "resolved";
  source: string;
}

interface AlertsPanelProps {
  alerts?: Alert[];
  onAlertClick?: (alert: Alert) => void;
  onAlertDismiss?: (alertId: string) => void;
  onAlertAcknowledge?: (alertId: string) => void;
  onAlertResolve?: (alertId: string) => void;
  title?: string;
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    title: "Significant margin drop detected",
    description:
      "Product line A showing 12% margin decrease in the last 24 hours",
    timestamp: "2023-06-15T08:30:00Z",
    type: "margin",
    severity: "critical",
    status: "new",
    source: "Margin Analysis Engine",
  },
  {
    id: "2",
    title: "Competitor price change",
    description: "Main competitor reduced prices by 5% on enterprise solutions",
    timestamp: "2023-06-14T16:45:00Z",
    type: "competitive",
    severity: "high",
    status: "acknowledged",
    source: "Competitive Intelligence",
  },
  {
    id: "3",
    title: "Discount override threshold exceeded",
    description: "Sales team exceeding authorized discount thresholds by 8%",
    timestamp: "2023-06-14T11:20:00Z",
    type: "pricing",
    severity: "medium",
    status: "new",
    source: "Pricing Policy Monitor",
  },
  {
    id: "4",
    title: "Cost increase not reflected in pricing",
    description:
      "Raw material cost increase of 7% not updated in product pricing",
    timestamp: "2023-06-13T09:15:00Z",
    type: "margin",
    severity: "high",
    status: "new",
    source: "Cost Analysis Tool",
  },
  {
    id: "5",
    title: "Promotional pricing extended beyond schedule",
    description: "Q2 promotion still active for 3 product lines past end date",
    timestamp: "2023-06-12T14:30:00Z",
    type: "pricing",
    severity: "low",
    status: "resolved",
    source: "Promotion Tracker",
  },
];

const AlertsPanel = ({
  alerts = defaultAlerts,
  onAlertClick = () => {},
  onAlertDismiss = () => {},
  onAlertAcknowledge = () => {},
  onAlertResolve = () => {},
  title = "Real-Time Alerts",
}: AlertsPanelProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  // Filter alerts based on active tab and filters
  const filteredAlerts = alerts.filter((alert) => {
    // Filter by type (tab)
    if (activeTab !== "all" && alert.type !== activeTab) return false;

    // Filter by status
    if (statusFilter !== "all" && alert.status !== statusFilter) return false;

    // Filter by severity
    if (severityFilter !== "all" && alert.severity !== severityFilter)
      return false;

    return true;
  });

  // Count alerts by status
  const newAlertsCount = alerts.filter(
    (alert) => alert.status === "new",
  ).length;
  const acknowledgedAlertsCount = alerts.filter(
    (alert) => alert.status === "acknowledged",
  ).length;
  const resolvedAlertsCount = alerts.filter(
    (alert) => alert.status === "resolved",
  ).length;

  // Get icon based on alert type
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "pricing":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "competitive":
        return <Info className="h-5 w-5 text-purple-500" />;
      case "margin":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get badge color based on severity
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Critical
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status indicator
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            New
          </Badge>
        );
      case "acknowledged":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            <Eye className="mr-1 h-3 w-3" />
            Acknowledged
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-500" />
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
              <span>{newAlertsCount} New</span>
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Alert Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>

      <div className="px-6 py-2 border-b border-gray-100">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
              <Badge variant="outline" className="ml-2">
                {alerts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex-1">
              Pricing
              <Badge variant="outline" className="ml-2">
                {alerts.filter((a) => a.type === "pricing").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="competitive" className="flex-1">
              Competitive
              <Badge variant="outline" className="ml-2">
                {alerts.filter((a) => a.type === "competitive").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="margin" className="flex-1">
              Margin
              <Badge variant="outline" className="ml-2">
                {alerts.filter((a) => a.type === "margin").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CardContent className="flex-grow overflow-auto p-0">
        {filteredAlerts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onAlertClick(alert)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    {getAlertTypeIcon(alert.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAlertDismiss(alert.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Dismiss Alert</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Show more options
                            }}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More Options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(alert.severity)}
                    {getStatusIndicator(alert.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(alert.timestamp)}
                    </span>
                    {alert.status === "new" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAlertAcknowledge(alert.id);
                        }}
                      >
                        Acknowledge
                      </Button>
                    )}
                    {alert.status === "acknowledged" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAlertResolve(alert.id);
                        }}
                      >
                        Resolve
                      </Button>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No alerts found
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              There are no alerts matching your current filters. Try changing
              your filter criteria or check back later.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
