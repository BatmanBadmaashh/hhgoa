"use client";
import {useRef,useState} from "react";

const classes=["NIGHT BUILDER","SAND SHIPPER","SIGNAL HACKER","COASTAL CODER","GLITCH ARCHITECT","PALM STACKER","RUNTIME NOMAD","MONSOON MAKER","TERMINAL DREAMER","SUNSET SHIPPER"];

type Mode="id"|"pfp";

export default function Generator(){
 const input=useRef<HTMLInputElement>(null);
 const [photo,setPhoto]=useState<string>();
 const [mode,setMode]=useState<Mode>("id");
 const [name,setName]=useState("");
 const [role,setRole]=useState("");
 const [handle,setHandle]=useState("");
 const [title,setTitle]=useState(classes[0]);
 const [busy,setBusy]=useState(false);
 const [result,setResult]=useState<string>();
 const [share,setShare]=useState<string>();

 const onFile=async(f?:File)=>{
   if(!f)return;
   const valid=/^image\/(jpeg|png|webp|heic|heif)$/i.test(f.type)||/\.(heic|heif)$/i.test(f.name);
   if(!valid)return alert("Use JPG, PNG, WEBP or HEIC.");
   try{
     let file=f;
     if((f.type==="image/heic"||f.type==="image/heif"||/\.(heic|heif)$/i.test(f.name))){
       const mod=await import("heic2any");
       const converted=await mod.default({blob:f,toType:"image/jpeg",quality:.92});
       file=new File([Array.isArray(converted)?converted[0]:converted],"photo.jpg",{type:"image/jpeg"});
     }
     const u=URL.createObjectURL(file);
     setPhoto(u);setResult(undefined);setShare(undefined);
   }catch{alert("This photo could not be read. Try JPG or PNG.");}
 };

 const generate=async()=>{
   if(!photo)return alert("Add a photo first.");
   setBusy(true);setShare(undefined);
   try{
    const img=new Image();img.src=photo;await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=reject});
    const c=document.createElement("canvas");c.width=1080;c.height=1350;const x=c.getContext("2d")!;
    const W=1080,H=1350,cream="#F5F1E4",ink="#101312",acid="#CFFF3D",orange="#FF6B4A",muted="#5F6A63";
    x.fillStyle=cream;x.fillRect(0,0,W,H);

    // HH Goa editorial template: the uploaded photo stays completely natural.
    const photoX=54,photoY=190,photoW=972,photoH=720;
    const r=Math.max(photoW/img.width,photoH/img.height),sw=photoW/r,sh=photoH/r;
    // Slightly off-centre crop is intentional, but no photo filter is applied.
    x.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,photoX,photoY,photoW,photoH);

    // Registration marks / fixed graphic frame.
    x.strokeStyle=ink;x.lineWidth=3;x.strokeRect(photoX,photoY,photoW,photoH);
    x.strokeStyle=acid;x.lineWidth=12;x.strokeRect(photoX-7,photoY-7,photoW+14,photoH+14);
    x.strokeStyle=orange;x.lineWidth=3;x.setLineDash([16,10]);x.strokeRect(photoX+18,photoY+18,photoW-36,photoH-36);x.setLineDash([]);

    // Header: large, editorial, always identical.
    x.fillStyle=ink;x.font="900 40px Arial";x.fillText("HH GOA",54,78);
    x.fillStyle=acid;x.fillRect(54,96,155,12);
    x.fillStyle=ink;x.font="700 20px monospace";x.fillText("GOA, INDIA  ·  28—31 OCT 2026",54,137);
    x.fillStyle=orange;x.font="700 19px monospace";x.fillText(mode==="id"?"BUILDER ID":"PFP / FRAME",824,78);

    // Large footer block.
    x.fillStyle=ink;x.fillRect(0,950,W,400);
    x.fillStyle=cream;x.font="900 66px Arial";x.fillText((name||"YOUR NAME").toUpperCase().slice(0,18),54,1038);
    x.fillStyle=acid;x.font="700 26px monospace";x.fillText((role||"BUILDER / CREATOR").toUpperCase().slice(0,34),54,1084);
    x.fillStyle=cream;x.font="700 25px monospace";x.fillText(title,54,1142);
    x.fillStyle=orange;x.fillRect(54,1180,235,7);
    x.fillStyle=cream;x.font="18px monospace";x.fillText((handle||"@YOURHANDLE").toUpperCase().slice(0,28),54,1220);
    x.fillStyle=muted;x.font="16px monospace";x.fillText("LESS NOISE. MORE SIGNAL.",54,1280);
    x.fillStyle=acid;x.font="700 18px monospace";x.fillText("#FRAMEINGOA",855,1280);

    // Small site-like graphic language: triangle + crop ticks, not a sci-fi overlay.
    x.fillStyle=acid;x.beginPath();x.moveTo(945,995);x.lineTo(1018,1068);x.lineTo(945,1068);x.closePath();x.fill();
    x.strokeStyle=cream;x.lineWidth=3;
    [[32,160,60,160],[1020,160,1048,160],[32,920,60,920],[1020,920,1048,920]].forEach(([a,b,c,d])=>{x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke()});

    if(mode==="pfp"){
      // For PFP, preserve the photo as the focal point and turn the same identity into a circular frame.
      const p=document.createElement("canvas");p.width=1080;p.height=1080;const q=p.getContext("2d")!;
      q.fillStyle=cream;q.fillRect(0,0,1080,1080);q.save();q.beginPath();q.arc(540,540,420,0,Math.PI*2);q.clip();
      const rr=Math.max(840/img.width,840/img.height),ssw=840/rr,ssh=840/rr;q.drawImage(img,(img.width-ssw)/2,(img.height-ssh)/2,ssw,ssh,120,120,840,840);q.restore();
      q.strokeStyle=acid;q.lineWidth=18;q.beginPath();q.arc(540,540,420,0,Math.PI*2);q.stroke();q.strokeStyle=ink;q.lineWidth=5;q.strokeRect(45,45,990,990);
      q.fillStyle=ink;q.font="900 38px Arial";q.fillText("HH GOA",54,92);q.fillStyle=orange;q.font="700 18px monospace";q.fillText("#FRAMEINGOA",850,92);
      q.fillStyle=ink;q.font="700 18px monospace";q.fillText("GOA, INDIA · 2026",54,1030);
      // Use the PFP as the final image while keeping the same fixed HH visual system.
      c.width=1080;c.height=1080;x=c.getContext("2d")!;x.drawImage(p,0,0); 
    }

    const blob:Blob=await new Promise(r=>c.toBlob(b=>r(b!),"image/png"));
    setResult(URL.createObjectURL(blob));
    const fd=new FormData();fd.append("image",blob,"hh-goa-frame.png");fd.append("name",name||"HH Goa Builder");fd.append("title",title);
    const res=await fetch("/api/share",{method:"POST",body:fd});const data=await res.json();if(!res.ok)throw new Error(data.error||"Share creation failed");setShare(data.url);
   }catch(e){alert(e instanceof Error?e.message:"Could not generate");}finally{setBusy(false)}
 };
 const caption=`I just got my HH Goa 2026 Builder ID ⚡ ${name||"Ready to ship."} #FrameInGoa`;
 const doShare=async()=>{if(!share)return;const nav=navigator as Navigator & {share?:Function};if(nav.share){try{await nav.share({title:"HH Goa 2026",text:caption,url:share});return}catch{}}window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(caption)+"&url="+encodeURIComponent(share),"_blank","noopener,noreferrer")};

 return <section className="appgrid">
  <aside className="panel controls">
   <div className="head"><span>01 / BUILD YOUR ID</span><span className="live">● LIVE</span></div>
   <div className="tabs"><button className={mode==="id"?"active":""} onClick={()=>setMode("id")}>BUILDER ID</button><button className={mode==="pfp"?"active":""} onClick={()=>setMode("pfp")}>PFP FRAME</button></div>
   <label className="upload" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();onFile(e.dataTransfer.files[0])}}><input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={e=>onFile(e.target.files?.[0])}/><b>＋ ADD YOUR PHOTO</b><small>JPG · PNG · WEBP · HEIC</small><span>YOUR PHOTO STAYS A PHOTO. THE HH GOA TEMPLATE DOES THE REST.</span></label>
   {mode==="id"&&<div className="fields"><label>NAME<input maxLength={28} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>STACK / ROLE<input maxLength={32} value={role} onChange={e=>setRole(e.target.value)} placeholder="Builder · Designer · Founder"/></label><label>HANDLE<input maxLength={28} value={handle} onChange={e=>setHandle(e.target.value)} placeholder="@yourhandle"/></label></div>}
   <div className="row"><button className="ghost" onClick={()=>setTitle(classes[Math.floor(Math.random()*classes.length)])}>↯ NEW BUILDER CLASS</button><span>{title}</span></div>
   <button className="primary" onClick={generate} disabled={busy}>{busy?"BUILDING YOUR ID…":"MAKE MY HH GOA FRAME ↗"}</button>
   <p className="micro">One photo in. One HH Goa graphic out. No login.</p>
  </aside>
  <section className="panel output"><div className="head"><span>02 / YOUR HH GOA ID</span><span>{result?"READY TO SHIP":"ADD A PHOTO"}</span></div><div className="preview">{result?<img src={result} alt="Generated HH Goa 2026 Builder ID"/>:<div><strong>HH GOA</strong><p>Upload a photo and we'll place it into the fixed HH Goa 2026 template.</p></div>}</div><div className="actions"><a className={!result?"disabled":""} href={result||"#"} download="hh-goa-builder-id.png">↓ DOWNLOAD IMAGE</a><button disabled={!share||busy} onClick={doShare}>𝕏 SHARE TO X</button></div>{share&&<p className="shareurl">SHAREABLE · <a href={share} target="_blank">OPEN YOUR ID ↗</a></p>}</section>
 </section>
}
