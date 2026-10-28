import { COMPANY } from "@/lib/site";
import type { LegalSet } from "./index";

const ADDRESS = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.postalCode} Héraklion, Crète, Grèce`;

const fr: LegalSet = {
  contents: "Sur cette page",
  terms: {
    updated: "Dernière mise à jour : 28 octobre 2026",
    intro:
      "Ces conditions s'appliquent lorsque vous utilisez goldyrentacar.gr et lorsque vous louez une voiture chez Goldy Rent a Car. Lisez-les avant de réserver. En réservant, vous acceptez ces conditions ainsi que le contrat de location que vous signez à la prise en charge.",
    sections: [
      {
        h: "Qui sommes-nous",
        body: [
          `${COMPANY.name}, ${ADDRESS}. Téléphone et WhatsApp ${COMPANY.phone}, e-mail ${COMPANY.email}.`,
          "Nos disponibilités en temps réel et nos réservations en ligne fonctionnent sur Karpadu, une plateforme grecque de réservation de voitures de location. Karpadu fournit uniquement la technologie de réservation. Votre contrat de location est toujours conclu avec Goldy Rent a Car.",
        ],
      },
      {
        h: "Réservation et confirmation",
        body: [
          [
            "Vous réservez en choisissant une voiture, une protection et d'éventuelles options, en saisissant les coordonnées du conducteur et en payant en ligne.",
            "Votre réservation est confirmée lorsque nous vous envoyons un e-mail de confirmation avec votre numéro de réservation.",
            "Si la voiture n'est plus disponible ou si son prix a changé entre votre recherche et votre paiement, nous ne confirmons pas la réservation et remboursons automatiquement la totalité du montant.",
            "Les voitures sont présentées comme exemples de leur catégorie. Nous garantissons la catégorie, pas la marque, le modèle ou la couleur. Si votre catégorie n'est pas disponible, nous vous remettons une voiture de catégorie identique ou supérieure sans supplément.",
            "Vérifiez les informations de votre confirmation et prévenez-nous immédiatement si quelque chose est inexact.",
          ],
        ],
      },
      {
        h: "Prix et paiement",
        body: [
          [
            "Le prix affiché lors de la réservation est le total pour vos dates, vos lieux de prise en charge et de restitution, votre protection et vos options. Il comprend la TVA, le kilométrage illimité, la protection vol et dommages et l'assistance routière 24 h/24 et 7 j/7.",
            "Vous payez la totalité du montant en ligne par carte de débit ou de crédit via Viva Wallet, un prestataire de paiement agréé. Nous ne voyons ni ne conservons jamais les données de votre carte.",
            "Le prix n'inclut pas le carburant ou la recharge, les péages, le stationnement, les amendes ni les billets de ferry. Les frais que vous occasionnez, comme le carburant manquant, une restitution tardive, un nettoyage spécial ou des dommages non pris en charge par la protection, sont facturés à part comme indiqué ci-dessous.",
            "Tous les prix sont en euros (€).",
          ],
        ],
      },
      {
        h: "Protection, franchise et caution",
        body: [
          [
            "Chaque location comprend une protection vol et dommages. La franchise est le montant maximal que vous payez en cas de dommage ou de vol de la voiture.",
            "Pour chaque voiture, nous affichons la franchise et la caution de chaque protection avant la réservation. La protection choisie figure dans votre confirmation.",
            "Avec la protection Complète ou Premium, la caution est de 0 €. Avec la protection de base, une caution remboursable est versée à la prise en charge et restituée lorsque la voiture revient à l'heure, sans nouveau dommage et avec le niveau de carburant ou de charge convenu.",
            "Aucune carte de crédit n'est nécessaire, quelle que soit la protection.",
          ],
        ],
      },
      {
        h: "Quand la protection ne s'applique pas",
        body: [
          "Quelle que soit la protection choisie, vous payez la totalité du coût d'un dommage, d'une perte ou d'un vol, au-delà de la franchise, lorsqu'il est causé par :",
          [
            "la conduite sous l'emprise de l'alcool, de drogues ou de médicaments altérant la conduite ;",
            "un conducteur non inscrit au contrat de location ;",
            "l'embarquement de la voiture sur un ferry ou sa sortie de Crète, ou la conduite sur des routes non goudronnées, sans notre accord écrit ;",
            "un plein avec le mauvais carburant ;",
            "un dommage volontaire, une conduite imprudente ou des infractions graves au code de la route ;",
            "la perte des clés, ou le vol de la voiture alors que les clés ou les papiers du véhicule s'y trouvaient ;",
            "un accident non déclaré à nous et, si nécessaire, à la police.",
          ],
        ],
      },
      {
        h: "Conditions pour les conducteurs",
        body: [
          [
            "Le conducteur et chaque conducteur supplémentaire doivent figurer au contrat de location.",
            "Chaque conducteur doit être titulaire d'un permis de conduire valide depuis au moins un an et respecter les limites d'âge de la voiture. Indiquez l'âge du conducteur dans la recherche et nous n'affichons que les voitures qu'il peut louer.",
            "Un permis délivré hors de l'UE ou de l'EEE peut nécessiter un permis de conduire international en plus du permis national.",
            "À la prise en charge, apportez le permis de conduire et un passeport ou une carte d'identité pour chaque conducteur.",
            "Nous pouvons refuser de remettre la voiture si un conducteur ne peut pas présenter ces documents ou n'est manifestement pas en état de conduire.",
          ],
        ],
      },
      {
        h: "Prise en charge et restitution",
        body: [
          [
            "Nous vous retrouvons au lieu et à l'heure de prise en charge de votre réservation. Si vous nous donnez votre numéro de vol, nous suivons votre vol et vous attendons en cas de retard.",
            "Si vous êtes en retard pour une autre raison, appelez-nous ou envoyez-nous un message.",
            "Nous vérifions la voiture ensemble à la prise en charge et à la restitution. Les dommages existants sont notés sur le contrat de location.",
            "Rendez la voiture au lieu et à l'heure convenus, avec le même niveau de carburant ou de charge qu'à la prise en charge. Le carburant ou la charge manquants sont facturés au prix coûtant.",
            "Les jours de location sont comptés par tranches de 24 heures à partir de l'heure de prise en charge. Jusqu'à 1 heure de retard est gratuite ; au-delà, nous pouvons facturer un jour supplémentaire au tarif journalier de votre réservation.",
            "En cas de restitution anticipée, les jours non utilisés ne sont pas remboursés.",
          ],
        ],
      },
      {
        h: "Modification, annulation et non-présentation",
        body: [
          [
            "Vous pouvez modifier ou annuler votre réservation gratuitement à tout moment avant l'heure de prise en charge. Contactez-nous par WhatsApp, téléphone ou e-mail avec votre numéro de réservation.",
            "En cas d'annulation, nous remboursons la totalité du montant sur la carte utilisée pour le paiement. Selon votre banque, le remboursement apparaît sous 5 à 10 jours ouvrés.",
            "Si une modification change le prix, vous payez la différence ou nous vous la remboursons.",
            "Si vous ne vous présentez pas sans nous avoir prévenus, nous gardons la voiture pour vous pendant 3 heures après l'heure de prise en charge. Passé ce délai, la réservation est considérée comme une non-présentation : nous pouvons disposer de la voiture et le prix de la location n'est pas remboursé.",
            "Si nous devons annuler votre réservation, nous vous proposons une voiture équivalente ou remboursons la totalité du montant, selon votre choix.",
          ],
          "Selon le droit européen et grec de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux locations de voitures réservées pour des dates précises (article 16, point l, de la directive 2011/83/UE). C'est notre annulation gratuite décrite ci-dessus qui s'applique.",
        ],
      },
      {
        h: "Utilisation de la voiture",
        body: [
          [
            "Respectez le code de la route grec. La ceinture est obligatoire pour tous les passagers et les enfants doivent voyager dans un siège adapté à leur taille.",
            "Quitter la Crète, prendre un ferry ou rouler sur des routes non goudronnées nécessite notre accord écrit.",
            "Il est interdit de fumer dans la voiture. Les animaux ne sont admis qu'avec notre accord. Si la voiture nécessite un nettoyage spécial, nous facturons son coût.",
            "La voiture ne peut pas être sous-louée, servir au transport rémunéré de personnes ou de marchandises, à des courses, à des leçons de conduite ou au remorquage.",
            "Verrouillez toujours la voiture et gardez les clés et les papiers sur vous.",
          ],
        ],
      },
      {
        h: "Accidents, pannes et dommages",
        body: [
          [
            `Notre assistance routière est joignable 24 h/24 et 7 j/7 au ${COMPANY.phone}.`,
            "Après un accident, mettez tout le monde en sécurité puis appelez-nous immédiatement. Si un autre véhicule est impliqué, remplissez un constat amiable européen avec l'autre conducteur ou appelez la police (100, ou 112 en cas d'urgence). Ne reconnaissez pas votre responsabilité.",
            "Ne réparez pas la voiture et ne la faites pas réparer sans notre accord.",
            "Si la voiture tombe en panne sans faute de votre part, nous la réparons ou la remplaçons sans frais pour vous.",
          ],
        ],
      },
      {
        h: "Amendes, péages et stationnement",
        body: [
          "Le conducteur est responsable des amendes de circulation et de stationnement, des péages et des frais de fourrière pendant la location. Si une amende nous parvient après la location, nous communiquons les coordonnées du conducteur à l'autorité qui l'a émise, comme l'exige la loi grecque, ou nous vous facturons le montant de l'amende.",
        ],
      },
      {
        h: "Notre responsabilité",
        body: [
          "Nous sommes responsables des dommages causés par notre faute intentionnelle ou lourde, ainsi que des atteintes à la vie, à l'intégrité physique ou à la santé conformément à la loi. Nous ne sommes pas responsables des effets personnels laissés dans la voiture, ni des pertes indirectes, comme un vol manqué, dues à des événements indépendants de notre volonté. Rien dans ces conditions ne limite les droits dont vous disposez en tant que consommateur en vertu de dispositions impératives.",
        ],
      },
      {
        h: "Utilisation de ce site",
        body: [
          [
            "Nous veillons à ce que les prix, les disponibilités et les autres informations de ce site soient aussi exacts que possible. Les disponibilités sont en temps réel et peuvent changer jusqu'à la confirmation de votre réservation.",
            "Les textes, photos et logos de ce site appartiennent à Goldy Rent a Car ou à ses concédants. Vous ne pouvez pas les copier à des fins commerciales sans notre autorisation.",
            "N'utilisez pas le site de manière abusive, par exemple en effectuant de fausses réservations, en l'aspirant automatiquement ou en tentant de contourner sa sécurité.",
            "Les liens vers d'autres sites (comme Karpadu, Viva Wallet, Google ou WhatsApp) sont fournis pour votre commodité. Nous ne sommes pas responsables de leur contenu.",
          ],
        ],
      },
      {
        h: "Réclamations et droit applicable",
        body: [
          `En cas de problème, prévenez-nous d'abord à ${COMPANY.email} ou au ${COMPANY.phone}, et nous ferons tout notre possible pour le régler.`,
          "Ces conditions sont régies par le droit grec. Si vous êtes consommateur, vous conservez aussi la protection des dispositions impératives de votre pays de résidence. Les tribunaux d'Héraklion sont compétents, sauf si le droit de la consommation vous permet de saisir les tribunaux de votre lieu de résidence.",
          "Vous pouvez aussi vous adresser au Médiateur grec des consommateurs, un organisme indépendant qui règle gratuitement les litiges de consommation : www.synigoroskatanaloti.gr.",
          "Ces conditions existent en plusieurs langues. Si une traduction diffère du texte anglais, le texte anglais prévaut.",
        ],
      },
      {
        h: "Modification de ces conditions",
        body: [
          "Nous pouvons mettre à jour ces conditions. Votre réservation est régie par la version en vigueur le jour où vous avez réservé. La date de la dernière version figure en haut de cette page.",
        ],
      },
    ],
  },
  privacy: {
    updated: "Dernière mise à jour : 28 octobre 2026",
    intro:
      "Cette politique explique quelles données personnelles Goldy Rent a Car collecte lorsque vous visitez goldyrentacar.gr, nous contactez ou louez une voiture, pourquoi nous les utilisons et quels sont vos droits selon le Règlement général sur la protection des données (RGPD) et la loi grecque 4624/2019.",
    sections: [
      {
        h: "Responsable du traitement",
        body: [
          `Le responsable du traitement de vos données personnelles est ${COMPANY.name}, ${ADDRESS}. Pour toute question sur vos données, écrivez à ${COMPANY.email} ou appelez le ${COMPANY.phone}.`,
        ],
      },
      {
        h: "Données collectées",
        body: [
          [
            "Lors d'une recherche : lieux de prise en charge et de restitution, dates et heures, et âge du conducteur.",
            "Lors d'une réservation : prénom et nom, e-mail, téléphone mobile, pays de résidence, numéro de vol (facultatif), ainsi que la voiture, la protection, les options et le prix choisis.",
            "Lors du paiement : Viva Wallet traite votre carte sur sa propre page sécurisée. Nous recevons uniquement le résultat du paiement, le montant et une référence de transaction, jamais votre numéro de carte complet.",
            "À la prise en charge et pendant la location : les informations du permis de conduire et du passeport ou de la carte d'identité de chaque conducteur, le contrat de location signé, l'état, le niveau de carburant et le kilométrage de la voiture, ainsi que tout rapport d'accident, de dommage ou d'amende.",
            "Lorsque vous nous contactez : vos messages par e-mail, téléphone ou WhatsApp.",
            "Données techniques : votre adresse IP, le type de navigateur et les pages demandées, enregistrés par notre hébergeur pour la sécurité du site.",
          ],
          "Nous ne demandons pas de données sensibles, comme des informations de santé. Sans les informations de réservation, nous ne pouvons pas enregistrer votre réservation.",
        ],
      },
      {
        h: "Pourquoi nous les utilisons",
        body: [
          [
            "Pour afficher les disponibilités et les prix, enregistrer votre réservation, encaisser le paiement, vous remettre la voiture et vous contacter au sujet de votre location. Base légale : le contrat conclu avec vous et les démarches que vous demandez avant celui-ci (article 6, paragraphe 1, point b, du RGPD).",
            "Pour émettre les factures, tenir notre comptabilité et répondre aux demandes des autorités, par exemple concernant des amendes. Base légale : nos obligations légales (article 6, paragraphe 1, point c, du RGPD).",
            "Pour protéger nos voitures et notre activité : prévention de la fraude, gestion des dommages et des sinistres, défense en cas de litige et sécurité du site. Base légale : nos intérêts légitimes (article 6, paragraphe 1, point f, du RGPD).",
          ],
          "Nous n'utilisons pas vos données à des fins publicitaires, n'envoyons pas de newsletter et ne prenons aucune décision vous concernant sur la seule base d'un traitement automatisé.",
        ],
      },
      {
        h: "Avec qui nous les partageons",
        body: [
          [
            "Karpadu, la plateforme de réservation qui traite les disponibilités et les réservations pour notre compte.",
            "Viva Wallet, le prestataire de paiement agréé qui traite votre paiement. Viva Wallet est responsable des données de votre carte selon sa propre politique de confidentialité.",
            "Vercel Inc., qui héberge ce site pour notre compte.",
            "Notre comptable, nos assureurs, nos avocats, les garages et nos partenaires d'assistance routière, uniquement lorsqu'ils ont besoin des données pour votre location ou un sinistre.",
            "Les autorités publiques, comme l'administration fiscale, la police ou les tribunaux, lorsque la loi l'exige.",
            "WhatsApp (Meta), si vous choisissez de nous écrire sur WhatsApp. Ces messages relèvent aussi de la politique de confidentialité de WhatsApp.",
          ],
          "Nous ne vendons ni ne louons jamais vos données personnelles.",
        ],
      },
      {
        h: "Transferts hors de l'UE",
        body: [
          "Notre hébergeur, Vercel, est une société américaine ; certaines données peuvent donc être traitées hors de l'Espace économique européen. Dans ce cas, elles sont protégées par les garanties exigées par le RGPD, comme le cadre de protection des données UE–États-Unis ou les clauses contractuelles types de la Commission européenne.",
        ],
      },
      {
        h: "Durée de conservation",
        body: [
          [
            "Les recherches ne sont pas associées à votre personne et nous ne les conservons pas.",
            "Les dossiers de réservation et de location sont conservés aussi longtemps que l'exige la législation fiscale et comptable grecque, en général 5 ans après la fin de l'année de la location, et plus longtemps uniquement tant qu'une réclamation, une amende ou un litige est en cours.",
            "Les messages sont conservés le temps nécessaire pour vous répondre et gérer votre réservation.",
            "Les journaux d'hébergement sont conservés peu de temps puis supprimés automatiquement.",
          ],
        ],
      },
      {
        h: "Cookies et stockage du navigateur",
        body: [
          [
            "Nous utilisons un seul cookie, « lang », qui mémorise la langue choisie pendant un an. Il n'est déposé que lorsque vous choisissez une langue.",
            "Pendant une réservation, votre recherche et les coordonnées du conducteur sont conservées dans l'onglet de votre navigateur (session storage) afin de ne pas être perdues en allant vers la page de paiement et en revenant. Elles sont effacées lorsque vous fermez l'onglet.",
            "Nous n'utilisons aucun cookie d'analyse, de publicité ou de suivi, et nos polices sont servies depuis notre propre site : votre visite n'est signalée ni à Google ni à aucune régie publicitaire.",
            "La page de paiement de Viva Wallet peut utiliser ses propres cookies, comme décrit dans la politique de confidentialité de Viva Wallet.",
          ],
          "Comme nous n'utilisons que ce qui est nécessaire au fonctionnement du site, nous n'affichons pas de bandeau cookies. Si nous ajoutons un jour des outils d'analyse, nous vous demanderons d'abord votre consentement et mettrons à jour cette politique.",
        ],
      },
      {
        h: "Comment nous les protégeons",
        body: [
          "Le site utilise une connexion chiffrée (HTTPS), les paiements par carte passent par un prestataire certifié PCI DSS, et seules les personnes qui ont besoin de vos données pour votre location y ont accès.",
        ],
      },
      {
        h: "Vos droits",
        body: [
          "Vous avez le droit :",
          [
            "d'accéder aux données personnelles que nous détenons sur vous et d'en obtenir une copie ;",
            "de faire corriger des données inexactes ;",
            "de faire effacer vos données lorsque nous n'en avons plus besoin ou n'avons plus de motif légal de les conserver ;",
            "de limiter l'utilisation de vos données ou de vous opposer aux utilisations fondées sur nos intérêts légitimes ;",
            "de recevoir les données que vous nous avez fournies dans un format électronique courant (portabilité).",
          ],
          `Pour exercer l'un de ces droits, écrivez à ${COMPANY.email}. Nous répondons dans un délai d'un mois et pouvons d'abord vous demander de confirmer votre identité. Vous pouvez aussi introduire une réclamation auprès de l'Autorité grecque de protection des données (www.dpa.gr) ou de l'autorité de protection des données du pays de l'UE où vous vivez.`,
        ],
      },
      {
        h: "Modification de cette politique",
        body: [
          "Nous pouvons mettre à jour cette politique lorsque nos services ou la loi changent. La date de la dernière version figure en haut de cette page.",
        ],
      },
    ],
  },
};

export default fr;
