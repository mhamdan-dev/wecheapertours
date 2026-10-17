"use client";
import {useMemo,useState} from "react";
import {BROWSE,CITIES,EXPLORE,SERVICES,TOURS,TRENDING,img} from "@/data/content";

function Img({s,className=""}:{s:string;className?:string}){
  const [bad,setBad]=useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return bad?<div className={`bg-gray-200 ${className}`}/>:<img src={img(s)} alt="" loading="lazy" onError={()=>setBad(true)} className={`object-cover ${className}`}/>;
}
const ic="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500";
const Pin=()=><svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
const Cal=()=><svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
const Usr=()=><svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>;
const fld="h-14 w-full rounded-lg border border-gray-300 bg-white md:rounded-md md:border-0 pl-10 pr-3 font-medium text-gray-900 placeholder:text-gray-500";
function DateField({ph}:{ph:string}){
  const [v,setV]=useState("");const [d,setD]=useState(false);
  return <div className="relative"><Cal/><input type={d||v?"date":"text"} placeholder={ph} aria-label={ph} value={v} onChange={e=>setV(e.target.value)}
    onFocus={e=>{setD(true);const el=e.target as HTMLInputElement;setTimeout(()=>{try{el.showPicker?.()}catch{}},50)}} onBlur={()=>{if(!v)setD(false)}} className={fld}/></div>;
}
const slug=(c:string)=>({"Cairo":"cairo","Hurghada":"hurghada","Sharm El Sheikh":"sharm","Marsa Alam":"marsa-alam","Luxor":"luxor","Aswan":"aswan","Alexandria":"alexandria"} as Record<string,string>)[c]||"cairo";
const count=(city:string)=>TOURS.filter(t=>t.city===city).length;

