/**
 * scripts.final.js - Logica completa del Quiz di Dipendenza Digitale (Multilingua)
 * Versione stabile e completa con traduzioni integrali per IT, EN, ES, DE, FR.
 */

// =========================================================================
// 1. CONFIGURAZIONE & DATI
// =========================================================================

const CONFIG = {
    STANDARD_PRICE: 1.99, // Prezzo Standard
    PREMIUM_PRICE: 7.99,  // Prezzo Premium
    MAX_SCORE: 60,
    I18N_LOCALE: 'it' // Lingua di default (Italiano)
};

const AVAILABLE_LANGUAGES = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

/**
 * Array contenente le 20 domande del quiz.
 * NOTA: Il testo della domanda QUIZ_QUESTIONS è solo in IT. Verrà copiato come fallback nelle altre lingue.
 */
const QUIZ_QUESTIONS = [
    { question: "Quando ti svegli, la prima cosa che fai è controllare lo smartphone?", axis: "Sleep & Rituals" },
    { question: "Passi più di 3 ore al giorno sui social media (esclusi gli impegni di lavoro)?", axis: "Productivity & Focus" },
    { question: "Ti senti ansioso o irritato se non riesci a trovare o usare il telefono?", axis: "Escape & Emotions" },
    { question: "Controlli il telefono ogni pochi minuti (anche se non hai notifiche)?", axis: "Habit & Compulsion" },
    { question: "Interrompi spesso conversazioni o attività per guardare il telefono?", axis: "Social & Presence" },
    { question: "Ritardi il sonno per rimanere sveglio/a a usare il telefono?", axis: "Sleep & Rituals" },
    { question: "Hai difficoltà a concentrarti su un singolo compito per più di 30 minuti senza distrazioni digitali?", axis: "Productivity & Focus" },
    { question: "Usi lo smartphone come meccanismo principale per sfuggire a noia o pensieri negativi?", axis: "Escape & Emotions" },
    { question: "Quando sei in fila o aspetti, la prima cosa che fai è tirare fuori il telefono?", axis: "Habit & Compulsion" },
    { question: "I tuoi amici o partner si sono lamentati del tempo che passi sul telefono quando siete insieme?", axis: "Social & Presence" },
    { question: "Tieni il telefono vicino o sotto il cuscino mentre dormi?", axis: "Sleep & Rituals" },
    { question: "Quando devi studiare o lavorare, è facile per te passare a controllare app o siti non correlati?", axis: "Productivity & Focus" },
    { question: "Provi un senso di vuoto o irrequietezza quando il telefono è scarico o la batteria sta per finire?", axis: "Escape & Emotions" },
    { question: "Ti capita di prendere il telefono senza un motivo preciso, semplicemente per 'dare un'occhiata'?", axis: "Habit & Compulsion" },
    { question: "Eviti attività sociali reali per preferire interazioni o giochi online?", axis: "Social & Presence" },
    { question: "Controlli il telefono immediatamente prima di chiudere gli occhi per dormire?", axis: "Sleep & Rituals" },
    { question: "Ritieni che la qualità del tuo lavoro/studio sia peggiorata a causa delle distrazioni digitali?", axis: "Productivity & Focus" },
    { question: "Hai provato a limitare l'uso del telefono, ma non ci sei riuscito/a?", axis: "Escape & Emotions" },
    { question: "Senti una vibrazione fantasma (quando il telefono non sta effettivamente vibrando)?", axis: "Habit & Compulsion" },
    { question: "Ti isoli in casa (anche solo in una stanza) per usare il telefono indisturbato?", axis: "Social & Presence" }
];

/**
 * MAPPATURA DEI TESTI DI PROFILO IN BASE AL PUNTEGGIO TOTALE (Multilingua)
 */
const RISK_PROFILES_I18N = {
    LOW: {
        minScore: 0, maxScore: 20, cssClass: 'risk-low',
        it: { level: 'Basso', profileText: 'Ottimo! La tua relazione con la tecnologia è sana e consapevole. Mantenere questo equilibrio richiede attenzione, ma hai le basi giuste.', analysisText: 'Mantieni l\'approccio attuale, ponendo attenzione a non aumentare i tempi di utilizzo. Concentrati sulla prevenzione attiva per assicurarti che la tecnologia continui a servire i tuoi obiettivi e non viceversa.' },
        en: { level: 'Low', profileText: 'Excellent! Your relationship with technology is healthy and conscious. Maintaining this balance requires attention, but you have the right foundation.', analysisText: 'Maintain your current approach, paying attention not to increase usage time. Focus on active prevention to ensure technology continues to serve your goals, and not the other way around.' },
        es: { level: 'Bajo', profileText: '¡Excelente! Tu relación con la tecnología es sana y consciente. Mantener este equilibrio requiere atención, pero tienes las bases correctas.', analysisText: 'Mantén el enfoque actual, prestando atención a no aumentar los tiempos de uso. Céntrate en la prevención activa para asegurar que la tecnología siga sirviendo tus objetivos y no al revés.' },
        de: { level: 'Niedrig', profileText: 'Ausgezeichnet! Deine Beziehung zur Technologie ist gesund und bewusst. Dieses Gleichgewicht zu halten, erfordert Aufmerksamkeit, aber du hast die richtigen Grundlagen.', analysisText: 'Behalte deinen aktuellen Ansatz bei und achte darauf, die Nutzungszeiten nicht zu erhöhen. Konzentriere dich auf aktive Prävention, um sicherzustellen, dass die Technologie weiterhin deinen Zielen dient und nicht umgekehrt.' },
        fr: { level: 'Faible', profileText: 'Excellent ! Votre relation avec la technologie est saine et consciente. Maintenir cet équilibre demande de l\'attention, mais vous avez les bonnes bases.', analysisText: 'Maintenez l\'approche actuelle en veillant à ne pas augmenter les temps d\'utilisation. Concentrez-vous sur la prévention active pour vous assurer que la technologie continue de servir vos objectifs et non l\'inverse.' }
    },
    MEDIUM: {
        minScore: 21, maxScore: 40, cssClass: 'risk-medium',
        it: { level: 'Medio', profileText: 'Attenzione! Mostri segni di una dipendenza emergente o di cattive abitudini. Il tuo punteggio indica che in alcune aree lo smartphone è un fattore di distrazione.', analysisText: 'È cruciale identificare i tuoi principali fattori di stress digitale e iniziare a impostare limiti chiari. La tua consapevolezza è il primo passo verso il cambiamento. Un piano d\'azione mirato può farti recuperare il controllo.' },
        en: { level: 'Medium', profileText: 'Caution! You show signs of an emerging dependency or bad habits. Your score indicates that in some areas, the smartphone is a distraction factor.', analysisText: 'It is crucial to identify your main digital stressors and start setting clear limits. Your awareness is the first step towards change. A targeted action plan can help you regain control.' },
        es: { level: 'Medio', profileText: '¡Atención! Muestras señales de una dependencia emergente o malos hábitos. Tu puntuación indica que en algunas áreas, el smartphone es un factor de distracción.', analysisText: 'Es crucial identificar tus principales factores de estrés digital y empezar a establecer límites claros. Tu conciencia es el primer paso hacia el cambio. Un plan de acción dirigido puede ayudarte a recuperar el control.' },
        de: { level: 'Mittel', profileText: 'Achtung! Du zeigst Anzeichen einer beginnenden Abhängigkeit oder schlechter Gewohnheiten. Deine Punktzahl deutet darauf hin, dass das Smartphone in einigen Bereichen ein Ablenkungsfaktor ist.', analysisText: 'Es ist entscheidend, deine digitalen Hauptstressfaktoren zu identifizieren und klare Grenzen zu setzen. Dein Bewusstsein ist der erste Schritt zur Veränderung. Ein gezielter Aktionsplan kann dir helfen, die Kontrolle zurückzugewinnen.' },
        fr: { level: 'Moyen', profileText: 'Attention ! Vous montrez des signes de dépendance émergente ou de mauvaises habitudes. Votre score indique que dans certains domaines, le smartphone est un facteur de distraction.', analysisText: 'Il est crucial d\'identifier vos principaux facteurs de stress numérique et de commencer à fixer des limites claires. Votre prise de conscience est la première étape vers le changement. Un plan d\'action ciblé peut vous aider à reprendre le contrôle.' }
    },
    HIGH: {
        minScore: 41, maxScore: CONFIG.MAX_SCORE, cssClass: 'risk-high',
        it: { level: 'Alto', profileText: 'Rischio significativo. Il tuo uso dello smartphone sta compromettendo diverse aree della tua vita, inclusi sonno e produttività. Non sei solo, ma è tempo di agire.', analysisText: 'Un intervento immediato è necessario. Inizia con un piano di disintossicazione graduale di 7 giorni e considera l\'aiuto di un professionista se l\'ansia da disconnessione è forte.' },
        en: { level: 'High', profileText: 'Significant risk. Your smartphone use is compromising various areas of your life, including sleep and productivity. You\'re not alone, but it\'s time to act.', analysisText: 'Immediate intervention is necessary. Start with a gradual 7-day detox plan and consider professional help if disconnection anxiety is strong.' },
        es: { level: 'Alto', profileText: 'Riesgo significativo. El uso de tu smartphone está comprometiendo varias áreas de tu vida, incluyendo el sueño y la productividad. No estás solo, pero es momento de actuar.', analysisText: 'Se necesita una intervención inmediata. Comienza con un plan de desintoxicación gradual de 7 días y considera la ayuda profesional si la ansiedad por desconexión es fuerte.' },
        de: { level: 'Hoch', profileText: 'Erhebliches Risiko. Deine Smartphone-Nutzung beeinträchtigt verschiedene Lebensbereiche, einschließlich Schlaf und Produktivität. Du bist nicht allein, aber es ist Zeit zu handeln.', analysisText: 'Eine sofortige Intervention ist notwendig. Beginne mit einem schrittweisen 7-tägigen Detox-Plan und ziehe professionelle Hilfe in Betracht, falls die Angst vor der Trennung stark ist.' },
        fr: { level: 'Élevé', profileText: 'Risque significatif. Votre utilisation du smartphone compromet plusieurs domaines de votre vie, y compris le sommeil et la productivité. Vous n\'êtes pas seul, mais il est temps d\'agir.', analysisText: 'Une intervention immédiate est nécessaire. Commencez par un plan de désintoxication progressive de 7 jours et envisagez une aide professionnelle si l\'anxiété de déconnexion est forte.' }
    }
};

