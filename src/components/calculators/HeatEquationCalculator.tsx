import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Download } from "lucide-react";

export default function HeatEquationCalculator() {
  const [heat, setHeat] = useState("");
  const [mass, setMass] = useState("");
  const [specificHeat, setSpecificHeat] = useState("");
  const [tempChange, setTempChange] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const Q = parseFloat(heat);
    const m = parseFloat(mass);
    const c = parseFloat(specificHeat);
    const deltaT = parseFloat(tempChange);

    let calculated = "";
    
    // Calculate missing variable
    if (!heat && mass && specificHeat && tempChange) {
      const calcQ = m * c * deltaT;
      calculated = `Heat = ${calcQ.toFixed(2)} J`;
    } else if (heat && !mass && specificHeat && tempChange) {
      const calcM = Q / (c * deltaT);
      calculated = `Mass = ${calcM.toFixed(4)} kg`;
    } else if (heat && mass && !specificHeat && tempChange) {
      const calcC = Q / (m * deltaT);
      calculated = `Specific Heat = ${calcC.toFixed(2)} J/(kg·K)`;
    } else if (heat && mass && specificHeat && !tempChange) {
      const calcDeltaT = Q / (m * c);
      calculated = `Temperature Change = ${calcDeltaT.toFixed(2)} K`;
    } else {
      calculated = "Please leave one field empty to calculate";
    }
    
    setResult(calculated);
  };

  const clear = () => {
    setHeat("");
    setMass("");
    setSpecificHeat("");
    setTempChange("");
    setResult(null);
  };

  const exportCSV = () => {
    if (!result) return;
    
    const csvContent = `Parameter,Value,Unit
Heat,${heat || 'N/A'},J
Mass,${mass || 'N/A'},kg
Specific Heat,${specificHeat || 'N/A'},J/(kg·K)
Temperature Change,${tempChange || 'N/A'},K
Result,"${result}",`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'heat_equation_calculation.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-2xl">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Heat Equation Calculator</CardTitle>
              <CardDescription>Compute heat transfer and thermal properties</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <code className="text-orange-600 dark:text-orange-400 font-mono text-lg font-semibold">
              Q = mcΔT
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              Heat = mass × specific heat × temperature change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heat">Heat (J)</Label>
              <Input
                id="heat"
                type="number"
                placeholder="Enter heat energy"
                value={heat}
                onChange={(e) => setHeat(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mass">Mass (kg)</Label>
              <Input
                id="mass"
                type="number"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificHeat">Specific Heat (J/(kg·K))</Label>
              <Input
                id="specificHeat"
                type="number"
                placeholder="Enter specific heat"
                value={specificHeat}
                onChange={(e) => setSpecificHeat(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempChange">Temperature Change (K)</Label>
              <Input
                id="tempChange"
                type="number"
                placeholder="Enter ΔT"
                value={tempChange}
                onChange={(e) => setTempChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex-1 bg-gradient-primary hover:bg-primary-hover">
              Hitung
            </Button>
            <Button onClick={clear} variant="outline" className="flex-1">
              Reset
            </Button>
            {result && (
              <Button onClick={exportCSV} variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export CSV
              </Button>
            )}
          </div>

          {result && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Result:</h3>
              <p className="text-green-700 dark:text-green-300 font-mono">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}