/**
 * scripts.final.js
 * Codice JavaScript completo per il quiz di valutazione della dipendenza digitale.
 * Contiene configurazione, dati del quiz, traduzioni e logica funzionale.
 */

// =========================================================================
// 1. CONFIGURAZIONE E DATI STATICI
// =========================================================================

const CONFIG = {
    MAX_SCORE: 60, // 20 domande * 3 punti
    STANDARD_PRICE: 1.99,
    PREMIUM_PRICE: 7.99,
    I18N_LOCALE: 'it', // Lingua di default
};

const AVAILABLE_LANGUAGES = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

/**
 * Struttura di tutte le 20 domande del quiz.
 * Ogni domanda ha un 'axis' (asse di rischio) per la valutazione dettagliata.
 */
const QUIZ_QUESTIONS = [
    // Asse: Sonno e Rituali (4 domande)
    { id: 1, question: "Controlli il telefono come prima cosa al mattino e/o come ultima cosa prima di dormire?", axis: 'Sleep & Rituals' },
    { id: 2, question: "Il tuo sonno è disturbato perché usi dispositivi elettronici a letto o poco prima di coricarti?", axis: 'Sleep & Rituals' },
    { id: 3, question: "Ti svegli di notte per controllare le notifiche o i messaggi?", axis: 'Sleep & Rituals' },
    { id: 4, question: "Hai difficoltà a stabilire momenti 'senza telefono' (ad esempio, durante i pasti o conversazioni)?", axis: 'Sleep & Rituals' },

    // Asse: Produttività e Focus (4 domande)
    { id: 5, question: "Le notifiche del telefono ti distraggono frequentemente da compiti o studi importanti?", axis: 'Productivity & Focus' },
    { id: 6, question: "Ti ritrovi a scorrere i social media o a navigare su internet senza un obiettivo specifico, perdendo tempo?", axis: 'Productivity & Focus' },
    { id: 7, question: "Posticipi impegni o attività offline (come la pulizia, l'esercizio fisico) a causa del tempo speso online?", axis: 'Productivity & Focus' },
    { id: 8, question: "Hai difficoltà a mantenere la concentrazione su una singola attività per periodi prolungati (più di 30 minuti)?", axis: 'Productivity & Focus' },

    // Asse: Fuga ed Emozioni (4 domande)
    { id: 9, question: "Usare il tuo dispositivo è il tuo meccanismo principale per gestire noia, stress o sentimenti negativi?", axis: 'Escape & Emotions' },
    { id: 10, question: "Ti senti ansioso o irritabile se non puoi accedere al tuo telefono/internet per un periodo di tempo (ad esempio, batteria scarica o assenza di Wi-Fi)?", axis: 'Escape & Emotions' },
    { id: 11, question: "Hai provato a ridurre il tempo trascorso online, ma non ci sei riuscito?", axis: 'Escape & Emotions' },
    { id: 12, question: "Nascondi ad altri il tempo reale che spendi sui dispositivi o su specifiche app?", axis: 'Escape & Emotions' },

    // Asse: Abitudine e Compulsione (4 domande)
    { id: 13, question: "Provi un bisogno fisico (come formicolio o irrequietezza) quando non puoi controllare il telefono?", axis: 'Habit & Compulsion' },
    { id: 14, question: "Controlli continuamente il telefono anche quando non ci sono notifiche attive o in arrivo?", axis: 'Habit & Compulsion' },
    { id: 15, question: "Senti la FOMO (Fear of Missing Out) o l'obbligo di rispondere immediatamente a ogni notifica o messaggio?", axis: 'Habit & Compulsion' },
    { id: 16, question: "Quando guardi un film o partecipi a una riunione, il tuo telefono è sempre a portata di mano e lo controlli regolarmente?", axis: 'Habit & Compulsion' },

    // Asse: Sociale e Presenza (4 domande)
    { id: 17, question: "Ti senti più a tuo agio a comunicare messaggi importanti o sentimenti attraverso la messaggistica piuttosto che di persona?", axis: 'Social & Presence' },
    { id: 18, question: "Le tue interazioni virtuali (social media, giochi) hanno sostituito o ridotto significativamente il tempo trascorso con amici e familiari offline?", axis: 'Social & Presence' },
    { id: 19, question: "Ti preoccupi costantemente del tuo aspetto online (profilo, post, 'mi piace' ricevuti)?", axis: 'Social & Presence' },
    { id: 20, question: "Usi il telefono durante la guida o mentre cammini, mettendo a rischio la tua sicurezza o quella degli altri?", axis: 'Social & Presence' },
];

/**
 * Profili di Rischio (soglie di punteggio e descrizione tradotte).
 */
