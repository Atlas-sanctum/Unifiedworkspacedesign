import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, ArrowRight, Shield, MessageSquare, Sparkles, Palette, Cross, Plus, Edit2, Trash2, LucideIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CRUDDialog } from "./crud/CRUDDialog";
import { DeleteConfirmDialog } from "./crud/DeleteConfirmDialog";
import { FormField } from "./crud/FormField";
import { showSuccessToast } from "../lib/toast";

interface Token {
  id: string;
  name: string;
  symbol: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
  chartColor: string;
}

interface Market {
  id: string;
  name: string;
  archetype: string;
  icon: LucideIcon;
  volume: string;
  description: string;
  color: string;
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  MessageSquare,
  Sparkles,
  Palette,
  Cross,
  TrendingUp,
};

const iconOptions = [
  { label: "Shield", value: "Shield" },
  { label: "Message Square", value: "MessageSquare" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "Palette", value: "Palette" },
  { label: "Cross", value: "Cross" },
  { label: "Trending Up", value: "TrendingUp" },
];

const colorOptions = [
  { label: "Blue to Indigo", value: "from-blue-500 to-indigo-600" },
  { label: "Amber to Yellow", value: "from-amber-500 to-yellow-600" },
  { label: "Green to Emerald", value: "from-green-500 to-emerald-600" },
  { label: "Pink to Rose", value: "from-pink-500 to-rose-600" },
  { label: "Cyan to Blue", value: "from-cyan-500 to-blue-600" },
  { label: "Purple to Violet", value: "from-purple-500 to-violet-600" },
  { label: "Teal to Cyan", value: "from-teal-500 to-cyan-600" },
];

const trendOptions = [
  { label: "Up ↑", value: "up" },
  { label: "Down ↓", value: "down" },
];

const initialTokens: Token[] = [
  {
    id: "1",
    name: "Dignity Preserved",
    symbol: "DP",
    value: "42,847",
    change: "+12.4%",
    trend: "up",
    color: "from-blue-500 to-indigo-600",
    chartColor: "#6366f1",
  },
  {
    id: "2",
    name: "Wisdom Transmitted",
    symbol: "WT",
    value: "38,291",
    change: "+8.7%",
    trend: "up",
    color: "from-amber-500 to-yellow-600",
    chartColor: "#f59e0b",
  },
  {
    id: "3",
    name: "Culture Regenerated",
    symbol: "CR",
    value: "51,203",
    change: "+15.2%",
    trend: "up",
    color: "from-green-500 to-emerald-600",
    chartColor: "#10b981",
  },
  {
    id: "4",
    name: "Peace Secured",
    symbol: "PS",
    value: "29,458",
    change: "+6.3%",
    trend: "up",
    color: "from-purple-500 to-violet-600",
    chartColor: "#8b5cf6",
  },
  {
    id: "5",
    name: "Harmony Metrics",
    symbol: "HM",
    value: "45,632",
    change: "+11.1%",
    trend: "up",
    color: "from-teal-500 to-cyan-600",
    chartColor: "#14b8a6",
  },
];

const initialMarkets: Market[] = [
  {
    id: "1",
    name: "Justice Futures",
    archetype: "Michael",
    icon: Shield,
    volume: "2.4M",
    description: "Backed by Michael-archetype intelligence models",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "2",
    name: "Communication Bonds",
    archetype: "Gabriel",
    icon: MessageSquare,
    volume: "1.8M",
    description: "Divine messenger principles in action",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "3",
    name: "Renewal Reserves",
    archetype: "Holy Spirit",
    icon: Sparkles,
    volume: "3.1M",
    description: "Eternal regeneration backed assets",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "4",
    name: "Creativity Markets",
    archetype: "Muse",
    icon: Palette,
    volume: "1.5M",
    description: "Archetypal inspiration derivatives",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "5",
    name: "Healing Indices",
    archetype: "Raphael",
    icon: Cross,
    volume: "2.7M",
    description: "Restoration and wholeness metrics",
    color: "from-purple-500 to-violet-600",
  },
];

