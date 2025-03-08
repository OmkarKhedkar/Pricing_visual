import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import KPIOverview from "./dashboard/KPIOverview";
import MarginAnalysis from "./dashboard/MarginAnalysis";
import PriceRecommendations from "./dashboard/PriceRecommendations";
import CompetitiveAnalysis from "./dashboard/CompetitiveAnalysis";
import AlertsPanel from "./dashboard/AlertsPanel";
import RoleSelector from "./dashboard/RoleSelector";

const Home = () => {
  const [selectedRole, setSelectedRole] = useState<string>("analyst");

  // Handle role change
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    // In a real implementation, this would trigger data refetching based on role
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userRole={selectedRole as any} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Role Selector */}
        <div className="w-full max-w-xs">
          <RoleSelector
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
          />
        </div>

        {/* KPI Overview */}
        <section>
          <KPIOverview />
        </section>

        {/* Main Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Margin Analysis - Takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <MarginAnalysis />
          </div>

          {/* Price Recommendations - Takes 1/3 of the width */}
          <div>
            <PriceRecommendations />
          </div>
        </div>

        {/* Secondary Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competitive Analysis - Takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <CompetitiveAnalysis />
          </div>

          {/* Alerts Panel - Takes 1/3 of the width */}
          <div>
            <AlertsPanel />
          </div>
        </div>
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

export default Home;
