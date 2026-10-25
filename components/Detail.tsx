"use client";
import {useState} from "react";
import {POOL} from "@/data/mockTours";
import {wa} from "@/lib/wa";
import {Header,Footer} from "./Chrome";
const TABS=["Overview","Itinerary","Included / Excluded","Map","Reviews"];
export default function Detail({t}:{t:any}){
  const [tab,setTab]=useState(TABS[0]); const [date,setDate]=useState(""); const [main,setMain]=useState(0);
  const pics=[t.image,...[1,2,3].map(i=>POOL[(t.id+i*5)%POOL.length])];
  const cruise=t.type==="Cruise";
  return <><Header/>
  <main className="mx-auto max-w-6xl px-4 py-6">
    <h1 className="text-2xl font-bold md:text-3xl">{t.name}</h1>
    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">{t.rating&&<><span className="rounded bg-[#0A1931] px-1.5 py-0.5 font-bold text-white">{t.rating}</span>{t.reviews} reviews · </>}{t.city} · {t.duration}</p>
    <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_340px]"><div>
      <img src={pics[main]} alt="" className="h-64 w-full rounded-lg bg-gray-200 object-cover md:h-96"/>
      <div className="mt-2 grid grid-cols-4 gap-2">{pics.map((p,i)=><button key={i} onClick={()=>setMain(i)} className={`overflow-hidden rounded-md border-2 ${main===i?"border-[#FF6B00]":"border-transparent"}`}><img src={p} alt="" className="h-16 w-full bg-gray-200 object-cover md:h-20"/></button>)}</div>
      <div className="noscroll mt-6 flex gap-1 overflow-x-auto border-b">{TABS.map(x=><button key={x} onClick={()=>setTab(x)} className={`whitespace-nowrap px-4 py-2 font-semibold ${tab===x?"border-b-2 border-[#FF6B00] text-[#FF6B00]":"text-gray-600"}`}>{x}</button>)}</div>
      <div className="py-5 text-gray-800">
        {tab==="Overview"&&<p>{t.description||<>Join <b>{t.name}</b> with a friendly local team. Message us on WhatsApp for full details and pick-up times.</>}</p>}
        {tab==="Itinerary"&&t.itinerary&&<ol className="space-y-3">{t.itinerary.map(([a,b]:string[])=><li key={a}><b>{a}:</b> {b}</li>)}</ol>}
        {tab==="Itinerary"&&!t.itinerary&&<ol className="space-y-3"><li><b>Day 1:</b> Pick-up from your hotel, {cruise?"embark and welcome drink":"transfer to the first site with your guide"}.</li><li><b>Day 2:</b> {cruise?"Sightseeing stops along the Nile and onboard dinner.":"Main sightseeing, lunch break and return transfer."}</li></ol>}
        {tab==="Included / Excluded"&&t.included&&<ul className="space-y-1">{t.included.length?t.included.map((x:string)=><li key={x}>✓ {x}</li>):<li>Full inclusions are confirmed with your quote – message us on WhatsApp.</li>}</ul>}
        {tab==="Included / Excluded"&&!t.included&&<div className="grid gap-4 sm:grid-cols-2"><ul className="space-y-1"><li className="font-bold">Included</li><li>✓ Hotel pick-up & drop-off</li><li>✓ Professional guide</li><li>✓ Lunch & bottled water</li></ul><ul className="space-y-1"><li className="font-bold">Excluded</li><li>✗ Gratuities</li><li>✗ Personal expenses</li><li>✗ Optional extras</li></ul></div>}
        {tab==="Map"&&<div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-gray-500">Map placeholder – {t.city}</div>}
        {tab==="Reviews"&&!t.rating&&<p className="text-gray-600">No reviews yet.</p>}
        {tab==="Reviews"&&t.rating&&<div className="space-y-4">{[["Sarah","Amazing experience, great guide!"],["Omar","Well organized and good value."],["Anna","Would book again."]].map(([n,c])=><div key={n} className="rounded-lg border p-3"><b>{n}</b> <span className="text-sm text-gray-500">· {t.rating}</span><p>{c}</p></div>)}</div>}
      </div></div>
      <aside className="lg:sticky lg:top-4 lg:self-start"><div className="rounded-lg border p-5 shadow-sm">
        {t.onRequest?<p className="text-2xl font-bold">Price on request</p>:<><p className="text-sm text-gray-500">from</p><p>{t.originalPrice&&<s className="mr-2 text-gray-400">${t.originalPrice}</s>}<b className="text-3xl">${t.price}</b> <span className="text-sm text-gray-500">per person</span></p></>}
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-4 h-12 w-full rounded-md border px-3"/>
        <a href={wa(`Hi I want to book ${t.name} for ${date||"[date to be confirmed]"}`)} target="_blank" rel="noreferrer" className="mt-3 block rounded bg-[#FF6B00] py-3 text-center font-bold text-white hover:bg-orange-600">Check Availability</a>
        <a href={wa(`Hi, I'm interested in ${t.name}. Can you share details?`)} target="_blank" rel="noreferrer" className="mt-2 block rounded bg-green-600 py-3 text-center font-bold text-white hover:bg-green-700">Book via WhatsApp</a></div></aside>
    </div></main><Footer/></>;
}
