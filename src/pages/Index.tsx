import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardGrid from "@/components/DashboardGrid";
import IdealGasCalculator from "@/components/calculators/IdealGasCalculator";
import HeatEquationCalculator from "@/components/calculators/HeatEquationCalculator";
import CarnotEfficiencyCalculator from "@/components/calculators/CarnotEfficiencyCalculator";
import PVTSDiagramCalculator from "@/components/calculators/PVTSDiagramCalculator";
import GLBBCalculator from "@/components/calculators/GLBBCalculator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "ideal-gas":
        return <IdealGasCalculator />;
      case "heat-equation":
        return <HeatEquationCalculator />;
      case "carnot-efficiency":
        return <CarnotEfficiencyCalculator />;
      case "pv-ts-diagram":
        return <PVTSDiagramCalculator />;
      case "glbb":
        return <GLBBCalculator />;
      default:
        return <DashboardGrid onToolSelect={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-background transition-all">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 transition-all duration-300 ease-in-out lg:ml-20 xl:ml-60 overflow-auto pb-20 md:pb-0 bg-white dark:bg-background">
        <div className="min-h-screen">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;