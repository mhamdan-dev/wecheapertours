"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {TOURS,CRUISES} from "@/data/mockTours";
import {CITIES} from "@/data/content";
import {Header,Footer} from "./Chrome";

const DUR=["All","Day trip (1 day)","2 days","3+ days"];
const durOk=(h:number,d:string)=>d==="All"||(d===DUR[1]&&h<=24)||(d===DUR[2]&&h>24&&h<=48)||(d===DUR[3]&&h>48);
function Chips({o,v,s}:{o:string[];v:string;s:(x:string)=>void}){
  return <div className="flex flex-wrap gap-2">{o.map(x=><button key={x} onClick={()=>s(x)} className={`rounded-full border px-3 py-1 text-sm ${v===x?"border-[#FF6B00] bg-orange-50 font-semibold text-[#FF6B00]":"border-gray-300"}`}>{x}</button>)}</div>;
}
const G=({t,children}:{t:string;children:React.ReactNode})=><div className="border-b py-4"><h3 className="mb-2 font-bold">{t}</h3>{children}</div>;

export default function Listing({mode,title,preType}:{mode:"tour"|"cruise";title:string;preType?:string}){
  const sp=useSearchParams(); const cruise=mode==="cruise";
  const base:any[]=cruise?CRUISES:TOURS;
  const [q,setQ]=useState(""); const [city,setCity]=useState(sp.get("city")||"All");
  const [type,setType]=useState(preType||sp.get("type")||"All"); const [dur,setDur]=useState("All");
  const [cls,setCls]=useState("All"); const [max,setMax]=useState(800); const [rate,setRate]=useState(0);
  const [sort,setSort]=useState("rec"); const [open,setOpen]=useState(false);
  const list=useMemo(()=>{
    let r=base.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())&&(city==="All"||t.city===city)&&t.price<=max&&t.rating>=rate
      &&(cruise?(dur==="All"||`${t.nights} Nights`===dur)&&(cls==="All"||t.cls===cls):(type==="All"||t.type===type)&&durOk(t.hours,dur)));
    const s:Record<string,(a:any,b:any)=>number>={rec:(a,b)=>b.reviews-a.reviews,pl:(a,b)=>a.price-b.price,ph:(a,b)=>b.price-a.price,rt:(a,b)=>(b.rating||0)-(a.rating||0)};
    return [...r].sort(s[sort]);
  },[base,q,city,type,dur,cls,max,rate,sort,cruise]);
  const reset=()=>{setQ("");setCity("All");setType(preType||"All");setDur("All");setCls("All");setMax(800);setRate(0)};
  const shown=list.length?list:base.slice(0,4);
  const cities=cruise?["All","Luxor","Aswan","Cairo"]:["All",...CITIES];
  return <>
    <Header/>
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <div className="mt-3 flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${cruise?"cruises":"tours"} by name...`} className="h-12 w-full rounded-md border-2 border-yellow-400 px-4"/>
        <button onClick={()=>setOpen(!open)} className="h-12 rounded-md border px-4 font-semibold md:hidden">Filters</button></div>
      <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className={`${open?"block":"hidden"} md:block`}>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Filter by</h2><button onClick={reset} className="text-sm text-[#FF6B00]">Reset</button></div>
            {cruise&&<G t={`Price: up to $${max}`}><input type="range" min={0} max={800} step={10} value={max} onChange={e=>setMax(+e.target.value)} className="w-full accent-[#FF6B00]"/></G>}
            <G t={cruise?"Departure city":"City"}><Chips o={cities} v={city} s={setCity}/></G>
            <G t="Duration"><Chips o={cruise?["All","3 Nights","4 Nights","7 Nights"]:DUR} v={dur} s={setDur}/></G>
            {cruise?<G t="Type"><Chips o={["All","Standard","Luxury","Ultra Luxury"]} v={cls} s={setCls}/></G>
              :<G t="Category"><Chips o={["All","Sea Trips","Cultural Tours","Desert Excursions"]} v={type} s={setType}/></G>}
            {cruise&&<G t="Rating"><Chips o={["Any","8+","9+"]} v={rate===0?"Any":`${rate}+`} s={x=>setRate(x==="Any"?0:parseInt(x))}/></G>}
          </div></aside>
        <section>
          <div className="mb-3 flex items-center justify-between"><p className="text-sm text-gray-600">{list.length} {cruise?"cruises":"tours"} found</p>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="h-10 rounded-md border px-2 text-sm"><option value="rec">Recommended</option>{cruise&&<><option value="pl">Price: low to high</option><option value="ph">Price: high to low</option><option value="rt">Top rated</option></>}</select></div>
          {!list.length&&<div className="mb-4 rounded-lg border bg-gray-50 p-4 text-sm">No {cruise?"cruises":"tours"} match these filters yet. <button onClick={reset} className="font-semibold text-[#FF6B00]">Clear filters</button> – showing popular ones:</div>}
          <div className="space-y-4">{shown.map(t=>
            <article key={t.id} className="flex flex-col overflow-hidden rounded-lg border bg-white sm:flex-row">
              <div className="relative shrink-0 sm:w-64"><img src={t.image} alt={t.name} loading="lazy" className="h-48 w-full bg-gray-200 object-cover sm:h-full"/>
                {t.badge&&<span className="absolute left-2 top-2 rounded bg-[#FF6B00] px-2 py-1 text-xs font-bold text-white">{t.badge}</span>}</div>
              <div className="flex flex-1 flex-col p-4"><h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-sm text-gray-600">{cruise?`${t.dep} · ${t.nights} Nights · ${t.cls}`:`${t.city} · ${t.duration} · ${t.type}`}</p>
                {t.description&&<p className="mt-2 line-clamp-3 text-sm text-gray-700">{t.description}</p>}{t.rating&&<p className="mt-2 flex items-center gap-2 text-sm"><span className="rounded bg-[#0A1931] px-1.5 py-0.5 font-bold text-white">{t.rating}</span>{t.reviews} reviews</p>}
                <div className="mt-auto flex items-end justify-between pt-4">{t.onRequest?<p className="font-bold text-gray-700">Price on request</p>:<p className="text-sm text-gray-500">from {t.originalPrice&&<s className="mr-1">${t.originalPrice}</s>}<b className="text-2xl text-black">${t.price}</b></p>}
                  <Link href={`/tours/${t.id}`} className="rounded bg-[#FF6B00] px-5 py-2 font-bold text-white hover:bg-orange-600">View Deal</Link></div></div></article>)}</div>
        </section></div></main><Footer/></>;
}
