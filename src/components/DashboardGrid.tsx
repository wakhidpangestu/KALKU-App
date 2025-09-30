import { Home, Calculator, Flame, Zap, Atom, BarChart2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardGridProps {
  onToolSelect: (tool: string) => void;
}

const tools = [
  {
    id: "glbb",
    title: "GLBB",
    description: "Kalkulator Gerak Lurus Berubah Beraturan dengan grafik interaktif",
    formula: "v = v₀ + a·t, s = v₀·t + ½·a·t²",
    icon: Zap,
  },
  {
    id: "ideal-gas",
    title: "Hukum Gas Ideal",
    description: "Hitung tekanan, volume, suhu, atau jumlah gas",
    formula: "PV = nRT",
    icon: Atom,
  },
  {
    id: "heat-equation", 
    title: "Persamaan Kalor",
    description: "Hitung perpindahan panas dan sifat termal",
    formula: "Q = mcΔT",
    icon: Flame,
  },
  {
    id: "carnot-efficiency",
    title: "Efisiensi Carnot", 
    description: "Hitung efisiensi teoritis maksimum",
    formula: "η = 1 - Tc/Th",
    icon: Calculator,
  },
];

export default function DashboardGrid({ onToolSelect }: DashboardGridProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-background p-4 sm:p-6 lg:p-8 transition-all">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 pt-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-primary mb-4">
            KALKU
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-blue-200 font-medium">
            Kalkulator Teknik Modern & Interaktif
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-blue-300 mt-2">
            Hitung dan visualisasikan proses teknik dengan mudah
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id} 
                className="group cursor-pointer bg-white dark:bg-background/80 hover:bg-gray-50 dark:hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-gray-200 dark:border-primary/30 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden"
              >
                <CardHeader className="pb-3 p-4 lg:p-6">
                  <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-blue-50 dark:bg-primary/20 border border-blue-100 dark:border-primary/30 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-primary" />
                  </div>
                  <CardTitle className="text-lg lg:text-xl text-gray-800 dark:text-primary font-bold mb-2">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base text-gray-600 dark:text-blue-200 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 p-4 lg:p-6">
                  <div className="bg-blue-50 dark:bg-primary/20 rounded-2xl p-3 lg:p-4 mb-4 border border-blue-100 dark:border-primary/30">
                    <code className="text-blue-700 dark:text-primary font-mono font-bold text-sm lg:text-base block text-center">
                      {tool.formula}
                    </code>
                  </div>
                  
                  <Button 
                    onClick={() => onToolSelect(tool.id)}
                    className="w-full bg-blue-600 dark:bg-primary hover:bg-blue-700 dark:hover:bg-primary/80 text-white font-semibold py-3 lg:py-4 text-sm lg:text-base rounded-2xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Buka Kalkulator
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}