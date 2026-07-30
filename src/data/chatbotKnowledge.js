// Simple keyword-matched knowledge base for the GoTravel chatbot.
// Order matters — more specific intents should come before general ones.

const knowledgeBase = [

  {
    keywords: ["hi", "hello", "hey", "good morning", "good evening"],
    reply: "Hey there! 👋 I'm the GoTravel Assistant. Ask me about packages, bookings, destinations, or anything else — or tap a suggestion below."
  },

  {
    keywords: ["cancel"],
    reply: "To cancel a booking, go to My Bookings and click the Cancel button on the trip you want to cancel. You'll be asked to confirm before it's cancelled."
  },

  {
    keywords: ["edit booking", "change booking", "modify booking"],
    reply: "You can edit a booking from the My Bookings page — click Edit on the trip, update your details, and save changes."
  },

  {
    keywords: ["package", "price", "cost of", "how much"],
    reply: "Our travel packages range from budget-friendly to luxury trips. Check out the Packages section on the Home page to see prices, durations, and what's included for each destination."
  },

  {
    keywords: ["book", "booking", "reserve"],
    reply: "Booking is easy: pick a destination or package, click Book Now, fill in your travel details, and confirm payment. You'll get a confirmation with a downloadable receipt."
  },

  {
    keywords: ["weather"],
    reply: "You can check live weather for any destination — just click the small Weather button on a destination or package card!"
  },

  {
    keywords: ["plan my trip", "itinerary", "ai planner", "trip planner"],
    reply: "Try our AI Trip Planner! Just enter your destination, budget, and number of days, and it'll generate a day-by-day itinerary you can download as a PDF."
  },

  {
    keywords: ["wishlist", "favorite", "favourite", "save for later"],
    reply: "Tap the heart icon on any destination or package to save it to your Wishlist. You can view saved trips anytime from your Profile."
  },

  {
    keywords: ["payment", "pay", "card", "upi", "paypal"],
    reply: "We support Credit Card, UPI, and PayPal at checkout. This is a demo checkout, so no real payment is ever processed."
  },

  {
    keywords: ["compare"],
    reply: "Want to compare two destinations side-by-side — price, weather, hotels, and rating? Check out the Compare page!"
  },

  {
    keywords: ["budget", "calculator", "how much will it cost"],
    reply: "Our Travel Cost Calculator lets you add up Hotel, Flights, Food, Transport, and Activities to estimate your total trip budget."
  },

  {
    keywords: ["blog", "article", "guide"],
    reply: "Check out our Travel Blog for guides like 'Best Time to Visit Bali' and 'Top 10 Beaches Around the World'."
  },

  {
    keywords: ["login", "sign in", "sign up", "register", "account"],
    reply: "You can log in or create an account from the Login page. Once logged in, you can book trips, save favorites, and manage your profile."
  },

  {
    keywords: ["bali", "dubai", "maldives", "paris", "switzerland", "thailand"],
    reply: "We currently feature Bali, Dubai, Maldives, Paris, Switzerland, and Thailand — click on any destination card to see a full guide with things to do, hotels, and restaurants."
  },

  {
    keywords: ["contact", "support", "help", "human", "agent"],
    reply: "For anything I can't help with, visit our Contact page and our team will get back to you directly."
  },

  {
    keywords: ["thank", "thanks"],
    reply: "You're very welcome! Happy travels! ✈️"
  },

  {
    keywords: ["bye", "goodbye"],
    reply: "Goodbye! Come back anytime you're planning your next trip. 👋"
  }

];

export function getBotReply(message) {

  const text = message.toLowerCase();

  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => text.includes(keyword))
  );

  if (match) return match.reply;

  return "I'm not totally sure about that one — but you can browse Packages, Destinations, or visit our Contact page for direct help. Try asking about bookings, weather, pricing, or the trip planner!";

}

export const quickReplies = [
  "Show me packages",
  "How do I book a trip?",
  "Check the weather",
  "Plan my trip",
  "Contact support"
];
