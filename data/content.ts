// All content comes from the client's 4 Word docs.
// Images: direct Unsplash photo links (free Unsplash License). Swap any ID in PHOTO to change a picture.
const PHOTO:Record<string,string>={"pyramids": "Nsi6jZ9tRZo", "cairo": "TPNpxqQCcRM", "luxor": "TMbybaaWZCk", "karnak": "v4tLl97tXBY", "aswan": "cOihXsrJFRc", "abusimbel": "cOihXsrJFRc", "hurghada": "4wB6TZFvMHQ", "sea": "3mraFOnRu3s", "island": "JQJ2MTtL_TU", "bus": "geGVinctLMg", "villa": "_2lbOEirZ3A", "columns": "HLiWEucOqg0", "desert": "TPNpxqQCcRM"};
const MAP:Record<string,string>={"offer": "pyramids", "cairo": "cairo", "alexandria": "sea", "luxor": "luxor", "aswan": "aswan", "sharm": "island", "hurghada": "hurghada", "marsa-alam": "sea", "excursions": "pyramids", "packages": "luxor", "cruise": "karnak", "diving": "sea", "ticketing": "bus", "cars": "bus", "rentals": "villa", "concierge": "hurghada", "events": "columns", "yacht": "sea", "sinai": "desert", "petra": "aswan", "parasail": "island", "pyramids": "pyramids", "whitedesert": "desert", "dolphin": "sea", "abudabbab": "island", "wadigemal": "desert", "edfu": "karnak", "balloon": "luxor", "car": "bus", "desert": "desert", "abusimbel": "abusimbel"};
export const img=(s:string)=>`https://unsplash.com/photos/${PHOTO[MAP[s]||"pyramids"]}/download?force=true&w=800`;
export const CITIES=["Cairo","Hurghada","Sharm El Sheikh","Marsa Alam","Luxor","Aswan","Alexandria"];
export const BROWSE=[
 {slug:"cairo",name:"Cairo & Giza",sub:"Pyramids, Museum, Khan El-Khalili",city:"Cairo"},
 {slug:"alexandria",name:"Alexandria",sub:"Citadel, Catacombs, Mediterranean",city:"Alexandria"},
 {slug:"luxor",name:"Luxor",sub:"Valley of Kings, Karnak, Luxor Temples",city:"Luxor"},
 {slug:"aswan",name:"Aswan & Abu Simbel",sub:"Philae, High Dam, Sun Temples",city:"Aswan"},
 {slug:"sharm",name:"Sharm El Sheikh",sub:"Ras Mohamed, Desert Safari, Quad",city:"Sharm El Sheikh"},
 {slug:"hurghada",name:"Hurghada",sub:"Giftun Island, Scuba, Desert Adventures",city:"Hurghada"},
 {slug:"marsa-alam",name:"Marsa Alam",sub:"Sataya Dolphin, Abu Dabbab, Marine Life",city:"Marsa Alam"}];
export const TRENDING=["Cairo","Hurghada","Sharm El Sheikh","Luxor","Aswan","Marsa Alam"];
export const EXPLORE=[
 {t:"Excursions & Day Tours",s:"Iconic landmarks with top-rated local guides",st:"",slug:"excursions"},
 {t:"Egypt Package Tours",s:"All-inclusive holiday packages",st:"Under Preparation",slug:"packages"},
 {t:"Nile Cruises & River Voyages",s:"4N/5D Luxor–Aswan, 3N/4D Aswan–Luxor, 7N/8D roundtrip",st:"",slug:"cruise"},
 {t:"Scuba Diving & Marine Adventures",s:"Guided dives & PADI packages",st:"Under Preparation",slug:"diving"},
 {t:"Transportation & Ticketing",s:"Seamless travel connections",st:"Currently Unavailable",slug:"ticketing"},
 {t:"Car Rentals & Ferry Crossings",s:"City rentals, Taba⇄Aqaba, Hurghada⇄Sharm ferries",st:"",slug:"cars"},
 {t:"Vacation Rentals & Apartments",s:"Apartments & villas in 7 cities",st:"",slug:"rentals"},
 {t:"Personal Concierge Services",s:"Laundry, groceries, fast food, dining, desserts, souvenirs",st:"",slug:"concierge"},
 {t:"Event Planning & Special Occasions",s:"Birthday, Valentine's & custom events",st:"",slug:"events"}];
export const SERVICES=["All","Sea & Diving","Desert Safari","Day Trips","Multi-Day","Transport","Rentals & Concierge"];
export type Tour={id:number;title:string;city:string;service:string;slug:string;rating:number;reviews:number;price:number};
const PRICES=[320, 95, 45, 55, 220, 40, 35, 80, 90, 185, 150, 65, 48, 60, 75, 210, 50, 120];
const T=(title:string,city:string,service:string,slug:string,i:number):Tour=>({id:i,title,city,service,slug,price:PRICES[i],rating:9.2,reviews:80+(i*37)%420});
export const TOURS:Tour[]=[
 T("Private Yacht Charters & Sea Trips","Sharm El Sheikh","Sea & Diving","yacht",0),
 T("Scuba Diving & Snorkeling Expeditions","Sharm El Sheikh","Sea & Diving","diving",1),
 T("Desert Safari: Quad, Buggy, Camel, Bedouin Dinner & Stargazing","Sharm El Sheikh","Desert Safari","desert",2),
 T("Mount Sinai Sunrise Hike & St. Catherine's Monastery","Sharm El Sheikh","Day Trips","sinai",3),
 T("Jordan Discovery: Petra, Wadi Rum & Dead Sea","Sharm El Sheikh","Multi-Day","petra",4),
 T("Parasailing Experiences","Hurghada","Sea & Diving","parasail",5),
 T("Desert Safari: Quad, Buggy & 4x4 Jeep Raids","Hurghada","Desert Safari","desert",6),
 T("Day Trip to Cairo (Pyramids & Museum)","Hurghada","Day Trips","pyramids",7),
 T("Day Trip to Luxor (Valley of the Kings & Temples)","Hurghada","Day Trips","luxor",8),
 T("Cairo & The White Desert Expedition","Hurghada","Multi-Day","whitedesert",9),
 T("Aswan & Abu Simbel Excursion","Hurghada","Multi-Day","abusimbel",10),
 T("Sataya Reef (Dolphin Reef)","Marsa Alam","Sea & Diving","dolphin",11),
 T("Marsa Mubarak & Abu Dabbab Bay","Marsa Alam","Sea & Diving","abudabbab",12),
 T("Wadi El Gemal National Park","Marsa Alam","Desert Safari","wadigemal",13),
 T("Sanctuaries of the Nile: Esna, Edfu & Kom Ombo","Marsa Alam","Day Trips","edfu",14),
 T("Magical Luxor & Hot Air Balloon Ride (2 Days)","Marsa Alam","Multi-Day","balloon",15),
 T("Private Car Rental & Taxi Services","Hurghada","Transport","car",16),
 T("Vacation Rentals: Apartments & Luxury Villas","Hurghada","Rentals & Concierge","villa",17)];
