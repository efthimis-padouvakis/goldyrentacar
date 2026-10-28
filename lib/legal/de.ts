import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Heraklion, Kreta, Griechenland`;

const de: LegalSet = {
  contents: "Auf dieser Seite",
  terms: {
    updated: "Zuletzt aktualisiert: 28. Oktober 2026",
    intro:
      "Diese Bedingungen gelten, wenn Sie goldyrentacar.gr nutzen und wenn Sie ein Auto bei Goldy Rent a Car mieten. Bitte lesen Sie sie vor der Buchung. Mit Ihrer Buchung akzeptieren Sie diese Bedingungen zusammen mit dem Mietvertrag, den Sie bei der Abholung unterschreiben.",
    sections: [
      {
        h: "Wer wir sind",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Telefon und WhatsApp ${COMPANY.phone}, E-Mail ${COMPANY.email}.`,
          "Unsere Live-Verfügbarkeit und Online-Buchungen laufen über Karpadu, eine griechische Reservierungsplattform für Mietwagen. Karpadu stellt nur die Buchungstechnik bereit. Ihr Mietvertrag kommt immer mit Goldy Rent a Car zustande.",
        ],
      },
      {
        h: "Buchung und Bestätigung",
        body: [
          [
            "Sie buchen, indem Sie ein Auto, einen Schutz und gewünschte Extras wählen, die Fahrerdaten eingeben und online bezahlen.",
            "Ihre Buchung ist bestätigt, sobald wir Ihnen eine Bestätigung mit Buchungsnummer per E-Mail senden.",
            "Ist das Auto nicht mehr verfügbar oder hat sich sein Preis zwischen Suche und Zahlung geändert, bestätigen wir die Buchung nicht und erstatten den vollen Betrag automatisch.",
            "Die Autos werden als Beispiele ihrer Kategorie gezeigt. Wir garantieren die Kategorie, nicht Marke, Modell oder Farbe. Ist Ihre Kategorie nicht verfügbar, erhalten Sie ohne Aufpreis ein Auto derselben oder einer höheren Kategorie.",
            "Bitte prüfen Sie die Angaben in Ihrer Bestätigung und melden Sie sich sofort, wenn etwas nicht stimmt.",
          ],
        ],
      },
      {
        h: "Preis und Zahlung",
        body: [
          [
            "Der bei der Buchung angezeigte Preis ist der Gesamtpreis für Ihre Daten, Abhol- und Rückgabeorte, Ihren Schutz und Ihre Extras. Er enthält Mehrwertsteuer, unbegrenzte Kilometer, Diebstahl- und Schadenschutz sowie 24/7-Pannenhilfe.",
            "Sie zahlen den vollen Betrag online per Debit- oder Kreditkarte über Viva Wallet, einen lizenzierten Zahlungsdienstleister. Wir sehen und speichern Ihre Kartendaten nie.",
            "Nicht im Preis enthalten sind Kraftstoff oder Ladestrom, Maut, Parkgebühren, Bußgelder und Fährtickets. Kosten, die Sie verursachen, etwa fehlender Kraftstoff, eine verspätete Rückgabe, eine Sonderreinigung oder Schäden, die der Schutz nicht übernimmt, werden wie unten beschrieben gesondert berechnet.",
            "Alle Preise verstehen sich in Euro (€).",
          ],
        ],
      },
      {
        h: "Schutz, Selbstbeteiligung und Kaution",
        body: [
          [
            "Jede Miete enthält Diebstahl- und Schadenschutz. Die Selbstbeteiligung ist der Höchstbetrag, den Sie bei Schäden am Auto oder Diebstahl zahlen.",
            "Für jedes Auto zeigen wir Selbstbeteiligung und Kaution jedes Schutzes vor der Buchung an. Der gewählte Schutz steht in Ihrer Bestätigung.",
            "Mit Vollschutz oder Premiumschutz beträgt die Kaution €0. Beim Basisschutz wird bei der Abholung eine Kaution hinterlegt, die Sie zurückerhalten, wenn das Auto pünktlich, ohne neue Schäden und mit dem vereinbarten Kraftstoff- oder Ladestand zurückkommt.",
            "Für keinen Schutz ist eine Kreditkarte nötig.",
          ],
        ],
      },
      {
        h: "Wann der Schutz nicht gilt",
        body: [
          "Unabhängig vom gewählten Schutz tragen Sie die vollen Kosten eines Schadens, Verlusts oder Diebstahls über die Selbstbeteiligung hinaus, wenn er verursacht wird durch:",
          [
            "Fahren unter dem Einfluss von Alkohol, Drogen oder Medikamenten, die die Fahrtüchtigkeit beeinträchtigen;",
            "einen Fahrer, der nicht im Mietvertrag eingetragen ist;",
            "Mitnahme des Autos auf eine Fähre oder von Kreta herunter oder Fahren auf unbefestigten Straßen ohne unsere schriftliche Zustimmung;",
            "Tanken des falschen Kraftstoffs;",
            "vorsätzliche Beschädigung, rücksichtsloses Fahren oder schwere Verstöße gegen die Straßenverkehrsordnung;",
            "Verlust der Schlüssel oder Diebstahl des Autos, während Schlüssel oder Fahrzeugpapiere darin lagen;",
            "einen Unfall, der uns und, wo nötig, der Polizei nicht gemeldet wurde.",
          ],
        ],
      },
      {
        h: "Voraussetzungen für Fahrer",
        body: [
          [
            "Der Fahrer und jeder Zusatzfahrer müssen im Mietvertrag eingetragen sein.",
            "Jeder Fahrer braucht einen gültigen Führerschein, den er seit mindestens einem Jahr besitzt, und muss die Altersgrenzen des Autos erfüllen. Geben Sie das Alter des Fahrers in der Suche an, dann zeigen wir nur Autos, die er mieten darf.",
            "Für einen außerhalb der EU oder des EWR ausgestellten Führerschein kann zusätzlich ein Internationaler Führerschein nötig sein.",
            "Bringen Sie zur Abholung für jeden Fahrer den Führerschein und einen Reisepass oder Personalausweis mit.",
            "Wir können die Übergabe verweigern, wenn ein Fahrer diese Dokumente nicht vorlegen kann oder offensichtlich fahruntüchtig ist.",
          ],
        ],
      },
      {
        h: "Abholung und Rückgabe",
        body: [
          [
            "Wir treffen Sie am Abholort und zur Abholzeit Ihrer Buchung. Wenn Sie uns Ihre Flugnummer nennen, verfolgen wir Ihren Flug und warten bei Verspätung.",
            "Wenn Sie sich aus einem anderen Grund verspäten, rufen Sie uns bitte an oder schreiben Sie uns.",
            "Wir prüfen das Auto bei Abholung und Rückgabe gemeinsam. Vorhandene Schäden werden im Mietvertrag festgehalten.",
            "Geben Sie das Auto am vereinbarten Ort und zur vereinbarten Zeit zurück, mit demselben Kraftstoff- oder Ladestand wie bei der Abholung. Fehlender Kraftstoff oder Ladestrom wird zum Selbstkostenpreis berechnet.",
            "Miettage werden in 24-Stunden-Zeiträumen ab der Abholzeit gezählt. Bis zu 1 Stunde Verspätung ist kostenlos; danach können wir einen zusätzlichen Tag zum Tagespreis Ihrer Buchung berechnen.",
            "Bei vorzeitiger Rückgabe werden nicht genutzte Tage nicht erstattet.",
          ],
        ],
      },
      {
        h: "Änderung, Stornierung und Nichterscheinen",
        body: [
          [
            "Sie können Ihre Buchung jederzeit vor der Abholzeit kostenlos ändern oder stornieren. Kontaktieren Sie uns per WhatsApp, Telefon oder E-Mail mit Ihrer Buchungsnummer.",
            "Bei einer Stornierung erstatten wir den vollen Betrag auf die Karte, mit der Sie bezahlt haben. Je nach Bank erscheint die Erstattung innerhalb von 5 bis 10 Werktagen.",
            "Ändert eine Änderung den Preis, zahlen Sie die Differenz oder wir erstatten sie.",
            "Wenn Sie nicht erscheinen und sich nicht gemeldet haben, halten wir das Auto bis 3 Stunden nach der Abholzeit für Sie bereit. Danach gilt die Buchung als nicht wahrgenommen: Wir können das Auto anderweitig vergeben und der Mietpreis wird nicht erstattet.",
            "Müssen wir Ihre Buchung stornieren, bieten wir Ihnen ein gleichwertiges Auto an oder erstatten den vollen Betrag, ganz wie Sie möchten.",
          ],
          "Nach EU- und griechischem Verbraucherrecht gilt das 14-tägige Widerrufsrecht nicht für Mietwagen, die für bestimmte Daten gebucht werden (Artikel 16 Buchstabe l der Richtlinie 2011/83/EU). Stattdessen gilt unsere oben beschriebene kostenlose Stornierung.",
        ],
      },
      {
        h: "Nutzung des Autos",
        body: [
          [
            "Halten Sie sich an die griechische Straßenverkehrsordnung. Für alle Insassen besteht Gurtpflicht, und Kinder müssen in einem für ihre Größe geeigneten Kindersitz fahren.",
            "Fahrten außerhalb Kretas, mit der Fähre oder auf unbefestigten Straßen brauchen unsere schriftliche Zustimmung.",
            "Rauchen ist im Auto nicht erlaubt. Haustiere fahren nur mit unserer Zustimmung mit. Braucht das Auto eine Sonderreinigung, berechnen wir die Reinigungskosten.",
            "Das Auto darf nicht untervermietet, zur entgeltlichen Beförderung von Personen oder Waren, für Rennen oder Fahrstunden oder zum Abschleppen verwendet werden.",
            "Schließen Sie das Auto immer ab und behalten Sie Schlüssel und Papiere bei sich.",
          ],
        ],
      },
      {
        h: "Unfälle, Pannen und Schäden",
        body: [
          [
            `Unsere Pannenhilfe ist rund um die Uhr unter ${COMPANY.phone} erreichbar.`,
            "Sorgen Sie nach einem Unfall dafür, dass alle in Sicherheit sind, und rufen Sie uns sofort an. Ist ein anderes Fahrzeug beteiligt, füllen Sie mit dem anderen Fahrer einen Europäischen Unfallbericht aus oder rufen Sie die Polizei (100, im Notfall 112). Erkennen Sie keine Schuld an.",
            "Reparieren Sie das Auto nicht selbst und lassen Sie es nicht ohne unsere Zustimmung reparieren.",
            "Hat das Auto ohne Ihr Verschulden eine Panne, reparieren oder ersetzen wir es kostenlos.",
          ],
        ],
      },
      {
        h: "Bußgelder, Maut und Parken",
        body: [
          "Der Fahrer ist während der Miete für Verkehrs- und Parkbußgelder, Maut und Abschleppkosten verantwortlich. Erreicht uns ein Bußgeld nach der Miete, geben wir die Daten des Fahrers an die ausstellende Behörde weiter, wie es das griechische Recht vorschreibt, oder berechnen Ihnen den Betrag des Bußgelds.",
        ],
      },
      {
        h: "Unsere Haftung",
        body: [
          "Wir haften für Schäden, die wir vorsätzlich oder grob fahrlässig verursachen, sowie nach den gesetzlichen Vorschriften für Verletzungen von Leben, Körper oder Gesundheit. Wir haften nicht für persönliche Gegenstände, die im Auto zurückgelassen werden, und nicht für mittelbare Schäden wie einen verpassten Flug infolge von Ereignissen außerhalb unserer Kontrolle. Nichts in diesen Bedingungen schränkt Ihre Rechte als Verbraucher nach zwingendem Recht ein.",
        ],
      },
      {
        h: "Nutzung dieser Website",
        body: [
          [
            "Wir halten Preise, Verfügbarkeit und andere Angaben auf dieser Website so genau wie möglich. Die Verfügbarkeit ist live und kann sich bis zur Bestätigung Ihrer Buchung ändern.",
            "Texte, Fotos und Logos dieser Website gehören Goldy Rent a Car oder ihren Lizenzgebern. Sie dürfen sie ohne unsere Erlaubnis nicht für kommerzielle Zwecke kopieren.",
            "Missbrauchen Sie die Website nicht, etwa durch Scheinbuchungen, automatisches Auslesen oder Versuche, ihre Sicherheit zu umgehen.",
            "Links zu anderen Websites (etwa Karpadu, Viva Wallet, Google oder WhatsApp) dienen Ihrer Bequemlichkeit. Für deren Inhalte sind wir nicht verantwortlich.",
          ],
        ],
      },
      {
        h: "Beschwerden und anwendbares Recht",
        body: [
          `Wenn etwas schiefläuft, sagen Sie es uns bitte zuerst unter ${COMPANY.email} oder ${COMPANY.phone}, und wir tun unser Bestes, es zu lösen.`,
          "Diese Bedingungen unterliegen griechischem Recht. Als Verbraucher behalten Sie zusätzlich den Schutz der zwingenden Vorschriften Ihres Wohnsitzlandes. Zuständig sind die Gerichte in Heraklion, sofern Sie das Verbraucherrecht nicht berechtigt, die Gerichte an Ihrem Wohnort anzurufen.",
          "Sie können sich auch an den griechischen Verbraucher-Ombudsmann wenden, eine unabhängige Stelle, die Verbraucherstreitigkeiten kostenlos schlichtet: www.synigoroskatanaloti.gr.",
          "Diese Bedingungen gibt es in mehreren Sprachen. Weicht eine Übersetzung vom englischen Text ab, gilt der englische Text.",
        ],
      },
      {
        h: "Änderungen dieser Bedingungen",
        body: [
          "Wir können diese Bedingungen aktualisieren. Für Ihre Buchung gilt die Fassung, die am Tag Ihrer Buchung in Kraft war. Das Datum der neuesten Fassung steht oben auf dieser Seite.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Zuletzt aktualisiert: 28. Oktober 2026",
    intro:
      "Diese Erklärung beschreibt, welche personenbezogenen Daten Goldy Rent a Car erhebt, wenn Sie goldyrentacar.gr besuchen, uns kontaktieren oder ein Auto mieten, wofür wir sie nutzen und welche Rechte Sie nach der Datenschutz-Grundverordnung (DSGVO) und dem griechischen Gesetz 4624/2019 haben.",
    sections: [
      {
        h: "Verantwortlicher",
        body: [
          `Verantwortlich für Ihre personenbezogenen Daten ist ${COMPANY.name}, ${ADDRESS}. Bei Fragen zu Ihren Daten schreiben Sie an ${COMPANY.email} oder rufen Sie ${COMPANY.phone} an.`,
        ],
      },
      {
        h: "Welche Daten wir erheben",
        body: [
          [
            "Bei der Suche: Abhol- und Rückgabeorte, Daten und Uhrzeiten sowie das Alter des Fahrers.",
            "Bei der Buchung: Vor- und Nachname, E-Mail, Mobilnummer, Wohnsitzland, Flugnummer (optional) sowie das gewählte Auto, Schutz, Extras und den Preis.",
            "Bei der Zahlung: Viva Wallet verarbeitet Ihre Karte auf seiner eigenen sicheren Seite. Wir erhalten nur das Zahlungsergebnis, den Betrag und eine Transaktionsnummer, nie Ihre vollständige Kartennummer.",
            "Bei der Abholung und während der Miete: die Angaben aus Führerschein und Reisepass oder Personalausweis jedes Fahrers, den unterschriebenen Mietvertrag, Zustand, Tankstand und Kilometerstand des Autos sowie etwaige Unfall-, Schadens- oder Bußgeldmeldungen.",
            "Wenn Sie uns kontaktieren: Ihre Nachrichten per E-Mail, Telefon oder WhatsApp.",
            "Technische Daten: Ihre IP-Adresse, Ihr Browsertyp und die aufgerufenen Seiten, die unser Hosting-Anbieter zur Sicherheit der Website protokolliert.",
          ],
          "Wir fragen keine sensiblen Daten wie Gesundheitsangaben ab. Ohne die Buchungsangaben können wir Ihre Buchung nicht annehmen.",
        ],
      },
      {
        h: "Wofür wir sie nutzen",
        body: [
          [
            "Um Verfügbarkeit und Preise anzuzeigen, Ihre Buchung anzunehmen, die Zahlung abzuwickeln, das Auto bereitzustellen und Sie zu Ihrer Miete zu kontaktieren. Rechtsgrundlage: der Vertrag mit Ihnen und die von Ihnen gewünschten vorvertraglichen Schritte (Art. 6 Abs. 1 lit. b DSGVO).",
            "Um Rechnungen auszustellen, unsere Buchhaltung zu führen und Anfragen von Behörden zu beantworten, etwa zu Bußgeldern. Rechtsgrundlage: unsere gesetzlichen Pflichten (Art. 6 Abs. 1 lit. c DSGVO).",
            "Um unsere Autos und unser Geschäft zu schützen: Betrugsprävention, Bearbeitung von Schadens- und Versicherungsfällen, Abwehr von Rechtsansprüchen und Sicherheit der Website. Rechtsgrundlage: unsere berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO).",
          ],
          "Wir nutzen Ihre Daten nicht für Werbung, versenden keine Newsletter und treffen keine Entscheidungen über Sie ausschließlich automatisiert.",
        ],
      },
      {
        h: "An wen wir sie weitergeben",
        body: [
          [
            "Karpadu, die Reservierungsplattform, die Verfügbarkeit und Buchungen in unserem Auftrag verarbeitet.",
            "Viva Wallet, den lizenzierten Zahlungsdienstleister, der Ihre Zahlung abwickelt. Viva Wallet ist nach seiner eigenen Datenschutzerklärung für Ihre Kartendaten verantwortlich.",
            "Vercel Inc., die diese Website in unserem Auftrag hostet.",
            "Unseren Steuerberater, Versicherer, Anwälte, Werkstätten und Pannenhilfe-Partner, nur wenn sie die Daten für Ihre Miete oder einen Schadensfall brauchen.",
            "Behörden wie Finanzamt, Polizei oder Gerichte, wenn das Gesetz es verlangt.",
            "WhatsApp (Meta), wenn Sie uns per WhatsApp schreiben. Diese Nachrichten unterliegen auch der Datenschutzerklärung von WhatsApp.",
          ],
          "Wir verkaufen oder vermieten Ihre personenbezogenen Daten niemals.",
        ],
      },
      {
        h: "Übermittlung außerhalb der EU",
        body: [
          "Unser Hosting-Anbieter Vercel ist ein US-Unternehmen, daher können einige Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet werden. In diesem Fall sind sie durch die von der DSGVO geforderten Garantien geschützt, etwa das EU-US Data Privacy Framework oder die Standardvertragsklauseln der Europäischen Kommission.",
        ],
      },
      {
        h: "Wie lange wir sie speichern",
        body: [
          [
            "Suchanfragen werden nicht mit Ihnen verknüpft und von uns nicht gespeichert.",
            "Buchungs- und Mietunterlagen bewahren wir so lange auf, wie es das griechische Steuer- und Handelsrecht verlangt, in der Regel 5 Jahre nach Ende des Mietjahres, und länger nur, solange ein Anspruch, Bußgeld oder Streit offen ist.",
            "Nachrichten bewahren wir so lange auf, wie wir sie zur Beantwortung und für Ihre Buchung brauchen.",
            "Hosting-Protokolle werden kurz gespeichert und dann automatisch gelöscht.",
          ],
        ],
      },
      {
        h: "Cookies und Browserspeicher",
        body: [
          [
            "Wir verwenden ein einziges Cookie, „lang“, das Ihre gewählte Sprache ein Jahr lang speichert. Es wird nur gesetzt, wenn Sie eine Sprache auswählen.",
            "Während einer Buchung werden Ihre Suche und die Fahrerdaten in Ihrem Browser-Tab gespeichert (Session Storage), damit sie auf dem Weg zur Zahlungsseite und zurück nicht verloren gehen. Sie werden gelöscht, wenn Sie den Tab schließen.",
            "Wir verwenden keine Analyse-, Werbe- oder Tracking-Cookies, und unsere Schriften werden von unserer eigenen Website geladen, sodass Ihr Besuch weder an Google noch an ein Werbenetzwerk gemeldet wird.",
            "Die Zahlungsseite von Viva Wallet kann eigene Cookies verwenden, wie in der Datenschutzerklärung von Viva Wallet beschrieben.",
          ],
          "Da wir nur das verwenden, was die Website zum Funktionieren braucht, zeigen wir kein Cookie-Banner. Sollten wir jemals Analysetools einsetzen, holen wir vorher Ihre Einwilligung ein und aktualisieren diese Erklärung.",
        ],
      },
      {
        h: "Wie wir sie schützen",
        body: [
          "Die Website nutzt eine verschlüsselte Verbindung (HTTPS), Kartenzahlungen laufen über einen nach PCI DSS zertifizierten Zahlungsdienstleister, und nur die Personen, die Ihre Daten für Ihre Miete brauchen, haben Zugriff darauf.",
        ],
      },
      {
        h: "Ihre Rechte",
        body: [
          "Sie haben das Recht:",
          [
            "Auskunft über die personenbezogenen Daten zu erhalten, die wir über Sie speichern, und eine Kopie zu bekommen;",
            "unrichtige Daten berichtigen zu lassen;",
            "Ihre Daten löschen zu lassen, wenn wir sie nicht mehr brauchen oder keinen rechtlichen Grund zur Aufbewahrung haben;",
            "die Nutzung Ihrer Daten einschränken zu lassen oder Nutzungen zu widersprechen, die auf unseren berechtigten Interessen beruhen;",
            "die Daten, die Sie uns gegeben haben, in einem gängigen elektronischen Format zu erhalten (Datenübertragbarkeit).",
          ],
          `Um eines dieser Rechte auszuüben, schreiben Sie an ${COMPANY.email}. Wir antworten innerhalb eines Monats und können Sie vorher bitten, Ihre Identität zu bestätigen. Sie haben außerdem das Recht, sich bei der griechischen Datenschutzbehörde (www.dpa.gr) oder bei der Datenschutzbehörde des EU-Landes, in dem Sie leben, zu beschweren.`,
        ],
      },
      {
        h: "Änderungen dieser Erklärung",
        body: [
          "Wir können diese Erklärung aktualisieren, wenn sich unsere Leistungen oder die Rechtslage ändern. Das Datum der neuesten Fassung steht oben auf dieser Seite.",
        ],
      },
    ],
  },
};

export default de;