const generateChartData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 20000) + 30000,
  }));
};

export function EconomicLayer() {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  
  // Token dialogs
  const [tokenDialog, setTokenDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as Token | null });
  const [tokenDeleteDialog, setTokenDeleteDialog] = useState({ open: false, id: '' });
  const [tokenLoading, setTokenLoading] = useState(false);
  
  // Market dialogs
  const [marketDialog, setMarketDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as Market | null });
  const [marketDeleteDialog, setMarketDeleteDialog] = useState({ open: false, id: '' });
  const [marketLoading, setMarketLoading] = useState(false);
  
  const [tokenForm, setTokenForm] = useState({
    name: '',
    symbol: '',
    value: '',
    change: '',
    trend: 'up' as 'up' | 'down',
    color: 'from-blue-500 to-indigo-600',
    chartColor: '#6366f1',
  });
  
  const [marketForm, setMarketForm] = useState({
    name: '',
    archetype: '',
    icon: 'Shield',
    volume: '',
    description: '',
    color: 'from-blue-500 to-indigo-600',
  });
  
  // Token CRUD
  const openTokenCreate = () => {
    setTokenForm({ name: '', symbol: '', value: '', change: '', trend: 'up', color: 'from-blue-500 to-indigo-600', chartColor: '#6366f1' });
    setTokenDialog({ open: true, mode: 'create', data: null });
  };
  
  const openTokenEdit = (token: Token) => {
    setTokenForm({
      name: token.name,
      symbol: token.symbol,
      value: token.value,
      change: token.change,
      trend: token.trend,
      color: token.color,
      chartColor: token.chartColor,
    });
    setTokenDialog({ open: true, mode: 'edit', data: token });
  };
  
  const handleTokenSubmit = async () => {
    setTokenLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (tokenDialog.mode === 'create') {
      const newToken: Token = {
        id: Date.now().toString(),
        ...tokenForm,
      };
      setTokens([...tokens, newToken]);
      showSuccessToast(`Token "${tokenForm.symbol}" created successfully!`);
    } else if (tokenDialog.data) {
      setTokens(tokens.map(t => 
        t.id === tokenDialog.data!.id 
          ? { ...t, ...tokenForm }
          : t
      ));
      showSuccessToast(`Token "${tokenForm.symbol}" updated successfully!`);
    }
    
    setTokenLoading(false);
    setTokenDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleTokenDelete = async () => {
    setTokenLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = tokens.find(t => t.id === tokenDeleteDialog.id);
    setTokens(tokens.filter(t => t.id !== tokenDeleteDialog.id));
    showSuccessToast(`Token "${token?.symbol}" has been removed.`);
    
    setTokenLoading(false);
    setTokenDeleteDialog({ open: false, id: '' });
  };
  
  // Market CRUD
  const openMarketCreate = () => {
    setMarketForm({ name: '', archetype: '', icon: 'Shield', volume: '', description: '', color: 'from-blue-500 to-indigo-600' });
    setMarketDialog({ open: true, mode: 'create', data: null });
  };
  
  const openMarketEdit = (market: Market) => {
    setMarketForm({
      name: market.name,
      archetype: market.archetype,
      icon: market.icon.name,
      volume: market.volume,
      description: market.description,
      color: market.color,
    });
    setMarketDialog({ open: true, mode: 'edit', data: market });
  };
  
  const handleMarketSubmit = async () => {
    setMarketLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const iconObj = iconOptions.find(opt => opt.value === marketForm.icon);
    
    if (marketDialog.mode === 'create') {
      const newMarket: Market = {
        id: Date.now().toString(),
        name: marketForm.name,
        archetype: marketForm.archetype,
        icon: iconMap[marketForm.icon] || Shield,
        volume: marketForm.volume,
        description: marketForm.description,
        color: marketForm.color,
      };
      setMarkets([...markets, newMarket]);
      showSuccessToast(`Market "${marketForm.name}" created successfully!`);
    } else if (marketDialog.data) {
      setMarkets(markets.map(m => 
        m.id === marketDialog.data!.id 
          ? { ...m, name: marketForm.name, archetype: marketForm.archetype, icon: iconMap[marketForm.icon] || m.icon, volume: marketForm.volume, description: marketForm.description, color: marketForm.color }
          : m
      ));
      showSuccessToast(`Market "${marketForm.name}" updated successfully!`);
    }
    
    setMarketLoading(false);
    setMarketDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleMarketDelete = async () => {
    setMarketLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const market = markets.find(m => m.id === marketDeleteDialog.id);
    setMarkets(markets.filter(m => m.id !== marketDeleteDialog.id));
    showSuccessToast(`Market "${market?.name}" has been removed.`);
    
    setMarketLoading(false);
    setMarketDeleteDialog({ open: false, id: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Introduction */}
      <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30 p-8">
        <h2 className="text-white mb-3">The Exchange Engine</h2>
        <p className="text-emerald-200/80 mb-4">
          Creating an alternative financial empire whose currency is meaning. We tokenize outcomes,
          not commodities—forming an economic system of regeneration, not extraction.
        </p>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-200 text-sm">Exchange Active</span>
          </div>
          <div className="text-emerald-300 text-sm">
            Total Market Cap: <span className="font-mono">∞ Meaning Units</span>
          </div>
        </div>
      </Card>

      {/* Token Dashboard */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Tokenization Dashboard</h3>
            <p className="text-emerald-200/60 text-sm">
              Live metrics for regenerative outcomes across the platform
            </p>
          </div>
          <Button
            onClick={openTokenCreate}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Token
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {tokens.map((token, index) => (
            <Card
              key={token.id}
              className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all hover:scale-[1.02] cursor-pointer group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    openTokenEdit(token);
                  }}
                  className="h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTokenDeleteDialog({ open: true, id: token.id });
                  }}
                  className="h-6 w-6 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${token.color} text-white text-xs`}>
                  {token.symbol}
                </div>
                {token.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="text-white text-2xl mb-1">{token.value}</div>
              <div className="text-white/60 text-xs mb-2">{token.name}</div>
              <div className={`text-xs ${token.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                {token.change} this cycle
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sample Chart */}
      <Card className="bg-black/40 border-white/10 p-6">
        <h4 className="text-white mb-4">Regenerative Value Flow (30-Day Cycle)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={generateChartData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="day" stroke="#ffffff40" />
            <YAxis stroke="#ffffff40" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #ffffff20",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Market Structure */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Market Structure</h3>
            <p className="text-emerald-200/60 text-sm">
              A cosmic economy anchored in moral and spiritual principles
            </p>
          </div>
          <Button
            onClick={openMarketCreate}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Market
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {markets.map((market, index) => {
            const Icon = market.icon;
            return (
              <Card
                key={market.id}
                className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all group cursor-pointer relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openMarketEdit(market)}
                    className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setMarketDeleteDialog({ open: true, id: market.id })}
                    className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${market.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{market.name}</h4>
                    <div className="text-white/50 text-xs mb-2">{market.description}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-xs">Volume:</span>
                      <span className="text-white text-xs font-mono">{market.volume}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/60 text-xs">Archetype: {market.archetype}</span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Institutional Logic */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
        <h4 className="text-white mb-4">Institutional Transformation</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-indigo-300 mb-2 text-sm">Banks Become</div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">→</span>
                <span>Curators of dignity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">→</span>
                <span>Oracles of wisdom</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">→</span>
                <span>Stewards of regenerative returns</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-purple-300 mb-2 text-sm">Markets Become</div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>Cosmic economies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>Moral anchors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">→</span>
                <span>Civilizational flourishing metrics</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-teal-300 mb-2 text-sm">Value Measures</div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">→</span>
                <span>Not material goods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">→</span>
                <span>But regenerative outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">→</span>
                <span>Meaning over matter</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Token Dialog */}
      <CRUDDialog
        open={tokenDialog.open}
        onOpenChange={(open) => setTokenDialog({ ...tokenDialog, open })}
        title={tokenDialog.mode === 'create' ? 'Create Token' : 'Edit Token'}
        description="Define a tokenized regenerative outcome for the Exchange"
        onSubmit={handleTokenSubmit}
        isLoading={tokenLoading}
        submitLabel={tokenDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Token Name"
            value={tokenForm.name}
            onChange={(value) => setTokenForm({ ...tokenForm, name: value })}
            placeholder="e.g., Dignity Preserved"
            required
          />
          <FormField
            type="text"
            label="Symbol"
            value={tokenForm.symbol}
            onChange={(value) => setTokenForm({ ...tokenForm, symbol: value })}
            placeholder="e.g., DP"
            required
          />
          <FormField
            type="text"
            label="Value"
            value={tokenForm.value}
            onChange={(value) => setTokenForm({ ...tokenForm, value: value })}
            placeholder="e.g., 42,847"
            required
          />
          <FormField
            type="text"
            label="Change"
            value={tokenForm.change}
            onChange={(value) => setTokenForm({ ...tokenForm, change: value })}
            placeholder="e.g., +12.4%"
            required
          />
          <FormField
            type="select"
            label="Trend"
            value={tokenForm.trend}
            onChange={(value) => setTokenForm({ ...tokenForm, trend: value as 'up' | 'down' })}
            options={trendOptions}
            required
          />
          <FormField
            type="select"
            label="Color Gradient"
            value={tokenForm.color}
            onChange={(value) => setTokenForm({ ...tokenForm, color: value })}
            options={colorOptions}
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Token Delete Dialog */}
      <DeleteConfirmDialog
        open={tokenDeleteDialog.open}
        onOpenChange={(open) => setTokenDeleteDialog({ ...tokenDeleteDialog, open })}
        title="Remove Token"
        description="Are you sure you want to remove this token? This action cannot be undone."
        onConfirm={handleTokenDelete}
        isLoading={tokenLoading}
      />
      
      {/* Market Dialog */}
      <CRUDDialog
        open={marketDialog.open}
        onOpenChange={(open) => setMarketDialog({ ...marketDialog, open })}
        title={marketDialog.mode === 'create' ? 'Create Market' : 'Edit Market'}
        description="Define a market structure based on archetypal intelligence"
        onSubmit={handleMarketSubmit}
        isLoading={marketLoading}
        submitLabel={marketDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Market Name"
            value={marketForm.name}
            onChange={(value) => setMarketForm({ ...marketForm, name: value })}
            placeholder="e.g., Justice Futures"
            required
          />
          <FormField
            type="text"
            label="Archetype"
            value={marketForm.archetype}
            onChange={(value) => setMarketForm({ ...marketForm, archetype: value })}
            placeholder="e.g., Michael"
            required
          />
          <FormField
            type="select"
            label="Icon"
            value={marketForm.icon}
            onChange={(value) => setMarketForm({ ...marketForm, icon: value })}
            options={iconOptions}
            required
          />
          <FormField
            type="text"
            label="Volume"
            value={marketForm.volume}
            onChange={(value) => setMarketForm({ ...marketForm, volume: value })}
            placeholder="e.g., 2.4M"
            required
          />
          <FormField
            type="textarea"
            label="Description"
            value={marketForm.description}
            onChange={(value) => setMarketForm({ ...marketForm, description: value })}
            placeholder="Describe the market..."
            rows={2}
            required
          />
          <FormField
            type="select"
            label="Color Gradient"
            value={marketForm.color}
            onChange={(value) => setMarketForm({ ...marketForm, color: value })}
            options={colorOptions}
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Market Delete Dialog */}
      <DeleteConfirmDialog
        open={marketDeleteDialog.open}
        onOpenChange={(open) => setMarketDeleteDialog({ ...marketDeleteDialog, open })}
        title="Remove Market"
        description="Are you sure you want to remove this market? This action cannot be undone."
        onConfirm={handleMarketDelete}
        isLoading={marketLoading}
      />
    </div>
  );
}
