import { Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Data Definitions ---

const inventory = [
  { id: '1', name: 'Streak Freeze', description: '', equipped: '0 / 2 EQUIPPED', icon: '🧊' },
  { id: '2', name: 'Arctic Shield', description: '', equipped: '0 / 2 EQUIPPED', icon: '🛡️' },
  { id: '3', name: 'Flake points booster', description: '', equipped: '0 / 2 EQUIPPED', icon: '❄️' },
  { id: '4', name: 'Flake points booster', description: '', equipped: '0 / 2 EQUIPPED', icon: '❄️' },
];

const shopItems = [
  { id: 's1', name: 'Streak Freeze', description: 'Streak Freeze allows your streak to remain in place for one full day of inactivity.', equipped: '0 / 2 EQUIPPED', price: 200, icon: '🧊' },
  { id: 's2', name: 'Double or Nothing', description: 'Attempt to double your five Flake points wager by maintaining a seven day streak.', equipped: '', price: 350, icon: '🎲' },
  { id: 's3', name: 'Arctic Shield', description: 'It secures your leaderboard position for 1 Day', equipped: '', price: 400, icon: '🛡️' },
  { id: 's4', name: 'XP Booster', description: 'You will get 3x flake points for 1 task', equipped: '', price: 5400, icon: '⚡' },
];

const sponsorItems = [
  { id: 'sp1', name: 'Streak Freeze', description: 'Streak Freeze allows your streak to remain in place for one full day of inactivity.', equipped: '0 / 2 EQUIPPED', price: 200, icon: '🧊' },
  { id: 'sp2', name: 'Double or Nothing', description: 'Attempt to double your five Flake points wager by maintaining a seven day streak.', equipped: '0 / 2 EQUIPPED', price: 5, icon: '🎲' },
  { id: 'sp3', name: 'Arctic Shield', description: 'It secures your leaderboard position for 1 Day', equipped: '0 / 2 EQUIPPED', price: 5, icon: '🛡️' },
  { id: 'sp4', name: 'XP Booster', description: 'You will get 3x flake points for 1 task', equipped: '0 / 2 EQUIPPED', price: 5, icon: '⚡' },
];

// --- Components ---

function ShopCard({ item, isShopItem = false }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:bg-slate-900/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Icon & Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/10 text-2xl border border-white/5">
            {item.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-slate-100">{item.name}</span>
              {item.equipped && (
                <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-[10px] hover:bg-slate-800 border-slate-700">
                  {item.equipped}
                </Badge>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Action Button */}
        {isShopItem ? (
          <Button 
            variant="outline" 
            className="shrink-0 border-slate-700 bg-transparent hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50 transition-all h-auto py-2 px-4 w-full md:w-auto flex justify-between md:justify-center gap-3 group/btn"
          >
            <span className="text-xs font-bold text-slate-400 group-hover/btn:text-cyan-400">GET {item.equipped ? 'ONE ' : ''}FOR:</span>
            <div className="flex items-center gap-1">
                <Snowflake className="h-4 w-4 text-cyan-400 fill-cyan-400/20" />
                <span className="font-bold text-white group-hover/btn:text-cyan-100">{item.price}</span>
            </div>
          </Button>
        ) : (
            // Inventory State (Already Owned)
            <div className="hidden md:block">
                 <Badge variant="outline" className="border-slate-700 text-slate-500">OWNED</Badge>
            </div>
        )}
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function ShopPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        <div className="max-w-5xl mx-auto space-y-12 pb-12">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-mono font-bold text-3xl tracking-wider text-white uppercase mb-1">
                Power-Ups
              </h1>
              <p className="text-slate-400 text-sm">
                Use Flake points to survive tough days
              </p>
            </div>
            
            {/* Currency Display */}
            <div className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-6 py-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Snowflake className="h-6 w-6 text-cyan-400 animate-pulse" fill="currentColor" />
              <span className="text-2xl font-bold text-white tracking-tight">48</span>
            </div>
          </div>

          {/* Inventory Section */}
          <section className="space-y-6">
            <div className="space-y-1">
                <h2 className="font-mono font-bold text-xl text-white uppercase tracking-wide">Inventory</h2>
                <p className="text-sm text-slate-500">You will get Powerups by doing Special Sponsors tasks.</p>
            </div>
            
            <div className="grid gap-4">
              {inventory.map((item) => (
                <ShopCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Shop Section */}
          <section className="space-y-6">
            <div className="space-y-1">
                <h2 className="font-mono font-bold text-xl text-white uppercase tracking-wide">Shop</h2>
                <p className="text-sm text-slate-500">Purchase items to boost your progress.</p>
            </div>

            <div className="grid gap-4">
              {shopItems.map((item) => (
                <ShopCard key={item.id} item={item} isShopItem={true} />
              ))}
            </div>
          </section>

          {/* Sponsors Special Section */}
          <section className="space-y-6">
            <div className="space-y-1">
                <h2 className="font-mono font-bold text-xl text-white uppercase tracking-wide">Sponsors Special</h2>
                <p className="text-sm text-slate-500">Exclusive deals from our partners.</p>
            </div>

            <div className="grid gap-4">
              {sponsorItems.map((item) => (
                <ShopCard key={item.id} item={item} isShopItem={true} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}