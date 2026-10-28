import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Heraklion, Kreta, Grecja`;

const pl: LegalSet = {
  contents: "Na tej stronie",
  terms: {
    updated: "Ostatnia aktualizacja: 28 października 2026",
    intro:
      "Niniejsze warunki obowiązują, gdy korzystasz z goldyrentacar.gr oraz gdy wynajmujesz samochód w Goldy Rent a Car. Przeczytaj je przed rezerwacją. Dokonując rezerwacji, akceptujesz te warunki wraz z umową najmu, którą podpisujesz przy odbiorze.",
    sections: [
      {
        h: "Kim jesteśmy",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Telefon i WhatsApp ${COMPANY.phone}, e-mail ${COMPANY.email}.`,
          "Dostępność na żywo i rezerwacje online działają na platformie Karpadu, greckim systemie rezerwacji wynajmu samochodów. Karpadu dostarcza wyłącznie technologię rezerwacji. Umowę najmu zawierasz zawsze z Goldy Rent a Car.",
        ],
      },
      {
        h: "Rezerwacja i potwierdzenie",
        body: [
          [
            "Rezerwujesz, wybierając samochód, ochronę i ewentualne dodatki, podając dane kierowcy i płacąc online.",
            "Rezerwacja jest potwierdzona, gdy wyślemy Ci e-mail z potwierdzeniem i numerem rezerwacji.",
            "Jeśli samochód nie jest już dostępny lub jego cena zmieniła się między wyszukiwaniem a płatnością, nie potwierdzamy rezerwacji i automatycznie zwracamy całą kwotę.",
            "Samochody są pokazane jako przykłady swojej kategorii. Gwarantujemy kategorię, a nie markę, model czy kolor. Jeśli Twoja kategoria jest niedostępna, otrzymasz bez dopłaty samochód tej samej lub wyższej kategorii.",
            "Sprawdź dane w potwierdzeniu i od razu daj nam znać, jeśli coś się nie zgadza.",
          ],
        ],
      },
      {
        h: "Cena i płatność",
        body: [
          [
            "Cena widoczna przy rezerwacji to łączna kwota za Twoje daty, miejsca odbioru i zwrotu, ochronę i dodatki. Obejmuje VAT, nielimitowany przebieg, ochronę od kradzieży i uszkodzeń oraz pomoc drogową 24/7.",
            "Płacisz całą kwotę online kartą debetową lub kredytową przez Viva Wallet, licencjonowanego dostawcę płatności. Nigdy nie widzimy ani nie przechowujemy danych Twojej karty.",
            "Cena nie obejmuje paliwa ani ładowania, opłat drogowych, parkingów, mandatów ani biletów na prom. Koszty, które powodujesz, takie jak brakujące paliwo, spóźniony zwrot, specjalne czyszczenie lub szkody nieobjęte ochroną, są naliczane osobno, jak opisano poniżej.",
            "Wszystkie ceny podane są w euro (€).",
          ],
        ],
      },
      {
        h: "Ochrona, udział własny i kaucja",
        body: [
          [
            "Każdy wynajem obejmuje ochronę od kradzieży i uszkodzeń. Udział własny to maksymalna kwota, jaką płacisz za uszkodzenie lub kradzież samochodu.",
            "Dla każdego samochodu przed rezerwacją pokazujemy udział własny i kaucję każdej ochrony. Wybrana ochrona jest podana w potwierdzeniu.",
            "Przy ochronie pełnej lub Premium kaucja wynosi 0 €. Przy ochronie podstawowej przy odbiorze wpłacasz zwrotną kaucję, którą oddajemy, gdy samochód wróci na czas, bez nowych uszkodzeń i z uzgodnionym poziomem paliwa lub naładowania.",
            "Żadna ochrona nie wymaga karty kredytowej.",
          ],
        ],
      },
      {
        h: "Kiedy ochrona nie obowiązuje",
        body: [
          "Niezależnie od wybranej ochrony pokrywasz pełny koszt uszkodzenia, utraty lub kradzieży, ponad udział własny, gdy wynika ono z:",
          [
            "jazdy pod wpływem alkoholu, narkotyków lub leków wpływających na prowadzenie pojazdu;",
            "prowadzenia przez kierowcę niewpisanego do umowy najmu;",
            "przewiezienia samochodu promem lub poza Kretę albo jazdy po drogach nieutwardzonych bez naszej pisemnej zgody;",
            "zatankowania niewłaściwego paliwa;",
            "umyślnego uszkodzenia, brawurowej jazdy lub poważnego naruszenia przepisów ruchu drogowego;",
            "utraty kluczyków albo kradzieży samochodu, gdy kluczyki lub dokumenty pojazdu były w środku;",
            "niezgłoszenia wypadku nam oraz, w razie potrzeby, policji.",
          ],
        ],
      },
      {
        h: "Wymagania wobec kierowcy",
        body: [
          [
            "Kierowca i każdy dodatkowy kierowca muszą być wpisani do umowy najmu.",
            "Każdy kierowca musi mieć ważne prawo jazdy, posiadane od co najmniej roku, i spełniać limity wieku dla danego samochodu. Podaj wiek kierowcy w wyszukiwarce, a pokażemy tylko samochody, które może wynająć.",
            "Przy prawie jazdy wydanym poza UE lub EOG może być potrzebne międzynarodowe prawo jazdy wraz z krajowym.",
            "Przy odbiorze przynieś prawo jazdy oraz paszport lub dowód osobisty każdego kierowcy.",
            "Możemy odmówić wydania samochodu, jeśli kierowca nie może okazać tych dokumentów lub wyraźnie nie jest w stanie prowadzić.",
          ],
        ],
      },
      {
        h: "Odbiór i zwrot",
        body: [
          [
            "Spotykamy się z Tobą w miejscu i o godzinie odbioru z rezerwacji. Jeśli podasz numer lotu, śledzimy lot i czekamy w razie opóźnienia.",
            "Jeśli spóźnisz się z innego powodu, zadzwoń lub napisz do nas.",
            "Wspólnie sprawdzamy samochód przy odbiorze i zwrocie. Istniejące uszkodzenia są zapisywane w umowie najmu.",
            "Zwróć samochód w uzgodnionym miejscu i czasie, z takim samym poziomem paliwa lub naładowania jak przy odbiorze. Brakujące paliwo lub energia są naliczane po kosztach.",
            "Dni najmu liczymy w okresach 24-godzinnych od godziny odbioru. Spóźnienie do 1 godziny jest bezpłatne; później możemy naliczyć dodatkowy dzień według stawki dziennej z rezerwacji.",
            "Przy wcześniejszym zwrocie niewykorzystane dni nie są zwracane.",
          ],
        ],
      },
      {
        h: "Zmiana, anulowanie i niestawienie się",
        body: [
          [
            "Możesz bezpłatnie zmienić lub anulować rezerwację w dowolnym momencie przed godziną odbioru. Skontaktuj się z nami przez WhatsApp, telefon lub e-mail, podając numer rezerwacji.",
            "Po anulowaniu zwracamy całą kwotę na kartę, którą zapłaciłeś. W zależności od banku zwrot pojawi się w ciągu 5–10 dni roboczych.",
            "Jeśli zmiana wpływa na cenę, dopłacasz różnicę lub ją zwracamy.",
            "Jeśli nie przyjedziesz i nie skontaktujesz się z nami, trzymamy dla Ciebie samochód przez 3 godziny po godzinie odbioru. Potem rezerwacja jest traktowana jako niestawienie się: możemy przekazać samochód innym klientom, a cena najmu nie jest zwracana.",
            "Jeśli to my musimy anulować rezerwację, oferujemy równorzędny samochód lub zwracamy całą kwotę, według Twojego wyboru.",
          ],
          "Zgodnie z unijnym i greckim prawem konsumenckim 14-dniowe prawo odstąpienia od umowy nie dotyczy wynajmu samochodów na określone daty (art. 16 lit. l dyrektywy 2011/83/UE). Zamiast niego obowiązuje opisane wyżej bezpłatne anulowanie.",
        ],
      },
      {
        h: "Korzystanie z samochodu",
        body: [
          [
            "Przestrzegaj greckich przepisów ruchu drogowego. Pasy bezpieczeństwa są obowiązkowe dla wszystkich pasażerów, a dzieci muszą podróżować w foteliku dopasowanym do ich wzrostu.",
            "Wyjazd poza Kretę, przeprawa promem lub jazda po drogach nieutwardzonych wymaga naszej pisemnej zgody.",
            "W samochodzie nie wolno palić. Zwierzęta mogą podróżować tylko za naszą zgodą. Jeśli samochód wymaga specjalnego czyszczenia, naliczamy jego koszt.",
            "Samochodu nie wolno podnajmować, używać do odpłatnego przewozu osób lub towarów, do wyścigów, nauki jazdy ani do holowania.",
            "Zawsze zamykaj samochód i trzymaj kluczyki oraz dokumenty przy sobie.",
          ],
        ],
      },
      {
        h: "Wypadki, awarie i szkody",
        body: [
          [
            `Nasza pomoc drogowa jest dostępna 24/7 pod numerem ${COMPANY.phone}.`,
            "Po wypadku upewnij się, że wszyscy są bezpieczni, i od razu do nas zadzwoń. Jeśli brał w nim udział inny pojazd, wypełnij z drugim kierowcą Europejskie oświadczenie o zdarzeniu drogowym lub wezwij policję (100, a w nagłych przypadkach 112). Nie przyznawaj się do winy.",
            "Nie naprawiaj samochodu i nie oddawaj go do naprawy bez naszej zgody.",
            "Jeśli samochód ulegnie awarii nie z Twojej winy, naprawimy go lub wymienimy bez kosztów dla Ciebie.",
          ],
        ],
      },
      {
        h: "Mandaty, opłaty drogowe i parkowanie",
        body: [
          "W czasie najmu kierowca odpowiada za mandaty drogowe i parkingowe, opłaty drogowe oraz ewentualne koszty odholowania. Jeśli mandat dotrze do nas po zakończeniu najmu, przekazujemy dane kierowcy organowi, który go wystawił, zgodnie z wymogami greckiego prawa, albo obciążamy Cię kwotą mandatu.",
        ],
      },
      {
        h: "Nasza odpowiedzialność",
        body: [
          "Odpowiadamy za szkody wyrządzone umyślnie lub przez rażące niedbalstwo, a także za szkody na życiu, ciele lub zdrowiu zgodnie z prawem. Nie odpowiadamy za rzeczy osobiste pozostawione w samochodzie ani za szkody pośrednie, takie jak spóźnienie na lot, spowodowane zdarzeniami od nas niezależnymi. Nic w tych warunkach nie ogranicza praw, które przysługują Ci jako konsumentowi na mocy bezwzględnie obowiązujących przepisów.",
        ],
      },
      {
        h: "Korzystanie z tej strony",
        body: [
          [
            "Dbamy, aby ceny, dostępność i inne informacje na tej stronie były jak najdokładniejsze. Dostępność jest pokazywana na żywo i może się zmienić do chwili potwierdzenia rezerwacji.",
            "Teksty, zdjęcia i logotypy na tej stronie należą do Goldy Rent a Car lub jej licencjodawców. Nie wolno ich kopiować do celów komercyjnych bez naszej zgody.",
            "Nie nadużywaj strony, na przykład przez fałszywe rezerwacje, automatyczne pobieranie danych lub próby obejścia jej zabezpieczeń.",
            "Linki do innych stron (np. Karpadu, Viva Wallet, Google lub WhatsApp) służą Twojej wygodzie. Nie odpowiadamy za ich treść.",
          ],
        ],
      },
      {
        h: "Reklamacje i prawo właściwe",
        body: [
          `Jeśli coś pójdzie nie tak, najpierw daj nam znać pod adresem ${COMPANY.email} lub numerem ${COMPANY.phone}, a zrobimy wszystko, by to naprawić.`,
          "Niniejsze warunki podlegają prawu greckiemu. Jako konsument zachowujesz także ochronę bezwzględnie obowiązujących przepisów kraju swojego zamieszkania. Właściwe są sądy w Heraklionie, chyba że prawo konsumenckie pozwala Ci wnieść sprawę do sądu w miejscu zamieszkania.",
          "Możesz też zwrócić się do greckiego Rzecznika Praw Konsumenta, niezależnego organu, który bezpłatnie rozstrzyga spory konsumenckie: www.synigoroskatanaloti.gr.",
          "Warunki są dostępne w kilku językach. Jeśli tłumaczenie różni się od tekstu angielskiego, pierwszeństwo ma tekst angielski.",
        ],
      },
      {
        h: "Zmiany warunków",
        body: [
          "Możemy aktualizować te warunki. Do Twojej rezerwacji stosuje się wersję obowiązującą w dniu rezerwacji. Data najnowszej wersji jest podana na górze tej strony.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Ostatnia aktualizacja: 28 października 2026",
    intro:
      "Niniejsza polityka wyjaśnia, jakie dane osobowe zbiera Goldy Rent a Car, gdy odwiedzasz goldyrentacar.gr, kontaktujesz się z nami lub wynajmujesz samochód, w jakim celu je wykorzystujemy oraz jakie prawa przysługują Ci na mocy ogólnego rozporządzenia o ochronie danych (RODO) i greckiej ustawy 4624/2019.",
    sections: [
      {
        h: "Administrator danych",
        body: [
          `Administratorem Twoich danych osobowych jest ${COMPANY.name}, ${ADDRESS}. W sprawach dotyczących Twoich danych napisz na ${COMPANY.email} lub zadzwoń pod ${COMPANY.phone}.`,
        ],
      },
      {
        h: "Jakie dane zbieramy",
        body: [
          [
            "Przy wyszukiwaniu: miejsca odbioru i zwrotu, daty i godziny oraz wiek kierowcy.",
            "Przy rezerwacji: imię i nazwisko, e-mail, numer telefonu komórkowego, kraj zamieszkania, numer lotu (opcjonalnie) oraz wybrany samochód, ochronę, dodatki i cenę.",
            "Przy płatności: Viva Wallet przetwarza Twoją kartę na własnej bezpiecznej stronie. Otrzymujemy tylko wynik płatności, kwotę i numer transakcji, nigdy pełny numer karty.",
            "Przy odbiorze i w trakcie najmu: dane z prawa jazdy oraz paszportu lub dowodu osobistego każdego kierowcy, podpisaną umowę najmu, stan, poziom paliwa i przebieg samochodu, a także ewentualne zgłoszenia wypadków, szkód lub mandatów.",
            "Gdy się z nami kontaktujesz: Twoje wiadomości e-mail, rozmowy telefoniczne lub wiadomości WhatsApp.",
            "Dane techniczne: adres IP, typ przeglądarki i odwiedzane strony, rejestrowane przez naszego dostawcę hostingu w celu zapewnienia bezpieczeństwa strony.",
          ],
          "Nie prosimy o dane wrażliwe, takie jak informacje o zdrowiu. Bez danych rezerwacji nie możemy przyjąć Twojej rezerwacji.",
        ],
      },
      {
        h: "Dlaczego je wykorzystujemy",
        body: [
          [
            "Aby pokazać dostępność i ceny, przyjąć rezerwację, pobrać płatność, wydać samochód i kontaktować się z Tobą w sprawie najmu. Podstawa prawna: umowa z Tobą i działania, o które prosisz przed jej zawarciem (art. 6 ust. 1 lit. b RODO).",
            "Aby wystawiać faktury, prowadzić księgowość i odpowiadać na zapytania organów, na przykład w sprawie mandatów. Podstawa prawna: nasze obowiązki prawne (art. 6 ust. 1 lit. c RODO).",
            "Aby chronić nasze samochody i firmę: zapobiegać oszustwom, obsługiwać szkody i roszczenia ubezpieczeniowe, bronić się przed roszczeniami i zabezpieczać stronę. Podstawa prawna: nasze prawnie uzasadnione interesy (art. 6 ust. 1 lit. f RODO).",
          ],
          "Nie wykorzystujemy Twoich danych do reklamy, nie wysyłamy newsletterów i nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu.",
        ],
      },
      {
        h: "Komu je przekazujemy",
        body: [
          [
            "Karpadu, platformie rezerwacyjnej, która w naszym imieniu przetwarza dostępność i rezerwacje.",
            "Viva Wallet, licencjonowanemu dostawcy płatności, który obsługuje Twoją płatność. Viva Wallet odpowiada za dane Twojej karty zgodnie z własną polityką prywatności.",
            "Vercel Inc., która w naszym imieniu hostuje tę stronę.",
            "Naszemu księgowemu, ubezpieczycielom, prawnikom, warsztatom i partnerom pomocy drogowej, wyłącznie gdy potrzebują danych w związku z najmem lub roszczeniem.",
            "Organom publicznym, takim jak urząd skarbowy, policja lub sądy, gdy wymaga tego prawo.",
            "WhatsApp (Meta), jeśli zdecydujesz się napisać do nas przez WhatsApp. Te wiadomości podlegają także polityce prywatności WhatsApp.",
          ],
          "Nigdy nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych.",
        ],
      },
      {
        h: "Przekazywanie poza UE",
        body: [
          "Nasz dostawca hostingu, Vercel, jest firmą amerykańską, dlatego niektóre dane mogą być przetwarzane poza Europejskim Obszarem Gospodarczym. W takim przypadku są chronione zabezpieczeniami wymaganymi przez RODO, takimi jak Ramy ochrony danych UE–USA lub standardowe klauzule umowne Komisji Europejskiej.",
        ],
      },
      {
        h: "Jak długo je przechowujemy",
        body: [
          [
            "Wyszukiwania nie są powiązane z Tobą i nie przechowujemy ich.",
            "Dokumenty rezerwacji i najmu przechowujemy tak długo, jak wymaga tego greckie prawo podatkowe i rachunkowe, zwykle 5 lat od końca roku, w którym odbył się najem, a dłużej tylko wtedy, gdy toczy się roszczenie, sprawa mandatu lub spór.",
            "Wiadomości przechowujemy tak długo, jak są potrzebne do udzielenia odpowiedzi i obsługi rezerwacji.",
            "Logi hostingu są przechowywane krótko, a następnie automatycznie usuwane.",
          ],
        ],
      },
      {
        h: "Pliki cookie i pamięć przeglądarki",
        body: [
          [
            "Używamy jednego pliku cookie, „lang”, który przez rok zapamiętuje wybrany język. Jest zapisywany tylko wtedy, gdy wybierzesz język.",
            "Podczas rezerwacji wyszukiwanie i dane kierowcy są przechowywane w karcie przeglądarki (session storage), aby nie zginęły w drodze na stronę płatności i z powrotem. Są usuwane po zamknięciu karty.",
            "Nie używamy plików cookie analitycznych, reklamowych ani śledzących, a nasze czcionki ładujemy z własnej strony, więc Twoja wizyta nie jest zgłaszana Google ani żadnej sieci reklamowej.",
            "Strona płatności Viva Wallet może używać własnych plików cookie, zgodnie z polityką prywatności Viva Wallet.",
          ],
          "Ponieważ używamy tylko tego, co jest niezbędne do działania strony, nie wyświetlamy banera cookie. Jeśli kiedyś dodamy narzędzia analityczne, najpierw poprosimy o Twoją zgodę i zaktualizujemy tę politykę.",
        ],
      },
      {
        h: "Jak je chronimy",
        body: [
          "Strona korzysta z szyfrowanego połączenia (HTTPS), płatności kartą obsługuje dostawca z certyfikatem PCI DSS, a dostęp do Twoich danych mają tylko osoby, które potrzebują ich do obsługi Twojego najmu.",
        ],
      },
      {
        h: "Twoje prawa",
        body: [
          "Masz prawo:",
          [
            "dostępu do danych osobowych, które o Tobie przechowujemy, i otrzymania ich kopii;",
            "sprostowania nieprawidłowych danych;",
            "usunięcia danych, gdy nie są nam już potrzebne lub nie mamy podstawy prawnej do ich przechowywania;",
            "ograniczenia wykorzystania danych lub sprzeciwu wobec wykorzystania opartego na naszych prawnie uzasadnionych interesach;",
            "otrzymania przekazanych nam danych w powszechnie używanym formacie elektronicznym (przenoszenie danych).",
          ],
          `Aby skorzystać z któregokolwiek z tych praw, napisz na ${COMPANY.email}. Odpowiadamy w ciągu miesiąca i możemy najpierw poprosić o potwierdzenie tożsamości. Masz też prawo złożyć skargę do greckiego organu ochrony danych (www.dpa.gr) lub do organu ochrony danych w kraju UE, w którym mieszkasz.`,
        ],
      },
      {
        h: "Zmiany polityki",
        body: [
          "Możemy aktualizować tę politykę, gdy zmienią się nasze usługi lub przepisy. Data najnowszej wersji jest podana na górze tej strony.",
        ],
      },
    ],
  },
};

export default pl;
