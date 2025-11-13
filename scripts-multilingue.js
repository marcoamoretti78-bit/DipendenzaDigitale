// =========================================================================
// SCRIPTS-MULTILINGUE.JS - Versione ottimizzata per pagine già tradotte
// =========================================================================
// Versione pulita di scripts.final.js SENZA applyTranslations() e TRANSLATIONS
// per evitare conflitti con il contenuto già tradotto nelle pagine multilingue
// =========================================================================

// =========================================================================
// 1. CONFIGURAZIONE GLOBALE e DATI
// =========================================================================

const CONFIG = {
    I18N_LOCALE: 'it',
    MAX_SCORE: 60,
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
// Domande del quiz tradotte in tutte le lingue
const QUIZ_QUESTIONS_I18N = {
    it: [
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
        { id: 20, question: "Usi il telefono mentre guidi o cammini, rischiando la tua sicurezza o quella degli altri?", axis: 'Social & Presence' }
    ],
    en: [
        { id: 1, question: "Do you check your phone as the first thing in the morning and/or last thing before sleeping?", axis: 'Sleep & Rituals' },
        { id: 2, question: "Is your sleep disturbed because you use electronic devices in bed or shortly before going to bed?", axis: 'Sleep & Rituals' },
        { id: 3, question: "Do you wake up at night to check notifications or messages?", axis: 'Sleep & Rituals' },
        { id: 4, question: "Do you find it difficult to establish 'phone-free' moments (e.g., during meals or conversations)?", axis: 'Sleep & Rituals' },
        { id: 5, question: "Do phone notifications frequently distract you from important tasks or studies?", axis: 'Productivity & Focus' },
        { id: 6, question: "Do you find yourself scrolling social media or browsing the internet without a specific goal, wasting time?", axis: 'Productivity & Focus' },
        { id: 7, question: "Do you postpone offline commitments or activities (like cleaning, exercising) because of time spent online?", axis: 'Productivity & Focus' },
        { id: 8, question: "Do you have difficulty maintaining focus on a single activity for extended periods (more than 30 minutes)?", axis: 'Productivity & Focus' },
        { id: 9, question: "Is using your device your primary mechanism for dealing with boredom, stress, or negative feelings?", axis: 'Escape & Emotions' },
        { id: 10, question: "Do you feel anxious or irritable if you can't access your phone/internet for a period (e.g., dead battery or no Wi-Fi)?", axis: 'Escape & Emotions' },
        { id: 11, question: "Have you tried to reduce the time you spend online but failed to do so?", axis: 'Escape & Emotions' },
        { id: 12, question: "Do you hide from others the real time you spend on devices or specific apps?", axis: 'Escape & Emotions' },
        { id: 13, question: "Do you feel a physical need (like tingling or restlessness) when you can't check your phone?", axis: 'Habit & Compulsion' },
        { id: 14, question: "Do you continuously check your phone even when there are no active or incoming notifications?", axis: 'Habit & Compulsion' },
        { id: 15, question: "Do you feel FOMO (Fear of Missing Out) or the obligation to respond immediately to every notification or message?", axis: 'Habit & Compulsion' },
        { id: 16, question: "When watching a movie or attending a meeting, is your phone always within reach and do you check it regularly?", axis: 'Habit & Compulsion' },
        { id: 17, question: "Do you feel more comfortable communicating important messages or feelings through messaging rather than in person?", axis: 'Social & Presence' },
        { id: 18, question: "Have your virtual interactions (social media, games) replaced or significantly reduced time spent with friends and family offline?", axis: 'Social & Presence' },
        { id: 19, question: "Are you constantly worried about your online appearance (profile, posts, 'likes' received)?", axis: 'Social & Presence' },
        { id: 20, question: "Do you use your phone while driving or walking, risking your safety or that of others?", axis: 'Social & Presence' }
    ],
    es: [
        { id: 1, question: "¿Revisas tu teléfono como primera cosa por la mañana y/o como última cosa antes de dormir?", axis: 'Sleep & Rituals' },
        { id: 2, question: "¿Tu sueño se ve perturbado porque usas dispositivos electrónicos en la cama o poco antes de acostarte?", axis: 'Sleep & Rituals' },
        { id: 3, question: "¿Te despiertas por la noche para revisar notificaciones o mensajes?", axis: 'Sleep & Rituals' },
        { id: 4, question: "¿Te resulta difícil establecer momentos 'sin teléfono' (ej. durante las comidas o conversaciones)?", axis: 'Sleep & Rituals' },
        { id: 5, question: "¿Las notificaciones del teléfono te distraen frecuentemente de tareas o estudios importantes?", axis: 'Productivity & Focus' },
        { id: 6, question: "¿Te encuentras desplazándote por las redes sociales o navegando por internet sin un objetivo específico, perdiendo tiempo?", axis: 'Productivity & Focus' },
        { id: 7, question: "¿Pospones compromisos o actividades fuera de línea (como limpiar, hacer ejercicio) debido al tiempo pasado en línea?", axis: 'Productivity & Focus' },
        { id: 8, question: "¿Tienes dificultad para mantener la concentración en una sola actividad por períodos prolongados (más de 30 minutos)?", axis: 'Productivity & Focus' },
        { id: 9, question: "¿Usar tu dispositivo es tu mecanismo principal para lidiar con el aburrimiento, estrés o sentimientos negativos?", axis: 'Escape & Emotions' },
        { id: 10, question: "¿Te sientes ansioso o irritable si no puedes acceder a tu teléfono/internet por un período (ej. batería agotada o sin Wi-Fi)?", axis: 'Escape & Emotions' },
        { id: 11, question: "¿Has intentado reducir el tiempo que pasas en línea pero no has logrado hacerlo?", axis: 'Escape & Emotions' },
        { id: 12, question: "¿Ocultas a otros el tiempo real que pasas en dispositivos o aplicaciones específicas?", axis: 'Escape & Emotions' },
        { id: 13, question: "¿Sientes una necesidad física (como hormigueo o inquietud) cuando no puedes revisar tu teléfono?", axis: 'Habit & Compulsion' },
        { id: 14, question: "¿Revisas continuamente tu teléfono incluso cuando no hay notificaciones activas o entrantes?", axis: 'Habit & Compulsion' },
        { id: 15, question: "¿Sientes FOMO (Miedo a Perderse Algo) o la obligación de responder inmediatamente a cada notificación o mensaje?", axis: 'Habit & Compulsion' },
        { id: 16, question: "¿Cuando ves una película o participas en una reunión, tu teléfono está siempre al alcance y lo revisas regularmente?", axis: 'Habit & Compulsion' },
        { id: 17, question: "¿Te sientes más cómodo comunicando mensajes o sentimientos importantes a través de mensajería que en persona?", axis: 'Social & Presence' },
        { id: 18, question: "¿Tus interacciones virtuales (redes sociales, juegos) han reemplazado o reducido significativamente el tiempo pasado con amigos y familia fuera de línea?", axis: 'Social & Presence' },
        { id: 19, question: "¿Estás constantemente preocupado por tu apariencia en línea (perfil, publicaciones, 'me gusta' recibidos)?", axis: 'Social & Presence' },
        { id: 20, question: "¿Usas tu teléfono mientras conduces o caminas, arriesgando tu seguridad o la de otros?", axis: 'Social & Presence' }
    ],
    de: [
        { id: 1, question: "Überprüfen Sie Ihr Telefon als erstes am Morgen und/oder als letztes vor dem Schlafengehen?", axis: 'Sleep & Rituals' },
        { id: 2, question: "Ist Ihr Schlaf gestört, weil Sie elektronische Geräte im Bett oder kurz vor dem Schlafengehen verwenden?", axis: 'Sleep & Rituals' },
        { id: 3, question: "Wachen Sie nachts auf, um Benachrichtigungen oder Nachrichten zu überprüfen?", axis: 'Sleep & Rituals' },
        { id: 4, question: "Fällt es Ihnen schwer, 'handyfreie' Momente zu etablieren (z.B. während der Mahlzeiten oder Gespräche)?", axis: 'Sleep & Rituals' },
        { id: 5, question: "Lenken Sie Telefonbenachrichtigungen häufig von wichtigen Aufgaben oder Studien ab?", axis: 'Productivity & Focus' },
        { id: 6, question: "Erwischen Sie sich dabei, wie Sie durch soziale Medien scrollen oder im Internet surfen ohne ein spezifisches Ziel und dabei Zeit verschwenden?", axis: 'Productivity & Focus' },
        { id: 7, question: "Verschieben Sie Offline-Verpflichtungen oder Aktivitäten (wie Putzen, Sport) aufgrund der Zeit, die Sie online verbringen?", axis: 'Productivity & Focus' },
        { id: 8, question: "Haben Sie Schwierigkeiten, sich für längere Zeiträume (mehr als 30 Minuten) auf eine einzige Aktivität zu konzentrieren?", axis: 'Productivity & Focus' },
        { id: 9, question: "Ist die Verwendung Ihres Geräts Ihr Hauptmechanismus, um mit Langeweile, Stress oder negativen Gefühlen umzugehen?", axis: 'Escape & Emotions' },
        { id: 10, question: "Fühlen Sie sich ängstlich oder gereizt, wenn Sie für eine Zeit nicht auf Ihr Telefon/Internet zugreifen können (z.B. leere Batterie oder kein WLAN)?", axis: 'Escape & Emotions' },
        { id: 11, question: "Haben Sie versucht, die Zeit, die Sie online verbringen, zu reduzieren, sind aber gescheitert?", axis: 'Escape & Emotions' },
        { id: 12, question: "Verbergen Sie vor anderen die tatsächliche Zeit, die Sie mit Geräten oder bestimmten Apps verbringen?", axis: 'Escape & Emotions' },
        { id: 13, question: "Verspüren Sie ein körperliches Bedürfnis (wie Kribbeln oder Unruhe), wenn Sie Ihr Telefon nicht überprüfen können?", axis: 'Habit & Compulsion' },
        { id: 14, question: "Überprüfen Sie Ihr Telefon kontinuierlich, auch wenn keine aktiven oder eingehenden Benachrichtigungen vorhanden sind?", axis: 'Habit & Compulsion' },
        { id: 15, question: "Verspüren Sie FOMO (Angst, etwas zu verpassen) oder die Verpflichtung, sofort auf jede Benachrichtigung oder Nachricht zu antworten?", axis: 'Habit & Compulsion' },
        { id: 16, question: "Ist Ihr Telefon beim Anschauen eines Films oder der Teilnahme an einem Meeting immer in Reichweite und überprüfen Sie es regelmäßig?", axis: 'Habit & Compulsion' },
        { id: 17, question: "Fühlen Sie sich wohler dabei, wichtige Nachrichten oder Gefühle über Messaging zu kommunizieren als persönlich?", axis: 'Social & Presence' },
        { id: 18, question: "Haben Ihre virtuellen Interaktionen (soziale Medien, Spiele) die Zeit mit Freunden und Familie offline ersetzt oder erheblich reduziert?", axis: 'Social & Presence' },
        { id: 19, question: "Sind Sie ständig besorgt über Ihr Online-Erscheinungsbild (Profil, Posts, erhaltene 'Likes')?", axis: 'Social & Presence' },
        { id: 20, question: "Verwenden Sie Ihr Telefon beim Fahren oder Gehen und riskieren dabei Ihre Sicherheit oder die anderer?", axis: 'Social & Presence' }
    ],
    fr: [
        { id: 1, question: "Vérifiez-vous votre téléphone comme première chose le matin et/ou comme dernière chose avant de dormir?", axis: 'Sleep & Rituals' },
        { id: 2, question: "Votre sommeil est-il perturbé parce que vous utilisez des appareils électroniques au lit ou peu avant de vous coucher?", axis: 'Sleep & Rituals' },
        { id: 3, question: "Vous réveillez-vous la nuit pour vérifier les notifications ou les messages?", axis: 'Sleep & Rituals' },
        { id: 4, question: "Trouvez-vous difficile d'établir des moments 'sans téléphone' (ex. pendant les repas ou les conversations)?", axis: 'Sleep & Rituals' },
        { id: 5, question: "Les notifications du téléphone vous distraient-elles fréquemment de tâches ou d'études importantes?", axis: 'Productivity & Focus' },
        { id: 6, question: "Vous retrouvez-vous à faire défiler les réseaux sociaux ou naviguer sur internet sans objectif spécifique, perdant du temps?", axis: 'Productivity & Focus' },
        { id: 7, question: "Reportez-vous des engagements ou activités hors ligne (comme nettoyer, faire de l'exercice) à cause du temps passé en ligne?", axis: 'Productivity & Focus' },
        { id: 8, question: "Avez-vous des difficultés à maintenir la concentration sur une seule activité pendant des périodes prolongées (plus de 30 minutes)?", axis: 'Productivity & Focus' },
        { id: 9, question: "Utiliser votre appareil est-il votre mécanisme principal pour faire face à l'ennui, au stress ou aux sentiments négatifs?", axis: 'Escape & Emotions' },
        { id: 10, question: "Vous sentez-vous anxieux ou irritable si vous ne pouvez pas accéder à votre téléphone/internet pendant une période (ex. batterie déchargée ou pas de Wi-Fi)?", axis: 'Escape & Emotions' },
        { id: 11, question: "Avez-vous essayé de réduire le temps que vous passez en ligne mais avez échoué à le faire?", axis: 'Escape & Emotions' },
        { id: 12, question: "Cachez-vous aux autres le temps réel que vous passez sur les appareils ou applications spécifiques?", axis: 'Escape & Emotions' },
        { id: 13, question: "Ressentez-vous un besoin physique (comme des picotements ou de l'agitation) quand vous ne pouvez pas vérifier votre téléphone?", axis: 'Habit & Compulsion' },
        { id: 14, question: "Vérifiez-vous continuellement votre téléphone même quand il n'y a pas de notifications actives ou entrantes?", axis: 'Habit & Compulsion' },
        { id: 15, question: "Ressentez-vous FOMO (Peur de Manquer Quelque Chose) ou l'obligation de répondre immédiatement à chaque notification ou message?", axis: 'Habit & Compulsion' },
        { id: 16, question: "Quand vous regardez un film ou participez à une réunion, votre téléphone est-il toujours à portée de main et le vérifiez-vous régulièrement?", axis: 'Habit & Compulsion' },
        { id: 17, question: "Vous sentez-vous plus à l'aise pour communiquer des messages ou sentiments importants via la messagerie plutôt qu'en personne?", axis: 'Social & Presence' },
        { id: 18, question: "Vos interactions virtuelles (réseaux sociaux, jeux) ont-elles remplacé ou significativement réduit le temps passé avec amis et famille hors ligne?", axis: 'Social & Presence' },
        { id: 19, question: "Êtes-vous constamment préoccupé par votre apparence en ligne (profil, publications, 'j'aime' reçus)?", axis: 'Social & Presence' },
        { id: 20, question: "Utilisez-vous votre téléphone en conduisant ou en marchant, risquant votre sécurité ou celle des autres?", axis: 'Social & Presence' }
    ]
};

// Testi delle risposte tradotti
const ANSWER_TEXTS_I18N = {
    it: { never: 'Mai', rarely: 'Raramente', often: 'Spesso', always: 'Sempre' },
    en: { never: 'Never', rarely: 'Rarely', often: 'Often', always: 'Always' },
    es: { never: 'Nunca', rarely: 'Raramente', often: 'A menudo', always: 'Siempre' },
    de: { never: 'Nie', rarely: 'Selten', often: 'Oft', always: 'Immer' },
    fr: { never: 'Jamais', rarely: 'Rarement', often: 'Souvent', always: 'Toujours' }
};
// =========================================================================
// VARIABILI GLOBALI DEL QUIZ
// =========================================================================
let currentQuestionIndex = 0;
let quizAnswers = [];

const RISK_PROFILES_I18N = {
    LOW: {
        minScore: 0, maxScore: 20, cssClass: 'risk-low',
        it: { level: 'Basso', profileText: 'Uso Consapevole', analysisText: 'La tua relazione con il digitale è sana. Sei in grado di stabilire limiti e l\'uso del dispositivo non interferisce significativamente con la tua vita. Mantieni questa consapevolezza!' },
        en: { level: 'Low', profileText: 'Conscious Use', analysisText: 'Your relationship with digital technology is healthy. You are able to set limits and device use does not significantly interfere with your life. Maintain this awareness!' },
        es: { level: 'Bajo', profileText: 'Uso Consciente', analysisText: 'Tu relación con lo digital es saludable. Eres capaz de establecer límites y el uso del dispositivo no interfiere significativamente con tu vida. ¡Mantén esta conciencia!' },
        de: { level: 'Niedrig', profileText: 'Bewusster Konsum', analysisText: 'Ihre Beziehung zur digitalen Welt ist gesund. Sie können Grenzen setzen, und die Gerätenutzung beeinträchtigt Ihr Leben nicht wesentlich. Behalten Sie dieses Bewusstsein bei!' },
        fr: { level: 'Faible', profileText: 'Usage Conscient', analysisText: 'Votre relation avec le numérique est saine. Vous êtes capable de fixer des limites et l\'utilisation de l\'appareil n\'interfère pas significativement avec votre vie. Maintenez cette conscience !' }
    },
    MEDIUM: {
        minScore: 21, maxScore: 40, cssClass: 'risk-medium',
        it: { level: 'Medio', profileText: 'Rischio di Abitudine', analysisText: 'Stai entrando in una zona di rischio. L\'uso del dispositivo è in aumento e comincia a influenzare la tua produttività e il tuo sonno. È il momento di stabilire nuove abitudini prima che diventi un problema serio.' },
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
        fr: { level: 'Élevé', profileText: 'Dépendance Potentielle', analysisText: 'Votre score indique une dépendance significative à votre appareil, impactant négativement la santé mentale, physique et les relations. L\'urgence d\'agir est élevée. Envisagez le plan d\'action Premium et, si nécessaire, une consultation professionnelle.' }
    }
};

const AXIS_PLANS_I18N = {
  "Sleep & Rituals": {
    cssClass: "risk-medium",
    it: { title: "Piano d'Azione Sonno e Rituali", dayPlan: ["Giorno 1: Vai a dormire senza dispositivi elettronici.", "Giorno 2: Spegni tutti gli schermi 30 minuti prima di coricarti.", "Giorno 3: Stabilisci una routine serale rilassante.", "Giorno 4: Non controllare il telefono durante la notte.", "Giorno 5: Fai stretching o meditazione prima di dormire.", "Giorno 6: Leggi un libro cartaceo a letto.", "Giorno 7: Valuta la qualità del tuo sonno."] },
    en: { title: "Sleep & Rituals Action Plan", dayPlan: ["Day 1: Go to bed without electronic devices.", "Day 2: Turn off all screens 30 minutes before sleep.", "Day 3: Set a relaxing evening routine.", "Day 4: Do not check your phone during the night.", "Day 5: Do stretching or meditation before sleep.", "Day 6: Read a paper book in bed.", "Day 7: Evaluate your sleep quality."] },
    es: { title: "Plan de Acción de Sueño y Rituales", dayPlan: ["Día 1: Ve a dormir sin dispositivos electrónicos.", "Día 2: Apaga todas las pantallas 30 minutos antes de acostarte.", "Día 3: Establece una rutina nocturna relajante.", "Día 4: No revises el teléfono durante la noche.", "Día 5: Haz estiramientos o meditación antes de dormir.", "Día 6: Lee un libro físico en la cama.", "Día 7: Evalúa la calidad de tu sueño."] },
    fr: { title: "Plan d'action Sommeil et Rituels", dayPlan: ["Jour 1 : Couchez-vous sans appareils électroniques.", "Jour 2 : Éteignez tous les écrans 30 minutes avant de dormir.", "Jour 3 : Adoptez une routine du soir relaxante.", "Jour 4 : Ne consultez pas votre téléphone la nuit.", "Jour 5 : Faites des étirements ou de la méditation avant de dormir.", "Jour 6 : Lisez un livre papier au lit.", "Jour 7 : Évaluez la qualité de votre sommeil."] },
    de: { title: "Aktionsplan Schlaf & Rituale", dayPlan: ["Tag 1: Gehe ohne elektronische Geräte ins Bett.", "Tag 2: Schalte alle Bildschirme 30 Minuten vor dem Schlafen aus.", "Tag 3: Etabliere eine entspannende Abendroutine.", "Tag 4: Überprüfe dein Handy nachts nicht.", "Tag 5: Mache Dehnübungen oder Meditation vor dem Schlafen.", "Tag 6: Lies ein gedrucktes Buch im Bett.", "Tag 7: Beurteile deine Schlafqualität."] }
  },
  "Productivity & Focus": {
    cssClass: "risk-medium",
    it: { title: "Piano d'Azione Produttività e Concentrazione", dayPlan: ["Giorno 1: Disattiva le notifiche mentre lavori.", "Giorno 2: Imposta sessioni di lavoro di 30 minuti senza distrazioni.", "Giorno 3: Usa la tecnica Pomodoro.", "Giorno 4: Elimina le app inutili dal telefono.", "Giorno 5: Fai una pausa offline dopo ogni ora.", "Giorno 6: Organizza la giornata con una lista di priorità.", "Giorno 7: Rifletti sui miglioramenti nella produttività."] },
    en: { title: "Productivity & Focus Action Plan", dayPlan: ["Day 1: Turn off notifications while working.", "Day 2: Set 30-minute work sessions without distractions.", "Day 3: Use the Pomodoro technique.", "Day 4: Remove unnecessary apps from your phone.", "Day 5: Take an offline break every hour.", "Day 6: Organize your day with a priority list.", "Day 7: Reflect on your productivity improvements."] },
    es: { title: "Plan de Acción de Productividad y Enfoque", dayPlan: ["Día 1: Desactiva las notificaciones mientras trabajas.", "Día 2: Establece sesiones de trabajo de 30 minutos sin distracciones.", "Día 3: Usa la técnica Pomodoro.", "Día 4: Elimina aplicaciones innecesarias.", "Día 5: Toma un descanso offline cada hora.", "Día 6: Organiza el día con una lista de prioridades.", "Día 7: Reflexiona sobre mejoras en productividad."] },
    fr: { title: "Plan d'action Productivité et Concentration", dayPlan: ["Jour 1 : Désactivez les notifications pendant le travail.", "Jour 2 : Programmez des sessions de travail de 30 minutes sans distraction.", "Jour 3 : Utilisez la technique Pomodoro.", "Jour 4 : Supprimez les applications inutiles.", "Jour 5 : Prenez une pause hors ligne chaque heure.", "Jour 6 : Organisez la journée avec une liste de priorités.", "Jour 7 : Réfléchissez aux améliorations de productivité."] },
    de: { title: "Aktionsplan Produktivität & Fokus", dayPlan: ["Tag 1: Schalte Benachrichtigungen während der Arbeit aus.", "Tag 2: Arbeite 30 Minuten ohne Ablenkungen.", "Tag 3: Nutze die Pomodoro-Technik.", "Tag 4: Entferne unnötige Apps vom Handy.", "Tag 5: Mache jede Stunde eine Offline-Pause.", "Tag 6: Organisiere deinen Tag mit einer Prioritätenliste.", "Tag 7: Reflektiere Verbesserungen in der Produktivität."] }
  },
  "Escape & Emotions": {
    cssClass: "risk-high",
    it: { title: "Piano d'Azione Fuga ed Emozioni", dayPlan: ["Giorno 1: Scrivi su un diario le emozioni che senti usando il telefono.", "Giorno 2: Fai una passeggiata quando ti senti stressato invece di usare il telefono.", "Giorno 3: Prova una pratica di mindfulness.", "Giorno 4: Parla con un amico di persona.", "Giorno 5: Ritagliati 30 minuti senza dispositivi.", "Giorno 6: Fai una lista di attività offline che ti piacciono.", "Giorno 7: Rifletti su come gestisci le emozioni senza lo smartphone."] },
    en: { title: "Escape & Emotions Action Plan", dayPlan: ["Day 1: Write in a journal about emotions felt using your phone.", "Day 2: Take a walk when stressed instead of using your phone.", "Day 3: Try a mindfulness practice.", "Day 4: Talk to a friend in person.", "Day 5: Take 30 minutes offline.", "Day 6: List offline activities you enjoy.", "Day 7: Reflect on handling emotions without your smartphone."] },
    es: { title: "Plan de Acción de Escape y Emociones", dayPlan: ["Día 1: Escribe en un diario las emociones que sientes usando el teléfono.", "Día 2: Da un paseo cuando estés estresado en vez de usar el teléfono.", "Día 3: Prueba una práctica de mindfulness.", "Día 4: Habla con un amigo cara a cara.", "Día 5: Dedica 30 minutos sin dispositivos.", "Día 6: Haz una lista de actividades offline que disfrutes.", "Día 7: Reflexiona sobre cómo gestionas emociones sin smartphone."] },
    fr: { title: "Plan d'action Évasion et Émotions", dayPlan: ["Jour 1 : Notez dans un journal les émotions ressenties avec le téléphone.", "Jour 2 : Promenez-vous quand vous êtes stressé au lieu d'utiliser le téléphone.", "Jour 3 : Essayez une pratique de pleine conscience.", "Jour 4 : Parlez avec un ami en personne.", "Jour 5 : Prenez 30 minutes hors ligne.", "Jour 6 : Listez les activités hors ligne que vous aimez.", "Jour 7 : Réfléchissez à la gestion des émotions sans smartphone."] },
    de: { title: "Aktionsplan Flucht & Emotionen", dayPlan: ["Tag 1: Schreibe in ein Tagebuch über Gefühle beim Handygebrauch.", "Tag 2: Mache einen Spaziergang bei Stress statt das Handy zu benutzen.", "Tag 3: Probiere eine Achtsamkeitsübung.", "Tag 4: Sprich mit einem Freund persönlich.", "Tag 5: 30 Minuten ohne Geräte verbringen.", "Tag 6: Liste Offline-Aktivitäten, die dir Spaß machen.", "Tag 7: Reflektiere den Umgang mit Emotionen ohne Smartphone."] }
  },
  "Habit & Compulsion": {
    cssClass: "risk-high",
    it: { title: "Piano d'Azione Abitudine e Compulsione", dayPlan: ["Giorno 1: Segna quante volte prendi il telefono.", "Giorno 2: Stabilisci momenti fissi di controllo.", "Giorno 3: Spegni il telefono per 1 ora.", "Giorno 4: Elimina app che creano dipendenza.", "Giorno 5: Fai una sfida 'zero smartphone' per una sera.", "Giorno 6: Cerca alternative offline ogni volta che vuoi prendere il telefono.", "Giorno 7: Rifletti sul cambiamento della tua routine."] },
    en: { title: "Habit & Compulsion Action Plan", dayPlan: ["Day 1: Track how many times you pick up your phone.", "Day 2: Set fixed times to check your phone.", "Day 3: Turn off your phone for 1 hour.", "Day 4: Remove addictive apps.", "Day 5: Try a 'zero smartphone' challenge for an evening.", "Day 6: Find offline alternatives each time you want your phone.", "Day 7: Reflect on routine changes."] },
    es: { title: "Plan de Acción de Hábito y Compulsión", dayPlan: ["Día 1: Anota cuántas veces tomas el teléfono.", "Día 2: Establece momentos fijos para revisar el móvil.", "Día 3: Apaga el móvil durante 1 hora.", "Día 4: Elimina apps adictivas.", "Día 5: Haz un reto de 'cero smartphone' una noche.", "Día 6: Busca alternativas offline cada vez que quieras el teléfono.", "Día 7: Reflexiona sobre los cambios en tu rutina."] },
    fr: { title: "Plan d'action Habitude et Compulsion", dayPlan: ["Jour 1 : Notez combien de fois vous prenez le téléphone.", "Jour 2 : Fixez des moments précis pour vérifier le téléphone.", "Jour 3 : Éteignez le téléphone pendant 1 heure.", "Jour 4 : Supprimez les applications addictives.", "Jour 5 : Relevez le défi 'zéro smartphone' une soirée.", "Jour 6 : Cherchez des alternatives hors ligne à chaque envie.", "Jour 7 : Réfléchissez aux changements de routine."] },
    de: { title: "Aktionsplan Gewohnheit & Zwang", dayPlan: ["Tag 1: Notiere, wie oft du das Handy in die Hand nimmst.", "Tag 2: Lege feste Zeiten zum Überprüfen fest.", "Tag 3: Schalte das Handy für 1 Stunde aus.", "Tag 4: Entferne süchtig machende Apps.", "Tag 5: Mache eine 'Zero Smartphone'-Challenge am Abend.", "Tag 6: Suche Offline-Alternativen bei jedem Griff zum Handy.", "Tag 7: Reflektiere die Veränderung deiner Routine."] }
  },
  "Social & Presence": {
    cssClass: "risk-low",
    it: { title: "Piano d'Azione Socialità e Presenza", dayPlan: ["Giorno 1: Metti il telefono in silenzioso e fuori vista con altre persone.", "Giorno 2: Lascia il telefono a casa durante un'uscita.", "Giorno 3: Non pubblicare subito le foto sui social.", "Giorno 4: Fai un check-in consapevole con te stesso.", "Giorno 5: Attività in compagnia senza smartphone.", "Giorno 6: Limita i social a 30 minuti al giorno.", "Giorno 7: Valuta i benefici della presenza reale."] },
    en: { title: "Social & Presence Action Plan", dayPlan: ["Day 1: Put your phone on silent and out of sight with others.", "Day 2: Leave your phone at home during a short outing.", "Day 3: Don't post photos immediately on social media.", "Day 4: Do a mindful check-in with yourself.", "Day 5: Activity with friends/family without smartphones.", "Day 6: Limit social media to 30 minutes a day.", "Day 7: Evaluate the benefits of real presence."] },
    es: { title: "Plan de Acción Social y Presencia", dayPlan: ["Día 1: Pon el móvil en silencio y fuera de la vista con otros.", "Día 2: Deja el móvil en casa durante una salida.", "Día 3: No publiques fotos inmediatamente en redes sociales.", "Día 4: Haz un chequeo consciente contigo mismo.", "Día 5: Actividad en grupo sin smartphones.", "Día 6: Limita las redes sociales a 30 minutos al día.", "Día 7: Evalúa los beneficios de la presencia real."] },
    fr: { title: "Plan d'action Social et Présence", dayPlan: ["Jour 1 : Mettez le téléphone en silencieux et hors de vue avec les autres.", "Jour 2 : Laissez le téléphone à la maison lors d'une sortie.", "Jour 3 : Ne publiez pas immédiatement les photos sur les réseaux.", "Jour 4 : Faites un check-in conscient avec vous-même.", "Jour 5 : Activité entre amis ou famille sans smartphones.", "Jour 6 : Limitez les réseaux sociaux à 30 minutes par jour.", "Jour 7 : Évaluez les bienfaits de la présence réelle."] },
    de: { title: "Aktionsplan Soziales & Präsenz", dayPlan: ["Tag 1: Handy stummschalten und aus dem Blickfeld legen.", "Tag 2: Handy bei einem Ausflug zu Hause lassen.", "Tag 3: Fotos nicht sofort in sozialen Medien posten.", "Tag 4: Bewusstes Selbst-Check-in machen.", "Tag 5: Aktivität mit Freunden/Familie ohne Smartphones.", "Tag 6: Social Media auf 30 Minuten pro Tag begrenzen.", "Tag 7: Bewerte die Vorteile realer Präsenz."] }
  }
};

const RESOURCES_I18N = {
    it: "Risorse aggiuntive consigliate: liberi dal 'Dopamine Detox' di Anna Lembke, app di mindfulness (es. Headspace o Calm) e un tracker di abitudini.",
    en: "Recommended additional resources: 'Dopamine Detox' by Anna Lembke, mindfulness apps (e.g., Headspace or Calm), and a habit tracker.",
    es: "Recursos adicionales recomendados: libre de 'Dopamine Detox' de Anna Lembke, aplicaciones de mindfulness (ej. Headspace o Calm) y un rastreador de hábitos.",
    de: "Empfohlene zusätzliche Ressourcen: 'Dopamine Detox' von Anna Lembke, Achtsamkeits-Apps (z. B. Headspace oder Calm) und ein Gewohnheits-Tracker.",
    fr: "Ressources supplémentaires recommandées : libre de 'Dopamine Detox' d'Anna Lembke, applications de pleine conscience (ex. Headspace ou Calm) et un suivi d'habitudes."
};

const AXIS_KEY_MAP = {
  "Sonno e Rituali": "Sleep & Rituals",
  "Produttività e Concentrazione": "Productivity & Focus",
  "Fuga ed Emozioni": "Escape & Emotions"
};

// =========================================================================
// 2. SELETTORE LINGUA - SOLO REDIRECT (NO applyTranslations)
// =========================================================================

function detectLanguageFromURL() {
    const path = window.location.pathname;
    if (path.includes('index-en')) return 'en';
    if (path.includes('index-es')) return 'es';
    if (path.includes('index-de')) return 'de';
    if (path.includes('index-fr')) return 'fr';
    return 'it';
}

function initLanguageSelector() {
    const selectorContainer = document.getElementById('language-selector');
    if (!selectorContainer) return;

    const currentLang = detectLanguageFromURL();
    CONFIG.I18N_LOCALE = currentLang;
    selectorContainer.innerHTML = '';

    AVAILABLE_LANGUAGES.forEach(lang => {
        const button = document.createElement('button');
        button.className = 'lang-btn';
        
        const currentPage = window.location.pathname;
        const isItalianPage = !currentPage.includes('index-en') && 
                             !currentPage.includes('index-es') && 
                             !currentPage.includes('index-de') && 
                             !currentPage.includes('index-fr') &&
                             !currentPage.includes('about-en') &&
                             !currentPage.includes('about-es') &&
                             !currentPage.includes('about-de') &&
                             !currentPage.includes('about-fr');
        
        if ((lang.code === 'it' && isItalianPage) || 
            (lang.code === 'en' && currentPage.includes('-en')) ||
            (lang.code === 'es' && currentPage.includes('-es')) ||
            (lang.code === 'de' && currentPage.includes('-de')) ||
            (lang.code === 'fr' && currentPage.includes('-fr'))) {
            button.classList.add('active');
        }
        
        button.innerHTML = lang.flag;
        button.setAttribute('title', lang.name);
        
        button.onclick = () => {
            if (lang.code === 'it') {
                window.location.href = 'index.html';
            } else {
                window.location.href = `index-${lang.code}.html`;
            }
        };
        
        selectorContainer.appendChild(button);
    });
}

// =========================================================================
// 3. LOGICA QUIZ - SEMPLIFICATA (senza traduzioni dinamiche)
// =========================================================================

function populateQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');
    if (!container) return;
    
    // Rileva la lingua corrente
    const currentLang = detectLanguageFromURL();
    
    // Usa le domande tradotte o fallback a italiano
    const questions = QUIZ_QUESTIONS_I18N[currentLang] || QUIZ_QUESTIONS_I18N.it;
    const answerTexts = ANSWER_TEXTS_I18N[currentLang] || ANSWER_TEXTS_I18N.it;
    
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-group';
        questionDiv.innerHTML = `
            <div class="question">
                <h3>${index + 1}. ${question.question}</h3>
                <div class="options">
                    <label class="option">
                        <input type="radio" name="q${question.id}" value="0" required>
                        <span>${answerTexts.never}</span>
                    </label>
                    <label class="option">
                        <input type="radio" name="q${question.id}" value="1" required>
                        <span>${answerTexts.rarely}</span>
                    </label>
                    <label class="option">
                        <input type="radio" name="q${question.id}" value="2" required>
                        <span>${answerTexts.often}</span>
                    </label>
                    <label class="option">
                        <input type="radio" name="q${question.id}" value="3" required>
                        <span>${answerTexts.always}</span>
                    </label>
                </div>
            </div>
        `;
        container.appendChild(questionDiv);
    });
    
    const maxScoreElement = document.getElementById('max-score');
    if (maxScoreElement) {
        maxScoreElement.textContent = CONFIG.MAX_SCORE;
    }
}
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

    const axisNames = Object.keys(axisScores);
    const priorityAxis = axisNames.reduce((a, b) => axisScores[a] > axisScores[b] ? a : b);

    if (result) {
        result.priorityAxis = priorityAxis;
    }

    return result;
}

