// =========================================================================
// 1. CONFIGURAZIONE GLOBALE e DATI
// =========================================================================

// Assicurati che questi oggetti siano definiti prima di TRANSLATIONS e Logica
const CONFIG = {
    I18N_LOCALE: 'it', // Lingua di default
    MAX_SCORE: 60, // 20 domande * 3 punti max
    STANDARD_PRICE: 1.99,
    PREMIUM_PRICE: 7.99,
};

const AVAILABLE_LANGUAGES = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const QUIZ_QUESTIONS = [
    { id: 1, question: "Controlli il telefono come prima cosa al mattino e/o come ultima cosa prima di dormire?", axis: 'Sleep & Rituals' },
    { id: 2, question: "Il tuo sonno è disturbato perché usi dispositivi elettronici a letto o poco prima di coricarti?", axis: 'Sleep & Rituals' },
    { id: 3, question: "Ti svegli di notte per controllare notifiche o messaggi?", axis: 'Sleep & Rituals' },
    { id: 4, question: "Trovi difficile stabilire momenti 'phone-free' (es. durante i pasti o le conversazioni)?", axis: 'Sleep & Rituals' },
    { id: 5, question: "Le notifiche del telefono ti distraggono frequentemente da compiti o studi importanti?", axis: 'Productivity & Focus' },
    { id: 6, question: "Ti ritrovi a scorrere i social o navigare in internet senza un obiettivo specifico, perdendo tempo?", axis: 'Productivity & Focus' },
    { id: 7, question: "Rimandi impegni o attività offline (come pulire, fare esercizio) a causa del tempo passato online?", axis: 'Productivity & Focus' },
    { id: 8, question: "Hai difficoltà a mantenere la concentrazione su una singola attività per periodi prolungati (più di 30 minuti)?", axis: 'Productivity & Focus' },
    { id: 9, question: "Usare il tuo dispositivo è il tuo meccanismo principale per affrontare la noia, lo stress o i sentimenti negativi?", axis: 'Escape & Emotions' },
    { id: 10, question: "Ti senti ansioso o irritabile se non puoi accedere al telefono/internet per un periodo (es. batteria scarica o no Wi-Fi)?", axis: 'Escape & Emotions' },
    { id: 11, question: "Hai provato a ridurre il tempo che passi online, ma non ci sei riuscito?", axis: 'Escape & Emotions' },
    { id: 12, question: "Nascondi agli altri il tempo reale che passi sui dispositivi o su app specifiche?", axis: 'Escape & Emotions' },
    { id: 13, question: "Senti un bisogno fisico (come formicolio o irrequietezza) quando non puoi controllare il telefono?", axis: 'Habit & Compulsion' },
    { id: 14, question: "Controlli continuamente il telefono anche quando non ci sono notifiche attive o in arrivo?", axis: 'Habit & Compulsion' },
    { id: 15, question: "Senti FOMO (Fear of Missing Out) o l'obbligo di rispondere immediatamente ad ogni notifica o messaggio?", axis: 'Habit & Compulsion' },
    { id: 16, question: "Quando guardi un film o partecipi a una riunione, il tuo telefono è sempre a portata di mano e lo controlli regolarmente?", axis: 'Habit & Compulsion' },
    { id: 17, question: "Ti senti più a tuo agio a comunicare messaggi o sentimenti importanti tramite messaggistica piuttosto che di persona?", axis: 'Social & Presence' },
    { id: 18, question: "Le tue interazioni virtuali (social, giochi) hanno sostituito o ridotto significativamente il tempo trascorso con amici e familiari offline?", axis: 'Social & Presence' },
    { id: 19, question: "Sei costantemente preoccupato per la tua apparenza online (profilo, post, 'mi piace' ricevuti)?", axis: 'Social & Presence' },
    { id: 20, question: "Usi il telefono mentre guidi o cammini, rischiando la tua sicurezza o quella degli altri?", axis: 'Social & Presence' },
    
];