const RISK_PROFILES_I18N = {
    LOW: {
        minScore: 0,
        maxScore: 18,
        cssClass: 'risk-low',
        it: {
            level: "Basso Rischio (Uso Consapevole)",
            profileText: "Hai un buon controllo sull'uso dei dispositivi. La tecnologia è uno strumento utile per te, non una distrazione o un meccanismo di fuga. Mantenere questa consapevolezza ti proteggerà dai rischi della dipendenza digitale.",
            analysisText: "Consigliamo di mantenere i tuoi attuali limiti, monitorando in particolare l'asse 'Sonno e Rituali'. Continua a dare priorità alle interazioni reali e alle attività offline.",
        },
        en: {
            level: "Low Risk (Conscious Use)",
            profileText: "You have good control over your device usage. Technology is a useful tool for you, not a distraction or an escape mechanism. Maintaining this awareness will protect you from the risks of digital dependence.",
            analysisText: "We recommend maintaining your current limits, particularly monitoring the 'Sleep and Rituals' axis. Continue prioritizing real interactions and offline activities.",
        },
    },
    MEDIUM: {
        minScore: 19,
        maxScore: 36,
        cssClass: 'risk-medium',
        it: {
            level: "Rischio Moderato (Uso Problematico)",
            profileText: "Sei a un livello di dipendenza digitale moderato. L'uso dei dispositivi sta iniziando a intaccare la tua produttività e il tuo benessere. Potresti sentire ansia o irritazione quando sei disconnesso. Questo è il momento ideale per intervenire con azioni mirate.",
            analysisText: "È essenziale identificare l'asse di rischio prioritario. Inizia stabilendo limiti chiari e disattivando le notifiche non essenziali per recuperare il controllo sul tuo focus e ridurre lo stress.",
        },
        en: {
            level: "Moderate Risk (Problematic Use)",
            profileText: "You are at a moderate level of digital dependence. Device use is starting to affect your productivity and well-being. You may feel anxiety or irritation when disconnected. This is the ideal time to intervene with targeted actions.",
            analysisText: "It is essential to identify your priority risk axis. Start by setting clear limits and disabling non-essential notifications to regain control over your focus and reduce stress.",
        },
    },
    HIGH: {
        minScore: 37,
        maxScore: 60,
        cssClass: 'risk-high',
        it: {
            level: "Alto Rischio (Dipendenza Significativa)",
            profileText: "Il tuo punteggio indica una dipendenza digitale significativa. L'uso dei dispositivi compromette seriamente la tua qualità del sonno, le relazioni sociali e la produttività. Potresti provare un forte senso di compulsione o ansia. È fondamentale adottare un piano d'azione immediato.",
            analysisText: "Consigliamo vivamente un 'Digital Detox' strutturato. Inizia fissando obiettivi minimi (es. 'zero telefono' a letto) e cerca supporto se le difficoltà persistono. L'obiettivo è riprendere il controllo totale sul tuo tempo.",
        },
        en: {
            level: "High Risk (Significant Dependence)",
            profileText: "Your score indicates a significant digital dependence. Device use seriously compromises your sleep quality, social relationships, and productivity. You may experience a strong sense of compulsion or anxiety. It is crucial to adopt an immediate action plan.",
            analysisText: "We strongly recommend a structured 'Digital Detox'. Start by setting minimum goals (e.g., 'zero phone' in bed) and seek support if difficulties persist. The goal is to regain total control over your time.",
        },
    },
};

/**
 * Piani di azione prioritari per l'Report Premium (asse con il punteggio più alto).
 */
const AXIS_PLANS_I18N = {
    'Sleep & Rituals': {
        cssClass: 'axis-sleep',
        it: {
            priorityTitle: "Priorità: Recuperare il Sonno e i Rituali",
            priorityDetail: "Il tuo problema maggiore è l'interferenza della tecnologia con il riposo. Devi ristabilire confini netti tra l'uso del dispositivo e la tua vita notturna.",
            dayPlan: [
                "Giorno 1: Stabilisci una 'zona di ricarica' fuori dalla camera da letto.",
                "Giorno 2: Disattiva tutte le notifiche (eccetto le chiamate) dalle 21:00 in poi.",
                "Giorno 3: Sostituisci lo scorrimento pre-sonno con la lettura di un libro cartaceo.",
                "Giorno 4: Esegui 10 minuti di meditazione o stretching leggero prima di dormire.",
                "Giorno 5: Limita la visione di schermi a luce blu (laptop/tablet) dopo cena.",
                "Giorno 6: Usa una sveglia tradizionale per evitare di usare il telefono come sveglia.",
                "Giorno 7: Rifletti sul miglioramento della qualità del sonno senza dispositivi.",
            ],
        },
    },
    'Productivity & Focus': {
        cssClass: 'axis-productivity',
        it: {
            priorityTitle: "Priorità: Migliorare la Produttività e il Focus",
            priorityDetail: "La tecnologia sta erodendo la tua capacità di concentrazione. Le interruzioni costanti ti impediscono di portare a termine i compiti e mantengono il tuo cervello in uno stato di allerta permanente.",
            dayPlan: [
                "Giorno 1: Disattiva le notifiche di tutte le app non lavorative/essenziali.",
                "Giorno 2: Utilizza la tecnica del Pomodoro (25 minuti di lavoro, 5 minuti di pausa).",
                "Giorno 3: Delega o automatizza una piccola attività digitale non essenziale.",
                "Giorno 4: Crea una lista di 'attività distrazione' e concediti solo 10 minuti per svolgerle.",
                "Giorno 5: Usa app di blocco per i siti che ti distraggono durante le ore di lavoro.",
                "Giorno 6: Fai una passeggiata breve (5 minuti) per staccare la mente dagli schermi.",
                "Giorno 7: Rivedi i risultati: quanto hai guadagnato in tempo e concentrazione?",
            ],
        },
    },
    'Escape & Emotions': {
        cssClass: 'axis-escape',
        it: {
            priorityTitle: "Priorità: Gestire la Fuga Emotiva",
            priorityDetail: "I tuoi dispositivi sono usati come una 'coperta di Linus' per evitare noia, ansia o stress. Questo non risolve i problemi, ma crea un circolo vizioso di dipendenza.",
            dayPlan: [
                "Giorno 1: Identifica 3 momenti in cui usi il telefono per noia (es. in coda, in ascensore).",
                "Giorno 2: Sostituisci il telefono in quei momenti con un'alternativa offline (es. un taccuino, una gomma da masticare).",
                "Giorno 3: Quando provi ansia, aspetta 5 minuti prima di prendere il telefono. Respirazione profonda.",
                "Giorno 4: Scrivi un elenco di 5 attività offline che ti danno gioia o ti rilassano.",
                "Giorno 5: Definisci una 'finestra emotiva' (30 minuti) per elaborare sentimenti, senza schermi.",
                "Giorno 6: Parlane con un amico o un familiare di persona invece di scrivere.",
                "Giorno 7: Rileggi i momenti di tentazione e valuta i tuoi progressi emotivi.",
            ],
        },
    },
    'Habit & Compulsion': {
        cssClass: 'axis-habit',
        it: {
            priorityTitle: "Priorità: Rompere il Ciclo Compulsivo",
            priorityDetail: "L'impulso a controllare il telefono è diventato un riflesso automatico, una compulsione. Devi reindirizzare queste abitudini neuronali attraverso la consapevolezza e l'attrito.",
            dayPlan: [
                "Giorno 1: Sposta le app più usate (social, email) in cartelle nascoste.",
                "Giorno 2: Metti il telefono in modalità scala di grigi (bianco e nero) per ridurne l'attrattiva visiva.",
                "Giorno 3: Lascia il telefono in una stanza diversa dalla tua per 1 ora.",
                "Giorno 4: Elimina le app che non hai usato negli ultimi 30 giorni.",
                "Giorno 5: Rimuovi l'icona del browser dalla schermata principale.",
                "Giorno 6: Ogni volta che controlli il telefono, annota mentalmente (o su carta) il motivo.",
                "Giorno 7: Riduci il numero di controlli del telefono a meno di 5 volte all'ora.",
            ],
        },
    },
    'Social & Presence': {
        cssClass: 'axis-social',
        it: {
            priorityTitle: "Priorità: Migliorare la Presenza Sociale",
            priorityDetail: "L'interazione virtuale sta sostituendo le relazioni reali, portando a isolamento e preoccupazione per l'immagine online. È tempo di tornare alla 'presenza' fisica e mentale.",
            dayPlan: [
                "Giorno 1: Durante un pasto o un incontro, metti il telefono in silenzioso e capovolto.",
                "Giorno 2: Invia un messaggio vocale o fai una chiamata anziché scrivere un lungo testo.",
                "Giorno 3: Dedica 30 minuti a una conversazione faccia a faccia senza interruzioni digitali.",
                "Giorno 4: Lascia il telefono a casa mentre fai una commissione breve (es. comprare il pane).",
                "Giorno 5: Limita la visualizzazione del tuo feed social a una sola volta al giorno.",
                "Giorno 6: Fai un'attività sociale offline (sport, hobby, caffè) che ti costringa a interagire.",
                "Giorno 7: Valuta come ti senti dopo aver passato più tempo con persone reali rispetto ai contenuti online.",
            ],
        },
    },
};