/**
 * MAPPATURA DEI CONSIGLI PREMIUM PER ASSE DI RISCHIO (PIANO 7 GIORNI COMPLETO MULTILINGUA)
 */
const AXIS_PLANS_I18N = {
    'Sleep & Rituals': {
        cssClass: 'sleep-and-rituals-bg',
        it: {
            priorityTitle: 'Priorità: Migliorare la Qualità del Sonno',
            priorityDetail: 'La tua più alta priorità deve essere ripristinare confini sani tra il telefono e il tuo sonno.',
            dayPlan: ['Giorno 1: Togli il telefono dalla camera da letto e usa una sveglia tradizionale.', 'Giorno 2: Bevi una tisana o fai stretching 60 minuti prima di dormire.', 'Giorno 3: Leggi un libro cartaceo (non e-reader) prima di chiudere gli occhi.', 'Giorno 4: Definisci un orario fisso (es. 21:00) per mettere a letto tutti i dispositivi.', 'Giorno 5: Evita la caffeina e l\'alcool 4 ore prima di dormire, monitorando l\'ansia serale.', 'Giorno 6: Fai una doccia o un bagno caldo per rilassarti la sera e medita per 5 minuti.', 'Giorno 7: Rifletti sul miglioramento del tuo sonno e mantieni i confini stabiliti come regole fisse.']
        },
        en: {
            priorityTitle: 'Priority: Improve Sleep Quality',
            priorityDetail: 'Your highest priority must be restoring healthy boundaries between your phone and your sleep.',
            dayPlan: ['Day 1: Remove the phone from the bedroom and use a traditional alarm clock.', 'Day 2: Drink herbal tea or stretch 60 minutes before sleeping.', 'Day 3: Read a physical book (not e-reader) before closing your eyes.', 'Day 4: Set a fixed time (e.g., 9:00 PM) to put all devices to bed.', 'Day 5: Avoid caffeine and alcohol 4 hours before sleeping, monitoring evening anxiety.', 'Day 6: Take a hot shower or bath to relax in the evening and meditate for 5 minutes.', 'Day 7: Reflect on your sleep improvement and maintain established boundaries as fixed rules.']
        },
        es: {
            priorityTitle: 'Prioridad: Mejorar la Calidad del Sueño',
            priorityDetail: 'Tu máxima prioridad debe ser restaurar límites saludables entre tu teléfono y tu sueño.',
            dayPlan: ['Día 1: Saca el teléfono del dormitorio y usa un despertador tradicional.', 'Día 2: Bebe una infusión o haz estiramientos 60 minutos antes de dormir.', 'Día 3: Lee un libro físico (no e-reader) antes de cerrar los ojos.', 'Día 4: Define una hora fija (ej. 21:00) para dejar todos los dispositivos.', 'Día 5: Evita la cafeína y el alcohol 4 horas antes de dormir, monitoreando la ansiedad nocturna.', 'Día 6: Toma una ducha o baño caliente para relajarte por la noche y medita durante 5 minutos.', 'Día 7: Reflexiona sobre la mejora de tu sueño y mantén los límites establecidos como reglas fijas.']
        },
        de: {
            priorityTitle: 'Priorität: Schlafqualität Verbessern',
            priorityDetail: 'Deine höchste Priorität muss die Wiederherstellung gesunder Grenzen zwischen deinem Telefon und deinem Schlaf sein.',
            dayPlan: ['Tag 1: Entferne das Telefon aus dem Schlafzimmer und verwende einen herkömmlichen Wecker.', 'Tag 2: Trinke einen Kräutertee oder mache Dehnübungen 60 Minuten vor dem Schlafengehen.', 'Tag 3: Lies ein gedrucktes Buch (kein E-Reader), bevor du die Augen schließt.', 'Tag 4: Lege eine feste Zeit (z. B. 21:00 Uhr) fest, um alle Geräte wegzulegen.', 'Tag 5: Vermeide Koffein und Alkohol 4 Stunden vor dem Schlafen und überwache abendliche Angstzustände.', 'Tag 6: Nimm abends eine heiße Dusche oder ein Bad zur Entspannung und meditiere 5 Minuten.', 'Tag 7: Reflektiere über deine Schlafverbesserung und halte die festgelegten Grenzen als feste Regeln ein.']
        },
        fr: {
            priorityTitle: 'Priorité : Améliorer la Qualité du Sommeil',
            priorityDetail: 'Votre priorité absolue doit être de restaurer des limites saines entre votre téléphone et votre sommeil.',
            dayPlan: ['Jour 1 : Retirez le téléphone de la chambre et utilisez un réveil traditionnel.', 'Jour 2 : Buvez une tisane ou faites des étirements 60 minutes avant de dormir.', 'Jour 3 : Lisez un livre papier (pas de liseuse) avant de fermer les yeux.', 'Jour 4 : Définissez une heure fixe (ex. 21h00) pour coucher tous les appareils.', 'Jour 5 : Évitez la caféine et l\'alcool 4 heures avant de dormir, et surveillez l\'anxiété du soir.', 'Jour 6 : Prenez une douche ou un bain chaud pour vous détendre le soir et méditez pendant 5 minutes.', 'Jour 7 : Réfléchissez à l\'amélioration de votre sommeil et maintenez les limites établies comme règles fixes.']
        }
    },
    'Productivity & Focus': {
        cssClass: 'productivity-and-focus-bg',
        it: {
            priorityTitle: 'Priorità: Riconquistare la Concentrazione',
            priorityDetail: 'La tua produttività è compromessa. Devi adottare misure rigorose per minimizzare le distrazioni.',
            dayPlan: ['Giorno 1: Lavora a blocchi di 45 minuti con il telefono in modalità aereo in un’altra stanza.', 'Giorno 2: Disattiva tutte le notifiche non essenziali per le app di social media.', 'Giorno 3: Usa un\'app di tracciamento per limitare l\'accesso ai siti "distraenti".', 'Giorno 4: Crea una "zona di lavoro" senza distrazioni digitali (solo computer cablato).', 'Giorno 5: Stabilisci un obiettivo di lavoro giornaliero chiaro e irremovibile da completare prima di controllare i social.', 'Giorno 6: Fai brevi pause di movimento (5 min) invece di controllare subito il telefono. Respira aria fresca.', 'Giorno 7: Riscrivi la tua lista di obiettivi per la settimana, dando priorità al lavoro profondo (Deep Work).']
        },
        en: {
            priorityTitle: 'Priority: Regain Focus',
            priorityDetail: 'Your productivity is compromised. You need to adopt rigorous measures to minimize distractions.',
            dayPlan: ['Day 1: Work in 45-minute blocks with your phone on airplane mode in another room.', 'Day 2: Disable all non-essential notifications for social media apps.', 'Day 3: Use a tracking app to limit access to "distracting" websites.', 'Day 4: Create a "work zone" without digital distractions (only wired computer).', 'Day 5: Set a clear, immovable daily work goal to complete before checking social media.', 'Day 6: Take short movement breaks (5 min) instead of immediately checking your phone. Get fresh air.', 'Day 7: Rewrite your goals list for the week, prioritizing Deep Work.']
        },
        es: {
            priorityTitle: 'Prioridad: Recuperar la Concentración',
            priorityDetail: 'Tu productividad está comprometida. Debes adoptar medidas rigurosas para minimizar las distracciones.',
            dayPlan: ['Día 1: Trabaja en bloques de 45 minutos con el teléfono en modo avión en otra habitación.', 'Día 2: Desactiva todas las notificaciones no esenciales para las aplicaciones de redes sociales.', 'Día 3: Usa una aplicación de seguimiento para limitar el acceso a sitios "distractores".', 'Día 4: Crea una "zona de trabajo" sin distracciones digitales (solo ordenador por cable).', 'Día 5: Establece un objetivo de trabajo diario claro e inamovible para completar antes de revisar redes sociales.', 'Día 6: Toma breves descansos de movimiento (5 min) en lugar de revisar inmediatamente el teléfono. Toma aire fresco.', 'Día 7: Reescribe tu lista de objetivos para la semana, dando prioridad al Trabajo Profundo (Deep Work).']
        },
        de: {
            priorityTitle: 'Priorität: Fokus Wiederherstellen',
            priorityDetail: 'Deine Produktivität ist beeinträchtigt. Du musst strenge Maßnahmen ergreifen, um Ablenkungen zu minimieren.',
            dayPlan: ['Tag 1: Arbeite in 45-Minuten-Blöcken mit dem Telefon im Flugmodus in einem anderen Raum.', 'Tag 2: Deaktiviere alle unwesentlichen Benachrichtigungen für Social-Media-Apps.', 'Tag 3: Verwende eine Tracking-App, um den Zugriff auf "ablenkende" Websites zu beschränken.', 'Tag 4: Erstelle eine "Arbeitszone" ohne digitale Ablenkungen (nur kabelgebundener Computer).', 'Tag 5: Setze dir ein klares, unumstößliches tägliches Arbeitsziel, das du vor dem Checken sozialer Medien abschließt.', 'Tag 6: Mache kurze Bewegungspausen (5 Min.), anstatt sofort zum Telefon zu greifen. Atme frische Luft.', 'Tag 7: Schreibe deine Wochenziele neu, wobei du Deep Work priorisierst.']
        },
        fr: {
            priorityTitle: 'Priorité : Regagner la Concentration',
            priorityDetail: 'Votre productivité est compromise. Vous devez adopter des mesures rigoureuses pour minimiser les distractions.',
            dayPlan: ['Jour 1 : Travaillez par blocs de 45 minutes avec le téléphone en mode avion dans une autre pièce.', 'Jour 2 : Désactivez toutes les notifications non essentielles pour les applications de médias sociaux.', 'Jour 3 : Utilisez une application de suivi pour limiter l\'accès aux sites "distrayants".', 'Jour 4 : Créez une "zone de travail" sans distractions numériques (uniquement ordinateur câblé).', 'Jour 5 : Établissez un objectif de travail quotidien clair et inébranlable à terminer avant de consulter les réseaux sociaux.', 'Jour 6 : Faites de courtes pauses de mouvement (5 min) au lieu de vérifier immédiatement votre téléphone. Prenez l\'air frais.', 'Jour 7 : Réécrivez votre liste d\'objectifs pour la semaine, en donnant la priorité au Travail Profond (Deep Work).']
        }
    },
    'Escape & Emotions': {
        cssClass: 'escape-and-emotions-bg',
        it: {
            priorityTitle: 'Priorità: Gestire l\'Ansia e la Noia',
            priorityDetail: 'Stai usando il telefono come un meccanismo di coping malsano per la noia o lo stress. Devi trovare sostituti positivi.',
            dayPlan: ['Giorno 1: Riconosci 3 momenti di "noia" e sostituisci il telefono con una passeggiata o un esercizio di stretching.', 'Giorno 2: Tieni un diario per scrivere i pensieri negativi invece di cercare sollievo nel telefono.', 'Giorno 3: Chiedi a un amico o a un familiare di essere il tuo "partner di responsabilità" e di controllare il tuo utilizzo.', 'Giorno 4: Dedica 15 minuti a un hobby analogico (disegno, musica, puzzle) quando senti l\'impulso di sfuggire.', 'Giorno 5: Identifica le tue app trigger e sposta la loro icona in una cartella secondaria dello smartphone.', 'Giorno 6: Pratica la "Mindful Disconnection": spegni il telefono per 2 ore e accetta l\'ansia che ne deriva.', 'Giorno 7: Pianifica un’attività sociale reale (non online) per la settimana successiva.']
        },
        en: {
            priorityTitle: 'Priority: Manage Anxiety and Boredom',
            priorityDetail: 'You are using your phone as an unhealthy coping mechanism for boredom or stress. You need to find positive substitutes.',
            dayPlan: ['Day 1: Recognize 3 moments of "boredom" and substitute the phone with a walk or stretching exercise.', 'Day 2: Keep a journal to write down negative thoughts instead of seeking relief on the phone.', 'Day 3: Ask a friend or family member to be your "accountability partner" and monitor your usage.', 'Day 4: Dedicate 15 minutes to an analog hobby (drawing, music, puzzle) when you feel the urge to escape.', 'Day 5: Identify your trigger apps and move their icon to a secondary folder on your smartphone.', 'Day 6: Practice "Mindful Disconnection": turn off your phone for 2 hours and accept the anxiety that comes with it.', 'Day 7: Plan a real-life social activity (not online) for the following week.']
        },
        es: {
            priorityTitle: 'Prioridad: Gestionar la Ansiedad y el Aburrimiento',
            priorityDetail: 'Estás usando tu teléfono como un mecanismo de afrontamiento poco saludable para el aburrimiento o el estrés. Debes encontrar sustitutos positivos.',
            dayPlan: ['Día 1: Reconoce 3 momentos de "aburrimiento" y sustituye el teléfono por un paseo o un ejercicio de estiramiento.', 'Día 2: Lleva un diario para escribir los pensamientos negativos en lugar de buscar alivio en el teléfono.', 'Día 3: Pide a un amigo o familiar que sea tu "compañero de responsabilidad" y supervise tu uso.', 'Día 4: Dedica 15 minutos a un pasatiempo analógico (dibujo, música, rompecabezas) cuando sientas el impulso de escapar.', 'Día 5: Identifica tus aplicaciones desencadenantes y mueve su ícono a una carpeta secundaria en tu smartphone.', 'Día 6: Practica la "Desconexión Consciente": apaga tu teléfono durante 2 horas y acepta la ansiedad que conlleva.', 'Día 7: Planifica una actividad social de la vida real (no en línea) para la próxima semana.']
        },
        de: {
            priorityTitle: 'Priorität: Angst und Langeweile Managen',
            priorityDetail: 'Du benutzt dein Telefon als ungesunden Bewältigungsmechanismus für Langeweile oder Stress. Du musst positive Alternativen finden.',
            dayPlan: ['Tag 1: Erkenne 3 "Langeweile"-Momente und ersetze das Telefon durch einen Spaziergang oder eine Dehnübung.', 'Tag 2: Führe ein Tagebuch, um negative Gedanken aufzuschreiben, anstatt Trost im Telefon zu suchen.', 'Tag 3: Bitte einen Freund oder ein Familienmitglied, dein "Verantwortungspartner" zu sein und deine Nutzung zu überwachen.', 'Tag 4: Widme 15 Minuten einem analogen Hobby (Zeichnen, Musik, Puzzle), wenn du den Drang zur Flucht verspürst.', 'Tag 5: Identifiziere deine Trigger-Apps und verschiebe deren Icon in einen sekundären Ordner auf deinem Smartphone.', 'Tag 6: Praktiziere "Achtsame Trennung": Schalte das Telefon für 2 Stunden aus und akzeptiere die damit verbundene Angst.', 'Tag 7: Plane eine echte (nicht online) soziale Aktivität für die kommende Woche.']
        },
        fr: {
            priorityTitle: 'Priorité : Gérer l\'Anxiété et l\'Ennui',
            priorityDetail: 'Vous utilisez votre téléphone comme un mécanisme d\'adaptation malsain face à l\'ennui ou au stress. Vous devez trouver des substituts positifs.',
            dayPlan: ['Jour 1 : Reconnaissez 3 moments d\'"ennui" et remplacez le téléphone par une promenade ou un exercice d\'étirement.', 'Jour 2 : Tenez un journal pour écrire vos pensées négatives au lieu de chercher du réconfort dans le téléphone.', 'Jour 3 : Demandez à un ami ou un membre de votre famille d\'être votre "partenaire de responsabilité" et de surveiller votre utilisation.', 'Jour 4 : Consacrez 15 minutes à un hobby analogique (dessin, musique, puzzle) lorsque vous ressentez l\'envie de vous échapper.', 'Jour 5 : Identifiez vos applications déclencheurs e et déplacez leur icône dans un dossier secondaire de votre smartphone.', 'Jour 6 : Pratiquez la "Déconnexion Consciente" : éteignez votre téléphone pendant 2 heures et acceptez l\'anxiété qui en découle.', 'Jour 7 : Planifiez une activité sociale réelle (non en ligne) pour la semaine suivante.']
        }
    },
    'Habit & Compulsion': {
        cssClass: 'habit-and-compulsion-bg',
        it: {
            priorityTitle: 'Priorità: Rompere gli Automatismi e l\'Abuso',
            priorityDetail: 'La tua mano prende il telefono per abitudine. Devi rompere i "trigger" automatici.',
            dayPlan: ['Giorno 1: Cambia la posizione delle app sulla schermata principale per rompere l\'automatismo.', 'Giorno 2: Lascia il telefono in borsa/zaino ogni volta che sei a casa (non tenerlo addosso).', 'Giorno 3: Ogni volta che prendi il telefono, rispondi mentalmente alla domanda: "Perché l\'ho preso?"', 'Giorno 4: Rimuovi le app di social media dallo smartphone e usa solo la versione desktop.', 'Giorno 5: Imposta il tuo telefono in bianco e nero per ridurre l\'appeal visivo e la gratificazione.', 'Giorno 6: Limita il controllo del telefono a 3 momenti fissi al giorno (es. 9:00, 13:00, 18:00).', 'Giorno 7: Misura quante volte hai ceduto all’impulso e celebra il progresso, non la perfezione.']
        },
        en: {
            priorityTitle: 'Priority: Break Automatic Habits and Abuse',
            priorityDetail: 'Your hand reaches for the phone out of habit. You must break the automatic "triggers".',
            dayPlan: ['Day 1: Change the position of apps on the home screen to break the automatic action.', 'Day 2: Leave your phone in your bag/backpack whenever you are home (do not carry it on you).', 'Day 3: Every time you pick up the phone, mentally answer the question: "Why did I pick it up?"', 'Day 4: Remove social media apps from your smartphone and only use the desktop version.', 'Day 5: Set your phone to black and white mode to reduce visual appeal and gratification.', 'Day 6: Limit phone checking to 3 fixed times a day (e.g., 9:00 AM, 1:00 PM, 6:00 PM).', 'Day 7: Measure how many times you resisted the impulse and celebrate progress, not perfection.']
        },
        es: {
            priorityTitle: 'Prioridad: Romper Automatismos y Abuso',
            priorityDetail: 'Tu mano coge el teléfono por costumbre. Debes romper los "desencadenantes" automáticos.',
            dayPlan: ['Día 1: Cambia la posición de las aplicaciones en la pantalla principal para romper el automatismo.', 'Día 2: Deja el teléfono en tu bolso/mochila siempre que estés en casa (no lo lleves encima).', 'Día 3: Cada vez que cojas el teléfono, responde mentalmente a la pregunta: "¿Por qué lo cogí?"', 'Día 4: Elimina las aplicaciones de redes sociales del smartphone y usa solo la versión de escritorio.', 'Día 5: Configura tu teléfono en blanco y negro para reducir el atractivo visual y la gratificación.', 'Día 6: Limita la revisión del teléfono a 3 momentos fijos al día (ej. 9:00, 13:00, 18:00).', 'Día 7: Mide cuántas veces cediste al impulso y celebra el progreso, no la perfección.']
        },
        de: {
            priorityTitle: 'Priorität: Automatische Gewohnheiten Brechen',
            priorityDetail: 'Deine Hand greift aus Gewohnheit zum Telefon. Du musst die automatischen "Trigger" durchbrechen.',
            dayPlan: ['Tag 1: Ändere die Position der Apps auf dem Startbildschirm, um den Automatismus zu durchbrechen.', 'Tag 2: Lass dein Telefon in deiner Tasche/Rucksack, wenn du zu Hause bist (trage es nicht bei dir).', 'Tag 3: Jedes Mal, wenn du das Telefon in die Hand nimmst, beantworte mental die Frage: "Warum habe ich es genommen?"', 'Tag 4: Entferne Social-Media-Apps vom Smartphone und nutze nur die Desktop-Version.', 'Tag 5: Stelle dein Telefon auf Schwarz-Weiß-Modus, um den visuellen Reiz zu reduzieren.', 'Tag 6: Beschränke das Überprüfen des Telefons auf 3 feste Zeiten pro Tag (z. B. 9:00, 13:00, 18:00 Uhr).', 'Tag 7: Miss, wie oft du dem Impuls widerstanden hast, und feiere den Fortschritt, nicht die Perfektion.']
        },
        fr: {
            priorityTitle: 'Priorité : Rompre les Automatismes et l\'Abus',
            priorityDetail: 'Votre main prend le téléphone par habitude. Vous devez briser les "déclencheurs" automatiques.',
            dayPlan: ['Jour 1 : Changez la position des applications sur l\'écran principal pour briser l\'automatisme.', 'Jour 2 : Laissez votre téléphone dans votre sac/sac à dos lorsque vous êtes à la maison (ne le portez pas sur vous).', 'Jour 3 : Chaque fois que vous prenez le téléphone, répondez mentalement à la question : "Pourquoi l\'ai-je pris ?"', 'Jour 4 : Supprimez les applications de médias sociaux de votre smartphone et utilisez uniquement la version de bureau.', 'Jour 5 : Réglez votre téléphone en mode noir et blanc pour réduire l\'attrait visuel et la gratification.', 'Jour 6 : Limitez la vérification du téléphone à 3 moments fixes par jour (ex. 9h00, 13h00, 18h00).', 'Jour 7 : Mesurez combien de fois vous avez résisté à l\'impulsion et célébrez les progrès, pas la perfection.']
        }
    },
    'Social & Presence': {
        cssClass: 'social-and-presence-bg',
        it: {
            priorityTitle: 'Priorità: Migliorare le Relazioni Reali',
            priorityDetail: 'L\'uso del telefono sta danneggiando la tua capacità di essere presente. Devi dare priorità alle interazioni faccia a faccia.',
            dayPlan: ['Giorno 1: Durante i pasti con gli altri, tutti i telefoni vengono impilati al centro del tavolo (e vince il primo che cede).', 'Giorno 2: Fissa un appuntamento "senza telefono" con un amico, lasciando i dispositivi in un armadietto.', 'Giorno 3: Lascia il telefono a casa quando esci per una breve commissione o attività sociale non essenziale.', 'Giorno 4: Quando parli con qualcuno, metti il telefono in tasca o in borsa e non tirarlo fuori.', 'Giorno 5: Dedica 30 minuti a una conversazione profonda con una persona cara senza distrazioni digitali.', 'Giorno 6: Scrivi a mano un biglietto o una lettera a qualcuno invece di inviare un messaggio istantaneo.', 'Giorno 7: Trascorri un intero pomeriggio in natura senza alcuna connettività digitale.']
        },
        en: {
            priorityTitle: 'Priority: Improve Real-Life Relationships',
            priorityDetail: 'Phone use is damaging your ability to be present. You need to prioritize face-to-face interactions.',
            dayPlan: ['Day 1: During meals with others, all phones are stacked in the center of the table (and the first to cave loses).', 'Day 2: Schedule a "phone-free" date with a friend, leaving devices in a locker.', 'Day 3: Leave your phone at home when running a quick errand or non-essential social activity.', 'Day 4: When talking to someone, put your phone in your pocket or bag and do not take it out.', 'Day 5: Dedicate 30 minutes to a deep conversation with a loved one without digital distractions.', 'Day 6: Handwrite a note or letter to someone instead of sending an instant message.', 'Day 7: Spend an entire afternoon in nature without any digital connectivity.']
        },
        es: {
            priorityTitle: 'Prioridad: Mejorar las Relaciones Reales',
            priorityDetail: 'El uso del teléfono está dañando tu capacidad de estar presente. Debes priorizar las interacciones cara a cara.',
            dayPlan: ['Día 1: Durante las comidas con otros, todos los teléfonos se apilan en el centro de la mesa (y el primero en ceder pierde).', 'Día 2: Agenda una cita "sin teléfono" con un amigo, dejando los dispositivos en un casillero.', 'Día 3: Deja el teléfono en casa cuando salgas a hacer un recado rápido o una actividad social no esencial.', 'Día 4: Cuando hables con alguien, guarda el teléfono en tu bolsillo o bolso y no lo saques.', 'Día 5: Dedica 30 minutos a una conversación profunda con un ser querido sin distracciones digitales.', 'Día 6: Escribe a mano una nota o carta a alguien en lugar de enviar un mensaje instantáneo.', 'Día 7: Pasa una tarde entera en la naturaleza sin ninguna conectividad digital.']
        },
        de: {
            priorityTitle: 'Priorität: Reale Beziehungen Verbessern',
            priorityDetail: 'Die Telefonnutzung beeinträchtigt deine Fähigkeit, präsent zu sein. Du musst persönliche Interaktionen priorisieren.',
            dayPlan: ['Tag 1: Während gemeinsamer Mahlzeiten werden alle Telefone in der Mitte des Tisches gestapelt (und derjenige, der zuerst nachgibt, verliert).', 'Tag 2: Vereinbare ein "telefonfreies" Treffen mit einem Freund und lasse die Geräte in einem Schließfach.', 'Tag 3: Lass dein Telefon zu Hause, wenn du einen kurzen Besorgungs- oder eine unwesentliche soziale Aktivität erledigst.', 'Tag 4: Stecke dein Telefon in die Tasche oder Handtasche, wenn du mit jemandem sprichst, und nimm es nicht heraus.', 'Tag 5: Widme 30 Minuten einem tiefen Gespräch mit einem geliebten Menschen ohne digitale Ablenkungen.', 'Tag 6: Schreibe jemandem handschriftlich eine Notiz oder einen Brief, anstatt eine Sofortnachricht zu senden.', 'Tag 7: Verbringe einen ganzen Nachmittag in der Natur ohne jegliche digitale Verbindung.']
        },
        fr: {
            priorityTitle: 'Priorité : Améliorer les Relations Réelles',
            priorityDetail: 'L\'utilisation du téléphone nuit à votre capacité à être présent. Vous devez donner la priorité aux interactions en face à face.',
            dayPlan: ['Jour 1 : Pendant les repas avec les autres, tous les téléphones sont empilés au centre de la table (et le premier à céder perd).', 'Jour 2 : Organisez un rendez-vous "sans téléphone" avec un ami, en laissant les appareils dans un casier.', 'Jour 3 : Laissez votre téléphone à la maison lorsque vous sortez pour une course rapide ou une activité sociale non essentielle.', 'Jour 4 : Lorsque vous parlez à quelqu\'un, mettez votre téléphone dans votre poche ou votre sac et ne le sortez pas.', 'Jour 5 : Consacrez 30 minutes à une conversation approfondie avec un être cher sans distractions numériques.', 'Jour 6 : Écrivez à la main une note ou une lettre à quelqu\'un au lieu d\'envoyer un message instantané.', 'Jour 7 : Passez un après-midi entier dans la nature sans aucune connectivité numérique.']
        }
    }
};