const RISK_PROFILES_I18N = {
    LOW: {
        minScore: 0, maxScore: 20, cssClass: 'risk-low',
        it: { level: 'Basso', profileText: 'Uso Consapevole', analysisText: 'La tua relazione con il digitale è sana. Sei in grado di stabilire limiti e l’uso del dispositivo non interferisce significativamente con la tua vita. Mantieni questa consapevolezza!' },
        en: { level: 'Low', profileText: 'Conscious Use', analysisText: 'Your relationship with digital technology is healthy. You are able to set limits and device use does not significantly interfere with your life. Maintain this awareness!' },
        es: { level: 'Bajo', profileText: 'Uso Consciente', analysisText: 'Tu relación con lo digital es saludable. Eres capaz de establecer límites y el uso del dispositivo no interfiere significativamente con tu vida. ¡Mantén esta conciencia!' },
        de: { level: 'Niedrig', profileText: 'Bewusster Konsum', analysisText: 'Ihre Beziehung zur digitalen Welt ist gesund. Sie können Grenzen setzen, und die Gerätenutzung beeinträchtigt Ihr Leben nicht wesentlich. Behalten Sie dieses Bewusstsein bei!' },
        fr: { level: 'Faible', profileText: 'Usage Conscient', analysisText: 'Votre relation avec le numérique est saine. Vous êtes capable de fixer des limites et l\'utilisation de l\'appareil n\'interfère pas significativement avec votre vie. Maintenez cette conscience !' }
    },
    MEDIUM: {
        minScore: 21, maxScore: 40, cssClass: 'risk-medium',
        it: { level: 'Medio', profileText: 'Rischio di Abitudine', analysisText: 'Stai entrando in una zona di rischio. L’uso del dispositivo è in aumento e comincia a influenzare la tua produttività e il tuo sonno. È il momento di stabilire nuove abitudini prima che diventi un problema serio.' },
        en: { level: 'Medium', profileText: 'Habit Risk', analysisText: 'You are entering a risk zone. Device use is increasing and is beginning to affect your productivity and sleep. It\'s time to establish new habits before it becomes a serious problem.' },
        es: { level: 'Medio', profileText: 'Riesgo de Hábito', analysisText: 'Estás entrando en una zona de riesgo. El uso del dispositivo está aumentando y comienza a afectar tu productividad y sueño. Es el momento de establecer nuevos hábitos antes de que se convierta en un problema serio.' },
        de: { level: 'Mittel', profileText: 'Gewohnheitsrisiko', analysisText: 'Sie treten in eine Risikozone ein. Die Gerätenutzung nimmt zu und beginnt, Ihre Produktivität und Ihren Schlaf zu beeinflussen. Es ist Zeit, neue Gewohnheiten zu etablieren, bevor es zu einem ernsten Problem wird.' },
        fr: { level: 'Moyen', profileText: 'Risque d\'Habitude', analysisText: 'Vous entrez dans une zone à risque. L\'utilisation de l\'appareil augmente et commence à affecter votre productivité et votre sommeil. Il est temps d\'établir de nouvelles habitudes avant que cela ne devienne un problème sérieux.' }
    },
    HIGH: {
        minScore: 41, maxScore: 60, cssClass: 'risk-high',
        it: { level: 'Alto', profileText: 'Potenziale Dipendenza', analysisText: 'Il tuo punteggio indica una dipendenza significativa dal tuo dispositivo, con un impatto negativo su salute mentale, fisica e relazioni. L\'urgenza di agire è elevata. Considera il piano d\'azione Premium e, se necessario, una consulenza professionale.' },
        en: { level: 'High', profileText: 'Potential Dependence', analysisText: 'Your score indicates a significant dependence on your device, negatively impacting mental, physical health, and relationships. The urgency to act is high. Consider the Premium action plan and, if necessary, professional consultation.' },
        es: { level: 'Alto', profileText: 'Dependencia Potencial', analysisText: 'Tu puntuación indica una dependencia significativa de tu dispositivo, con un impacto negativo en la salud mental, física y las relaciones. La urgencia de actuar es alta. Considera el plan de acción Premium y, si es necesario, una consulta profesional.' },
        de: { level: 'Hoch', profileText: 'Potenzielle Abhängigkeit', analysisText: 'Ihre Punktzahl deutet auf eine signifikante Abhängigkeit von Ihrem Gerät hin, die sich negativ auf die geistige und körperliche Gesundheit sowie auf Beziehungen auswirkt. Die Dringlichkeit zum Handeln ist hoch. Ziehen Sie den Premium-Aktionsplan und bei Bedarf professionelle Beratung in Betracht.' },
        fr: { level: 'Élevé', profile: 'Dépendance Potentielle', analysisText: 'Votre score indique une dépendance significative à votre appareil, impactant négativement la santé mentale, physique et les relations. L\'urgence d\'agir est élevée. Envisagez le plan d\'action Premium et, si nécessaire, une consultation professionnelle.' }
    }
};

