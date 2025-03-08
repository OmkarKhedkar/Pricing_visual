import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  LineChart,
  PieChart,
  Filter,
  Save,
  Share2,
  Plus,
  Trash2,
  Settings,
  Table as TableIcon,
  Download,
  Calendar,
  Clock,
  Layers,
  Columns,
  LayoutGrid,
  Palette,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface CustomReportBuilderProps {
  savedReports?: SavedReport[];
  metrics?: MetricOption[];
  dimensions?: DimensionOption[];
  visualizations?: VisualizationOption[];
  onSaveReport?: (report: SavedReport) => void;
  onDeleteReport?: (reportId: string) => void;
  onExportReport?: (reportId: string, format: string) => void;
}

interface SavedReport {
  id: string;
  name: string;
  description: string;
  created: string;
  lastModified: string;
  metrics: string[];
  dimensions: string[];
  visualization: string;
  filters: ReportFilter[];
  schedule?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly";
    recipients: string[];
    nextRun: string;
  };
}

interface ReportFilter {
  field: string;
  operator: string;
  value: string | number;
}

interface MetricOption {
  id: string;
  name: string;
  description: string;
  category: string;
  dataType: "currency" | "percentage" | "number" | "time";
}

interface DimensionOption {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface VisualizationOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  supportedMetricCount: { min: number; max: number };
  supportedDimensionCount: { min: number; max: number };
}

const defaultSavedReports: SavedReport[] = [
  {
    id: "report-1",
    name: "Quarterly Margin Analysis",
    description: "Margin breakdown by product category and customer segment",
    created: "2023-06-15T10:30:00Z",
    lastModified: "2023-09-02T14:45:00Z",
    metrics: ["margin_percentage", "revenue", "discount_amount"],
    dimensions: ["product_category", "customer_segment"],
    visualization: "bar_chart",
    filters: [
      {
        field: "date",
        operator: "last_quarter",
        value: "",
      },
    ],
    schedule: {
      frequency: "quarterly",
      recipients: ["executive_team", "pricing_team"],
      nextRun: "2023-10-01T08:00:00Z",
    },
  },
  {
    id: "report-2",
    name: "Price Elasticity by Segment",
    description: "Analysis of price sensitivity across customer segments",
    created: "2023-05-22T09:15:00Z",
    lastModified: "2023-08-17T11:30:00Z",
    metrics: ["volume_change", "price_change", "elasticity_coefficient"],
    dimensions: ["customer_segment", "region"],
    visualization: "line_chart",
    filters: [
      {
        field: "date",
        operator: "last_12_months",
        value: "",
      },
    ],
  },
  {
    id: "report-3",
    name: "Discount Compliance",
    description: "Tracking of discount policy adherence by sales rep",
    created: "2023-07-10T14:20:00Z",
    lastModified: "2023-09-05T16:10:00Z",
    metrics: ["discount_percentage", "transaction_count", "policy_exceptions"],
    dimensions: ["sales_rep", "customer_segment"],
    visualization: "table",
    filters: [
      {
        field: "discount_percentage",
        operator: "greater_than",
        value: 15,
      },
    ],
    schedule: {
      frequency: "monthly",
      recipients: ["sales_managers"],
      nextRun: "2023-10-01T08:00:00Z",
    },
  },
];

const defaultMetrics: MetricOption[] = [
  {
    id: "revenue",
    name: "Revenue",
    description: "Total revenue generated",
    category: "financial",
    dataType: "currency",
  },
  {
    id: "margin_percentage",
    name: "Margin Percentage",
    description: "Profit margin as a percentage of revenue",
    category: "financial",
    dataType: "percentage",
  },
  {
    id: "discount_amount",
    name: "Discount Amount",
    description: "Total discount amount applied",
    category: "pricing",
    dataType: "currency",
  },
  {
    id: "discount_percentage",
    name: "Discount Percentage",
    description: "Discount as a percentage of list price",
    category: "pricing",
    dataType: "percentage",
  },
  {
    id: "volume_change",
    name: "Volume Change",
    description: "Change in sales volume",
    category: "sales",
    dataType: "percentage",
  },
  {
    id: "price_change",
    name: "Price Change",
    description: "Change in price over time",
    category: "pricing",
    dataType: "percentage",
  },
  {
    id: "elasticity_coefficient",
    name: "Elasticity Coefficient",
    description: "Measure of price sensitivity",
    category: "analytics",
    dataType: "number",
  },
  {
    id: "transaction_count",
    name: "Transaction Count",
    description: "Number of transactions",
    category: "sales",
    dataType: "number",
  },
  {
    id: "policy_exceptions",
    name: "Policy Exceptions",
    description: "Count of pricing policy exceptions",
    category: "compliance",
    dataType: "number",
  },
  {
    id: "average_deal_size",
    name: "Average Deal Size",
    description: "Average revenue per transaction",
    category: "sales",
    dataType: "currency",
  },
];

