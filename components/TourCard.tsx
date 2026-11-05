import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
const pill="max-w-full truncate rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow";
export default function TourCard({t}:{t:any}){
  const cruise=t.type==="Cruise"; const dep=t.departureCity||t.city;
  return <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-xl">
    <Link href={`/tours/${t.id}`} className="tour-card-image relative block w-full shrink-0 overflow-hidden bg-gray-200">
      <img src={t.image} alt={t.imageAlt||t.name} loading="lazy" className="h-full w-full object-cover"/>
      <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2"><span className={pill}>Departs {dep}</span>{t.duration&&<span className={pill}>{t.duration}</span>}{t.badge&&<span className="rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-bold text-white shadow">{t.badge}</span>}</div>
    </Link>
    <div className="flex flex-1 flex-col p-4">
      <h3 className="line-clamp-2 min-h-[3.25rem] break-words text-lg font-bold leading-snug md:text-xl"><Link href={`/tours/${t.id}`}>{t.name}</Link></h3>
      <p className="mt-1 text-sm text-gray-600">{cruise?`${t.dep} · ${t.nights} Nights · ${t.cls}`:`${dep!==t.city?`${dep} → ${t.city} · `:""}${t.type}`}</p>
      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-gray-700">{t.description||""}</p>
      <p className="mt-1 min-h-[1.5rem] text-sm">{t.rating&&<span className="inline-flex items-center gap-2"><span className="rounded bg-[#0A1931] px-1.5 py-0.5 font-bold text-white">{t.rating}</span>{t.reviews} reviews</span>}</p>
      <div className="mt-auto pt-3">
        {t.onRequest?<p className="text-lg font-bold text-gray-700">Price on request</p>:<p className="text-lg font-bold text-black"><span className="mr-1 text-sm font-normal text-gray-500">from</span>{t.originalPrice&&<s className="mr-1 text-sm font-normal text-gray-400">{t.currency||"$"}{t.originalPrice}</s>}{t.currency||"$"}{t.price}</p>}
        <div className="mt-3 flex gap-2">{t.onRequest&&<WhatsAppButton message={`Hi, I need help with ${t.name}. From WeCheaperTours site.`} label="Ask on WhatsApp" className="flex-1 rounded-full bg-green-600 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700"/>}<Link href={`/tours/${t.id}`} className="btn-primary flex-1 !px-3 text-sm">View Deal</Link></div>
      </div>
    </div></article>;
}
