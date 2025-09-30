import { useState, useRef, KeyboardEvent } from "react";
import SpinnerIOS from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Download, RotateCcw, Copy } from "lucide-react";
import { exportToXLSX } from "@/utils/exportXLSX";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

interface ChartData {
  time: number;
  position: number;
  velocity: number;
  acceleration: number;
  displacement: number;
}

interface Results {
  finalVelocity: number;
  finalPosition: number;
  displacement: number;
  velocitySquared: number;
  chartData: ChartData[];
}

export default function GLBBCalculator() {
  const [v0, setV0] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);

  const v0Ref = useRef<HTMLInputElement>(null);
  const accelerationRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const positionChartRef = useRef<HTMLDivElement>(null);
  const velocityChartRef = useRef<HTMLDivElement>(null);
  const accelerationChartRef = useRef<HTMLDivElement>(null);
  const displacementChartRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, nextRef?: React.RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      } else {
        calculate();
      }
    }
  };

  const calculate = () => {
    const v0Val = parseFloat(v0);
    const aVal = parseFloat(acceleration);
    const tVal = parseFloat(time);

    if (!isNaN(v0Val) && !isNaN(aVal) && !isNaN(tVal) && tVal > 0) {
      // Generate data points for each second from 0 to t
      const chartData: ChartData[] = [];
      const timeStep = tVal <= 10 ? 1 : tVal / 10;
      for (let t = 0; t <= tVal; t += timeStep) {
        const currentTime = Math.min(t, tVal);
        const velocity = v0Val + aVal * currentTime;
        const position = v0Val * currentTime + 0.5 * aVal * Math.pow(currentTime, 2);
        const displacement = position;
        chartData.push({
          time: parseFloat(currentTime.toFixed(2)),
          position: parseFloat(position.toFixed(2)),
          velocity: parseFloat(velocity.toFixed(2)),
          acceleration: aVal,
          displacement: parseFloat(displacement.toFixed(2))
        });
      }
      const finalVelocity = v0Val + aVal * tVal;
      const finalPosition = v0Val * tVal + 0.5 * aVal * Math.pow(tVal, 2);
      const displacement = finalPosition;
      const velocitySquared = Math.pow(finalVelocity, 2);
      setResults({
        finalVelocity,
        finalPosition,
        displacement,
        velocitySquared,
        chartData
      });
    }
  };

  const reset = () => {
  setV0("");
  setAcceleration("");
  setTime("");
  setResults(null);
  setLoading(false);
  v0Ref.current?.focus();
  };

  const exportXLSX = () => {
    if (!results) return;
    const data = [
      ["Waktu (s)", "Posisi (m)", "Kecepatan (m/s)", "Percepatan (m/s²)", "Perpindahan (m)"],
      ...results.chartData.map(point => [
        point.time,
        point.position,
        point.velocity,
        point.acceleration,
        point.displacement
      ])
    ];
    exportToXLSX("data_gerak_glbb", data);
  };

  const copyChartAsImage = async (chartRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${filename}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Error copying chart as image:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-3 border border-gray-200 rounded-xl shadow-lg">
          <p className="font-semibold text-blue-600 text-sm">{`Waktu: ${label} s`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs font-medium">
              {`${entry.name}: ${entry.value} ${entry.name === 'Posisi' || entry.name === 'Perpindahan' ? 'm' : entry.name === 'Kecepatan' ? 'm/s' : 'm/s²'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
  <div className="min-h-screen bg-white dark:bg-background p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="text-center py-4 lg:py-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-primary mb-2 mt-3">
            Kalkulator GLBB
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-blue-200 font-medium">
            Gerak Lurus Berubah Beraturan
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-white/70 dark:bg-background/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-primary/30 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 dark:bg-background/60 border-b border-gray-200 dark:border-primary/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-primary/20 border border-blue-200 dark:border-primary/30 shadow-sm">
                  <Zap className="w-7 h-7 text-blue-600 dark:text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl lg:text-2xl text-blue-600 dark:text-primary font-bold">Parameter Gerak</CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-blue-200 mt-1">
                    Masukkan kondisi awal untuk analisis gerak
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 lg:p-6 space-y-6">
              {/* Physics Formulas */}
              <div className="bg-blue-50 dark:bg-primary/10 rounded-2xl p-4 lg:p-6 text-center border border-blue-200 dark:border-primary/30">
                <div className="space-y-3">
                  <div className="text-blue-700 dark:text-primary font-mono text-lg lg:text-xl font-bold">
                    v = v₀ + a × t
                  </div>
                  <div className="text-blue-700 dark:text-primary font-mono text-lg lg:text-xl font-bold">
                    s = v₀ × t + ½ × a × t²
                  </div>
                  <div className="text-blue-700 dark:text-primary font-mono text-lg lg:text-xl font-bold">
                    v² = v₀² + 2 × a × s
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-blue-600 dark:text-blue-200 mt-3 font-medium">
                  Persamaan gerak lurus berubah beraturan
                </p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="v0" className="text-gray-700 font-semibold text-sm dark:text-blue-100">
                    Kecepatan Awal v₀ (m/s)
                  </Label>
                  <Input
                    ref={v0Ref}
                    id="v0"
                    type="number"
                    placeholder="Masukkan kecepatan awal"
                    value={v0}
                    onChange={(e) => setV0(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, accelerationRef)}
                    className="h-12 text-base bg-white dark:bg-background/80 border-none text-gray-800 dark:text-blue-100 placeholder:text-gray-500 dark:placeholder:text-blue-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acceleration" className="text-gray-700 font-semibold text-sm dark:text-blue-100">
                    Percepatan a (m/s²)
                  </Label>
                  <Input
                    ref={accelerationRef}
                    id="acceleration"
                    type="number"
                    placeholder="Masukkan percepatan"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, timeRef)}
                    className="h-12 text-base bg-white dark:bg-background/80 border-none text-gray-800 dark:text-blue-100 placeholder:text-gray-500 dark:placeholder:text-blue-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-700 font-semibold text-sm dark:text-blue-100">
                    Waktu Total t (s)
                  </Label>
                  <Input
                    ref={timeRef}
                    id="time"
                    type="number"
                    placeholder="Masukkan durasi waktu"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    className="h-12 text-base bg-white dark:bg-background/80 border-none text-gray-800 dark:text-blue-100 placeholder:text-gray-500 dark:placeholder:text-blue-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                  />
                </div>
              </div>

              {/* Variable Definitions */}
              <div className="bg-gray-50 dark:bg-primary/10 rounded-2xl p-4 border border-gray-200 dark:border-primary/30">
                <h4 className="font-semibold text-gray-700 dark:text-primary text-sm mb-3">Keterangan Variabel:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-blue-200">
                  <div><span className="font-mono font-bold">v</span> : Kecepatan akhir (m/s)</div>
                  <div><span className="font-mono font-bold">v₀</span> : Kecepatan awal (m/s)</div>
                  <div><span className="font-mono font-bold">a</span> : Percepatan (m/s²)</div>
                  <div><span className="font-mono font-bold">t</span> : Waktu (s)</div>
                  <div><span className="font-mono font-bold">s</span> : Perpindahan (m)</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={calculate} 
                  className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Hitung
                </Button>
                <Button 
                  onClick={reset} 
                  variant="outline" 
                  className="flex-1 h-12 text-base font-semibold border border-gray-300 dark:border-blue-300 hover:bg-gray-50 dark:hover:bg-primary/20 rounded-xl text-gray-700 dark:text-blue-100"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                {results && (
                  <Button 
                    onClick={exportXLSX} 
                    variant="outline" 
                    className="h-12 px-4 text-base font-semibold border border-green-500 dark:border-green-400 text-green-700 dark:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                )}
              </div>

              {/* Results Display */}
              {results && (
                <div className="bg-blue-50 dark:bg-primary/10 border border-blue-200 dark:border-primary/30 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 dark:text-primary text-lg mb-4">Hasil Perhitungan:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white dark:bg-background/80 rounded-xl p-4 border border-blue-200 dark:border-primary/30">
                      <p className="text-blue-700 dark:text-primary font-mono text-base">
                        <span className="font-bold block text-blue-800 dark:text-primary mb-1">Kecepatan Akhir (v):</span> 
                        <span className="text-xl font-bold">{results.finalVelocity.toFixed(2)} m/s</span>
                      </p>
                    </div>
                    <div className="bg-white dark:bg-background/80 rounded-xl p-4 border border-blue-200 dark:border-primary/30">
                      <p className="text-blue-700 dark:text-primary font-mono text-base">
                        <span className="font-bold block text-blue-800 dark:text-primary mb-1">Perpindahan (s):</span> 
                        <span className="text-xl font-bold">{results.displacement.toFixed(2)} m</span>
                      </p>
                    </div>
                    <div className="bg-white dark:bg-background/80 rounded-xl p-4 border border-blue-200 dark:border-primary/30">
                      <p className="text-blue-700 dark:text-primary font-mono text-base">
                        <span className="font-bold block text-blue-800 dark:text-primary mb-1">v² (Kuadrat Kecepatan):</span> 
                        <span className="text-xl font-bold">{results.velocitySquared.toFixed(2)} m²/s²</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

            {/* Charts Section */}
            {results && (
            <div className="space-y-4">
              {/* Position vs Time Chart */}
              <Card className="bg-white/70 dark:bg-background/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-primary/30 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-50/50 dark:bg-background/60 border-b border-gray-200 dark:border-primary/30 p-4 flex flex-row items-center justify-between">
              <div>
              <CardTitle className="text-lg text-blue-600 dark:text-primary font-bold">Posisi vs Waktu</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-blue-200">
                Kurva parabola perubahan posisi
              </CardDescription>
              </div>
              <Button
              onClick={() => copyChartAsImage(positionChartRef, 'posisi-vs-waktu')}
              variant="outline"
              size="sm"
              className="text-xs dark:border-primary/40 dark:text-blue-100"
              >
              <Copy className="w-3 h-3 mr-1" />
              Copy as Image
              </Button>
              </CardHeader>
              <CardContent className="p-4 dark:bg-background/80 rounded-b-2xl">
              <div ref={positionChartRef} className="h-64 dark:bg-background/80 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                dataKey="time" 
                stroke="#2563eb"
                fontSize={10}
                tick={{ fill: "#2563eb" }}
                axisLine={{ stroke: "#2563eb" }}
                tickLine={{ stroke: "#2563eb" }}
                />
                <YAxis 
                stroke="#2563eb"
                fontSize={10}
                tick={{ fill: "#2563eb" }}
                axisLine={{ stroke: "#2563eb" }}
                tickLine={{ stroke: "#2563eb" }}
                />
                <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, rgba(30,41,59,0.95))', 
                  color: 'var(--tooltip-color, #fff)', 
                  borderRadius: 12 
                }} 
                />
                <Line 
                type="monotone" 
                dataKey="position" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                name="Posisi"
                />
                </LineChart>
              </ResponsiveContainer>
              </div>
              </CardContent>
              </Card>

              {/* Velocity vs Time Chart */}
              <Card className="bg-white/70 dark:bg-background/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-primary/30 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-50/50 dark:bg-background/60 border-b border-gray-200 dark:border-primary/30 p-4 flex flex-row items-center justify-between">
              <div>
              <CardTitle className="text-lg text-blue-600 dark:text-primary font-bold">Kecepatan vs Waktu</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-blue-200">
                Hubungan linear kecepatan
              </CardDescription>
              </div>
              <Button
              onClick={() => copyChartAsImage(velocityChartRef, 'kecepatan-vs-waktu')}
              variant="outline"
              size="sm"
              className="text-xs dark:border-primary/40 dark:text-blue-100"
              >
              <Copy className="w-3 h-3 mr-1" />
              Copy as Image
              </Button>
              </CardHeader>
              <CardContent className="p-4 dark:bg-background/80 rounded-b-2xl">
              <div ref={velocityChartRef} className="h-64 dark:bg-background/80 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                dataKey="time" 
                stroke="#3b82f6"
                fontSize={10}
                tick={{ fill: "#3b82f6" }}
                axisLine={{ stroke: "#3b82f6" }}
                tickLine={{ stroke: "#3b82f6" }}
                />
                <YAxis 
                stroke="#3b82f6"
                fontSize={10}
                tick={{ fill: "#3b82f6" }}
                axisLine={{ stroke: "#3b82f6" }}
                tickLine={{ stroke: "#3b82f6" }}
                />
                <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, rgba(30,41,59,0.95))', 
                  color: 'var(--tooltip-color, #fff)', 
                  borderRadius: 12 
                }} 
                />
                <Line 
                type="monotone" 
                dataKey="velocity" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Kecepatan"
                />
                </LineChart>
              </ResponsiveContainer>
              </div>
              </CardContent>
              </Card>

              {/* Displacement vs Time Chart */}
              <Card className="bg-white/70 dark:bg-background/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-primary/30 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-50/50 dark:bg-background/60 border-b border-gray-200 dark:border-primary/30 p-4 flex flex-row items-center justify-between">
              <div>
              <CardTitle className="text-lg text-blue-600 dark:text-primary font-bold">Perpindahan vs Waktu</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-blue-200">
                Kurva perpindahan terhadap waktu
              </CardDescription>
              </div>
              <Button
              onClick={() => copyChartAsImage(displacementChartRef, 'perpindahan-vs-waktu')}
              variant="outline"
              size="sm"
              className="text-xs dark:border-primary/40 dark:text-blue-100"
              >
              <Copy className="w-3 h-3 mr-1" />
              Copy as Image
              </Button>
              </CardHeader>
              <CardContent className="p-4 dark:bg-background/80 rounded-b-2xl">
              <div ref={displacementChartRef} className="h-64 dark:bg-background/80 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                dataKey="time" 
                stroke="#1d4ed8"
                fontSize={10}
                tick={{ fill: "#1d4ed8" }}
                axisLine={{ stroke: "#1d4ed8" }}
                tickLine={{ stroke: "#1d4ed8" }}
                />
                <YAxis 
                stroke="#1d4ed8"
                fontSize={10}
                tick={{ fill: "#1d4ed8" }}
                axisLine={{ stroke: "#1d4ed8" }}
                tickLine={{ stroke: "#1d4ed8" }}
                />
                <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, rgba(30,41,59,0.95))', 
                  color: 'var(--tooltip-color, #fff)', 
                  borderRadius: 12 
                }} 
                />
                <Line 
                type="monotone" 
                dataKey="displacement" 
                stroke="#1d4ed8" 
                strokeWidth={3}
                dot={{ fill: '#1d4ed8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
                name="Perpindahan"
                />
                </LineChart>
              </ResponsiveContainer>
              </div>
              </CardContent>
              </Card>

              {/* Acceleration vs Time Chart */}
              <Card className="bg-white/70 dark:bg-background/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-primary/30 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-50/50 dark:bg-background/60 border-b border-gray-200 dark:border-primary/30 p-4 flex flex-row items-center justify-between">
              <div>
              <CardTitle className="text-lg text-blue-600 dark:text-primary font-bold">Percepatan vs Waktu</CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-blue-200">
                Percepatan konstan
              </CardDescription>
              </div>
              <Button
              onClick={() => copyChartAsImage(accelerationChartRef, 'percepatan-vs-waktu')}
              variant="outline"
              size="sm"
              className="text-xs dark:border-primary/40 dark:text-blue-100"
              >
              <Copy className="w-3 h-3 mr-1" />
              Copy as Image
              </Button>
              </CardHeader>
              <CardContent className="p-4 dark:bg-background/80 rounded-b-2xl">
              <div ref={accelerationChartRef} className="h-64 dark:bg-background/80 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                dataKey="time" 
                stroke="#1e40af"
                fontSize={10}
                tick={{ fill: "#1e40af" }}
                axisLine={{ stroke: "#1e40af" }}
                tickLine={{ stroke: "#1e40af" }}
                />
                <YAxis 
                stroke="#1e40af"
                fontSize={10}
                tick={{ fill: "#1e40af" }}
                axisLine={{ stroke: "#1e40af" }}
                tickLine={{ stroke: "#1e40af" }}
                />
                <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, rgba(30,41,59,0.95))', 
                  color: 'var(--tooltip-color, #fff)', 
                  borderRadius: 12 
                }} 
                />
                <Line 
                type="monotone" 
                dataKey="acceleration" 
                stroke="#1e40af" 
                strokeWidth={3}
                dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2 }}
                name="Percepatan"
                />
                </LineChart>
              </ResponsiveContainer>
              </div>
              </CardContent>
              </Card>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}