"use client";
import {useEffect,useState} from "react";
import {createPortal} from "react-dom";
import {wa} from "@/lib/wa";
const GUESTS=["Couple / 2 Guests","Family","Group"];
const inp="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#FF6B00] focus:outline-none";
export default function EnquiryModal({tour,onClose}:{tour:any|null;onClose:()=>void}){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true)},[]);
  const [f,setF]=useState({name:"",email:"",whatsapp:"",phone:"",date:"",guests:GUESTS[0],message:""});
  useEffect(()=>{ if(tour) setF({name:"",email:"",whatsapp:"",phone:"",date:"",guests:GUESTS[0],message:`Hello, I would like to enquire about ${tour.name}`}); },[tour]);
  useEffect(()=>{ const k=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose()}; if(tour){document.addEventListener("keydown",k);document.body.style.overflow="hidden";} return ()=>{document.removeEventListener("keydown",k);document.body.style.overflow="";}; },[tour,onClose]);
  if(!tour||!mounted) return null;
  const set=(k:string)=>(e:any)=>setF({...f,[k]:e.target.value});
  const submit=(e:any)=>{
    e.preventDefault();
    const msg=["New enquiry from WeCheaperTours website","",`Tour: ${tour.name}`,`Name: ${f.name}`,`Email: ${f.email}`,`WhatsApp: ${f.whatsapp||"-"}`,`Phone: ${f.phone}`,`Approx. travel date: ${f.date||"-"}`,`Guests: ${f.guests}`,"",`Message: ${f.message}`].join("\n");
    window.open(wa(msg),"_blank","noopener,noreferrer"); onClose();
  };
  return createPortal(<div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 md:items-center" onClick={onClose} role="dialog" aria-modal="true" aria-label="Enquiry form">
    <form onSubmit={submit} onClick={e=>e.stopPropagation()} className="relative my-4 w-full max-w-lg rounded-2xl bg-white p-5 pb-20 shadow-2xl md:p-6 md:pb-20">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-gray-500 hover:bg-gray-100">×</button>
      <h2 className="pr-10 text-xl font-bold md:text-2xl">Enquire about this tour</h2>
      <p className="mt-1 text-sm font-medium text-gray-700">{tour.name}</p>
      <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900"><b>Informational Enquiry:</b> Submitting this request is 100% free with no commitment. All itinerary dates and rates are confirmed directly by our team.</div>
      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium">Your Full Name*<input required value={f.name} onChange={set("name")} className={inp}/></label>
        <label className="block text-sm font-medium">Email Address*<input required type="email" value={f.email} onChange={set("email")} className={inp}/></label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">WhatsApp<input type="tel" value={f.whatsapp} onChange={set("whatsapp")} className={inp}/></label>
          <label className="block text-sm font-medium">Phone*<input required type="tel" value={f.phone} onChange={set("phone")} className={inp}/></label>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">Approx. Travel Date<input type="date" value={f.date} onChange={set("date")} className={inp}/></label>
          <label className="block text-sm font-medium">Number of Guests<select value={f.guests} onChange={set("guests")} className={inp}>{GUESTS.map(g=><option key={g}>{g}</option>)}</select></label>
        </div>
        <label className="block text-sm font-medium">Your Requirements &amp; Message*<textarea required rows={4} value={f.message} onChange={set("message")} className={inp}/></label>
      </div>
      <div className="mt-5 flex gap-3"><button type="button" onClick={onClose} className="flex-1 rounded-full bg-gray-200 px-5 py-2.5 font-medium text-gray-800 hover:bg-gray-300">Cancel</button><button type="submit" className="btn-primary flex-1">Submit Enquiry</button></div>
    </form></div>,document.body);
}
