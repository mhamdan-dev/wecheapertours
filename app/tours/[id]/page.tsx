import {notFound} from "next/navigation";
import {ALL} from "@/data/mockTours";
import Detail from "@/components/Detail";
export default function P({params}:{params:{id:string}}){
  const t=ALL.find(x=>String(x.id)===params.id); if(!t) notFound();
  return <Detail t={t}/>;
}
