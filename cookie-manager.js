// =========================================================================
// COOKIE MANAGER - GDPR Compliant System
// =========================================================================
// Sistema autonomo per gestione cookies GDPR
// Multilingue - Rileva automaticamente la lingua dalla URL
// =========================================================================

class CookieManager {
    constructor() {
        this.cookieConsent = null;
        this.currentLang = this.detectLanguage();
        this.init();
    }

    // Rileva lingua da URL (stesso sistema del quiz)
    detectLanguage() {
        const path = window.location.pathname;
        if (path.includes('index-en') || path.includes('privacy-en') || path.includes('cookie-en')) return 'en';
        if (path.includes('index-es') || path.includes('privacy-es') || path.includes('cookie-es')) return 'es';
        if (path.includes('index-de') || path.includes('privacy-de') || path.includes('cookie-de')) return 'de';
        if (path.includes('index-fr') || path.includes('privacy-fr') || path.includes('cookie-fr')) return 'fr';
        return 'it';
    }

    // Testi multilingue per il banner
    getTexts() {
        const texts = {
            it: {
                title: "🍪 Gestione Cookie",
                message: "Utilizziamo cookie per migliorare la tua esperienza e per funzionalità essenziali come i pagamenti. Puoi scegliere quali accettare.",
                essential: "Cookie Essenziali",
                essentialDesc: "Necessari per il funzionamento del sito e pagamenti (PayPal, Stripe)",
                preferences: "Cookie Preferenze", 
                preferencesDesc: "Salvano le tue scelte (lingua, dati form)",
                analytics: "Cookie Analytics",
                analyticsDesc: "Ci aiutano a migliorare il sito (Google Analytics)",
                marketing: "Cookie Marketing",
                marketingDesc: "Per campagne pubblicitarie e remarketing",
                acceptAll: "Accetta Tutti",
                rejectAll: "Rifiuta Non Essenziali", 
                customize: "Personalizza",
                save: "Salva Preferenze",
                privacyPolicy: "Privacy Policy",
                cookiePolicy: "Cookie Policy"
            },
            en: {
                title: "🍪 Cookie Management",
                message: "We use cookies to improve your experience and for essential functions like payments. You can choose which ones to accept.",
                essential: "Essential Cookies",
                essentialDesc: "Required for website functionality and payments (PayPal, Stripe)",
                preferences: "Preference Cookies",
                preferencesDesc: "Save your choices (language, form data)",
                analytics: "Analytics Cookies", 
                analyticsDesc: "Help us improve the website (Google Analytics)",
                marketing: "Marketing Cookies",
                marketingDesc: "For advertising campaigns and remarketing",
                acceptAll: "Accept All",
                rejectAll: "Reject Non-Essential",
                customize: "Customize", 
                save: "Save Preferences",
                privacyPolicy: "Privacy Policy",
                cookiePolicy: "Cookie Policy"
            },
            es: {
                title: "🍪 Gestión de Cookies",
                message: "Utilizamos cookies para mejorar tu experiencia y funciones esenciales como pagos. Puedes elegir cuáles aceptar.",
                essential: "Cookies Esenciales",
                essentialDesc: "Necesarias para el funcionamiento del sitio y pagos (PayPal, Stripe)",
                preferences: "Cookies de Preferencias",
                preferencesDesc: "Guardan tus elecciones (idioma, datos formulario)", 
                analytics: "Cookies Analíticas",
                analyticsDesc: "Nos ayudan a mejorar el sitio web (Google Analytics)",
                marketing: "Cookies de Marketing",
                marketingDesc: "Para campañas publicitarias y remarketing",
                acceptAll: "Aceptar Todas",
                rejectAll: "Rechazar No Esenciales",
                customize: "Personalizar",
                save: "Guardar Preferencias", 
                privacyPolicy: "Política de Privacidad",
                cookiePolicy: "Política de Cookies"
            },
            de: {
                title: "🍪 Cookie-Verwaltung", 
                message: "Wir verwenden Cookies zur Verbesserung Ihrer Erfahrung und für wesentliche Funktionen wie Zahlungen. Sie können wählen, welche Sie akzeptieren.",
                essential: "Wesentliche Cookies",
                essentialDesc: "Erforderlich für Website-Funktionalität und Zahlungen (PayPal, Stripe)",
                preferences: "Präferenz-Cookies",
                preferencesDesc: "Speichern Ihre Auswahl (Sprache, Formulardaten)",
                analytics: "Analytics-Cookies",
                analyticsDesc: "Helfen uns, die Website zu verbessern (Google Analytics)", 
                marketing: "Marketing-Cookies",
                marketingDesc: "Für Werbekampagnen und Remarketing",
                acceptAll: "Alle Akzeptieren",
                rejectAll: "Nicht-Wesentliche Ablehnen",
                customize: "Anpassen",
                save: "Präferenzen Speichern",
                privacyPolicy: "Datenschutzrichtlinie", 
                cookiePolicy: "Cookie-Richtlinie"
            },
            fr: {
                title: "🍪 Gestion des Cookies",
                message: "Nous utilisons des cookies pour améliorer votre expérience et pour des fonctions essentielles comme les paiements. Vous pouvez choisir lesquels accepter.",
                essential: "Cookies Essentiels", 
                essentialDesc: "Requis pour le fonctionnement du site et les paiements (PayPal, Stripe)",
                preferences: "Cookies de Préférences",
                preferencesDesc: "Sauvegardent vos choix (langue, données formulaire)",
                analytics: "Cookies Analytiques",
                analyticsDesc: "Nous aident à améliorer le site web (Google Analytics)",
                marketing: "Cookies Marketing",
                marketingDesc: "Pour les campagnes publicitaires et le remarketing",
                acceptAll: "Accepter Tous", 
                rejectAll: "Rejeter Non-Essentiels",
                customize: "Personnaliser", 
                save: "Sauvegarder Préférences",
                privacyPolicy: "Politique de Confidentialité",
                cookiePolicy: "Politique des Cookies"
            }
        };
        return texts[this.currentLang] || texts.it;
    }

