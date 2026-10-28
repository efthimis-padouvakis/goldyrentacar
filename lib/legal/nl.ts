import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Heraklion, Kreta, Griekenland`;

const nl: LegalSet = {
  contents: "Op deze pagina",
  terms: {
    updated: "Laatst bijgewerkt: 28 oktober 2026",
    intro:
      "Deze voorwaarden gelden wanneer u goldyrentacar.gr gebruikt en wanneer u een auto huurt bij Goldy Rent a Car. Lees ze voordat u boekt. Met uw boeking aanvaardt u deze voorwaarden, samen met de huurovereenkomst die u bij het ophalen ondertekent.",
    sections: [
      {
        h: "Wie wij zijn",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Telefoon en WhatsApp ${COMPANY.phone}, e-mail ${COMPANY.email}.`,
          "Onze live beschikbaarheid en online boekingen draaien op Karpadu, een Grieks reserveringsplatform voor autoverhuur. Karpadu levert alleen de boekingstechniek. Uw huurovereenkomst sluit u altijd met Goldy Rent a Car.",
        ],
      },
      {
        h: "Boeking en bevestiging",
        body: [
          [
            "U boekt door een auto, een dekking en eventuele extra's te kiezen, de gegevens van de bestuurder in te vullen en online te betalen.",
            "Uw boeking is bevestigd zodra wij u een bevestiging met uw boekingsnummer e-mailen.",
            "Is de auto niet meer beschikbaar of is de prijs tussen uw zoekopdracht en uw betaling veranderd, dan bevestigen wij de boeking niet en betalen wij het volledige bedrag automatisch terug.",
            "Auto's worden getoond als voorbeeld van hun categorie. Wij garanderen de categorie, niet het merk, model of de kleur. Is uw categorie niet beschikbaar, dan krijgt u zonder meerprijs een auto uit dezelfde of een hogere categorie.",
            "Controleer de gegevens in uw bevestiging en laat het ons direct weten als er iets niet klopt.",
          ],
        ],
      },
      {
        h: "Prijs en betaling",
        body: [
          [
            "De prijs bij het boeken is het totaal voor uw data, ophaal- en inleverpunten, dekking en extra's. Inbegrepen zijn btw, onbeperkt kilometers, dekking voor diefstal en schade en 24/7 pechhulp.",
            "U betaalt het volledige bedrag online met debet- of creditcard via Viva Wallet, een vergunninghoudende betaalprovider. Wij zien en bewaren uw kaartgegevens nooit.",
            "Niet inbegrepen zijn brandstof of laden, tol, parkeren, verkeersboetes en veerboottickets. Kosten die u veroorzaakt, zoals ontbrekende brandstof, te laat inleveren, extra reiniging of schade die de dekking niet vergoedt, worden apart berekend zoals hieronder beschreven.",
            "Alle prijzen zijn in euro (€).",
          ],
        ],
      },
      {
        h: "Dekking, eigen risico en borg",
        body: [
          [
            "Elke huur omvat dekking voor diefstal en schade. Het eigen risico is het maximale bedrag dat u betaalt bij schade aan of diefstal van de auto.",
            "Voor elke auto tonen wij vóór het boeken het eigen risico en de borg van elke dekking. De gekozen dekking staat in uw bevestiging.",
            "Met Volledige dekking of Premiumdekking is de borg €0. Met Basisdekking betaalt u bij het ophalen een borg, die u terugkrijgt wanneer de auto op tijd, zonder nieuwe schade en met het afgesproken brandstof- of laadniveau terugkomt.",
            "Voor geen enkele dekking is een creditcard nodig.",
          ],
        ],
      },
      {
        h: "Wanneer de dekking niet geldt",
        body: [
          "Welke dekking u ook kiest, u betaalt de volledige kosten van schade, verlies of diefstal boven het eigen risico wanneer die zijn veroorzaakt door:",
          [
            "rijden onder invloed van alcohol, drugs of medicijnen die de rijvaardigheid beïnvloeden;",
            "een bestuurder die niet in de huurovereenkomst staat;",
            "de auto meenemen op een veerboot of buiten Kreta, of rijden op onverharde wegen, zonder onze schriftelijke toestemming;",
            "tanken van de verkeerde brandstof;",
            "opzettelijke schade, roekeloos rijden of ernstige verkeersovertredingen;",
            "verlies van de sleutels, of diefstal van de auto terwijl de sleutels of autopapieren erin lagen;",
            "een ongeval dat niet aan ons en, waar nodig, aan de politie is gemeld.",
          ],
        ],
      },
      {
        h: "Eisen aan de bestuurder",
        body: [
          [
            "De bestuurder en elke extra bestuurder moeten in de huurovereenkomst staan.",
            "Elke bestuurder heeft een geldig rijbewijs dat hij ten minste één jaar heeft en voldoet aan de leeftijdsgrenzen van de auto. Vul de leeftijd van de bestuurder in bij het zoeken en wij tonen alleen auto's die hij mag huren.",
            "Voor een rijbewijs van buiten de EU of EER kan naast het nationale rijbewijs een internationaal rijbewijs nodig zijn.",
            "Neem bij het ophalen voor elke bestuurder het rijbewijs en een paspoort of identiteitskaart mee.",
            "Wij kunnen weigeren de auto mee te geven als een bestuurder deze documenten niet kan tonen of duidelijk niet in staat is om te rijden.",
          ],
        ],
      },
      {
        h: "Ophalen en inleveren",
        body: [
          [
            "Wij ontmoeten u op het ophaalpunt en de ophaaltijd van uw boeking. Geeft u ons uw vluchtnummer, dan volgen wij uw vlucht en wachten wij bij vertraging.",
            "Bent u om een andere reden later, bel ons dan of stuur ons een bericht.",
            "Wij controleren de auto samen bij het ophalen en inleveren. Bestaande schade wordt in de huurovereenkomst vastgelegd.",
            "Lever de auto in op de afgesproken plaats en tijd, met hetzelfde brandstof- of laadniveau als bij het ophalen. Ontbrekende brandstof of lading wordt tegen kostprijs berekend.",
            "Huurdagen tellen in periodes van 24 uur vanaf de ophaaltijd. Tot 1 uur te laat is gratis; daarna kunnen wij een extra dag rekenen tegen het dagtarief van uw boeking.",
            "Levert u de auto eerder in, dan worden ongebruikte dagen niet terugbetaald.",
          ],
        ],
      },
      {
        h: "Wijzigen, annuleren en niet verschijnen",
        body: [
          [
            "U kunt uw boeking op elk moment vóór de ophaaltijd gratis wijzigen of annuleren. Neem contact met ons op via WhatsApp, telefoon of e-mail met uw boekingsnummer.",
            "Bij annulering betalen wij het volledige bedrag terug op de kaart waarmee u hebt betaald. Afhankelijk van uw bank staat het binnen 5 tot 10 werkdagen op uw rekening.",
            "Verandert een wijziging de prijs, dan betaalt u het verschil of krijgt u het terug.",
            "Verschijnt u niet en hebt u ons niets laten weten, dan houden wij de auto tot 3 uur na de ophaaltijd voor u vast. Daarna geldt de boeking als niet verschenen: wij kunnen de auto aan een ander geven en de huurprijs wordt niet terugbetaald.",
            "Moeten wij uw boeking annuleren, dan bieden wij u een gelijkwaardige auto aan of betalen wij het volledige bedrag terug, wat u wilt.",
          ],
          "Volgens het Europese en Griekse consumentenrecht geldt het herroepingsrecht van 14 dagen niet voor autohuur die voor specifieke data is geboekt (artikel 16, onder l, van Richtlijn 2011/83/EU). In plaats daarvan geldt onze gratis annulering hierboven.",
        ],
      },
      {
        h: "Gebruik van de auto",
        body: [
          [
            "Volg de Griekse verkeersregels. Gordels zijn verplicht voor alle inzittenden en kinderen moeten in een kinderzitje passend bij hun lengte zitten.",
            "Kreta verlaten, de veerboot nemen of op onverharde wegen rijden vereist onze schriftelijke toestemming.",
            "Roken in de auto is niet toegestaan. Huisdieren mogen alleen mee met onze toestemming. Heeft de auto extra reiniging nodig, dan rekenen wij de reinigingskosten.",
            "De auto mag niet worden onderverhuurd, gebruikt voor betaald vervoer van personen of goederen, voor races of rijlessen, of om iets te trekken.",
            "Doe de auto altijd op slot en houd sleutels en papieren bij u.",
          ],
        ],
      },
      {
        h: "Ongevallen, pech en schade",
        body: [
          [
            `Onze pechhulp is 24/7 bereikbaar op ${COMPANY.phone}.`,
            "Zorg na een ongeval dat iedereen veilig is en bel ons direct. Is er een ander voertuig bij betrokken, vul dan met de andere bestuurder een Europees schadeformulier in of bel de politie (100, of 112 bij noodgevallen). Erken geen schuld.",
            "Repareer de auto niet zelf en laat hem niet repareren zonder onze toestemming.",
            "Krijgt de auto pech buiten uw schuld, dan repareren of vervangen wij hem kosteloos.",
          ],
        ],
      },
      {
        h: "Boetes, tol en parkeren",
        body: [
          "De bestuurder is tijdens de huur verantwoordelijk voor verkeers- en parkeerboetes, tol en eventuele wegsleepkosten. Komt een boete na de huur bij ons binnen, dan geven wij de gegevens van de bestuurder door aan de instantie die de boete heeft opgelegd, zoals de Griekse wet vereist, of brengen wij u het boetebedrag in rekening.",
        ],
      },
      {
        h: "Onze aansprakelijkheid",
        body: [
          "Wij zijn aansprakelijk voor schade door onze opzet of grove nalatigheid, en voor letsel aan leven, lichaam of gezondheid volgens de wet. Wij zijn niet aansprakelijk voor persoonlijke spullen die in de auto zijn achtergelaten, of voor indirecte schade, zoals een gemiste vlucht, door gebeurtenissen buiten onze macht. Niets in deze voorwaarden beperkt de rechten die u als consument op grond van dwingend recht hebt.",
        ],
      },
      {
        h: "Gebruik van deze website",
        body: [
          [
            "Wij houden prijzen, beschikbaarheid en andere informatie op deze website zo nauwkeurig mogelijk. De beschikbaarheid is live en kan veranderen tot uw boeking is bevestigd.",
            "De teksten, foto's en logo's op deze website zijn van Goldy Rent a Car of haar licentiegevers. U mag ze niet zonder onze toestemming kopiëren voor commercieel gebruik.",
            "Misbruik de website niet, bijvoorbeeld door nepboekingen, automatisch uitlezen of pogingen om de beveiliging te omzeilen.",
            "Links naar andere websites (zoals Karpadu, Viva Wallet, Google of WhatsApp) zijn er voor uw gemak. Wij zijn niet verantwoordelijk voor hun inhoud.",
          ],
        ],
      },
      {
        h: "Klachten en toepasselijk recht",
        body: [
          `Gaat er iets mis, laat het ons dan eerst weten via ${COMPANY.email} of ${COMPANY.phone}, en wij doen ons best om het op te lossen.`,
          "Op deze voorwaarden is Grieks recht van toepassing. Als consument behoudt u ook de bescherming van de dwingende regels van uw woonland. De rechtbanken van Heraklion zijn bevoegd, tenzij het consumentenrecht u toestaat naar de rechter in uw woonplaats te gaan.",
          "U kunt ook terecht bij de Griekse Consumentenombudsman, een onafhankelijke instantie die consumentengeschillen kosteloos beslecht: www.synigoroskatanaloti.gr.",
          "Deze voorwaarden zijn in meerdere talen beschikbaar. Wijkt een vertaling af van de Engelse tekst, dan gaat de Engelse tekst voor.",
        ],
      },
      {
        h: "Wijzigingen van deze voorwaarden",
        body: [
          "Wij kunnen deze voorwaarden bijwerken. Op uw boeking is de versie van toepassing die gold op de dag dat u boekte. De datum van de nieuwste versie staat bovenaan deze pagina.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Laatst bijgewerkt: 28 oktober 2026",
    intro:
      "Dit beleid legt uit welke persoonsgegevens Goldy Rent a Car verzamelt wanneer u goldyrentacar.gr bezoekt, contact met ons opneemt of een auto huurt, waarom wij ze gebruiken en welke rechten u hebt onder de Algemene verordening gegevensbescherming (AVG) en de Griekse wet 4624/2019.",
    sections: [
      {
        h: "Wie is verantwoordelijk",
        body: [
          `De verwerkingsverantwoordelijke voor uw persoonsgegevens is ${COMPANY.name}, ${ADDRESS}. Voor vragen over uw gegevens kunt u mailen naar ${COMPANY.email} of bellen naar ${COMPANY.phone}.`,
        ],
      },
      {
        h: "Welke gegevens wij verzamelen",
        body: [
          [
            "Bij het zoeken: ophaal- en inleverpunten, data en tijden, en de leeftijd van de bestuurder.",
            "Bij het boeken: voor- en achternaam, e-mail, mobiel nummer, woonland, vluchtnummer (optioneel) en de gekozen auto, dekking, extra's en prijs.",
            "Bij het betalen: Viva Wallet verwerkt uw kaart op een eigen beveiligde pagina. Wij ontvangen alleen het betaalresultaat, het bedrag en een transactiereferentie, nooit uw volledige kaartnummer.",
            "Bij het ophalen en tijdens de huur: de gegevens van het rijbewijs en het paspoort of de identiteitskaart van elke bestuurder, de ondertekende huurovereenkomst, de staat, het brandstofniveau en de kilometerstand van de auto, en eventuele meldingen van ongevallen, schade of boetes.",
            "Als u contact met ons opneemt: uw berichten via e-mail, telefoon of WhatsApp.",
            "Technische gegevens: uw IP-adres, browsertype en de opgevraagde pagina's, vastgelegd door onze hostingprovider voor de beveiliging van de website.",
          ],
          "Wij vragen geen gevoelige gegevens, zoals gezondheidsinformatie. Zonder de boekingsgegevens kunnen wij uw boeking niet aannemen.",
        ],
      },
      {
        h: "Waarvoor wij ze gebruiken",
        body: [
          [
            "Om beschikbaarheid en prijzen te tonen, uw boeking aan te nemen, de betaling te verwerken, de auto te leveren en contact met u op te nemen over uw huur. Rechtsgrond: de overeenkomst met u en de stappen die u vooraf vraagt (artikel 6, lid 1, onder b, AVG).",
            "Om facturen uit te reiken, onze boekhouding bij te houden en verzoeken van autoriteiten te beantwoorden, bijvoorbeeld over boetes. Rechtsgrond: onze wettelijke verplichtingen (artikel 6, lid 1, onder c, AVG).",
            "Om onze auto's en ons bedrijf te beschermen: fraude voorkomen, schade- en verzekeringsclaims afhandelen, ons verdedigen tegen claims en de website beveiligen. Rechtsgrond: onze gerechtvaardigde belangen (artikel 6, lid 1, onder f, AVG).",
          ],
          "Wij gebruiken uw gegevens niet voor reclame, sturen geen nieuwsbrieven en nemen geen besluiten over u die uitsluitend geautomatiseerd zijn.",
        ],
      },
      {
        h: "Met wie wij ze delen",
        body: [
          [
            "Karpadu, het reserveringsplatform dat beschikbaarheid en boekingen namens ons verwerkt.",
            "Viva Wallet, de vergunninghoudende betaalprovider die uw betaling verwerkt. Viva Wallet is volgens haar eigen privacybeleid verantwoordelijk voor uw kaartgegevens.",
            "Vercel Inc., die deze website namens ons host.",
            "Onze boekhouder, verzekeraars, advocaten, garages en pechhulppartners, alleen wanneer zij de gegevens nodig hebben voor uw huur of een claim.",
            "Overheidsinstanties, zoals de belastingdienst, de politie of de rechter, wanneer de wet dat vereist.",
            "WhatsApp (Meta), als u ons via WhatsApp een bericht stuurt. Die berichten vallen ook onder het privacybeleid van WhatsApp.",
          ],
          "Wij verkopen of verhuren uw persoonsgegevens nooit.",
        ],
      },
      {
        h: "Doorgifte buiten de EU",
        body: [
          "Onze hostingprovider Vercel is een Amerikaans bedrijf, dus sommige gegevens kunnen buiten de Europese Economische Ruimte worden verwerkt. In dat geval zijn ze beschermd door de waarborgen die de AVG vereist, zoals het EU-VS Data Privacy Framework of de modelcontractbepalingen van de Europese Commissie.",
        ],
      },
      {
        h: "Hoe lang wij ze bewaren",
        body: [
          [
            "Zoekopdrachten worden niet aan u gekoppeld en niet door ons bewaard.",
            "Boekings- en huurgegevens bewaren wij zolang de Griekse fiscale en boekhoudwetgeving vereist, doorgaans 5 jaar na het einde van het jaar van de huur, en langer alleen zolang een claim, boete of geschil openstaat.",
            "Berichten bewaren wij zolang wij ze nodig hebben om u te antwoorden en uw boeking af te handelen.",
            "Hostinglogs worden kort bewaard en daarna automatisch verwijderd.",
          ],
        ],
      },
      {
        h: "Cookies en browseropslag",
        body: [
          [
            "Wij gebruiken één cookie, ‘lang’, dat de gekozen taal een jaar lang onthoudt. Het wordt alleen geplaatst als u een taal kiest.",
            "Tijdens een boeking worden uw zoekopdracht en bestuurdersgegevens in uw browsertabblad bewaard (session storage), zodat ze niet verloren gaan op weg naar de betaalpagina en terug. Ze worden gewist wanneer u het tabblad sluit.",
            "Wij gebruiken geen analyse-, advertentie- of trackingcookies, en onze lettertypen komen van onze eigen website, dus uw bezoek wordt niet aan Google of een advertentienetwerk gemeld.",
            "De betaalpagina van Viva Wallet kan eigen cookies gebruiken, zoals beschreven in het privacybeleid van Viva Wallet.",
          ],
          "Omdat wij alleen gebruiken wat de website nodig heeft om te werken, tonen wij geen cookiebanner. Voegen wij ooit analysetools toe, dan vragen wij eerst uw toestemming en passen wij dit beleid aan.",
        ],
      },
      {
        h: "Hoe wij ze beschermen",
        body: [
          "De website gebruikt een versleutelde verbinding (HTTPS), kaartbetalingen lopen via een PCI DSS-gecertificeerde betaalprovider, en alleen de mensen die uw gegevens nodig hebben voor uw huur hebben er toegang toe.",
        ],
      },
      {
        h: "Uw rechten",
        body: [
          "U hebt het recht om:",
          [
            "de persoonsgegevens die wij over u hebben in te zien en een kopie te krijgen;",
            "onjuiste gegevens te laten corrigeren;",
            "uw gegevens te laten verwijderen wanneer wij ze niet meer nodig hebben of geen wettelijke reden hebben om ze te bewaren;",
            "het gebruik van uw gegevens te laten beperken of bezwaar te maken tegen gebruik op basis van onze gerechtvaardigde belangen;",
            "de gegevens die u ons gaf te ontvangen in een gangbaar elektronisch formaat (overdraagbaarheid).",
          ],
          `Om een van deze rechten uit te oefenen, mailt u naar ${COMPANY.email}. Wij antwoorden binnen een maand en kunnen u eerst vragen uw identiteit te bevestigen. U hebt ook het recht een klacht in te dienen bij de Griekse gegevensbeschermingsautoriteit (www.dpa.gr) of bij de toezichthouder in het EU-land waar u woont.`,
        ],
      },
      {
        h: "Wijzigingen van dit beleid",
        body: [
          "Wij kunnen dit beleid bijwerken wanneer onze diensten of de wet veranderen. De datum van de nieuwste versie staat bovenaan deze pagina.",
        ],
      },
    ],
  },
};

export default nl;