const AXIS_PLANS_I18N = {
    'Sleep & Rituals': {
        cssClass: 'risk-medium',
        'it': {
            priorityTitle: 'Focus su Sonno e Rituali',
            priorityDetail: 'La tua azione prioritaria è stabilire una routine serale e mattutina per limitare l\'uso dello smartphone. Inizia a spegnere lo schermo almeno un\'ora prima di dormire per migliorare la qualità del sonno.',
            dayPlan: [
                'Giorno 1: Imposta la modalità "Non Disturbare" a partire dalle 22:00 (o 1 ora prima di dormire).',
                'Giorno 2: Tieni lo smartphone fuori dalla camera da letto e usa una sveglia analogica.',
                'Giorno 3: Usa il telefono per ascoltare un podcast o musica rilassante per 15 minuti prima di dormire, poi mettilo via.',
                'Giorno 4: Dedica i primi 30 minuti del mattino a un\'attività offline (colazione, lettura, stretching).',
                'Giorno 5: Rivedi i tuoi progressi sui 3 giorni precedenti e aggiusta gli orari di sonno se necessario.',
                'Giorno 6: Fai un "Digital Detox" di 2 ore prima di andare a letto.',
                'Giorno 7: Pianifica come mantenere la routine stabilita per il prossimo mese.'
            ]
        },
        'en': { /* ... */ }
    },
    'Productivity & Focus': {
        cssClass: 'risk-low',
        'it': {
            priorityTitle: 'Focus su Produttività e Concentrazione',
            priorityDetail: 'Il tuo punteggio indica che le interruzioni digitali stanno limitando la tua capacità di concentrazione. L\'obiettivo è strutturare i momenti di lavoro/studio senza distrazioni.',
            dayPlan: [
                'Giorno 1: Identifica le tue 3 attività più importanti della giornata e disattiva tutte le notifiche durante la loro esecuzione.',
                'Giorno 2: Utilizza la Tecnica del Pomodoro (25 minuti di focus, 5 minuti di pausa) con il telefono in un\'altra stanza.',
                'Giorno 3: Disattiva le notifiche per tutte le app non essenziali (social media, giochi).',
                'Giorno 4: Crea una "zona di lavoro" senza telefono per almeno un\'ora al giorno.',
                'Giorno 5: Fai un riepilogo della settimana: quante volte hai ceduto alla distrazione?',
                'Giorno 6: Limita il controllo delle email/messaggi a 3 orari fissi durante la giornata.',
                'Giorno 7: Valuta l\'efficacia del tuo lavoro in blocco e pianifica gli obiettivi per la settimana successiva.'
            ]
        },
        'en': { /* ... */ }
    },
    'Escape & Emotions': {
        cssClass: 'risk-high',
        'it': {
            priorityTitle: 'Focus su Fuga ed Emozioni',
            priorityDetail: 'Il tuo punteggio suggerisce che utilizzi il telefono come principale meccanismo di fuga dallo stress o dalle emozioni negative. L\'obiettivo è sostituire l\'uso del telefono con strategie di coping emotive più salutari.',
            dayPlan: [
                'Giorno 1: Identifica le tue 3 app "di fuga" principali e mettile in una cartella secondaria.',
                'Giorno 2: Quando senti l\'impulso di usare il telefono per sfuggire, prova la tecnica dei 5 minuti di meditazione o journaling.',
                'Giorno 3: Scrivi una lista di 5 attività offline che ti danno gioia e usale come alternativa quando sei annoiato.',
                'Giorno 4: Invece di controllare i social, chiama o incontra un amico per un supporto reale.',
                'Giorno 5: Rivedi le tue emozioni: quali scatenano il bisogno di "fuga" digitale?',
                'Giorno 6: Dedica 30 minuti a un hobby che non coinvolge lo schermo (es. disegnare, suonare, cucinare).',
                'Giorno 7: Pianifica un\'uscita o un\'attività sociale senza telefono.'
            ]
        },
        'en': { /* ... */ }
    },
    'Habit & Compulsion': {
        cssClass: 'risk-medium',
        'it': {
            priorityTitle: 'Focus su Abitudine e Compulsione',
            priorityDetail: 'Il tuo punteggio evidenzia un forte modello di controllo compulsivo. La tua azione prioritaria è interrompere le abitudini automatiche e ritrovare il controllo sui tuoi gesti.',
            dayPlan: [
                'Giorno 1: Sposta le app che usi compulsivamente in un posto scomodo (es. l\'ultima schermata del telefono).',
                'Giorno 2: Controlla l\'ora usando un orologio da polso o un orologio da muro, non il telefono.',
                'Giorno 3: Metti lo smartphone in modalità "scala di grigi" (bianco e nero) per un giorno intero.',
                'Giorno 4: Scarica un\'app di tracciamento per monitorare quanto tempo trascorri sulle app a cui sei più legato.',
                'Giorno 5: Scegli 3 momenti in cui metti il telefono completamente in silenzioso (es. pranzo, corsa, cena).',
                'Giorno 6: Rimuovi lo smartphone da una situazione in cui lo usi abitualmente (es. bagno, in fila al supermercato).',
                'Giorno 7: Rimuovi la barra di ricerca rapida o i widget che ti portano a navigare senza scopo.'
            ]
        },
        'en': { /* ... */ }
    },
    'Social & Presence': {
        cssClass: 'risk-low',
        'it': {
            priorityTitle: 'Focus su Socialità e Presenza',
            priorityDetail: 'Le tue risposte indicano che la presenza online sta interferendo con la tua vita sociale e la tua capacità di goderti il momento. La priorità è bilanciare il tempo sullo schermo con interazioni e vita reale.',
            dayPlan: [
                'Giorno 1: Quando sei con altre persone, metti il telefono in modalità silenziosa, capovolto e fuori dalla vista.',
                'Giorno 2: Lascia il telefono a casa o in macchina durante un pasto o un\'uscita di 1-2 ore.',
                'Giorno 3: Quando scatti foto, resisti alla tentazione di pubblicarle subito sui social media.',
                'Giorno 4: Fai un "check-in" consapevole con te stesso/a: "Sono pienamente presente in ciò che sto facendo ora?".',
                'Giorno 5: Pianifica un\'attività con gli amici o la famiglia in cui sia vietato l\'uso del telefono.',
                'Giorno 6: Limita il tempo sui social media a 30 minuti totali (o meno) per l\'intera giornata.',
                'Giorno 7: Valuta i benefici che hai tratto da una maggiore presenza nel mondo reale.'
            ]
        },
        'en': { /* ... */ }
    },
    'Sleep & Rituals': {
        en: {
            priorityTitle: 'Focus on Sleep & Rituals',
            priorityDetail: 'Your biggest challenge is disconnecting before sleep and resisting the urge to check your phone upon waking. Your sleep quality is at risk. Act immediately to restore night/day boundaries.',
            dayPlan: [
                'Day 1: Remove your phone from the bedroom and use an analog alarm clock.',
                'Day 2: Set a "digital curfew" 90 minutes before sleep.',
                'Day 3: Replace evening scrolling with 10 minutes of meditation or reading.',
                'Day 4: Do not look at your phone screen before breakfast.',
                'Day 5: Rediscover a relaxing offline hobby to do before bed.',
                'Day 6: Take a morning walk instead of checking online news.',
                'Day 7: Reflect on how your energy upon waking has improved.'
            ]
        },
        es: { /* ... (Traduzione spagnola completa per l'asse Sonno) ... */ },
        de: { /* ... (Traduzione tedesca completa per l'asse Sonno) ... */ },
        fr: { /* ... (Traduzione francese completa per l'asse Sonno) ... */ }
    },
    'Productivity & Focus': {
        cssClass: 'axis-productivity',
        it: {
            priorityTitle: 'Focus su Produttività e Focus',
            priorityDetail: 'Le distrazioni digitali stanno seriamente compromettendo la tua capacità di concentrazione. Le notifiche e lo scrolling senza meta ti impediscono di completare compiti importanti. Devi riprendere il controllo del tuo tempo di lavoro/studio.',
            dayPlan: [
                'Giorno 1: Disattiva TUTTE le notifiche non essenziali (lascia solo chiamate/SMS).',
                'Giorno 2: Lavora per blocchi di 45 minuti in modalità "aereo".',
                'Giorno 3: Utilizza un’app per tracciare e limitare il tempo sui social (es. Digital Wellbeing).',
                'Giorno 4: Stabilisci tre obiettivi "deep work" al giorno, senza telefono.',
                'Giorno 5: Riorganizza la schermata principale, lasciando solo gli strumenti essenziali.',
                'Giorno 6: Dedica 30 minuti a settimana a pianificare le attività offline.',
                'Giorno 7: Rivedi i blocchi di tempo e valuta il miglioramento del tuo focus.'
            ]
        },
        en: {
            priorityTitle: 'Focus on Productivity & Focus',
            priorityDetail: 'Digital distractions are seriously compromising your ability to concentrate. Notifications and aimless scrolling prevent you from completing important tasks. You need to regain control of your work/study time.',
            dayPlan: [
                'Day 1: Turn off ALL non-essential notifications (leave only calls/SMS).',
                'Day 2: Work in 45-minute blocks in "airplane mode".',
                'Day 3: Use an app to track and limit social media time (e.g., Digital Wellbeing).',
                'Day 4: Set three "deep work" goals per day, without the phone.',
                'Day 5: Reorganize your home screen, leaving only essential tools.',
                'Day 6: Dedicate 30 minutes a week to planning offline activities.',
                'Day 7: Review your time blocks and assess your focus improvement.'
            ]
        },
        es: { /* ... (Traduzione spagnola completa per l'asse Produttività) ... */ },
        de: { /* ... (Traduzione tedesca completa per l'asse Produttività) ... */ },
        fr: { /* ... (Traduzione francese completa per l'asse Produttività) ... */ }
    },
    'Escape & Emotions': {
        cssClass: 'axis-escape',
        it: {
            priorityTitle: 'Focus su Fuga ed Emozioni',
            priorityDetail: "Il tuo telefono è diventato il tuo principale meccanismo di coping per lo stress o la noia, un chiaro segno di 'dipendenza emotiva' dal digitale. Hai bisogno di alternative sane per affrontare le emozioni negative e il vuoto.",
            dayPlan: [
                'Giorno 1: Identifica 5 situazioni che innescano la ricerca dello smartphone (es. attesa, noia).',
                'Giorno 2: Quando senti un innesco, fai 10 respiri profondi invece di prendere il telefono.',
                'Giorno 3: Installa un’app di mindfulness o diario per tracciare le tue reazioni emotive.',
                'Giorno 4: Pianifica un’attività "di riserva" offline per i momenti di noia (es. lettura, cruciverba).',
                'Giorno 5: Parla con un amico/familiare delle tue emozioni invece di postarle online.',
                'Giorno 6: Dedica 1 ora a un hobby creativo che non richieda uno schermo.',
                'Giorno 7: Riconosci e celebra le volte in cui hai gestito la noia senza lo schermo.'
            ]
        },
        en: {
            priorityTitle: 'Focus on Escape & Emotions',
            priorityDetail: "Your phone has become your main coping mechanism for stress or boredom, a clear sign of 'emotional dependence' on digital. You need healthy alternatives to deal with negative emotions and emptiness.",
            dayPlan: [
                'Day 1: Identify 5 situations that trigger smartphone checking (e.g., waiting, boredom).',
                'Day 2: When you feel a trigger, take 10 deep breaths instead of grabbing the phone.',
                'Day 3: Install a mindfulness or journaling app to track your emotional reactions.',
                'Day 4: Plan a "backup" offline activity for moments of boredom (e.g., reading, crossword puzzle).',
                'Day 5: Talk to a friend/family member about your emotions instead of posting them online.',
                'Day 6: Dedicate 1 hour to a creative hobby that doesn\'t require a screen.',
                'Day 7: Recognize and celebrate the times you managed boredom without the screen.'
            ]
        },
        es: { /* ... (Traduzione spagnola completa per l'asse Emozioni) ... */ },
        de: { /* ... (Traduzione tedesca completa per l'asse Emozioni) ... */ },
        fr: { /* ... (Traduzione francese completa per l'asse Emozioni) ... */ }
    },
    'Habit & Compulsion': {
        cssClass: 'axis-habit',
        it: {
            priorityTitle: 'Focus su Abitudine e Compulsione',
            priorityDetail: "Il controllo costante e l'impulso fisico a usare il telefono suggeriscono che l'uso è diventato involontario e compulsivo. Agire per rompere questo ciclo è fondamentale per recuperare il controllo.",
            dayPlan: [
                'Giorno 1: Sposta le app più usate (social, email) in una cartella secondaria.',
                'Giorno 2: Controlla il telefono solo in momenti prestabiliti (es. 9:00, 13:00, 18:00).',
                'Giorno 3: Utilizza una fascia elastica al polso: scattala ogni volta che controlli compulsivamente il telefono.',
                'Giorno 4: Stabilisci un "parcheggio" per il telefono quando sei a casa (es. in un cassetto).',
                'Giorno 5: Rimuovi lo schermo del telefono dalla vista durante le pause lavorative.',
                'Giorno 6: Fai un "mini-detox" di 3 ore senza telefono.',
                'Giorno 7: Chiedi a un amico o partner di farti notare quando controlli il telefono involontariamente.'
            ]
        },
        en: {
            priorityTitle: 'Focus on Habit & Compulsion',
            priorityDetail: 'Constant checking and the physical impulse to use the phone suggest that use has become involuntary and compulsive. Acting to break this cycle is crucial to regaining control.',
            dayPlan: [
                'Day 1: Move the most used apps (social, email) to a secondary folder.',
                'Day 2: Check your phone only at predetermined times (e.g., 9:00, 1:00 PM, 6:00 PM).',
                'Day 3: Use a rubber band on your wrist: snap it every time you compulsively check your phone.',
                'Day 4: Establish a "parking spot" for your phone when you are home (e.g., in a drawer).',
                'Day 5: Remove the phone screen from sight during work breaks.',
                'Day 6: Take a 3-hour "mini-detox" without your phone.',
                'Day 7: Ask a friend or partner to point out when you involuntarily check your phone.'
            ]
        },
        es: { /* ... (Traduzione spagnola completa per l'asse Abitudine) ... */ },
        de: { /* ... (Traduzione tedesca completa per l'asse Abitudine) ... */ },
        fr: { /* ... (Traduzione francese completa per l'asse Abitudine) ... */ }
    },
    'Social & Presence': {
        cssClass: 'axis-social',
        it: {
            priorityTitle: 'Focus su Sociale e Presenza',
            priorityDetail: "L'interazione virtuale ha iniziato a sostituire quella reale, e l'ansia da 'Fear of Missing Out' (FOMO) domina la tua vita. È necessario ristabilire la priorità delle relazioni e della sicurezza nel mondo fisico.",
            dayPlan: [
                'Giorno 1: Silenzia le notifiche dei gruppi social più attivi per 24 ore.',
                'Giorno 2: Lascia il telefono in borsa/tasca durante tutti i pasti.',
                'Giorno 3: Incontra un amico per un caffè o una passeggiata, lasciando i telefoni in modalità aereo.',
                'Giorno 4: Impegnati a non usare il telefono mentre cammini o guidi (zero tolleranza).',
                'Giorno 5: Limita la lettura e la risposta ai messaggi a 2 sessioni al giorno.',
                'Giorno 6: Pubblica un solo post (o nessuno) al giorno, concentrandoti sulla "presenza" nella vita reale.',
                'Giorno 7: Scrivi un messaggio a una persona che non senti da tempo, proponendo un incontro offline.'
            ]
        },
        en: {
            priorityTitle: 'Focus on Social & Presence',
            priorityDetail: 'Virtual interaction has begun to replace real interaction, and the anxiety of "Fear of Missing Out" (FOMO) dominates your life. It is necessary to re-establish the priority of relationships and safety in the physical world.',
            dayPlan: [
                'Day 1: Mute notifications for the most active social groups for 24 hours.',
                'Day 2: Leave your phone in your bag/pocket during all meals.',
                'Day 3: Meet a friend for coffee or a walk, leaving your phones on airplane mode.',
                'Day 4: Commit to not using your phone while walking or driving (zero tolerance).',
                'Day 5: Limit reading and responding to messages to 2 sessions per day.',
                'Day 6: Post only one post (or none) per day, focusing on "presence" in real life.',
                'Day 7: Write a message to someone you haven\'t heard from in a while, proposing an offline meeting.'
            ]
        },
        es: { /* ... (Traduzione spagnola completa per l'asse Sociale) ... */ },
        de: { /* ... (Traduzione tedesca completa per l'asse Sociale) ... */ },
        fr: { /* ... (Traduzione francese completa per l'asse Sociale) ... */ }
    }
};

