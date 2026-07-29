// Extra detail data for each destination, keyed by id (matches data/destinations.js ids).
// Keeping this separate from destinations.js so the existing card grid is untouched.

const destinationDetails = {

  1: { // Bali

    overview:
      "Bali blends lush jungle, volcanic mountains, and world-class beaches with a rich Hindu-influenced culture. Expect vibrant temples, rice terraces, and a laid-back island rhythm.",

    bestTime: "April to October (dry season, less humidity)",

    thingsToDo: [
      "Surf or relax on Kuta and Seminyak beaches",
      "Visit Tanah Lot and Uluwatu temples",
      "Walk the Tegalalang rice terraces",
      "Explore Ubud's art markets and monkey forest",
      "Chase waterfalls near Tibumana and Tegenungan"
    ],

    hotels: [
      { name: "Seminyak Beach Resort", price: "$120/night", rating: 4.6 },
      { name: "Ubud Jungle Villas", price: "$95/night", rating: 4.8 },
      { name: "Nusa Dua Grand Hotel", price: "$140/night", rating: 4.5 }
    ],

    restaurants: [
      { name: "Locavore", cuisine: "Modern Indonesian", price: "$$$" },
      { name: "Warung Babi Guling", cuisine: "Traditional Balinese", price: "$" },
      { name: "La Lucciola", cuisine: "Beachfront Italian", price: "$$" }
    ]

  },

  2: { // Dubai

    overview:
      "Dubai is a futuristic desert metropolis of record-breaking skyscrapers, luxury shopping, and golden dunes just outside the city. A mix of ultra-modern and traditional Arabian culture.",

    bestTime: "November to March (cooler, more comfortable outdoors)",

    thingsToDo: [
      "Ride to the top of the Burj Khalifa",
      "Go dune bashing on a desert safari",
      "Shop and watch the fountain show at Dubai Mall",
      "Wander the Gold and Spice Souks",
      "Visit Palm Jumeirah and Atlantis"
    ],

    hotels: [
      { name: "Burj Al Arab", price: "$700/night", rating: 5.0 },
      { name: "Downtown Dubai Suites", price: "$180/night", rating: 4.6 },
      { name: "Palm Jumeirah Resort", price: "$260/night", rating: 4.7 }
    ],

    restaurants: [
      { name: "Pierchic", cuisine: "Seafood, overwater", price: "$$$" },
      { name: "Al Ustad Special Kebab", cuisine: "Local Emirati", price: "$" },
      { name: "Zuma Dubai", cuisine: "Japanese", price: "$$$" }
    ]

  },

  3: { // Maldives

    overview:
      "The Maldives is an archipelago of coral islands scattered across the Indian Ocean, known for overwater bungalows, crystal-clear lagoons, and some of the best diving on Earth.",

    bestTime: "November to April (dry season, calm seas)",

    thingsToDo: [
      "Stay in an overwater villa",
      "Snorkel vibrant coral reefs",
      "Take a sunset dolphin cruise",
      "Scuba dive with manta rays",
      "Picnic on a private sandbank"
    ],

    hotels: [
      { name: "Overwater Lagoon Villas", price: "$450/night", rating: 4.9 },
      { name: "Coral Reef Resort", price: "$320/night", rating: 4.7 },
      { name: "Sandbank Private Island", price: "$600/night", rating: 5.0 }
    ],

    restaurants: [
      { name: "Ithaa Undersea Restaurant", cuisine: "Fine dining, underwater", price: "$$$" },
      { name: "Local Island Cafe", cuisine: "Maldivian", price: "$" },
      { name: "Sunset Grill", cuisine: "Seafood BBQ", price: "$$" }
    ]

  },

  4: { // Paris

    overview:
      "Paris, the City of Light, pairs iconic landmarks like the Eiffel Tower and Louvre with charming cafés, world-renowned cuisine, and centuries of art and history around every corner.",

    bestTime: "April to June or September to October (mild weather, fewer crowds)",

    thingsToDo: [
      "Ascend the Eiffel Tower",
      "Explore the Louvre Museum",
      "Cruise the Seine River",
      "Wander Montmartre and Sacré-Cœur",
      "Day trip to the Palace of Versailles"
    ],

    hotels: [
      { name: "Le Marais Boutique Hotel", price: "$160/night", rating: 4.6 },
      { name: "Champs-Élysées Suites", price: "$220/night", rating: 4.7 },
      { name: "Montmartre Charm Inn", price: "$110/night", rating: 4.4 }
    ],

    restaurants: [
      { name: "Le Comptoir du Relais", cuisine: "French Bistro", price: "$$" },
      { name: "L'Ambroisie", cuisine: "Michelin Fine Dining", price: "$$$" },
      { name: "Breizh Café", cuisine: "Crepes", price: "$" }
    ]

  },

  5: { // Switzerland

    overview:
      "Switzerland delivers postcard-perfect Alpine scenery, pristine lakes, and charming villages, with some of the world's best train journeys connecting mountain peaks and valley towns.",

    bestTime: "June to September (hiking season) or December to March (skiing)",

    thingsToDo: [
      "Ride the Jungfraujoch, Top of Europe",
      "Cruise Lake Lucerne",
      "See the Matterhorn from Zermatt",
      "Try paragliding in Interlaken",
      "Visit Rhine Falls near Schaffhausen"
    ],

    hotels: [
      { name: "Interlaken Alpine Lodge", price: "$180/night", rating: 4.7 },
      { name: "Lucerne Lakeview Hotel", price: "$210/night", rating: 4.6 },
      { name: "Zermatt Chalet Suites", price: "$260/night", rating: 4.8 }
    ],

    restaurants: [
      { name: "Chez Vrony", cuisine: "Alpine Swiss", price: "$$$" },
      { name: "Käsestube", cuisine: "Fondue & Cheese", price: "$$" },
      { name: "Lucerne Lake Cafe", cuisine: "Casual European", price: "$" }
    ]

  },

  6: { // Thailand

    overview:
      "Thailand offers golden temples, bustling street markets, and idyllic islands, all wrapped in some of the friendliest hospitality and best street food in the world.",

    bestTime: "November to February (cool, dry season)",

    thingsToDo: [
      "Visit Bangkok's Grand Palace",
      "Boat tour to the Phi Phi Islands",
      "Explore a floating market",
      "Take a Thai cooking class",
      "Visit an ethical elephant sanctuary"
    ],

    hotels: [
      { name: "Bangkok Riverside Hotel", price: "$90/night", rating: 4.5 },
      { name: "Phuket Beachfront Resort", price: "$150/night", rating: 4.7 },
      { name: "Chiang Mai Boutique Inn", price: "$70/night", rating: 4.6 }
    ],

    restaurants: [
      { name: "Jay Fai", cuisine: "Street Food, Michelin", price: "$" },
      { name: "Blue Elephant", cuisine: "Royal Thai", price: "$$$" },
      { name: "Night Market Food Stalls", cuisine: "Local Street Food", price: "$" }
    ]

  }

};

export default destinationDetails;
