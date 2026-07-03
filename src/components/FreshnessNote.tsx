import { CheckCircle2, Flag } from "lucide-react";
import { LINKS_LAST_REVIEWED, REPORT_LINK_URL } from "@/data/meta";

// small honest freshness line for listing pages: when links were last
// reviewed + a no-backend way to report a dead one.
export default function FreshnessNote() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-2">
      <span className="inline-flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        Links last reviewed {LINKS_LAST_REVIEWED}
      </span>
      <span className="text-slate-300">·</span>
      <a
        href={REPORT_LINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-500"
      >
        <Flag className="w-3.5 h-3.5" /> Report a broken link
      </a>
    </div>
  );
}
