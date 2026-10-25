import {notFound} from "next/navigation";
import {Header,Footer} from "@/components/Chrome";
import Link from "next/link";
const PAGES:Record<string,string>={packages:"Egypt Package Tours",diving:"Scuba Diving & Marine Adventures",transport:"Transportation & Ticketing","car-rentals":"Car Rentals & Ferry Crossings",apartments:"Vacation Rentals & Apartments",concierge:"Personal Concierge Services",events:"Event Planning & Special Occasions"};
export const dynamicParams=false;
export const generateStaticParams=()=>Object.keys(PAGES).map(slug=>({slug}));
export default function P({params}:{params:{slug:string}}){
  const title=PAGES[params.slug]; if(!title) notFound();
  return <><Header/><main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">{title}</h1>
    <p className="mt-3 text-lg text-gray-600">Coming Soon – real data will be added.</p>
    <Link href="/tours" className="mt-6 inline-block rounded bg-[#FF6B00] px-6 py-3 font-bold text-white">Browse tours</Link></main><Footer/></>;
}