const RESOURCES_I18N = {
    it: "Risorse aggiuntive consigliate: liberi dal 'Dopamine Detox' di Anna Lembke, app di mindfulness (es. Headspace o Calm) e un tracker di abitudini.",
    en: "Recommended additional resources: 'Dopamine Detox' by Anna Lembke, mindfulness apps (e.g., Headspace or Calm), and a habit tracker.",
    es: "Recursos adicionales recomendados: libre de 'Dopamine Detox' de Anna Lembke, aplicaciones de mindfulness (ej. Headspace o Calm) y un rastreador de hábitos.",
    de: "Empfohlene zusätzliche Ressourcen: 'Dopamine Detox' von Anna Lembke, Achtsamkeits-Apps (z. B. Headspace oder Calm) und ein Gewohnheits-Tracker.",
    fr: "Ressources supplémentaires recommandées : libre de 'Dopamine Detox' d'Anna Lembke, applications de pleine conscience (ex. Headspace ou Calm) et un suivi d'habitudes."
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
        INTRO_H2: "Verifica la Tua Relazione con lo Smartphone",
        INTRO_P: "Rispondi sinceramente alle 20 domande per scoprire il tuo livello di rischio e ottenere il tuo report d'azione personalizzato.",
        INTRO_NAME_SPAN: "Inserisci il tuo nome (opzionale, per personalizzare il report):",
        PAYWALL_H3: "Ciao {name}, il Tuo Risultato è Pronto!",
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

        ANSWER_0: 'Raramente',
        ANSWER_1: 'A volte',
        ANSWER_2: 'Spesso',
        ANSWER_3: 'Sempre',

        'AXIS_Sleep_&_Rituals': 'Sonno e Rituali',
        'AXIS_Productivity_&_Focus': 'Produttività e Concentrazione',
        'AXIS_Escape_&_Emotions': 'Fuga ed Emozioni',
        'AXIS_Habit_&_Compulsion': 'Abitudine e Compulsione',
        'AXIS_Social_&_Presence': 'Socialità e Presenza',

        Q1: "Controlli il telefono come prima cosa al mattino e/o come ultima cosa prima di dormire?",
        Q2: "Il tuo sonno è disturbato perché usi dispositivi elettronici a letto o poco prima di coricarti?",
        Q3: "Ti svegli di notte per controllare notifiche o messaggi?",
        Q4: "Trovi difficile stabilire momenti 'phone-free' (es. durante i pasti o le conversazioni)?",
        Q5: "Le notifiche del telefono ti distraggono frequentemente da compiti o studi importanti?",
        Q6: "Ti ritrovi a scorrere i social o navigare in internet senza un obiettivo specifico, perdendo tempo?",
        Q7: "Rimandi impegni o attività offline (come pulire, fare esercizio) a causa del tempo passato online?",
        Q8: "Hai difficoltà a mantenere la concentrazione su una singola attività per periodi prolungati (più di 30 minuti)?",
        Q9: "Usare il tuo dispositivo è il tuo meccanismo principale per affrontare la noia, lo stress o i sentimenti negativi?",
        Q10: "Ti senti ansioso o irritabile se non puoi accedere al telefono/internet per un periodo (es. batteria scarica o no Wi-Fi)?",
        Q11: "Hai provato a ridurre il tempo che passi online, ma non ci sei riuscito?",
        Q12: "Nascondi agli altri il tempo reale che passi sui dispositivi o su app specifiche?",
        Q13: "Senti un bisogno fisico (come formicolio o irrequietezza) quando non puoi controllare il telefono?",
        Q14: "Controlli continuamente il telefono anche quando non ci sono notifiche attive o in arrivo?",
        Q15: "Senti FOMO (Fear of Missing Out) o l'obbligo di rispondere immediatamente ad ogni notifica o messaggio?",
        Q16: "Quando guardi un film o partecipi a una riunione, il tuo telefono è sempre a portata di mano e lo controlli regolarmente?",
        Q17: "Ti senti più a tuo agio a comunicare messaggi o sentimenti importanti tramite messaggistica piuttosto che di persona?",
        Q18: "Le tue interazioni virtuali (social, giochi) hanno sostituito o ridotto significativamente il tempo trascorso con amici e familiari offline?",
        Q19: "Sei costantemente preoccupato per la tua apparenza online (profilo, post, 'mi piace' ricevuti)?",
        Q20: "Usi il telefono mentre guidi o cammini, rischiando la tua sicurezza o quella degli altri?"
        score_title: "Il Tuo Punteggio",
        answers_title: "Le Tue Risposte Dettagliate al Quiz",
    },
    en: {
        FORM_TITLE: "Digital Dependence Assessment",
        BTN_CALCULATE: "Calculate Result",
        ALERT_COMPLETE_QUIZ: "Please answer all 20 questions before calculating the result.",
        DEFAULT_USERNAME: "User",
        INTRO_H2: "Check Your Relationship with Your Smartphone",
        INTRO_P: "Answer 20 questions honestly to discover your risk level and get your personalized action report.",
        INTRO_NAME_SPAN: "Enter your name (optional, to personalize the report):",
        // MODIFICATO
        PAYWALL_H3: "Hi {name}, Your Result is Ready!", 
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

        // CHIAVI DEL QUIZ E DEGLI ASSI DI RISCHIO
        ANSWER_0: 'Rarely',
        ANSWER_1: 'Sometimes',
        ANSWER_2: 'Often',
        ANSWER_3: 'Always',
        AXIS_Sleep_Rituals: 'Sleep and Rituals',
        AXIS_Productivity_Focus: 'Productivity and Focus',
        AXIS_Escape_Emotions: 'Escape and Emotions',
        AXIS_Habit_Compulsion: 'Habit and Compulsion',
        AXIS_Social_Presence: 'Social and Presence',

        // Domande (Q1-Q20)
        Q1: "Do you check your phone first thing in the morning and/or last thing before sleeping?",
        Q2: "Is your sleep disturbed because you use electronic devices in bed or just before?",
        Q3: "Do you wake up at night to check notifications or messages?",
        Q4: "Do you find it difficult to establish 'phone-free' times (e.g., during meals or conversations)?",
        Q5: "Do phone notifications frequently distract you from important tasks or studies?",
        Q6: "Do you find yourself scrolling through social media or browsing the internet without a specific goal, wasting time?",
        Q7: "Do you postpone offline commitments or activities (like cleaning, exercise) because of time spent online?",
        Q8: "Do you have trouble maintaining focus on a single activity for prolonged periods (more than 30 minutes)?",
        Q9: "Is using your device your main mechanism for coping with boredom, stress, or negative feelings?",
        Q10: "Do you feel anxious or irritable if you can't access your phone/internet for a period of time (e.g., low battery or no Wi-Fi)?",
        Q11: "Have you tried to reduce the time spent online, but failed?",
        Q12: "Do you hide the real time you spend on devices or specific apps from others?",
        Q13: "Do you feel a physical need (like tingling or restlessness) when you can't check your phone?",
        Q14: "Do you continuously check your phone even when there are no active or incoming notifications?",
        Q15: "Do you feel FOMO (Fear of Missing Out) or the obligation to respond immediately to every notification or message?",
        Q16: "When watching a movie or attending a meeting, is your phone always close and do you check it regularly?",
        Q17: "Do you feel more comfortable communicating important messages or feelings through messaging rather than in person?",
        Q18: "Have your virtual interactions (social media, games) replaced or significantly reduced time spent with friends and family offline?",
        Q19: "Are you constantly worried about your online appearance (profile, posts, 'likes' received)?",
        Q20: "Do you use your phone while driving or walking, risking your safety or that of others?",
            score_title: "Your Score",
        answers_title: "Your Detailed Quiz Answers",
    },
    es: {
        FORM_TITLE: "Evaluación de la Dependencia Digital",
        BTN_CALCULATE: "Calcular Resultado",
        ALERT_COMPLETE_QUIZ: "Por favor, responde a las 20 preguntas antes de calcular el resultado.",
        DEFAULT_USERNAME: "Usuario",
        INTRO_H2: "Verifica Tu Relación con el Smartphone",
        INTRO_P: "Responde sinceramente a las 20 preguntas para descubrir tu nivel de riesgo y obtener tu informe de acción personalizado.",
        INTRO_NAME_SPAN: "Introduce tu nombre (opcional, para personalizar el informe):",
        // MODIFICATO
        PAYWALL_H3: "Hola {name}, ¡Tu Resultado Está Listo!",
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

        // CHIAVI DEL QUIZ E DEGLI ASSI DI RISCHIO
        ANSWER_0: 'Raramente',
        ANSWER_1: 'A veces',
        ANSWER_2: 'A menudo',
        ANSWER_3: 'Siempre',
        AXIS_Sleep_Rituals: 'Sueño y Rituales',
        AXIS_Productivity_Focus: 'Productividad y Enfoque',
        AXIS_Escape_Emotions: 'Escape y Emociones',
        AXIS_Habit_Compulsion: 'Hábito y Compulsión',
        AXIS_Social_Presence: 'Social y Presencia',

        // Domande (Q1-Q20)
        Q1: "¿Revisas el teléfono a primera hora de la mañana y/o a última hora antes de dormir?",
        Q2: "¿Tu sueño se ve interrumpido porque usas dispositivos electrónicos en la cama o justo antes de acostarte?",
        Q3: "¿Te despiertas por la noche para revisar notificaciones o mensajes?",
        Q4: "¿Te resulta difícil establecer momentos 'sin teléfono' (por ejemplo, durante las comidas o conversaciones)?",
        Q5: "¿Las notificaciones del teléfono te distraen frecuentemente de tareas o estudios importantes?",
        Q6: "¿Te encuentras navegando en redes sociales o internet sin un objetivo específico, perdiendo tiempo?",
        Q7: "¿Pospones compromisos o actividades fuera de línea (como limpiar, hacer ejercicio) debido al tiempo que pasas en línea?",
        Q8: "¿Te cuesta mantener la concentración en una sola actividad por períodos prolongados (más de 30 minutos)?",
        Q9: "¿Usar tu dispositivo es tu mecanismo principal para lidiar con el aburrimiento, el estrés o los sentimientos negativos?",
        Q10: "¿Te sientes ansioso o irritable si no puedes acceder a tu teléfono/internet por un tiempo (ej. batería baja o sin Wi-Fi)?",
        Q11: "¿Has intentado reducir el tiempo que pasas en línea, pero no lo has logrado?",
        Q12: "¿Ocultas a otros el tiempo real que pasas en dispositivos o aplicaciones específicas?",
        Q13: "¿Sientes una necesidad física (como hormigueo o inquietud) cuando no puedes revisar tu teléfono?",
        Q14: "¿Revisas continuamente el teléfono incluso cuando no hay notificaciones activas o entrantes?",
        Q15: "¿Sientes FOMO (Miedo a Perderse Algo) o la obligación de responder inmediatamente a cada notificación o mensaje?",
        Q16: "Cuando ves una película o asistes a una reunión, ¿tu teléfono está siempre al alcance y lo revisas regularmente?",
        Q17: "¿Te sientes más cómodo comunicando mensajes o sentimientos importantes a través de la mensajería en lugar de en persona?",
        Q18: "¿Tus interacciones virtuales (redes sociales, juegos) han reemplazado o reducido significativamente el tiempo que pasas con amigos y familiares fuera de línea?",
        Q19: "¿Te preocupa constantemente tu apariencia en línea (perfil, publicaciones, 'me gusta' recibidos)?",
        Q20: "¿Usas el teléfono mientras conduces o caminas, poniendo en riesgo tu seguridad o la de otros?",
            score_title: "Tu Puntuación",
        answers_title: "Tus respuestas detalladas del cuestionario",
    },
    de: {
        FORM_TITLE: "Bewertung der Digitalen Abhängigkeit",
        BTN_CALCULATE: "Ergebnis Berechnen",
        ALERT_COMPLETE_QUIZ: "Bitte beantworten Sie alle 20 Fragen, bevor Sie das Ergebnis berechnen.",
        DEFAULT_USERNAME: "Benutzer",
        INTRO_H2: "Überprüfen Sie Ihre Beziehung zu Ihrem Smartphone",
        INTRO_P: "Beantworten Sie 20 Fragen ehrlich, um Ihr Risikoniveau zu erfahren und Ihren personalisierten Aktionsbericht zu erhalten.",
        INTRO_NAME_SPAN: "Geben Sie Ihren Namen ein (optional, zur Personalisierung des Berichts):",
        // MODIFICATO
        PAYWALL_H3: "Hallo {name}, Ihr Ergebnis ist Fertig!",
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
        RISK4: "Soziale Isolation: Virtuelle Interaktion ersetzt reale Interaktion.",
        SECTION3_TITLE: "💡 Praktische Tipps",
        TIP1: "Legen Sie tägliche Limits für die am häufigsten verwendeten Apps fest.",
        TIP2: "Deaktivieren Sie nicht essentielle Benachrichtigungen.",
        TIP3: "Richten Sie 'telefonfreie' Momente ein (während der Mahlzeiten, vor dem Schlafen).",
        TIP4: "Widmen Sie Zeit Offline-Aktivitäten wie Sport, Lesen oder Meditation.",
        CTA_TITLE: "Möchten Sie herausfinden, wie hoch Ihr Risiko ist?",
        CTA_BUTTON: "Machen Sie jetzt den Test",

        // CHIAVI DEL QUIZ E DEGLI ASSI DI RISCHIO
        ANSWER_0: 'Selten',
        ANSWER_1: 'Manchmal',
        ANSWER_2: 'Oft',
        ANSWER_3: 'Immer',
        AXIS_Sleep_Rituals: 'Schlaf und Rituale',
        AXIS_Productivity_Focus: 'Produktivität und Fokus',
        AXIS_Escape_Emotions: 'Flucht und Emotionen',
        AXIS_Habit_Compulsion: 'Gewohnheit und Zwang',
        AXIS_Social_Presence: 'Soziales und Präsenz',

        // Domande (Q1-Q20)
        Q1: "Überprüfen Sie Ihr Telefon als Erstes am Morgen und/oder als Letztes vor dem Schlafengehen?",
        Q2: "Ist Ihr Schlaf gestört, weil Sie elektronische Geräte im Bett oder kurz vor dem Schlafengehen benutzen?",
        Q3: "Wachen Sie nachts auf, um Benachrichtigungen oder Nachrichten zu überprüfen?",
        Q4: "Fällt es Ihnen schwer, 'telefonfreie' Momente festzulegen (z. B. während der Mahlzeiten oder Gesprächen)?",
        Q5: "Lenken Sie Telefonbenachrichtigungen häufig von wichtigen Aufgaben oder Studien ab?",
        Q6: "Scrollen Sie durch soziale Medien oder surfen Sie im Internet ohne ein bestimmtes Ziel und verlieren dabei Zeit?",
        Q7: "Schieben Sie Offline-Verpflichtungen oder -Aktivitäten (wie Putzen, Sport) aufgrund der online verbrachten Zeit auf?",
        Q8: "Haben Sie Schwierigkeiten, die Konzentration über längere Zeiträume (mehr als 30 Minuten) auf eine einzige Aktivität aufrechtzuerhalten?",
        Q9: "Ist die Nutzung Ihres Geräts Ihr Hauptmechanismus zur Bewältigung von Langeweile, Stress oder negativen Gefühlen?",
        Q10: "Fühlen Sie sich ängstlich oder gereizt, wenn Sie für eine gewisse Zeit keinen Zugriff auf Ihr Telefon/Internet haben (z. B. niedriger Akkustand oder kein WLAN)?",
        Q11: "Haben Sie versucht, die online verbrachte Zeit zu reduzieren, sind aber gescheitert?",
        Q12: "Verbergen Sie vor anderen die tatsächliche Zeit, die Sie auf Geräten oder bestimmten Apps verbringen?",
        Q13: "Verspüren Sie ein körperliches Bedürfnis (wie Kribbeln oder Unruhe), wenn Sie Ihr Telefon nicht überprüfen können?",
        Q14: "Überprüfen Sie Ihr Telefon ständig, auch wenn keine aktiven oder eingehenden Benachrichtigungen vorliegen?",
        Q15: "Fühlen Sie FOMO (Fear of Missing Out) oder die Verpflichtung, sofort auf jede Benachrichtigung oder Nachricht zu antworten?",
        Q16: "Wenn Sie einen Film ansehen oder an einem Meeting teilnehmen, ist Ihr Telefon immer griffbereit und überprüfen Sie es regelmäßig?",
        Q17: "Fühlen Sie sich wohler dabei, wichtige Nachrichten oder Gefühle per Messaging anstatt persönlich zu kommunizieren?",
        Q18: "Haben Ihre virtuellen Interaktionen (soziale Medien, Spiele) die Zeit mit Freunden und Familie offline ersetzt oder erheblich reduziert?",
        Q19: "Sind Sie ständig besorgt über Ihr Online-Erscheinungsbild (Profil, Posts, erhaltene 'Likes')?",
        Q20: "Benutzen Sie Ihr Telefon beim Fahren oder Gehen und gefährden so Ihre oder die Sicherheit anderer?",
            score_title: "Dein Ergebnis",
        answers_title: "Deine detaillierten Quiz-Antworten",
    },
    fr: {
        FORM_TITLE: "Évaluation de la Dépendance Numérique",
        BTN_CALCULATE: "Calculer le Résultat",
        ALERT_COMPLETE_QUIZ: "Veuillez répondre aux 20 questions avant de calculer le résultat.",
        DEFAULT_USERNAME: "Utilisateur",
        INTRO_H2: "Vérifiez Votre Relation avec Votre Smartphone",
        INTRO_P: "Répondez honnêtement aux 20 questions pour découvrir votre niveau de risque et obtenir votre rapport d'action personnalisé.",
        INTRO_NAME_SPAN: "Entrez votre nom (facultatif, pour personnaliser le rapport) :",
        // MODIFICATO
        PAYWALL_H3: "Salut {name}, Votre Résultat est Prêt !",
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

        // CHIAVI DEL QUIZ E DEGLI ASSI DI RISCHIO
        ANSWER_0: 'Rarement',
        ANSWER_1: 'Parfois',
        ANSWER_2: 'Souvent',
        ANSWER_3: 'Toujours',
        AXIS_Sleep_Rituals: 'Sommeil et Rituels',
        AXIS_Productivity_Focus: 'Productivité et Concentration',
        AXIS_Escape_Emotions: 'Évasion et Émotions',
        AXIS_Habit_Compulsion: 'Habitude et Compulsion',
        AXIS_Social_Presence: 'Social et Présence',

        // Domande (Q1-Q20)
        Q1: "Vérifiez-vous votre téléphone dès le matin et/ou en dernier avant de dormir?",
        Q2: "Votre sommeil est-il perturbé car vous utilisez des appareils électroniques au lit ou juste avant de vous coucher?",
        Q3: "Vous réveillez-vous la nuit pour vérifier les notifications ou les messages?",
        Q4: "Avez-vous du mal à établir des moments 'sans téléphone' (par exemple, pendant les repas ou les conversations)?",
        Q5: "Les notifications de votre téléphone vous distraient-elles fréquemment des tâches ou études importantes?",
        Q6: "Vous retrouvez-vous à faire défiler les médias sociaux ou à naviguer sur internet sans objectif précis, perdant du temps?",
        Q7: "Reportez-vous des engagements ou activités hors ligne (comme le ménage, l'exercice) à cause du temps passé en ligne?",
        Q8: "Avez-vous du mal à maintenir votre concentration sur une seule activité pendant des périodes prolongées (plus de 30 minutes)?",
        Q9: "Utiliser votre appareil est-il votre mécanisme principal pour gérer l'ennui, le stress ou les sentiments négatifs?",
        Q10: "Vous sentez-vous anxieux ou irritable si vous ne pouvez pas accéder à votre téléphone/internet pendant un certain temps (ex. batterie faible ou pas de Wi-Fi)?",
        Q11: "Avez-vous essayé de réduire le temps passé en ligne, mais avez échoué?",
        Q12: "Cachez-vous aux autres le temps réel que vous passez sur des appareils ou des applications spécifiques?",
        Q13: "Ressentez-vous un besoin physique (comme des picotements ou de l'agitation) lorsque vous ne pouvez pas vérifier votre téléphone?",
        Q14: "Vérifiez-vous continuellement votre téléphone même lorsqu'il n'y a pas de notifications actives ou entrantes?",
        Q15: "Ressentez-vous la FOMO (Peur de Manquer Quelque Chose) ou l'obligation de répondre immédiatement à chaque notification ou message?",
        Q16: "Lorsque vous regardez un film ou participez à une réunion, votre téléphone est-il toujours à portée de main et le vérifiez-vous régulièrement?",
        Q17: "Êtes-vous plus à l'aise pour communiquer des messages importants ou des sentiments par messagerie plutôt qu'en personne?",
        Q18: "Vos interactions virtuelles (médias sociaux, jeux) ont-elles remplacé ou réduit significativement le temps passé avec des amis et la famille hors ligne?",
        Q19: "Êtes-vous constamment préoccupé par votre apparence en ligne (profil, publications, 'j'aime' reçus)?",
        Q20: "Utilisez-vous votre téléphone en conduisant ou en marchant, risquant votre sécurité ou celle des autres?",
            score_title: "Votre Score",
        answers_title: "Vos réponses détaillées au quiz",
        
    }
};

