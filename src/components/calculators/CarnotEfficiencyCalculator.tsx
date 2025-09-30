import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Download } from "lucide-react";

export default function CarnotEfficiencyCalculator() {
  const [hotTemp, setHotTemp] = useState("");
  const [coldTemp, setColdTemp] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const Th = parseFloat(hotTemp);
    const Tc = parseFloat(coldTemp);
    const eta = parseFloat(efficiency);

    let calculated = "";
    
    // Calculate missing variable
    if (hotTemp && coldTemp && !efficiency) {
      if (Th <= Tc) {
        calculated = "Error: Hot temperature must be greater than cold temperature";
      } else {
        const calcEta = (1 - Tc/Th) * 100;
        calculated = `Efficiency = ${calcEta.toFixed(2)}%`;
      }
    } else if (hotTemp && !coldTemp && efficiency) {
      const calcTc = Th * (1 - eta/100);
      calculated = `Cold Temperature = ${calcTc.toFixed(2)} K`;
    } else if (!hotTemp && coldTemp && efficiency) {
      const calcTh = Tc / (1 - eta/100);
      calculated = `Hot Temperature = ${calcTh.toFixed(2)} K`;
    } else {
      calculated = "Please enter two values to calculate the third";
    }
    
    setResult(calculated);
  };

  const clear = () => {
    setHotTemp("");
    setColdTemp("");
    setEfficiency("");
    setResult(null);
  };

  const exportCSV = () => {
    if (!result) return;
    
    const csvContent = `Parameter,Value,Unit
Hot Temperature,${hotTemp || 'N/A'},K
Cold Temperature,${coldTemp || 'N/A'},K
Efficiency,${efficiency || 'N/A'},%
Result,"${result}",`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carnot_efficiency_calculation.csv';
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
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Carnot Efficiency Calculator</CardTitle>
              <CardDescription>Calculate maximum theoretical efficiency</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <code className="text-orange-600 dark:text-orange-400 font-mono text-lg font-semibold">
              η = 1 - Tc/Th
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              Efficiency = 1 - (Cold Temperature / Hot Temperature)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hotTemp">Hot Temperature (K)</Label>
              <Input
                id="hotTemp"
                type="number"
                placeholder="Enter Th"
                value={hotTemp}
                onChange={(e) => setHotTemp(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coldTemp">Cold Temperature (K)</Label>
              <Input
                id="coldTemp"
                type="number"
                placeholder="Enter Tc"
                value={coldTemp}
                onChange={(e) => setColdTemp(e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="efficiency">Efficiency (%)</Label>
              <Input
                id="efficiency"
                type="number"
                placeholder="Enter efficiency percentage"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Note:</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Temperatures must be in Kelvin (K). The Carnot efficiency represents the maximum theoretical efficiency 
              for any heat engine operating between two thermal reservoirs.
            </p>
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