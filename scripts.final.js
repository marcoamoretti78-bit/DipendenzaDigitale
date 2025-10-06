const TEXT_DATA = {
    // =================================================================
    // =================== 🇮🇹 ITALIANO (IT) - DEFAULT ==================
    // =================================================================
    it: {
        // NOMI DELLE CATEGORIE (USATE PER IL CALCOLO E CHART.JS) - DEVE MATCHARE QUESTIONMAP
        AXES: { 
            'Sleep and Rituals': 'Sonno e Rituali', 
            'Escape and Emotions': 'Fuga ed Emozioni', 
            'Attention and Productivity': 'Attenzione e Produttività', 
            'Relationships and Sociality': 'Relazioni e Socialità', 
            'Control and Time': 'Controllo e Tempo' 
        },

        TITLE: "Report Personalizzato Digital Detox",
        SUBTITLE: "Elaborazione Finale (20 Domande)",
        DATE: "Data",
        RESULT_TITLE: "Il Tuo Punteggio",
        SCORE_LABEL: "Punteggio",
        RISK_LABEL: "Rischio",
        RISK_LEVEL_LOW: "Rischio Basso",
        RISK_LEVEL_MEDIUM: "Rischio Medio",
        RISK_LEVEL_HIGH: "Rischio Alto",

        BENCHMARK_TITLE: "Il Tuo Confronto con l'Utente Medio:",
        BENCHMARK_ABOVE: "MEGLIO DELLA MEDIA",
        BENCHMARK_BELOW: "PEGGIO DELLA MEDIA",
        BENCHMARK_HIGH_TEXT: (score, benchmark) => `Il tuo punteggio di ${score} è superiore al punteggio medio di ${benchmark} calcolato sui nostri utenti. Questo indica che le tue abitudini richiedono immediata attenzione.`,
        BENCHMARK_LOW_TEXT: (score, benchmark) => `Il tuo punteggio di ${score} è inferiore al punteggio medio di ${benchmark} calcolato sui nostri utenti. Hai una buona disciplina, ma è essenziale non abbassare la guardia.`,

        PROFILE_TITLE: "Il Tuo Profilo di Dipendenza Digitale",
        PROFILE_LOW: "Sei un **utente consapevole**. La tua tecnologia serve te, non viceversa. Hai già una buona disciplina; concentrati sul mantenere alta la guardia e sull'utilizzare la disconnessione come un vantaggio competitivo. Il tuo punteggio ti pone in una posizione ideale per la prevenzione e per fare il miglior uso della tecnologia senza esserne schiavo.",
        PROFILE_MEDIUM: "Sei un **utente al bivio**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione e il tuo tempo libero. Sei nel momento perfetto per agire con un piano mirato prima di scivolare in un rischio alto e subire conseguenze più gravi su sonno e relazioni. La tua priorità è ristabilire limiti chiari e applicare immediatamente le tecniche di disconnessione intenzionale che trovi nel piano d'azione.",
        PROFILE_HIGH: "Sei un **utente dipendente**. Il tuo smartphone controlla il tuo sonno, le tue relazioni e i tuoi stati d'animo, ed è probabilmente diventato la tua via di fuga primaria dalla noia o dall'ansia. Questo report segna l'inizio del recupero del controllo. Richiede un impegno serio e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere fisico e mentale.",

        RADAR_TITLE: "Analisi Dettagliata per Asse di Rischio",
        RADAR_LEGEND: "Punteggio di Rischio (Max 3)",

        IMPACT_TITLE: "Riepilogo Dettagliato dei Punteggi di Impatto",
        IMPACT_DETAIL: (axis, score) => `• ${axis}: ${score}% (vicinanza al rischio massimo in quest'area)`,

        QUIZ_TITLE: "Le Tue Risposte Dettagliate al Quiz",
        QUIZ_Q_COL: "Domanda",
        QUIZ_A_COL: "Risposta Fornita",
        QUIZ_S_COL: "Punteggio",
        
        ANSWER_MAP: { '0': 'Mai/Raramente', '1': 'A Volte', '2': 'Spesso', '3': 'Sempre' },

        ANALYSIS_TITLE: "Analisi e Consigli Personalizzati",
        ANALYSIS_LOW: "La tua relazione con lo smartphone sembra equilibrata. Sei un **utente consapevole** che utilizza la tecnologia come uno strumento senza esserne schiavo. La tua sfida non è eliminare l'uso, ma mantenere alta la vigilanza e continuare a migliorare l'efficienza d'uso per sfruttare la disconnessione come un vantaggio competitivo. **Consiglio:** Continua a monitorare il tuo comportamento, specialmente nei periodi di stress, e usa le tue ore libere per attività profondamente rigeneranti (es. lettura, sport, hobby manuali).",
        ANALYSIS_MEDIUM: "Il tuo comportamento digitale mostra **chiari segnali di potenziale dipendenza**. Hai sviluppato abitudini che stanno erodendo la tua concentrazione e il tuo tempo libero. Sei nel momento perfetto per agire con un piano mirato prima di scivolare in un rischio alto e subire conseguenze più gravi su sonno e relazioni. **La tua priorità è ristabilire limiti chiari** e applicare immediatamente le tecniche di disconnessione intenzionale che trovi nel piano d'azione. Agisci ora per riprendere il controllo del tuo tempo.",
        ANALYSIS_HIGH: "Il tuo punteggio indica una **dipendenza digitale significativa**. Lo smartphone ha preso il controllo del tuo sonno, delle tue relazioni e dei tuoi stati d'animo, ed è probabile che sia diventato la tua via di fuga primaria dalla noia o dall'ansia. Questo report segna l'inizio del recupero del controllo. Richiede un **impegno serio** e l'applicazione immediata delle priorità definite, concentrandoti sulla sostituzione delle abitudini digitali con alternative offline che migliorino il tuo benessere fisico e mentale generale. Non sottovalutare l'impatto sul tuo benessere complessivo.",

        // Contenuto Premium
        PREMIUM_UPGRADE_TITLE: "Upgrade a Premium",
        PREMIUM_UPGRADE_TEXT: (standard, premium) => `Hai scaricato la versione Base del report (${standard}). Per sbloccare le tue 3 Priorità d'Azione, il Piano Digital Detox di 7 Giorni e le Risorse dettagliate di disconnessione, effettua l'upgrade alla versione Premium (${premium}).`,

        PRIORITY_PLAN_TITLE: "Il Tuo Piano d'Azione Prioritizzato",
        PRIORITY_NONE: "Nessuna priorità di rischio specifica identificata (punteggio basso). Procedi direttamente al Piano di 7 Giorni.",
        PRIORITY_SLEEP: "Attiva la modalità “Non Disturbare” alle 22:00 e lascia il telefono fuori dalla camera da letto. Sostituisci lo scrolling serale con la lettura di un libro fisico.",
        PRIORITY_ESCAPE: "Non usare il telefono per fuggire dalla noia, tristezza o ansia. Stabilisci un “buffer” di 10 minuti: quando senti l’impulso, aspetta 10 minuti e fai qualcosa di non digitale (es. breve passeggiata, bevanda calda).",
        PRIORITY_ATTENTION: "Usa l'app Benessere Digitale (o Tempo Schermo) per limitare strettamente l'uso delle app più distraenti (es. social, giochi) durante le ore di lavoro/studio.",
        PRIORITY_RELATIONS: "Stabilisci chiare “Zone Senza Telefono”: durante i pasti, le conversazioni con partner/figli e le riunioni sociali. Metti il telefono in modalità aereo o in un'altra stanza per disconnetterti completamente.",
        PRIORITY_CONTROL: "Usa timer da 30 minuti (Tecnica del Pomodoro) quando lavori e usa il telefono solo durante le pause. Tieni il telefono fuori dalla vista (in una borsa o cassetto) quando non è strettamente necessario.",

        DAYS_PLAN_TITLE: "Piano Digital Detox di 7 Giorni",
        DAYS_PLAN_LOW: [
            "Giorno 1 – Monitoraggio Consapevole: Per un giorno, prendi nota di ogni volta che sblocchi il telefono e cosa stavi cercando.",
            "Giorno 2 – Notifiche Selettive: Disattiva tutte le notifiche tranne quelle essenziali per lavoro o famiglia. Mantieni attive solo 3 app di messaggistica.",
            "Giorno 3 – Il Pasto Sacro: Durante tutti i pasti, il telefono va in modalità aereo e fuori dalla vista. Concentrati su cibo e conversazione.",
            "Giorno 4 – Alternativa Offline: Scegli un'attività (es. leggere, disegnare, cucinare) che farai al posto di scrollare il telefono per 30 minuti al giorno.",
            "Giorno 5 – Spazio Lavoro: Rimuovi lo smartphone dalla tua linea visiva mentre lavori/studi. Tienilo in un cassetto o in un'altra stanza.",
            "Giorno 6 – Serata Sociale: Esci con amici e informali che terrai il telefono in borsa/tasca. Goditi l'interazione dal vivo.",
            "Giorno 7 – Revisione e Mantenimento: Rivedi i tuoi progressi. Decidi quali nuove abitudini manterrai fisse per la settimana successiva."
        ],
        DAYS_PLAN_MEDIUM: [
            "Giorno 1 – Limite Duro: Imposta un limite di tempo (es. 60 minuti totali) sulle app che ti distraggono di più (es. Instagram, TikTok) usando le impostazioni di sistema.",
            "Giorno 2 – Confine Notturno: Metti il telefono in carica in una stanza diversa dalla tua camera da letto. Usa una sveglia tradizionale.",
            "Giorno 3 – Disconnessione Attiva: Stabilisci un blocco di 90 minuti di 'Lavoro Profondo' in cui il telefono è in modalità aereo e fuori portata.",
            "Giorno 4 – Noia Produttiva: Quando senti la noia, non cercare il telefono. Fai 5 minuti di stretching o pianifica i tuoi prossimi 3 obiettivi.",
            "Giorno 5 – Conversazione: Durante le conversazioni one-to-one, metti il telefono a faccia in giù o nella borsa. Esercitati a non controllarlo per tutta la durata della chiacchierata.",
            "Giorno 6 – Digital Detox di Mezza Giornata: Dalle 14:00 fino alla sera, spegni completamente il telefono e riaccendilo solo in caso di emergenza.",
            "Giorno 7 – Revisione e Riflessione: Scrivi un riassunto di come ti sei sentito questa settimana. Quali sono stati i benefici? Qual è stata la parte più difficile?"
        ],
        DAYS_PLAN_HIGH: [
            "Giorno 1 – Decontaminazione Visiva: Sposta tutte le app di social, news e giochi in una cartella secondaria e nascondila. Metti solo app di utilità sulla schermata home.",
            "Giorno 2 – Disattivazione Totale: Disinstalla temporaneamente l'app più problematica (quella che usi compulsivamente).",
            "Giorno 3 – La Regola delle 20:00: Alle 20:00, metti il telefono in modalità aereo e in un cassetto. Non riaccenderlo fino alla colazione del giorno dopo.",
            "Giorno 4 – Ritorno al Corpo: Pratica 15 minuti di mindfulness o fai una passeggiata senza auricolari o telefono. Riconosci l'ansia da disconnessione senza cedere.",
            "Giorno 5 – Riscopri la Voce: Invece di mandare SMS o email per questioni che richiedono più di due scambi, chiama la persona.",
            "Giorno 6 – Detox di un Giorno Intero: Spegni lo smartphone completamente e lascialo a casa per un'intera giornata, dedicandoti solo ad attività all'aperto o con i cari.",
            "Giorno 7 – Supporto Esterno: Condividi il tuo piano e i tuoi risultati con un amico o familiare. Chiedi loro di essere il tuo 'partner di responsabilità'.",
        ],

        RESOURCES_TITLE: "Risorse Consigliate",
        RESOURCES_TEXT: `
**App di Controllo:** Tempo Schermo (iOS) / Benessere Digitale (Android) per monitorare e **limitare strettamente** il tempo speso sulle app più distraenti.

**Libri Consigliati:**
• 'Minimalismo Digitale' (Cal Newport): Un testo fondamentale per riorganizzare la tua vita digitale, concentrandoti solo sull'uso intenzionale della tecnologia che aggiunge valore.
• 'How to Break Up with Your Phone' (C. Price): Una guida pratica passo dopo passo per costruire abitudini più sane e liberarsi dalla dipendenza.

**Tecniche Avanzate:**
• **Tecnica del Pomodoro (per il Focus):** Consiste nel dividere il lavoro in intervalli intensivi di 25 minuti (Pomodori) seguiti da brevi pause di 5 minuti. Fornisce un senso di urgenza e riduce la tentazione di controllare il telefono.
• **Blocchi di Lavoro Profondo (Deep Work):** Dedica lunghe sessioni (tipicamente 90 minuti) di lavoro intenso senza alcuna distrazione. Durante questi blocchi, il telefono deve essere in modalità aereo e fuori dalla vista.
• **Journaling Serale (per l'Ansia):** Scrivi a mano i tuoi pensieri, le preoccupazioni e il piano per il giorno dopo prima di dormire. Questo "svuota la mente" e riduce la necessità di prendere lo smartphone per placare l'ansia notturna.
`,
        DISCLAIMER: "Disclaimer: Questo report è solo a scopo informativo e non sostituisce una consulenza professionale.",

        // Paywall/Buttons
        PAYWALL_H3: "Il Tuo Risultato è Pronto!",
        PAYWALL_P: "Per sbloccare il tuo report dettagliato, scegli l'opzione di acquisto qui sotto:",
        BTN_CALCULATE: "Calcola Risultato",
        FORM_TITLE: "Valutazione della Dipendenza Digitale",
        BTN_STANDARD: (price) => `Scarica Report Base (${price} - Finto)`,
        BTN_PREMIUM: (price) => `Acquista Report Premium (${price} - Finto)`,
        BTN_PREMIUM_SUB: "(Include: Piano d'Azione, Priorità e Piano 7 Giorni)",
        ALERT_STANDARD: (price) => `Simulazione di acquisto completata. Generazione del Report Base (${price}).`,
        ALERT_PREMIUM: (price) => `Simulazione di acquisto completata. Generazione del Report Premium (${price}).`,
        
        // Domande Quiz (solo il testo è tradotto)
        quizQuestions: [
            { text: "La prima cosa che fai al risveglio è afferrare il tuo smartphone?", name: "q1", category: "Sleep and Rituals" },
            { text: "Controlli subito il telefono se non è a portata di mano?", name: "q2", category: "Escape and Emotions" },
            { text: "Fai fatica a concentrarti su un compito senza controllare le notifiche?", name: "q3", category: "Attention and Productivity" },
            { text: "Interrompi conversazioni o pasti per rispondere a messaggi o guardare lo schermo?", name: "q4", category: "Relationships and Sociality" },
            { text: "Ti senti ansioso o irritabile se devi stare senza il telefono per ore?", name: "q5", category: "Escape and Emotions" },
            { text: "Lo usi come tua unica fonte di intrattenimento (es. quando sei in coda, in bagno o sul divano)?", name: "q6", category: "Control and Time" },
            { text: "Guardare lo schermo è l'ultima cosa che fai prima di dormire?", name: "q7", category: "Sleep and Rituals" },
            { text: "Ti ritrovi a sbloccare il telefono senza un motivo particolare?", name: "q8", category: "Attention and Productivity" },
            { text: "Ti senti obbligato a controllare i social media per paura di perderti qualcosa (FOMO)?", name: "q9", category: "Escape and Emotions" },
            { text: "Hai difficoltà a stabilire limiti di tempo per l'uso delle app?", name: "q10", category: "Control and Time" },
            { text: "Hai mai avuto problemi a dormire o a svegliarti a causa dell'uso notturno?", name: "q11", category: "Sleep and Rituals" },
            { text: "Amici/familiari ti hanno criticato per l'uso eccessivo del telefono?", name: "q12", category: "Relationships and Sociality" },
            { text: "Lo tieni a portata di mano anche quando stai lavorando o studiando al PC?", name: "q13", category: "Attention and Productivity" },
            { text: "Noti di usare il telefono come meccanismo di fuga da emozioni negative (noia, ansia)?", name: "q14", category: "Escape and Emotions" },
            { text: "Ti ritrovi a usare il telefono in auto, anche se non strettamente necessario?", name: "q15", category: "Control and Time" },
            { text: "Controlli il telefono di frequente anche quando non ricevi notifiche?", name: "q16", category: "Attention and Productivity" },
            { text: "Preferisci comunicare online piuttosto che di persona?", name: "q17", category: "Relationships and Sociality" },
            { text: "Hai mai nascosto l'uso del telefono ad altre persone?", name: "q18", category: "Escape and Emotions" },
            { text: "Ti addormenti con il telefono in mano o sul letto?", name: "q19", category: "Sleep and Rituals" },
            { text: "Ti senti spesso stanco a causa dell'uso prolungato dello schermo?", name: "q20", category: "Control and Time" },
        ],
        DATE_LOCALE: 'it-IT',
    },

    // =================================================================
    // =================== 🇬🇧 INGLESE (EN) ==============================
    // =================================================================
    en: {
        AXES: { 
            'Sleep and Rituals': 'Sleep and Rituals', 
            'Escape and Emotions': 'Escape and Emotions', 
            'Attention and Productivity': 'Attention and Productivity', 
            'Relationships and Sociality': 'Relationships and Sociality', 
            'Control and Time': 'Control and Time' 
        },

        TITLE: "Personalized Digital Detox Report",
        SUBTITLE: "Final Compilation (20 Questions)",
        DATE: "Date",
        RESULT_TITLE: "Your Score",
        SCORE_LABEL: "Score",
        RISK_LABEL: "Risk",
        RISK_LEVEL_LOW: "Low Risk",
        RISK_LEVEL_MEDIUM: "Medium Risk",
        RISK_LEVEL_HIGH: "High Risk",

        BENCHMARK_TITLE: "Your Comparison to the Average User:",
        BENCHMARK_ABOVE: "BETTER THAN AVERAGE",
        BENCHMARK_BELOW: "WORSE THAN AVERAGE",
        BENCHMARK_HIGH_TEXT: (score, benchmark) => `Your score of ${score} is higher than the average score of ${benchmark} calculated among our users. This indicates your habits require immediate attention.`,
        BENCHMARK_LOW_TEXT: (score, benchmark) => `Your score of ${score} is lower than the average score of ${benchmark} calculated among our users. You have good discipline, but it is essential to stay vigilant.`,

        PROFILE_TITLE: "Your Digital Dependence Profile",
        PROFILE_LOW: "You are a **conscious user**. Your technology serves you, not the other way around. You already have good discipline; focus on maintaining your vigilance and using disconnection as a competitive advantage. Your score puts you in an ideal position for prevention and for making the best use of technology without being enslaved by it.",
        PROFILE_MEDIUM: "You are a **user at a crossroads**. You have developed habits that are eroding your concentration and free time. This is the perfect time to act with a targeted plan before you slip into high risk and suffer more severe consequences on sleep and relationships. Your priority is to re-establish clear boundaries and immediately apply the intentional disconnection techniques found in the action plan.",
        PROFILE_HIGH: "You are a **dependent user**. Your smartphone controls your sleep, relationships, and moods, and has likely become your primary escape route from boredom or anxiety. This report marks the beginning of taking back control. It requires serious commitment and the immediate application of the defined priorities, focusing on replacing digital habits with offline alternatives that improve your physical and mental well-being.",

        RADAR_TITLE: "Detailed Analysis by Risk Axis",
        RADAR_LEGEND: "Risk Score (Max 3)",

        IMPACT_TITLE: "Detailed Summary of Impact Scores",
        IMPACT_DETAIL: (axis, score) => `• ${axis}: ${score}% (proximity to maximum risk in this area)`,

        QUIZ_TITLE: "Your Detailed Quiz Answers",
        QUIZ_Q_COL: "Question",
        QUIZ_A_COL: "Answer Provided",
        QUIZ_S_COL: "Score",
        
        ANSWER_MAP: { '0': 'Never/Rarely', '1': 'Sometimes', '2': 'Often', '3': 'Always' },

        ANALYSIS_TITLE: "Personalized Analysis and Advice",
        ANALYSIS_LOW: "Your relationship with your smartphone appears balanced. You are a **conscious user** who uses technology as a tool without being its slave. Your challenge is not to eliminate use, but to maintain vigilance and continue to improve usage efficiency to leverage disconnection as a competitive advantage. **Advice:** Keep monitoring your behavior, especially during stress, and use your free hours for deeply regenerative activities (e.g., reading, sports, manual hobbies).",
        ANALYSIS_MEDIUM: "Your digital behavior shows **clear signs of potential dependency**. You have developed habits that are eroding your concentration and free time. This is the perfect time to act with a targeted plan before you slip into high risk and suffer more severe consequences on sleep and relationships. **Your priority is to re-establish clear boundaries** and immediately apply the intentional disconnection techniques found in the action plan. Act now to regain control of your time.",
        ANALYSIS_HIGH: "Your score indicates **significant digital dependency**. The smartphone has taken control of your sleep, relationships, and moods, and is likely your primary escape route from boredom or anxiety. This report marks the beginning of taking back control. It requires **serious commitment** and the immediate application of the defined priorities, focusing on replacing digital habits with offline alternatives that improve your overall physical and mental well-being. Do not underestimate the impact on your general wellness.",

        PREMIUM_UPGRADE_TITLE: "Upgrade to Premium",
        PREMIUM_UPGRADE_TEXT: (standard, premium) => `You have downloaded the Basic version of the report (${standard}). To unlock your 3 Action Priorities, the 7-Day Digital Detox Plan, and detailed Disconnection Resources, upgrade to the Premium version (${premium}).`,

        PRIORITY_PLAN_TITLE: "Your Prioritized Action Plan",
        PRIORITY_NONE: "No specific risk priorities identified (low score). Proceed directly to the 7-Day Plan.",
        PRIORITY_SLEEP: "Activate 'Do Not Disturb' mode at 10:00 PM and leave your phone out of the bedroom. Replace evening scrolling with reading a physical book.",
        PRIORITY_ESCAPE: "Do not use your phone to escape boredom, sadness, or anxiety. Establish a 10-minute 'buffer': when you feel the urge, wait 10 minutes and do something non-digital (e.g., short walk, hot drink).",
        PRIORITY_ATTENTION: "Use the Digital Wellbeing (or Screen Time) app to strictly limit the use of the most distracting apps (e.g., social media, games) during work/study hours.",
        PRIORITY_RELATIONS: "Establish clear 'Phone-Free Zones': during meals, conversations with partner/children, and social gatherings. Put the phone on airplane mode or in another room to fully disconnect.",
        PRIORITY_CONTROL: "Use 30-minute timers (Pomodoro Technique) when working and only use the phone during breaks. Keep the phone out of sight (in a bag or drawer) when not strictly necessary.",

        DAYS_PLAN_TITLE: "7-Day Digital Detox Plan",
        DAYS_PLAN_LOW: [
            "Day 1 – Conscious Monitoring: For one day, make a note every time you unlock your phone and what you were looking for.",
            "Day 2 – Selective Notifications: Turn off all notifications except those essential for work or family. Keep only 3 messaging apps active.",
            "Day 3 – The Sacred Meal: During all meals, the phone goes into airplane mode and out of sight. Focus on food and conversation.",
            "Day 4 – Offline Alternative: Choose an activity (e.g., reading, drawing, cooking) you will do instead of scrolling your phone for 30 minutes a day.",
            "Day 5 – Workspace: Remove the smartphone from your line of sight while working/studying. Keep it in a drawer or another room.",
            "Day 6 – Social Evening: Go out with friends and inform them you will keep your phone in your bag/pocket. Enjoy the live interaction.",
            "Day 7 – Review and Maintenance: Review your progress. Decide which new habits you will keep fixed for the following week."
        ],
        DAYS_PLAN_MEDIUM: [
            "Day 1 – Hard Limit: Set a time limit (e.g., 60 minutes total) on the apps that distract you the most (e.g., Instagram, TikTok) using system settings.",
            "Day 2 – Nighttime Boundary: Put your phone to charge in a different room from your bedroom. Use a traditional alarm clock.",
            "Day 3 – Active Disconnection: Establish a 90-minute 'Deep Work' block where the phone is on airplane mode and out of reach.",
            "Day 4 – Productive Boredom: When you feel boredom, do not reach for your phone. Do 5 minutes of stretching or plan your next 3 goals.",
            "Day 5 – Conversation: During one-to-one conversations, put your phone face down or in your bag. Practice not checking it for the entire duration of the chat.",
            "Day 6 – Half-Day Digital Detox: From 2:00 PM until evening, completely turn off your phone and only switch it back on for emergencies.",
            "Day 7 – Review and Reflection: Write a summary of how you felt this week. What were the benefits? What was the hardest part?"
        ],
        DAYS_PLAN_HIGH: [
            "Day 1 – Visual Decontamination: Move all social media, news, and gaming apps into a secondary folder and hide it. Only put utility apps on the home screen.",
            "Day 2 – Total Deactivation: Temporarily uninstall the most problematic app (the one you compulsively use).",
            "Day 3 – The 8:00 PM Rule: At 8:00 PM, put the phone on airplane mode and in a drawer. Do not turn it back on until breakfast the next day.",
            "Day 4 – Return to the Body: Practice 15 minutes of mindfulness or take a walk without headphones or phone. Acknowledge disconnection anxiety without giving in.",
            "Day 5 – Rediscover the Voice: Instead of sending texts or emails for matters requiring more than two exchanges, call the person.",
            "Day 6 – Full-Day Detox: Turn off the smartphone completely and leave it at home for an entire day, dedicating yourself only to outdoor activities or with loved ones.",
            "Day 7 – External Support: Share your plan and results with a friend or family member. Ask them to be your 'accountability partner'.",
        ],

        RESOURCES_TITLE: "Recommended Resources",
        RESOURCES_TEXT: `
**Control Apps:** Screen Time (iOS) / Digital Wellbeing (Android) to monitor and **strictly limit** the time spent on the most distracting apps.

**Recommended Books:**
• 'Digital Minimalism' (Cal Newport): A foundational text for reorganizing your digital life, focusing only on the intentional use of technology that adds value.
• 'How to Break Up with Your Phone' (C. Price): A practical step-by-step guide to building healthier habits and breaking free from dependency.

**Advanced Techniques:**
• **Pomodoro Technique (for Focus):** Consists of dividing work into intensive 25-minute intervals (Pomodoros) followed by short 5-minute breaks. It provides a sense of urgency and reduces the temptation to check the phone.
• **Deep Work Blocks:** Dedicate long sessions (typically 90 minutes) of intense work without any distraction. During these blocks, the phone must be on airplane mode and out of sight.
• **Evening Journaling (for Anxiety):** Write down your thoughts, worries, and the plan for the next day by hand before sleeping. This 'clears the mind' and reduces the need to pick up the smartphone to calm nighttime anxiety.
`,
        DISCLAIMER: "Disclaimer: This report is for informational purposes only and does not replace professional consultation.",

        // Paywall/Buttons
        PAYWALL_H3: "Your Result is Ready!",
        PAYWALL_P: "To unlock your detailed report, choose the purchase option below:",
        BTN_CALCULATE: "Calculate Result",
        FORM_TITLE: "Digital Dependence Assessment",
        BTN_STANDARD: (price) => `Download Basic Report (${price} - Fake)`,
        BTN_PREMIUM: (price) => `Purchase Premium Report (${price} - Fake)`,
        BTN_PREMIUM_SUB: "(Includes: Action Plan, Priorities, and 7-Day Plan)",
        ALERT_STANDARD: (price) => `Purchase simulation completed. Generating Basic Report (${price}).`,
        ALERT_PREMIUM: (price) => `Purchase simulation completed. Generating Premium Report (${price}).`,
        
        quizQuestions: [
            { text: "Is the first thing you do when you wake up to grab your smartphone?", name: "q1", category: "Sleep and Rituals" },
            { text: "Do you immediately check your phone if it's not within arm's reach?", name: "q2", category: "Escape and Emotions" },
            { text: "Do you struggle to focus on a task without checking notifications?", name: "q3", category: "Attention and Productivity" },
            { text: "Do you interrupt conversations or meals to respond to messages or look at the screen?", name: "q4", category: "Relationships and Sociality" },
            { text: "Do you feel anxious or irritable if you have to go without your phone for hours?", name: "q5", category: "Escape and Emotions" },
            { text: "Do you use it as your sole source of entertainment (e.g., when queuing, in the bathroom, or on the couch)?", name: "q6", category: "Control and Time" },
            { text: "Is looking at the screen the last thing you do before sleeping?", name: "q7", category: "Sleep and Rituals" },
            { text: "Do you find yourself unlocking your phone for no particular reason?", name: "q8", category: "Attention and Productivity" },
            { text: "Do you feel compelled to check social media for fear of missing out (FOMO)?", name: "q9", category: "Escape and Emotions" },
            { text: "Do you have difficulty setting time limits for app usage?", name: "q10", category: "Control and Time" },
            { text: "Have you ever had trouble sleeping or waking up due to nighttime use?", name: "q11", category: "Sleep and Rituals" },
            { text: "Have friends/family criticized you for excessive phone use?", name: "q12", category: "Relationships and Sociality" },
            { text: "Do you keep it within reach even when you are working or studying on a PC?", name: "q13", category: "Attention and Productivity" },
            { text: "Do you notice yourself using the phone as an escape mechanism from negative emotions (boredom, anxiety)?", name: "q14", category: "Escape and Emotions" },
            { text: "Do you find yourself using the phone in the car, even if not strictly necessary?", name: "q15", category: "Control and Time" },
            { text: "Do you check your phone frequently even when you don't receive notifications?", name: "q16", category: "Attention and Productivity" },
            { text: "Do you prefer communicating online rather than in person?", name: "q17", category: "Relationships and Sociality" },
            { text: "Have you ever hidden your phone use from other people?", name: "q18", category: "Escape and Emotions" },
            { text: "Do you fall asleep with the phone in your hand or on your bed?", name: "q19", category: "Sleep and Rituals" },
            { text: "Do you often feel tired due to prolonged screen use?", name: "q20", category: "Control and Time" },
        ],
        DATE_LOCALE: 'en-GB', // Using British English locale for date formatting
    },

    // =================================================================
    // =================== 🇫🇷 FRANCESE (FR) ===========================
    // =================================================================
    fr: {
        AXES: { 
            'Sleep and Rituals': 'Sommeil et Rituels', 
            'Escape and Emotions': 'Évasion et Émotions', 
            'Attention and Productivity': 'Attention et Productivité', 
            'Relationships and Sociality': 'Relations et Socialité', 
            'Control and Time': 'Contrôle et Temps' 
        },
        TITLE: "Rapport personnalisé de Désintoxication Numérique",
        SUBTITLE: "Construction Finale (20 Questions)",
        DATE: "Date",
        RESULT_TITLE: "Votre Résultat",
        SCORE_LABEL: "Score",
        RISK_LABEL: "Risque",
        RISK_LEVEL_LOW: "Faible risque",
        RISK_LEVEL_MEDIUM: "Risque moyen",
        RISK_LEVEL_HIGH: "Risque élevé",
        BENCHMARK_TITLE: "Votre Comparaison avec l'Utilisateur Moyen:",
        BENCHMARK_ABOVE: "MIEUX QUE LA MOYENNE",
        BENCHMARK_BELOW: "MOINS BIEN QUE LA MOYENNE",
        BENCHMARK_HIGH_TEXT: (score, benchmark) => `Votre score de ${score} est supérieur au score moyen de ${benchmark} calculé sur nos utilisateurs. Cela indique que vos habitudes nécessitent une attention immédiate.`,
        BENCHMARK_LOW_TEXT: (score, benchmark) => `Votre score de ${score} est inférieur au score moyen de ${benchmark} calculé sur nos utilisateurs. Vous avez une bonne discipline, mais il est essentiel de ne pas baisser la garde.`,
        PROFILE_TITLE: "Votre Profil de Dépendance Numérique",
        PROFILE_LOW: "Vous êtes un **utilisateur conscient**. Votre technologie vous sert, et non l'inverse. Vous avez déjà une bonne discipline ; concentrez-vous sur le maintien de votre vigilance et l'utilisation de la déconnexion comme un avantage compétitif. Votre score vous place dans une position idéale pour la prévention et pour tirer le meilleur parti de la technologie sans en être esclave.",
        PROFILE_MEDIUM: "Vous êtes un **utilisateur à la croisée des chemins**. Vous avez développé des habitudes qui érodent votre concentration et votre temps libre. C'est le moment idéal pour agir avec un plan ciblé avant de glisser vers un risque élevé et de subir des conséquences plus graves sur le sommeil et les relations. Votre priorité est de rétablir des limites claires et d'appliquer immédiatement les techniques de déconnexion intentionnelle que vous trouverez dans le plan d'action.",
        PROFILE_HIGH: "Vous êtes un **utilisateur dépendant**. Votre smartphone contrôle votre sommeil, vos relations et vos humeurs, et est probablement devenu votre principale voie d'évasion de l'ennui ou de l'anxiété. Ce rapport marque le début de la reprise de contrôle. Il nécessite un engagement sérieux et l'application immédiate des priorités définies, en se concentrant sur le remplacement des habitudes numériques par des alternatives hors ligne qui améliorent votre bien-être physique et mental.",
        RADAR_TITLE: "Analyse détaillée par Axe de Risque",
        RADAR_LEGEND: "Score de Risque (Max 3)",
        IMPACT_TITLE: "Résumé détaillé des Scores d'Impact",
        IMPACT_DETAIL: (axis, score) => `• ${axis}: ${score}% (proximité du risque maximal dans ce domaine)`,
        QUIZ_TITLE: "Vos Réponses Détaillées au Quiz",
        QUIZ_Q_COL: "Question",
        QUIZ_A_COL: "Réponse Fournie",
        QUIZ_S_COL: "Score",
        ANSWER_MAP: { '0': 'Jamais/Rarement', '1': 'Parfois', '2': 'Souvent', '3': 'Toujours' },
        ANALYSIS_TITLE: "Analyse et conseils personnalisés",
        ANALYSIS_LOW: "Votre relation avec votre smartphone semble équilibrée. Vous êtes un **utilisateur conscient** qui utilise la technologie comme un outil sans en être l'esclave. Votre défi n'est pas d'éliminer l'usage, mais de maintenir la vigilance et de continuer à améliorer l'efficacité d'utilisation pour tirer parti de la déconnexion comme avantage concurrentiel. **Conseil:** Continuez à surveiller votre comportement, surtout en période de stress, et utilisez vos heures libres pour des activités profondément régénératrices (ex. lecture, sport, loisirs manuels).",
        ANALYSIS_MEDIUM: "Votre comportement numérique montre des **signes clairs de dépendance potentielle**. Vous avez développé des habitudes qui érodent votre concentration et votre temps libre. C'est le moment idéal pour agir avec un plan ciblé avant de glisser vers un risque élevé et de subir des conséquences plus graves sur le sommeil et les relations. **Votre priorité est de rétablir des limites claires** et d'appliquer immédiatement les techniques de déconnexion intentionnelle que vous trouverez dans le plan d'action. Agissez maintenant pour reprendre le contrôle de votre temps.",
        ANALYSIS_HIGH: "Votre score indique une **dépendance numérique significative**. Le smartphone a pris le contrôle de votre sommeil, vos relations et vos humeurs, et est probablement devenu votre principale voie d'évasion de l'ennui ou de l'anxiété. Ce rapport marque le début de la reprise de contrôle. Il nécessite un **engagement sérieux** et l'application immédiate des priorités définies, en se concentrant sur le remplacement des habitudes numériques par des alternatives hors ligne qui améliorent votre bien-être physique et mental global. Ne sous-estimez pas l'impact sur votre bien-être général.",
        PREMIUM_UPGRADE_TITLE: "Passer à la version Premium",
        PREMIUM_UPGRADE_TEXT: (standard, premium) => `Vous avez téléchargé la version Basique du rapport (${standard}). Pour débloquer vos 3 Priorités d'Action, le Plan de Désintoxication Numérique de 7 Jours et les Ressources détaillées, passez à la version Premium (${premium}).`,
        PRIORITY_PLAN_TITLE: "Votre Plan d'Action Priorisé",
        PRIORITY_NONE: "Aucune priorité de risque spécifique identifiée (score faible). Procédez directement au Plan de 7 Jours.",
        PRIORITY_SLEEP: "Activez le mode « Ne Pas Déranger » à 22h00 et laissez votre téléphone en dehors de la chambre. Remplacez le défilement du soir par la lecture d'un livre physique.",
        PRIORITY_ESCAPE: "N'utilisez pas votre téléphone pour échapper à l'ennui, à la tristesse ou à l'anxiété. Établissez un « tampon » de 10 minutes : lorsque vous ressentez l'envie, attendez 10 minutes et faites quelque chose de non-numérique (ex. courte promenade, boisson chaude).",
        PRIORITY_ATTENTION: "Utilisez l'application Bien-être Numérique (ou Temps d'Écran) pour limiter strictement l'utilisation des applications les plus distrayantes (ex. réseaux sociaux, jeux) pendant les heures de travail/étude.",
        PRIORITY_RELATIONS: "Établissez des « Zones sans Téléphone » claires : pendant les repas, les conversations avec le partenaire/les enfants et les réunions sociales. Mettez le téléphone en mode avion ou dans une autre pièce pour vous déconnecter complètement.",
        PRIORITY_CONTROL: "Utilisez des minuteurs de 30 minutes (Technique Pomodoro) lorsque vous travaillez et n'utilisez le téléphone que pendant les pauses. Gardez le téléphone hors de vue (dans un sac ou un tiroir) lorsque ce n'est pas strictement nécessaire.",
        DAYS_PLAN_TITLE: "Plan de Désintoxication Numérique de 7 Jours",
        DAYS_PLAN_LOW: [
            "Jour 1 – Surveillance Consciente : Pendant une journée, notez chaque fois que vous déverrouillez votre téléphone et ce que vous cherchiez.", "Jour 2 – Notifications Sélectives : Désactivez toutes les notifications sauf celles essentielles pour le travail ou la famille. Gardez seulement 3 applications de messagerie actives.", "Jour 3 – Le Repas Sacré : Pendant tous les repas, le téléphone passe en mode avion et hors de vue. Concentrez-vous sur la nourriture et la conversation.", "Jour 4 – Alternative Hors Ligne : Choisissez une activité (ex. lire, dessiner, cuisiner) que vous ferez au lieu de faire défiler votre téléphone pendant 30 minutes par jour.", "Jour 5 – Espace de Travail : Retirez le smartphone de votre champ de vision pendant que vous travaillez/étudiez. Gardez-le dans un tiroir ou une autre pièce.", "Jour 6 – Soirée Sociale : Sortez avec des amis et informez-les que vous garderez votre téléphone dans votre sac/poche. Profitez de l'interaction en direct.", "Jour 7 – Révision et Maintien : Passez en revue vos progrès. Décidez quelles nouvelles habitudes vous conserverez pour la semaine suivante."
        ],
        DAYS_PLAN_MEDIUM: [
            "Jour 1 – Limite Dure : Définissez une limite de temps (ex. 60 minutes au total) sur les applications qui vous distraient le plus (ex. Instagram, TikTok) en utilisant les paramètres système.", "Jour 2 – Frontière Nocturne : Mettez votre téléphone à charger dans une pièce différente de votre chambre. Utilisez un réveil traditionnel.", "Jour 3 – Déconnexion Active : Établissez un bloc de 90 minutes de 'Travail Profond' où le téléphone est en mode avion et hors de portée.", "Jour 4 – Ennui Productif : Lorsque vous vous ennuyez, ne prenez pas votre téléphone. Faites 5 minutes d'étirements ou planifiez vos 3 prochains objectifs.", "Jour 5 – Conversation : Pendant les conversations individuelles, mettez votre téléphone face cachée ou dans votre sac. Entraînez-vous à ne pas le vérifier pendant toute la durée de la conversation.", "Jour 6 – Désintoxication Numérique d'une Demi-Journée : De 14h00 jusqu'au soir, éteignez complètement votre téléphone et ne le rallumez qu'en cas d'urgence.", "Jour 7 – Révision et Réflexion : Écrivez un résumé de ce que vous avez ressenti cette semaine. Quels ont été les avantages ? Quelle a été la partie la plus difficile ?"
        ],
        DAYS_PLAN_HIGH: [
            "Jour 1 – Décontamination Visuelle : Déplacez toutes les applications de réseaux sociaux, d'actualités et de jeux dans un dossier secondaire et cachez-le. Ne mettez que des applications utilitaires sur l'écran d'accueil.", "Jour 2 – Désactivation Totale : Désinstallez temporairement l'application la plus problématique (celle que vous utilisez de manière compulsive).", "Jour 3 – La Règle de 20h00 : À 20h00, mettez le téléphone en mode avion et dans un tiroir. Ne le rallumez qu'au petit-déjeuner le lendemain.", "Jour 4 – Retour au Corps : Pratiquez 15 minutes de pleine conscience ou faites une promenade sans écouteurs ni téléphone. Reconnaissez l'anxiété de déconnexion sans céder.", "Jour 5 – Redécouvrez la Voix : Au lieu d'envoyer des SMS ou des e-mails pour des questions nécessitant plus de deux échanges, appelez la personne.", "Jour 6 – Désintoxication d'une Journée Complète : Éteignez complètement le smartphone et laissez-le à la maison pendant une journée entière, en vous consacrant uniquement à des activités de plein air ou avec des proches.", "Jour 7 – Soutien Externe : Partagez votre plan et vos résultats avec un ami ou un membre de la famille. Demandez-leur d'être votre 'partenaire de responsabilité'."
        ],
        RESOURCES_TITLE: "Ressources recommandées",
        RESOURCES_TEXT: `
**Applications de Contrôle :** Temps d'Écran (iOS) / Bien-être Numérique (Android) pour surveiller et **limiter strictement** le temps passé sur les applications qui causent plus de distraction.
**Livres Recommandés :**
• 'Digital Minimalism' (Cal Newport) : Un texte fondamental pour réorganiser votre vie numérique, en vous concentrant uniquement sur l'utilisation intentionnelle de la technologie qui apporte de la valeur.
• 'How to Break Up with Your Phone' (C. Price) : Un guide pratique étape par étape pour construire des habitudes plus saines et se libérer de la dépendance.
**Tecniques Avancées :**
• **Technique Pomodoro (pour la Concentration) :** Consiste à diviser le travail en intervalles intensifs de 25 minutes (Pomodoros) suivis de courtes pauses de 5 minutes. Elle procure un sentiment d'urgence et réduit la tentation de vérifier le téléphone.
• **Blocs de Travail Profond (Deep Work) :** Consacrez de longues sessions (typiquement 90 minutes) de travail intensif sans aucune distraction. Pendant ces blocs, le téléphone doit être en mode avion et hors de vue.
• **Journaling du Soir (pour l'Anxiété) :** Écrivez à la main vos pensées, vos inquiétudes et le plan pour le lendemain avant de dormir. Cela « vide l'esprit » et réduit le besoin de prendre le smartphone pour calmer l'anxiété nocturne.
`,
        DISCLAIMER: "Avis de non-responsabilité : ce rapport est à titre informatif uniquement et ne remplace pas une consultation professionnelle.",
        PAYWALL_H3: "Votre résultat est prêt !",
        PAYWALL_P: "Pour déverrouiller votre rapport détaillé, choisissez l'option d'achat ci-dessous :",
        BTN_CALCULATE: "Calculer le Résultat",
        FORM_TITLE: "Évaluation de la Dépendance Numérique",
        BTN_STANDARD: (price) => `Télécharger le Rapport Basique (${price} - Faux)`,
        BTN_PREMIUM: (price) => `Acheter le Rapport Premium (${price} - Faux)`,
        BTN_PREMIUM_SUB: "(Comprend : Plan d'Action, Priorités et Plan de 7 Jours)",
        ALERT_STANDARD: (price) => `Simulation d'achat terminée. Génération du Rapport Basique (${price}).`,
        ALERT_PREMIUM: (price) => `Simulation d'achat terminée. Génération du Rapport Premium (${price}).`,
        quizQuestions: [
            { text: "La première chose que vous faites au réveil est de prendre votre smartphone ?", name: "q1", category: "Sleep and Rituals" },
            { text: "Vérifiez-vous immédiatement votre téléphone s'il n'est pas à portée de main ?", name: "q2", category: "Escape and Emotions" },
            { text: "Avez-vous du mal à vous concentrer sur une tâche sans vérifier les notifications ?", name: "q3", category: "Attention and Productivity" },
            { text: "Interrompez-vous des conversations ou des repas pour répondre à des messages ou regarder l'écran ?", name: "q4", category: "Relationships and Sociality" },
            { text: "Vous sentez-vous anxieux ou irritable si vous devez vous passer de votre téléphone pendant des heures ?", name: "q5", category: "Escape and Emotions" },
            { text: "L'utilisez-vous comme seule source de divertissement (ex. lorsque vous faites la queue, dans la salle de bain ou sur le canapé) ?", name: "q6", category: "Control and Time" },
            { text: "Regarder l'écran est-ce la dernière chose que vous faites avant de dormir ?", name: "q7", category: "Sleep and Rituals" },
            { text: "Vous arrive-t-il de déverrouiller votre téléphone sans raison particulière ?", name: "q8", category: "Attention and Productivity" },
            { text: "Vous sentez-vous obligé de vérifier les réseaux sociaux par peur de manquer quelque chose (FOMO) ?", name: "q9", category: "Escape and Emotions" },
            { text: "Avez-vous du mal à établir des limites de temps pour l'utilisation des applications ?", name: "q10", category: "Control and Time" },
            { text: "Avez-vous déjà eu des problèmes pour dormir ou vous réveiller à cause de l'utilisation nocturne ?", name: "q11", category: "Sleep and Rituals" },
            { text: "Vos amis/famille vous ont-ils critiqué pour l'utilisation excessive du téléphone ?", name: "q12", category: "Relationships and Sociality" },
            { text: "Le gardez-vous à portée de main même lorsque vous travaillez ou étudiez sur un PC ?", name: "q13", category: "Attention and Productivity" },
            { text: "Remarquez-vous que vous utilisez le téléphone comme mécanisme d'évasion des émotions négatives (ennui, anxiété) ?", name: "q14", category: "Escape and Emotions" },
            { text: "Vous arrive-t-il d'utiliser le téléphone en voiture, même si ce n'est pas strictement nécessaire ?", name: "q15", category: "Control and Time" },
            { text: "Vérifiez-vous souvent votre téléphone même lorsque vous ne recevez pas de notifications ?", name: "q16", category: "Attention and Productivity" },
            { text: "Préférez-vous communiquer en ligne plutôt qu'en personne ?", name: "q17", category: "Relationships and Sociality" },
            { text: "Avez-vous déjà caché votre utilisation du téléphone à d'autres personnes ?", name: "q18", category: "Escape and Emotions" },
            { text: "Vous endormez-vous avec le téléphone à la main ou sur votre lit ?", name: "q19", category: "Sleep and Rituals" },
            { text: "Vous sentez-vous souvent fatigué à cause de l'utilisation prolongée de l'écran ?", name: "q20", category: "Control and Time" },
        ],
        DATE_LOCALE: 'fr-FR',
    },

    // =================================================================
    // =================== 🇪🇸 SPAGNOLO (ES) ============================
    // =================================================================
    es: {
        AXES: { 
            'Sleep and Rituals': 'Sueño y Rituales', 
            'Escape and Emotions': 'Escape y Emociones', 
            'Attention and Productivity': 'Atención y Productividad', 
            'Relationships and Sociality': 'Relaciones y Socialidad', 
            'Control and Time': 'Control y Tiempo' 
        },
        TITLE: "Informe Personalizado de Desintoxicación Digital",
        SUBTITLE: "Compilación Final (20 Preguntas)",
        DATE: "Fecha",
        RESULT_TITLE: "Tu Puntuación",
        SCORE_LABEL: "Puntuación",
        RISK_LABEL: "Riesgo",
        RISK_LEVEL_LOW: "Riesgo bajo",
        RISK_LEVEL_MEDIUM: "Riesgo medio",
        RISK_LEVEL_HIGH: "Riesgo alto",
        BENCHMARK_TITLE: "Tu Comparación con el Usuario Promedio:",
        BENCHMARK_ABOVE: "MEJOR QUE EL PROMEDIO",
        BENCHMARK_BELOW: "PEOR QUE EL PROMEDIO",
        BENCHMARK_HIGH_TEXT: (score, benchmark) => `Tu puntuación de ${score} es superior a la puntuación promedio de ${benchmark} calculada en nuestros usuarios. Esto indica que tus hábitos requieren atención inmediata.`,
        BENCHMARK_LOW_TEXT: (score, benchmark) => `Tu puntuación de ${score} es inferior a la puntuación promedio de ${benchmark} calculada en nuestros usuarios. Tienes buena disciplina, pero es esencial no bajar la guardia.`,
        PROFILE_TITLE: "Tu Perfil de Dependencia Digital",
        PROFILE_LOW: "Eres un **usuario consciente**. Tu tecnología te sirve, no al revés. Ya tienes una buena disciplina; céntrate en mantener la guardia alta y utilizar la desconexión como una ventaja competitiva. Tu puntuación te sitúa en una posición ideal para la prevención y para hacer el mejor uso de la tecnología sin estar esclavizado por ella.",
        PROFILE_MEDIUM: "Eres un **usuario en una encrucijada**. Has desarrollado hábitos que están erosionando tu concentración y tiempo libre. Estás en el momento perfecto para actuar con un plan dirigido antes de caer en un alto riesgo y sufrir consecuencias más graves en el sueño y las relaciones. Tu prioridad es restablecer límites claros y aplicar inmediatamente las técnicas de desconexión intencional que se encuentran en el plan de acción.",
        PROFILE_HIGH: "Eres un **usuario dependiente**. Tu smartphone controla tu sueño, tus relaciones y tus estados de ánimo, y probablemente se ha convertido en tu vía de escape primaria del aburrimiento o la ansiedad. Este informe marca el inicio de la recuperación del control. Requiere un compromiso serio y la aplicación inmediata de las prioridades definidas, centrándose en reemplazar los hábitos digitales con alternativas fuera de línea que mejoren tu bienestar físico y mental.",
        RADAR_TITLE: "Análisis Detallado por Eje de Riesgo",
        RADAR_LEGEND: "Puntuación de Riesgo (Máx 3)",
        IMPACT_TITLE: "Resumen Detallado de Puntuaciones de Impacto",
        IMPACT_DETAIL: (axis, score) => `• ${axis}: ${score}% (proximidad al riesgo máximo en esta área)`,
        QUIZ_TITLE: "Tus Respuestas Detalladas al Cuestionario",
        QUIZ_Q_COL: "Pregunta",
        QUIZ_A_COL: "Respuesta Proporcionada",
        QUIZ_S_COL: "Puntuación",
        ANSWER_MAP: { '0': 'Nunca/Raramente', '1': 'A veces', '2': 'A menudo', '3': 'Siempre' },
        ANALYSIS_TITLE: "Análisis y Consejos Personalizados",
        ANALYSIS_LOW: "Tu relación con tu smartphone parece equilibrada. Eres un **usuario consciente** que utiliza la tecnología como una herramienta sin ser su esclavo. Tu desafío no es eliminar el uso, sino mantener la vigilancia y seguir mejorando la eficiencia para aprovechar la desconexión como una ventaja competitiva. **Consejo:** Continúa monitoreando tu comportamiento, especialmente en momentos de estrés, y utiliza tus horas libres para actividades profundamente regenerativas (ej. lectura, deporte, aficiones manuales).",
        ANALYSIS_MEDIUM: "Tu comportamiento digital muestra **señales claras de dependencia potencial**. Has desarrollado hábitos que están erosionando tu concentración y tiempo libre. Estás en el momento perfecto para actuar con un plan dirigido antes de caer en un alto riesgo y sufrir consecuencias más graves en el sueño y las relaciones. **Tu prioridad es restablecer límites claros** y aplicar inmediatamente las técnicas de desconexión intencional que se encuentran en el plan de acción. Actúa ahora para recuperar el control de tu tiempo.",
        ANALYSIS_HIGH: "Tu puntuación indica una **dependencia digital significativa**. El smartphone ha tomado el control de tu sueño, tus relaciones y tus estados de ánimo, y es probable que se haya convertido en tu vía de escape primaria del aburrimiento o la ansiedad. Este informe marca el inicio de la recuperación del control. Requiere un **compromiso serio** y la aplicación inmediata de las prioridades definidas, centrándose en reemplazar los hábitos digitales con alternativas fuera de línea que mejoren tu bienestar físico y mental general. No subestimes el impacto en tu bienestar general.",
        PREMIUM_UPGRADE_TITLE: "Actualizar a Premium",
        PREMIUM_UPGRADE_TEXT: (standard, premium) => `Has descargado la versión Básica del informe (${standard}). Para desbloquear tus 3 Prioridades de Acción, el Plan de Desintoxicación Digital de 7 Días y los Recursos detallados, actualiza a la versión Premium (${premium}).`,
        PRIORITY_PLAN_TITLE: "Tu Plan de Acción Priorizado",
        PRIORITY_NONE: "No se identificaron prioridades de riesgo específicas (puntuación baja). Procede directamente al Plan de 7 Días.",
        PRIORITY_SLEEP: "Activa el modo «No Molestar» a las 22:00 y deja tu teléfono fuera del dormitorio. Reemplaza el desplazamiento nocturno por la lectura de un libro físico.",
        PRIORITY_ESCAPE: "No uses tu teléfono para escapar del aburrimiento, la tristeza o la ansiedad. Establece un «búfer» de 10 minutos: cuando sientas la necesidad, espera 10 minutos y haz algo no digital (ej. caminata corta, bebida caliente).",
        PRIORITY_ATTENTION: "Usa la aplicación Bienestar Digital (o Tiempo de Pantalla) para limitar estrictamente el uso de las aplicaciones más distractoras (ej. redes sociales, juegos) durante las horas de trabajo/estudio.",
        PRIORITY_RELATIONS: "Establece «Zonas sin Teléfono» claras: durante las comidas, conversaciones con pareja/hijos y reuniones sociales. Pon el teléfono en modo avión o en otra habitación para desconectarte por completo.",
        PRIORITY_CONTROL: "Utiliza temporizadores de 30 minutos (Técnica Pomodoro) cuando trabajes y usa el teléfono solo durante los descansos. Mantén el teléfono fuera de la vista (en una bolsa o cajón) cuando no sea estrictamente necesario.",
        DAYS_PLAN_TITLE: "Plan de Desintoxicación Digital de 7 Días",
        DAYS_PLAN_LOW: [
            "Día 1 – Monitoreo Consciente: Durante un día, toma nota cada vez que desbloquees tu teléfono y qué estabas buscando.", "Día 2 – Notificaciones Selectivas: Desactiva todas las notificaciones excepto las esenciales para el trabajo o la familia. Mantén solo 3 aplicaciones de mensajería activas.", "Día 3 – La Comida Sagrada: Durante todas las comidas, el teléfono pasa a modo avión y fuera de la vista. Concéntrate en la comida y la conversación.", "Día 4 – Alternativa Fuera de Línea: Elige una actividad (ej. leer, dibujar, cocinar) que harás en lugar de desplazarte por tu teléfono durante 30 minutos al día.", "Día 5 – Espacio de Trabajo: Retira el smartphone de tu línea de visión mientras trabajas/estudias. Guárdalo en un cajón o en otra habitación.", "Día 6 – Noche Social: Sal con amigos e infórmales que mantendrás tu teléfono en tu bolso/bolsillo. Disfruta de la interacción en vivo.", "Día 7 – Revisión y Mantenimiento: Revisa tu progreso. Decide qué nuevos hábitos mantendrás fijos para la próxima semana."
        ],
        DAYS_PLAN_MEDIUM: [
            "Día 1 – Límite Estricto: Establece un límite de tiempo (ej. 60 minutos totales) en las aplicaciones que más te distraen (ej. Instagram, TikTok) usando la configuración del sistema.", "Día 2 – Frontera Nocturna: Pon tu teléfono a cargar en una habitación diferente a tu dormitorio. Utiliza un despertador tradicional.", "Día 3 – Desconexión Activa: Establece un bloque de 90 minutos de 'Trabajo Profundo' donde el teléfono esté en modo avión y fuera del alcance.", "Día 4 – Aburrimiento Productivo: Cuando sientas aburrimiento, no busques tu teléfono. Haz 5 minutos de estiramientos o planifica tus próximos 3 objetivos.", "Día 5 – Conversación: Durante las conversaciones uno a uno, pon tu teléfono boca abajo o en tu bolso. Practica no revisarlo durante toda la duración de la conversación.", "Día 6 – Desintoxicación Digital de Medio Día: Desde las 2:00 PM hasta la noche, apaga completamente tu teléfono y solo vuelve a encenderlo en caso de emergencia.", "Día 7 – Revisión y Reflexión: Escribe un resumen de cómo te sentiste esta semana. ¿Cuáles fueron los beneficios? ¿Cuál fue la parte más difícil?"
        ],
        DAYS_PLAN_HIGH: [
            "Día 1 – Descontaminación Visual: Mueve todas las aplicaciones de redes sociales, noticias y juegos a una carpeta secundaria y escóndela. Solo pon aplicaciones de utilidad en la pantalla de inicio.", "Día 2 – Desactivación Total: Desinstala temporalmente la aplicación más problemática (la que usas compulsivamente).", "Día 3 – La Regla de las 8:00 PM: A las 8:00 PM, pon el teléfono en modo avión y en un cajón. No lo vuelvas a encender hasta el desayuno del día siguiente.", "Día 4 – Retorno al Cuerpo: Practica 15 minutos de atención plena o da un paseo sin auriculares ni teléfono. Reconoce la ansiedad de desconexión sin ceder.", "Día 5 – Redescubre la Voz: En lugar de enviar mensajes de texto o correos electrónicos para asuntos que requieran más de dos intercambios, llama a la persona.", "Día 6 – Desintoxicación de Día Completo: Apaga el smartphone completamente y déjalo en casa durante un día entero, dedicándote solo a actividades al aire libre o con seres queridos.", "Día 7 – Apoyo Externo: Comparte tu plan y resultados con un amigo o familiar. Pídeles que sean tu 'socio de responsabilidad'."
        ],
        RESOURCES_TITLE: "Recursos Recomendados",
        RESOURCES_TEXT: `
**Aplicaciones de Control:** Tiempo de Pantalla (iOS) / Bienestar Digital (Android) para monitorear y **limitar estrictamente** el tiempo dedicado a las aplicaciones más distractoras.
**Libros Recomendados:**
• 'Digital Minimalism' (Cal Newport): Un texto fundamental para reorganizar tu vida digital, centrándote solo en el uso intencional de la tecnología que agrega valor.
• 'How to Break Up with Your Phone' (C. Price): Una guía práctica paso a paso para construir hábitos más saludables y liberarse de la dependencia.
**Técnicas Avanzadas:**
• **Técnica Pomodoro (para el Enfoque):** Consiste en dividir el trabajo en intervalos intensivos de 25 minutos (Pomodoros) seguidos de descansos cortos de 5 minutos. Proporciona una sensación de urgencia y reduce la tentación de revisar el teléfono.
• **Bloques de Trabajo Profundo (Deep Work):** Dedica largas sesiones (típicamente 90 minutos) de trabajo intensivo sin ninguna distracción. Durante estos bloques, el teléfono debe estar en modo avión y fuera de la vista.
• **Diario Nocturno (para la Ansiedad):** Escribe a mano tus pensamientos, preocupaciones y el plan para el día siguiente antes de dormir. Esto "vacía la mente" y reduce la necesidad de tomar el smartphone para calmar la ansiedad nocturna.
`,
        DISCLAIMER: "Descargo de responsabilidad: Este informe es solo para fines informativos y no reemplaza la consulta profesional.",
        PAYWALL_H3: "¡Tu resultado está listo!",
        PAYWALL_P: "Para desbloquear tu informe detallado, elige la opción de compra a continuación:",
        BTN_CALCULATE: "Calcular Resultado",
        FORM_TITLE: "Evaluación de Dependencia Digital",
        BTN_STANDARD: (price) => `Descargar Informe Básico (${price} - Falso)`,
        BTN_PREMIUM: (price) => `Comprar Informe Premium (${price} - Falso)`,
        BTN_PREMIUM_SUB: "(Incluye: Plan de Acción, Prioridades y Plan de 7 Días)",
        ALERT_STANDARD: (price) => `Simulación de compra completada. Generando Informe Básico (${price}).`,
        ALERT_PREMIUM: (price) => `Simulación de compra completada. Generando Informe Premium (${price}).`,
        quizQuestions: [
            { text: "¿Lo primero que haces al despertar es agarrar tu smartphone?", name: "q1", category: "Sleep and Rituals" },
            { text: "¿Revisas inmediatamente tu teléfono si no está a tu alcance?", name: "q2", category: "Escape and Emotions" },
            { text: "¿Te cuesta concentrarte en una tarea sin revisar las notificaciones?", name: "q3", category: "Attention and Productivity" },
            { text: "¿Interrumpes conversaciones o comidas para responder mensajes o mirar la pantalla?", name: "q4", category: "Relationships and Sociality" },
            { text: "¿Te sientes ansioso o irritable si tienes que estar sin tu teléfono por horas?", name: "q5", category: "Escape and Emotions" },
            { text: "¿Lo usas como tu única fuente de entretenimiento (ej. cuando haces fila, en el baño o en el sofá)?", name: "q6", category: "Control and Time" },
            { text: "¿Mirar la pantalla es lo último que haces antes de dormir?", name: "q7", category: "Sleep and Rituals" },
            { text: "¿Te encuentras desbloqueando tu teléfono sin ninguna razón en particular?", name: "q8", category: "Attention and Productivity" },
            { text: "¿Te sientes obligado a revisar las redes sociales por miedo a perderte algo (FOMO)?", name: "q9", category: "Escape and Emotions" },
            { text: "¿Tienes dificultad para establecer límites de tiempo para el uso de aplicaciones?", name: "q10", category: "Control and Time" },
            { text: "¿Alguna vez has tenido problemas para dormir o despertarte debido al uso nocturno?", name: "q11", category: "Sleep and Rituals" },
            { text: "¿Tus amigos/familia te han criticado por el uso excesivo del teléfono?", name: "q12", category: "Relationships and Sociality" },
            { text: "¿Lo mantienes al alcance incluso cuando estás trabajando o estudiando en una PC?", name: "q13", category: "Attention and Productivity" },
            { text: "¿Notas que usas el teléfono como un mecanismo de escape de emociones negativas (aburrimiento, ansiedad)?", name: "q14", category: "Escape and Emotions" },
            { text: "¿Te encuentras usando el teléfono en el coche, aunque no sea estrictamente necesario?", name: "q15", category: "Control and Time" },
            { text: "¿Revisas tu teléfono con frecuencia incluso cuando no recibes notificaciones?", name: "q16", category: "Attention and Productivity" },
            { text: "¿Prefieres comunicarte en línea en lugar de en persona?", name: "q17", category: "Relationships and Sociality" },
            { text: "¿Alguna vez has ocultado tu uso del teléfono a otras personas?", name: "q18", category: "Escape and Emotions" },
            { text: "¿Te duermes con el teléfono en la mano o en tu cama?", name: "q19", category: "Sleep and Rituals" },
            { text: "¿Te sientes a menudo cansado debido al uso prolongado de la pantalla?", name: "q20", category: "Control and Time" },
        ],
        DATE_LOCALE: 'es-ES',
    },

    // =================================================================
    // =================== 🇩🇪 TEDESCO (DE) ============================
    // =================================================================
    de: {
        AXES: { 
            'Sleep and Rituals': 'Schlaf und Rituale', 
            'Escape and Emotions': 'Flucht und Emotionen', 
            'Attention and Productivity': 'Aufmerksamkeit und Produktivität', 
            'Relationships and Sociality': 'Beziehungen und Sozialität', 
            'Control and Time': 'Kontrolle und Zeit' 
        },
        TITLE: "Personalisierter Digital Detox Bericht",
        SUBTITLE: "Finale Version (20 Fragen)",
        DATE: "Datum",
        RESULT_TITLE: "Ihr Ergebnis",
        SCORE_LABEL: "Punktzahl",
        RISK_LABEL: "Risiko",
        RISK_LEVEL_LOW: "Niedriges Risiko",
        RISK_LEVEL_MEDIUM: "Mittleres Risiko",
        RISK_LEVEL_HIGH: "Hohes Risiko",
        BENCHMARK_TITLE: "Ihr Vergleich zum Durchschnittsnutzer:",
        BENCHMARK_ABOVE: "BESSER ALS DER DURCHSCHNITT",
        BENCHMARK_BELOW: "SCHLECHTER ALS DER DURCHSCHNITT",
        BENCHMARK_HIGH_TEXT: (score, benchmark) => `Ihre Punktzahl von ${score} ist höher als die Durchschnittspunktzahl von ${benchmark}, die bei unseren Nutzern berechnet wurde. Dies deutet darauf hin, dass Ihre Gewohnheiten sofortige Aufmerksamkeit erfordern.`,
        BENCHMARK_LOW_TEXT: (score, benchmark) => `Ihre Punktzahl von ${score} ist niedriger als die Durchschnittspunktzahl von ${benchmark}, die bei unseren Nutzern berechnet wurde. Sie haben eine gute Disziplin, aber es ist wichtig, nicht nachzulassen.`,
        PROFILE_TITLE: "Ihr Digital-Dependence-Profil",
        PROFILE_LOW: "Sie sind ein **bewusster Nutzer**. Ihre Technologie dient Ihnen, nicht umgekehrt. Sie verfügen bereits über eine gute Disziplin; konzentrieren Sie sich darauf, wachsam zu bleiben und die Trennung als Wettbewerbsvorteil zu nutzen. Ihre Punktzahl bringt Sie in eine ideale Position zur Prävention und um Technologie optimal zu nutzen, ohne von ihr versklavt zu werden.",
        PROFILE_MEDIUM: "Sie sind ein **Nutzer am Scheideweg**. Sie haben Gewohnheiten entwickelt, die Ihre Konzentration und Freizeit untergraben. Dies ist der perfekte Zeitpunkt, um mit einem gezielten Plan zu handeln, bevor Sie in ein hohes Risiko abrutschen und ernstere Folgen für Schlaf und Beziehungen erleiden. Ihre Priorität ist es, klare Grenzen wiederherzustellen und die im Aktionsplan enthaltenen intentionalen Trennungstechniken sofort anzuwenden.",
        PROFILE_HIGH: "Sie sind ein **abhängiger Nutzer**. Ihr Smartphone kontrolliert Ihren Schlaf, Ihre Beziehungen und Ihre Stimmungen und ist wahrscheinlich zu Ihrer primären Fluchtmöglichkeit vor Langeweile oder Angst geworden. Dieser Bericht markiert den Beginn der Rückeroberung der Kontrolle. Er erfordert ernsthaftes Engagement und die sofortige Anwendung definierter Prioritäten, wobei der Schwerpunkt auf dem Ersatz digitaler Gewohnheiten durch Offline-Alternativen liegt, die Ihr körperliches und geistiges Wohlbefinden verbessern.",
        RADAR_TITLE: "Detaillierte Analyse nach Risikoachse",
        RADAR_LEGEND: "Risikopunktzahl (Max 3)",
        IMPACT_TITLE: "Detaillierte Zusammenfassung der Auswirkungspunkte",
        IMPACT_DETAIL: (axis, score) => `• ${axis}: ${score}% (Nähe zum maximalen Risiko in diesem Bereich)`,
        QUIZ_TITLE: "Ihre Detaillierten Quiz-Antworten",
        QUIZ_Q_COL: "Frage",
        QUIZ_A_COL: "Gegebene Antwort",
        QUIZ_S_COL: "Punktzahl",
        ANSWER_MAP: { '0': 'Nie/Selten', '1': 'Manchmal', '2': 'Oft', '3': 'Immer' },
        ANALYSIS_TITLE: "Personalisierte Analyse und Ratschläge",
        ANALYSIS_LOW: "Ihre Beziehung zu Ihrem Smartphone erscheint ausgewogen. Sie sind ein **bewusster Nutzer**, der Technologie als Werkzeug nutzt, ohne ihr Sklave zu sein. Ihre Herausforderung besteht nicht darin, die Nutzung zu eliminieren, sondern wachsam zu bleiben und die Effizienz weiter zu verbessern, um die Trennung als Wettbewerbsvorteil zu nutzen. **Ratschlag:** Überwachen Sie Ihr Verhalten weiterhin, insbesondere in Stresssituationen, und nutzen Sie Ihre Freizeit für tiefgreifende regenerative Aktivitäten (z. B. Lesen, Sport, manuelle Hobbys).",
        ANALYSIS_MEDIUM: "Ihr digitales Verhalten zeigt **deutliche Anzeichen einer potenziellen Abhängigkeit**. Sie haben Gewohnheiten entwickelt, die Ihre Konzentration und Freizeit untergraben. Dies ist der perfekte Zeitpunkt, um mit einem gezielten Plan zu handeln, bevor Sie in ein hohes Risiko abrutschen und ernstere Folgen für Schlaf und Beziehungen erleiden. **Ihre Priorität ist es, klare Grenzen wiederherzustellen** und die intentionalen Trennungstechniken, die Sie im Aktionsplan finden, sofort anzuwenden. Handeln Sie jetzt, um die Kontrolle über Ihre Zeit zurückzugzugewinnen.",
        ANALYSIS_HIGH: "Ihre Punktzahl weist auf eine **signifikante digitale Abhängigkeit** hin. Das Smartphone hat die Kontrolle über Ihren Schlaf, Ihre Beziehungen und Ihre Stimmungen übernommen und ist wahrscheinlich zu Ihrer primären Fluchtmöglichkeit vor Langeweile oder Angst geworden. Dieser Bericht markiert den Beginn der Rückeroberung der Kontrolle. Er erfordert ein **ernsthaftes Engagement** und die sofortige Anwendung definierter Prioritäten, wobei der Schwerpunkt auf dem Ersatz digitaler Gewohnheiten durch Offline-Alternativen liegt, die Ihr körperliches und geistiges Wohlbefinden verbessern. Unterschätzen Sie die Auswirkungen auf Ihr gesamtes Wohlbefinden nicht.",
        PREMIUM_UPGRADE_TITLE: "Upgrade auf Premium",
        PREMIUM_UPGRADE_TEXT: (standard, premium) => `Sie haben die Basisversion des Berichts (${standard}) heruntergeladen. Um Ihre 3 Aktionsprioritäten, den 7-Tage-Digital-Detox-Plan und die detaillierten Trennungsressourcen freizuschalten, führen Sie ein Upgrade auf die Premium-Version (${premium}) durch.`,
        PRIORITY_PLAN_TITLE: "Ihr Priorisierter Aktionsplan",
        PRIORITY_NONE: "Es wurden keine spezifischen Risikoprioritäten identifiziert (niedrige Punktzahl). Fahren Sie direkt mit dem 7-Tage-Plan fort.",
        PRIORITY_SLEEP: "Aktivieren Sie den Modus „Nicht Stören“ um 22:00 Uhr und lassen Sie Ihr Telefon außerhalb des Schlafzimmers. Ersetzen Sie abendliches Scrollen durch das Lesen eines physischen Buches.",
        PRIORITY_ESCAPE: "Verwenden Sie Ihr Telefon nicht zur Flucht vor Langeweile, Traurigkeit oder Angst. Richten Sie einen 10-Minuten-„Puffer“ ein: Wenn Sie den Drang verspüren, warten Sie 10 Minuten und tun Sie etwas Nicht-Digitales (z. B. kurzer Spaziergang, heißes Getränk).",
        PRIORITY_ATTENTION: "Verwenden Sie die Digital Wellbeing (oder Screen Time) App, um die Nutzung der ablenkendsten Apps (z. B. soziale Medien, Spiele) während der Arbeits-/Lernstunden strikt zu begrenzen.",
        PRIORITY_RELATIONS: "Richten Sie klare „Telefonfreie Zonen“ ein: während der Mahlzeiten, Gesprächen mit Partner/Kindern und gesellschaftlichen Zusammenkünften. Stellen Sie das Telefon in den Flugmodus oder in einen anderen Raum, um vollständig abzuschalten.",
        PRIORITY_CONTROL: "Verwenden Sie 30-Minuten-Timer (Pomodoro-Technik) bei der Arbeit und nutzen Sie das Telefon nur während der Pausen. Halten Sie das Telefon außer Sicht (in einer Tasche oder Schublade) wenn es nicht unbedingt notwendig ist.",
        DAYS_PLAN_TITLE: "7-Tage-Digital-Detox-Plan",
        DAYS_PLAN_LOW: [
            "Tag 1 – Bewusste Überwachung: Notieren Sie einen Tag lang jedes Mal, wenn Sie Ihr Telefon entsperren und wonach Sie gesucht haben.", "Tag 2 – Selektive Benachrichtigungen: Deaktivieren Sie alle Benachrichtigungen außer den für die Arbeit oder Familie wesentlichen. Halten Sie nur 3 Messaging-Apps aktiv.", "Tag 3 – Die Heilige Mahlzeit: Während aller Mahlzeiten wird das Telefon in den Flugmodus und außer Sichtweite gebracht. Konzentrieren Sie sich auf Essen und Gespräch.", "Tag 4 – Offline-Alternative: Wählen Sie eine Aktivität (z. B. Lesen, Zeichnen, Kochen), die Sie stattdessen 30 Minuten am Tag anstelle des Scrollens auf dem Telefon ausführen werden.", "Tag 5 – Arbeitsbereich: Entfernen Sie das Smartphone aus Ihrem Sichtfeld, während Sie arbeiten/studieren. Bewahren Sie es in einer Schublade oder einem anderen Raum auf.", "Tag 6 – Gesellschaftlicher Abend: Gehen Sie mit Freunden aus und informieren Sie sie, dass Sie Ihr Telefon in Ihrer Tasche/Ihrem Beutel aufbewahren werden. Genießen Sie die Live-Interaktion.", "Tag 7 – Überprüfung und Wartung: Überprüfen Sie Ihre Fortschritte. Entscheiden Sie, welche neuen Gewohnheiten Sie für die nächste Woche beibehalten werden."
        ],
        DAYS_PLAN_MEDIUM: [
            "Tag 1 – Harte Grenze: Legen Sie ein Zeitlimit (z. B. 60 Minuten insgesamt) für die Apps fest, die Sie am meisten ablenken (z. B. Instagram, TikTok) mithilfe der Systemeinstellungen.", "Tag 2 – Nächtliche Grenze: Laden Sie Ihr Telefon in einem anderen Raum als Ihrem Schlafzimmer auf. Verwenden Sie einen traditionellen Wecker.", "Tag 3 – Aktive Trennung: Richten Sie einen 90-minütigen 'Deep Work'-Block ein, in dem das Telefon im Flugmodus und außer Reichweite ist.", "Tag 4 – Produktive Langeweile: Wenn Sie sich langweilen, greifen Sie nicht zum Telefon. Machen Sie 5 Minuten Dehnübungen oder planen Sie Ihre nächsten 3 Ziele.", "Tag 5 – Gespräch: Legen Sie Ihr Telefon während Einzelgesprächen mit dem Gesicht nach unten oder in Ihre Tasche. Üben Sie, es während der gesamten Dauer des Gesprächs nicht zu überprüfen.", "Tag 6 – Halbtägiger Digital Detox: Schalten Sie Ihr Telefon von 14:00 Uhr bis zum Abend vollständig aus und nur im Notfall wieder ein.", "Tag 7 – Überprüfung und Reflexion: Schreiben Sie eine Zusammenfassung darüber, wie Sie sich diese Woche gefühlt haben. Was waren die Vorteile? Was war der schwierigste Teil?"
        ],
        DAYS_PLAN_HIGH: [
            "Tag 1 – Visuelle Dekontamination: Verschieben Sie alle Social-Media-, Nachrichten- und Gaming-Apps in einen sekundären Ordner und verstecken Sie ihn. Legen Sie nur Dienstprogramme auf den Startbildschirm.", "Tag 2 – Totale Deaktivierung: Deinstallieren Sie vorübergehend die problematischste App (die, die Sie zwanghaft verwenden).", "Tag 3 – Die 20:00-Uhr-Regel: Stellen Sie das Telefon um 20:00 Uhr in den Flugmodus und in eine Schublade. Schalten Sie es erst beim Frühstück am nächsten Tag wieder ein.", "Tag 4 – Rückkehr zum Körper: Üben Sie 15 Minuten Achtsamkeit oder machen Sie einen Spaziergang ohne Kopfhörer oder Telefon. Erkennen Sie die Trennungsangst, ohne nachzugeben.", "Tag 5 – Entdecken Sie die Stimme wieder: Anstatt Textnachrichten oder E-Mails für Angelegenheiten zu senden, die mehr als zwei Austausche erfordern, rufen Sie die Person an.", "Tag 6 – Ganztägiger Detox: Schalten Sie das Smartphone komplett aus und lassen Sie es einen ganzen Tag lang zu Hause, widmen Sie sich nur Outdoor-Aktivitäten oder mit geliebten Menschen.", "Tag 7 – Externe Unterstützung: Teilen Sie Ihren Plan und Ihre Ergebnisse mit einem Freund oder Familienmitglied. Bitten Sie sie, Ihr 'Rechenschaftspartner' zu sein."
        ],
        RESOURCES_TITLE: "Empfohlene Ressourcen",
        RESOURCES_TEXT: `
**Kontroll-Apps:** Screen Time (iOS) / Digital Wellbeing (Android) zur Überwachung und **strengen Begrenzung** der Zeit, die mit den ablenkendsten Apps verbracht wird.
**Empfohlene Bücher:**
• 'Digital Minimalism' (Cal Newport): Ein grundlegendes Buch zur Neuorganisation Ihres digitalen Lebens, das sich nur auf die bewusste Nutzung von Technologie konzentriert, die einen Mehrwert bietet.
• 'How to Break Up with Your Phone' (C. Price): Eine praktische Schritt-für-Schritt-Anleitung zum Aufbau gesünderer Gewohnheiten und zur Befreiung von der Abhängigkeit.
**Fortgeschrittene Techniken:**
• **Pomodoro-Technik (für Fokus):** Besteht darin, die Arbeit in intensive 25-Minuten-Intervalle (Pomodoros) zu unterteilen, gefolgt von kurzen 5-Minuten-Pausen. Es vermittelt ein Gefühl der Dringlichkeit und reduziert die Versuchung, das Telefon zu überprüfen.
• **Deep Work Blocks:** Widmen Sie lange Sitzungen (typischerweise 90 Minuten) intensiver Arbeit ohne Ablenkung. Während dieser Blöcke muss das Telefon im Flugmodus und außer Sichtweite sein.
• **Abendliches Journaling (für Angst):** Schreiben Sie Gedanken, Sorgen und den Plan für den nächsten Tag vor dem Schlafengehen von Hand auf. Dies „leert den Geist“ und reduziert das Bedürfnis, das Smartphone in die Hand zu nehmen, um nächtliche Angstzustände zu beruhigen.
`,
        DISCLAIMER: "Haftungsausschluss: Dieser Bericht dient nur zu Informationszwecken und ersetzt keine professionelle Beratung.",
        PAYWALL_H3: "Ihr Ergebnis ist bereit!",
        PAYWALL_P: "Um Ihren detaillierten Bericht freizuschalten, wählen Sie unten die Kaufoption aus:",
        BTN_CALCULATE: "Ergebnis berechnen",
        FORM_TITLE: "Bewertung der Digitalen Abhängigkeit",
        BTN_STANDARD: (price) => `Basisbericht herunterladen (${price} - Fake)`,
        BTN_PREMIUM: (price) => `Premium-Bericht kaufen (${price} - Fake)`,
        BTN_PREMIUM_SUB: "(Beinhaltet: Aktionsplan, Prioritäten und 7-Tage-Plan)",
        ALERT_STANDARD: (price) => `Kaufsimulation abgeschlossen. Basisbericht wird generiert (${price}).`,
        ALERT_PREMIUM: (price) => `Kaufsimulation abgeschlossen. Premium-Bericht wird generiert (${price}).`,
        quizQuestions: [
            { text: "Ist das Erste, was Sie beim Aufwachen tun, Ihr Smartphone zu greifen?", name: "q1", category: "Sleep and Rituals" },
            { text: "Überprüfen Sie sofort Ihr Telefon, wenn es nicht in Reichweite ist?", name: "q2", category: "Escape and Emotions" },
            { text: "Haben Sie Schwierigkeiten, sich auf eine Aufgabe zu konzentrieren, ohne Benachrichtigungen zu überprüfen?", name: "q3", category: "Attention and Productivity" },
            { text: "Unterbrechen Sie Gespräche oder Mahlzeiten, um auf Nachrichten zu antworten oder auf den Bildschirm zu schauen?", name: "q4", category: "Relationships and Sociality" },
            { text: "Fühlen Sie sich ängstlich oder gereizt, wenn Sie stundenlang ohne Ihr Telefon auskommen müssen?", name: "q5", category: "Escape and Emotions" },
            { text: "Nutzen Sie es als Ihre einzige Quelle der Unterhaltung (z. B. wenn Sie in der Schlange stehen, im Badezimmer oder auf der Couch)?", name: "q6", category: "Control and Time" },
            { text: "Ist das Betrachten des Bildschirms das Letzte, was Sie vor dem Schlafen tun?", name: "q7", category: "Sleep and Rituals" },
            { text: "Entsperren Sie Ihr Telefon ohne bestimmten Grund?", name: "q8", category: "Attention and Productivity" },
            { text: "Fühlen Sie sich verpflichtet, soziale Netzwerke zu überprüfen, aus Angst, etwas zu verpassen (FOMO)?", name: "q9", category: "Escape and Emotions" },
            { text: "Haben Sie Schwierigkeiten, Zeitlimits für die App-Nutzung festzulegen?", name: "q10", category: "Control and Time" },
            { text: "Hatten Sie jemals Probleme beim Schlafen oder Aufwachen aufgrund der nächtlichen Nutzung?", name: "q11", category: "Sleep and Rituals" },
            { text: "Haben Ihre Freunde/Familie Sie wegen übermäßiger Handynutzung kritisiert?", name: "q12", category: "Relationships and Sociality" },
            { text: "Halten Sie es in Reichweite, auch wenn Sie am PC arbeiten oder lernen?", name: "q13", category: "Attention and Productivity" },
            { text: "Bemerken Sie, dass Sie das Telefon als Fluchtmechanismus vor negativen Emotionen (Langeweile, Angst) verwenden?", name: "q14", category: "Escape and Emotions" },
            { text: "Benutzen Sie das Telefon im Auto, auch wenn es nicht unbedingt notwendig ist?", name: "q15", category: "Control and Time" },
            { text: "Überprüfen Sie Ihr Telefon häufig, auch wenn Sie keine Benachrichtigungen erhalten?", name: "q16", category: "Attention and Productivity" },
            { text: "Bevorzugen Sie die Online-Kommunikation gegenüber der persönlichen Kommunikation?", name: "q17", category: "Relationships and Sociality" },
            { text: "Haben Sie Ihre Handynutzung jemals vor anderen verborgen?", name: "q18", category: "Escape and Emotions" },
            { text: "Schlafen Sie mit dem Telefon in der Hand oder auf Ihrem Bett ein?", name: "q19", category: "Sleep and Rituals" },
            { text: "Fühlen Sie sich aufgrund längerer Bildschirmzeit oft müde?", name: "q20", category: "Control and Time" },
        ],
        DATE_LOCALE: 'de-DE',
    },
};
        
       
                       
           
