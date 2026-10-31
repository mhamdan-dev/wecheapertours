// Client WhatsApp: +20 100 057 8484
export const WA_NUMBER="201000578484";
export const wa=(msg:string)=>`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
