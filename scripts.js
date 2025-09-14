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

    // Titolo e Nome utente ENORME
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(32); // ENORME
    const who = resultData.name ? `Report per ${resultData.name}` : "Report personalizzato";
    doc.text(who, margin, y);
    y += 36;

    // Data
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Data: ${resultData.dateStr}`, margin, y);
    y += 16;

    // Punteggio
    doc.setFontSize(14);
    doc.text(`Punteggio totale: ${resultData.total}`, margin, y);
    y += 10;
    doc.text(`Percentuale: ${resultData.percentage}%`, margin, y);
    y += 14;

