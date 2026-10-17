"use client";
import {useMemo,useState} from "react";
import {BROWSE,CITIES,EXPLORE,SERVICES,TOURS,TRENDING,img} from "@/data/content";

function Img({s,className=""}:{s:string;className?:string}){
  const [bad,setBad]=useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return bad?<div className={`bg-gray-200 ${className}`}/>:<img src={img(s)} alt="" loading="lazy" onError={()=>setBad(true)} className={`object-cover ${className}`}/>;
}
const slug=(c:string)=>({"Cairo":"cairo","Hurghada":"hurghada","Sharm El Sheikh":"sharm","Marsa Alam":"marsa-alam","Luxor":"luxor","Aswan":"aswan","Alexandria":"alexandria"} as Record<string,string>)[c]||"cairo";
const count=(city:string)=>TOURS.filter(t=>t.city===city).length;

export default function Home(){
  const [city,setCity]=useState("All");
  const [svc,setSvc]=useState("All");
  const [dest,setDest]=useState("");
  const list=useMemo(()=>TOURS.filter(t=>(city==="All"||t.city===city)&&(svc==="All"||t.service===svc)),[city,svc]);
  const go=()=>{setCity(dest||"All");document.getElementById("tours")?.scrollIntoView({behavior:"smooth"})};
  const pill=(on:boolean)=>`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${on?"border-bkb bg-blue-50 text-bkb":"border-gray-300"}`;
  return(<main>
    <header className="bg-bk text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"><img src="/logo-emblem.png" alt="WeCheaperTours.com" className="h-11 w-11"/><span className="hidden font-bold sm:block">WeCheaperTours.com</span></div>
        <nav className="noscroll flex gap-1 overflow-x-auto text-sm">{["Tours","Nile Cruises","Diving","Rentals","Support"].map((m,i)=><a key={m} href="#tours" className={`whitespace-nowrap rounded-full border px-3 py-2 ${i==0?"border-white bg-white/10":"border-transparent hover:bg-white/10"}`}>{m}</a>)}</nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:pb-28">
        <h1 className="text-3xl font-bold md:text-5xl">Find your next Egypt adventure</h1>
        <p className="mt-2 text-lg md:text-xl">Search low prices on tours, cruises, diving &amp; more...</p>
      </div>
    </header>
    <section className="mx-auto -mt-9 max-w-6xl px-4">
      <div className="grid gap-1 rounded-md border-4 border-bky bg-bky md:grid-cols-[2fr_1fr_1fr_1.3fr_auto]">
        <select value={dest} onChange={e=>setDest(e.target.value)} className="h-14 rounded-sm bg-white px-3"><option value="">Where are you going?</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select>
        <input type="date" aria-label="Check-in" className="h-14 rounded-sm bg-white px-3"/>
        <input type="date" aria-label="Check-out" className="h-14 rounded-sm bg-white px-3"/>
        <select className="h-14 rounded-sm bg-white px-3"><option>2 adults · 0 children · 1 tour</option><option>1 adult · 0 children · 1 tour</option><option>4 adults · 2 children · 1 tour</option></select>
        <button onClick={go} className="h-14 rounded-sm bg-bkb px-8 text-lg font-semibold text-white hover:bg-bk">Search</button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox"/> I&apos;m traveling for work</label>

      <h2 className="mt-8 text-2xl font-bold">Offers</h2><p className="text-gray-600">Promotions, deals and special offers for you</p>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border p-4 md:max-w-xl">
        <div><p className="text-xs text-gray-500">Early booking</p><h3 className="font-bold">15% off early booking Egypt tours</h3><p className="text-sm">Book ahead and save on tours across Egypt.</p>
          <a href="#tours" className="mt-3 inline-block rounded bg-bkb px-3 py-2 text-sm text-white">Search deals</a></div>
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
          <div className="p-3"><h3 className="line-clamp-2 h-12 font-bold text-bkb">{t.title}</h3><p className="text-sm text-gray-600">{t.city}</p>
            <p className="mt-2 flex items-center gap-2 text-sm"><span className="rounded bg-bk px-1.5 py-0.5 font-bold text-white">{t.rating}</span>Superb · {t.reviews} reviews</p>
            <p className="mt-2 text-right text-sm text-gray-500">from <b className="text-lg text-black">${t.price}</b></p>
            <button className="mt-2 w-full rounded bg-bkb py-2 text-sm font-semibold text-white">Check availability</button></div></article>)}
        {!list.length&&<p className="col-span-full py-8 text-center text-gray-500">No tours match these filters yet.</p>}</div>
    </section>
    <footer className="mt-16 bg-gray-50 py-10 text-sm">
      <div className="mx-auto mb-6 max-w-6xl px-4"><img src="/logo-full.png" alt="WeCheaperTours.com" className="h-24"/></div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[["Support",["Manage your trips","Contact Customer Service","Safety resource centre"]],["Discover",["Tours","Nile Cruises","Car rentals","Vacation rentals"]],["Terms and settings",["Privacy & cookies","Terms of Service","Accessibility"]],["About",["About WeCheaperTours","How we work","Careers","Contact"]]].map(([h,l])=>
        <div key={h as string}><h4 className="mb-2 font-bold">{h as string}</h4>{(l as string[]).map(x=><p key={x} className="py-0.5 text-bkb">{x}</p>)}</div>)}</div>
      <p className="mt-8 text-center text-gray-500">© WeCheaperTours.com – Discover Jordan &amp; Egypt</p></footer>
  </main>);
}
