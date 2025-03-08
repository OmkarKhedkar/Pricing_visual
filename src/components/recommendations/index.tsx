import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Filter,
  Search,
  ThumbsUp,
  ThumbsDown,
  Settings,
  ArrowRight,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import PriceRecommendations from "../dashboard/PriceRecommendations";

const Recommendations = () => {
  const [implementedCount, setImplementedCount] = useState(8);
  const [pendingCount, setPendingCount] = useState(24);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userRole="analyst" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Recommendations</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search recommendations..." className="pl-8" />
            </div>
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
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>Pending Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{pendingCount}</span>
                <Badge className="bg-blue-100 text-blue-800">
                  New Recommendations
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Implemented</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{implementedCount}</span>
                <Badge className="bg-green-100 text-green-800">
                  This Month
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span>Potential Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">$1.2M</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Opportunity
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="price">Price Optimization</TabsTrigger>
            <TabsTrigger value="discount">Discount Structure</TabsTrigger>
            <TabsTrigger value="bundle">Bundle Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="high-confidence" />
                  <Label htmlFor="high-confidence">High Confidence Only</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="positive-impact" />
                  <Label htmlFor="positive-impact">Positive Impact Only</Label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Accept All</span>
                </Button>
                <Button variant="default" size="sm">
                  Implement Selected
                </Button>
              </div>
            </div>

            <PriceRecommendations />
          </TabsContent>

          <TabsContent value="discount" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discount Structure Recommendations</CardTitle>
                <CardDescription>
                  AI-generated recommendations for optimizing your discount
                  tiers and approval workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">
                          Volume Discount Tier Optimization
                        </h4>
                        <p className="text-sm text-gray-500">
                          Discount Structure
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        95% Confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Current volume discount tiers are not optimally aligned
                      with customer ordering patterns. Adjusting tier thresholds
                      could increase margin by 2.3% while maintaining sales
                      volume.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-green-600">
                        +$87,500 Estimated Impact
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button variant="default" size="sm" className="h-8">
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">
                          Approval Workflow Adjustment
                        </h4>
                        <p className="text-sm text-gray-500">
                          Process Optimization
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        82% Confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Current discount approval thresholds are causing delays in
                      deal closure. Recommend increasing approval thresholds for
                      mid-tier sales reps by 5% to accelerate sales cycle.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-green-600">
                        +$45,000 Estimated Impact
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button variant="default" size="sm" className="h-8">
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bundle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Bundle Recommendations</CardTitle>
                <CardDescription>
                  AI-generated recommendations for creating profitable product
                  bundles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">
                          Enterprise Security Bundle
                        </h4>
                        <p className="text-sm text-gray-500">
                          New Bundle Opportunity
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        91% Confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Analysis of purchase patterns shows 78% of enterprise
                      customers who purchase Product A also purchase Products B
                      and C within 30 days. Creating a bundle with a 5% discount
                      would increase attachment rate and overall margin.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-green-600">
                        +$132,000 Estimated Impact
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button variant="default" size="sm" className="h-8">
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">SMB Starter Package</h4>
                        <p className="text-sm text-gray-500">
                          New Bundle Opportunity
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        85% Confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      SMB customers have a 42% lower adoption rate of add-on
                      services. Creating an entry-level bundle with core product
                      and basic service package could increase penetration in
                      this segment.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-green-600">
                        +$78,500 Estimated Impact
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button variant="default" size="sm" className="h-8">
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
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

export default Recommendations;
