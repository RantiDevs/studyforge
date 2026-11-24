"use client";
import { useState } from "react";

const PREFIX = "sf_";

export default function BackupPanel() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const exportData = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) data[k] = localStorage.getItem(k) || "";
    }
    const blob = new Blob([JSON.stringify({ app: "studyforge", exportedAt: new Date().toISOString(), data })], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `studyforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg({ ok: true, text: `Backup saved (${Object.keys(data).length} items).` });
  };

  const importData = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed.app !== "studyforge" || typeof parsed.data !== "object" || parsed.data === null) throw new Error("bad");
      const entries = Object.entries(parsed.data as Record<string, unknown>).filter(([k, v]) => k.startsWith(PREFIX) && typeof v === "string");
      if (!entries.length) throw new Error("empty");
      if (!window.confirm("Restoring replaces the progress and content on this device. Continue?")) return;
      entries.forEach(([k, v]) => localStorage.setItem(k, v as string));
      setMsg({ ok: true, text: "Restored. Reloading..." });
      setTimeout(() => window.location.reload(), 600);
    } catch {
      setMsg({ ok: false, text: "That file is not a valid StudyForge backup." });
    }
  };

  return (
    <div className="glass rounded-xl p-4 space-y-3 border border-white/10">
      <div className="text-[10px] font-bold text-txt-dim uppercase tracking-widest">Backup &amp; restore</div>
      <p className="text-xs text-txt-muted">Your progress and imported lessons live only on this device. Save a backup now and then.</p>
      <div className="flex gap-2">
        <button onClick={exportData} className="flex-1 btn-neon text-white text-sm font-semibold py-2.5 rounded-xl">Download backup</button>
        <label className="flex-1 glass border border-white/10 text-white text-sm font-semibold py-2.5 rounded-xl text-center cursor-pointer">
          Restore
          <input type="file" accept="application/json" className="hidden" onChange={e => { importData(e.target.files?.[0]); e.target.value = ""; }} />
        </label>
      </div>
      {msg && <div className={`rounded-xl p-3 text-sm border ${msg.ok ? "bg-success/10 border-success/30 text-success" : "bg-danger/10 border-danger/30 text-danger"}`}>{msg.text}</div>}
    </div>
  );
}
