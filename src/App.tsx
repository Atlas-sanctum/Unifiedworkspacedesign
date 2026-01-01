import { useState } from "react";
import { MetaphysicalLayer } from "./components/MetaphysicalLayer";
import { GovernanceLayer } from "./components/GovernanceLayer";
import { EconomicLayer } from "./components/EconomicLayer";
import { RenaissanceLayer } from "./components/RenaissanceLayer";
import { MicrointeractionShowcase } from "./components/MicrointeractionShowcase";
import { Sparkles, Users, TrendingUp, Globe } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

type Layer = "metaphysical" | "governance" | "economic" | "renaissance";

export default function App() {
  const [activeLayer, setActiveLayer] = useState<Layer>("metaphysical");

  const layers = [
    {
      id: "metaphysical" as Layer,
      name: "Metaphysical",
      subtitle: "Divine Asset Model",
      icon: Sparkles,
      gradient: "from-violet-600 to-purple-600",
    },
    {
      id: "governance" as Layer,
      name: "Governance",
      subtitle: "The Custodian Class",
      icon: Users,
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "economic" as Layer,
      name: "Economic",
      subtitle: "The Exchange Engine",
      icon: TrendingUp,
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      id: "renaissance" as Layer,
      name: "Renaissance",
      subtitle: "Empire of Meaning",
      icon: Globe,
      gradient: "from-amber-600 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Ethereal background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">The Custodian Exchange</h1>
              <p className="text-purple-300/70 text-sm">
                A Global Renaissance Platform for Regenerative Meaning
              </p>
            </div>
          </div>

          {/* Layer Navigation */}
          <nav className="flex gap-2 overflow-x-auto">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? `bg-gradient-to-r ${layer.gradient} text-white shadow-lg`
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm">{layer.name}</div>
                    <div
                      className={`text-xs ${
                        isActive ? "text-white/80" : "text-white/40"
                      }`}
                    >
                      {layer.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {activeLayer === "metaphysical" && <MetaphysicalLayer />}
        {activeLayer === "governance" && <GovernanceLayer />}
        {activeLayer === "economic" && <EconomicLayer />}
        {activeLayer === "renaissance" && <RenaissanceLayer />}
        
        {/* Microinteraction Showcase */}
        <MicrointeractionShowcase />
      </main>
      <Toaster />
    </div>
  );
}