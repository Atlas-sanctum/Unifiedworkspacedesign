import { useState } from "react";
import { Scale, Lightbulb, Repeat, Palette, Eye, Heart, Cross, Plus, Edit2, Trash2, LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CRUDDialog } from "./crud/CRUDDialog";
import { DeleteConfirmDialog } from "./crud/DeleteConfirmDialog";
import { FormField } from "./crud/FormField";
import { showSuccessToast, showErrorToast } from "../lib/toast";

interface DivineCustodian {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  qualities: string[];
  description: string;
}

interface UniversalAsset {
  id: string;
  name: string;
  value: string;
  unit: string;
}

const iconOptions: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Scale", value: "Scale", icon: Scale },
  { label: "Lightbulb", value: "Lightbulb", icon: Lightbulb },
  { label: "Repeat", value: "Repeat", icon: Repeat },
  { label: "Palette", value: "Palette", icon: Palette },
  { label: "Eye", value: "Eye", icon: Eye },
  { label: "Heart", value: "Heart", icon: Heart },
  { label: "Cross", value: "Cross", icon: Cross },
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

const initialCustodians: DivineCustodian[] = [
  {
    id: "1",
    name: "Justice",
    icon: Scale,
    color: "from-blue-500 to-indigo-600",
    qualities: ["Equity", "Fairness", "Moral Order"],
    description: "The eternal guardian of balance and righteousness",
  },
  {
    id: "2",
    name: "Wisdom",
    icon: Lightbulb,
    color: "from-amber-500 to-yellow-600",
    qualities: ["Knowledge", "Insight", "Understanding"],
    description: "The eternal keeper of understanding and truth",
  },
  {
    id: "3",
    name: "Renewal",
    icon: Repeat,
    color: "from-green-500 to-emerald-600",
    qualities: ["Regeneration", "Rebirth", "Transformation"],
    description: "The eternal force of regeneration and new beginnings",
  },
  {
    id: "4",
    name: "Creativity",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    qualities: ["Innovation", "Expression", "Beauty"],
    description: "The eternal muse of creation and artistic expression",
  },
  {
    id: "5",
    name: "Truth",
    icon: Eye,
    color: "from-cyan-500 to-blue-600",
    qualities: ["Clarity", "Revelation", "Authenticity"],
    description: "The eternal light that dispels illusion",
  },
  {
    id: "6",
    name: "Mercy",
    icon: Heart,
    color: "from-purple-500 to-violet-600",
    qualities: ["Compassion", "Forgiveness", "Grace"],
    description: "The eternal wellspring of compassion and healing",
  },
  {
    id: "7",
    name: "Healing",
    icon: Cross,
    color: "from-teal-500 to-cyan-600",
    qualities: ["Restoration", "Wholeness", "Integration"],
    description: "The eternal physician of body, mind, and spirit",
  },
];

const initialAssets: UniversalAsset[] = [
  { id: "1", name: "Wisdom", value: "∞", unit: "Eternal" },
  { id: "2", name: "Dignity", value: "∞", unit: "Eternal" },
  { id: "3", name: "Regeneration", value: "∞", unit: "Eternal" },
  { id: "4", name: "Harmony", value: "∞", unit: "Eternal" },
  { id: "5", name: "Cultural Continuity", value: "∞", unit: "Eternal" },
  { id: "6", name: "Moral Clarity", value: "∞", unit: "Eternal" },
];

