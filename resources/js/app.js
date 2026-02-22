import './bootstrap';
import '../css/app.css';
import './pwa.js';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'ILoveIMG';

// Initialize Sentry only if DSN is configured
// Vite exposes env vars to client only if they start with VITE_
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
    console.log('[Sentry] DSN found, initializing...');
    import('@sentry/vue').then((Sentry) => {
        Sentry.init({
            dsn: sentryDsn,
            environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'production',
            integrations: [
                Sentry.browserTracingIntegration(),
            ],
            tracesSampleRate: 0.1,
            beforeSend(event) {
                if (import.meta.env.DEV && !import.meta.env.VITE_SENTRY_DEBUG) {
                    console.log('[Sentry] Would send error:', event);
                    return null;
                }
                return event;
            },
        });
        console.log('[Sentry] Initialized');
    });
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        
        app.use(plugin)
            .use(ZiggyVue)
            .mount(el);
        
        return app;
    },
    progress: {
        color: '#ef4444',
    },
});
