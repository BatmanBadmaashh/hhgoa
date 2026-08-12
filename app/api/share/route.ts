import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
export const runtime="nodejs";
export async function POST(req:Request){
 try{
  const form=await req.formData();const image=form.get("image");const name=String(form.get("name")||"HH Goa Builder");const title=String(form.get("title")||"NIGHT BUILDER");
  if(!(image instanceof File))return NextResponse.json({error:"Image missing"},{status:400});
  if(image.size>8_000_000)return NextResponse.json({error:"Image is too large"},{status:413});
  const id=randomUUID();const bytes=Buffer.from(await image.arrayBuffer());
  const img=await put(`frames/${id}.png`,bytes,{access:"public",contentType:"image/png",addRandomSuffix:false});
  const meta=await put(`frames/${id}.json`,JSON.stringify({image:img.url,name,title}),{access:"public",contentType:"application/json",addRandomSuffix:false});
  const base=process.env.NEXT_PUBLIC_SITE_URL||new URL(req.url).origin;
  return NextResponse.json({url:`${base}/share/${id}`,image:img.url,meta:meta.url});
 }catch(e){return NextResponse.json({error:"Sharing needs Vercel Blob. Add BLOB_READ_WRITE_TOKEN in Vercel."},{status:500})}
}