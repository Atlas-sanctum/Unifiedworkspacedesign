import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Globe, Church, Trophy, Activity, Waves, Sparkles, TrendingUp, Plus, Edit2, Trash2, LucideIcon } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { CRUDDialog } from "./crud/CRUDDialog";
import { DeleteConfirmDialog } from "./crud/DeleteConfirmDialog";
import { FormField } from "./crud/FormField";
import { showSuccessToast } from "../lib/toast";

interface DigitalCathedral {
  id: string;
  name: string;
  visitors: string;
  purpose: string;
  icon: LucideIcon;
  color: string;
}

interface CustodianOfMeaning {
  id: string;
  rank: number;
  name: string;
  domain: string;
  score: string;
  impact: string;
  color: string;
}

const iconMap: Record<string, LucideIcon> = {
  Church,
  Globe,
  Sparkles,
  Trophy,
  Activity,
};

const iconOptions = [
  { label: "Church", value: "Church" },
  { label: "Globe", value: "Globe" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "Trophy", value: "Trophy" },
  { label: "Activity", value: "Activity" },
];

const colorOptions = [
  { label: "Amber to Yellow", value: "from-amber-500 to-yellow-600" },
  { label: "Purple to Violet", value: "from-purple-500 to-violet-600" },
  { label: "Green to Emerald", value: "from-green-500 to-emerald-600" },
  { label: "Teal to Cyan", value: "from-teal-500 to-cyan-600" },
  { label: "Blue to Indigo", value: "from-blue-500 to-indigo-600" },
];

const initialCathedrals: DigitalCathedral[] = [
  {
    id: "1",
    name: "The Sanctuary of Wisdom",
    visitors: "847K",
    purpose: "Global reflection & learning",
    icon: Church,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "2",
    name: "The Hall of Communion",
    visitors: "623K",
    purpose: "Sacred virtual gatherings",
    icon: Globe,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "3",
    name: "The Garden of Renewal",
    visitors: "912K",
    purpose: "Contemplation & restoration",
    icon: Sparkles,
    color: "from-green-500 to-emerald-600",
  },
];

const initialCustodians: CustodianOfMeaning[] = [
  {
    id: "1",
    rank: 1,
    name: "Elder Chen Wei",
    domain: "Wisdom Transmission",
    score: "∞ WD",
    impact: "2.4M lives transformed",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "2",
    rank: 2,
    name: "Dr. Amara Okonkwo",
    domain: "Cultural Regeneration",
    score: "∞ CC",
    impact: "847 traditions preserved",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "3",
    rank: 3,
    name: "Sister Maria Gonzalez",
    domain: "Healing & Mercy",
    score: "∞ HC",
    impact: "1.8M healed",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "4",
    rank: 4,
    name: "Kahuna Keanu Makani",
    domain: "Ecological Harmony",
    score: "∞ EH",
    impact: "340K hectares restored",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "5",
    rank: 5,
    name: "Rabbi David Goldstein",
    domain: "Justice & Truth",
    score: "∞ JT",
    impact: "523 conflicts resolved",
    color: "from-blue-500 to-indigo-600",
  },
];

const civilizationMetrics = [
  { metric: "Wisdom Density", value: 87, fullMark: 100 },
  { metric: "Dignity Equality", value: 78, fullMark: 100 },
  { metric: "Cultural Continuity", value: 92, fullMark: 100 },
  { metric: "Ecological Harmony", value: 65, fullMark: 100 },
  { metric: "Moral Clarity", value: 73, fullMark: 100 },
  { metric: "Social Cohesion", value: 81, fullMark: 100 },
];

const narrativePhases = [
  {
    phase: "The Flood of Intelligence",
    status: "Completed",
    description: "AI overwhelms civilization with information but no meaning",
    icon: Waves,
    color: "text-blue-400",
    progress: 100,
  },
  {
    phase: "The Call of Custodianship",
    status: "In Progress",
    description: "A new leadership paradigm emerges: guardians of meaning",
    icon: Sparkles,
    color: "text-purple-400",
    progress: 68,
  },
  {
    phase: "The Empire of Dignity",
    status: "Emerging",
    description: "The Exchange becomes the backbone of a globally regenerative society",
    icon: TrendingUp,
    color: "text-emerald-400",
    progress: 34,
  },
];

