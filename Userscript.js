// ==UserScript==
// @name         Universal Webpage Panic Mode
// @namespace    https://github.com
// @version      1.1
// @description  Instantly freeze animations, mute/pause media, and kill all running scripts/timers via a hotkey (Ctrl + Shift + X).
// @author       Your Name
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Unique ID for the panic mode elements
    const ID = '__bm_panic_mode';
    const NOTICE_ID = '__bm_panic_notice';

    // The main function that triggers panic mode
    function triggerPanicMode() {
        // Toggle off if already active
        if (document.getElementById(ID)) {
            document.getElementById(ID).remove();
            const oldNotice = document.getElementById(NOTICE_ID);
            if (oldNotice) oldNotice.remove();
            alert('Panic mode visual rules removed. Note: Cleared timers cannot be restored automatically.');
            return;
        }

        // 1. Inject aggressive CSS to freeze all visual movements
        const style = document.createElement('style');
        style.id = ID;
        style.textContent = `
            * {
                animation: none !important;
                transition: none !important;
            }
            img, video, iframe, canvas {
                animation: none !important;
                transition: none !important;
            }
            body {
                backface-visibility: hidden !important;
                -webkit-backface-visibility: hidden !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);

        // 2. Mute, pause, and stop loading all HTML5 media elements
        try {
            Array.from(document.querySelectorAll('video, audio')).forEach(media => {
                try {
                    media.pause();
                    media.muted = true;
                    media.preload = 'none';
                } catch (e) {}
            });
        } catch (e) {}

        // 3. Destructive timer wipeout (Nuke loops and timeouts)
        try {
            const probe = setInterval(() => {}, 1000);
            const maxId = probe;
            clearInterval(probe);

            // Fixed syntax: added + operators for the loop and increment
            for (let i = 0; i <= maxId + 1000; i++) {
                try {
                    clearInterval(i);
                    clearTimeout(i);
                } catch (e) {}
            }
        } catch (e) {}

        console.log('Panic Mode Activated: Page activity frozen.');
    }

    // 4. Keyboard Shortcut Listener
    // Note: Changed from Ctrl+Shift+Escape (reserved by Windows for Task Manager) to Ctrl+Shift+X
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'x') {
            event.preventDefault();
            triggerPanicMode();
        }
    }, true); // Using capture phase to intercept events early
})();
