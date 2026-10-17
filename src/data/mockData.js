// Default Destinations Data
export const INITIAL_DESTINATIONS = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "$799",
    category: "Beach & Nature",
    status: "Active"
  },
  {
    id: 2,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "$999",
    category: "Luxury City",
    status: "Active"
  },
  {
    id: 3,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    price: "$1,299",
    category: "Island Resort",
    status: "Active"
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: "$899",
    category: "Romantic & Cultural",
    status: "Active"
  },
  {
    id: 5,
    name: "Switzerland",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "$1,499",
    category: "Mountain & Winter",
    status: "Active"
  },
  {
    id: 6,
    name: "Thailand",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "$699",
    category: "Tropical Adventure",
    status: "Active"
  }
];

// Default Tour Packages Data
export const INITIAL_PACKAGES = [
  {
    id: 1,
    title: "Bali Tropical Adventure",
    location: "Indonesia",
    days: "5 Days",
    people: "2-8",
    price: "$799",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Swiss Alps Express",
    location: "Switzerland",
    days: "7 Days",
    people: "2-10",
    price: "$1,499",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Maldives Luxury Overwater",
    location: "Maldives",
    days: "4 Days",
    people: "2-6",
    price: "$999",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Dubai Skyline & Safari",
    location: "UAE",
    days: "6 Days",
    people: "2-8",
    price: "$1,199",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

// Initial Bookings Data
export const INITIAL_BOOKINGS = [
  {
    id: "BK-8041",
    customer: "Nihal MV",
    email: "nihal@example.com",
    phone: "+91 9876543210",
    tour: "Bali Tropical Adventure",
    destination: "Bali, Indonesia",
    travelDate: "2026-11-20",
    guests: 2,
    amount: "$1,598",
    paymentMethod: "Credit Card",
    status: "Confirmed",
    bookedOn: "2026-10-15"
  },
  {
    id: "BK-8042",
    customer: "Sophia Rossi",
    email: "sophia.rossi@example.com",
    phone: "+39 06 698 12345",
    tour: "Swiss Alps Express",
    destination: "Zermatt, Switzerland",
    travelDate: "2026-12-05",
    guests: 4,
    amount: "$5,996",
    paymentMethod: "PayPal",
    status: "Confirmed",
    bookedOn: "2026-10-14"
  },
  {
    id: "BK-8043",
    customer: "Liam Vance",
    email: "liam.vance@example.com",
    phone: "+44 20 7946 0912",
    tour: "Maldives Luxury Overwater",
    destination: "Male, Maldives",
    travelDate: "2026-11-28",
    guests: 2,
    amount: "$1,998",
    paymentMethod: "Credit Card",
    status: "Pending",
    bookedOn: "2026-10-16"
  },
  {
    id: "BK-8044",
    customer: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 415-555-0182",
    tour: "Dubai Skyline & Safari",
    destination: "Dubai, UAE",
    travelDate: "2026-11-10",
    guests: 1,
    amount: "$1,199",
    paymentMethod: "Stripe",
    status: "Pending",
    bookedOn: "2026-10-17"
  },
  {
    id: "BK-8045",
    customer: "Marcus Aurel",
    email: "marcus.a@example.com",
    phone: "+49 30 1234567",
    tour: "Paris Romance Getaway",
    destination: "Paris, France",
    travelDate: "2026-10-30",
    guests: 2,
    amount: "$1,798",
    paymentMethod: "Apple Pay",
    status: "Cancelled",
    bookedOn: "2026-10-11"
  }
];

// Initial Users Data
export const INITIAL_USERS = [
  {
    id: 1,
    name: "Nihal MV",
    email: "nihal@example.com",
    phone: "+91 9876543210",
    role: "Super Admin",
    status: "Active",
    bookings: 4,
    spent: "$4,290",
    joinDate: "2026-01-12"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 212-555-0144",
    role: "Manager",
    status: "Active",
    bookings: 0,
    spent: "$0",
    joinDate: "2026-02-04"
  },
  {
    id: 3,
    name: "Sophia Rossi",
    email: "sophia.rossi@example.com",
    phone: "+39 06 698 12345",
    role: "Premium Traveler",
    status: "Active",
    bookings: 6,
    spent: "$9,450",
    joinDate: "2026-03-15"
  },
  {
    id: 4,
    name: "Liam Vance",
    email: "liam.vance@example.com",
    phone: "+44 20 7946 0912",
    role: "Customer",
    status: "Active",
    bookings: 2,
    spent: "$1,998",
    joinDate: "2026-05-20"
  },
  {
    id: 5,
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 415-555-0182",
    role: "Customer",
    status: "Suspended",
    bookings: 1,
    spent: "$1,199",
    joinDate: "2026-06-11"
  }
];

