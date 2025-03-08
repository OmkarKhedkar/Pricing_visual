import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  X,
  Info,
  ThumbsUp,
  ThumbsDown,
  Settings,
  ArrowRight,
  BarChart3,
} from "lucide-react";

interface PriceRecommendation {
  id: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  potentialImpact: number;
  confidenceScore: number;
  reasoning: string;
  status: "pending" | "accepted" | "rejected" | "modified";
  category: string;
}

interface PriceRecommendationsProps {
  recommendations?: PriceRecommendation[];
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onModify?: (id: string, newPrice: number) => void;
  title?: string;
  subtitle?: string;
}

const defaultRecommendations: PriceRecommendation[] = [
  {
    id: "rec1",
    productName: "Enterprise Server Solution",
    currentPrice: 12500,
    recommendedPrice: 13750,
    potentialImpact: 125000,
    confidenceScore: 0.87,
    reasoning:
      "Analysis of recent win rates shows competitors have increased prices by 8-12%. Market demand remains strong with low price sensitivity in this segment.",
    status: "pending",
    category: "Hardware",
  },
  {
    id: "rec2",
    productName: "Cloud Security Package",
    currentPrice: 4200,
    recommendedPrice: 4500,
    potentialImpact: 84000,
    confidenceScore: 0.92,
    reasoning:
      "Customer sentiment analysis indicates high perceived value. Recent feature additions justify a modest price increase without risking churn.",
    status: "pending",
    category: "Software",
  },
  {
    id: "rec3",
    productName: "Managed IT Services (Basic)",
    currentPrice: 2800,
    recommendedPrice: 2600,
    potentialImpact: -24000,
    confidenceScore: 0.78,
    reasoning:
      "Win rate analysis shows declining success in competitive bids. Strategic price reduction may increase volume to offset margin decrease.",
    status: "pending",
    category: "Services",
  },
  {
    id: "rec4",
    productName: "Data Analytics Platform",
    currentPrice: 8750,
    recommendedPrice: 9500,
    potentialImpact: 67500,
    confidenceScore: 0.83,
    reasoning:
      "Usage metrics show high customer engagement and retention. Price elasticity models suggest room for increase without significant impact on renewal rates.",
    status: "pending",
    category: "Software",
  },
  {
    id: "rec5",
    productName: "Network Infrastructure Bundle",
    currentPrice: 15800,
    recommendedPrice: 16200,
    potentialImpact: 48000,
    confidenceScore: 0.75,
    reasoning:
      "Cost increases in components justify price adjustment. Competitive analysis shows our pricing remains below market average even after increase.",
    status: "pending",
    category: "Hardware",
  },
];

const PriceRecommendations = ({
  recommendations = defaultRecommendations,
  onAccept = () => {},
  onReject = () => {},
  onModify = () => {},
  title = "AI-Driven Price Recommendations",
  subtitle = "Optimize pricing based on market data and win rate analysis",
}: PriceRecommendationsProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedRec, setSelectedRec] = useState<PriceRecommendation | null>(
    null,
  );
  const [modifiedPrice, setModifiedPrice] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter recommendations based on selected filter
  const filteredRecommendations =
    filter === "all"
      ? recommendations
      : recommendations.filter(
          (rec) => rec.category.toLowerCase() === filter.toLowerCase(),
        );

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(recommendations.map((rec) => rec.category.toLowerCase())),
  ];

  const handleAccept = (recommendation: PriceRecommendation) => {
    onAccept(recommendation.id);
    setDialogOpen(false);
  };

  const handleReject = (recommendation: PriceRecommendation) => {
    onReject(recommendation.id);
    setDialogOpen(false);
  };

  const handleModify = (recommendation: PriceRecommendation) => {
    onModify(recommendation.id, modifiedPrice);
    setDialogOpen(false);
  };

  const openDetailDialog = (recommendation: PriceRecommendation) => {
    setSelectedRec(recommendation);
    setModifiedPrice(recommendation.recommendedPrice);
    setDialogOpen(true);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return "bg-green-100 text-green-800";
    if (score >= 0.7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getImpactColor = (impact: number) => {
    return impact >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>{recommendations.length} Recommendations</span>
          </Badge>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure recommendation settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="flex-grow overflow-auto px-4 py-2">
        <div className="space-y-3">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openDetailDialog(recommendation)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">
                      {recommendation.productName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {recommendation.category}
                    </p>
                  </div>
                  <Badge
                    className={getConfidenceColor(
                      recommendation.confidenceScore,
                    )}
                  >
                    {(recommendation.confidenceScore * 100).toFixed(0)}%
                    Confidence
                  </Badge>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500 text-xs">
                      Current: ${recommendation.currentPrice.toLocaleString()}
                    </div>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <div className="font-medium">
                      ${recommendation.recommendedPrice.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${getImpactColor(recommendation.potentialImpact)}`}
                  >
                    {recommendation.potentialImpact >= 0 ? "+" : ""}$
                    {Math.abs(recommendation.potentialImpact).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recommendations found for this category
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <Info className="h-3.5 w-3.5 mr-1" />
            <span>Based on historical win rates and market data</span>
          </div>
          <Button variant="link" size="sm" className="text-xs">
            View methodology
          </Button>
        </div>
      </CardFooter>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedRec && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRec.productName}</DialogTitle>
                <DialogDescription>
                  Price recommendation details and analysis
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Current Price</div>
                    <div className="text-lg font-semibold">
                      ${selectedRec.currentPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">
                      Recommended Price
                    </div>
                    <div className="text-lg font-semibold">
                      ${selectedRec.recommendedPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Potential Impact</h4>
                  <div
                    className={`text-lg font-semibold ${getImpactColor(selectedRec.potentialImpact)}`}
                  >
                    {selectedRec.potentialImpact >= 0 ? "+" : ""}$
                    {Math.abs(selectedRec.potentialImpact).toLocaleString()}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">AI Reasoning</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                    {selectedRec.reasoning}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">
                    Modify Price (Optional)
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={modifiedPrice}
                      onChange={(e) => setModifiedPrice(Number(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleReject(selectedRec)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleModify(selectedRec)}
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-4 w-4" />
                    Modify
                  </Button>
                </div>
                <Button
                  onClick={() => handleAccept(selectedRec)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Accept
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PriceRecommendations;
