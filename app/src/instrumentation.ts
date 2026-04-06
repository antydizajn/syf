/**
 * NEXT.JS_INSTRUMENTATION - Performance & Runtime Monitoring
 * ═══════════════════════════════════════════════════════════════
 * This file is part of the Next.js production readiness checklist.
 * It allows for hooking into the runtime for logging, 
 * performance monitoring, or external observability.
 * ═══════════════════════════════════════════════════════════════
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // NODEJS - Server-side instrumentation (e.g. Sentry, Datadog)
    console.log('[AG_MONITOR] Node.js Runtime Bootstrapped: OK');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // EDGE - Edge-side instrumentation
    console.log('[AG_MONITOR] Edge Runtime Bootstrapped: OK');
  }
}