const defaultDimensions: DimensionOption[] = [
  {
    id: "product_category",
    name: "Product Category",
    description: "Category of product or service",
    category: "product",
  },
  {
    id: "customer_segment",
    name: "Customer Segment",
    description: "Segment of customer (Enterprise, Mid-Market, SMB)",
    category: "customer",
  },
  {
    id: "region",
    name: "Region",
    description: "Geographic region",
    category: "geography",
  },
  {
    id: "sales_rep",
    name: "Sales Rep",
    description: "Sales representative",
    category: "sales",
  },
  {
    id: "industry",
    name: "Industry",
    description: "Customer industry",
    category: "customer",
  },
  {
    id: "date",
    name: "Date",
    description: "Transaction date",
    category: "time",
  },
  {
    id: "quarter",
    name: "Quarter",
    description: "Fiscal quarter",
    category: "time",
  },
  {
    id: "deal_type",
    name: "Deal Type",
    description: "Type of deal (New, Renewal, Upsell)",
    category: "sales",
  },
  {
    id: "contract_term",
    name: "Contract Term",
    description: "Length of contract",
    category: "contract",
  },
  {
    id: "payment_terms",
    name: "Payment Terms",
    description: "Payment terms (Net 30, Net 60, etc.)",
    category: "financial",
  },
];

const defaultVisualizations: VisualizationOption[] = [
  {
    id: "bar_chart",
    name: "Bar Chart",
    icon: <BarChart className="h-5 w-5" />,
    supportedMetricCount: { min: 1, max: 5 },
    supportedDimensionCount: { min: 1, max: 2 },
  },
  {
    id: "line_chart",
    name: "Line Chart",
    icon: <LineChart className="h-5 w-5" />,
    supportedMetricCount: { min: 1, max: 5 },
    supportedDimensionCount: { min: 1, max: 2 },
  },
  {
    id: "pie_chart",
    name: "Pie Chart",
    icon: <PieChart className="h-5 w-5" />,
    supportedMetricCount: { min: 1, max: 1 },
    supportedDimensionCount: { min: 1, max: 1 },
  },
  {
    id: "table",
    name: "Table",
    icon: <TableIcon className="h-5 w-5" />,
    supportedMetricCount: { min: 1, max: 10 },
    supportedDimensionCount: { min: 0, max: 5 },
  },
];