/**
 * Risorse Consigliate per l'Report Premium.
 */
const RESOURCES_I18N = {
    it: "Risorse aggiuntive: Consigliamo la lettura di 'Digital Minimalism' di Cal Newport o 'Irresistibile' di Adam Alter. Se la compulsione è forte, valuta di contattare un terapeuta specializzato in dipendenze comportamentali.",
    en: "Additional resources: We recommend reading 'Digital Minimalism' by Cal Newport or 'Irresistible' by Adam Alter. If the compulsion is strong, consider contacting a therapist specializing in behavioral addictions.",
    es: "Recursos adicionales: Recomendamos la lectura de 'Minimalismo Digital' de Cal Newport o 'Irresistible' de Adam Alter. Si la compulsión es fuerte, considera contactar a un terapeuta especializado en adicciones conductuales.",
    de: "Zusätzliche Ressourcen: Wir empfehlen die Lektüre von 'Digital Minimalism' von Cal Newport oder 'Irresistible' von Adam Alter. Wenn die Zwanghaftigkeit stark ist, sollten Sie einen auf Verhaltenssüchte spezialisierten Therapeuten kontaktieren.",
    fr: "Ressources supplémentaires: Nous recommandons la lecture de 'Digital Minimalism' de Cal Newport ou 'Irresistible' d'Adam Alter. Si la compulsion est forte, envisagez de contacter un thérapeute spécialisé dans les dépendances comportementales.",
};

// =========================================================================
// 2. TRADUZIONI (I18N)
// =========================================================================

