import { useEffect, useMemo, useState } from 'react';
import {
  getSessionEvents,
  reconstructJourney,
  subscribeSessionEvents,
} from './runtime.ts';
import type { SemanticEvent } from './core.ts';

export function ImpactWorkbench({ onClose }: { onClose: () => void }) {
  const [events, setEvents] = useState<SemanticEvent[]>(() => getSessionEvents());

  useEffect(() => subscribeSessionEvents(() => setEvents(getSessionEvents())), []);
  const journey = useMemo(() => reconstructJourney(events), [events]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Impact Intelligence Workbench">
      <div className="ml-auto flex h-full max-w-2xl flex-col overflow-hidden border border-white/15 bg-[#121212] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">LIVE SESSION DATA · WORKING SYSTEM</p>
            <h2 className="mt-1 font-['Barlow:Bold'] text-2xl text-white">Impact Intelligence</h2>
          </div>
          <button onClick={onClose} className="border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:text-white">Close</button>
        </div>

        <div className="border-b border-white/10 p-5 text-xs leading-relaxed text-white/55">
          Session memory only. No production persistence, person inference, lead score, buying-intent claim or pipeline truth.
        </div>

        <div className="grid grid-cols-3 gap-px bg-white/10">
          <Metric label="events" value={events.length} />
          <Metric label="stages" value={journey.stagesObserved.length} />
          <Metric label="explicit actions" value={journey.explicitActions.length} />
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-auto p-5 md:grid-cols-2">
          <section>
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/35">Journey reconstruction</p>
            <ol className="space-y-2">
              {journey.stagesObserved.length === 0 && <li className="text-xs text-white/35">No observed journey stages yet.</li>}
              {journey.stagesObserved.map((stage, index) => (
                <li key={stage} className="border border-white/10 p-2 text-xs text-white/70">
                  {String(index + 1).padStart(2, '0')} · {stage.replaceAll('_', ' ')}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] text-white/40">
              Sequence integrity: {journey.sequenceIntegrity ? 'PASS' : 'FAIL'}
            </p>
          </section>

          <section>
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/35">Semantic event log</p>
            <div className="space-y-2">
              {events.slice().reverse().slice(0, 40).map((event) => (
                <article key={event.eventId} className="border border-white/10 p-2">
                  <div className="flex justify-between gap-2 text-[10px] text-white/35">
                    <span>#{event.sequence}</span><span>{event.theme}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/75">{event.name}</p>
                  <p className="text-[10px] text-white/35">{event.section}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#171717] p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{label}</p>
      <strong className="mt-1 block font-['Barlow:Bold'] text-2xl text-white">{value}</strong>
    </div>
  );
}
