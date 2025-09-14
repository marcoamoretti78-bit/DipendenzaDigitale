// scripts.js - Dipendenza Digitale

document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const paywall = document.getElementById("paywall");
  const userNameInput = document.getElementById("userName");

  // 20 domande
  const questions = [
    "Quanto spesso controlli il telefono appena sveglio?",
    "Ti capita di perdere tempo sui social senza accorgertene?",
    "Ti senti ansioso/a se non hai il telefono con te?",
    "Usi il telefono mentre parli con qualcuno?",
    "Ti distrai con notifiche durante lo studio o il lavoro?",
    "Controlli il telefono a tavola?",
    "Usi il telefono di notte o prima di dormire?",
    "Ti capita di guidare o camminare usando il telefono?",
    "Trascorri più di 4 ore al giorno sullo smartphone?",
    "Senti vibrazioni fantasma?",
    "Ti senti irrequieto/a senza accesso a internet?",
    "Usi il telefono per sfuggire a noia o stress?",
    "Trascuri attività fisiche per il telefono?",
    "Hai ricevuto critiche per l’uso del telefono?",
    "Ti capita di isolarti socialmente per stare online?",
    "Ti svegli di notte per controllare notifiche?",
    "Hai difficoltà a ridurre il tempo di utilizzo?",
    "Preferisci messaggi online a interazioni di persona?",
    "Ti senti nervoso/a se la batteria è quasi scarica?",
    "Il telefono influisce sulla tua produttività?"
  ];

  // Genera quiz dinamico
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${i + 1}. ${q}</p>
      <div class="options">
        <label><input type="radio" name="q${i}" value="0"> Mai</label>
        <label><input type="radio" name="q${i}" value="1"> Raramente</label>
        <label><input type="radio" name="q${i}" value="2"> Spesso</label>
        <label><input type="radio" name="q${i}" value="3"> Sempre</label>
      </div>`;
    quizForm.appendChild(div);
  });

  // Calcolo punteggio
  calculateBtn.addEventListener("click", () => {
    let total = 0, answered = 0;
    questions.forEach((_, i) => {
      const val = document.querySelector(`input[name="q${i}"]:checked`);
      if (val) {
        total += parseInt(val.value);
        answered++;
      }
    });

    if (answered < questions.length) {
      alert("Per favore rispondi a tutte le domande.");
      return;
    }

    const percentage = Math.round((total / (questions.length * 3)) * 100);

    // Salva i dati per il PDF
    window.resultData = {
      total,
      percentage,
      name: userNameInput.value.trim(),
      dateStr: new Date().toLocaleDateString("it-IT")
    };

    // Mostra paywall
    paywall.classList.remove("hidden");
    window.scrollTo({ top: paywall.offsetTop, behavior: "smooth" });
  });

  resetBtn.addEventListener("click", () => {
    quizForm.reset();
    paywall.classList.add("hidden");
  });

  // PayPal Sandbox
  if (document.getElementById("paypal-button-container")) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: "1.99", currency_code: "EUR" },
            description: "Report Premium Dipendenza Digitale"
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(() => {
          generatePDF(window.resultData);
        });
      }
    }).render("#paypal-button-container");
  }

  // Generazione PDF
  async function generatePDF(resultData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    // Titolo e Nome utente grande
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22); // Grande evidenza
    const who = resultData.name ? `Report personalizzato per ${resultData.name}` : "Report personalizzato";
    doc.text(who, margin, y);
    y += 28;

    // Data
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Data: ${resultData.dateStr}`, margin, y);
    y += 12;

    // Punteggio
    doc.setFontSize(14);
    doc.text(`Punteggio totale: ${resultData.total}`, margin, y);
    y += 10;
    doc.text(`Percentuale: ${resultData.percentage}%`, margin, y);
    y += 14;

    // Livello di rischio
    let livello = "";
    if (resultData.percentage < 30) livello = "Basso";
    else if (resultData.percentage < 60) livello = "Medio";
    else livello = "Alto";
    doc.text(`Livello di rischio: ${livello}`, margin, y);
    y += 20;

    // Consigli
    doc.setFont("Helvetica", "bold");
    doc.text("Consigli personalizzati:", margin, y);
    doc.setFont("Helvetica", "normal");
    y += 10;
    const consigli = {
      Basso: "Continua così! Mantieni abitudini sane e controlla regolarmente il tempo speso sul telefono.",
      Medio: "Presta attenzione: stabilisci limiti di tempo giornalieri e prova a disattivare le notifiche superflue.",
      Alto: "È importante agire subito: valuta momenti senza telefono, applicazioni detox e supporto da professionisti."
    };
    const text = consigli[livello];
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, margin, y);
    y += lines.length * 7 + 10;

    // Checklist
    doc.setFont("Helvetica", "bold");
    doc.text("Checklist quotidiana:", margin, y);
    doc.setFont("Helvetica", "normal");
    y += 10;
    const checklist = [
      "📵 Niente telefono 30 min dopo il risveglio",
      "🌙 Modalità notturna 1h prima di dormire",
      "✅ Limite massimo 2h social al giorno",
      "🤝 Attività offline ogni giorno"
    ];
    checklist.forEach(item => { doc.text(item, margin, y); y += 8; });
    y += 10;

    // Piano Detox
    doc.setFont("Helvetica", "bold");
    doc.text("Piano Digital Detox (7 giorni):", margin, y);
    doc.setFont("Helvetica", "normal");
    y += 10;
    const detox = [
      "Giorno 1: Spegni le notifiche non necessarie",
      "Giorno 2: Tieni il telefono fuori dalla camera da letto",
      "Giorno 3: Pausa di 2h senza telefono",
      "Giorno 4: Attività all’aperto senza telefono",
      "Giorno 5: Diario cartaceo al posto delle note digitali",
      "Giorno 6: Un pasto intero senza smartphone",
      "Giorno 7: Giornata con solo 1h di utilizzo"
    ];
    detox.forEach(item => { doc.text(item, margin, y); y += 8; });
    y += 10;

    // Risorse
    doc.setFont("Helvetica", "bold");
    doc.text("Risorse consigliate:", margin, y);
    doc.setFont("Helvetica", "normal");
    y += 10;
    const risorse = [
      "App: Forest, Digital Detox",
      "Libro: 'Digital Minimalism' di Cal Newport",
      "Articolo: OMS – Uso consapevole delle tecnologie"
    ];
    risorse.forEach(item => { doc.text(item, margin, y); y += 8; });
    y += 10;

    // Disclaimer
    doc.setFont("Helvetica", "italic");
    doc.text("Disclaimer: Questo report ha scopo informativo e non sostituisce la valutazione di un professionista.", margin, y);

    // Salva
    doc.save("Report_DipendenzaDigitale.pdf");
  }
});
