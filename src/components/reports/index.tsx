import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileText,
  Calendar,
  Clock,
  Filter,
  Search,
  Share2,
  Star,
  StarHalf,
  MoreHorizontal,
  Plus,
} from "lucide-react";

const Reports = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarterly");

  const savedReports = [
    {
      id: "1",
      name: "Q2 Executive Summary",
      description: "High-level overview of Q2 pricing performance",
      created: "2023-07-01T10:30:00Z",
      lastRun: "2023-07-15T14:45:00Z",
      type: "Executive",
      starred: true,
    },
    {
      id: "2",
      name: "Margin Leakage Analysis",
      description: "Detailed breakdown of margin leakage points",
      created: "2023-06-15T09:20:00Z",
      lastRun: "2023-07-14T11:30:00Z",
      type: "Analysis",
      starred: true,
    },
    {
      id: "3",
      name: "Competitive Price Positioning",
      description: "Analysis of price positioning relative to competitors",
      created: "2023-05-22T13:45:00Z",
      lastRun: "2023-07-10T16:15:00Z",
      type: "Competitive",
      starred: false,
    },
    {
      id: "4",
      name: "Sales Team Performance",
      description: "Analysis of pricing and discounting by sales rep",
      created: "2023-06-05T15:10:00Z",
      lastRun: "2023-07-05T09:45:00Z",
      type: "Sales",
      starred: false,
    },
    {
      id: "5",
      name: "Customer Segment Profitability",
      description: "Profitability analysis by customer segment",
      created: "2023-04-18T11:25:00Z",
      lastRun: "2023-06-30T10:20:00Z",
      type: "Analysis",
      starred: true,
    },
  ];

  const scheduledReports = [
    {
      id: "1",
      name: "Weekly Pricing Dashboard",
      recipients: "Executive Team",
      frequency: "Weekly",
      nextRun: "2023-07-17T08:00:00Z",
      status: "Active",
    },
    {
      id: "2",
      name: "Monthly Margin Analysis",
      recipients: "Pricing Team",
      frequency: "Monthly",
      nextRun: "2023-08-01T08:00:00Z",
      status: "Active",
    },
    {
      id: "3",
      name: "Quarterly Business Review",
      recipients: "Leadership, Board",
      frequency: "Quarterly",
      nextRun: "2023-10-01T08:00:00Z",
      status: "Active",
    },
  ];

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  // Format future date
  const formatFutureDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // If it's today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    // If it's tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    // Otherwise show full date
    return (
      date.toLocaleDateString([], { month: "short", day: "numeric" }) +
      ` at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userRole="analyst" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search reports..." className="pl-8" />
            </div>
            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
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
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="saved">Saved Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedReports.map((report) => (
                    <TableRow
                      key={report.id}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell>
                        {report.starred ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarHalf className="h-4 w-4 text-gray-300" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <div>{report.name}</div>
                          <div className="text-xs text-gray-500">
                            {report.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            report.type === "Executive"
                              ? "bg-blue-100 text-blue-800"
                              : report.type === "Analysis"
                                ? "bg-purple-100 text-purple-800"
                                : report.type === "Competitive"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {formatRelativeTime(report.created)}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {formatRelativeTime(report.lastRun)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow
                      key={report.id}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {report.name}
                      </TableCell>
                      <TableCell>{report.recipients}</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800">
                          {report.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-blue-500" />
                          {formatFutureDate(report.nextRun)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>
                    High-level overview of key pricing metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Includes:</div>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Margin health overview</li>
                      <li>• Top pricing opportunities</li>
                      <li>• Competitive positioning</li>
                      <li>• Key performance indicators</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Template</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Margin Analysis</CardTitle>
                  <CardDescription>
                    Detailed breakdown of margin performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Includes:</div>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Margin waterfall analysis</li>
                      <li>• Leakage point identification</li>
                      <li>• Product profitability matrix</li>
                      <li>• Historical trend analysis</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Template</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>
                    Analysis of sales team pricing execution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Includes:</div>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Discount compliance metrics</li>
                      <li>• Win/loss rate analysis</li>
                      <li>• Deal size optimization</li>
                      <li>• Sales rep benchmarking</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Template</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 B2B Pricing Analytics Dashboard. All rights reserved.</p>
          <p className="mt-1">Powered by AI-driven pricing intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