export function MetaphysicalLayer() {
  const [custodians, setCustodians] = useState<DivineCustodian[]>(initialCustodians);
  const [assets, setAssets] = useState<UniversalAsset[]>(initialAssets);
  
  // Custodian dialogs
  const [custodianDialog, setCustodianDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as DivineCustodian | null });
  const [custodianDeleteDialog, setCustodianDeleteDialog] = useState({ open: false, id: '' });
  const [custodianLoading, setCustodianLoading] = useState(false);
  
  // Asset dialogs
  const [assetDialog, setAssetDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as UniversalAsset | null });
  const [assetDeleteDialog, setAssetDeleteDialog] = useState({ open: false, id: '' });
  const [assetLoading, setAssetLoading] = useState(false);
  
  // Form states
  const [custodianForm, setCustodianForm] = useState({
    name: '',
    icon: 'Scale',
    color: 'from-blue-500 to-indigo-600',
    qualities: '',
    description: '',
  });
  
  const [assetForm, setAssetForm] = useState({
    name: '',
    value: '∞',
    unit: 'Eternal',
  });
  
  // Custodian CRUD
  const openCustodianCreate = () => {
    setCustodianForm({ name: '', icon: 'Scale', color: 'from-blue-500 to-indigo-600', qualities: '', description: '' });
    setCustodianDialog({ open: true, mode: 'create', data: null });
  };
  
  const openCustodianEdit = (custodian: DivineCustodian) => {
    setCustodianForm({
      name: custodian.name,
      icon: custodian.icon.name,
      color: custodian.color,
      qualities: custodian.qualities.join(', '),
      description: custodian.description,
    });
    setCustodianDialog({ open: true, mode: 'edit', data: custodian });
  };
  
  const handleCustodianSubmit = async () => {
    setCustodianLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const iconObj = iconOptions.find(opt => opt.value === custodianForm.icon);
    const qualities = custodianForm.qualities.split(',').map(q => q.trim()).filter(q => q);
    
    if (custodianDialog.mode === 'create') {
      const newCustodian: DivineCustodian = {
        id: Date.now().toString(),
        name: custodianForm.name,
        icon: iconObj?.icon || Scale,
        color: custodianForm.color,
        qualities,
        description: custodianForm.description,
      };
      setCustodians([...custodians, newCustodian]);
      showSuccessToast(`Divine Custodian "${custodianForm.name}" created successfully!`);
    } else if (custodianDialog.data) {
      setCustodians(custodians.map(c => 
        c.id === custodianDialog.data!.id 
          ? { ...c, name: custodianForm.name, icon: iconObj?.icon || c.icon, color: custodianForm.color, qualities, description: custodianForm.description }
          : c
      ));
      showSuccessToast(`Divine Custodian "${custodianForm.name}" updated successfully!`);
    }
    
    setCustodianLoading(false);
    setCustodianDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleCustodianDelete = async () => {
    setCustodianLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const custodian = custodians.find(c => c.id === custodianDeleteDialog.id);
    setCustodians(custodians.filter(c => c.id !== custodianDeleteDialog.id));
    showSuccessToast(`Divine Custodian "${custodian?.name}" has been removed.`);
    
    setCustodianLoading(false);
    setCustodianDeleteDialog({ open: false, id: '' });
  };
  
  // Asset CRUD
  const openAssetCreate = () => {
    setAssetForm({ name: '', value: '∞', unit: 'Eternal' });
    setAssetDialog({ open: true, mode: 'create', data: null });
  };
  
  const openAssetEdit = (asset: UniversalAsset) => {
    setAssetForm({ name: asset.name, value: asset.value, unit: asset.unit });
    setAssetDialog({ open: true, mode: 'edit', data: asset });
  };
  
  const handleAssetSubmit = async () => {
    setAssetLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (assetDialog.mode === 'create') {
      const newAsset: UniversalAsset = {
        id: Date.now().toString(),
        ...assetForm,
      };
      setAssets([...assets, newAsset]);
      showSuccessToast(`Universal Asset "${assetForm.name}" created successfully!`);
    } else if (assetDialog.data) {
      setAssets(assets.map(a => 
        a.id === assetDialog.data!.id 
          ? { ...a, ...assetForm }
          : a
      ));
      showSuccessToast(`Universal Asset "${assetForm.name}" updated successfully!`);
    }
    
    setAssetLoading(false);
    setAssetDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleAssetDelete = async () => {
    setAssetLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const asset = assets.find(a => a.id === assetDeleteDialog.id);
    setAssets(assets.filter(a => a.id !== assetDeleteDialog.id));
    showSuccessToast(`Universal Asset "${asset?.name}" has been removed.`);
    
    setAssetLoading(false);
    setAssetDeleteDialog({ open: false, id: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Introduction */}
      <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/30 p-8">
        <h2 className="text-white mb-3">The Divine Asset Model</h2>
        <p className="text-purple-200/80 mb-4">
          Define what "eternal assets" are and who their custodians are. These archetypal beings
          represent the fundamental forms of capital that transcend material wealth.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-200 text-sm">Spiritual Macroeconomics Active</span>
        </div>
      </Card>

      {/* Divine Custodians */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Divine Custodians</h3>
            <p className="text-purple-200/60 text-sm">
              Archetypal asset holders modeling eternal principles as structured value categories
            </p>
          </div>
          <Button
            onClick={openCustodianCreate}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custodian
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {custodians.map((custodian, index) => {
            const Icon = custodian.icon;
            return (
              <Card
                key={custodian.id}
                className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all group relative"
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
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${custodian.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{custodian.name}</h4>
                    <p className="text-white/50 text-xs">{custodian.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {custodian.qualities.map((quality) => (
                    <span
                      key={quality}
                      className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs border border-white/10"
                    >
                      {quality}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Universal Assets */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Universal Assets</h3>
            <p className="text-purple-200/60 text-sm">
              Non-material forms of capital that form the foundation of regenerative civilization
            </p>
          </div>
          <Button
            onClick={openAssetCreate}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {assets.map((asset, index) => (
            <Card
              key={asset.id}
              className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 border-purple-500/30 p-6 text-center hover:border-purple-400/50 transition-all group relative"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openAssetEdit(asset)}
                  className="h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAssetDeleteDialog({ open: true, id: asset.id })}
                  className="h-6 w-6 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="text-3xl text-purple-300 mb-2">{asset.value}</div>
              <div className="text-white text-sm mb-1">{asset.name}</div>
              <div className="text-purple-400/60 text-xs">{asset.unit}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Integration */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white mb-2">AI Models Divine Behavior</h4>
            <p className="text-purple-200/70 text-sm">
              Artificial Intelligence models the "behavior" and qualities of these archetypal
              custodians, creating a bridge between the eternal and the temporal. This forms the
              foundation of spiritual macroeconomics—divine principles represented as structured
              value categories that can guide human action.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Custodian Dialog */}
      <CRUDDialog
        open={custodianDialog.open}
        onOpenChange={(open) => setCustodianDialog({ ...custodianDialog, open })}
        title={custodianDialog.mode === 'create' ? 'Create Divine Custodian' : 'Edit Divine Custodian'}
        description="Define the archetypal qualities and essence of this divine custodian"
        onSubmit={handleCustodianSubmit}
        isLoading={custodianLoading}
        submitLabel={custodianDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Name"
            value={custodianForm.name}
            onChange={(value) => setCustodianForm({ ...custodianForm, name: value })}
            placeholder="e.g., Justice, Wisdom, Renewal"
            required
          />
          <FormField
            type="select"
            label="Icon"
            value={custodianForm.icon}
            onChange={(value) => setCustodianForm({ ...custodianForm, icon: value })}
            options={iconOptions.map(opt => ({ label: opt.label, value: opt.value }))}
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
          <FormField
            type="text"
            label="Qualities"
            value={custodianForm.qualities}
            onChange={(value) => setCustodianForm({ ...custodianForm, qualities: value })}
            placeholder="Comma-separated: Equity, Fairness, Moral Order"
            required
          />
          <FormField
            type="textarea"
            label="Description"
            value={custodianForm.description}
            onChange={(value) => setCustodianForm({ ...custodianForm, description: value })}
            placeholder="The eternal guardian of..."
            rows={3}
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Custodian Delete Dialog */}
      <DeleteConfirmDialog
        open={custodianDeleteDialog.open}
        onOpenChange={(open) => setCustodianDeleteDialog({ ...custodianDeleteDialog, open })}
        title="Remove Divine Custodian"
        description="Are you sure you want to remove this divine custodian? This action cannot be undone."
        onConfirm={handleCustodianDelete}
        isLoading={custodianLoading}
      />
      
      {/* Asset Dialog */}
      <CRUDDialog
        open={assetDialog.open}
        onOpenChange={(open) => setAssetDialog({ ...assetDialog, open })}
        title={assetDialog.mode === 'create' ? 'Create Universal Asset' : 'Edit Universal Asset'}
        description="Define a non-material form of capital for regenerative civilization"
        onSubmit={handleAssetSubmit}
        isLoading={assetLoading}
        submitLabel={assetDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Name"
            value={assetForm.name}
            onChange={(value) => setAssetForm({ ...assetForm, name: value })}
            placeholder="e.g., Wisdom, Dignity, Harmony"
            required
          />
          <FormField
            type="text"
            label="Value"
            value={assetForm.value}
            onChange={(value) => setAssetForm({ ...assetForm, value: value })}
            placeholder="e.g., ∞"
            required
          />
          <FormField
            type="text"
            label="Unit"
            value={assetForm.unit}
            onChange={(value) => setAssetForm({ ...assetForm, unit: value })}
            placeholder="e.g., Eternal"
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Asset Delete Dialog */}
      <DeleteConfirmDialog
        open={assetDeleteDialog.open}
        onOpenChange={(open) => setAssetDeleteDialog({ ...assetDeleteDialog, open })}
        title="Remove Universal Asset"
        description="Are you sure you want to remove this universal asset? This action cannot be undone."
        onConfirm={handleAssetDelete}
        isLoading={assetLoading}
      />
    </div>
  );
}