function handleCalculate(event) {
    event.preventDefault();
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
        alert("Please answer all 20 questions before calculating the result.");
        return;
    }

    const userName = formData.get('userName') || "User";
    const riskData = getRiskLevel(totalScore, axisScores);

    window.quizResults = {
        totalScore,
        userName,
        riskData,
        axisScores,
        userAnswers
    };

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('paywall').style.display = 'block';

    const paywallH3 = document.getElementById('paywall-h3');
    if (paywallH3) {
        paywallH3.innerHTML = `Hi ${userName}, Your Result is Ready!`;
    }

    initPaywallButtons();
}

function initPaywallButtons() {
    const standardBtn = document.getElementById('btn-standard');
    const premiumBtn = document.getElementById('btn-premium');

    if (standardBtn) {
        standardBtn.onclick = () => showReport(window.quizResults, 'standard');
    }
    if (premiumBtn) {
        premiumBtn.onclick = () => showReport(window.quizResults, 'premium');
    }
}

function showReport(results, planType) {
    const { totalScore, userName, riskData, axisScores, userAnswers } = results;
    const reportElement = document.getElementById('report');

    document.getElementById('paywall').style.display = 'none';
    reportElement.style.display = 'block';

    const reportHeader = reportElement.querySelector('.report-header h1');
    reportHeader.innerHTML = `Personalized Digital Detox Report - ${userName}`;

    document.getElementById('final-score').textContent = totalScore;
    document.getElementById('risk-level').textContent = riskData.level;
    document.getElementById('report-date').textContent = `Date: ${new Date().toLocaleDateString()}`;

    const riskLevelContainer = document.getElementById('risk-level-container');
    riskLevelContainer.className = `score-box ${riskData.cssClass}`;
    const riskBadge = document.getElementById('risk-badge');
    const riskProgressBar = document.getElementById('risk-progress-bar');
    
    let barColor = '#4caf50';
    if (riskData.cssClass === 'risk-medium') barColor = '#ff9800';
    if (riskData.cssClass === 'risk-high') barColor = '#dc2626';
    
    const percent = Math.round((totalScore / CONFIG.MAX_SCORE) * 100);
    riskProgressBar.style.width = percent + '%';
    riskProgressBar.style.background = barColor;
    riskBadge.className = `risk-badge ${riskData.cssClass}`;
    
    document.getElementById('profile-text').textContent = riskData.profileText;
    document.getElementById('analysis-text').textContent = riskData.analysisText;

    if (typeof Chart !== 'undefined') {
        renderRadarChart(axisScores, riskData.cssClass);
    }

    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = '';
    const sortedAxes = Object.keys(axisScores).sort((a, b) => axisScores[b] - axisScores[a]);

    sortedAxes.forEach(axis => {
        const score = axisScores[axis];
        const questionsOnAxis = QUIZ_QUESTIONS.filter(q => q.axis === axis).length;
        const maxAxisScore = questionsOnAxis * 3;
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <strong>${axis}:</strong> ${score}/${maxAxisScore}
            <div class="score-bar"><div style="width: ${(score / maxAxisScore) * 100}%;"></div></div>
        `;
        impactList.appendChild(listItem);
    });

    const answersBody = document.getElementById('quiz-answers-body');
    answersBody.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const questionText = QUIZ_QUESTIONS[index].question;
        const answerLabels = ['Rarely', 'Sometimes', 'Often', 'Always'];
        const translatedAnswer = answerLabels[answer.answerScore];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${questionText}</td>
            <td>${translatedAnswer}</td>
            <td>${answer.answerScore}</td>
        `;
        answersBody.appendChild(row);
    });

    const premiumContent = document.querySelector('.premium-content');
    if (premiumContent) {
        if (planType === 'premium') {
            premiumContent.style.display = 'block';

            const priorityAxis = results.riskData.priorityAxis;
            const axisKey = AXIS_KEY_MAP[priorityAxis] || priorityAxis;
            const priorityPlan = AXIS_PLANS_I18N[axisKey];

            if (priorityPlan) {
                const priorityPlanLocale = priorityPlan[CONFIG.I18N_LOCALE] || priorityPlan['en'];

                document.getElementById('priority-action').innerHTML = `
                    <h4 class="${priorityPlan.cssClass}">🔥 ${priorityPlanLocale.title}</h4>
                `;

                const daysPlanList = document.getElementById('days-plan-list');
                daysPlanList.innerHTML = '';
                priorityPlanLocale.dayPlan.forEach(step => {
                    const listItem = document.createElement('li');
                    listItem.textContent = step;
                    daysPlanList.appendChild(listItem);
                });
            }

            document.getElementById('resources-text').textContent = RESOURCES_I18N[CONFIG.I18N_LOCALE] || RESOURCES_I18N['en'];
        } else {
            premiumContent.style.display = 'none';
        }
    }

    const downloadBtn = document.getElementById('download-pdf-btn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            downloadBtn.style.display = 'none';
            window.print();
            downloadBtn.style.display = 'block';
        };
    }
}

