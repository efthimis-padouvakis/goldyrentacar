// Copied by hand from the Google Maps listing. Update rating, count and syncedAt when new reviews come in.
// Quotes are verbatim; authors are shortened to first name + initial.

const PLACE_ID = "ChIJofjtGIJbmhQR7_tm8VVIgaw";

export interface Review {
  author: string;
  text: string;
}

export const GOOGLE_REVIEWS = {
  rating: 5.0,
  count: 33,
  syncedAt: "2026-10-27",
  url: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
  writeUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
  mapsUrl: "https://www.google.com/maps?cid=12430295980478757871",
};

export const reviews: Review[] = [
  {
    author: "Danella D.",
    text: "I recently rented a vehicle from Goldy Rent a car and had an outstanding experience. The pickup process was incredibly fast, and the staff was professional and welcoming. My car was brand new, smelled fresh, and ran perfectly throughout the entire trip. I appreciated that there were no hidden fees or high-pressure sales pitches at the counter. Drop-off was a breeze, and I will definitely choose this company again.",
  },
  {
    author: "Adema M.",
    text: "Great experience! Manos was super helpful, very responsive, and friendly. The car was also brand new and we had no issues at all. The whole process, from booking the car to returning it, went extremely smoothly. Definitely recommend!",
  },
  {
    author: "Lisa W.",
    text: "Great company. They brought me a car to Chania bus terminal and i dropped it off in Heraklion. Easy to work with and communicate with during the rental period. I would definitely use them again.",
  },
  {
    author: "Ecaterina L.",
    text: "We used their rental service and everything went really smooth. Fast service, plenty of options to choose from, they accommodated all of our needs even late pick due to flight delays. definitely made our stay in Crete so much better, 100% recommend.",
  },
  {
    author: "Julie S.",
    text: "Brilliant rental process very smooth and great service - was able to rent from Agios Niklaos and return airport. Would recommend.",
  },
  {
    author: "Ram O.",
    text: "Exceptional service: From the beginning of the reservation until the return of the vehicle, we received courteous and professional treatment with great patience and consideration. The price was fair with no surprises. And special thanks to Manos.",
  },
];
