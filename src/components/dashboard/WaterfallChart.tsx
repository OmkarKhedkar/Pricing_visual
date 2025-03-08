import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Info, ZoomIn, ZoomOut, Download } from "lucide-react";

interface WaterfallChartProps {
  data?: WaterfallDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
}

interface WaterfallDataPoint {
  label: string;
  value: number;
  color?: string;
  isTotal?: boolean;
  tooltip?: string;
}

const defaultData: WaterfallDataPoint[] = [
  {
    label: "List Price",
    value: 100,
    color: "#4ade80",
    tooltip: "Starting list price before any adjustments",
  },
  {
    label: "Volume Discount",
    value: -8,
    color: "#f87171",
    tooltip: "Discount based on order volume",
  },
  {
    label: "Promotional Discount",
    value: -5,
    color: "#f87171",
    tooltip: "Seasonal promotional discount",
  },
  {
    label: "Loyalty Discount",
    value: -3,
    color: "#f87171",
    tooltip: "Customer loyalty program discount",
  },
  {
    label: "Contract Terms",
    value: -7,
    color: "#f87171",
    tooltip: "Special terms negotiated in contract",
  },
  {
    label: "Competitive Adjustment",
    value: -4,
    color: "#f87171",
    tooltip: "Adjustment to match competitive pricing",
  },
  {
    label: "Pocket Price",
    value: 73,
    color: "#60a5fa",
    isTotal: true,
    tooltip: "Final price after all adjustments",
  },
  {
    label: "COGS",
    value: -45,
    color: "#f87171",
    tooltip: "Cost of goods sold",
  },
  {
    label: "Margin",
    value: 28,
    color: "#4ade80",
    isTotal: true,
    tooltip: "Final profit margin",
  },
];

const WaterfallChart = ({
  data = defaultData,
  title = "Margin Waterfall Analysis",
  subtitle = "Breakdown of price components and margin leakage points",
  height = 400,
  width = 700,
}: WaterfallChartProps) => {
  const [timeFrame, setTimeFrame] = useState("quarterly");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Calculate the running total and positions for rendering
  const calculatePositions = () => {
    let runningTotal = 0;
    let maxValue = 0;
    let minValue = 0;

    const positions = data.map((item, index) => {
      const start = item.isTotal ? 0 : runningTotal;
      const end = item.isTotal ? item.value : start + item.value;

      if (!item.isTotal) {
        runningTotal = end;
      }

      maxValue = Math.max(maxValue, end, start);
      minValue = Math.min(minValue, end, start);

      return {
        ...item,
        start,
        end,
        height: Math.abs(item.value),
      };
    });

    return { positions, maxValue, minValue };
  };

  const { positions, maxValue, minValue } = calculatePositions();
  const chartRange = maxValue - minValue;
  const scaleFactor = (height - 100) / chartRange;

  // Function to convert value to y-position
  const valueToY = (value: number) => {
    return height - 50 - (value - minValue) * scaleFactor;
  };

  // Function to handle zoom
  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.2);
    } else if (direction === "out" && zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.2);
    }
  };

  // Function to handle export
  const handleExport = () => {
    // Placeholder for export functionality
    console.log("Exporting chart data...");
  };

  return (
    <Card className="p-4 bg-white w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleZoom("in")}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleZoom("out")}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div
        className="relative"
        style={{
          height: `${height}px`,
          width: `${width * zoomLevel}px`,
          overflowX: "auto",
        }}
      >
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between">
          <span className="text-xs text-gray-500">{maxValue.toFixed(0)}</span>
          <span className="text-xs text-gray-500">
            {((maxValue + minValue) / 2).toFixed(0)}
          </span>
          <span className="text-xs text-gray-500">{minValue.toFixed(0)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 relative" style={{ height: `${height}px` }}>
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-0 bottom-0">
            <div className="absolute left-0 right-0 top-0 border-t border-gray-200" />
            <div className="absolute left-0 right-0 top-1/2 border-t border-gray-200" />
            <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200" />
          </div>

          {/* Waterfall bars */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-end">
            {positions.map((item, index) => {
              const barWidth = 40;
              const spacing = 30;
              const xPosition = index * (barWidth + spacing) + 20;

              // For positive values, bars go up; for negative values, bars go down
              const isPositive = item.value >= 0;
              const yStart = valueToY(item.start);
              const yEnd = valueToY(item.end);
              const barHeight = Math.abs(yEnd - yStart);

              return (
                <div
                  key={index}
                  className="relative"
                  style={{ left: `${xPosition}px` }}
                >
                  {/* Connector line to previous bar (if not first or total) */}
                  {index > 0 && !item.isTotal && (
                    <div
                      className="absolute bg-gray-300"
                      style={{
                        height: "2px",
                        width: `${spacing}px`,
                        left: `-${spacing}px`,
                        top: `${yStart}px`,
                      }}
                    />
                  )}

                  {/* The bar */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute"
                          style={{
                            width: `${barWidth}px`,
                            height: `${barHeight || 2}px`, // Minimum height for visibility
                            backgroundColor:
                              item.color ||
                              (isPositive ? "#4ade80" : "#f87171"),
                            top: isPositive ? yEnd : yStart,
                            borderRadius: "2px",
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="p-1">
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm">
                            {item.value > 0 ? "+" : ""}
                            {item.value.toFixed(2)}
                          </p>
                          {item.tooltip && (
                            <p className="text-xs text-gray-500">
                              {item.tooltip}
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Label */}
                  <div
                    className="absolute text-xs text-gray-600 text-center"
                    style={{
                      width: `${barWidth}px`,
                      top: `${height - 30}px`,
                      transform: "rotate(-45deg)",
                      transformOrigin: "left top",
                    }}
                  >
                    {item.label}
                  </div>

                  {/* Value label */}
                  <div
                    className={`absolute text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
                    style={{
                      width: `${barWidth}px`,
                      textAlign: "center",
                      top: isPositive ? yEnd - 20 : yEnd + 5,
                    }}
                  >
                    {item.value > 0 ? "+" : ""}
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 flex items-center">
        <Info className="h-3 w-3 mr-1" />
        <span>
          Click on bars for detailed breakdown. Drag to scroll when zoomed in.
        </span>
      </div>
    </Card>
  );
};

export default WaterfallChart;