let riskRadarChart = null;

function renderRadarChart(axisScores, riskCssClass) {
    const ctx = document.getElementById('riskRadarChart');
    if (!ctx) return;

    if (riskRadarChart) {
        riskRadarChart.destroy();
    }

    const translatedLabels = Object.keys(axisScores);
    const dataValues = Object.values(axisScores);
    const maxScore = 12;

    let borderColor = '#28a745';
    let backgroundColor = 'rgba(40, 167, 69, 0.2)';

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
                label: 'Score',
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
// FUNZIONI PRINCIPALI DEL QUIZ
// =========================================================================

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = [];
    showSection('quiz');
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
        calculateResults();
        return;
    }

    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const progressFill = document.querySelector('.progress-fill');

    if (questionText) questionText.textContent = question.question;
    if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1;
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = QUIZ_QUESTIONS.length;

    if (progressFill) {
        const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
        progressFill.style.width = progress + '%';
    }

    if (answersContainer) {
        answersContainer.innerHTML = '';
        const answers = ['Mai', 'Raramente', 'Spesso', 'Sempre'];
        answers.forEach((answer, index) => {
            const label = document.createElement('label');
            label.className = 'answer-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = index;
            
            if (quizAnswers[currentQuestionIndex] !== undefined && quizAnswers[currentQuestionIndex] === index) {
                input.checked = true;
            }
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            answersContainer.appendChild(label);
        });
    }
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Seleziona una risposta prima di continuare.');
        return;
    }

    quizAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);
    currentQuestionIndex++;
    displayQuestion();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function calculateResults() {
    // Simula FormData per compatibilità con handleCalculate
    const form = document.createElement('form');
    const formData = new FormData();
    
    // Aggiunge le risposte al FormData
    quizAnswers.forEach((answer, index) => {
        formData.append(`q${index + 1}`, answer.toString());
    });
    
    // Chiama la funzione pagamenti esistente
    const fakeEvent = { preventDefault: () => {} };
    handleCalculate.call({ id: 'quiz-form' }, fakeEvent);
}