/**
 * RISORSE CONSIGLIATE (Multilingua)
 */
const RESOURCES_I18N = {
    it: 'Consulta app come "Forest" o "Screen Time" per monitorare e limitare l\'uso. Considera un "Digital Detox" di 24 ore.',
    en: 'Check apps like "Forest" or "Screen Time" to monitor and limit usage. Consider a 24-hour "Digital Detox".',
    es: 'Consulta aplicaciones como "Forest" o "Screen Time" para monitorear y limitar el uso. Considera una "Desintoxicación Digital" de 24 horas.',
    de: 'Prüfe Apps wie "Forest" oder "Screen Time" zur Überwachung und Begrenzung der Nutzung. Ziehe ein 24-stündiges "Digital Detox" in Betracht.',
    fr: 'Consultez des applications comme "Forest" ou "Screen Time" pour surveiller et limiter l\'utilisation. Envisagez une "Détox Numérique" de 24 heures.'
};

/**
 * TRADUZIONI STATICO-DINAMICHE PER ELEMENTI HTML
 * NOTA: Le chiavi di risposta (ANSWER_...), le domande (Q1, Q2, ...) e gli assi (AXIS_...)
 * saranno aggiunte/garantite nella funzione ensureAllTranslationsExist().
 */
const TRANSLATIONS = {
    it: {
        FORM_TITLE: "Valutazione della Dipendenza Digitale",
        BTN_CALCULATE: "Calcola Risultato",
        ALERT_COMPLETE_QUIZ: "Per favore, rispondi a tutte le 20 domande prima di calcolare il risultato.",
        DEFAULT_USERNAME: "Utente",
        PAYWALL_H3: "Il Tuo Risultato è Pronto!",
        PAYWALL_P: "Per sbloccare il tuo report dettagliato, scegli l'opzione di acquisto qui sotto:",
        BTN_STANDARD: "Scarica Report Base (€" + CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',') + ")",
        BTN_PREMIUM: "Acquista Report Premium (€" + CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',') + ")",
        BTN_PREMIUM_SUB: "(Include: Piano d'Azione, Priorità e Piano 7 Giorni)",
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
        NAV_QUIZ: "Quiz",
        NAV_SCOPRI: "Scopri di più",
        SECTION1_TITLE: "Cos’è la dipendenza digitale?",
        SECTION1_P: "La dipendenza digitale è l’uso eccessivo e incontrollato di smartphone, social media, videogiochi e internet che compromette la vita quotidiana e il benessere psicofisico.",
        SECTION2_TITLE: "⚠️ I rischi principali",
        RISK1: "Riduzione della concentrazione: difficoltà a mantenere l’attenzione per periodi prolungati.",
        RISK2: "Problemi di sonno: l’uso serale di dispositivi altera i ritmi circadiani.",
        RISK3: "Stress e ansia: notifiche continue e iperconnessione aumentano la pressione mentale.",
        RISK4: "Isolamento sociale: l’interazione virtuale sostituisce quella reale.",
        SECTION3_TITLE: "💡 Consigli pratici",
        TIP1: "Imposta limiti giornalieri per le app più usate.",
        TIP2: "Disattiva le notifiche non necessarie.",
        TIP3: "Stabilisci momenti “senza telefono” (durante i pasti, prima di dormire).",
        TIP4: "Dedica tempo ad attività offline come sport, lettura o meditazione.",
        CTA_TITLE: "Vuoi scoprire quanto sei a rischio?",
        CTA_BUTTON: "Fai subito il test",
    },
    en: {
        FORM_TITLE: "Digital Addiction Assessment",
        BTN_CALCULATE: "Calculate Result",
        ALERT_COMPLETE_QUIZ: "Please answer all 20 questions before calculating the result.",
        DEFAULT_USERNAME: "User",
        PAYWALL_H3: "Your Result is Ready!",
        PAYWALL_P: "To unlock your detailed report, choose the purchase option below:",
        BTN_STANDARD: "Download Basic Report (€" + CONFIG.STANDARD_PRICE.toFixed(2) + ")",
        BTN_PREMIUM: "Purchase Premium Report (€" + CONFIG.PREMIUM_PRICE.toFixed(2) + ")",
        BTN_PREMIUM_SUB: "(Includes: Action Plan, Priority, and 7-Day Plan)",
        TITLE: "Personalized Digital Detox Report",
        SUBTITLE: "Final Processing (20 Questions)",
        SCORE_LABEL: "Score",
        RISK_LABEL: "Risk",
        PROFILE_TITLE: "Your Digital Addiction Profile",
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
        SITE_TITLE: "Digital Addiction",
        NAV_QUIZ: "Quiz",
        NAV_SCOPRI: "Learn More",
        SECTION1_TITLE: "What is digital addiction?",
        SECTION1_P: "Digital addiction is the excessive and uncontrolled use of smartphones, social media, video games, and the internet that compromises daily life and psycho-physical well-being.",
        SECTION2_TITLE: "⚠️ Main risks",
        RISK1: "Reduced concentration: difficulty maintaining attention for prolonged periods.",
        RISK2: "Sleep problems: evening use of devices alters circadian rhythms.",
        RISK3: "Stress and anxiety: continuous notifications and hyper-connectivity increase mental pressure.",
        RISK4: "Social isolation: virtual interaction replaces real-life interaction.",
        SECTION3_TITLE: "💡 Practical tips",
        TIP1: "Set daily limits for the most used apps.",
        TIP2: "Disable non-essential notifications.",
        TIP3: "Establish 'phone-free' moments (during meals, before sleeping).",
        TIP4: "Dedicate time to offline activities like sports, reading, or meditation.",
        CTA_TITLE: "Want to find out how at risk you are?",
        CTA_BUTTON: "Take the test now",
    },
    es: {
        FORM_TITLE: "Evaluación de la Dependencia Digital",
        BTN_CALCULATE: "Calcular Resultado",
        ALERT_COMPLETE_QUIZ: "Por favor, responde a las 20 preguntas antes de calcular el resultado.",
        DEFAULT_USERNAME: "Usuario",
        PAYWALL_H3: "¡Tu Resultado Está Listo!",
        PAYWALL_P: "Para desbloquear tu informe detallado, elige la opción de compra a continuación:",
        BTN_STANDARD: "Descargar Informe Básico (€" + CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',') + ")",
        BTN_PREMIUM: "Comprar Informe Premium (€" + CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',') + ")",
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
        BTN_STANDARD: "Basisbericht Herunterladen (€" + CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',') + ")",
        BTN_PREMIUM: "Premium-Bericht Kaufen (€" + CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',') + ")",
        BTN_PREMIUM_SUB: "(Inklusive: Aktionsplan, Priorität und 7-Tage-Plan)",
        TITLE: "Personalisierter Digital Detox Bericht",
        SUBTITLE: "Endgültige Verarbeitung (20 Fragen)",
        SCORE_LABEL: "Punktzahl",
        RISK_LABEL: "Risiko",
        PROFILE_TITLE: "Ihr Digitales Abhängigkeitsprofil",
        ANALYSIS_TITLE: "Analyse und Personalisierte Ratschläge",
        RADAR
            // La parte tedesca ricominciava qui. Incolla il blocco completo qui sotto.
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
                CTA_BUTTON: "Machen Sie jetzt den Test", // <-- DEVE ESSERCI UNA VIRGOLA QUI
            }, // <-- CHIUDE IL BLOCCO DE
    fr: {
            FORM_TITLE: "Évaluation de la Dépendance Numérique",
            BTN_CALCULATE: "Calculer le Résultat",
            ALERT_COMPLETE_QUIZ: "Veuillez répondre aux 20 questions avant de calculer le résultat.",
            DEFAULT_USERNAME: "Utilisateur",
            PAYWALL_H3: "Votre Résultat est Prêt !",
            PAYWALL_P: "Pour débloquer votre rapport détaillé, choisissez l'option d'achat ci-dessous :",
            BTN_STANDARD: "Télécharger le Rapport de Base (€" + CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',') + ")",
            BTN_PREMIUM: "Acheter le Rapport Premium (€" + CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',') + ")",
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
        } // <-- NON DEVE ESSERCI UNA VIRGOLA QUI, È L'ULTIMA LINGUA
}; // <--- CHIUDE L'OGGETTO TRANSLATIONS