// =========================================================================
// 3. LOGICA MULTILINGUA (I18N)
// =========================================================================

/**
 * Assicura che ogni lingua abbia tutte le chiavi statiche e dinamiche (domande, risposte).
 */
function ensureAllTranslationsExist() {
    // Usa IT come lingua di fallback se non specificato
    const defaultLang = TRANSLATIONS['it'];

    // 1. Assicura che le chiavi standard (ANSWER_X, AXIS_...) siano in ogni lingua
    const standardKeys = ['ANSWER_0', 'ANSWER_1', 'ANSWER_2', 'ANSWER_3', 
                          'AXIS_Sleep_Rituals', 'AXIS_Productivity_Focus', 
                          'AXIS_Escape_Emotions', 'AXIS_Habit_Compulsion', 
                          'AXIS_Social_Presence'];
                          
    for (const code in TRANSLATIONS) {
        const currentLang = TRANSLATIONS[code];
        standardKeys.forEach(key => {
             if (!currentLang[key]) {
                 // Usa il valore IT come fallback
                 currentLang[key] = defaultLang[key];
             }
        });
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
        // CORREZIONE: Usa il placeholder {name} per una traduzione pulita
        paywallH3.innerHTML = t.PAYWALL_H3.replace('{name}', userName);
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
    // Usa l'operatore OR per assicurare che userName non sia 'undefined' nel report
    reportHeader.innerHTML = `${t.TITLE} - ${userName || t.GUEST}`; 

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
        const questionsOnAxis = QUIZ_QUESTIONS.filter(q => q.axis === axis).length;
        const maxAxisScore = questionsOnAxis * 3;
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
            // Assicurati che l'oggetto di traduzione esista o usa il fallback IT
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

    // 7. Implementazione: Stampa del Report (Soluzione GitHub Pages)
    const downloadBtn = document.getElementById('download-pdf-btn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            // Nasconde il pulsante per evitare che compaia nel PDF di stampa/salvataggio.
            downloadBtn.style.display = 'none';

            // Nascondi anche il disclaimer se necessario
            const disclaimer = document.querySelector('.disclaimer-box');
            if (disclaimer) disclaimer.style.display = 'none';

            // Chiama la funzione di stampa nativa del browser (funziona su mobile).
            window.print(); 

            // Ripristina la visualizzazione normale dopo la stampa
            downloadBtn.style.display = 'block';
            if (disclaimer) disclaimer.style.display = 'block';
        };
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

    // 3. Collega il bottone di calcolo al form
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
