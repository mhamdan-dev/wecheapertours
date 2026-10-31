import {TOURS} from "@/data/mockTours";
import {Header,Footer} from "@/components/Chrome";
export default function P(){return <><Header/>
  <main className="mx-auto max-w-6xl px-4 py-8"><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold">Vendor Panel – Coming Soon</h1><p className="text-gray-600">This is where vendors will add, edit and price their tours and cruises.</p></div>
    <button disabled className="cursor-not-allowed rounded bg-[#FF6B00]/50 px-5 py-2 font-bold text-white">+ Add tour (soon)</button></div>
    <div className="mt-6 overflow-x-auto rounded-lg border"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-gray-50"><tr>{["ID","Name","City","Type","Price","Rating","Status"].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead>
      <tbody>{TOURS.map((t:any)=><tr key={t.id} className="border-t"><td className="p-3">{t.id}</td><td className="p-3 font-medium">{t.name}</td><td className="p-3">{t.city}</td><td className="p-3">{t.type}</td><td className="p-3">{t.priceLabel||"On request"}</td><td className="p-3">{t.rating}</td><td className="p-3"><span className="rounded bg-green-100 px-2 py-0.5 text-green-800">Active</span></td></tr>)}</tbody></table></div></main><Footer/></>}
