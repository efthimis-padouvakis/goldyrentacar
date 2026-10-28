import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Heraklion, Creta, Grecia`;

const it: LegalSet = {
  contents: "In questa pagina",
  terms: {
    updated: "Ultimo aggiornamento: 28 ottobre 2026",
    intro:
      "Queste condizioni si applicano quando utilizzi goldyrentacar.gr e quando noleggi un'auto da Goldy Rent a Car. Leggile prima di prenotare. Con la prenotazione accetti queste condizioni insieme al contratto di noleggio che firmi al ritiro.",
    sections: [
      {
        h: "Chi siamo",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Telefono e WhatsApp ${COMPANY.phone}, email ${COMPANY.email}.`,
          "La disponibilità in tempo reale e le prenotazioni online funzionano su Karpadu, una piattaforma greca di prenotazione per autonoleggi. Karpadu fornisce solo la tecnologia di prenotazione. Il tuo contratto di noleggio è sempre con Goldy Rent a Car.",
        ],
      },
      {
        h: "Prenotazione e conferma",
        body: [
          [
            "Prenoti scegliendo un'auto, una copertura ed eventuali extra, inserendo i dati del conducente e pagando online.",
            "La prenotazione è confermata quando ti inviamo un'email di conferma con il codice di prenotazione.",
            "Se l'auto non è più disponibile o il suo prezzo è cambiato tra la ricerca e il pagamento, non confermiamo la prenotazione e rimborsiamo automaticamente l'intero importo.",
            "Le auto sono mostrate come esempi della loro categoria. Garantiamo la categoria, non la marca, il modello o il colore. Se la tua categoria non è disponibile, ti diamo un'auto della stessa categoria o di una superiore senza costi aggiuntivi.",
            "Controlla i dati della conferma e avvisaci subito se qualcosa non è corretto.",
          ],
        ],
      },
      {
        h: "Prezzo e pagamento",
        body: [
          [
            "Il prezzo mostrato al momento della prenotazione è il totale per le tue date, i luoghi di ritiro e riconsegna, la copertura e gli extra. Include IVA, chilometraggio illimitato, copertura furto e danni e assistenza stradale 24/7.",
            "Paghi l'intero importo online con carta di debito o di credito tramite Viva Wallet, un fornitore di pagamenti autorizzato. Non vediamo né conserviamo mai i dati della tua carta.",
            "Il prezzo non include carburante o ricarica, pedaggi, parcheggi, multe e biglietti del traghetto. I costi che causi, come carburante mancante, riconsegna in ritardo, pulizia straordinaria o danni non coperti, sono addebitati a parte come descritto di seguito.",
            "Tutti i prezzi sono in euro (€).",
          ],
        ],
      },
      {
        h: "Copertura, franchigia e deposito",
        body: [
          [
            "Ogni noleggio include la copertura furto e danni. La franchigia è l'importo massimo che paghi in caso di danni all'auto o di furto.",
            "Per ogni auto mostriamo franchigia e deposito di ogni copertura prima della prenotazione. La copertura scelta è indicata nella conferma.",
            "Con la copertura Completa o Premium il deposito è di €0. Con la copertura Base si versa al ritiro un deposito cauzionale, restituito quando l'auto rientra puntuale, senza nuovi danni e con il livello di carburante o di carica concordato.",
            "Nessuna copertura richiede una carta di credito.",
          ],
        ],
      },
      {
        h: "Quando la copertura non si applica",
        body: [
          "Qualunque copertura tu scelga, paghi l'intero costo di danni, perdita o furto, oltre la franchigia, quando sono causati da:",
          [
            "guida sotto l'effetto di alcol, droghe o farmaci che alterano la guida;",
            "un conducente non indicato nel contratto di noleggio;",
            "trasporto dell'auto su un traghetto o fuori da Creta, o guida su strade sterrate, senza il nostro consenso scritto;",
            "rifornimento con il carburante sbagliato;",
            "danni intenzionali, guida spericolata o gravi violazioni del codice della strada;",
            "smarrimento delle chiavi, o furto dell'auto mentre le chiavi o i documenti si trovavano al suo interno;",
            "un incidente non segnalato a noi e, se necessario, alla polizia.",
          ],
        ],
      },
      {
        h: "Requisiti del conducente",
        body: [
          [
            "Il conducente e ogni conducente aggiuntivo devono essere indicati nel contratto di noleggio.",
            "Ogni conducente deve avere una patente valida, conseguita da almeno un anno, e rispettare i limiti di età dell'auto. Inserisci l'età del conducente nella ricerca e ti mostriamo solo le auto che può noleggiare.",
            "Per una patente rilasciata fuori dall'UE o dal SEE può essere necessario un permesso internazionale di guida insieme alla patente nazionale.",
            "Al ritiro porta la patente e un passaporto o una carta d'identità per ogni conducente.",
            "Possiamo rifiutare la consegna dell'auto se un conducente non può mostrare questi documenti o non è chiaramente in condizione di guidare.",
          ],
        ],
      },
      {
        h: "Ritiro e riconsegna",
        body: [
          [
            "Ti incontriamo nel luogo e all'ora di ritiro della tua prenotazione. Se ci comunichi il numero di volo, lo seguiamo e ti aspettiamo in caso di ritardo.",
            "Se tardi per un altro motivo, chiamaci o scrivici.",
            "Controlliamo l'auto insieme al ritiro e alla riconsegna. I danni esistenti sono annotati nel contratto di noleggio.",
            "Riconsegna l'auto nel luogo e all'ora concordati, con lo stesso livello di carburante o di carica del ritiro. Il carburante o la carica mancanti sono addebitati al costo.",
            "I giorni di noleggio si contano a periodi di 24 ore dall'ora di ritiro. Fino a 1 ora di ritardo è gratuita; oltre, possiamo addebitare un giorno in più alla tariffa giornaliera della prenotazione.",
            "In caso di riconsegna anticipata, i giorni non utilizzati non vengono rimborsati.",
          ],
        ],
      },
      {
        h: "Modifiche, cancellazione e mancata presentazione",
        body: [
          [
            "Puoi modificare o cancellare la prenotazione gratuitamente in qualsiasi momento prima dell'ora di ritiro. Contattaci via WhatsApp, telefono o email con il codice di prenotazione.",
            "In caso di cancellazione rimborsiamo l'intero importo sulla carta usata per pagare. A seconda della banca, il rimborso compare entro 5–10 giorni lavorativi.",
            "Se una modifica cambia il prezzo, paghi la differenza o te la rimborsiamo.",
            "Se non ti presenti e non ci hai contattato, teniamo l'auto per te fino a 3 ore dopo l'ora di ritiro. Dopo, la prenotazione è considerata una mancata presentazione: possiamo assegnare l'auto ad altri e il prezzo del noleggio non viene rimborsato.",
            "Se dobbiamo cancellare noi la prenotazione, ti offriamo un'auto equivalente o rimborsiamo l'intero importo, come preferisci.",
          ],
          "Secondo il diritto dei consumatori europeo e greco, il diritto di recesso di 14 giorni non si applica ai noleggi auto prenotati per date specifiche (articolo 16, lettera l, della direttiva 2011/83/UE). Si applica invece la nostra cancellazione gratuita descritta sopra.",
        ],
      },
      {
        h: "Uso dell'auto",
        body: [
          [
            "Rispetta il codice della strada greco. La cintura è obbligatoria per tutti i passeggeri e i bambini devono viaggiare in un seggiolino adatto alla loro taglia.",
            "Uscire da Creta, prendere un traghetto o guidare su strade sterrate richiede il nostro consenso scritto.",
            "È vietato fumare in auto. Gli animali sono ammessi solo con il nostro consenso. Se l'auto richiede una pulizia straordinaria, ne addebitiamo il costo.",
            "L'auto non può essere subnoleggiata, usata per il trasporto a pagamento di persone o merci, per gare o lezioni di guida, o per trainare.",
            "Chiudi sempre l'auto a chiave e tieni con te chiavi e documenti.",
          ],
        ],
      },
      {
        h: "Incidenti, guasti e danni",
        body: [
          [
            `La nostra assistenza stradale è disponibile 24/7 al ${COMPANY.phone}.`,
            "Dopo un incidente, metti tutti al sicuro e chiamaci subito. Se è coinvolto un altro veicolo, compila con l'altro conducente la constatazione amichevole europea (modulo CAI) o chiama la polizia (100, o 112 per le emergenze). Non ammettere responsabilità.",
            "Non riparare l'auto e non farla riparare senza il nostro consenso.",
            "Se l'auto si guasta senza tua colpa, la ripariamo o la sostituiamo senza costi per te.",
          ],
        ],
      },
      {
        h: "Multe, pedaggi e parcheggio",
        body: [
          "Il conducente è responsabile di multe per infrazioni e per sosta, pedaggi ed eventuali costi di rimozione durante il noleggio. Se una multa ci arriva dopo il noleggio, comunichiamo i dati del conducente all'autorità che l'ha emessa, come richiesto dalla legge greca, oppure ti addebitiamo l'importo della multa.",
        ],
      },
      {
        h: "La nostra responsabilità",
        body: [
          "Rispondiamo dei danni causati da nostro dolo o colpa grave, nonché dei danni alla vita, all'integrità fisica o alla salute secondo la legge. Non rispondiamo degli oggetti personali lasciati in auto, né di perdite indirette, come un volo perso, dovute a eventi fuori dal nostro controllo. Nulla in queste condizioni limita i diritti che hai come consumatore in base a norme imperative.",
        ],
      },
      {
        h: "Uso di questo sito",
        body: [
          [
            "Manteniamo prezzi, disponibilità e altre informazioni del sito il più accurati possibile. La disponibilità è in tempo reale e può cambiare fino alla conferma della prenotazione.",
            "Testi, foto e loghi di questo sito appartengono a Goldy Rent a Car o ai suoi licenzianti. Non puoi copiarli per uso commerciale senza il nostro permesso.",
            "Non fare un uso improprio del sito, ad esempio con prenotazioni false, estrazione automatica dei contenuti o tentativi di violarne la sicurezza.",
            "I link ad altri siti (come Karpadu, Viva Wallet, Google o WhatsApp) sono forniti per comodità. Non siamo responsabili dei loro contenuti.",
          ],
        ],
      },
      {
        h: "Reclami e legge applicabile",
        body: [
          `Se qualcosa va storto, avvisaci prima a ${COMPANY.email} o al ${COMPANY.phone} e faremo il possibile per risolvere.`,
          "Queste condizioni sono regolate dalla legge greca. Se sei un consumatore, mantieni anche la tutela delle norme imperative del tuo paese di residenza. Sono competenti i tribunali di Heraklion, salvo che il diritto dei consumatori ti consenta di rivolgerti ai tribunali del luogo in cui vivi.",
          "Puoi anche rivolgerti al Mediatore greco dei consumatori, un organismo indipendente che risolve gratuitamente le controversie dei consumatori: www.synigoroskatanaloti.gr.",
          "Queste condizioni sono disponibili in più lingue. Se una traduzione differisce dal testo inglese, prevale il testo inglese.",
        ],
      },
      {
        h: "Modifiche a queste condizioni",
        body: [
          "Possiamo aggiornare queste condizioni. La tua prenotazione è regolata dalla versione in vigore il giorno in cui hai prenotato. La data dell'ultima versione è indicata in cima alla pagina.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Ultimo aggiornamento: 28 ottobre 2026",
    intro:
      "Questa informativa spiega quali dati personali raccoglie Goldy Rent a Car quando visiti goldyrentacar.gr, ci contatti o noleggi un'auto, perché li usiamo e quali diritti hai in base al Regolamento generale sulla protezione dei dati (GDPR) e alla legge greca 4624/2019.",
    sections: [
      {
        h: "Titolare del trattamento",
        body: [
          `Il titolare del trattamento dei tuoi dati personali è ${COMPANY.name}, ${ADDRESS}. Per qualsiasi domanda sui tuoi dati, scrivi a ${COMPANY.email} o chiama il ${COMPANY.phone}.`,
        ],
      },
      {
        h: "Quali dati raccogliamo",
        body: [
          [
            "Quando cerchi: luoghi di ritiro e riconsegna, date e orari ed età del conducente.",
            "Quando prenoti: nome e cognome, email, cellulare, paese di residenza, numero di volo (facoltativo) e l'auto, la copertura, gli extra e il prezzo scelti.",
            "Quando paghi: Viva Wallet elabora la tua carta sulla propria pagina sicura. Riceviamo solo l'esito del pagamento, l'importo e un riferimento della transazione, mai il numero completo della carta.",
            "Al ritiro e durante il noleggio: i dati della patente e del passaporto o della carta d'identità di ogni conducente, il contratto di noleggio firmato, lo stato, il carburante e i chilometri dell'auto ed eventuali segnalazioni di incidenti, danni o multe.",
            "Quando ci contatti: i tuoi messaggi via email, telefono o WhatsApp.",
            "Dati tecnici: indirizzo IP, tipo di browser e pagine richieste, registrati dal nostro fornitore di hosting per la sicurezza del sito.",
          ],
          "Non chiediamo dati sensibili, come informazioni sulla salute. Senza i dati della prenotazione non possiamo registrare la tua prenotazione.",
        ],
      },
      {
        h: "Perché li usiamo",
        body: [
          [
            "Per mostrare disponibilità e prezzi, registrare la prenotazione, incassare il pagamento, consegnarti l'auto e contattarti per il noleggio. Base giuridica: il contratto con te e le misure precontrattuali che richiedi (art. 6, par. 1, lett. b GDPR).",
            "Per emettere fatture, tenere la contabilità e rispondere alle richieste delle autorità, ad esempio sulle multe. Base giuridica: i nostri obblighi di legge (art. 6, par. 1, lett. c GDPR).",
            "Per proteggere le nostre auto e la nostra attività: prevenzione delle frodi, gestione di danni e sinistri, difesa in caso di contenzioso e sicurezza del sito. Base giuridica: i nostri legittimi interessi (art. 6, par. 1, lett. f GDPR).",
          ],
          "Non usiamo i tuoi dati per pubblicità, non inviamo newsletter e non prendiamo decisioni su di te basate unicamente su trattamenti automatizzati.",
        ],
      },
      {
        h: "Con chi li condividiamo",
        body: [
          [
            "Karpadu, la piattaforma di prenotazione che elabora disponibilità e prenotazioni per nostro conto.",
            "Viva Wallet, il fornitore di pagamenti autorizzato che elabora il tuo pagamento. Viva Wallet è responsabile dei dati della tua carta secondo la propria informativa privacy.",
            "Vercel Inc., che ospita questo sito per nostro conto.",
            "Il nostro commercialista, assicuratori, avvocati, officine e partner di assistenza stradale, solo quando i dati servono per il noleggio o un sinistro.",
            "Autorità pubbliche, come il fisco, la polizia o i tribunali, quando la legge lo richiede.",
            "WhatsApp (Meta), se scegli di scriverci su WhatsApp. Questi messaggi sono soggetti anche all'informativa privacy di WhatsApp.",
          ],
          "Non vendiamo né affittiamo mai i tuoi dati personali.",
        ],
      },
      {
        h: "Trasferimenti fuori dall'UE",
        body: [
          "Il nostro fornitore di hosting, Vercel, è una società statunitense, quindi alcuni dati possono essere trattati fuori dallo Spazio economico europeo. In tal caso sono protetti dalle garanzie richieste dal GDPR, come il Data Privacy Framework UE–USA o le clausole contrattuali tipo della Commissione europea.",
        ],
      },
      {
        h: "Per quanto tempo li conserviamo",
        body: [
          [
            "Le ricerche non sono collegate a te e non le conserviamo.",
            "I dati di prenotazione e noleggio sono conservati per il tempo richiesto dalla normativa fiscale e contabile greca, in genere 5 anni dalla fine dell'anno del noleggio, e più a lungo solo finché è aperto un reclamo, una multa o una controversia.",
            "I messaggi sono conservati per il tempo necessario a risponderti e gestire la prenotazione.",
            "I log dell'hosting sono conservati per poco tempo e poi cancellati automaticamente.",
          ],
        ],
      },
      {
        h: "Cookie e memoria del browser",
        body: [
          [
            "Usiamo un solo cookie, “lang”, che ricorda per un anno la lingua scelta. Viene impostato solo quando scegli una lingua.",
            "Durante una prenotazione, la ricerca e i dati del conducente restano nella scheda del browser (session storage), così non si perdono passando alla pagina di pagamento e tornando indietro. Vengono cancellati quando chiudi la scheda.",
            "Non usiamo cookie di analisi, pubblicità o tracciamento e i nostri font sono serviti dal nostro sito, quindi la tua visita non viene segnalata a Google né ad alcuna rete pubblicitaria.",
            "La pagina di pagamento di Viva Wallet può usare propri cookie, come descritto nell'informativa privacy di Viva Wallet.",
          ],
          "Poiché usiamo solo ciò che serve al funzionamento del sito, non mostriamo un banner dei cookie. Se in futuro aggiungeremo strumenti di analisi, ti chiederemo prima il consenso e aggiorneremo questa informativa.",
        ],
      },
      {
        h: "Come li proteggiamo",
        body: [
          "Il sito usa una connessione cifrata (HTTPS), i pagamenti con carta passano da un fornitore certificato PCI DSS e solo le persone che hanno bisogno dei tuoi dati per il noleggio possono accedervi.",
        ],
      },
      {
        h: "I tuoi diritti",
        body: [
          "Hai il diritto di:",
          [
            "accedere ai dati personali che conserviamo su di te e ottenerne una copia;",
            "far correggere dati inesatti;",
            "far cancellare i tuoi dati quando non ci servono più o non abbiamo un motivo legale per conservarli;",
            "limitare l'uso dei tuoi dati o opporti agli usi basati sui nostri legittimi interessi;",
            "ricevere i dati che ci hai fornito in un formato elettronico di uso comune (portabilità).",
          ],
          `Per esercitare uno di questi diritti, scrivi a ${COMPANY.email}. Rispondiamo entro un mese e possiamo prima chiederti di confermare la tua identità. Hai anche il diritto di presentare reclamo all'Autorità greca per la protezione dei dati (www.dpa.gr) o all'autorità per la protezione dei dati del paese UE in cui vivi.`,
        ],
      },
      {
        h: "Modifiche a questa informativa",
        body: [
          "Possiamo aggiornare questa informativa quando cambiano i nostri servizi o la legge. La data dell'ultima versione è indicata in cima alla pagina.",
        ],
      },
    ],
  },
};

export default it;
