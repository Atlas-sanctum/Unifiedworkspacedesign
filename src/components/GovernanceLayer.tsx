import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Building2, Heart, Sprout, GraduationCap, Scale, FileText, ArrowRight, Plus, Edit2, Trash2, LucideIcon } from "lucide-react";
import { CRUDDialog } from "./crud/CRUDDialog";
import { DeleteConfirmDialog } from "./crud/DeleteConfirmDialog";
import { FormField } from "./crud/FormField";
import { showSuccessToast } from "../lib/toast";

interface CustodianRole {
  id: string;
  title: string;
  icon: LucideIcon;
  count: number;
  assets: string[];
  color: string;
  activeProjects: number;
}

interface StewardshipContract {
  id: string;
  custodian: string;
  archetype: string;
  scope: string;
  impact: string;
  status: string;
  progress: number;
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Sprout,
  Building2,
  GraduationCap,
  Scale,
};

const iconOptions = [
  { label: "Heart", value: "Heart" },
  { label: "Sprout", value: "Sprout" },
  { label: "Building", value: "Building2" },
  { label: "Graduation Cap", value: "GraduationCap" },
  { label: "Scale", value: "Scale" },
  { label: "Users", value: "Users" },
];

const colorOptions = [
  { label: "Blue to Indigo", value: "from-blue-500 to-indigo-600" },
  { label: "Green to Emerald", value: "from-green-500 to-emerald-600" },
  { label: "Purple to Violet", value: "from-purple-500 to-violet-600" },
  { label: "Amber to Yellow", value: "from-amber-500 to-yellow-600" },
  { label: "Cyan to Blue", value: "from-cyan-500 to-blue-600" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
];

const initialRoles: CustodianRole[] = [
  {
    id: "1",
    title: "Peacebuilding Stewards",
    icon: Heart,
    count: 1247,
    assets: ["Justice", "Mercy", "Truth"],
    color: "from-blue-500 to-indigo-600",
    activeProjects: 89,
  },
  {
    id: "2",
    title: "Climate Restoration Guardians",
    icon: Sprout,
    count: 2341,
    assets: ["Renewal", "Harmony", "Regeneration"],
    color: "from-green-500 to-emerald-600",
    activeProjects: 156,
  },
  {
    id: "3",
    title: "Cultural Regeneration Keepers",
    icon: Building2,
    count: 1892,
    assets: ["Creativity", "Wisdom", "Cultural Continuity"],
    color: "from-purple-500 to-violet-600",
    activeProjects: 203,
  },
  {
    id: "4",
    title: "Wisdom Transmission Scholars",
    icon: GraduationCap,
    count: 3104,
    assets: ["Wisdom", "Truth", "Moral Clarity"],
    color: "from-amber-500 to-yellow-600",
    activeProjects: 312,
  },
  {
    id: "5",
    title: "Social Equity Advocates",
    icon: Scale,
    count: 2567,
    assets: ["Justice", "Dignity", "Harmony"],
    color: "from-cyan-500 to-blue-600",
    activeProjects: 178,
  },
];

const initialContracts: StewardshipContract[] = [
  {
    id: "1",
    custodian: "Global Healing Initiative",
    archetype: "Justice & Mercy",
    scope: "Post-conflict reconciliation in 12 regions",
    impact: "487,000 lives transformed",
    status: "Active",
    progress: 68,
  },
  {
    id: "2",
    custodian: "Wisdom Preservation Collective",
    archetype: "Wisdom & Truth",
    scope: "Indigenous knowledge digitization",
    impact: "2,340 cultural traditions preserved",
    status: "Active",
    progress: 82,
  },
  {
    id: "3",
    custodian: "Regenerative Earth Alliance",
    archetype: "Renewal & Harmony",
    scope: "Ecosystem restoration across 5 continents",
    impact: "1.2M hectares regenerated",
    status: "Active",
    progress: 45,
  },
];

export function GovernanceLayer() {
  const [roles, setRoles] = useState<CustodianRole[]>(initialRoles);
  const [contracts, setContracts] = useState<StewardshipContract[]>(initialContracts);
  
  // Contract dialogs
  const [contractDialog, setContractDialog] = useState({ open: false, mode: 'create' as 'create' | 'edit', data: null as StewardshipContract | null });
  const [contractDeleteDialog, setContractDeleteDialog] = useState({ open: false, id: '' });
  const [contractLoading, setContractLoading] = useState(false);
  
  const [contractForm, setContractForm] = useState({
    custodian: '',
    archetype: '',
    scope: '',
    impact: '',
    status: 'Active',
    progress: 0,
  });
  
  // Contract CRUD
  const openContractCreate = () => {
    setContractForm({ custodian: '', archetype: '', scope: '', impact: '', status: 'Active', progress: 0 });
    setContractDialog({ open: true, mode: 'create', data: null });
  };
  
  const openContractEdit = (contract: StewardshipContract) => {
    setContractForm({
      custodian: contract.custodian,
      archetype: contract.archetype,
      scope: contract.scope,
      impact: contract.impact,
      status: contract.status,
      progress: contract.progress,
    });
    setContractDialog({ open: true, mode: 'edit', data: contract });
  };
  
  const handleContractSubmit = async () => {
    setContractLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (contractDialog.mode === 'create') {
      const newContract: StewardshipContract = {
        id: `SC-2024-${String(contracts.length + 1).padStart(3, '0')}`,
        ...contractForm,
      };
      setContracts([...contracts, newContract]);
      showSuccessToast(`Stewardship Contract created for "${contractForm.custodian}"!`);
    } else if (contractDialog.data) {
      setContracts(contracts.map(c => 
        c.id === contractDialog.data!.id 
          ? { ...c, ...contractForm }
          : c
      ));
      showSuccessToast(`Contract for "${contractForm.custodian}" updated successfully!`);
    }
    
    setContractLoading(false);
    setContractDialog({ open: false, mode: 'create', data: null });
  };
  
  const handleContractDelete = async () => {
    setContractLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const contract = contracts.find(c => c.id === contractDeleteDialog.id);
    setContracts(contracts.filter(c => c.id !== contractDeleteDialog.id));
    showSuccessToast(`Contract with "${contract?.custodian}" has been terminated.`);
    
    setContractLoading(false);
    setContractDeleteDialog({ open: false, id: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Introduction */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30 p-8">
        <h2 className="text-white mb-3">The Custodian Class</h2>
        <p className="text-blue-200/80 mb-4">
          Translating eternal assets into real-world stewardship. Human custodians—leaders,
          communities, and organizations—license archetypal assets for regenerative work that
          heals and transforms civilization.
        </p>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-200 text-sm">Stewardship Network Active</span>
          </div>
          <div className="text-blue-300 text-sm">
            Active Custodians: <span className="font-mono">{roles.reduce((sum, r) => sum + r.count, 0).toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Custodian Roles */}
      <div>
        <div className="mb-6">
          <h3 className="text-white mb-2">Custodian Roles</h3>
          <p className="text-blue-200/60 text-sm">
            Humans become stewards, not exploiters—licensing divine archetypes for regenerative purposes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all hover:scale-[1.02] cursor-pointer group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{role.title}</h4>
                    <div className="text-white/50 text-xs mb-3">
                      {role.count.toLocaleString()} Active Stewards
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-white/60 text-xs mb-2">Licensed Assets:</div>
                  <div className="flex flex-wrap gap-2">
                    {role.assets.map((asset) => (
                      <span
                        key={asset}
                        className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs border border-white/10"
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-emerald-400 text-xs">
                    {role.activeProjects} Active Projects
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stewardship Contracts */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-white mb-2">Active Stewardship Contracts</h3>
            <p className="text-blue-200/60 text-sm">
              Contractual interfaces between divine archetypes and human regenerative work
            </p>
          </div>
          <Button
            onClick={openContractCreate}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>
        <div className="space-y-4">
          {contracts.map((contract, index) => (
            <Card
              key={contract.id}
              className="bg-black/40 border-white/10 p-6 hover:border-white/30 transition-all cursor-pointer group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openContractEdit(contract)}
                  className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setContractDeleteDialog({ open: true, id: contract.id })}
                  className="h-8 w-8 p-0 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white">{contract.custodian}</h4>
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/30">
                        {contract.status}
                      </span>
                    </div>
                    <div className="text-white/50 text-xs mb-1">Contract ID: {contract.id}</div>
                    <div className="text-cyan-300 text-sm mb-2">{contract.archetype}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-white/60 text-xs mb-1">Scope</div>
                  <div className="text-white text-sm">{contract.scope}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Impact</div>
                  <div className="text-emerald-400 text-sm">{contract.impact}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-xs">Progress</span>
                  <span className="text-white text-xs">{contract.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ width: `${contract.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stewardship Principles */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
        <h4 className="text-white mb-4">Core Principles of Custodianship</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-indigo-300" />
              </div>
              <div>
                <div className="text-indigo-200 mb-1 text-sm">Stewards, Not Exploiters</div>
                <div className="text-white/70 text-xs">
                  Custodians are guardians who nurture and protect, never extract or deplete
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <div className="text-purple-200 mb-1 text-sm">Contractual Interface</div>
                <div className="text-white/70 text-xs">
                  Clear agreements bridge eternal principles and temporal action
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Sprout className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="text-cyan-200 mb-1 text-sm">Regenerative Focus</div>
                <div className="text-white/70 text-xs">
                  Every action must leave the world better, more whole, more harmonious
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Scale className="w-4 h-4 text-teal-300" />
              </div>
              <div>
                <div className="text-teal-200 mb-1 text-sm">Accountability to the Divine</div>
                <div className="text-white/70 text-xs">
                  Custodians answer to eternal principles, not just human interests
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Contract Dialog */}
      <CRUDDialog
        open={contractDialog.open}
        onOpenChange={(open) => setContractDialog({ ...contractDialog, open })}
        title={contractDialog.mode === 'create' ? 'Create Stewardship Contract' : 'Edit Stewardship Contract'}
        description="Define a contractual interface between divine archetypes and human regenerative work"
        onSubmit={handleContractSubmit}
        isLoading={contractLoading}
        submitLabel={contractDialog.mode === 'create' ? 'Create' : 'Update'}
      >
        <div className="space-y-4">
          <FormField
            type="text"
            label="Custodian Organization"
            value={contractForm.custodian}
            onChange={(value) => setContractForm({ ...contractForm, custodian: value })}
            placeholder="e.g., Global Healing Initiative"
            required
          />
          <FormField
            type="text"
            label="Archetype"
            value={contractForm.archetype}
            onChange={(value) => setContractForm({ ...contractForm, archetype: value })}
            placeholder="e.g., Justice & Mercy"
            required
          />
          <FormField
            type="textarea"
            label="Scope"
            value={contractForm.scope}
            onChange={(value) => setContractForm({ ...contractForm, scope: value })}
            placeholder="Describe the scope of work..."
            rows={2}
            required
          />
          <FormField
            type="text"
            label="Impact"
            value={contractForm.impact}
            onChange={(value) => setContractForm({ ...contractForm, impact: value })}
            placeholder="e.g., 487,000 lives transformed"
            required
          />
          <FormField
            type="select"
            label="Status"
            value={contractForm.status}
            onChange={(value) => setContractForm({ ...contractForm, status: value })}
            options={statusOptions}
            required
          />
          <FormField
            type="number"
            label="Progress (%)"
            value={contractForm.progress}
            onChange={(value) => setContractForm({ ...contractForm, progress: Number(value) })}
            placeholder="0-100"
            required
          />
        </div>
      </CRUDDialog>
      
      {/* Contract Delete Dialog */}
      <DeleteConfirmDialog
        open={contractDeleteDialog.open}
        onOpenChange={(open) => setContractDeleteDialog({ ...contractDeleteDialog, open })}
        title="Terminate Stewardship Contract"
        description="Are you sure you want to terminate this contract? This action cannot be undone and will affect ongoing regenerative work."
        onConfirm={handleContractDelete}
        isLoading={contractLoading}
      />
    </div>
  );
}
