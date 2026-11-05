const PinIcon=()=><svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
const ClockIcon=()=><svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
const StarIcon=()=><svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>;
const LOC:Record<string,string>={"Cairo":"Cairo & Giza","Sharm El-Sheikh":"Sharm El Sheikh"};
// Homepage card (reference style). Never shows invented prices or reviews.
export default function HomeTourCard({t,onEnquire}:{t:any;onEnquire:(t:any)=>void}){
  const real=!t.onRequest&&Number(t.price)>0; const cur=t.currency||"$";
  const pricePill=real?`From ${cur}${t.price}${cur==="$"?" USD":""}`:"Enquire for Price";
  const reviews=t.rating?`${t.rating} (${t.reviews})`:"No reviews yet";
  return <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md">
    <a href={`/tours/${t.id}`} className="tour-card-image relative block w-full shrink-0 overflow-hidden bg-gray-200">
      <img src={t.image} alt={t.imageAlt||t.name} loading="lazy" className="h-full w-full object-cover"/>
      <span className="absolute left-3 top-3 inline-flex max-w-[75%] items-center gap-1 rounded-full bg-black/85 px-3 py-1 text-xs font-medium text-white"><PinIcon/><span className="truncate">{LOC[t.city]||t.city}</span></span>
      <span className="absolute bottom-3 right-3 rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-semibold text-white shadow">{pricePill}</span>
    </a>
    <div className="flex flex-1 flex-col p-4">
      <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500"><ClockIcon/><span className="truncate">{t.duration}</span><span aria-hidden>•</span><StarIcon/><span className="shrink-0">{reviews}</span></p>
      <h3 className="mt-2 line-clamp-2 min-h-[2.9rem] break-words text-lg font-bold leading-snug"><a href={`/tours/${t.id}`}>{t.name}</a></h3>
      <p className="mt-2 line-clamp-2 min-h-[2.6rem] text-sm text-gray-600">{t.description||""}</p>
      <div className="mt-auto flex gap-2 pt-4">
        <a href={`/tours/${t.id}`} className="btn-secondary flex-1 !px-3 text-sm">View Itinerary</a>
        <button type="button" onClick={()=>{console.log("Enquire clicked",t.name);onEnquire(t);}} className="btn-primary flex-1 !px-3 text-sm">Enquire Now</button>
      </div>
    </div></article>;
}
