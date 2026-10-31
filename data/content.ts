// All content comes from the client's 4 Word docs.
// Images: direct Unsplash photo links (free Unsplash License). Swap any ID in PHOTO to change a picture.
const PHOTO:Record<string,string>={"alex":"W3147mcuBWc","pyramids": "Nsi6jZ9tRZo", "cairo": "TPNpxqQCcRM", "luxor": "TMbybaaWZCk", "karnak": "v4tLl97tXBY", "aswan": "cOihXsrJFRc", "abusimbel": "cOihXsrJFRc", "hurghada": "4wB6TZFvMHQ", "sea": "3mraFOnRu3s", "island": "JQJ2MTtL_TU", "bus": "geGVinctLMg", "villa": "_2lbOEirZ3A", "columns": "HLiWEucOqg0", "desert": "TPNpxqQCcRM"};
const MAP:Record<string,string>={"white-desert":"desert","siwa":"desert","fayoum":"desert","offer": "pyramids", "cairo": "cairo", "alexandria": "sea", "luxor": "luxor", "aswan": "aswan", "sharm": "island", "hurghada": "hurghada", "marsa-alam": "sea", "excursions": "pyramids", "packages": "luxor", "cruise": "karnak", "diving": "sea", "ticketing": "bus", "cars": "bus", "rentals": "villa", "concierge": "hurghada", "events": "columns", "yacht": "sea", "sinai": "desert", "petra": "aswan", "parasail": "island", "pyramids": "pyramids", "whitedesert": "desert", "dolphin": "sea", "abudabbab": "island", "wadigemal": "desert", "edfu": "karnak", "balloon": "luxor", "car": "bus", "desert": "desert", "abusimbel": "abusimbel"};
export const img=(s:string)=>`https://unsplash.com/photos/${PHOTO[MAP[s]||"pyramids"]}/download?force=true&w=800`;
export const CITIES=["Cairo","Alexandria","Fayoum","Siwa","White Desert","Sinai","Luxor","Aswan","Sharm El-Sheikh"];
export const BROWSE:{slug:string;name:string;sub:string;city:string;n:number}[]=[
 {slug:"cairo",name:"Cairo & Giza",sub:"Pyramids, Museum, Khan El-Khalili",city:"Cairo",n:12},
 {slug:"alexandria",name:"Alexandria",sub:"Citadel, Catacombs, Mediterranean",city:"Alexandria",n:8},
 {slug:"luxor",name:"Luxor",sub:"Valley of Kings, Karnak, Luxor Temples",city:"Luxor",n:14},
 {slug:"aswan",name:"Aswan & Abu Simbel",sub:"Philae, High Dam, Sun Temples",city:"Aswan",n:10},
 {slug:"sharm",name:"Sharm El Sheikh",sub:"Cairo excursions, Ras Mohamed, Desert Safari",city:"Sharm El-Sheikh",n:15},
 {slug:"hurghada",name:"Hurghada",sub:"Giftun Island, Scuba, Desert Adventures",city:"Hurghada",n:18},
 {slug:"marsa-alam",name:"Marsa Alam",sub:"Sataya Dolphin, Abu Dabbab, Marine Life",city:"Marsa Alam",n:6}];
BROWSE.push({slug:"sinai",name:"Sinai & St. Catherine",sub:"Mount Moses, St. Catherine's Monastery, Dahab",city:"Sinai",n:0},{slug:"white-desert",name:"White Desert & Bahariya",sub:"Chalk formations, Black Desert, Oasis",city:"White Desert",n:0},{slug:"siwa",name:"Siwa Oasis",sub:"Salt lakes, Shali Fortress, Desert",city:"Siwa",n:4},{slug:"fayoum",name:"Fayoum",sub:"Wadi El Rayan, Tunis Village, Qarun",city:"Fayoum",n:5});
export const TRENDING=["Cairo","Alexandria","Luxor","Aswan","Siwa","Sinai"];
export const EXPLORE=[
 {t:"Excursions & Day Tours",s:"Iconic landmarks with top-rated local guides",st:"",slug:"excursions",href:"/tours"},
 {t:"Egypt Package Tours",s:"All-inclusive holiday packages",st:"",slug:"packages",href:"/packages"},
 {t:"Nile Cruises & River Voyages",s:"4N/5D Luxor–Aswan, 3N/4D Aswan–Luxor, 7N/8D roundtrip",st:"",slug:"cruise",href:"/nile-cruises"},
 {t:"Scuba Diving & Marine Adventures",s:"Guided dives & PADI packages",st:"",slug:"diving",href:"/diving"},
 {t:"Transportation & Ticketing",s:"Seamless travel connections",st:"",slug:"ticketing",href:"/transport"},
 {t:"Car Rentals & Ferry Crossings",s:"City rentals, Taba⇄Aqaba, Hurghada⇄Sharm ferries",st:"",slug:"cars",href:"/car-rentals"},
 {t:"Vacation Rentals & Apartments",s:"Apartments & villas in 7 cities",st:"",slug:"rentals",href:"/apartments"},
 {t:"Personal Concierge Services",s:"Laundry, groceries, fast food, dining, desserts, souvenirs",st:"",slug:"concierge",href:"/concierge"},
 {t:"Event Planning & Special Occasions",s:"Birthday, Valentine's & custom events",st:"",slug:"events",href:"/events"}];