// =========================================================================
// 2. LOGICA MULTILINGUA (I18N)
// =========================================================================

/**
 * Chiavi che devono esistere in ogni lingua per garantire la coerenza.
 * Includono le risposte standard e gli assi di rischio.
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

/**
 * Assicura che ogni lingua abbia tutte le chiavi statiche e dinamiche (domande, risposte).
 * Previene l'errore "undefined" nel quiz.
 */
function ensureAllTranslationsExist() {
    const defaultLang = TRANSLATIONS[CONFIG.I18N_LOCALE];

    // 1. Assicura che le chiavi I18N_KEYS_TO_TRANSLATE siano in ogni lingua
    for (const code in TRANSLATIONS) {
        if (code === CONFIG.I18N_LOCALE) continue; // Salta la lingua di default

        const currentLang = TRANSLATIONS[code];
        for (const key in I18N_KEYS_TO_TRANSLATE) {
            if (!currentLang[key]) {
                // Aggiunge le risposte standard e gli assi mancanti copiando dall'italiano
                currentLang[key] = defaultLang[key] || I18N_KEYS_TO_TRANSLATE[key];
            }
        }
    }

    // 2. Aggiunge le chiavi delle domande QUIZ_QUESTIONS a tutte le lingue
    QUIZ_QUESTIONS.forEach((q, index) => {
        const key = `Q${index + 1}`;
        for (const code in TRANSLATIONS) {
            if (!TRANSLATIONS[code][key]) {
                TRANSLATIONS[code][key] = q.question; // Usa il testo IT come fallback
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
        } else if (key.startsWith('AXIS_') && t[key.replace(/ /g, '_')]) {
             // Gestisce la traduzione degli assi di rischio (es. AXIS_Sleep & Rituals)
            element.innerHTML = t[key.replace(/ /g, '_')];
        }
    });

    // Aggiorna il valore corrente della lingua salvata
    CONFIG.I18N_LOCALE = locale;

    // Ricarica il quiz per applicare le traduzioni alle domande generate dinamicamente
    populateQuizQuestions();
}

/**
 * Inizializza il selettore di lingua nell'header.
 */
function initLanguageSelector() {
    const selectorContainer = document.getElementById('language-selector');
    if (!selectorContainer) return;

    AVAILABLE_LANGUAGES.forEach(lang => {
        const button = document.createElement('button');
        button.className = 'lang-btn';
        button.innerHTML = lang.flag;
        button.setAttribute('title', lang.name);
        button.onclick = () => applyTranslations(lang.code);
        selectorContainer.appendChild(button);
    });

    // Applica la classe 'active' al bottone della lingua corrente
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('title').includes(TRANSLATIONS[CONFIG.I18N_LOCALE]?.SITE_TITLE.split(' ')[0] || AVAILABLE_LANGUAGES[0].name.split(' ')[0])) {
             // Il controllo è generico per evitare dipendenza dal nome esatto
             // In realtà, viene gestito dal applyTranslations chiamato all'avvio
        }
    });
}

