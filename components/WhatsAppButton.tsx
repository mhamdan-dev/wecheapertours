import {wa} from "@/lib/wa";
export default function WhatsAppButton({message,label,className=""}:{message:string;label:string;className?:string}){
  return <a href={wa(message)} target="_blank" rel="noreferrer" className={className}>{label}</a>;
}
