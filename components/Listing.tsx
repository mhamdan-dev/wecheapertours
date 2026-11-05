"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {TOURS,CRUISES} from "@/data/mockTours";
import {CITIES} from "@/data/content";
import {Header,Footer} from "./Chrome";
import TourCard from "./TourCard";

const DUR=["All","Under 4 hours","Half-day (4–6 hours)","Full day (7–24 hours)","2 days","3+ days"];
const durOk=(h:number,d:string)=>d==="All"||(d===DUR[1]&&h<4)||(d===DUR[2]&&h>=4&&h<=6)||(d===DUR[3]&&h>6&&h<=24)||(d===DUR[4]&&h>24&&h<=48)||(d===DUR[5]&&h>48);
const ALLCATS=["Nautical - Sharm","Nautical - Hurghada","Cultural Tours","Desert Safari","Deep Safari & Trekking","Mount Moses and St. Catherine's Monastery","Quad ATV Tours","Horse Riding","Wellness & Spa","City Tours","Jordan Excursions","Luxor Excursions"];
function Chips({o,v,s,lab}:{o:string[];v:string;s:(x:string)=>void;lab?:(x:string)=>string}){
  return <div className="flex flex-wrap gap-2">{o.map(x=><button key={x} onClick={()=>s(x)} className={`rounded-full border px-3 py-1 text-sm ${v===x?"border-[#FF6B00] bg-orange-50 font-semibold text-[#FF6B00]":"border-gray-300"}`}>{lab?lab(x):x}</button>)}</div>;
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
    let r=base.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())&&(city==="All"||t.departureCity===city)&&t.price<=max&&t.rating>=rate
      &&(cruise?(dur==="All"||`${t.nights} Nights`===dur)&&(cls==="All"||t.cls===cls):(type==="All"||t.type===type||(t.cats||[]).includes(type))&&durOk(t.hours,dur)));
    const s:Record<string,(a:any,b:any)=>number>={rec:(a,b)=>b.reviews-a.reviews,pl:(a,b)=>a.price-b.price,ph:(a,b)=>b.price-a.price,rt:(a,b)=>(b.rating||0)-(a.rating||0)};
    return [...r].sort(s[sort]);
  },[base,q,city,type,dur,cls,max,rate,sort,cruise]);
  // Category chips only list categories that exist for the selected departure city (e.g. no "Nautical - Hurghada" while "Sharm" is selected)
  const inCity=(t:any)=>city==="All"||t.departureCity===city;
  const catsAvail=new Set<string>(base.filter(inCity).flatMap((t:any)=>[t.type,...(t.cats||[])]));
  const catCount=(c:string)=>base.filter((t:any)=>inCity(t)&&(t.type===c||(t.cats||[]).includes(c))).length;
  const reset=()=>{setLim(20);setQ("");setCity("All");setType(preType||"All");setDur("All");setCls("All");setMax(800);setRate(0)};
  const [lim,setLim]=useState(20);
  const shown=list.length?list.slice(0,lim):base.slice(0,4);
  const cities=["All",...Array.from(new Set(base.map((t:any)=>t.departureCity)))] as string[];
  return <>
    <Header/>
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-[28px] font-bold leading-tight md:text-4xl">{title}</h1>
      <div className="mt-3 flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${cruise?"cruises":"tours"} by name...`} className="h-12 w-full rounded-md border-2 border-yellow-400 px-4"/>
        <button onClick={()=>setOpen(!open)} className="h-12 rounded-md border px-4 font-semibold md:hidden">Filters</button></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className={`${open?"block":"hidden"} md:block`}>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Filter by</h2><button onClick={reset} className="text-sm text-[#FF6B00]">Reset</button></div>
            {cruise&&<G t={`Price: up to $${max}`}><input type="range" min={0} max={800} step={10} value={max} onChange={e=>setMax(+e.target.value)} className="w-full accent-[#FF6B00]"/></G>}
            <G t="Departing from"><Chips o={cities} v={city} s={x=>{setCity(x);setType(preType||"All")}} lab={x=>x==="All"?"All":`${x} (${base.filter((t:any)=>t.departureCity===x).length})`}/></G>
            <G t="Duration"><Chips o={cruise?["All","3 Nights","4 Nights","7 Nights"]:DUR} v={dur} s={setDur}/></G>
            {cruise?<G t="Type"><Chips o={["All","Standard","Luxury","Ultra Luxury"]} v={cls} s={setCls}/></G>
              :<G t="Category"><Chips o={["All",...ALLCATS.filter(c=>catsAvail.has(c))]} v={type} s={setType} lab={x=>x==="All"?"All":`${x} (${catCount(x)})`}/></G>}
            {cruise&&<G t="Rating"><Chips o={["Any","8+","9+"]} v={rate===0?"Any":`${rate}+`} s={x=>setRate(x==="Any"?0:parseInt(x))}/></G>}
          </div></aside>
        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between"><p className="text-sm text-gray-600">{list.length} {cruise?"cruises":"tours"} found</p>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="h-10 rounded-md border px-2 text-sm"><option value="rec">Recommended</option>{cruise&&<><option value="pl">Price: low to high</option><option value="ph">Price: high to low</option><option value="rt">Top rated</option></>}</select></div>
          {!list.length&&<div className="mb-4 rounded-lg border bg-gray-50 p-4 text-sm">No {cruise?"cruises":"tours"} match these filters yet. <button onClick={reset} className="font-semibold text-[#FF6B00]">Clear filters</button> – showing popular ones:</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{shown.map(t=><TourCard key={t.id} t={t}/>)}</div>
          {list.length>lim&&<button onClick={()=>setLim(lim+20)} className="mt-4 w-full rounded-lg border-2 border-[#FF6B00] py-3 font-bold text-[#FF6B00] hover:bg-orange-50">Show more ({list.length-lim} remaining)</button>}
        </section></div></main><Footer/></>;
}