    // Inizializzazione
    init() {
        this.checkExistingConsent();
        if (!this.cookieConsent) {
            this.showBanner();
        }
    }

    // Verifica consenso esistente
    checkExistingConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            this.cookieConsent = JSON.parse(consent);
            this.applyCookieSettings();
        }
    }

    // Mostra banner
    showBanner() {
        const banner = this.createBanner();
        document.body.appendChild(banner);
    }

    // Crea HTML del banner
    createBanner() {
        const texts = this.getTexts();
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>${texts.title}</h3>
                <p>${texts.message}</p>
                <div class="cookie-buttons">
                    <button id="accept-all" class="btn-primary">${texts.acceptAll}</button>
                    <button id="reject-all" class="btn-secondary">${texts.rejectAll}</button>
                    <button id="customize" class="btn-outline">${texts.customize}</button>
                </div>
                <div class="cookie-links">
                    <a href="privacy${this.currentLang === 'it' ? '' : '-' + this.currentLang}.html">${texts.privacyPolicy}</a>
                    <a href="cookie-policy${this.currentLang === 'it' ? '' : '-' + this.currentLang}.html">${texts.cookiePolicy}</a>
                </div>
            </div>
            <div id="cookie-customize" class="cookie-customize" style="display:none;">
                <div class="cookie-category">
                    <label class="cookie-switch">
                        <input type="checkbox" id="essential" checked disabled>
                        <span class="slider"></span>
                        <div class="cookie-info">
                            <strong>${texts.essential}</strong>
                            <p>${texts.essentialDesc}</p>
                        </div>
                    </label>
                </div>
                <div class="cookie-category">
                    <label class="cookie-switch">
                        <input type="checkbox" id="preferences">
                        <span class="slider"></span>
                        <div class="cookie-info">
                            <strong>${texts.preferences}</strong>
                            <p>${texts.preferencesDesc}</p>
                        </div>
                    </label>
                </div>
                <div class="cookie-category">
                    <label class="cookie-switch">
                        <input type="checkbox" id="analytics">
                        <span class="slider"></span>
                        <div class="cookie-info">
                            <strong>${texts.analytics}</strong>
                            <p>${texts.analyticsDesc}</p>
                        </div>
                    </label>
                </div>
                <div class="cookie-category">
                    <label class="cookie-switch">
                        <input type="checkbox" id="marketing">
                        <span class="slider"></span>
                        <div class="cookie-info">
                            <strong>${texts.marketing}</strong>
                            <p>${texts.marketingDesc}</p>
                        </div>
                    </label>
                </div>
                <button id="save-preferences" class="btn-primary">${texts.save}</button>
            </div>
        `;

        this.attachEventListeners(banner);
        return banner;
    }

    // Event listeners
    attachEventListeners(banner) {
        banner.querySelector('#accept-all').onclick = () => this.acceptAll();
        banner.querySelector('#reject-all').onclick = () => this.rejectAll();
        banner.querySelector('#customize').onclick = () => this.showCustomize();
        banner.querySelector('#save-preferences').onclick = () => this.savePreferences();
    }

    // Accetta tutti i cookies
    acceptAll() {
        this.cookieConsent = {
            essential: true,
            preferences: true, 
            analytics: true,
            marketing: true,
            timestamp: Date.now()
        };
        this.saveConsent();
    }

    // Rifiuta cookies non essenziali
    rejectAll() {
        this.cookieConsent = {
            essential: true,
            preferences: false,
            analytics: false, 
            marketing: false,
            timestamp: Date.now()
        };
        this.saveConsent();
    }

    // Mostra opzioni personalizzazione
    showCustomize() {
        const customizePanel = document.getElementById('cookie-customize');
        customizePanel.style.display = customizePanel.style.display === 'none' ? 'block' : 'none';
    }

    // Salva preferenze personalizzate
    savePreferences() {
        this.cookieConsent = {
            essential: true, // Sempre true
            preferences: document.getElementById('preferences').checked,
            analytics: document.getElementById('analytics').checked,
            marketing: document.getElementById('marketing').checked,
            timestamp: Date.now()
        };
        this.saveConsent();
    }

    // Salva consenso e applica settings
    saveConsent() {
        localStorage.setItem('cookieConsent', JSON.stringify(this.cookieConsent));
        this.applyCookieSettings();
        this.hideBanner();
    }

    // Applica impostazioni cookies
    applyCookieSettings() {
        // Cookies essenziali (sempre attivi)
        // PayPal e Stripe si attivano automaticamente

        // Cookies preferenze
        if (this.cookieConsent.preferences) {
            // Salva lingua attuale se non già salvata
            if (!localStorage.getItem('preferredLanguage')) {
                localStorage.setItem('preferredLanguage', this.currentLang);
            }
        }

       // Analytics (GDPR: carica solo dopo consenso)
if (this.cookieConsent.analytics) {
    this.loadGoogleAnalytics();
    console.log('Analytics cookies accepted');
}

        // Marketing (da implementare quando serve) 
        if (this.cookieConsent.marketing) {
            // this.loadFacebookPixel();
            // this.loadGoogleAds();
            console.log('Marketing cookies accepted');
        }
    }

    loadGoogleAnalytics() {
    if (window.gaLoaded) return; // Evita doppio caricamento
    window.gaLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // <-- inserisci qui il tuo ID
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true }); // <-- inserisci qui il tuo ID
}
    // Nascondi banner
    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // Revoca consenso (per link nel footer)
    revokeConsent() {
        localStorage.removeItem('cookieConsent');
        this.cookieConsent = null;
        this.showBanner();
    }

    // Ottieni stato attuale consenso
    getConsent(category = null) {
        if (!this.cookieConsent) return false;
        return category ? this.cookieConsent[category] : this.cookieConsent;
    }
}

// Inizializza quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    window.cookieManager = new CookieManager();
});

// Funzione globale per revocare consenso
window.revokeCookieConsent = () => {
    if (window.cookieManager) {
        window.cookieManager.revokeConsent();
    }
};
