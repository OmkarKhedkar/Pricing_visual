import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Filter,
  Calendar,
  BarChart2,
  PieChart,
  LineChart,
} from "lucide-react";
import CompetitiveAnalysis from "../dashboard/CompetitiveAnalysis";
import WaterfallChart from "../dashboard/WaterfallChart";
import LeakageTable from "../dashboard/LeakageTable";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userRole="analyst" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Last 30 Days</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="margin" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="margin" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Margin Analysis</span>
            </TabsTrigger>
            <TabsTrigger
              value="competitive"
              className="flex items-center gap-2"
            >
              <LineChart className="h-4 w-4" />
              <span>Competitive Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Customer Segmentation</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Custom Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="margin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Margin Waterfall Analysis</CardTitle>
                    <CardDescription>
                      Detailed breakdown of price components and margin leakage
                      points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WaterfallChart height={400} />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Top Leakage Points</CardTitle>
                    <CardDescription>
                      Highest impact margin leakage issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LeakageTable />
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Margin Trend Analysis</CardTitle>
                <CardDescription>
                  Historical margin performance across product categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center p-6">
                    <LineChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Margin Trend Chart
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      This chart would show margin trends over time, allowing
                      you to identify patterns and seasonal variations in
                      pricing performance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitive" className="space-y-6">
            <CompetitiveAnalysis />
          </TabsContent>

          <TabsContent value="customer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segmentation Analysis</CardTitle>
                <CardDescription>
                  Breakdown of customer segments by profitability and volume
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center p-6">
                    <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Customer Segmentation Chart
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      This chart would show customer segments by profitability,
                      volume, and other key metrics to identify high-value
                      customer groups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Create and save custom analytics reports
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center p-6">
                    <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Custom Report Builder
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      This interface would allow you to select metrics,
                      dimensions, and visualization types to create custom
                      reports for your specific needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default Analytics;
