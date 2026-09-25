import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const chrome = process.env.CHROME;
const url = process.env.TEST_URL || 'http://127.0.0.1:4173/';
if (!chrome) throw new Error('CHROME environment variable is required');
const proc = spawn(chrome, ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9222','--user-data-dir=/tmp/idamp-working-system-chrome',url], { stdio: 'ignore' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch('http://127.0.0.1:9222/json/list');
      const targets = await response.json();
      const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome DevTools target did not become available');
}

const ws = new WebSocket(await waitForTarget());
await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
let nextId = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const handler = pending.get(message.id);
  if (!handler) return;
  pending.delete(message.id);
  if (message.error) handler.reject(new Error(JSON.stringify(message.error))); else handler.resolve(message.result);
});
function send(method, params = {}) {
  const id = ++nextId;
  const promise = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  ws.send(JSON.stringify({ id, method, params }));
  return promise;
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

try {
  await send('Runtime.enable');
  for (let i = 0; i < 40; i++) {
    if (await evaluate("document.querySelectorAll('[data-route-step]').length") === 7) break;
    await sleep(250);
  }
  assert.equal(await evaluate("document.querySelectorAll('[data-route-step]').length"), 7);
  assert.equal(await evaluate("document.querySelector('[data-route-step=\"01\"]') !== null"), true);
  assert.equal(await evaluate("document.querySelector('[data-route-step=\"07\"]') !== null"), true);
  const invalidStatus = await evaluate("(() => { const region=document.querySelector('[data-track-region=\"whitepaper_form\"]'); region.querySelector('button').click(); return region.querySelector('[data-impact-form-status]')?.textContent || ''; })()");
  assert.match(invalidStatus, /Please complete:/);
  const validStatus = await evaluate("(() => { const region=document.querySelector('[data-track-region=\"whitepaper_form\"]'); const values={name:'Acceptance User',email:'acceptance@example.com',company:'aS4D',role:'Reviewer'}; for (const [id,value] of Object.entries(values)) region.querySelector('#'+id).value=value; region.querySelector('button').click(); return region.querySelector('[data-impact-form-status]')?.textContent || ''; })()");
  assert.equal(validStatus, 'Validated locally. No backend submission is connected.');
  const opened = await evaluate("(() => { const button=[...document.querySelectorAll('button')].find((el)=>el.textContent?.trim()==='Intelligence'); if(!button) return false; button.click(); return true; })()");
  assert.equal(opened, true);
  await sleep(100);
  assert.equal(await evaluate("document.querySelector('[role=\"dialog\"]') !== null"), true);
  const explicitCount = await evaluate("(() => { const label=[...document.querySelectorAll('[role=\"dialog\"] p')].find((el)=>el.textContent?.trim()==='explicit actions'); return label?.parentElement?.querySelector('strong')?.textContent || ''; })()");
  assert.equal(explicitCount, '1');
  assert.match(await evaluate("document.querySelector('[role=\"dialog\"]')?.textContent || ''"), /Sequence integrity: PASS/);
  console.log('browser working-system acceptance: PASS');
} finally {
  ws.close();
  proc.kill('SIGTERM');
}
