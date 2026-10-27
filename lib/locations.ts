import type { Locale } from "@/lib/i18n/config";
import type { KarpaduPage } from "@/lib/karpaduLinks";

interface LocationCopy {
  name: string;
  intro: string;
  tip: string;
}

export interface LocationPage {
  slug: string;
  stationId: number;
  karpadu: KarpaduPage;
  kind: "Airport" | "Port" | "Downtown";
  copy: Record<Locale, LocationCopy>;
}

export const locationPages: LocationPage[] = [
  {
    slug: "heraklion-airport",
    stationId: 1,
    karpadu: "heraklion",
    kind: "Airport",
    copy: {
      en: {
        name: "Heraklion Airport (HER)",
        intro:
          "Heraklion's Nikos Kazantzakis Airport is the main gateway to Crete, and our office in Nea Alikarnassos is just a few minutes away. We meet you at arrivals with your car ready, so you skip the queues and are on the road within minutes.",
        tip: "Knossos is about 20 minutes away and Hersonissos about 25 minutes along the North Road.",
      },
      el: {
        name: "Αεροδρόμιο Ηρακλείου (HER)",
        intro:
          "Το αεροδρόμιο «Νίκος Καζαντζάκης» είναι η βασική πύλη της Κρήτης και το γραφείο μας στη Νέα Αλικαρνασσό απέχει μόλις λίγα λεπτά. Σας περιμένουμε στις αφίξεις με το αυτοκίνητο έτοιμο, χωρίς ουρές και αναμονή.",
        tip: "Η Κνωσός απέχει περίπου 20 λεπτά και η Χερσόνησος περίπου 25 λεπτά μέσω του ΒΟΑΚ.",
      },
      de: {
        name: "Flughafen Heraklion (HER)",
        intro:
          "Der Flughafen Nikos Kazantzakis in Heraklion ist das Tor nach Kreta, und unser Büro in Nea Alikarnassos liegt nur wenige Minuten entfernt. Wir erwarten Sie in der Ankunftshalle mit Ihrem fertigen Mietwagen, ganz ohne Warteschlange.",
        tip: "Knossos erreichen Sie in etwa 20 Minuten, Chersonissos in rund 25 Minuten über die Nordstraße.",
      },
      fr: {
        name: "Aéroport d'Héraklion (HER)",
        intro:
          "L'aéroport Nikos Kazantzakis d'Héraklion est la principale porte d'entrée de la Crète, et notre agence de Nea Alikarnassos se trouve à quelques minutes. Nous vous accueillons aux arrivées avec votre voiture prête, sans file d'attente.",
        tip: "Knossos est à environ 20 minutes et Hersonissos à environ 25 minutes par la route du nord.",
      },
      it: {
        name: "Aeroporto di Heraklion (HER)",
        intro:
          "L'aeroporto Nikos Kazantzakis di Heraklion è la porta principale di Creta e il nostro ufficio a Nea Alikarnassos è a pochi minuti. Ti aspettiamo agli arrivi con l'auto pronta, senza code allo sportello.",
        tip: "Cnosso dista circa 20 minuti e Hersonissos circa 25 minuti lungo la strada nazionale del nord.",
      },
      nl: {
        name: "Luchthaven Heraklion (HER)",
        intro:
          "Luchthaven Nikos Kazantzakis in Heraklion is de belangrijkste toegangspoort tot Kreta, en ons kantoor in Nea Alikarnassos ligt op een paar minuten afstand. We wachten je op in de aankomsthal met je auto klaar, zonder rijen.",
        tip: "Knossos ligt op ongeveer 20 minuten en Hersonissos op zo'n 25 minuten via de noordelijke snelweg.",
      },
      pl: {
        name: "Lotnisko Heraklion (HER)",
        intro:
          "Lotnisko im. Nikosa Kazantzakisa w Heraklionie to główna brama Krety, a nasze biuro w Nea Alikarnassos jest zaledwie kilka minut dalej. Czekamy w hali przylotów z gotowym autem, bez kolejek.",
        tip: "Do Knossos jedzie się około 20 minut, a do Chersonissos około 25 minut drogą północną.",
      },
    },
  },
  {
    slug: "chania-airport",
    stationId: 3,
    karpadu: "chania",
    kind: "Airport",
    copy: {
      en: {
        name: "Chania Airport (CHQ)",
        intro:
          "Chania International Airport sits on the Akrotiri peninsula, about 15 km from Chania's old town. Pick up your Goldy car on arrival and head for the beaches of western Crete, from Stavros to Balos and Elafonisi.",
        tip: "Chania old town is about 25 minutes away by car, and Falasarna and Elafonisi make perfect day trips.",
      },
      el: {
        name: "Αεροδρόμιο Χανίων (CHQ)",
        intro:
          "Το διεθνές αεροδρόμιο Χανίων βρίσκεται στο Ακρωτήρι, περίπου 15 χλμ. από την παλιά πόλη. Παραλάβετε το αυτοκίνητό σας με την άφιξη και ξεκινήστε για τις παραλίες της δυτικής Κρήτης, από τον Σταυρό μέχρι τον Μπάλο και το Ελαφονήσι.",
        tip: "Η παλιά πόλη των Χανίων απέχει περίπου 25 λεπτά, ενώ Φαλάσαρνα και Ελαφονήσι είναι ιδανικές ημερήσιες εκδρομές.",
      },
      de: {
        name: "Flughafen Chania (CHQ)",
        intro:
          "Der internationale Flughafen Chania liegt auf der Halbinsel Akrotiri, etwa 15 km von der Altstadt entfernt. Holen Sie Ihren Goldy-Mietwagen bei der Ankunft ab und fahren Sie zu den Stränden Westkretas, von Stavros bis Balos und Elafonisi.",
        tip: "Die Altstadt von Chania ist rund 25 Minuten entfernt, Falasarna und Elafonisi sind perfekte Tagesausflüge.",
      },
      fr: {
        name: "Aéroport de La Canée (CHQ)",
        intro:
          "L'aéroport international de La Canée se trouve sur la péninsule d'Akrotiri, à environ 15 km de la vieille ville. Récupérez votre voiture Goldy à l'arrivée et partez vers les plages de l'ouest de la Crète, de Stavros à Balos et Elafonissi.",
        tip: "La vieille ville est à environ 25 minutes en voiture, et Falassarna ou Elafonissi sont des excursions idéales à la journée.",
      },
      it: {
        name: "Aeroporto di Chania (CHQ)",
        intro:
          "L'aeroporto internazionale di Chania si trova sulla penisola di Akrotiri, a circa 15 km dal centro storico. Ritira la tua auto Goldy all'arrivo e parti verso le spiagge della Creta occidentale, da Stavros a Balos ed Elafonissi.",
        tip: "Il centro storico di Chania è a circa 25 minuti, mentre Falassarna ed Elafonissi sono gite perfette in giornata.",
      },
      nl: {
        name: "Luchthaven Chania (CHQ)",
        intro:
          "De internationale luchthaven van Chania ligt op het schiereiland Akrotiri, zo'n 15 km van de oude stad. Haal je Goldy-auto op bij aankomst en rijd naar de stranden van West-Kreta, van Stavros tot Balos en Elafonisi.",
        tip: "De oude stad van Chania ligt op ongeveer 25 minuten rijden; Falasarna en Elafonisi zijn perfecte dagtochten.",
      },
      pl: {
        name: "Lotnisko Chania (CHQ)",
        intro:
          "Międzynarodowe lotnisko w Chanii leży na półwyspie Akrotiri, około 15 km od starego miasta. Odbierz auto Goldy zaraz po przylocie i ruszaj na plaże zachodniej Krety, od Stavros po Balos i Elafonisi.",
        tip: "Stare miasto w Chanii jest około 25 minut drogi, a Falasarna i Elafonisi to idealne jednodniowe wycieczki.",
      },
    },
  },
  {
    slug: "heraklion-port",
    stationId: 2,
    karpadu: "heraklion",
    kind: "Port",
    copy: {
      en: {
        name: "Heraklion Port",
        intro:
          "Arriving by ferry from Piraeus, Santorini or the other islands? We deliver your car to Heraklion Port, right next to the Venetian harbour and the city centre, so your road trip starts the moment you step off the boat.",
        tip: "The Venetian fortress of Koules and the old town are a short walk from the ferry terminal.",
      },
      el: {
        name: "Λιμάνι Ηρακλείου",
        intro:
          "Φτάνετε με πλοίο από Πειραιά, Σαντορίνη ή άλλο νησί; Παραδίδουμε το αυτοκίνητό σας στο λιμάνι του Ηρακλείου, δίπλα στο ενετικό λιμανάκι και το κέντρο, για να ξεκινήσετε μόλις κατεβείτε από το πλοίο.",
        tip: "Το ενετικό φρούριο Κούλες και η παλιά πόλη απέχουν λίγα λεπτά με τα πόδια από τον σταθμό των πλοίων.",
      },
      de: {
        name: "Hafen Heraklion",
        intro:
          "Sie kommen mit der Fähre aus Piräus, Santorini oder von einer anderen Insel? Wir bringen Ihren Mietwagen zum Hafen von Heraklion, direkt neben dem venezianischen Hafen und dem Zentrum.",
        tip: "Die venezianische Festung Koules und die Altstadt sind nur wenige Gehminuten vom Fährterminal entfernt.",
      },
      fr: {
        name: "Port d'Héraklion",
        intro:
          "Vous arrivez en ferry du Pirée, de Santorin ou d'une autre île ? Nous livrons votre voiture au port d'Héraklion, juste à côté du port vénitien et du centre-ville.",
        tip: "La forteresse vénitienne de Koules et la vieille ville sont à quelques minutes à pied du terminal des ferries.",
      },
      it: {
        name: "Porto di Heraklion",
        intro:
          "Arrivi in traghetto dal Pireo, da Santorini o da un'altra isola? Consegniamo l'auto al porto di Heraklion, accanto al porto veneziano e al centro città.",
        tip: "La fortezza veneziana di Koules e il centro storico sono a pochi passi dal terminal dei traghetti.",
      },
      nl: {
        name: "Haven van Heraklion",
        intro:
          "Kom je met de veerboot uit Piraeus, Santorini of een ander eiland? We leveren je auto af in de haven van Heraklion, vlak bij de Venetiaanse haven en het centrum.",
        tip: "Het Venetiaanse fort Koules en de oude stad liggen op een paar minuten lopen van de veerterminal.",
      },
      pl: {
        name: "Port Heraklion",
        intro:
          "Przypływasz promem z Pireusu, Santorini lub innej wyspy? Podstawimy auto w porcie w Heraklionie, tuż obok weneckiego portu i centrum miasta.",
        tip: "Wenecka twierdza Koules i stare miasto są kilka minut spacerem od terminalu promowego.",
      },
    },
  },
  {
    slug: "heraklion",
    stationId: 59,
    karpadu: "heraklion",
    kind: "Downtown",
    copy: {
      en: {
        name: "Heraklion",
        intro:
          "Staying in Heraklion? We bring the car to your hotel or apartment in the city. Crete's capital is the perfect base for the Archaeological Museum, Knossos and the wine villages of Archanes and Peza.",
        tip: "Parking in the centre is limited, so use the car parks near the old town walls.",
      },
      el: {
        name: "Ηράκλειο",
        intro:
          "Μένετε στο Ηράκλειο; Φέρνουμε το αυτοκίνητο στο ξενοδοχείο ή το κατάλυμά σας. Η πρωτεύουσα της Κρήτης είναι ιδανική βάση για το Αρχαιολογικό Μουσείο, την Κνωσό και τα κρασοχώρια Αρχάνες και Πεζά.",
        tip: "Η στάθμευση στο κέντρο είναι περιορισμένη· προτιμήστε τα πάρκινγκ κοντά στα τείχη.",
      },
      de: {
        name: "Heraklion Stadt",
        intro:
          "Sie wohnen in Heraklion? Wir bringen den Wagen zu Ihrem Hotel oder Apartment. Kretas Hauptstadt ist der ideale Ausgangspunkt für das Archäologische Museum, Knossos und die Weindörfer Archanes und Peza.",
        tip: "Parkplätze im Zentrum sind knapp, nutzen Sie die Parkhäuser an der Stadtmauer.",
      },
      fr: {
        name: "Héraklion ville",
        intro:
          "Vous séjournez à Héraklion ? Nous livrons la voiture à votre hôtel ou appartement. La capitale crétoise est la base idéale pour le Musée archéologique, Knossos et les villages viticoles d'Archanes et Peza.",
        tip: "Le stationnement est limité dans le centre : utilisez les parkings près des remparts.",
      },
      it: {
        name: "Heraklion città",
        intro:
          "Soggiorni a Heraklion? Portiamo l'auto al tuo hotel o appartamento. Il capoluogo di Creta è la base ideale per il Museo Archeologico, Cnosso e i villaggi del vino di Archanes e Peza.",
        tip: "In centro i parcheggi sono pochi: usa quelli vicino alle mura veneziane.",
      },
      nl: {
        name: "Heraklion stad",
        intro:
          "Verblijf je in Heraklion? We brengen de auto naar je hotel of appartement. De hoofdstad van Kreta is de ideale uitvalsbasis voor het Archeologisch Museum, Knossos en de wijndorpen Archanes en Peza.",
        tip: "Parkeren in het centrum is lastig; gebruik de parkeerplaatsen bij de oude stadsmuren.",
      },
      pl: {
        name: "Heraklion miasto",
        intro:
          "Mieszkasz w Heraklionie? Przywieziemy auto pod hotel lub apartament. Stolica Krety to świetna baza do zwiedzania Muzeum Archeologicznego, Knossos oraz winiarskich wiosek Archanes i Peza.",
        tip: "W centrum trudno o miejsce, więc korzystaj z parkingów przy murach starego miasta.",
      },
    },
  },
  {
    slug: "hersonissos",
    stationId: 29,
    karpadu: "hersonissos",
    kind: "Downtown",
    copy: {
      en: {
        name: "Hersonissos",
        intro:
          "Hersonissos is one of Crete's liveliest resorts, about 25 km east of Heraklion Airport. Get your car delivered to your hotel and explore beyond the beach: the Lasithi Plateau, Agios Nikolaos and Elounda are all within easy reach.",
        tip: "Drive up to the villages of Koutouloufari and Piskopiano for dinner with a view.",
      },
      el: {
        name: "Χερσόνησος",
        intro:
          "Η Χερσόνησος είναι από τα πιο ζωντανά θέρετρα της Κρήτης, περίπου 25 χλμ. ανατολικά του αεροδρομίου Ηρακλείου. Παραλάβετε το αυτοκίνητο στο ξενοδοχείο σας και γνωρίστε το Οροπέδιο Λασιθίου, τον Άγιο Νικόλαο και την Ελούντα.",
        tip: "Ανεβείτε στο Κουτουλουφάρι και το Πισκοπιανό για φαγητό με θέα.",
      },
      de: {
        name: "Chersonissos",
        intro:
          "Chersonissos ist einer der lebhaftesten Urlaubsorte Kretas, etwa 25 km östlich des Flughafens Heraklion. Lassen Sie sich den Wagen ins Hotel bringen und entdecken Sie die Lassithi-Hochebene, Agios Nikolaos und Elounda.",
        tip: "Fahren Sie zum Abendessen mit Aussicht in die Bergdörfer Koutouloufari und Piskopiano.",
      },
      fr: {
        name: "Hersonissos",
        intro:
          "Hersonissos est l'une des stations les plus animées de Crète, à environ 25 km à l'est de l'aéroport d'Héraklion. Faites-vous livrer la voiture à l'hôtel et explorez le plateau du Lassithi, Agios Nikolaos et Elounda.",
        tip: "Montez dîner avec vue dans les villages de Koutouloufari et Piskopiano.",
      },
      it: {
        name: "Hersonissos",
        intro:
          "Hersonissos è una delle località più vivaci di Creta, a circa 25 km a est dell'aeroporto di Heraklion. Fatti consegnare l'auto in hotel ed esplora l'altopiano di Lasithi, Agios Nikolaos ed Elounda.",
        tip: "Sali ai villaggi di Koutouloufari e Piskopiano per una cena con vista.",
      },
      nl: {
        name: "Hersonissos",
        intro:
          "Hersonissos is een van de levendigste badplaatsen van Kreta, zo'n 25 km ten oosten van de luchthaven van Heraklion. Laat de auto bij je hotel bezorgen en ontdek de Lassithi-hoogvlakte, Agios Nikolaos en Elounda.",
        tip: "Rijd naar de dorpjes Koutouloufari en Piskopiano voor een diner met uitzicht.",
      },
      pl: {
        name: "Chersonissos",
        intro:
          "Chersonissos to jeden z najbardziej tętniących życiem kurortów Krety, około 25 km na wschód od lotniska w Heraklionie. Auto podstawimy pod hotel, a ty odkryjesz płaskowyż Lasithi, Agios Nikolaos i Eloundę.",
        tip: "Wybierz się na kolację z widokiem do wiosek Koutouloufari i Piskopiano.",
      },
    },
  },
  {
    slug: "malia",
    stationId: 40,
    karpadu: "crete",
    kind: "Downtown",
    copy: {
      en: {
        name: "Malia",
        intro:
          "Malia is known for its long sandy beach and the Minoan palace at the edge of town. With a Goldy car delivered to your hotel, you can trade the busy strip for quiet coves, the Lasithi Plateau and the Dikteon Cave.",
        tip: "Visit the Minoan Palace of Malia early in the morning, before the heat.",
      },
      el: {
        name: "Μάλια",
        intro:
          "Τα Μάλια είναι γνωστά για τη μεγάλη αμμουδιά και το μινωικό ανάκτορο στην άκρη του χωριού. Με αυτοκίνητο Goldy στο ξενοδοχείο σας, ανακαλύψτε ήσυχους κολπίσκους, το Οροπέδιο Λασιθίου και το Δικταίο Άντρο.",
        tip: "Επισκεφθείτε το Μινωικό Ανάκτορο των Μαλίων νωρίς το πρωί, πριν τη ζέστη.",
      },
      de: {
        name: "Malia",
        intro:
          "Malia ist bekannt für seinen langen Sandstrand und den minoischen Palast am Ortsrand. Mit einem Goldy-Mietwagen direkt am Hotel tauschen Sie die belebte Partymeile gegen ruhige Buchten, die Lassithi-Hochebene und die Diktäische Grotte.",
        tip: "Besuchen Sie den Palast von Malia früh am Morgen, bevor es heiß wird.",
      },
      fr: {
        name: "Malia",
        intro:
          "Malia est connue pour sa longue plage de sable et son palais minoen à l'entrée de la ville. Avec une voiture Goldy livrée à votre hôtel, échangez l'animation contre des criques calmes, le plateau du Lassithi et la grotte du Dicté.",
        tip: "Visitez le palais minoen de Malia tôt le matin, avant la chaleur.",
      },
      it: {
        name: "Malia",
        intro:
          "Malia è famosa per la lunga spiaggia di sabbia e il palazzo minoico ai margini del paese. Con un'auto Goldy consegnata in hotel, puoi lasciare la movida per calette tranquille, l'altopiano di Lasithi e la grotta di Psychro.",
        tip: "Visita il palazzo minoico di Malia al mattino presto, prima del caldo.",
      },
      nl: {
        name: "Malia",
        intro:
          "Malia staat bekend om het lange zandstrand en het Minoïsche paleis aan de rand van het dorp. Met een Goldy-auto bij je hotel ruil je de drukke strip in voor rustige baaien, de Lassithi-hoogvlakte en de Dikteon-grot.",
        tip: "Bezoek het Minoïsche paleis van Malia vroeg in de ochtend, voor de hitte.",
      },
      pl: {
        name: "Malia",
        intro:
          "Malia słynie z długiej piaszczystej plaży i minojskiego pałacu na skraju miasteczka. Z autem Goldy pod hotelem zamienisz gwarny deptak na spokojne zatoczki, płaskowyż Lasithi i Grotę Dikte.",
        tip: "Pałac minojski w Malii zwiedzaj wcześnie rano, zanim zrobi się gorąco.",
      },
    },
  },
  {
    slug: "chania",
    stationId: 61,
    karpadu: "chania",
    kind: "Downtown",
    copy: {
      en: {
        name: "Chania",
        intro:
          "Chania's Venetian harbour and old town are among the most beautiful in Greece. We deliver your car in Chania so you can reach the wild beaches of western Crete, the Samaria Gorge and the mountain villages of Apokoronas.",
        tip: "Leave the car in a car park outside the old town and explore the narrow lanes on foot.",
      },
      el: {
        name: "Χανιά",
        intro:
          "Το ενετικό λιμάνι και η παλιά πόλη των Χανίων είναι από τα ομορφότερα της Ελλάδας. Παραδίδουμε το αυτοκίνητο στα Χανιά για να φτάσετε στις άγριες παραλίες της δυτικής Κρήτης, το Φαράγγι της Σαμαριάς και τα χωριά του Αποκόρωνα.",
        tip: "Αφήστε το αυτοκίνητο σε πάρκινγκ έξω από την παλιά πόλη και περπατήστε στα στενά.",
      },
      de: {
        name: "Chania Stadt",
        intro:
          "Der venezianische Hafen und die Altstadt von Chania gehören zu den schönsten Griechenlands. Wir liefern Ihren Wagen in Chania, damit Sie die wilden Strände Westkretas, die Samaria-Schlucht und die Bergdörfer von Apokoronas erreichen.",
        tip: "Parken Sie außerhalb der Altstadt und erkunden Sie die engen Gassen zu Fuß.",
      },
      fr: {
        name: "La Canée ville",
        intro:
          "Le port vénitien et la vieille ville de La Canée comptent parmi les plus beaux de Grèce. Nous livrons votre voiture à La Canée pour rejoindre les plages sauvages de l'ouest, les gorges de Samaria et les villages d'Apokoronas.",
        tip: "Garez-vous dans un parking hors de la vieille ville et explorez les ruelles à pied.",
      },
      it: {
        name: "Chania città",
        intro:
          "Il porto veneziano e il centro storico di Chania sono tra i più belli della Grecia. Consegniamo l'auto a Chania per raggiungere le spiagge selvagge della Creta occidentale, le gole di Samaria e i villaggi di Apokoronas.",
        tip: "Lascia l'auto in un parcheggio fuori dal centro storico e scopri i vicoli a piedi.",
      },
      nl: {
        name: "Chania stad",
        intro:
          "De Venetiaanse haven en de oude stad van Chania horen bij de mooiste van Griekenland. We leveren je auto in Chania, zodat je de ruige stranden van West-Kreta, de Samaria-kloof en de bergdorpen van Apokoronas bereikt.",
        tip: "Parkeer buiten de oude stad en ontdek de smalle straatjes te voet.",
      },
      pl: {
        name: "Chania miasto",
        intro:
          "Wenecki port i stare miasto w Chanii należą do najpiękniejszych w Grecji. Podstawimy auto w Chanii, a ty dotrzesz na dzikie plaże zachodniej Krety, do wąwozu Samaria i górskich wiosek Apokoronas.",
        tip: "Zostaw auto na parkingu poza starym miastem i zwiedzaj wąskie uliczki pieszo.",
      },
    },
  },
  {
    slug: "rethymno",
    stationId: 5,
    karpadu: "rethymno",
    kind: "Downtown",
    copy: {
      en: {
        name: "Rethymno",
        intro:
          "Rethymno sits halfway between Heraklion and Chania, with a Venetian fortress, a long town beach and an old town full of tavernas. A rental car takes you to Arkadi Monastery, Preveli and the south coast at Plakias.",
        tip: "The drive through the Kotsifou gorge to Plakias is one of the most scenic on the island.",
      },
      el: {
        name: "Ρέθυμνο",
        intro:
          "Το Ρέθυμνο βρίσκεται στη μέση της διαδρομής Ηρακλείου–Χανίων, με ενετική Φορτέτσα, μεγάλη παραλία και παλιά πόλη γεμάτη ταβέρνες. Με αυτοκίνητο φτάνετε εύκολα στη Μονή Αρκαδίου, στο Πρέβελη και στον Πλακιά.",
        tip: "Η διαδρομή μέσα από το φαράγγι του Κοτσυφού προς τον Πλακιά είναι από τις ωραιότερες του νησιού.",
      },
      de: {
        name: "Rethymno",
        intro:
          "Rethymno liegt auf halbem Weg zwischen Heraklion und Chania, mit venezianischer Festung, langem Stadtstrand und einer Altstadt voller Tavernen. Mit dem Mietwagen erreichen Sie das Kloster Arkadi, Preveli und die Südküste bei Plakias.",
        tip: "Die Fahrt durch die Kotsifou-Schlucht nach Plakias gehört zu den schönsten der Insel.",
      },
      fr: {
        name: "Réthymnon",
        intro:
          "Réthymnon se trouve à mi-chemin entre Héraklion et La Canée, avec sa forteresse vénitienne, sa longue plage et sa vieille ville pleine de tavernes. En voiture, rejoignez le monastère d'Arkadi, Preveli et la côte sud à Plakias.",
        tip: "La route des gorges de Kotsifou vers Plakias est l'une des plus belles de l'île.",
      },
      it: {
        name: "Rethymno",
        intro:
          "Rethymno si trova a metà strada tra Heraklion e Chania, con la fortezza veneziana, una lunga spiaggia e un centro storico pieno di taverne. In auto raggiungi il monastero di Arkadi, Preveli e la costa sud a Plakias.",
        tip: "La strada attraverso la gola di Kotsifou fino a Plakias è tra le più panoramiche dell'isola.",
      },
      nl: {
        name: "Rethymnon",
        intro:
          "Rethymnon ligt halverwege Heraklion en Chania, met een Venetiaans fort, een lang stadsstrand en een oude stad vol taverna's. Met een huurauto bereik je het klooster van Arkadi, Preveli en de zuidkust bij Plakias.",
        tip: "De route door de Kotsifou-kloof naar Plakias is een van de mooiste van het eiland.",
      },
      pl: {
        name: "Retimno",
        intro:
          "Retimno leży w połowie drogi między Heraklionem a Chanią, z wenecką twierdzą, długą miejską plażą i starówką pełną tawern. Autem dojedziesz do klasztoru Arkadi, Preveli i na południowe wybrzeże w Plakias.",
        tip: "Trasa przez wąwóz Kotsifou do Plakias to jedna z najpiękniejszych na wyspie.",
      },
    },
  },
  {
    slug: "agios-nikolaos",
    stationId: 6,
    karpadu: "agiosNikolaos",
    kind: "Port",
    copy: {
      en: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos, on the Mirabello Bay, is the gateway to eastern Crete. Pick up your car at the port and drive to Elounda and Spinalonga, the Lasithi Plateau or the palm beach of Vai.",
        tip: "Lake Voulismeni in the town centre is a lovely stop for coffee.",
      },
      el: {
        name: "Άγιος Νικόλαος",
        intro:
          "Ο Άγιος Νικόλαος, στον κόλπο του Μιραμπέλλου, είναι η πύλη της ανατολικής Κρήτης. Παραλάβετε το αυτοκίνητο στο λιμάνι και οδηγήστε προς Ελούντα και Σπιναλόγκα, το Οροπέδιο Λασιθίου ή το φοινικόδασος του Βάι.",
        tip: "Η λίμνη Βουλισμένη στο κέντρο είναι υπέροχη στάση για καφέ.",
      },
      de: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos an der Mirabello-Bucht ist das Tor zum Osten Kretas. Übernehmen Sie Ihren Wagen am Hafen und fahren Sie nach Elounda und Spinalonga, auf die Lassithi-Hochebene oder zum Palmenstrand von Vai.",
        tip: "Der Voulismeni-See im Zentrum ist ein schöner Halt für einen Kaffee.",
      },
      fr: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos, sur la baie de Mirabello, est la porte de l'est de la Crète. Récupérez votre voiture au port et filez vers Elounda et Spinalonga, le plateau du Lassithi ou la palmeraie de Vaï.",
        tip: "Le lac Voulismeni, au centre-ville, est parfait pour une pause café.",
      },
      it: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos, sulla baia di Mirabello, è la porta della Creta orientale. Ritira l'auto al porto e guida verso Elounda e Spinalonga, l'altopiano di Lasithi o il palmeto di Vai.",
        tip: "Il lago Voulismeni in centro è una sosta perfetta per un caffè.",
      },
      nl: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos aan de baai van Mirabello is de toegangspoort tot Oost-Kreta. Haal je auto op in de haven en rijd naar Elounda en Spinalonga, de Lassithi-hoogvlakte of het palmstrand van Vai.",
        tip: "Het Voulismeni-meer in het centrum is een fijne stop voor koffie.",
      },
      pl: {
        name: "Agios Nikolaos",
        intro:
          "Agios Nikolaos nad zatoką Mirabello to brama do wschodniej Krety. Odbierz auto w porcie i jedź do Eloundy i na Spinalongę, na płaskowyż Lasithi lub na palmową plażę Vai.",
        tip: "Jezioro Voulismeni w centrum to świetne miejsce na kawę.",
      },
    },
  },
];

export function getLocationPage(slug: string) {
  return locationPages.find((page) => page.slug === slug) ?? null;
}