const CustomReportBuilder = ({
  savedReports = defaultSavedReports,
  metrics = defaultMetrics,
  dimensions = defaultDimensions,
  visualizations = defaultVisualizations,
  onSaveReport = () => {},
  onDeleteReport = () => {},
  onExportReport = () => {},
}: CustomReportBuilderProps) => {
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(
    null,
  );
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [selectedVisualization, setSelectedVisualization] =
    useState<string>("");
  const [filters, setFilters] = useState<ReportFilter[]>([]);
  const [metricSearchTerm, setMetricSearchTerm] = useState("");
  const [dimensionSearchTerm, setDimensionSearchTerm] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Filter metrics based on search term
  const filteredMetrics = metrics.filter((metric) =>
    metric.name.toLowerCase().includes(metricSearchTerm.toLowerCase()),
  );

  // Filter dimensions based on search term
  const filteredDimensions = dimensions.filter((dimension) =>
    dimension.name.toLowerCase().includes(dimensionSearchTerm.toLowerCase()),
  );

  // Group metrics by category
  const metricsByCategory = filteredMetrics.reduce(
    (acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = [];
      }
      acc[metric.category].push(metric);
      return acc;
    },
    {} as Record<string, MetricOption[]>,
  );

  // Group dimensions by category
  const dimensionsByCategory = filteredDimensions.reduce(
    (acc, dimension) => {
      if (!acc[dimension.category]) {
        acc[dimension.category] = [];
      }
      acc[dimension.category].push(dimension);
      return acc;
    },
    {} as Record<string, DimensionOption[]>,
  );

  // Handle metric selection
  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter((id) => id !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  // Handle dimension selection
  const toggleDimension = (dimensionId: string) => {
    if (selectedDimensions.includes(dimensionId)) {
      setSelectedDimensions(
        selectedDimensions.filter((id) => id !== dimensionId),
      );
    } else {
      setSelectedDimensions([...selectedDimensions, dimensionId]);
    }
  };

  // Handle visualization selection
  const selectVisualization = (visualizationId: string) => {
    setSelectedVisualization(visualizationId);
  };

  // Add a new filter
  const addFilter = () => {
    setFilters([
      ...filters,
      { field: dimensions[0].id, operator: "equals", value: "" },
    ]);
  };

  // Update a filter
  const updateFilter = (index: number, field: string, value: any) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setFilters(updatedFilters);
  };

  // Remove a filter
  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  // Load a saved report
  const loadReport = (report: SavedReport) => {
    setSelectedReport(report);
    setReportName(report.name);
    setReportDescription(report.description);
    setSelectedMetrics(report.metrics);
    setSelectedDimensions(report.dimensions);
    setSelectedVisualization(report.visualization);
    setFilters(report.filters);
    setActiveTab("builder");
  };

  // Reset the form
  const resetForm = () => {
    setSelectedReport(null);
    setReportName("");
    setReportDescription("");
    setSelectedMetrics([]);
    setSelectedDimensions([]);
    setSelectedVisualization("");
    setFilters([]);
  };

  // Save the current report
  const saveReport = () => {
    const report: SavedReport = {
      id: selectedReport?.id || `report-${Date.now()}`,
      name: reportName,
      description: reportDescription,
      created: selectedReport?.created || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      visualization: selectedVisualization,
      filters,
    };
    onSaveReport(report);
    setSelectedReport(report);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if the current configuration is valid for the selected visualization
  const isValidConfiguration = () => {
    if (!selectedVisualization) return false;

    const visualization = visualizations.find(
      (v) => v.id === selectedVisualization,
    );
    if (!visualization) return false;

    const metricsValid =
      selectedMetrics.length >= visualization.supportedMetricCount.min &&
      selectedMetrics.length <= visualization.supportedMetricCount.max;

    const dimensionsValid =
      selectedDimensions.length >= visualization.supportedDimensionCount.min &&
      selectedDimensions.length <= visualization.supportedDimensionCount.max;

    return (
      metricsValid &&
      dimensionsValid &&
      reportName.trim() !== "" &&
      reportDescription.trim() !== ""
    );
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Custom Report Builder
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Create and customize reports with your selected metrics and
              dimensions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1"
            >
              {showPreview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Show Preview</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportReport(selectedReport?.id || "", "pdf")}
              disabled={!selectedReport}
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={saveReport}
              disabled={!isValidConfiguration()}
            >
              <Save className="h-4 w-4 mr-2" />
              <span>Save Report</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="flex-grow flex overflow-hidden">
        <div
          className={`${showPreview ? "w-1/2" : "w-full"} border-r border-gray-200 flex flex-col overflow-hidden`}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-grow flex flex-col overflow-hidden"
          >
            <div className="px-4 pt-4 border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="builder"
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  <span>Report Builder</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  <span>Saved Reports</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-800">
                    {savedReports.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-grow overflow-auto">
              <TabsContent
                value="builder"
                className="p-4 h-full overflow-auto m-0"
              >
                <div className="space-y-6">
                  {/* Report Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Report Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input
                          id="report-name"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          placeholder="Enter report name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="report-description">
                          Report Description
                        </Label>
                        <Input
                          id="report-description"
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          placeholder="Enter report description"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visualization Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Visualization Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {visualizations.map((visualization) => (
                        <Button
                          key={visualization.id}
                          variant={
                            selectedVisualization === visualization.id
                              ? "default"
                              : "outline"
                          }
                          className="flex flex-col items-center justify-center h-24 p-2"
                          onClick={() => selectVisualization(visualization.id)}
                        >
                          <div className="text-2xl mb-2">
                            {visualization.icon}
                          </div>
                          <span className="text-sm">{visualization.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Selection */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Metrics</h3>
                      <div className="relative w-64">
                        <Input
                          placeholder="Search metrics..."
                          value={metricSearchTerm}
                          onChange={(e) => setMetricSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {Object.entries(metricsByCategory).map(
                        ([category, categoryMetrics]) => (
                          <div key={category} className="space-y-2">
                            <h4 className="text-sm font-medium capitalize">
                              {category}
                            </h4>
                            <div className="space-y-1">
                              {categoryMetrics.map((metric) => (
                                <div
                                  key={metric.id}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                                >
                                  <Checkbox
                                    id={`metric-${metric.id}`}
                                    checked={selectedMetrics.includes(
                                      metric.id,
                                    )}
                                    onCheckedChange={() =>
                                      toggleMetric(metric.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={`metric-${metric.id}`}
                                    className="flex-grow cursor-pointer"
                                  >
                                    <div className="font-medium">
                                      {metric.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {metric.description}
                                    </div>
                                  </Label>
                                  <Badge
                                    variant="outline"
                                    className="text-xs capitalize"
                                  >
                                    {metric.dataType}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Dimensions Selection */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Dimensions</h3>
                      <div className="relative w-64">
                        <Input
                          placeholder="Search dimensions..."
                          value={dimensionSearchTerm}
                          onChange={(e) =>
                            setDimensionSearchTerm(e.target.value)
                          }
                          className="pl-8"
                        />
                        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {Object.entries(dimensionsByCategory).map(
                        ([category, categoryDimensions]) => (
                          <div key={category} className="space-y-2">
                            <h4 className="text-sm font-medium capitalize">
                              {category}
                            </h4>
                            <div className="space-y-1">
                              {categoryDimensions.map((dimension) => (
                                <div
                                  key={dimension.id}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                                >
                                  <Checkbox
                                    id={`dimension-${dimension.id}`}
                                    checked={selectedDimensions.includes(
                                      dimension.id,
                                    )}
                                    onCheckedChange={() =>
                                      toggleDimension(dimension.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={`dimension-${dimension.id}`}
                                    className="flex-grow cursor-pointer"
                                  >
                                    <div className="font-medium">
                                      {dimension.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {dimension.description}
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Filters</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addFilter}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Filter</span>
                      </Button>
                    </div>

                    {filters.length === 0 ? (
                      <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-md">
                        <Filter className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p>No filters added yet</p>
                        <p className="text-sm">
                          Add filters to refine your report data
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filters.map((filter, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 border rounded-md"
                          >
                            <Select
                              value={filter.field}
                              onValueChange={(value) =>
                                updateFilter(index, "field", value)
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {dimensions.map((dimension) => (
                                  <SelectItem
                                    key={dimension.id}
                                    value={dimension.id}
                                  >
                                    {dimension.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select
                              value={filter.operator}
                              onValueChange={(value) =>
                                updateFilter(index, "operator", value)
                              }
                            >
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="not_equals">
                                  Not Equals
                                </SelectItem>
                                <SelectItem value="greater_than">
                                  Greater Than
                                </SelectItem>
                                <SelectItem value="less_than">
                                  Less Than
                                </SelectItem>
                                <SelectItem value="contains">
                                  Contains
                                </SelectItem>
                                <SelectItem value="last_quarter">
                                  Last Quarter
                                </SelectItem>
                                <SelectItem value="last_12_months">
                                  Last 12 Months
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Input
                              value={filter.value.toString()}
                              onChange={(e) =>
                                updateFilter(index, "value", e.target.value)
                              }
                              placeholder="Value"
                              className="flex-grow"
                            />

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFilter(index)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="saved"
                className="p-4 h-full overflow-auto m-0"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Saved Reports</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetForm}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>New Report</span>
                    </Button>
                  </div>

                  {savedReports.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-md">
                      <Layers className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No saved reports
                      </h3>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Create your first custom report using the Report Builder
                        tab
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedReports.map((report) => (
                        <div
                          key={report.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${selectedReport?.id === report.id ? "border-blue-500 bg-blue-50" : ""}`}
                          onClick={() => loadReport(report)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{report.name}</h4>
                              <p className="text-sm text-gray-500">
                                {report.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {report.schedule && (
                                <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {report.schedule.frequency
                                      .charAt(0)
                                      .toUpperCase() +
                                      report.schedule.frequency.slice(1)}
                                  </span>
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteReport(report.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-gray-500" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {report.metrics.map((metricId) => {
                              const metric = metrics.find(
                                (m) => m.id === metricId,
                              );
                              return (
                                metric && (
                                  <Badge
                                    key={metricId}
                                    variant="outline"
                                    className="bg-blue-50"
                                  >
                                    {metric.name}
                                  </Badge>
                                )
                              );
                            })}
                          </div>

                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Last modified: {formatDate(report.lastModified)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {(() => {
                                const viz = visualizations.find(
                                  (v) => v.id === report.visualization,
                                );
                                return viz ? (
                                  <div className="flex items-center gap-1">
                                    {React.cloneElement(
                                      viz.icon as React.ReactElement,
                                      {
                                        className: "h-3.5 w-3.5",
                                      },
                                    )}
                                    <span>{viz.name}</span>
                                  </div>
                                ) : null;
                              })()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {showPreview && (
          <div className="w-1/2 p-4 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Preview</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  <span>Layout</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  <span>Theme</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Columns className="h-4 w-4 mr-2" />
                  <span>Columns</span>
                </Button>
              </div>
            </div>

            {isValidConfiguration() ? (
              <div className="flex-grow border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                <div className="text-center p-6 max-w-md">
                  {(() => {
                    const viz = visualizations.find(
                      (v) => v.id === selectedVisualization,
                    );
                    return viz ? (
                      <div className="mb-4">
                        {React.cloneElement(viz.icon as React.ReactElement, {
                          className: "h-16 w-16 mx-auto text-blue-500 mb-4",
                        })}
                        <h3 className="text-xl font-semibold mb-2">
                          {reportName || "Report Preview"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          {reportDescription ||
                            "Your report description will appear here"}
                        </p>
                        <div className="bg-white p-4 rounded-md border text-left">
                          <h4 className="font-medium mb-2">
                            Selected Metrics:
                          </h4>
                          <ul className="list-disc pl-5 mb-3 space-y-1">
                            {selectedMetrics.map((metricId) => {
                              const metric = metrics.find(
                                (m) => m.id === metricId,
                              );
                              return (
                                metric && <li key={metricId}>{metric.name}</li>
                              );
                            })}
                          </ul>
                          <h4 className="font-medium mb-2">
                            Selected Dimensions:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedDimensions.map((dimensionId) => {
                              const dimension = dimensions.find(
                                (d) => d.id === dimensionId,
                              );
                              return (
                                dimension && (
                                  <li key={dimensionId}>{dimension.name}</li>
                                )
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Select a visualization type
                        </h3>
                        <p className="text-gray-500">
                          Choose a visualization type to see a preview of your
                          report
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="flex-grow border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                <div className="text-center p-6">
                  <Settings className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Configure Your Report
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Complete your report configuration to see a preview.
                    <br />
                    You need to select a visualization type, metrics, and
                    dimensions.
                  </p>
                  <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                    <div className="flex items-center">
                      <ChevronRight
                        className={`h-4 w-4 ${reportName ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          reportName ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        Enter report name
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight
                        className={`h-4 w-4 ${reportDescription ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          reportDescription ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        Enter report description
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight
                        className={`h-4 w-4 ${selectedVisualization ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          selectedVisualization
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      >
                        Select visualization type
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight
                        className={`h-4 w-4 ${selectedMetrics.length > 0 ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          selectedMetrics.length > 0
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      >
                        Select metrics
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight
                        className={`h-4 w-4 ${selectedDimensions.length > 0 ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          selectedDimensions.length > 0
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      >
                        Select dimensions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CustomReportBuilder;
