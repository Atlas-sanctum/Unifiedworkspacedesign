import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Sparkles, Heart } from "lucide-react";
import { showSuccessToast, showInfoToast } from "../lib/toast";

export function MicrointeractionShowcase() {
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30 p-6">
      <h4 className="text-white mb-4">✨ Microinteraction Features</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Button Ripple Effect */}
        <div className="space-y-2">
          <div className="text-indigo-200 text-sm mb-2">Button Ripple</div>
          <Button
            onClick={() => showInfoToast("Button clicked with ripple effect!")}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 btn-ripple transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Click Me
          </Button>
        </div>

        {/* Animated Like Button */}
        <div className="space-y-2">
          <div className="text-purple-200 text-sm mb-2">State Animation</div>
          <Button
            onClick={() => {
              setLiked(!liked);
              showSuccessToast(liked ? "Unliked!" : "Liked!");
            }}
            className={`w-full btn-ripple transition-all duration-300 ${
              liked
                ? "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-500/50"
                : "bg-white/5 hover:bg-white/10 border border-white/20"
            }`}
          >
            <Heart
              className={`w-4 h-4 mr-2 transition-all duration-300 ${
                liked ? "fill-current scale-110" : ""
              }`}
            />
            {liked ? "Liked" : "Like"}
          </Button>
        </div>

        {/* Checkbox with Animation */}
        <div className="space-y-2">
          <div className="text-teal-200 text-sm mb-2">Toggle Effect</div>
          <Button
            onClick={() => {
              setChecked(!checked);
              showSuccessToast(checked ? "Unchecked" : "Checked");
            }}
            className={`w-full btn-ripple transition-all duration-300 ${
              checked
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/50"
                : "bg-white/5 hover:bg-white/10 border border-white/20"
            }`}
          >
            <Check
              className={`w-4 h-4 mr-2 transition-all duration-300 ${
                checked ? "scale-110 rotate-12" : "scale-0"
              }`}
            />
            {checked ? "Completed" : "Mark Complete"}
          </Button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-white/70 text-sm space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-indigo-400">→</span>
            <span>Ripple effects on all buttons for tactile feedback</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-400">→</span>
            <span>Smooth state transitions with scale and color animations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-400">→</span>
            <span>Toast notifications with glassmorphism and blur effects</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400">→</span>
            <span>Hover states with shadow glows matching brand colors</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
