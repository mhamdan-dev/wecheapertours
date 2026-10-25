import {Suspense} from "react";
import Listing from "@/components/Listing";
export const metadata={title:"Nile Cruises – WeCheaperTours"};
export default function P(){return <Suspense><Listing mode="cruise" title="Nile Cruises"/></Suspense>}
