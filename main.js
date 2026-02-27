/**
 * main.js — Application bootstrap
 * Entry point for the Support Message Generator SPA.
 */

import { initI18n } from './core/i18n.js';
import { initState } from './core/state.js';
import { renderTopbar } from './ui/topbar.js';
import { renderLeftPanel } from './ui/leftpanel.js';
import { renderRightPanel } from './ui/rightpanel.js';

async function bootstrap() {
    // Restore theme before render to avoid flash
    const savedTheme = localStorage.getItem('smg_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load translations and brand data
    await initI18n();
    await initState();

    // Render UI components
    renderTopbar();
    renderLeftPanel();
    renderRightPanel();

    // Mark app as ready (remove loading state)
    document.getElementById('smg-app')?.classList.add('is-ready');
}

bootstrap().catch(err => {
    console.error('[SMG] Bootstrap failed:', err);
});
