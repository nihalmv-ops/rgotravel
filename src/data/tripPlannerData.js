// Curated activity pools per destination. Used to generate a
// day-by-day itinerary in TripPlanner.jsx. Add more destinations
// or activities here any time — no other file needs to change.

export const destinationPools = {

  bali: [
    { title: "Beach Relaxation", desc: "Unwind on Kuta or Seminyak beach with golden sand and surf lessons." },
    { title: "Temple Tour", desc: "Explore Tanah Lot and Uluwatu temples perched dramatically on cliffs." },
    { title: "Water Sports", desc: "Try snorkeling, jet skiing, and banana boat rides at Nusa Dua." },
    { title: "Ubud Rice Terraces", desc: "Walk through the iconic Tegalalang rice terraces and local art markets." },
    { title: "Shopping & Local Crafts", desc: "Browse handmade batik, silver jewelry, and souvenirs in Ubud market." },
    { title: "Sunset Cruise", desc: "Sail along the coast as the sky turns gold over the Indian Ocean." },
    { title: "Waterfall Trek", desc: "Hike to Tegenungan or Tibumana waterfall for a refreshing dip." },
    { title: "Balinese Spa Day", desc: "Traditional massage and flower bath at a local spa retreat." }
  ],

  dubai: [
    { title: "Burj Khalifa Visit", desc: "Ride to the observation deck of the world's tallest building." },
    { title: "Desert Safari", desc: "Dune bashing, camel rides, and a BBQ dinner under the stars." },
    { title: "Dubai Mall & Fountain Show", desc: "Shop at the world's largest mall and catch the famous fountain show." },
    { title: "Old Dubai & Souks", desc: "Explore the Gold and Spice Souks along Dubai Creek." },
    { title: "Palm Jumeirah Tour", desc: "Visit Atlantis and the beach clubs of the iconic Palm island." },
    { title: "Water Sports at JBR", desc: "Jet ski, parasail, or flyboard along Jumeirah Beach Residence." },
    { title: "Museum of the Future", desc: "Step into Dubai's most futuristic architectural landmark." }
  ],

  maldives: [
    { title: "Overwater Bungalow Check-in", desc: "Settle into your private overwater villa above turquoise lagoons." },
    { title: "Snorkeling & Coral Reefs", desc: "Explore vibrant coral reefs teeming with tropical fish." },
    { title: "Sunset Cruise", desc: "Watch dolphins play as the sun sets over the Indian Ocean." },
    { title: "Private Sandbank Picnic", desc: "A secluded picnic on a sandbank surrounded by clear water." },
    { title: "Scuba Diving Excursion", desc: "Dive with manta rays and whale sharks at a nearby reef." },
    { title: "Spa on the Water", desc: "A couples spa treatment in an overwater spa pavilion." },
    { title: "Island Hopping", desc: "Visit a local island to experience Maldivian culture and cuisine." }
  ],

  paris: [
    { title: "Eiffel Tower Visit", desc: "Ascend the Eiffel Tower for panoramic views of the city." },
    { title: "Louvre Museum Tour", desc: "See the Mona Lisa and thousands of years of art history." },
    { title: "Seine River Cruise", desc: "A relaxing boat ride past Notre-Dame and Musée d'Orsay." },
    { title: "Montmartre & Sacré-Cœur", desc: "Wander cobblestone streets and artist squares atop the hill." },
    { title: "Shopping on the Champs-Élysées", desc: "Browse flagship stores and cafés on Paris's grand avenue." },
    { title: "Palace of Versailles", desc: "Day trip to the opulent former royal residence and gardens." },
    { title: "Latin Quarter Food Walk", desc: "Sample pastries, cheese, and wine in the historic student quarter." }
  ],

  switzerland: [
    { title: "Jungfraujoch - Top of Europe", desc: "Train ride to Europe's highest railway station amid the Alps." },
    { title: "Lake Lucerne Cruise", desc: "Scenic boat ride surrounded by snow-capped mountains." },
    { title: "Zermatt & Matterhorn Views", desc: "Cable car rides with iconic views of the Matterhorn peak." },
    { title: "Interlaken Adventure Sports", desc: "Paragliding or skydiving over the Swiss Alps." },
    { title: "Chocolate & Cheese Tasting", desc: "Sample Swiss chocolate and alpine cheese in a local village." },
    { title: "Rhine Falls Visit", desc: "See Europe's largest waterfall near Schaffhausen." },
    { title: "Alpine Hiking Trail", desc: "A scenic hike through green valleys and mountain trails." }
  ],

  thailand: [
    { title: "Grand Palace & Temples", desc: "Visit Bangkok's Grand Palace and Wat Phra Kaew." },
    { title: "Phi Phi Islands Tour", desc: "Boat trip to the stunning limestone cliffs of Phi Phi Islands." },
    { title: "Floating Market Visit", desc: "Explore Damnoen Saduak's colorful floating market by boat." },
    { title: "Water Sports in Phuket", desc: "Jet skiing, parasailing, and snorkeling off Patong Beach." },
    { title: "Night Market Shopping", desc: "Browse street food and souvenirs at Chiang Mai's night bazaar." },
    { title: "Thai Cooking Class", desc: "Learn to cook pad thai and green curry from a local chef." },
    { title: "Elephant Sanctuary Visit", desc: "An ethical, hands-off encounter at an elephant rescue sanctuary." },
    { title: "Sunset Cruise", desc: "Sail along the Andaman coast as the sky turns orange and pink." }
  ]

};

// Fallback pool used when the destination isn't in the list above.
export const genericPool = [
  { title: "City Orientation Tour", desc: "A guided walk through the historic city center and main landmarks." },
  { title: "Local Cuisine Tasting", desc: "Sample the region's signature dishes at popular local eateries." },
  { title: "Museum & Culture Visit", desc: "Explore a top-rated museum or cultural heritage site." },
  { title: "Nature & Scenic Spot", desc: "Visit a nearby park, viewpoint, or natural landmark." },
  { title: "Shopping & Markets", desc: "Browse local markets, boutiques, and souvenir shops." },
  { title: "Sunset Viewpoint", desc: "Catch the sunset from one of the area's best viewpoints." },
  { title: "Adventure Activity", desc: "Try a popular local adventure activity, from hiking to water sports." },
  { title: "Relaxation Day", desc: "A slower-paced day at a café, spa, or scenic waterfront." }
];

export function getBudgetTier(budget, days) {

  const perDay = Number(budget) / Number(days || 1);

  if (perDay < 100) {

    return {
      tier: "Budget Explorer",
      tip: "Focus on street food, public transport, and free attractions to stretch your budget."
    };

  }

  if (perDay < 250) {

    return {
      tier: "Comfort Traveler",
      tip: "A comfortable mix of guided tours, mid-range dining, and a few splurge experiences."
    };

  }

  return {
    tier: "Luxury Experience",
    tip: "Plenty of room for private tours, fine dining, and premium accommodations."
  };

}
