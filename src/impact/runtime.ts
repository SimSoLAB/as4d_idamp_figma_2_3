import {
  EVENT_SCHEMA_VERSION,
  eventSignature,
  reconstructJourney,
  shouldCollapseDuplicate,
  stageForRouteStep,
  type DraftEvent,
  type SemanticEvent,
} from './core.ts';

const sessionId = crypto.randomUUID();
let sequence = 0;
const events: SemanticEvent[] = [];
const recent = new Map<string, number>();
const subscribers = new Set<() => void>();

export function emitSemanticEvent(input: DraftEvent): SemanticEvent | null {
  const now = Date.now();
  const signature = eventSignature(input);
  const previousAt = recent.get(signature);
  if (shouldCollapseDuplicate(previousAt, now)) return null;

  recent.set(signature, now);
  const event: SemanticEvent = {
    schemaVersion: EVENT_SCHEMA_VERSION,
    eventId: crypto.randomUUID(),
    sessionId,
    sequence: ++sequence,
    timestamp: new Date(now).toISOString(),
    ...input,
  };
  events.push(event);
  subscribers.forEach((fn) => fn());
  return event;
}

export function getSessionEvents(): SemanticEvent[] {
  return [...events];
}

export function subscribeSessionEvents(fn: () => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export { reconstructJourney };

function setFormStatus(container: Element, message: string, ok = false) {
  let status = container.querySelector<HTMLElement>('[data-impact-form-status]');
  if (!status) {
    status = document.createElement('p');
    status.dataset.impactFormStatus = 'true';
    status.setAttribute('role', 'status');
    status.className = 'text-[11px] leading-relaxed mt-1';
    container.appendChild(status);
  }
  status.textContent = message;
  status.style.color = ok ? '#7bc89c' : '#f2b632';
}

function validateWhitepaper(container: Element) {
  const value = (id: string) =>
    (container.querySelector<HTMLInputElement>(`#${id}`)?.value ?? '').trim();

  const name = value('name');
  const email = value('email');
  const company = value('company');
  const role = value('role');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const errors: string[] = [];
  if (!name) errors.push('name');
  if (!emailOk) errors.push('valid work email');
  if (!company) errors.push('company');
  if (!role) errors.push('role');

  return { ok: errors.length === 0, errors };
}

export function installImpactRuntime(): () => void {
  const enteredAt = new Map<Element, number>();
  const observed = Array.from(document.querySelectorAll<HTMLElement>('[data-track-section]'));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const section = el.dataset.trackSection ?? el.id ?? 'unknown';
        const theme = stageForRouteStep(el.dataset.routeStep);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!enteredAt.has(el)) {
            enteredAt.set(el, performance.now());
            emitSemanticEvent({ name: 'section_view', section, theme });
          }
        } else if (enteredAt.has(el)) {
          const started = enteredAt.get(el)!;
          enteredAt.delete(el);
          emitSemanticEvent({
            name: 'section_dwell',
            section,
            theme,
            metadata: { dwellMs: Math.max(0, Math.round(performance.now() - started)) },
          });
        }
      }
    },
    { threshold: [0, 0.35, 0.75] },
  );

  observed.forEach((el) => observer.observe(el));
  emitSemanticEvent({ name: 'session_start', section: 'idamp_repair', theme: 'curiosity' });

  const onFocus = (event: FocusEvent) => {
    const target = event.target as Element | null;
    const container = target?.closest?.('[data-track-region="whitepaper_form"]');
    if (!container) return;
    emitSemanticEvent({ name: 'whitepaper_form_start', section: 'deep_insights', theme: 'explicit_action' });
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target) return;

    const formContainer = target.closest('[data-track-region="whitepaper_form"]');
    const formButton = target.closest('button');
    if (formContainer && formButton) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const result = validateWhitepaper(formContainer);
      if (!result.ok) {
        setFormStatus(formContainer, `Please complete: ${result.errors.join(', ')}.`);
        emitSemanticEvent({
          name: 'whitepaper_validation_error',
          section: 'deep_insights',
          theme: 'explicit_action',
          metadata: { missing: result.errors },
        });
        return;
      }

      emitSemanticEvent({
        name: 'whitepaper_request',
        section: 'deep_insights',
        theme: 'explicit_action',
        metadata: { delivery: 'local_validation_only', backend: false },
      });
      setFormStatus(formContainer, 'Validated locally. No backend submission is connected.', true);
      return;
    }

    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (link) {
      emitSemanticEvent({
        name: 'navigation_select',
        section: link.getAttribute('href')?.slice(1) || 'unknown',
        theme: 'navigation',
      });
      return;
    }

    const node = target.closest<HTMLElement>('[data-track-region="system_node_detail"] button');
    if (node) {
      emitSemanticEvent({
        name: 'system_node_select',
        section: 'one_system',
        theme: 'integrated_system',
        metadata: { label: node.textContent?.trim() || 'unknown' },
      });
    }
  };

  document.addEventListener('focusin', onFocus, true);
  document.addEventListener('click', onClick, true);

  return () => {
    observer.disconnect();
    document.removeEventListener('focusin', onFocus, true);
    document.removeEventListener('click', onClick, true);
  };
}
