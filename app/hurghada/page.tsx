import Link from "next/link";
import {Header,Footer} from "@/components/Chrome";
import WhatsAppButton from "@/components/WhatsAppButton";
import hurghadaData from "@/data/hurghada";
import {TOURS} from "@/data/mockTours";
export const metadata={title:"Hurghada Tours & VIP Services – WeCheaperTours"};
type Group={title:string;icon:string;items:string[]};
// Defensive normalisation: accepts [{title,icon,items}] or [title,items] / [title,icon,items] tuples; never lets .map see undefined.
function normalize(raw:any):Group[]{
  const list:any[]=Array.isArray(raw)?raw:(Array.isArray(raw?.groups)?raw.groups:(Array.isArray(raw?.default)?raw.default:[]));
  return list.map((g:any)=>{
    if(Array.isArray(g)){const items=Array.isArray(g[1])?g[1]:(Array.isArray(g[2])?g[2]:[]);return {title:String(g[0]??""),icon:typeof g[1]==="string"?g[1]:"",items};}
    return {title:String(g?.title??""),icon:String(g?.icon??""),items:Array.isArray(g?.items)?g.items:[]};
  }).filter(g=>g.title);
}
const GROUPS=normalize(hurghadaData);
const COUNT=(TOURS as any[]).filter(t=>t.departureCity==="Hurghada").length;
export default function P(){return <><Header/>
  <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 md:overflow-visible md:px-6">
    <h1 className="max-w-full break-words text-[28px] font-bold leading-tight md:text-4xl">Hurghada Tours &amp; VIP Services</h1>
    <p className="mt-2 text-gray-600">Tours and services departing from Hurghada. More detailed programs are coming soon.</p>
    <Link href="/tours?city=Hurghada" className="mt-4 inline-block rounded bg-[#FF6B00] px-5 py-3 font-bold text-white hover:bg-orange-600">See our {COUNT} excursions from Hurghada</Link>
    {GROUPS.length===0?<p className="mt-6 text-gray-600">Services list coming soon.</p>:
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">{GROUPS.map(g=>
      <section key={g.title} className="min-w-0 max-w-full rounded-lg border p-4"><h2 className="break-words text-lg font-bold"><span className="mr-2">{g.icon}</span>{g.title}</h2>
        <ul className="mt-3 space-y-2">{(g.items||[]).map(x=><li key={x} className="flex flex-wrap items-center justify-between gap-2"><span className="min-w-0 break-words">{x}</span>
          <WhatsAppButton message={`Hi, I need help with ${x} in Hurghada. From WeCheaperTours site.`} label="Ask on WhatsApp" className="rounded bg-green-600 px-3 py-1 text-sm font-bold text-white hover:bg-green-700"/></li>)}</ul></section>)}</div>}
  </main><Footer/></>}