const TRANSLATIONS = {
    it: {
        FORM_TITLE: "Valutazione della Dipendenza Digitale",
        BTN_CALCULATE: "Calcola Risultato",
        ALERT_COMPLETE_QUIZ: "Per favore, rispondi a tutte le 20 domande prima di calcolare il risultato.",
        DEFAULT_USERNAME: "Utente",
        PAYWALL_H3: "Il Tuo Risultato è Pronto!",
        PAYWALL_P: "Per sbloccare il tuo report dettagliato, scegli l'opzione di acquisto qui sotto:",
        BTN_STANDARD: `Scarica Report Base (€${CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM: `Acquista Report Premium (€${CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM_SUB: "(Include: Piano d'Azione, Priorità e Piano di 7 Giorni)",
        TITLE: "Report Personalizzato Digital Detox",
        SUBTITLE: "Elaborazione Finale (20 Domande)",
        SCORE_LABEL: "Punteggio",
        RISK_LABEL: "Rischio",
        PROFILE_TITLE: "Il Tuo Profilo di Dipendenza Digitale",
        ANALYSIS_TITLE: "Analisi e Consigli Personalizzati",
        RADAR_TITLE: "Analisi Dettagliata per Asse di Rischio",
        IMPACT_TITLE: "Riepilogo Dettagliato dei Punteggi di Impatto",
        PRIORITY_PLAN_TITLE: "Il Tuo Piano d'Azione Prioritizzato",
        DAYS_PLAN_TITLE: "Piano Digital Detox di 7 Giorni",
        RESOURCES_TITLE: "Risorse Consigliate",
        QUIZ_Q_COL: "Domanda",
        QUIZ_A_COL: "Risposta Fornita",
        QUIZ_S_COL: "Punteggio",
        DISCLAIMER: "Disclaimer: Questo report è solo a scopo informativo e non sostituisce una consulenza professionale.",
        SITE_TITLE: "Dipendenza Digitale",
        NAV_QUIZ: "Questionario",
        NAV_SCOPRI: "Scopri di Più",
        SECTION1_TITLE: "Cos'è la dipendenza digitale?",
        SECTION1_P: "La dipendenza digitale è l'uso eccessivo e incontrollato di smartphone, social network, videogiochi e internet che compromette la vita quotidiana e il benessere psicofisico.",
        SECTION2_TITLE: "⚠️ Rischi Principali",
        RISK1: "Riduzione della concentrazione: difficoltà a mantenere l'attenzione per periodi prolungati.",
        RISK2: "Problemi di sonno: l'uso serale dei dispositivi altera i ritmi circadiani.",
        RISK3: "Stress e ansia: le notifiche continue e l'iperconnessione aumentano la pressione mentale.",
        RISK4: "Isolamento sociale: l'interazione virtuale sostituisce quella reale.",
        SECTION3_TITLE: "💡 Consigli Pratici",
        TIP1: "Imposta limiti giornalieri per le app più utilizzate.",
        TIP2: "Disattiva le notifiche non essenziali.",
        TIP3: "Stabilisci momenti 'phone-free' (ai pasti, prima di dormire).",
        TIP4: "Dedica tempo ad attività offline come sport, lettura o meditazione.",
        CTA_TITLE: "Vuoi scoprire il tuo livello di rischio?",
        CTA_BUTTON: "Fai il test ora",

        // Chiavi per I18N_KEYS_TO_TRANSLATE
        ANSWER_0: 'Raramente',
        ANSWER_1: 'A volte',
        ANSWER_2: 'Spesso',
        ANSWER_3: 'Sempre',
        AXIS_Sleep_Rituals: 'Sonno e Rituali',
        AXIS_Productivity_Focus: 'Produttività e Focus',
        AXIS_Escape_Emotions: 'Fuga ed Emozioni',
        AXIS_Habit_Compulsion: 'Abitudine e Compulsione',
        AXIS_Social_Presence: 'Sociale e Presenza',
        
        // Domande del quiz (Q1-Q20) (Viene usato il testo IT come fallback)
        Q1: QUIZ_QUESTIONS[0].question, Q2: QUIZ_QUESTIONS[1].question, Q3: QUIZ_QUESTIONS[2].question, Q4: QUIZ_QUESTIONS[3].question,
        Q5: QUIZ_QUESTIONS[4].question, Q6: QUIZ_QUESTIONS[5].question, Q7: QUIZ_QUESTIONS[6].question, Q8: QUIZ_QUESTIONS[7].question,
        Q9: QUIZ_QUESTIONS[8].question, Q10: QUIZ_QUESTIONS[9].question, Q11: QUIZ_QUESTIONS[10].question, Q12: QUIZ_QUESTIONS[11].question,
        Q13: QUIZ_QUESTIONS[12].question, Q14: QUIZ_QUESTIONS[13].question, Q15: QUIZ_QUESTIONS[14].question, Q16: QUIZ_QUESTIONS[15].question,
        Q17: QUIZ_QUESTIONS[16].question, Q18: QUIZ_QUESTIONS[17].question, Q19: QUIZ_QUESTIONS[18].question, Q20: QUIZ_QUESTIONS[19].question,
    },
    en: {
        FORM_TITLE: "Digital Dependence Assessment",
        BTN_CALCULATE: "Calculate Result",
        ALERT_COMPLETE_QUIZ: "Please answer all 20 questions before calculating the result.",
        DEFAULT_USERNAME: "User",
        PAYWALL_H3: "Your Result is Ready!",
        PAYWALL_P: "To unlock your detailed report, choose the purchase option below:",
        BTN_STANDARD: `Download Basic Report (€${CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM: `Purchase Premium Report (€${CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM_SUB: "(Includes: Action Plan, Priority, and 7-Day Plan)",
        TITLE: "Personalized Digital Detox Report",
        SUBTITLE: "Final Processing (20 Questions)",
        SCORE_LABEL: "Score",
        RISK_LABEL: "Risk",
        PROFILE_TITLE: "Your Digital Dependence Profile",
        ANALYSIS_TITLE: "Analysis and Personalized Advice",
        RADAR_TITLE: "Detailed Analysis by Risk Axis",
        IMPACT_TITLE: "Detailed Summary of Impact Scores",
        PRIORITY_PLAN_TITLE: "Your Prioritized Action Plan",
        DAYS_PLAN_TITLE: "7-Day Digital Detox Plan",
        RESOURCES_TITLE: "Recommended Resources",
        QUIZ_Q_COL: "Question",
        QUIZ_A_COL: "Answer Provided",
        QUIZ_S_COL: "Score",
        DISCLAIMER: "Disclaimer: This report is for informational purposes only and is not a substitute for professional consultation.",
        SITE_TITLE: "Digital Dependence",
        NAV_QUIZ: "Quiz",
        NAV_SCOPRI: "Discover More",
        SECTION1_TITLE: "What is digital dependence?",
        SECTION1_P: "Digital dependence is the excessive and uncontrolled use of smartphones, social media, video games, and the internet that compromises daily life and psycho-physical well-being.",
        SECTION2_TITLE: "⚠️ Main Risks",
        RISK1: "Reduced concentration: difficulty maintaining attention for prolonged periods.",
        RISK2: "Sleep problems: evening device use disrupts circadian rhythms.",
        RISK3: "Stress and anxiety: continuous notifications and hyper-connection increase mental pressure.",
        RISK4: "Social isolation: virtual interaction replaces real interaction.",
        SECTION3_TITLE: "💡 Practical Tips",
        TIP1: "Set daily limits for the most used apps.",
        TIP2: "Deactivate non-essential notifications.",
        TIP3: "Establish 'phone-free' moments (during meals, before sleeping).",
        TIP4: "Dedicate time to offline activities like sports, reading, or meditation.",
        CTA_TITLE: "Do you want to discover your risk level?",
        CTA_BUTTON: "Take the test now",
    },
    es: {
        FORM_TITLE: "Evaluación de la Dependencia Digital",
        BTN_CALCULATE: "Calcular Resultado",
        ALERT_COMPLETE_QUIZ: "Por favor, responde a las 20 preguntas antes de calcular el resultado.",
        DEFAULT_USERNAME: "Usuario",
        PAYWALL_H3: "¡Tu Resultado Está Listo!",
        PAYWALL_P: "Para desbloquear tu informe detallado, elige la opción de compra a continuación:",
        BTN_STANDARD: `Descargar Informe Básico (€${CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM: `Comprar Informe Premium (€${CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM_SUB: "(Incluye: Plan de Acción, Prioridad y Plan de 7 Días)",
        TITLE: "Informe Personalizado Digital Detox",
        SUBTITLE: "Procesamiento Final (20 Preguntas)",
        SCORE_LABEL: "Puntuación",
        RISK_LABEL: "Riesgo",
        PROFILE_TITLE: "Tu Perfil de Dependencia Digital",
        ANALYSIS_TITLE: "Análisis y Consejos Personalizados",
        RADAR_TITLE: "Análisis Detallado por Eje de Riesgo",
        IMPACT_TITLE: "Resumen Detallado de las Puntuaciones de Impacto",
        PRIORITY_PLAN_TITLE: "Tu Plan de Acción Priorizado",
        DAYS_PLAN_TITLE: "Plan Digital Detox de 7 Días",
        RESOURCES_TITLE: "Recursos Recomendados",
        QUIZ_Q_COL: "Pregunta",
        QUIZ_A_COL: "Respuesta Proporcionada",
        QUIZ_S_COL: "Puntuación",
        DISCLAIMER: "Descargo de Responsabilidad: Este informe es solo para fines informativos y no sustituye una consulta profesional.",
        SITE_TITLE: "Dependencia Digital",
        NAV_QUIZ: "Cuestionario",
        NAV_SCOPRI: "Saber Más",
        SECTION1_TITLE: "¿Qué es la dependencia digital?",
        SECTION1_P: "La dependencia digital es el uso excesivo e incontrolado de smartphones, redes sociales, videojuegos e internet que compromete la vida diaria y el bienestar psicofísico.",
        SECTION2_TITLE: "⚠️ Riesgos principales",
        RISK1: "Reducción de la concentración: dificultad para mantener la atención durante períodos prolongados.",
        RISK2: "Problemas de sueño: el uso nocturno de dispositivos altera los ritmos circadianos.",
        RISK3: "Estrés y ansiedad: las notificaciones continuas y la hiperconexión aumentan la presión mental.",
        RISK4: "Aislamiento social: la interacción virtual sustituye a la interacción real.",
        SECTION3_TITLE: "💡 Consejos prácticos",
        TIP1: "Establece límites diarios para las aplicaciones más utilizadas.",
        TIP2: "Desactiva las notificaciones no esenciales.",
        TIP3: "Establece momentos 'sin teléfono' (durante las comidas, antes de dormir).",
        TIP4: "Dedica tiempo a actividades fuera de línea como deportes, lectura o meditación.",
        CTA_TITLE: "¿Quieres descubrir tu nivel de riesgo?",
        CTA_BUTTON: "Haz el test ahora",
    },
    de: {
        FORM_TITLE: "Bewertung der Digitalen Abhängigkeit",
        BTN_CALCULATE: "Ergebnis Berechnen",
        ALERT_COMPLETE_QUIZ: "Bitte beantworten Sie alle 20 Fragen, bevor Sie das Ergebnis berechnen.",
        DEFAULT_USERNAME: "Benutzer",
        PAYWALL_H3: "Ihr Ergebnis ist Fertig!",
        PAYWALL_P: "Um Ihren detaillierten Bericht freizuschalten, wählen Sie unten die Kaufoption:",
        BTN_STANDARD: `Basisbericht Herunterladen (€${CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM: `Premium-Bericht Kaufen (€${CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM_SUB: "(Inklusive: Aktionsplan, Priorität und 7-Tage-Plan)",
        TITLE: "Personalisierter Digital Detox Bericht",
        SUBTITLE: "Endgültige Verarbeitung (20 Fragen)",
        SCORE_LABEL: "Punktzahl",
        RISK_LABEL: "Risiko",
        PROFILE_TITLE: "Ihr Digitales Abhängigkeitsprofil",
        ANALYSIS_TITLE: "Analyse und Personalisierte Ratschläge",
        RADAR_TITLE: "Analyse Detailliert nach Risikobereich",
        IMPACT_TITLE: "Detaillierte Zusammenfassung der Auswirkungs-Punktzahlen",
        PRIORITY_PLAN_TITLE: "Ihr Priorisierter Aktionsplan",
        DAYS_PLAN_TITLE: "7-Tage Digital Detox Plan",
        RESOURCES_TITLE: "Empfohlene Ressourcen",
        QUIZ_Q_COL: "Frage",
        QUIZ_A_COL: "Gegebene Antwort",
        QUIZ_S_COL: "Punktzahl",
        DISCLAIMER: "Haftungsausschluss: Dieser Bericht dient nur zu Informationszwecken und ersetzt keine professionelle Beratung.",
        SITE_TITLE: "Digitale Abhängigkeit",
        NAV_QUIZ: "Quiz",
        NAV_SCOPRI: "Mehr Erfahren",
        SECTION1_TITLE: "Was ist digitale Abhängigkeit?",
        SECTION1_P: "Digitale Abhängigkeit ist die übermäßige und unkontrollierte Nutzung von Smartphones, sozialen Medien, Videospielen und dem Internet, die das tägliche Leben und das psychophysische Wohlbefinden beeinträchtigt.",
        SECTION2_TITLE: "⚠️ Hauptrisiken",
        RISK1: "Reduzierte Konzentration: Schwierigkeiten, die Aufmerksamkeit über längere Zeiträume aufrechtzuerhalten.",
        RISK2: "Schlafprobleme: Die abendliche Nutzung von Geräten stört den zirkadianen Rhythmus.",
        RISK3: "Stress und Angst: Kontinuierliche Benachrichtigungen und Hyperkonnektivität erhöhen den mentalen Druck.",
        RISK4: "Soziale Isolation: Virtuelle Interaktion ersetzt reale Interazione.",
        SECTION3_TITLE: "💡 Praktische Tipps",
        TIP1: "Legen Sie tägliche Limits für die am häufigsten verwendeten Apps fest.",
        TIP2: "Deaktivieren Sie nicht essentielle Benachrichtigungen.",
        TIP3: "Richten Sie 'telefonfreie' Momente ein (während der Mahlzeiten, vor dem Schlafen).",
        TIP4: "Widmen Sie Zeit Offline-Aktivitäten wie Sport, Lesen oder Meditation.",
        CTA_TITLE: "Möchten Sie herausfinden, wie hoch Ihr Risiko ist?",
        CTA_BUTTON: "Machen Sie jetzt den Test",
    },
    fr: {
        FORM_TITLE: "Évaluation de la Dépendance Numérique",
        BTN_CALCULATE: "Calculer le Résultat",
        ALERT_COMPLETE_QUIZ: "Veuillez répondre aux 20 questions avant de calculer le résultat.",
        DEFAULT_USERNAME: "Utilisateur",
        PAYWALL_H3: "Votre Résultat est Prêt !",
        PAYWALL_P: "Pour débloquer votre rapport détaillé, choisissez l'option d'achat ci-dessous :",
        BTN_STANDARD: `Télécharger le Rapport de Base (€${CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM: `Acheter le Rapport Premium (€${CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',')})`,
        BTN_PREMIUM_SUB: "(Comprend : Plan d'Action, Priorité et Plan de 7 Jours)",
        TITLE: "Rapport Personnalisé Digital Detox",
        SUBTITLE: "Traitement Final (20 Questions)",
        SCORE_LABEL: "Score",
        RISK_LABEL: "Risque",
        PROFILE_TITLE: "Votre Profil de Dépendance Numérique",
        ANALYSIS_TITLE: "Analyse et Conseils Personnalisés",
        RADAR_TITLE: "Analyse Détaillée par Axe de Risque",
        IMPACT_TITLE: "Résumé Détaillé des Scores d'Impact",
        PRIORITY_PLAN_TITLE: "Votre Plan d'Action Priorisé",
        DAYS_PLAN_TITLE: "Plan Digital Detox de 7 Jours",
        RESOURCES_TITLE: "Ressources Recommandées",
        QUIZ_Q_COL: "Question",
        QUIZ_A_COL: "Réponse Fournie",
        QUIZ_S_COL: "Score",
        DISCLAIMER: "Avertissement : Ce rapport est uniquement à titre informatif et ne remplace pas une consultation professionnelle.",
        SITE_TITLE: "Dépendance Numérique",
        NAV_QUIZ: "Quiz",
        NAV_SCOPRI: "En Savoir Plus",
        SECTION1_TITLE: "Qu'est-ce que la dépendance numérique ?",
        SECTION1_P: "La dépendance numérique est l'utilisation excessive et incontrôlée des smartphones, des médias sociaux, des jeux vidéo et d'internet qui compromet la vie quotidienne et le bien-être psychophysique.",
        SECTION2_TITLE: "⚠️ Principaux risques",
        RISK1: "Réduction de la concentration : difficulté à maintenir l'attention pendant des périodes prolongées.",
        RISK2: "Problèmes de sommeil : l'utilisation nocturne des appareils perturbe les rythmes circadiens.",
        RISK3: "Stress et anxiété : les notifications continues et l'hyper-connectivité augmentent la pression mentale.",
        RISK4: "Isolement social : l'interaction virtuelle remplace l'interaction réelle.",
        SECTION3_TITLE: "💡 Conseils pratiques",
        TIP1: "Fixez des limites quotidiennes pour les applications les plus utilisées.",
        TIP2: "Désactivez les notifications non essentielles.",
        TIP3: "Établissez des moments 'sans téléphone' (pendant les repas, avant de dormir).",
        TIP4: "Consacrez du temps à des activités hors ligne comme le sport, la lecture ou la méditation.",
        CTA_TITLE: "Voulez-vous découvrir votre niveau de risque ?",
        CTA_BUTTON: "Faites le test maintenant",
    }
};

/**
 * Chiavi che devono esistere in ogni lingua (fallback).
 */
const I18N_KEYS_TO_TRANSLATE = {
    ANSWER_0: 'Raramente',
    ANSWER_1: 'A volte',
    ANSWER_2: 'Spesso',
    ANSWER_3: 'Sempre',
    AXIS_Sleep_Rituals: 'Sonno e Rituali',
    AXIS_Productivity_Focus: 'Produttività e Focus',
    AXIS_Escape_Emotions: 'Fuga ed Emozioni',
    AXIS_Habit_Compulsion: 'Abitudine e Compulsione',
    AXIS_Social_Presence: 'Sociale e Presenza',
    // Le chiavi delle domande (Q1, Q2...) sono aggiunte dinamicamente
};

// =========================================================================
// 3. LOGICA MULTILINGUA (I18N)
// =========================================================================

/**
 * Assicura che ogni lingua abbia tutte le chiavi statiche e dinamiche (domande, risposte).
 */
function ensureAllTranslationsExist() {
    const defaultLang = TRANSLATIONS[CONFIG.I18N_LOCALE];

    // 1. Assicura che le chiavi I18N_KEYS_TO_TRANSLATE siano in ogni lingua
    for (const code in TRANSLATIONS) {
        const currentLang = TRANSLATIONS[code];
        for (const key in I18N_KEYS_TO_TRANSLATE) {
            if (!currentLang[key]) {
                currentLang[key] = defaultLang[key] || I18N_KEYS_TO_TRANSLATE[key];
            }
        }
    }

    // 2. Aggiunge le chiavi delle domande QUIZ_QUESTIONS a tutte le lingue
    QUIZ_QUESTIONS.forEach((q, index) => {
        const key = `Q${index + 1}`;
        for (const code in TRANSLATIONS) {
            if (!TRANSLATIONS[code][key]) {
                // Se la traduzione per la domanda non c'è, usa il testo IT come fallback
                TRANSLATIONS[code][key] = q.question;
            }
        }
    });
}


/**
 * Applica le traduzioni a tutti gli elementi con l'attributo data-i18n.
 * @param {string} locale - Il codice della lingua.
 */
function applyTranslations(locale) {
    const t = TRANSLATIONS[locale] || TRANSLATIONS[CONFIG.I18N_LOCALE];
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.innerHTML = t[key];
        } else if (key.startsWith('AXIS_')) {
             // Gestisce la traduzione degli assi di rischio (es. AXIS_Sleep_Rituals)
            const axisKey = key.replace(/ /g, '_');
            if (t[axisKey]) {
                element.innerHTML = t[axisKey];
            }
        }
    });

    // Aggiorna il valore corrente della lingua salvata
    CONFIG.I18N_LOCALE = locale;

    // FIX CRITICO: Ricarica il quiz per applicare le traduzioni alle domande generate dinamicamente
    populateQuizQuestions();
    
    // FIX: Ricarica anche i bottoni del paywall per aggiornare i prezzi tradotti
    initPaywallButtons();
}

/**
 * Inizializza il selettore di lingua nell'header.
 */
function initLanguageSelector() {
    const selectorContainer = document.getElementById('language-selector');
    if (!selectorContainer) return;

    // Pulisce i listener precedenti
    selectorContainer.innerHTML = '';

    AVAILABLE_LANGUAGES.forEach(lang => {
        const button = document.createElement('button');
        button.className = 'lang-btn';
        if (lang.code === CONFIG.I18N_LOCALE) {
             button.classList.add('active');
        }
        button.innerHTML = lang.flag;
        button.setAttribute('title', lang.name);
        button.onclick = () => {
            applyTranslations(lang.code);
            // Aggiorna la classe 'active'
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        };
        selectorContainer.appendChild(button);
    });
}

// =========================================================================
// 4. LOGICA QUIZ E REPORT
// =========================================================================

/**
 * Popola il contenitore delle domande del quiz.
 */
function populateQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');

    if (!container) {
        return;
    }

    container.innerHTML = ''; 
    const currentLocale = CONFIG.I18N_LOCALE;
    const t = TRANSLATIONS[currentLocale] || TRANSLATIONS[CONFIG.I18N_LOCALE];

    QUIZ_QUESTIONS.forEach((q, index) => {
        const qIndex = index + 1;
        const qKey = `Q${qIndex}`;

        // Utilizza la traduzione specifica o il fallback
        const questionText = t[qKey] || q.question;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = `
            <p class="question-text">${qIndex}. ${questionText}</p>
            <div class="radio-group" data-question-index="${index}">
                <input type="radio" id="q${qIndex}a0" name="q${qIndex}" value="0" required><label for="q${qIndex}a0">${t.ANSWER_0 || 'Raramente'}</label>
                <input type="radio" id="q${qIndex}a1" name="q${qIndex}" value="1"><label for="q${qIndex}a1">${t.ANSWER_1 || 'A volte'}</label>
                <input type="radio" id="q${qIndex}a2" name="q${qIndex}" value="2"><label for="q${qIndex}a2">${t.ANSWER_2 || 'Spesso'}</label>
                <input type="radio" id="q${qIndex}a3" name="q${qIndex}" value="3"><label for="q${qIndex}a3">${t.ANSWER_3 || 'Sempre'}</label>
            </div>
        `;
        container.appendChild(questionDiv);
    });

    const maxScoreElement = document.getElementById('max-score');
    if (maxScoreElement) {
        maxScoreElement.textContent = CONFIG.MAX_SCORE;
    }
}

/**
 * Calcola il livello di rischio in base al punteggio totale.
 * @param {number} totalScore - Il punteggio totale del quiz.
 * @returns {{level: string, profileText: string, analysisText: string, cssClass: string, priorityAxis: string}}
 */
function getRiskLevel(totalScore, axisScores) {
    const locale = CONFIG.I18N_LOCALE;
    let result = null;

    for (const key in RISK_PROFILES_I18N) {
        const profile = RISK_PROFILES_I18N[key];
        if (totalScore >= profile.minScore && totalScore <= profile.maxScore) {
            result = {
                ...profile[locale],
                cssClass: profile.cssClass
            };
            break;
        }
    }

    // Identifica l'asse di rischio con il punteggio più alto
    const axisNames = Object.keys(axisScores);
    const priorityAxis = axisNames.reduce((a, b) => axisScores[a] > axisScores[b] ? a : b);

    if (result) {
        result.priorityAxis = priorityAxis;
    }

    return result;
}

/**
 * Gestisce l'evento di calcolo, raccoglie i dati e visualizza il report o il paywall.
 */
function handleCalculate(event) {
    event.preventDefault(); // Impedisce il ricaricamento della pagina
    const form = document.getElementById('quiz-form');
    const questions = QUIZ_QUESTIONS.length;
    const formData = new FormData(form);

    let totalScore = 0;
    const axisScores = {
        'Sleep & Rituals': 0,
        'Productivity & Focus': 0,
        'Escape & Emotions': 0,
        'Habit & Compulsion': 0,
        'Social & Presence': 0
    };
    let completedQuestions = 0;
    const userAnswers = [];
    const t = TRANSLATIONS[CONFIG.I18N_LOCALE];

    for (let i = 1; i <= questions; i++) {
        const score = formData.get(`q${i}`);
        if (score !== null) {
            const numericScore = parseInt(score, 10);
            totalScore += numericScore;
            completedQuestions++;

            const axis = QUIZ_QUESTIONS[i - 1].axis;
            axisScores[axis] += numericScore;

            userAnswers.push({
                questionKey: `Q${i}`,
                answerScore: numericScore
            });
        }
    }

    if (completedQuestions !== questions) {
        alert(t.ALERT_COMPLETE_QUIZ);
        return;
    }

    const userName = formData.get('userName') || t.DEFAULT_USERNAME;
    const riskData = getRiskLevel(totalScore, axisScores);

    // Salva i risultati per l'accesso post-paywall
    window.quizResults = {
        totalScore,
        userName,
        riskData,
        axisScores,
        userAnswers
    };

    // Nasconde il quiz e mostra il Paywall
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('paywall').style.display = 'block';

    // Aggiorna l'intestazione del paywall con il nome utente e la traduzione
    const paywallH3 = document.getElementById('paywall-h3');
    if (paywallH3) {
        paywallH3.innerHTML = t.PAYWALL_H3.replace('!', `, ${userName}!`);
    }

    // Inizializza i bottoni di acquisto (essenziale per i listener e la traduzione dei prezzi)
    initPaywallButtons();
}

/**
 * Inizializza i listener per i bottoni Standard e Premium e aggiorna il testo tradotto.
 */
function initPaywallButtons() {
    const t = TRANSLATIONS[CONFIG.I18N_LOCALE];
    const standardBtn = document.getElementById('btn-standard');
    const premiumBtn = document.getElementById('btn-premium');
    const premiumSub = document.querySelector('.premium-subtitle');

    if (standardBtn) {
        // Applica traduzione e listener
        standardBtn.innerHTML = t.BTN_STANDARD;
        standardBtn.onclick = () => showReport(window.quizResults, 'standard');
    }
    if (premiumBtn) {
        // Applica traduzione e listener
        premiumBtn.innerHTML = t.BTN_PREMIUM;
        premiumBtn.onclick = () => showReport(window.quizResults, 'premium');
    }
    if (premiumSub) {
        premiumSub.innerHTML = t.BTN_PREMIUM_SUB;
    }
}

/**
 * Visualizza il report completo e popola tutti i dati.
 * @param {object} results - I risultati calcolati.
 * @param {string} planType - 'standard' o 'premium'.
 */
function showReport(results, planType) {
    const { totalScore, userName, riskData, axisScores, userAnswers } = results;
    const t = TRANSLATIONS[CONFIG.I18N_LOCALE];
    const reportElement = document.getElementById('report');

    document.getElementById('paywall').style.display = 'none';
    reportElement.style.display = 'block';

    // 1. Dati Principali
    const reportHeader = reportElement.querySelector('.report-header h1');
    reportHeader.innerHTML = `${t.TITLE} - ${userName}`;

    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('risk-level').textContent = riskData.level;
    document.getElementById('report-date').textContent = `${t.DATE || 'Data'}: ${new Date().toLocaleDateString(CONFIG.I18N_LOCALE)}`;

    // 2. Livello di Rischio e Analisi
    const riskLevelContainer = document.getElementById('risk-level-container');
    riskLevelContainer.className = `score-box ${riskData.cssClass}`;
    document.getElementById('profile-text').textContent = riskData.profileText;
    document.getElementById('analysis-text').textContent = riskData.analysisText;

    // 3. Grafico Radar (Richiede la libreria Chart.js nell'HTML!)
    if (typeof Chart !== 'undefined') {
        renderRadarChart(axisScores, riskData.cssClass);
    } else {
        const radarContainer = document.querySelector('.radar-section h2');
        if (radarContainer) radarContainer.innerHTML = `<h2>⚠️ ${t.RADAR_TITLE} - Chart non disponibile.</h2>`;
    }


    // 4. Riepilogo Dettagliato dei Punteggi (Impact List)
    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = '';
    const sortedAxes = Object.keys(axisScores).sort((a, b) => axisScores[b] - axisScores[a]);

    sortedAxes.forEach(axis => {
        const score = axisScores[axis];
        // 4 domande per asse * 3 punti max = 12
        const maxAxisScore = QUIZ_QUESTIONS.filter(q => q.axis === axis).length * 3;
        const translatedAxis = t[`AXIS_${axis.replace(/ /g, '_')}`] || axis;
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <strong>${translatedAxis}:</strong> ${score}/${maxAxisScore}
            <div class="score-bar"><div style="width: ${(score / maxAxisScore) * 100}%;"></div></div>
        `;
        impactList.appendChild(listItem);
    });

    // 5. Risposte Dettagliate del Quiz (Tabella)
    const answersBody = document.getElementById('quiz-answers-body');
    answersBody.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const questionText = t[`Q${index + 1}`] || QUIZ_QUESTIONS[index].question;
        const translatedAnswer = t[`ANSWER_${answer.answerScore}`];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${questionText}</td>
            <td>${translatedAnswer}</td>
            <td>${answer.answerScore}</td>
        `;
        answersBody.appendChild(row);
    });

    // 6. Contenuti Premium
    const premiumContent = document.querySelector('.premium-content');
    if (premiumContent) {
        if (planType === 'premium') {
            premiumContent.style.display = 'block';

            const priorityAxis = riskData.priorityAxis;
            const priorityPlan = AXIS_PLANS_I18N[priorityAxis];
            const priorityPlanI18n = priorityPlan[CONFIG.I18N_LOCALE] || priorityPlan['it'];

            document.getElementById('priority-action').innerHTML = `
                <h4 class="${priorityPlan.cssClass}">🔥 ${priorityPlanI18n.priorityTitle}</h4>
                <p>${priorityPlanI18n.priorityDetail}</p>
            `;

            const daysPlanList = document.getElementById('days-plan-list');
            daysPlanList.innerHTML = '';
            priorityPlanI18n.dayPlan.forEach(step => {
                const listItem = document.createElement('li');
                listItem.textContent = step;
                daysPlanList.appendChild(listItem);
            });

            document.getElementById('resources-text').textContent = RESOURCES_I18N[CONFIG.I18N_LOCALE] || RESOURCES_I18N['it'];

        } else {
            premiumContent.style.display = 'none';
        }
    }

    const downloadBtn = document.getElementById('download-pdf-btn');
    if(downloadBtn) {
        // Implementazione placeholder, in attesa della vera libreria PDF (es. jsPDF)
        downloadBtn.onclick = () => alert('La funzione di download PDF è un placeholder in questa versione. Contenuto generato!');
    }
}

/**
 * Genera il grafico Radar con i punteggi degli assi.
 */
let riskRadarChart = null; 

function renderRadarChart(axisScores, riskCssClass) {
    const ctx = document.getElementById('riskRadarChart');
    if (!ctx) return;

    if (riskRadarChart) {
        riskRadarChart.destroy();
    }

    const t = TRANSLATIONS[CONFIG.I18N_LOCALE];
    const translatedLabels = Object.keys(axisScores).map(axis => {
        return t[`AXIS_${axis.replace(/ /g, '_')}`] || axis;
    });

    const dataValues = Object.values(axisScores);
    const maxScore = 12; // 4 domande * 3 punti

    let borderColor = '#28a745'; // Colore base Basso Rischio (verde)
    let backgroundColor = 'rgba(40, 167, 69, 0.2)';

    if (riskCssClass.includes('risk-medium')) {
        borderColor = '#ffc107'; // Giallo
        backgroundColor = 'rgba(255, 193, 7, 0.2)';
    } else if (riskCssClass.includes('risk-high')) {
        borderColor = '#dc3545'; // Rosso
        backgroundColor = 'rgba(220, 53, 69, 0.2)';
    }

    riskRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: translatedLabels,
            datasets: [{
                label: t.SCORE_LABEL || 'Punteggio',
                data: dataValues,
                fill: true,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                pointBackgroundColor: borderColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: borderColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: { display: false },
                    suggestedMin: 0,
                    suggestedMax: maxScore,
                    ticks: {
                        stepSize: 3,
                        showLabelBackdrop: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// =========================================================================
// 5. INIZIALIZZAZIONE GLOBALE
// =========================================================================

// Variabile globale per salvare i risultati (se non è già presente)
if (typeof window.quizResults === 'undefined') {
    window.quizResults = {};
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Assicura che TUTTE le chiavi di traduzione siano presenti
    ensureAllTranslationsExist();

    // 2. Inizializzazione della logica di traduzione
    initLanguageSelector();
    // Usa la lingua di default o quella salvata, e applica le traduzioni
    // Questa chiamata avvia anche populateQuizQuestions() e initPaywallButtons()
    applyTranslations(CONFIG.I18N_LOCALE); 

    // 3. Collega il bottone di calcolo al form (l'HTML ora ha type="submit")
    const form = document.getElementById('quiz-form');
    if (form) {
        form.addEventListener('submit', handleCalculate);
    }
    
    // 4. Nasconde le sezioni di report e paywall all'avvio
    const paywall = document.getElementById('paywall');
    const report = document.getElementById('report');

    if (paywall) paywall.style.display = 'none';
    if (report) report.style.display = 'none';
});