export function RenaissanceLayer() {
  const [cathedrals, setCathedrals] = useState<DigitalCathedral[]>(initialCathedrals);
  const [custodians, setCustodians] = useState<CustodianOfMeaning[]>(initialCustodians);
  
  // Cathedral dialogs
  const [cathedralDialog, setCathedralDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as DigitalCathedral | null });
  const [cathedralDeleteDialog, setCathedralDeleteDialog] = useState({ open: false, id: '' });
  const [cathedralLoading, setCathedralLoading] = useState(false);
  
  // Custodian dialogs
  const [custodianDialog, setCustodianDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as CustodianOfMeaning | null });
  const [custodianDeleteDialog, setCustodianDeleteDialog] = useState({ open: false, id: '' });
  const [custodianLoading, setCustodianLoading] = useState(false);
  
  const [cathedralForm, setCathedralForm] = useState({
    name: '',
    visitors: '',
    purpose: '',
    icon: 'Church',
    color: 'from-amber-500 to-yellow-600',
  });
  
  const [custodianForm, setCustodianForm] = useState({
    name: '',
    domain: '',
    score: '',
    impact: '',
    color: 'from-amber-500 to-yellow-600',
  });
  
  // Cathedral CRUD
  const openCathedralCreate = () => {
    setCathedralForm({ name: '', visitors: '', purpose: '', icon: 'Church', color: 'from-amber-500 to-yellow-600' });
    setCathedralDialog({ open: true, mode: 'create', data: null });
  };
  
  const openCathedralEdit = (cathedral: DigitalCathedral) => {
    setCathedralForm({
      name: cathedral.name,
      visitors: cathedral.visitors,
      purpose: cathedral.purpose,
      icon: cathedral.icon.name,
      color: cathedral.color,
    });
    setCathedralDialog({ open: true, mode: 'edit', data: cathedral });
  };
  
  const handleCathedralSubmit = async () => {
    setCathedralLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (cathedralDialog.mode === 'create') {
      const newCathedral: DigitalCathedral = {
        id: Date.now().toString(),
        name: cathedralForm.name,
        visitors: cathedralForm.visitors,
        purpose: cathedralForm.purpose,
        icon: iconMap[cathedralForm.icon] || Church,
        color: cathedralForm.color,
      };
      setCathedrals([...cathedrals, newCathedral]);
      showSuccessToast(`Digital Cathedral "${cathedralForm.name}" created!`);
    } else if (cathedralDialog.data) {
      setCathedrals(cathedrals.map(c => 
        c.id === cathedralDialog.data!.id 
          ? { ...c, name: cathedralForm.name, visitors: cathedralForm.visitors, purpose: cathedralForm.purpose, icon: iconMap[cathedralForm.icon] || c.icon, color: cathedralForm.color }
          : c
      ));
      showSuccessToast(`Cathedral "${cathedralForm.name}" updated successfully!`);
    }
    
    setCathedralLoading(false);
    setCathedralDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleCathedralDelete = async () => {
    setCathedralLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const cathedral = cathedrals.find(c => c.id === cathedralDeleteDialog.id);
    setCathedrals(cathedrals.filter(c => c.id !== cathedralDeleteDialog.id));
    showSuccessToast(`Cathedral "${cathedral?.name}" has been removed.`);
    
    setCathedralLoading(false);
    setCathedralDeleteDialog({ open: false, id: '' });
  };
  
  // Custodian CRUD
  const openCustodianCreate = () => {
    setCustodianForm({ name: '', domain: '', score: '', impact: '', color: 'from-amber-500 to-yellow-600' });
    setCustodianDialog({ open: true, mode: 'create', data: null });
  };
  
  const openCustodianEdit = (custodian: CustodianOfMeaning) => {
    setCustodianForm({
      name: custodian.name,
      domain: custodian.domain,
      score: custodian.score,
      impact: custodian.impact,
      color: custodian.color,
    });
    setCustodianDialog({ open: true, mode: 'edit', data: custodian });
  };
  
  const handleCustodianSubmit = async () => {
    setCustodianLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (custodianDialog.mode === 'create') {
      const newCustodian: CustodianOfMeaning = {
        id: Date.now().toString(),
        rank: custodians.length + 1,
        ...custodianForm,
      };
      setCustodians([...custodians, newCustodian]);
      showSuccessToast(`Custodian "${custodianForm.name}" added to the index!`);
    } else if (custodianDialog.data) {
      setCustodians(custodians.map(c => 
        c.id === custodianDialog.data!.id 
          ? { ...c, ...custodianForm }
          : c
      ));
      showSuccessToast(`Custodian "${custodianForm.name}" updated successfully!`);
    }
    
    setCustodianLoading(false);
    setCustodianDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleCustodianDelete = async () => {
    setCustodianLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const custodian = custodians.find(c => c.id === custodianDeleteDialog.id);
    const updatedCustodians = custodians.filter(c => c.id !== custodianDeleteDialog.id);
    // Re-rank custodians
    const reranked = updatedCustodians.map((c, i) => ({ ...c, rank: i + 1 }));
    setCustodians(reranked);
    showSuccessToast(`Custodian "${custodian?.name}" has been removed.`);
    
    setCustodianLoading(false);
    setCustodianDeleteDialog({ open: false, id: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Introduction */}
      <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/30 p-8">
        <h2 className="text-white mb-3">The Empire of Meaning</h2>
        <p className="text-amber-200/80 mb-4">
          Reframing human civilization around custodianship rather than accumulation. This is the
          dawn of a new renaissance—where wisdom, dignity, and regeneration define greatness.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-200 text-sm">Renaissance in Progress</span>
        </div>
      </Card>

      {/* Narrative Arc */}
      <div>
        <div className="mb-6">
          <h3 className="text-white mb-2">Narrative Arc of Transformation</h3>
          <p className="text-amber-200/60 text-sm">
            The three-phase journey from information chaos to meaning empire
          </p>
        </div>
        <div className="space-y-4">
          {narrativePhases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <Card
                key={phase.phase}
                className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-6 h-6 ${phase.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white">{phase.phase}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${
                          phase.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : phase.status === "In Progress"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-4">{phase.description}</p>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-xs">Progress</span>
                        <span className="text-white text-xs">{phase.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            phase.status === "Completed"
                              ? "bg-gradient-to-r from-emerald-500 to-green-500"
                              : phase.status === "In Progress"
                              ? "bg-gradient-to-r from-purple-500 to-violet-500"
                              : "bg-gradient-to-r from-amber-500 to-orange-500"
                          }`}
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Digital Cathedrals */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Digital Cathedrals</h3>
            <p className="text-amber-200/60 text-sm">
              Sacred virtual spaces for reflection, learning, and global communion
            </p>
          </div>
          <Button
            onClick={openCathedralCreate}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Cathedral
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cathedrals.map((cathedral, index) => {
            const Icon = cathedral.icon;
            return (
              <Card
                key={cathedral.id}
                className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all hover:scale-[1.02] cursor-pointer group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openCathedralEdit(cathedral)}
                    className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCathedralDeleteDialog({ open: true, id: cathedral.id })}
                    className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cathedral.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white mb-2">{cathedral.name}</h4>
                <p className="text-white/60 text-sm mb-3">{cathedral.purpose}</p>
                <div className="text-amber-400 text-sm">{cathedral.visitors} monthly visitors</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Custodians of Meaning Index */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Custodians of Meaning Index</h3>
            <p className="text-amber-200/60 text-sm">
              A replacement for wealth lists—celebrating guardians of regenerative civilization
            </p>
          </div>
          <Button
            onClick={openCustodianCreate}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custodian
          </Button>
        </div>
        <div className="space-y-3">
          {custodians.map((custodian, index) => (
            <Card
              key={custodian.id}
              className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all cursor-pointer group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openCustodianEdit(custodian)}
                  className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCustodianDeleteDialog({ open: true, id: custodian.id })}
                  className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${custodian.color} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white">#{custodian.rank}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-white">{custodian.name}</h4>
                    <div className="text-right">
                      <div className="text-amber-400 text-sm font-mono">{custodian.score}</div>
                      <div className="text-white/50 text-xs">{custodian.domain}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 text-sm">{custodian.impact}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Civilization Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10 p-6">
          <h4 className="text-white mb-4">Regenerative Civilization Metrics</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={civilizationMetrics}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="metric" stroke="#ffffff60" tick={{ fill: "#ffffff80", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#ffffff40" />
              <Radar
                name="Global Metrics"
                dataKey="value"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
          <h4 className="text-white mb-4">Defining Greatness</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-1" />
              <div>
                <div className="text-indigo-200 mb-1">Wisdom Density</div>
                <div className="text-white/70 text-sm">
                  How much collective understanding exists per capita
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-purple-300 flex-shrink-0 mt-1" />
              <div>
                <div className="text-purple-200 mb-1">Dignity Equality</div>
                <div className="text-white/70 text-sm">
                  Equal access to human worth and respect
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-teal-300 flex-shrink-0 mt-1" />
              <div>
                <div className="text-teal-200 mb-1">Ecological Harmony</div>
                <div className="text-white/70 text-sm">
                  Balance between human civilization and natural systems
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-1" />
              <div>
                <div className="text-amber-200 mb-1">Cultural Continuity</div>
                <div className="text-white/70 text-sm">
                  Preservation and evolution of meaningful traditions
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Vision Statement */}
      <Card className="bg-gradient-to-r from-violet-900/30 via-purple-900/30 to-fuchsia-900/30 border-purple-500/30 p-8 text-center">
        <Globe className="w-12 h-12 text-purple-300 mx-auto mb-4" />
        <h3 className="text-white mb-3">A New Civilization Dawns</h3>
        <p className="text-purple-200/80 max-w-3xl mx-auto mb-6">
          The Custodian Exchange is more than a platform—it is the foundational infrastructure for
          a civilization that measures success not in accumulated wealth, but in regenerated
          meaning. Here, the guardians of wisdom, dignity, and harmony are celebrated. Here, the
          currency is not gold, but transformation. Here, we build an empire not of power, but of
          purpose.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-400/30">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span className="text-purple-200">Join the Renaissance</span>
        </div>
      </Card>
      
      {/* Cathedral Dialog */}
      <CRUDDialog
        open={cathedralDialog.open}
        onOpenChange={(open) => setCathedralDialog({ ...cathedralDialog, open })}
        title={cathedralDialog.mode === 'create' ? 'Create Digital Cathedral' : 'Edit Digital Cathedral'}
        description="Define a sacred virtual space for reflection and global communion"
        onSubmit={handleCathedralSubmit}
        isLoading={cathedralLoading}
        submitLabel={cathedralDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Cathedral Name"
            value={cathedralForm.name}
            onChange={(value) => setCathedralForm({ ...cathedralForm, name: value })}
            placeholder="e.g., The Sanctuary of Wisdom"
            required
          />
          <FormField
            type="text"
            label="Monthly Visitors"
            value={cathedralForm.visitors}
            onChange={(value) => setCathedralForm({ ...cathedralForm, visitors: value })}
            placeholder="e.g., 847K"
            required
          />
          <FormField
            type="text"
            label="Purpose"
            value={cathedralForm.purpose}
            onChange={(value) => setCathedralForm({ ...cathedralForm, purpose: value })}
            placeholder="e.g., Global reflection & learning"
            required
          />
          <FormField
            type="select"
            label="Icon"
            value={cathedralForm.icon}
            onChange={(value) => setCathedralForm({ ...cathedralForm, icon: value })}
            options={iconOptions}
            required
          />
          <FormField
            type="select"
            label="Color Gradient"
            value={cathedralForm.color}
            onChange={(value) => setCathedralForm({ ...cathedralForm, color: value })}
            options={colorOptions}
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Cathedral Delete Dialog */}
      <DeleteConfirmDialog
        open={cathedralDeleteDialog.open}
        onOpenChange={(open) => setCathedralDeleteDialog({ ...cathedralDeleteDialog, open })}
        title="Remove Digital Cathedral"
        description="Are you sure you want to remove this cathedral? This action cannot be undone."
        onConfirm={handleCathedralDelete}
        isLoading={cathedralLoading}
      />
      
      {/* Custodian Dialog */}
      <CRUDDialog
        open={custodianDialog.open}
        onOpenChange={(open) => setCustodianDialog({ ...custodianDialog, open })}
        title={custodianDialog.mode === 'create' ? 'Add Custodian of Meaning' : 'Edit Custodian of Meaning'}
        description="Celebrate a guardian of regenerative civilization"
        onSubmit={handleCustodianSubmit}
        isLoading={custodianLoading}
        submitLabel={custodianDialog.mode === 'create' ? 'Add' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Name"
            value={custodianForm.name}
            onChange={(value) => setCustodianForm({ ...custodianForm, name: value })}
            placeholder="e.g., Elder Chen Wei"
            required
          />
          <FormField
            type="text"
            label="Domain"
            value={custodianForm.domain}
            onChange={(value) => setCustodianForm({ ...custodianForm, domain: value })}
            placeholder="e.g., Wisdom Transmission"
            required
          />
          <FormField
            type="text"
            label="Score"
            value={custodianForm.score}
            onChange={(value) => setCustodianForm({ ...custodianForm, score: value })}
            placeholder="e.g., ∞ WD"
            required
          />
          <FormField
            type="text"
            label="Impact"
            value={custodianForm.impact}
            onChange={(value) => setCustodianForm({ ...custodianForm, impact: value })}
            placeholder="e.g., 2.4M lives transformed"
            required
          />
          <FormField
            type="select"
            label="Color Gradient"
            value={custodianForm.color}
            onChange={(value) => setCustodianForm({ ...custodianForm, color: value })}
            options={colorOptions}
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Custodian Delete Dialog */}
      <DeleteConfirmDialog
        open={custodianDeleteDialog.open}
        onOpenChange={(open) => setCustodianDeleteDialog({ ...custodianDeleteDialog, open })}
        title="Remove Custodian of Meaning"
        description="Are you sure you want to remove this custodian from the index? This action cannot be undone."
        onConfirm={handleCustodianDelete}
        isLoading={custodianLoading}
      />
    </div>
  );
}
