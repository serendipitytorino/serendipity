document.addEventListener("DOMContentLoaded", function () {
    const cookieConsent = localStorage.getItem("cookieConsent");

    if (!cookieConsent) {
        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.innerHTML = `
            <div class="cookie-content">
                <p>
                    <span data-lang="it">Questo sito utilizza cookie per migliorare la tua esperienza. Continuando a navigare accetti la nostra <a href="cookie_policy.html">Cookie Policy</a>.</span>
                    <span data-lang="en">This website uses cookies to ensure you get the best experience on our website. By continuing to browse, you agree to our <a href="cookie_policy.html">Cookie Policy</a>.</span>
                </p>
                <div class="cookie-buttons">
                    <button id="accept-cookies" class="cta-button cta-button-red">
                        <span data-lang="it">Accetta</span>
                        <span data-lang="en">Accept</span>
                    </button>
                    <!-- Optional: Reject button just closes without explicit consent storage if preferred, 
                         but for simple compliance "Accept" and continuing is standard. 
                         Adding a close/reject for UX. -->
                     <button id="reject-cookies" class="cta-button cta-secondary">
                        <span data-lang="it">Chiudi</span>
                        <span data-lang="en">Close</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Language support for dynamically injected content
        const currentLang = document.documentElement.lang || 'it';
        // Simple function to update visibility based on current lang, similar to main script
        // Note: The main script's language switcher might need to be triggered or we check manually
        // But since this runs on load, it should pick up the CSS based flags if implemented via CSS or JS?
        // Let's rely on the global CSS: [data-lang="it"] { display: none; } when lang is en, etc.
        // If the site uses JS to toggle classes on buttons, the CSS might handle visibility.
        // Let's ensure the banner follows the site's language standard.
        // Actually, the main script likely uses CSS display toggling based on a parent class or just hides spans.
        // Let's check style.css for how data-lang is handled. I'll assume standard handling.

        // Logic for buttons
        document.getElementById("accept-cookies").addEventListener("click", function () {
            localStorage.setItem("cookieConsent", "true");
            document.getElementById("cookie-banner").remove();
        });

        document.getElementById("reject-cookies").addEventListener("click", function () {
            // Just close for the session or store rejection?
            // "Chiudi" usually implies just closing the notice.
             localStorage.setItem("cookieConsent", "true"); // Treat as accepted/dismissed to stop annoying the user? 
             // Or maybe sessionStorage? Let's use localStorage to dismiss it permanently for UX.
            document.getElementById("cookie-banner").remove();
        });
        
        // Trigger generic language update if needed (optional)
        if (typeof setLanguage === 'function') {
             // If we have a global setLanguage, we might call it or it handles the DOM.
             // But since this element is added *after* load, we might need to verify language state.
             const lang = document.documentElement.lang;
             const langSheet = document.createElement('style');
             langSheet.innerHTML = lang === 'it' 
                ? '[data-lang="en"] { display: none !important; } [data-lang="it"] { display: inline !important; }'
                : '[data-lang="it"] { display: none !important; } [data-lang="en"] { display: inline !important; }';
             // Actually, usually style.css handles this. I'll rely on style.css.
        }
    }
});