function displayResults(level, percentage) {
    // DISABILITATA - ora usiamo handleCalculate per i pagamenti
    /*
    showSection('results');
    
    const addictionLevel = document.getElementById('addictionLevel');
    const levelDescription = document.getElementById('levelDescription');
    const levelBar = document.getElementById('levelBar');
    
    if (addictionLevel) {
        const levelNames = {
            'basso': 'Low Risk',
            'moderato': 'Moderate Risk', 
            'alto': 'High Risk'
        };
        addictionLevel.textContent = levelNames[level] || 'Unknown';
    }
    
    if (levelDescription) {
        const descriptions = {
            'basso': 'You have a balanced relationship with technology.',
            'moderato': 'You might benefit from some strategies for more conscious use.',
            'alto': 'It is advisable to review your digital habits.'
        };
        levelDescription.textContent = descriptions[level] || 'Result not available';
    }
    
    if (levelBar) {
        levelBar.style.width = percentage + '%';
        levelBar.style.backgroundColor = level === 'alto' ? '#e74c3c' : 
                                       level === 'moderato' ? '#f39c12' : '#27ae60';
    }
    */
}
function restartQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = [];
    showSection('intro');
}
// =========================================================================
// 4. INIZIALIZZAZIONE
// =========================================================================

if (typeof window.quizResults === 'undefined') {
    window.quizResults = {};
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
     populateQuizQuestions();
    
   const startTestBtn = document.getElementById('scroll-to-quiz-btn');
if (startTestBtn) {
    startTestBtn.addEventListener('click', startQuiz);
}

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }

    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }

    const getReportBtn = document.getElementById('getReportBtn');
    if (getReportBtn) {
        getReportBtn.addEventListener('click', () => showSection('payment'));
    }

    const backToResultsBtn = document.getElementById('backToResultsBtn');
    if (backToResultsBtn) {
        backToResultsBtn.addEventListener('click', () => showSection('results'));
    }

    showSection('intro');
});
// =========================================================================
// 5. INTEGRAZIONE PAGAMENTI (PayPal e Stripe)
// =========================================================================

