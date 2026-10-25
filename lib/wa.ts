export const WA_NUMBER="201005002000";
export const wa=(msg:string)=>`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
