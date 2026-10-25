import Link from "next/link";
import {wa} from "@/lib/wa";
export function Header(){
  return <header className="bg-white shadow"><div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
    <Link href="/" className="flex shrink-0 items-center gap-2"><img src="/logo-emblem.png" alt="" className="h-8 w-8 md:h-11 md:w-11"/><span className="whitespace-nowrap text-lg font-bold"><span className="text-[#FF6B00]">WeCheaper</span> Tours</span></Link>
    <nav className="flex w-full gap-1 overflow-x-auto text-sm md:w-auto">{[["Tours","/tours"],["Nile Cruises","/nile-cruises"],["Diving","/diving"],["Rentals","/apartments"],["Admin","/admin"]].map(([m,h])=><Link key={m} href={h} className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-gray-100">{m}</Link>)}
    <a href={wa("Hi, I need help")} target="_blank" rel="noreferrer" className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-gray-100">Support</a></nav></div></header>;
}
export const Footer=()=><footer className="mt-16 bg-[#0A1931] py-8 text-center text-sm text-gray-300">© WeCheaperTours.com – Discover Jordan &amp; Egypt</footer>;