export default function Home(){
  const [city,setCity]=useState("All");
  const [svc,setSvc]=useState("All");
  const [dest,setDest]=useState("");
  const list=useMemo(()=>TOURS.filter(t=>(city==="All"||t.city===city)&&(svc==="All"||t.service===svc)),[city,svc]);
  const go=()=>{setCity(dest||"All");document.getElementById("tours")?.scrollIntoView({behavior:"smooth"})};
  const pill=(on:boolean)=>`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${on?"border-orange-500 bg-orange-50 font-semibold text-orange-600":"border-gray-300"}`;
  return(<main>
    <>
    <div className="bg-[#f5f5f5] text-xs text-gray-700"><div className="mx-auto flex max-w-6xl justify-between px-4 py-1.5"><span>Discover Jordan &amp; Egypt</span><span>www.wecheapertours.com</span></div></div>
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex shrink-0 items-center gap-2"><img src="/logo-emblem.png" alt="WeCheaperTours.com" className="h-8 w-8 shrink-0 md:h-11 md:w-11"/><span className="whitespace-nowrap text-lg font-bold"><span className="text-[#FF8C00]">WeCheaper</span> <span className="text-[#1a1a1a]">Tours</span></span></div>
        <nav className="noscroll -mx-1 flex w-full gap-1 overflow-x-auto text-sm text-[#1a1a1a] md:mx-0 md:w-auto">{["Tours","Nile Cruises","Diving","Rentals","Support"].map((m,i)=><a key={m} href="#tours" className={`whitespace-nowrap rounded-full px-3 py-2 ${i==0?"bg-orange-50 font-semibold text-orange-600":"hover:bg-gray-100"}`}>{m}</a>)}</nav>
      </div>
    </header>
    <div className="bg-bk text-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:pb-28">
        <h1 className="text-3xl font-bold md:text-5xl">Find your next <span className="text-yellow-400">Egypt adventure</span></h1>
        <p className="mt-2 text-lg md:text-xl">Search low prices on tours, cruises, diving &amp; more...</p>
      </div>
    </div>
    </>
    <section className="mx-auto -mt-9 max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-2 rounded-xl border-2 border-yellow-400 bg-white p-3 shadow-2xl md:grid-cols-[2fr_1fr_1fr_1.3fr_auto] md:gap-1 md:border-4 md:bg-yellow-400 md:p-0">
        <div className="relative col-span-2 md:col-span-1"><Pin/><select value={dest} onChange={e=>setDest(e.target.value)} className={`${fld} ${dest?"":"text-gray-500"}`}><option value="">Where are you going?</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
        <DateField ph="Check-in date"/>
        <DateField ph="Check-out date"/>
        <div className="relative col-span-2 md:col-span-1"><Usr/><select className={fld}><option>2 adults · 0 children · 1 tour</option><option>1 adult · 0 children · 1 tour</option><option>4 adults · 2 children · 1 tour</option></select></div>
        <button onClick={go} className="col-span-2 h-14 rounded-md bg-[#FF8C00] px-8 text-lg font-bold text-white hover:bg-orange-600 md:col-span-1">Search</button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-orange-500"/> I&apos;m traveling for work</label>

      <h2 className="mt-8 text-2xl font-bold">Offers</h2><p className="text-gray-600">Promotions, deals and special offers for you</p>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border p-4 md:max-w-xl">
        <div><p className="text-xs text-gray-500">Early booking</p><h3 className="font-bold">15% off early booking Egypt tours</h3><p className="text-sm">Book ahead and save on tours across Egypt.</p>
          <a href="#tours" className="mt-3 inline-block rounded bg-[#FF8C00] px-3 py-2 text-sm font-bold text-white hover:bg-orange-600">Search deals</a></div>
        <Img s="offer" className="h-24 w-24 shrink-0 rounded-lg"/></div>

      <h2 className="mt-10 text-2xl font-bold">Browse by city</h2>
      <div className="noscroll mt-3 flex gap-4 overflow-x-auto">{BROWSE.map(b=>
        <button key={b.slug} onClick={()=>{setCity(b.city);document.getElementById("tours")?.scrollIntoView({behavior:"smooth"})}} className="w-60 shrink-0 text-left">
          <Img s={b.slug} className="h-40 w-full rounded-lg"/><h3 className="mt-2 font-bold">{b.name}</h3><p className="text-sm text-gray-600">{b.sub}</p><p className="text-sm">{count(b.city)} tours</p></button>)}</div>

      <h2 className="mt-10 text-2xl font-bold">Trending destinations</h2><p className="text-gray-600">Most popular choices for travelers from Egypt</p>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-6">{TRENDING.map((c,i)=>
        <button key={c} onClick={()=>{setCity(c);document.getElementById("tours")?.scrollIntoView({behavior:"smooth"})}} className={`relative h-44 overflow-hidden rounded-lg text-left ${i<2?"md:col-span-3":"md:col-span-2"}`}>
          <Img s={slug(c)} className="absolute inset-0 h-full w-full"/><div className="absolute inset-0 bg-black/20"/>
          <span className="absolute left-3 top-3 text-xl font-bold text-white">{c} 🇪🇬</span></button>)}</div>

      <h2 className="mt-10 text-2xl font-bold">Explore Egypt</h2><p className="text-gray-600">Services and experiences WeCheaperTours offers</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{EXPLORE.map(e=>
        <div key={e.slug} className="overflow-hidden rounded-lg border">
          <div className="relative"><Img s={e.slug} className="h-36 w-full"/>{e.st&&<span className={`absolute left-2 top-2 rounded px-2 py-1 text-xs font-semibold text-white ${e.st.startsWith("Under")?"bg-orange-600":"bg-red-700"}`}>{e.st}</span>}</div>
          <div className="p-3"><h3 className="font-bold">{e.t}</h3><p className="text-sm text-gray-600">{e.s}</p></div></div>)}</div>

      <h2 id="tours" className="mt-10 scroll-mt-4 text-2xl font-bold">Popular tours</h2><p className="text-gray-600">Pick a city and a service to filter</p>
      <div className="noscroll mt-3 flex gap-2 overflow-x-auto">{["All",...CITIES].map(c=><button key={c} onClick={()=>setCity(c)} className={pill(city===c)}>{c}</button>)}</div>
      <div className="noscroll mt-2 flex gap-2 overflow-x-auto">{SERVICES.map(s=><button key={s} onClick={()=>setSvc(s)} className={pill(svc===s)}>{s}</button>)}</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.slice(0,12).map(t=>
        <article key={t.id} className="overflow-hidden rounded-lg border bg-white">
          <Img s={t.slug} className="h-40 w-full"/>
          <div className="p-3"><h3 className="line-clamp-2 h-12 font-bold text-orange-500">{t.title}</h3><p className="text-sm text-gray-600">{t.city}</p>
            <p className="mt-2 flex items-center gap-2 text-sm"><span className="rounded bg-bk px-1.5 py-0.5 font-bold text-white">{t.rating}</span>Superb · {t.reviews} reviews</p>
            <p className="mt-2 text-right text-sm text-gray-500">from <b className="text-lg text-black">${t.price}</b></p>
            <button className="mt-2 w-full rounded bg-[#FF8C00] py-2 text-sm font-bold text-white hover:bg-orange-600">Check availability</button></div></article>)}
        {!list.length&&<p className="col-span-full py-8 text-center text-gray-500">No tours match these filters yet.</p>}</div>
    </section>
    <footer className="mt-16 bg-bk py-10 text-sm text-white">
      <div className="mx-auto mb-6 max-w-6xl px-4"><div className="flex items-center gap-2"><img src="/logo-emblem.png" alt="" className="h-12 w-12"/><span className="text-lg font-bold"><span className="text-[#FF8C00]">WeCheaper</span> Tours</span></div></div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[["Support",["Manage your trips","Contact Customer Service","Safety resource centre"]],["Discover",["Tours","Nile Cruises","Car rentals","Vacation rentals"]],["Terms and settings",["Privacy & cookies","Terms of Service","Accessibility"]],["About",["About WeCheaperTours","How we work","Careers","Contact"]]].map(([h,l])=>
        <div key={h as string}><h4 className="mb-2 font-bold">{h as string}</h4>{(l as string[]).map(x=><p key={x} className="py-0.5 text-gray-200">{x}</p>)}</div>)}</div>
      <p className="mt-8 text-center text-gray-300">© WeCheaperTours.com – Discover Jordan &amp; Egypt</p></footer>
  </main>);
}
