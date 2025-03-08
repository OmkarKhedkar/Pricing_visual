import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Share2,
  Download,
  Filter,
} from "lucide-react";
import WaterfallChart from "./WaterfallChart";
import LeakageTable from "./LeakageTable";

interface MarginAnalysisProps {
  title?: string;
  subtitle?: string;
  timeframe?: string;
  segment?: string;
  product?: string;
}

const MarginAnalysis = ({
  title = "Margin Analysis",
  subtitle = "Interactive visualization of margin breakdown and leakage points",
  timeframe = "quarterly",
  segment = "all",
  product = "all",
}: MarginAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("waterfall");
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [selectedSegment, setSelectedSegment] = useState(segment);
  const [selectedProduct, setSelectedProduct] = useState(product);

  // Handle leakage table row click
  const handleLeakageRowClick = (item: any) => {
    console.log("Leakage item clicked:", item);
    // In a real implementation, this would show detailed information about the selected leakage point
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting analysis data...");
    // In a real implementation, this would trigger a data export
  };

  // Handle share
  const handleShare = () => {
    console.log("Sharing analysis...");
    // In a real implementation, this would open a share dialog
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Timeframe:</span>
            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Segment:</span>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Select segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="mid-market">Mid-Market</SelectItem>
                <SelectItem value="smb">SMB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Product:</span>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="product-a">Product A</SelectItem>
                <SelectItem value="product-b">Product B</SelectItem>
                <SelectItem value="product-c">Product C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="sm" className="ml-auto">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="waterfall" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Waterfall
              </TabsTrigger>
              <TabsTrigger value="trend" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Trend Analysis
              </TabsTrigger>
              <TabsTrigger value="breakdown" className="flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Breakdown
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[calc(100%-48px)] overflow-hidden">
            <TabsContent value="waterfall" className="h-full m-0 p-0">
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
                <div className="lg:col-span-5 h-full">
                  <WaterfallChart
                    title="Margin Waterfall Analysis"
                    subtitle={`${selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)} breakdown of price components and margin leakage points`}
                  />
                </div>
                <div className="lg:col-span-2 h-full">
                  <LeakageTable
                    onRowClick={handleLeakageRowClick}
                    title="Top Leakage Points"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trend" className="h-full m-0 p-0">
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center p-6">
                  <LineChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Trend Analysis View
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    This view will show margin trends over time, allowing you to
                    identify patterns and seasonal variations in pricing
                    performance.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="h-full m-0 p-0">
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center p-6">
                  <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Margin Breakdown View
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    This view will provide detailed breakdowns of margin
                    components by product, customer segment, and region using
                    pie and donut charts.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Card>
  );
};

export default MarginAnalysis;