function initializePayPal() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: '1.99', currency_code: 'EUR' },
                    description: 'Report Base - Test Dipendenza Digitale'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                console.log('Pagamento Base completato:', details);
                alert('Pagamento completato! Transaction ID: ' + details.id);
                showReport(window.quizResults, 'standard');
            });
        },
        onError: function(err) {
            console.error('Errore PayPal:', err);
            alert('Errore nel pagamento. Riprova.');
        }
    }).render('#paypal-button-base');

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: '7.99', currency_code: 'EUR' },
                    description: 'Report Premium - Test Dipendenza Digitale'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                console.log('Pagamento Premium completato:', details);
                alert('Pagamento Premium completato! Transaction ID: ' + details.id);
                showReport(window.quizResults, 'premium');
            });
        },
        onError: function(err) {
            console.error('Errore PayPal:', err);
            alert('Errore nel pagamento. Riprova.');
        }
    }).render('#paypal-button-premium');
}

document.addEventListener('DOMContentLoaded', function() {
    const paywall = document.getElementById('paywall');
    if (paywall) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (paywall.style.display !== 'none') {
                        setTimeout(initializePayPal, 100);
                    }
                }
            });
        });
        observer.observe(paywall, { attributes: true });
    }
});

async function createPaymentIntentDirect(amount) {
    try {
        const response = await fetch('https://jovial-caramel-87b9d7.netlify.app/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount,
                currency: 'eur',
                metadata: {
                    product: amount === 199 ? 'basic_report' : 'premium_report',
                    timestamp: new Date().toISOString()
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        return {
            client_secret: data.clientSecret,
            payment_intent_id: data.paymentIntentId
        };
    } catch (error) {
        console.error('Errore creazione PaymentIntent:', error);
        throw new Error('Impossibile creare il pagamento');
    }
}

const stripe = Stripe('pk_live_51SOCy8H5Ur2FzId0h69aoH0AM2GWynOE2VbH6oZkGdBWgdbOn5vO03LccAgMnDFnRIQGZife19IuOyHCMBdH4t6C00QHopKY3o');

let cardElementBase = null;
let cardElementPremium = null;

function initializeStripe() {
    if (document.getElementById('card-number-base')) {
        const elementsBase = stripe.elements();
        
        const cardNumberBase = elementsBase.create('cardNumber', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        const cardExpiryBase = elementsBase.create('cardExpiry', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        const cardCvcBase = elementsBase.create('cardCvc', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        
        cardNumberBase.mount('#card-number-base');
        cardExpiryBase.mount('#card-expiry-base');
        cardCvcBase.mount('#card-cvc-base');
        cardElementBase = cardNumberBase;
    }

    if (document.getElementById('card-number-premium')) {
        const elementsPremium = stripe.elements();
        
        const cardNumberPremium = elementsPremium.create('cardNumber', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        const cardExpiryPremium = elementsPremium.create('cardExpiry', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        const cardCvcPremium = elementsPremium.create('cardCvc', {
            style: { base: { fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
        });
        
        cardNumberPremium.mount('#card-number-premium');
        cardExpiryPremium.mount('#card-expiry-premium');
        cardCvcPremium.mount('#card-cvc-premium');
        cardElementPremium = cardNumberPremium;
    }

    const stripeBaseBtn = document.getElementById('stripe-base-btn');
    const stripePremiumBtn = document.getElementById('stripe-premium-btn');

    if (stripeBaseBtn) {
        stripeBaseBtn.addEventListener('click', () => {
            const form = document.getElementById('stripe-base-form');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (stripePremiumBtn) {
        stripePremiumBtn.addEventListener('click', () => {
            const form = document.getElementById('stripe-premium-form');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
    }

    const stripeBaseSubmit = document.getElementById('stripe-base-submit');
    const stripePremiumSubmit = document.getElementById('stripe-premium-submit');

    if (stripeBaseSubmit) {
        stripeBaseSubmit.addEventListener('click', () => handleStripePayment('base', 199));
    }

    if (stripePremiumSubmit) {
        stripePremiumSubmit.addEventListener('click', () => handleStripePayment('premium', 799));
    }
}

async function handleStripePayment(type, amount) {
    const cardElement = type === 'base' ? cardElementBase : cardElementPremium;
    const submitBtn = document.getElementById(`stripe-${type}-submit`);
    
    if (!cardElement) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Elaborando...';

    try {
        const { client_secret, payment_intent_id } = await createPaymentIntentDirect(amount);
        
        const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: window.quizResults?.userName || 'Cliente Quiz Dipendenza Digitale',
                },
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        if (paymentIntent.status === 'succeeded') {
            console.log('Pagamento Stripe completato:', paymentIntent);
            alert(`Pagamento di €${(amount/100).toFixed(2)} completato! ID: ${paymentIntent.id}`);
            showReport(window.quizResults, type === 'base' ? 'standard' : 'premium');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                    transaction_id: paymentIntent.id,
                    value: amount/100,
                    currency: 'EUR',
                    items: [{
                        item_id: type + '_report',
                        item_name: type === 'base' ? 'Report Base' : 'Report Premium',
                        category: 'Digital Report',
                        quantity: 1,
                        price: amount/100
                    }]
                });
            }
        } else {
            throw new Error('Il pagamento non è stato completato correttamente');
        }
        
    } catch (error) {
        console.error('Errore nel pagamento Stripe:', error);
        alert(`Errore nel pagamento: ${error.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = type === 'base' ? 'Paga €1.99' : 'Paga €7.99';
    }
}

const originalInitializePayPal = initializePayPal;
initializePayPal = function() {
    originalInitializePayPal();
    setTimeout(initializeStripe, 200);
};