// =========================================================================
// 3. LOGICA QUIZ E REPORT
// =========================================================================

/**
 * Popola il contenitore delle domande del quiz.
 */
function populateQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');

    // Se l'elemento non esiste (cioè siamo su scopri.html), esci.
    if (!container) {
        return;
    }

    container.innerHTML = ''; // Pulisci il contenitore
    const currentLocale = CONFIG.I18N_LOCALE;
    const t = TRANSLATIONS[currentLocale];

    QUIZ_QUESTIONS.forEach((q, index) => {
        const qIndex = index + 1;
        const qKey = `Q${qIndex}`;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = `
            <p class="question-text">${qIndex}. ${t[qKey] || q.question}</p>
            <div class="radio-group" data-question-index="${index}">
                <input type="radio" id="q${qIndex}a0" name="q${qIndex}" value="0" required><label for="q${qIndex}a0">${t.ANSWER_0}</label>
                <input type="radio" id="q${qIndex}a1" name="q${qIndex}" value="1"><label for="q${qIndex}a1">${t.ANSWER_1}</label>
                <input type="radio" id="q${qIndex}a2" name="q${qIndex}" value="2"><label for="q${qIndex}a2">${t.ANSWER_2}</label>
                <input type="radio" id="q${qIndex}a3" name="q${qIndex}" value="3"><label for="q${qIndex}a3">${t.ANSWER_3}</label>
            </div>
        `;
        container.appendChild(questionDiv);
    });

    // Aggiorna l'elemento del punteggio massimo
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

    // Se il risultato è stato trovato, aggiunge l'asse prioritario
    if (result) {
        result.priorityAxis = priorityAxis;
    }

    return result;
}

