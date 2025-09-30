import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Download } from "lucide-react";

export default function IdealGasCalculator() {
  const [pressure, setPressure] = useState("");
  const [volume, setVolume] = useState("");
  const [temperature, setTemperature] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const R = 8.314; // J/(mol·K)
    
    const P = parseFloat(pressure);
    const V = parseFloat(volume);
    const T = parseFloat(temperature);
    const n = parseFloat(amount);

    let calculated = "";
    
    // Calculate missing variable
    if (!pressure && volume && temperature && amount) {
      const calcP = (n * R * T) / V;
      calculated = `Pressure = ${calcP.toFixed(2)} Pa`;
    } else if (pressure && !volume && temperature && amount) {
      const calcV = (n * R * T) / P;
      calculated = `Volume = ${calcV.toFixed(6)} m³`;
    } else if (pressure && volume && !temperature && amount) {
      const calcT = (P * V) / (n * R);
      calculated = `Temperature = ${calcT.toFixed(2)} K`;
    } else if (pressure && volume && temperature && !amount) {
      const calcN = (P * V) / (R * T);
      calculated = `Amount = ${calcN.toFixed(4)} mol`;
    } else {
      calculated = "Please leave one field empty to calculate";
    }
    
    setResult(calculated);
  };

  const clear = () => {
    setPressure("");
    setVolume("");
    setTemperature("");
    setAmount("");
    setResult(null);
  };

  const exportCSV = () => {
    if (!result) return;
    
    const csvContent = `Parameter,Value,Unit
Pressure,${pressure || 'N/A'},Pa
Volume,${volume || 'N/A'},m³
Temperature,${temperature || 'N/A'},K
Amount,${amount || 'N/A'},mol
Result,"${result}",`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ideal_gas_calculation.csv';
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
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-card-foreground">Ideal Gas Law Calculator</CardTitle>
              <CardDescription>Calculate pressure, volume, temperature, or amount of gas</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <code className="text-orange-600 dark:text-orange-400 font-mono text-lg font-semibold">
              PV = nRT
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              R = 8.314 J/(mol·K)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pressure">Pressure (Pa)</Label>
              <Input
                id="pressure"
                type="number"
                placeholder="Enter pressure"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume (m³)</Label>
              <Input
                id="volume"
                type="number"
                placeholder="Enter volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (K)</Label>
              <Input
                id="temperature"
                type="number"
                placeholder="Enter temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (mol)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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