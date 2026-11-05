"use client";
import {useState} from "react";
import {POOL} from "@/data/mockTours";
import {wa} from "@/lib/wa";
import {Header,Footer} from "./Chrome";
import WhatsAppButton from "./WhatsAppButton";
export default function Detail({t}:{t:any}){
  const TABS=["Overview",...(t.noItinerary?[]:["Itinerary"]),"Included / Excluded","Map","Reviews",...(t.practical?["Practical Guide"]:[])];
  const [tab,setTab]=useState(TABS[0]); const [date,setDate]=useState(""); const [main,setMain]=useState(0);
  const gal:{src:string;alt:string}[]=t.gallery||[t.image,...[1,2,3].map(i=>POOL[(t.id+i*5)%POOL.length])].map((s:string)=>({src:s,alt:t.name}));
  const pics=gal.map(g=>g.src);
  const cruise=t.type==="Cruise";
  return <><Header/>
  <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-6 md:overflow-visible md:px-6">
    <h1 className="max-w-full break-words text-[28px] font-bold leading-tight md:text-4xl">{t.name}</h1>
    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">{t.rating&&<><span className="rounded bg-[#0A1931] px-1.5 py-0.5 font-bold text-white">{t.rating}</span>{t.reviews} reviews · </>}Departure: {t.departureCity||t.city} · {t.duration}</p>
    <ol className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{["Select tour","Check availability","WhatsApp inquiry","Confirm"].map((s,i)=><li key={s} className="flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-sm font-bold text-white">{i+1}</span><span className="min-w-0 break-words text-sm font-medium leading-tight">{s}</span></li>)}</ol>
    <div className="mt-4 grid w-full max-w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="min-w-0 max-w-full">{t.reminder&&<div className="mb-4 box-border w-full max-w-full rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm">⚠️ <b>Important reminder:</b> {t.reminder}</div>}{t.warning&&<div className="mb-4 box-border w-full max-w-full rounded-lg border-l-4 border-orange-500 bg-orange-50 p-3 text-sm">⚠️ {t.warning}</div>}
      <div className="aspect-[16/9] w-full max-w-full overflow-hidden rounded-2xl bg-gray-200"><img src={pics[main]} alt={gal[main]?.alt||t.name} className="block h-full w-full object-cover"/></div>
      <div className="noscroll mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">{pics.map((p,i)=><button key={i} type="button" onClick={()=>setMain(i)} aria-label={`Show photo ${i+1}`} className={`aspect-[4/3] w-[120px] shrink-0 snap-start overflow-hidden rounded-lg border-2 ${main===i?"border-[#FF6B00]":"border-transparent"}`}><img src={p} alt={gal[i]?.alt||t.name} loading="lazy" className="h-full w-full object-cover"/></button>)}</div>
      <div className="noscroll mt-6 flex gap-1 overflow-x-auto border-b">{TABS.map(x=><button key={x} onClick={()=>setTab(x)} className={`whitespace-nowrap px-4 py-2 font-semibold ${tab===x?"border-b-2 border-[#FF6B00] text-[#FF6B00]":"text-gray-600"}`}>{x}</button>)}</div>
      <div className="py-5 text-gray-800">
        {tab==="Overview"&&t.prominent&&<div className="mb-4 grid grid-cols-2 gap-3">{t.prominent.map(([a,b]:string[])=><div key={a} className="rounded-lg bg-orange-50 p-4 text-center"><p className="text-xs uppercase text-gray-600">{a}</p><p className="text-xl font-bold text-[#FF6B00]">{b}</p></div>)}</div>}
        {tab==="Overview"&&t.quick&&<div className="mb-4 grid grid-cols-1 gap-2 rounded-lg border bg-gray-50 p-3 text-sm sm:grid-cols-2">{t.quick.map(([a,b]:string[])=><div key={a}><b>{a}:</b> {b}</div>)}</div>}
        {tab==="Overview"&&t.meta&&<ul className="mb-4 space-y-1 rounded-lg bg-gray-50 p-3 text-sm">{t.meta.map(([a,b]:string[])=><li key={a}><b>{a}:</b> {b}</li>)}</ul>}
        {tab==="Overview"&&<p>{t.description||<>Join <b>{t.name}</b> with a friendly local team. Message us on WhatsApp for full details and pick-up times.</>}</p>}
        {tab==="Overview"&&t.scenery&&<div className="mt-4"><p className="mb-2 font-bold">Choose your scenery</p><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{t.scenery.map(([i,h,x]:string[])=><div key={h} className="rounded-lg border p-3"><div className="text-3xl">{i}</div><b>{h}</b><p className="text-sm text-gray-700">{x}</p></div>)}</div></div>}
        {tab==="Overview"&&t.checklist&&<div className="mt-4"><p className="mb-2 font-bold">Programme details</p><ul className="space-y-2">{t.checklist.map(([i,x]:string[])=><li key={x} className="flex gap-2"><span>{i}</span><span>{x}</span></li>)}</ul></div>}
        {tab==="Overview"&&t.pricing&&<div className="mt-4 overflow-x-auto"><p className="mb-1 font-bold">Pricing per person</p><table className="w-full min-w-[320px] text-left text-sm"><thead className="bg-gray-50"><tr>{t.pricing.head.map((h:string)=><th key={h} className="p-2">{h}</th>)}</tr></thead><tbody>{t.pricing.rows.map((r:string[])=><tr key={r[0]} className="border-t">{r.map((c,i)=><td key={i} className={`p-2 ${i===0?"font-semibold":""}`}>{c}</td>)}</tr>)}</tbody></table></div>}
        {tab==="Overview"&&t.guideTip&&<div className="mt-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-3 text-sm">💡 <b>Guide's tip:</b> {t.guideTip}</div>}
        {tab==="Overview"&&t.compare&&<div className="mt-4 overflow-x-auto"><p className="mb-1 font-bold">Quad vs Buggy</p><table className="w-full min-w-[420px] text-left text-sm"><thead className="bg-gray-50"><tr><th className="p-2"></th><th className="p-2">Quad ATV</th><th className="p-2">Buggy</th></tr></thead><tbody>{t.compare.map(([a,b,c]:string[])=><tr key={a} className="border-t align-top"><td className="p-2 font-semibold">{a}</td><td className="p-2">{b}</td><td className="p-2">{c}</td></tr>)}</tbody></table></div>}
        {tab==="Itinerary"&&t.itinerary&&<ol className="space-y-3">{t.itinerary.map(([a,b]:string[])=>b?<li key={a}><b>{a}:</b> {b}</li>:<li key={a} className="mt-3 text-lg font-bold text-[#FF6B00]">{a}</li>)}</ol>}
        {tab==="Itinerary"&&!t.itinerary&&<ol className="space-y-3"><li><b>Day 1:</b> Pick-up from your hotel, {cruise?"embark and welcome drink":"transfer to the first site with your guide"}.</li><li><b>Day 2:</b> {cruise?"Sightseeing stops along the Nile and onboard dinner.":"Main sightseeing, lunch break and return transfer."}</li></ol>}
        {tab==="Included / Excluded"&&t.included&&<ul className="space-y-1">{t.included.length?t.included.map((x:string)=><li key={x} className="text-green-700">✓ <span className="text-gray-800">{x}</span></li>):<li>Full inclusions are confirmed with your quote – message us on WhatsApp.</li>}</ul>}
        {tab==="Included / Excluded"&&t.excluded&&<ul className="mt-4 space-y-1"><li className="font-bold">Not included (optional)</li>{t.excluded.map((x:string)=><li key={x} className="text-red-600">✗ <span className="text-gray-800">{x}</span></li>)}</ul>}
        {tab==="Included / Excluded"&&t.services&&<div className="mt-4"><p className="font-bold">Private circuit services</p><div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">{t.services.map(([h,l]:any)=><div key={h} className="rounded-lg border p-3 text-sm"><b>{h}</b><ul className="mt-1 space-y-1">{l.map((x:string)=><li key={x}>• {x}</li>)}</ul></div>)}</div>{t.expertNote&&<p className="mt-3 text-sm italic text-gray-700">{t.expertNote}</p>}</div>}
        {tab==="Included / Excluded"&&t.optional&&<><p className="mt-4 font-bold">Optional add-ons</p><ul className="space-y-1">{t.optional.map((x:string)=><li key={x}>+ {x}</li>)}</ul></>}
        {tab==="Practical Guide"&&t.practical&&<div className="space-y-3">{t.practical.map(([a,b]:string[])=><div key={a} className="rounded-lg border p-3"><b>{a}</b><p>{b}</p></div>)}</div>}
        {tab==="Included / Excluded"&&!t.included&&<div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><ul className="space-y-1"><li className="font-bold">Included</li><li>✓ Hotel pick-up & drop-off</li><li>✓ Professional guide</li><li>✓ Lunch & bottled water</li></ul><ul className="space-y-1"><li className="font-bold">Excluded</li><li>✗ Gratuities</li><li>✗ Personal expenses</li><li>✗ Optional extras</li></ul></div>}
        {tab==="Map"&&<div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-gray-500">Map placeholder – {t.city}</div>}
        {tab==="Reviews"&&!t.rating&&<p className="text-gray-600">No reviews yet.</p>}
        {tab==="Reviews"&&t.rating&&<div className="space-y-4">{[["Sarah","Amazing experience, great guide!"],["Omar","Well organized and good value."],["Anna","Would book again."]].map(([n,c])=><div key={n} className="rounded-lg border p-3"><b>{n}</b> <span className="text-sm text-gray-500">· {t.rating}</span><p>{c}</p></div>)}</div>}
      </div></div>
      <aside className="lg:sticky lg:top-4 lg:self-start"><div className="rounded-lg border p-5 shadow-sm">
        {t.onRequest||t.priceLabel?<p className="text-xl font-bold">{t.priceLabel||"Price on request"}</p>:<><p className="text-sm text-gray-500">from</p><p>{t.originalPrice&&<s className="mr-2 text-gray-400">${t.originalPrice}</s>}<b className="text-3xl">${t.price}</b> <span className="text-sm text-gray-500">per person</span></p></>}
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-4 h-12 w-full rounded-md border px-3"/>
        <WhatsAppButton message={`Hi, I need help with ${t.name} on ${date||"[date to be confirmed]"}. From WeCheaperTours site.`} label="Check Availability" className="btn-primary mt-3 block w-full"/>
        <WhatsAppButton message={`Hi, I need help with ${t.name}. From WeCheaperTours site.`} label="Book via WhatsApp" className="mt-2 block w-full rounded-full bg-green-600 px-5 py-2.5 text-center font-medium text-white hover:bg-green-700"/></div></aside>
    </div></main><Footer/></>;
}