/**
 * Gestisce l'evento di calcolo, raccoglie i dati e visualizza il report o il paywall.
 */
function handleCalculate() {
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

            // Registra la risposta per il report dettagliato
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

    // Salva i risultati in una variabile globale per l'accesso futuro (es. paywall)
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

    // Aggiorna l'intestazione del paywall
    document.getElementById('paywall-h3').innerHTML = t.PAYWALL_H3.replace('!', `, ${userName}!`);

    // Inizializza i bottoni di acquisto
    initPaywallButtons();
}

/**
 * Inizializza i listener per i bottoni Standard e Premium.
 */
function initPaywallButtons() {
    const standardBtn = document.getElementById('btn-standard');
    const premiumBtn = document.getElementById('btn-premium');

    if (standardBtn) {
        // Report Standard: mostra il report, nascondendo i contenuti premium
        standardBtn.onclick = () => showReport(window.quizResults, 'standard');
    }
    if (premiumBtn) {
        // Report Premium: mostra il report, includendo i contenuti premium
        premiumBtn.onclick = () => showReport(window.quizResults, 'premium');
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

    // Nasconde il paywall e mostra il report
    document.getElementById('paywall').style.display = 'none';
    reportElement.style.display = 'block';

    // 1. Dati Principali
    const reportHeader = reportElement.querySelector('.report-header h1');
    reportHeader.innerHTML = `${t.TITLE} - ${userName}`; // Aggiunge il nome nel titolo

    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('risk-level').textContent = riskData.level;
    document.getElementById('report-date').textContent = `Data: ${new Date().toLocaleDateString(CONFIG.I18N_LOCALE)}`;

    // 2. Livello di Rischio e Analisi
    const riskLevelContainer = document.getElementById('risk-level-container');
    riskLevelContainer.className = `score-box ${riskData.cssClass}`;
    document.getElementById('profile-text').textContent = riskData.profileText;
    document.getElementById('analysis-text').textContent = riskData.analysisText;

    // 3. Grafico Radar
    renderRadarChart(axisScores, riskData.cssClass);

    // 4. Riepilogo Dettagliato dei Punteggi (Impact List)
    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = '';
    const sortedAxes = Object.keys(axisScores).sort((a, b) => axisScores[b] - axisScores[a]);

    sortedAxes.forEach(axis => {
        const score = axisScores[axis];
        const maxAxisScore = 3 * (QUIZ_QUESTIONS.filter(q => q.axis === axis).length);
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

    userAnswers.forEach(answer => {
        const questionText = t[answer.questionKey] || QUIZ_QUESTIONS.find(q => `Q${userAnswers.indexOf(answer) + 1}` === answer.questionKey).question;
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

            // Dati del piano d'azione prioritario
            const priorityAxis = riskData.priorityAxis;
            const priorityPlan = AXIS_PLANS_I18N[priorityAxis];
            const priorityPlanI18n = priorityPlan[CONFIG.I18N_LOCALE];

            document.getElementById('priority-action').innerHTML = `
                <h4 class="${priorityPlan.cssClass}">🔥 ${priorityPlanI18n.priorityTitle}</h4>
                <p>${priorityPlanI18n.priorityDetail}</p>
            `;

            // Piano 7 giorni
            const daysPlanList = document.getElementById('days-plan-list');
            daysPlanList.innerHTML = '';
            priorityPlanI18n.dayPlan.forEach(step => {
                const listItem = document.createElement('li');
                listItem.textContent = step;
                daysPlanList.appendChild(listItem);
            });

            // Risorse
            document.getElementById('resources-text').textContent = RESOURCES_I18N[CONFIG.I18N_LOCALE] || RESOURCES_I18N['it'];

        } else {
            // Nasconde i contenuti Premium per il piano Standard
            premiumContent.style.display = 'none';
        }
    }

    // Abilita il bottone di download PDF (Placeholder)
    const downloadBtn = document.getElementById('download-pdf-btn');
    if(downloadBtn) {
        downloadBtn.onclick = () => alert('La funzione di download PDF è un placeholder in questa versione.');
    }
}

/**
 * Genera il grafico Radar con i punteggi degli assi.
 * @param {object} axisScores - I punteggi di ogni asse di rischio.
 * @param {string} riskCssClass - La classe di rischio (per il colore del grafico).
 */
let riskRadarChart = null; // Variabile per mantenere l'istanza del grafico

function renderRadarChart(axisScores, riskCssClass) {
    const ctx = document.getElementById('riskRadarChart');
    if (!ctx) return;

    // Distrugge l'istanza precedente se esiste
    if (riskRadarChart) {
        riskRadarChart.destroy();
    }

    // Mappa i nomi degli assi in base alla lingua
    const translatedLabels = Object.keys(axisScores).map(axis => {
        return TRANSLATIONS[CONFIG.I18N_LOCALE][`AXIS_${axis.replace(/ /g, '_')}`] || axis;
    });

    const dataValues = Object.values(axisScores);
    const maxScore = 3 * (QUIZ_QUESTIONS.length / 5); // 12 punti max per ogni asse (4 domande * 3 punti)

    let borderColor = '#007bff';
    let backgroundColor = 'rgba(0, 123, 255, 0.2)';

    if (riskCssClass.includes('risk-medium')) {
        borderColor = '#ffc107';
        backgroundColor = 'rgba(255, 193, 7, 0.2)';
    } else if (riskCssClass.includes('risk-high')) {
        borderColor = '#dc3545';
        backgroundColor = 'rgba(220, 53, 69, 0.2)';
    }

    riskRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: translatedLabels,
            datasets: [{
                label: 'Punteggio di Impatto',
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
// 4. INIZIALIZZAZIONE GLOBALE
// =========================================================================

/**
 * Funzione di inizializzazione che viene eseguita al caricamento del DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 0. Assicura che TUTTE le chiavi di traduzione di base siano presenti
    ensureAllTranslationsExist();

    // 1. Inizializzazione della logica di traduzione
    initLanguageSelector();
    applyTranslations(CONFIG.I18N_LOCALE); // Applica la lingua di default

    // 2. Popola le domande (questa funzione genera il quiz!)
    populateQuizQuestions();

    // 3. Collega il bottone di calcolo
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleCalculate);
    }

    // 4. Nasconde le sezioni di report all'avvio (gestisce anche scopri.html dove non esistono)
    const paywall = document.getElementById('paywall');
    const report = document.getElementById('report');

    if (paywall) paywall.style.display = 'none';
    if (report) report.style.display = 'none';
});
// Continua da 'RADAR'

                TITLE: "Analyse Detailliert nach Risikobereich",
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
            },
    fr: {
            FORM_TITLE: "Évaluation de la Dépendance Numérique",
            BTN_CALCULATE: "Calculer le Résultat",
            ALERT_COMPLETE_QUIZ: "Veuillez répondre aux 20 questions avant de calculer le résultat.",
            DEFAULT_USERNAME: "Utilisateur",
            PAYWALL_H3: "Votre Résultat est Prêt !",
            PAYWALL_P: "Pour débloquer votre rapport détaillé, choisissez l'option d'achat ci-dessous :",
            BTN_STANDARD: "Télécharger le Rapport de Base (€" + CONFIG.STANDARD_PRICE.toFixed(2).replace('.', ',') + ")",
            BTN_PREMIUM: "Acheter le Rapport Premium (€" + CONFIG.PREMIUM_PRICE.toFixed(2).replace('.', ',') + ")",
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
}; // <--- CHIUDE L'OGGETTO TRANSLATIONS

// =========================================================================
// 2. LOGICA MULTILINGUA (I18N)
// =========================================================================

/**
 * Chiavi che devono esistere in ogni lingua per garantire la coerenza.
 * Includono le risposte standard e gli assi di rischio.
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

/**
 * Assicura che ogni lingua abbia tutte le chiavi statiche e dinamiche (domande, risposte).
 * Previene l'errore "undefined" nel quiz.
 */
function ensureAllTranslationsExist() {
    const defaultLang = TRANSLATIONS[CONFIG.I18N_LOCALE];

    // 1. Assicura che le chiavi I18N_KEYS_TO_TRANSLATE siano in ogni lingua
    for (const code in TRANSLATIONS) {
        if (code === CONFIG.I18N_LOCALE) continue; // Salta la lingua di default

        const currentLang = TRANSLATIONS[code];
        for (const key in I18N_KEYS_TO_TRANSLATE) {
            if (!currentLang[key]) {
                // Aggiunge le risposte standard e gli assi mancanti copiando dall'italiano
                currentLang[key] = defaultLang[key] || I18N_KEYS_TO_TRANSLATE[key];
            }
        }
    }

    // 2. Aggiunge le chiavi delle domande QUIZ_QUESTIONS a tutte le lingue
    QUIZ_QUESTIONS.forEach((q, index) => {
        const key = `Q${index + 1}`;
        for (const code in TRANSLATIONS) {
            if (!TRANSLATIONS[code][key]) {
                TRANSLATIONS[code][key] = q.question; // Usa il testo IT come fallback
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
        } else if (key.startsWith('AXIS_') && t[key.replace(/ /g, '_')]) {
             // Gestisce la traduzione degli assi di rischio (es. AXIS_Sleep & Rituals)
            element.innerHTML = t[key.replace(/ /g, '_')];
        }
    });

    // Aggiorna il valore corrente della lingua salvata
    CONFIG.I18N_LOCALE = locale;

    // Ricarica il quiz per applicare le traduzioni alle domande generate dinamicamente
    populateQuizQuestions();
}

/**
 * Inizializza il selettore di lingua nell'header.
 */
function initLanguageSelector() {
    const selectorContainer = document.getElementById('language-selector');
    if (!selectorContainer) return;

    AVAILABLE_LANGUAGES.forEach(lang => {
        const button = document.createElement('button');
        button.className = 'lang-btn';
        button.innerHTML = lang.flag;
        button.setAttribute('title', lang.name);
        button.onclick = () => applyTranslations(lang.code);
        selectorContainer.appendChild(button);
    });

    // Applica la classe 'active' al bottone della lingua corrente
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('title').includes(TRANSLATIONS[CONFIG.I18N_LOCALE]?.SITE_TITLE.split(' ')[0] || AVAILABLE_LANGUAGES[0].name.split(' ')[0])) {
             // Il controllo è generico per evitare dipendenza dal nome esatto
             // In realtà, viene gestito dal applyTranslations chiamato all'avvio
        }
    });
}

// =========================================================================
// 3. LOGICA QUIZ E REPORT
// =========================================================================

/**
 * Popola il contenitore delle domande del quiz.
 */
function populateQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');

    // Se l'elemento non esiste (cioè siamo su scopri.html), esci.
    if (!container) {
        return;
    }

    container.innerHTML = ''; // Pulisci il contenitore
    const currentLocale = CONFIG.I18N_LOCALE;
    const t = TRANSLATIONS[currentLocale];

    QUIZ_QUESTIONS.forEach((q, index) => {
        const qIndex = index + 1;
        const qKey = `Q${qIndex}`;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = `
            <p class="question-text">${qIndex}. ${t[qKey] || q.question}</p>
            <div class="radio-group" data-question-index="${index}">
                <input type="radio" id="q${qIndex}a0" name="q${qIndex}" value="0" required><label for="q${qIndex}a0">${t.ANSWER_0}</label>
                <input type="radio" id="q${qIndex}a1" name="q${qIndex}" value="1"><label for="q${qIndex}a1">${t.ANSWER_1}</label>
                <input type="radio" id="q${qIndex}a2" name="q${qIndex}" value="2"><label for="q${qIndex}a2">${t.ANSWER_2}</label>
                <input type="radio" id="q${qIndex}a3" name="q${qIndex}" value="3"><label for="q${qIndex}a3">${t.ANSWER_3}</label>
            </div>
        `;
        container.appendChild(questionDiv);
    });

    // Aggiorna l'elemento del punteggio massimo
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

    // Se il risultato è stato trovato, aggiunge l'asse prioritario
    if (result) {
        result.priorityAxis = priorityAxis;
    }

    return result;
}

/**
 * Gestisce l'evento di calcolo, raccoglie i dati e visualizza il report o il paywall.
 */
function handleCalculate() {
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

            // Registra la risposta per il report dettagliato
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

    // Salva i risultati in una variabile globale per l'accesso futuro (es. paywall)
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

    // Aggiorna l'intestazione del paywall
    document.getElementById('paywall-h3').innerHTML = t.PAYWALL_H3.replace('!', `, ${userName}!`);

    // Inizializza i bottoni di acquisto
    initPaywallButtons();
}

/**
 * Inizializza i listener per i bottoni Standard e Premium.
 */
function initPaywallButtons() {
    const standardBtn = document.getElementById('btn-standard');
    const premiumBtn = document.getElementById('btn-premium');

    if (standardBtn) {
        // Report Standard: mostra il report, nascondendo i contenuti premium
        standardBtn.onclick = () => showReport(window.quizResults, 'standard');
    }
    if (premiumBtn) {
        // Report Premium: mostra il report, includendo i contenuti premium
        premiumBtn.onclick = () => showReport(window.quizResults, 'premium');
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

    // Nasconde il paywall e mostra il report
    document.getElementById('paywall').style.display = 'none';
    reportElement.style.display = 'block';

    // 1. Dati Principali
    const reportHeader = reportElement.querySelector('.report-header h1');
    reportHeader.innerHTML = `${t.TITLE} - ${userName}`; // Aggiunge il nome nel titolo

    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('risk-level').textContent = riskData.level;
    document.getElementById('report-date').textContent = `Data: ${new Date().toLocaleDateString(CONFIG.I18N_LOCALE)}`;

    // 2. Livello di Rischio e Analisi
    const riskLevelContainer = document.getElementById('risk-level-container');
    riskLevelContainer.className = `score-box ${riskData.cssClass}`;
    document.getElementById('profile-text').textContent = riskData.profileText;
    document.getElementById('analysis-text').textContent = riskData.analysisText;

    // 3. Grafico Radar
    renderRadarChart(axisScores, riskData.cssClass);

    // 4. Riepilogo Dettagliato dei Punteggi (Impact List)
    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = '';
    const sortedAxes = Object.keys(axisScores).sort((a, b) => axisScores[b] - axisScores[a]);

    sortedAxes.forEach(axis => {
        const score = axisScores[axis];
        const maxAxisScore = 3 * (QUIZ_QUESTIONS.filter(q => q.axis === axis).length);
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

    userAnswers.forEach(answer => {
        const questionText = t[answer.questionKey] || QUIZ_QUESTIONS.find(q => `Q${userAnswers.indexOf(answer) + 1}` === answer.questionKey).question;
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

            // Dati del piano d'azione prioritario
            const priorityAxis = riskData.priorityAxis;
            const priorityPlan = AXIS_PLANS_I18N[priorityAxis];
            const priorityPlanI18n = priorityPlan[CONFIG.I18N_LOCALE];

            document.getElementById('priority-action').innerHTML = `
                <h4 class="${priorityPlan.cssClass}">🔥 ${priorityPlanI18n.priorityTitle}</h4>
                <p>${priorityPlanI18n.priorityDetail}</p>
            `;

            // Piano 7 giorni
            const daysPlanList = document.getElementById('days-plan-list');
            daysPlanList.innerHTML = '';
            priorityPlanI18n.dayPlan.forEach(step => {
                const listItem = document.createElement('li');
                listItem.textContent = step;
                daysPlanList.appendChild(listItem);
            });

            // Risorse
            document.getElementById('resources-text').textContent = RESOURCES_I18N[CONFIG.I18N_LOCALE] || RESOURCES_I18N['it'];

        } else {
            // Nasconde i contenuti Premium per il piano Standard
            premiumContent.style.display = 'none';
        }
    }

    // Abilita il bottone di download PDF (Placeholder)
    const downloadBtn = document.getElementById('download-pdf-btn');
    if(downloadBtn) {
        downloadBtn.onclick = () => alert('La funzione di download PDF è un placeholder in questa versione.');
    }
}

/**
 * Genera il grafico Radar con i punteggi degli assi.
 * @param {object} axisScores - I punteggi di ogni asse di rischio.
 * @param {string} riskCssClass - La classe di rischio (per il colore del grafico).
 */
let riskRadarChart = null; // Variabile per mantenere l'istanza del grafico

function renderRadarChart(axisScores, riskCssClass) {
    const ctx = document.getElementById('riskRadarChart');
    if (!ctx) return;

    // Distrugge l'istanza precedente se esiste
    if (riskRadarChart) {
        riskRadarChart.destroy();
    }

    // Mappa i nomi degli assi in base alla lingua
    const translatedLabels = Object.keys(axisScores).map(axis => {
        return TRANSLATIONS[CONFIG.I18N_LOCALE][`AXIS_${axis.replace(/ /g, '_')}`] || axis;
    });

    const dataValues = Object.values(axisScores);
    const maxScore = 3 * (QUIZ_QUESTIONS.length / 5); // 12 punti max per ogni asse (4 domande * 3 punti)

    let borderColor = '#007bff';
    let backgroundColor = 'rgba(0, 123, 255, 0.2)';

    if (riskCssClass.includes('risk-medium')) {
        borderColor = '#ffc107';
        backgroundColor = 'rgba(255, 193, 7, 0.2)';
    } else if (riskCssClass.includes('risk-high')) {
        borderColor = '#dc3545';
        backgroundColor = 'rgba(220, 53, 69, 0.2)';
    }

    riskRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: translatedLabels,
            datasets: [{
                label: 'Punteggio di Impatto',
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
// 4. INIZIALIZZAZIONE GLOBALE
// =========================================================================

/**
 * Funzione di inizializzazione che viene eseguita al caricamento del DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 0. Assicura che TUTTE le chiavi di traduzione di base siano presenti
    ensureAllTranslationsExist();

    // 1. Inizializzazione della logica di traduzione
    initLanguageSelector();
    applyTranslations(CONFIG.I18N_LOCALE); // Applica la lingua di default

    // 2. Popola le domande (questa funzione genera il quiz!)
    populateQuizQuestions();

    // 3. Collega il bottone di calcolo
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleCalculate);
    }

    // 4. Nasconde le sezioni di report all'avvio (gestisce anche scopri.html dove non esistono)
    const paywall = document.getElementById('paywall');
    const report = document.getElementById('report');

    if (paywall) paywall.style.display = 'none';
    if (report) report.style.display = 'none';
});
