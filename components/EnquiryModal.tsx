"use client";
import { useEffect, useState } from "react";
import { wa } from "@/lib/wa";

const GUESTS = ["Couple / 2 Guests", "Family", "Group"];
const inp = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#FF6800] focus:outline-none";

export default function EnquiryModal({ tour, onClose }: { tour: any | null; onClose: () => void }) {
  const [f, set] = useState({ name: "", email: "", phone: "", date: "", guests: GUESTS[0], msg: "" });

  useEffect(() => {
    if (tour) {
      set((p) => ({ ...p, msg: `Hi, I am interested in ${tour?.name || tour?.title || ""}. Please send me details and price.` }));
    }
  }, [tour]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!tour) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `New Enquiry - ${tour?.name || tour?.title || ""}\n\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nTravel Date: ${f.date}\nGuests: ${f.guests}\n\nMessage: ${f.msg}`;
    window.open(wa(text), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">Enquire Now</h3>
            <p className="mt-1 text-sm text-gray-600">{tour?.name || tour?.title || ""}</p>
          </div>
          <button type="button" onClick={onClose} className="text-2xl leading-none text-gray-500 hover:text-black">×</button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">Your Name<input required className={inp} value={f.name} onChange={(e) => set({ ...f, name: e.target.value })} /></label>
          <label className="block text-sm font-medium">Email<input required type="email" className={inp} value={f.email} onChange={(e) => set({ ...f, email: e.target.value })} /></label>
          <label className="block text-sm font-medium">Phone / WhatsApp<input required className={inp} value={f.phone} onChange={(e) => set({ ...f, phone: e.target.value })} /></label>
          <label className="block text-sm font-medium">Approx. Travel Date<input type="date" className={inp} value={f.date} onChange={(e) => set({ ...f, date: e.target.value })} /></label>
          <label className="block text-sm font-medium sm:col-span-2">Number of Guests<select className={inp} value={f.guests} onChange={(e) => set({ ...f, guests: e.target.value })}>{GUESTS.map((g) => <option key={g}>{g}</option>)}</select></label>
          <label className="block text-sm font-medium sm:col-span-2">Message<textarea rows={4} className={inp} value={f.msg} onChange={(e) => set({ ...f, msg: e.target.value })} /></label>
          <div className="flex gap-3 sm:col-span-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-semibold">Cancel</button>
            <button type="submit" className="flex-1 rounded-lg bg-[#FF6800] py-3 text-sm font-bold text-white">Submit Enquiry</button>
          </div>
        </form>
      </div>
    </div>
  );
};