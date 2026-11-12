const $=id=>document.getElementById(id);
const K={jobs:"109c4_jobs_v1",history:"109c4_history_v1",firebase:"109c4_firebase_v1"};
const state={jobs:read(K.jobs,[]),history:read(K.history,[]),fb:null,user:null,cv:null};
function read(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
function saveLocal(){state.jobs.forEach(j=>{if(!j.status)j.status="saved"});localStorage.setItem(K.jobs,JSON.stringify(state.jobs));localStorage.setItem(K.history,JSON.stringify(state.history));stats()}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(s){const t=$("toast");t.textContent=s;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2600)}
function urlOK(s){try{const u=new URL(s);return ["http:","https:"].includes(u.protocol)?u.href:""}catch{return ""}}

const GROUPS=[
{name:"إدخال البيانات والسجلات",titles:["Data Entry","Data Entry Clerk","Data Entry Specialist","Data Entry Operator","Data Entry Associate","Data Entry Administrator","Data Entry Coordinator","Data Processing Clerk","Data Processor","Data Quality Clerk","Data Quality Analyst","Data Management Assistant","Data Administrator","Records Clerk","Records Officer","Records Management Specialist","Document Controller","Document Control Assistant","Document Control Specialist","Archive Clerk","Archivist","Typist","Information Entry Clerk","مدخل بيانات","موظف إدخال بيانات","مشغل إدخال بيانات","أخصائي إدخال بيانات","منسق بيانات","معالج بيانات","مدخل معلومات","موظف سجلات","مسؤول سجلات","مراقب وثائق","مراقب مستندات","موظف أرشيف","كاتب بيانات"]},
{name:"المحاسبة والمالية",titles:["Accountant","Senior Accountant","Junior Accountant","Accounts Payable Accountant","Accounts Receivable Accountant","General Accountant","Cost Accountant","Financial Accountant","Auditor","Internal Auditor","External Auditor","Finance Officer","Finance Analyst","Financial Analyst","Chief Accountant","Accounting Manager","Tax Accountant","Payroll Accountant","محاسب","محاسب عام","محاسب تكاليف","مراجع حسابات","مدير مالي"]},
{name:"الإدارة والسكرتارية",titles:["Administrative Assistant","Administrative Officer","Administration Coordinator","Office Administrator","Office Manager","Executive Assistant","Secretary","Receptionist","Front Desk Officer","Operations Administrator","مساعد إداري","موظف إداري","منسق إداري","مدير مكتب","سكرتير","سكرتير تنفيذي","موظف استقبال"]},
{name:"الموارد البشرية",titles:["HR Specialist","HR Officer","HR Coordinator","HR Assistant","Recruiter","Talent Acquisition Specialist","Talent Acquisition Coordinator","Payroll Officer","Personnel Officer","Human Resources Manager","أخصائي موارد بشرية","مسؤول موارد بشرية","منسق موارد بشرية","أخصائي توظيف","مسؤول شؤون موظفين"]},
{name:"تقنية المعلومات والبيانات",titles:["IT Support","IT Specialist","Help Desk Technician","System Administrator","Network Engineer","Software Engineer","Software Developer","Full Stack Developer","Frontend Developer","Backend Developer","Web Developer","Mobile App Developer","Data Analyst","Data Scientist","Database Administrator","Cybersecurity Analyst","QA Engineer","مهندس برمجيات","مطور برامج","محلل بيانات","أخصائي تقنية معلومات","دعم فني","مسؤول شبكات","محلل أمن سيبراني"]},
{name:"المبيعات وخدمة العملاء",titles:["Sales Representative","Sales Executive","Sales Manager","Account Manager","Business Development Executive","Customer Service Representative","Customer Support Specialist","Call Center Agent","Telesales Representative","Key Account Manager","مندوب مبيعات","أخصائي مبيعات","مدير حسابات","خدمة عملاء","ممثل خدمة عملاء","مركز اتصال"]},
{name:"التسويق والإعلام",titles:["Marketing Specialist","Digital Marketing Specialist","Marketing Coordinator","Social Media Specialist","Content Creator","Content Writer","SEO Specialist","Graphic Designer","Brand Manager","Public Relations Officer","أخصائي تسويق","مسؤول تسويق رقمي","أخصائي وسائل التواصل","كاتب محتوى","مصمم جرافيك","علاقات عامة"]},
{name:"الهندسة والمشاريع",titles:["Civil Engineer","Mechanical Engineer","Electrical Engineer","Industrial Engineer","Project Engineer","Project Manager","Site Engineer","Maintenance Engineer","Quality Engineer","HSE Officer","Safety Officer","مهندس مدني","مهندس ميكانيكي","مهندس كهربائي","مهندس صناعي","مدير مشروع","مهندس صيانة","مسؤول سلامة"]},
{name:"اللوجستيات والمشتريات",titles:["Logistics Coordinator","Supply Chain Specialist","Procurement Officer","Purchasing Specialist","Warehouse Supervisor","Storekeeper","Inventory Controller","Fleet Coordinator","Shipping Coordinator","أخصائي لوجستيات","أخصائي سلسلة إمداد","مسؤول مشتريات","أمين مستودع","مراقب مخزون","منسق شحن"]},
{name:"الصحة والتعليم",titles:["Registered Nurse","Staff Nurse","Medical Secretary","Medical Coder","Pharmacist","Laboratory Technician","Radiology Technician","Teacher","Teaching Assistant","School Administrator","ممرض","سكرتير طبي","فني مختبر","فني أشعة","صيدلي","معلم","مساعد معلم","إداري مدرسة"]}
];
let groupIndex=0;
function renderPicker(){
 $("pickerGroups").innerHTML=GROUPS.map((g,i)=>`<button class="${i===groupIndex?"active":""}" data-group="${i}">${esc(g.name)}</button>`).join("");
 $("pickerTitles").innerHTML=GROUPS[groupIndex].titles.map(t=>`<button data-title="${esc(t)}">${esc(t)}</button>`).join("");
 $("pickerGroups").querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{groupIndex=+b.dataset.group;renderPicker()});
 $("pickerTitles").querySelectorAll("[data-title]").forEach(b=>b.onclick=()=>{$("jobQuery").value=b.dataset.title;$("picker").hidden=true;runSearch()});
}
const LOC={
 SA_ALL:"Saudi Arabia",EAST:"Eastern Province Saudi Arabia (Dammam OR Khobar OR Dhahran OR Jubail OR Qatif OR Al Ahsa)",WORLD:"Worldwide",
 "الدمام":"Dammam Saudi Arabia","الخبر":"Al Khobar Saudi Arabia","الظهران":"Dhahran Saudi Arabia","الجبيل":"Jubail Saudi Arabia","القطيف":"Qatif Saudi Arabia","الأحساء":"Al Ahsa Hofuf Saudi Arabia","الرياض":"Riyadh Saudi Arabia","جدة":"Jeddah Saudi Arabia","مكة المكرمة":"Makkah Saudi Arabia","المدينة المنورة":"Madinah Saudi Arabia","القصيم":"Qassim Saudi Arabia","تبوك":"Tabuk Saudi Arabia","أبها":"Abha Saudi Arabia","جازان":"Jazan Saudi Arabia","حائل":"Hail Saudi Arabia","نجران":"Najran Saudi Arabia"
};
function after(days){if(days==="0")return "";const d=new Date(Date.now()-Number(days)*86400000);return " after:"+d.toISOString().slice(0,10)}
function getContext(){
 const q=$("jobQuery").value.trim();if(!q){toast("اكتب المسمى أو اختره من القائمة.");$("jobQuery").focus();return null}
 const region=$("region").value,days=$("date").value,sort=$("sort").value,loc=LOC[region]||region;
 return {q,region,days,sort,loc,workMode:$("workMode")?.value||"any",jobType:$("jobType")?.value||"any"};
}
function buildSources(c){
 const q=encodeURIComponent(c.q),loc=encodeURIComponent(c.loc);
 const extra=[c.workMode==="remote"?"remote":c.workMode==="hybrid"?"hybrid":c.workMode==="onsite"?"on-site":"",c.jobType==="full"?"full-time":c.jobType==="part"?"part-time":c.jobType==="contract"?"contract":c.jobType==="intern"?"internship":""].filter(Boolean).join(" ");
 const google=x=>"https://www.google.com/search?q="+encodeURIComponent(x+" "+extra)+(c.sort==="newest"?"&tbs=sbd:1":c.sort==="oldest"?"&tbs=li:1":"");
 const site=d=>google(`site:${d} "${c.q}" jobs ${c.loc}${after(c.days)}`);
 const s=[
 ["LinkedIn","in","بحث وظائف LinkedIn بالمسمى والمنطقة ونمط العمل.","https://www.linkedin.com/jobs/search/?keywords="+q+"&location="+loc+(c.days==="1"?"&f_TPR=r86400":c.days==="7"?"&f_TPR=r604800":c.days==="30"?"&f_TPR=r2592000":"")+(c.workMode==="remote"?"&f_WT=2":c.workMode==="hybrid"?"&f_WT=3":c.workMode==="onsite"?"&f_WT=1":"")],
 ["Indeed","IN","محرك وظائف عام مع تحديد المسمى والموقع والتاريخ.","https://sa.indeed.com/jobs?q="+q+(extra?"%20"+encodeURIComponent(extra):"")+"&l="+loc+"&sort="+(c.sort==="newest"?"date":"relevance")+(c.days==="1"?"&fromage=1":c.days==="7"?"&fromage=7":c.days==="30"?"&fromage=30":"")],
 ["Glassdoor","G","وظائف الشركات والتقييمات.",site("glassdoor.com")],
 ["Bayt","bayt","منصة وظائف في الشرق الأوسط.","https://www.bayt.com/en/saudi-arabia/jobs/?q="+q],
 ["GulfTalent","GT","وظائف مهنية في الخليج.","https://www.gulftalent.com/search?query="+q],
 ["Naukrigulf","NG","وظائف في الخليج والسعودية.","https://www.naukrigulf.com/search-jobs?keywords="+q+"&location="+loc],
 ["Jooble","J","محرك بحث يجمع إعلانات وظائف.","https://sa.jooble.org/SearchResult?ukw="+q],
 ["Tanqeeb","T","إعلانات وظائف عربية وإقليمية.",site("tanqeeb.com")],
 ["Careerjet","C","محرك بحث وظائف متعدد الدول.","https://www.careerjet.com/search/jobs?s="+q+"&l="+loc],
 ["Monster","M","منصة وظائف دولية.",site("monster.com")],
 ["ZipRecruiter","Z","منصة بحث وظائف دولية.",site("ziprecruiter.com")],
 ["SimplyHired","SH","محرك بحث وظائف دولي.",site("simplyhired.com")],
 ["Wuzzuf","W","وظائف في مصر والمنطقة.",site("wuzzuf.net")],
 ["Akhtaboot","A","منصة وظائف عربية.",site("akhtaboot.com")],
 ["Wellfound","WF","وظائف الشركات الناشئة والتقنية.",site("wellfound.com/jobs")],
 ["Remote OK","RO","وظائف عن بُعد؛ تحقق من أهلية العمل من بلدك.",site("remoteok.com")],
 ["We Work Remotely","WWR","وظائف عن بُعد حول العالم.","https://weworkremotely.com/remote-jobs/search?term="+q],
 ["Remotive","R","وظائف عن بُعد في مجالات متعددة.",site("remotive.com")],
 ["Himalayas","H","وظائف عن بُعد ومجالات تقنية.",site("himalayas.app/jobs")],
 ["Arbeitnow","AN","وظائف تتركز في أوروبا وألمانيا.",site("arbeitnow.com")],
 ["Google Jobs","Google","بحث Google عن الوظائف والمواقع.",google(`"${c.q}" jobs ${c.loc}${after(c.days)}`)],
 ["صفحات توظيف الشركات","CAREERS","البحث في صفحات Careers الرسمية.",google(`(careers OR jobs) "${c.q}" ${c.loc}${after(c.days)}`)]
 ];
 return s.map(([name,logo,desc,url])=>({name,logo,desc,url:urlOK(url)})).filter(x=>x.url);
}

function dateValue(v){
 if(!v)return null;
 const d=new Date(v);
 return Number.isNaN(d.getTime())?null:d;
}
function getPosted(j){
 return dateValue(j.postedAt||j.posted_at||j.publishedAt||j.published_at||j.datePosted||j.date_posted||j.createdAt||j.created_at||j.publicationDate||j.publication_date||j.date);
}
function extractEmail(j){
 const raw=[j.description,j.descriptionText,j.description_plain,j.summary,j.content].filter(Boolean).join(" ");
 const mailto=raw.match(/mailto:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i);
 const plain=raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
 return (mailto&&mailto[1]||plain&&plain[0]||j.email||"").trim();
}
function normalizeJob(j){
 const title=j.title||j.position||j.jobTitle||j.name||"";
 const company=j.company||j.companyName||j.company_name||j.organization||j.employer||"";
 const location=j.location||j.city||j.jobLocation||j.job_location||j.region||"";
 const link=urlOK(j.url||j.jobUrl||j.job_url||j.link||j.applyUrl||j.apply_url||j.canonicalUrl||"");
 if(!title||!link)return null;
 const posted=getPosted(j);
 return {
  id:String(j.id||j.slug||link),title,company,location,url:link,
  email:extractEmail(j),date:posted?posted.toISOString():"",
  salary:j.salary||j.salaryText||j.salary_text||j.compensation||"",
  workMode:j.remote===true||/remote|عن.?بعد/i.test(String(j.workMode||j.work_mode||j.locationType||""))?"عن بُعد":(j.workMode||j.work_mode||j.locationType||""),
  type:j.employmentType||j.employment_type||j.jobType||j.job_type||"",
  description:j.descriptionText||j.description_plain||j.summary||"",
  source:j.sourceName||j.source_name||j.source||"Dev Global Jobs"
 };
}
function matchesRegion(job,c){
 const s=(job.location||"").toLowerCase();
 if(c.region==="WORLD")return true;
 if(c.region==="SA_ALL")return /saudi|السعودية|riyadh|jeddah|dammam|khobar|dhahran|jubail|مكة|المدينة|الدمام|الخبر|الرياض|جدة|الجبيل|الظهران|الاحساء|الأحساء/i.test(s);
 if(c.region==="EAST")return /eastern|dammam|khobar|dhahran|jubail|qatif|ahsa|hofuf|الشرقية|الدمام|الخبر|الظهران|الجبيل|القطيف|الأحساء/i.test(s);
 return s.includes(String(c.region).toLowerCase()) || s.includes((LOC[c.region]||"").split(" ")[0].toLowerCase());
}
function matchesDate(job,c){
 if(c.days==="0")return true;
 const d=dateValue(job.date);
 if(!d)return false;
 return Date.now()-d.getTime()<=Number(c.days)*86400000 && d.getTime()<=Date.now()+86400000;
}
function matchesWork(job,c){
 const s=(job.workMode+" "+job.description).toLowerCase();
 if(c.workMode==="remote"&&!/remote|عن.?بعد/i.test(s))return false;
 if(c.workMode==="hybrid"&&!/hybrid|هجين/i.test(s))return false;
 if(c.workMode==="onsite"&&!/on.?site|office|حضوري|مقر الشركة/i.test(s))return false;
 const t=(job.type+" "+job.description).toLowerCase();
 if(c.jobType==="full"&&!/full.?time|دوام كامل/i.test(t))return false;
 if(c.jobType==="part"&&!/part.?time|دوام جزئي/i.test(t))return false;
 if(c.jobType==="contract"&&!/contract|temporary|عقد|مؤقت/i.test(t))return false;
 if(c.jobType==="intern"&&!/intern|trainee|تدريب|متدرب/i.test(t))return false;
 return true;
}
async function fetchLiveJobs(c){
 const params=new URLSearchParams({limit:"100",offset:"0",search:c.q});
 if(c.region!=="WORLD")params.set("country","sa");
 const response=await fetch("https://devglobaljobs.com/api/v1/jobs?"+params.toString(),{headers:{Accept:"application/json"}});
 if(!response.ok)throw new Error("استجاب مصدر الوظائف بالرمز "+response.status);
 const payload=await response.json();
 const list=Array.isArray(payload)?payload:(payload.jobs||payload.data||payload.results||payload.items||[]);
 if(!Array.isArray(list))throw new Error("صيغة بيانات الوظائف غير متوقعة من المصدر.");
 return list.map(normalizeJob).filter(Boolean);
}
function renderLiveJobs(jobs){
 const box=$("liveJobs");
 if(!jobs.length){
  box.innerHTML='<div class="empty live-empty"><b>لم نعثر على وظائف مطابقة في المصدر المباشر.</b><p>جرّب مسمى إنجليزيًا أو وسّع المنطقة والتاريخ. يمكنك استخدام مصادر البحث الإضافية أسفل النتائج.</p></div>';
  return;
 }
 box.innerHTML=jobs.map((j,i)=>`<article class="live-job-card">
 <div class="live-job-head"><span class="source-tag">${esc(j.source)}</span><span class="posted-date">${j.date?"نُشر: "+new Date(j.date).toLocaleDateString("ar-SA"):"تاريخ النشر غير متاح"}</span></div>
 <h3>${esc(j.title)}</h3><p class="job-company">${esc(j.company||"الشركة غير محددة")}</p>
 <div class="job-meta"><span>⌖ ${esc(j.location||"الموقع غير محدد")}</span>${j.salary?`<span>💰 ${esc(j.salary)}</span>`:""}${j.workMode?`<span>◉ ${esc(j.workMode)}</span>`:""}</div>
 ${j.email?`<div class="job-email">✉ بريد التوظيف: <a href="mailto:${esc(j.email)}">${esc(j.email)}</a></div>`:""}
 ${j.description?`<p class="job-description">${esc(j.description).slice(0,330)}${j.description.length>330?"…":""}</p>`:""}
 <div class="live-job-actions"><a class="btn primary" href="${esc(j.url)}" target="_blank" rel="noopener noreferrer">عرض الإعلان والتقديم ↗</a>${j.email?`<button class="btn secondary" data-live-email="${i}">تجهيز رسالة بريد ✉</button>`:""}<button class="btn secondary" data-live-save="${i}">حفظ الوظيفة ♡</button></div>
 </article>`).join("");
 box.querySelectorAll("[data-live-save]").forEach(b=>b.onclick=()=>{
  const j=jobs[+b.dataset.liveSave];
  if(state.jobs.some(x=>x.url===j.url)){toast("هذه الوظيفة محفوظة بالفعل.");return}
  state.jobs.unshift({...j,status:"saved",id:Date.now().toString()});saveLocal();renderJobs();cloudSave();toast("تم حفظ الوظيفة في المحفوظات.");
 });
 box.querySelectorAll("[data-live-email]").forEach(b=>b.onclick=()=>{
  const j=jobs[+b.dataset.liveEmail];const subject=`Application for ${j.title}`;
  const body=`Dear Hiring Team,\\n\\nI would like to apply for the ${j.title} position${j.company?" at "+j.company:""}. Please find my CV attached.\\n\\nThank you for your consideration.`;
  window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(j.email)+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body),"_blank","noopener");
  toast("أرفق سيرتك الذاتية وراجع الرسالة قبل الإرسال.");
 });
}
async function runSearch(){
 const c=getContext();if(!c)return;
 $("results").hidden=false;
 $("resultsTitle").textContent="الوظائف المطابقة لـ: "+c.q;
 $("resultsMeta").textContent=`${c.region==="EAST"?"المنطقة الشرقية":c.region==="WORLD"?"كل العالم":c.region==="SA_ALL"?"السعودية":c.region} • ${c.days==="1"?"آخر 24 ساعة":c.days==="7"?"آخر 7 أيام":c.days==="30"?"آخر 30 يومًا":"كل التواريخ"} • ${c.sort==="newest"?"الأحدث أولًا":"الأقدم أولًا"}`;
 $("liveStatus").textContent="جارٍ جلب الإعلانات المنشورة…";
 $("liveJobs").innerHTML='<div class="loading-jobs"><span class="spinner"></span> جارٍ البحث في مصدر الوظائف المباشر</div>';
 $("sourceCards").innerHTML=buildSources(c).map(s=>`<article class="source-card"><div class="source-head"><div class="source-logo">${esc(s.logo)}</div><h3>${esc(s.name)}</h3></div><p>${esc(s.desc)}</p><a class="btn secondary" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">الذهاب إلى ${esc(s.name)} ↗</a></article>`).join("");
 const item={q:c.q,region:c.region,days:c.days,sort:c.sort,date:new Date().toISOString()};
 state.history=[item,...state.history.filter(h=>!(h.q===item.q&&h.region===item.region))].slice(0,20);
 saveLocal();renderHistory();cloudSave();
 $("results").scrollIntoView({behavior:"smooth",block:"start"});
 try{
  let jobs=await fetchLiveJobs(c);
  jobs=jobs.filter(j=>matchesRegion(j,c)&&matchesDate(j,c)&&matchesWork(j,c));
  jobs.sort((a,b)=>{
   const da=dateValue(a.date)?.getTime()||0,db=dateValue(b.date)?.getTime()||0;
   return c.sort==="oldest"?da-db:db-da;
  });
  $("liveStatus").textContent=`تم العثور على ${jobs.length} وظيفة مطابقة من مصدر مباشر.`;
  renderLiveJobs(jobs);
 }catch(err){
  console.error(err);
  $("liveStatus").textContent="تعذر الاتصال بمصدر الوظائف المباشر.";
  $("liveJobs").innerHTML=`<div class="empty live-empty"><b>لم نتمكن من جلب الوظائف الآن.</b><p>${esc(err.message||"تحقق من اتصال الإنترنت ثم أعد المحاولة.")}</p><button class="btn secondary" id="retryLive">إعادة المحاولة</button></div>`;
  $("retryLive").onclick=runSearch;
 }
}
function renderHistory(){
 if(!state.history.length){$("historyList").innerHTML='<div class="empty">لم تبدأ البحث بعد.</div>';return}
 $("historyList").innerHTML=state.history.slice(0,8).map((h,i)=>`<div class="history-item"><button data-history="${i}">${esc(h.q)}<small>${esc(LOC[h.region]||h.region)} • ${new Date(h.date).toLocaleDateString("ar-SA")}</small></button><small>${h.sort==="oldest"?"الأقدم":"الأحدث"}</small></div>`).join("");
 $("historyList").querySelectorAll("[data-history]").forEach(b=>b.onclick=()=>{const h=state.history[+b.dataset.history];$("jobQuery").value=h.q;$("region").value=h.region;$("date").value=h.days;$("sort").value=h.sort;runSearch()});
}
function renderJobs(){
 const q=($("savedSearch")?.value||"").trim().toLowerCase(),sf=$("savedStatusFilter")?.value||"all";
 const filtered=state.jobs.map((j,i)=>({...j,_i:i})).filter(j=>(sf==="all"||(j.status||"saved")===sf)&&(!q||[j.title,j.company,j.location,j.email].join(" ").toLowerCase().includes(q)));
 $("savedCount").textContent=`${filtered.length} من ${state.jobs.length} وظيفة`;
 $("statSaved").textContent=state.jobs.length;$("statApplied").textContent=state.jobs.filter(j=>j.status==="applied").length;$("statInterview").textContent=state.jobs.filter(j=>j.status==="interview").length;$("statOffer").textContent=state.jobs.filter(j=>j.status==="offer").length;
 if(!filtered.length){$("savedJobs").innerHTML='<div class="empty">لا توجد وظائف مطابقة. جرّب تغيير الفلتر أو أضف وظيفة جديدة.</div>';return}
 const labels={saved:"محفوظة",applied:"تم التقديم",interview:"مقابلة",offer:"عرض وظيفي",rejected:"اعتذار"};
 $("savedJobs").innerHTML=filtered.map(j=>`<article class="saved-card"><div class="saved-card-top"><span class="status-pill status-${esc(j.status||"saved")}">${labels[j.status||"saved"]}</span><small>${j.date?`تاريخ النشر: ${new Date(j.date).toLocaleDateString("ar-SA")}`:"تاريخ النشر غير متاح"}</small></div><h3>${esc(j.title)}</h3><p>${esc(j.company||"الشركة غير محددة")} • ${esc(j.location||"الموقع غير محدد")}</p>${j.salary?`<p>💰 ${esc(j.salary)}</p>`:""}${j.workMode?`<p>◉ ${esc(j.workMode)}</p>`:""}${j.email?`<p class="email-chip">✉ ${esc(j.email)}</p>`:""}${j.notes?`<p>${esc(j.notes)}</p>`:""}<label class="status-control">تحديث حالة الطلب<select data-status="${j._i}"><option value="saved" ${(j.status||"saved")==="saved"?"selected":""}>محفوظة</option><option value="applied" ${j.status==="applied"?"selected":""}>تم التقديم</option><option value="interview" ${j.status==="interview"?"selected":""}>مقابلة</option><option value="offer" ${j.status==="offer"?"selected":""}>عرض وظيفي</option><option value="rejected" ${j.status==="rejected"?"selected":""}>اعتذار</option></select></label><div class="saved-actions">${j.url?`<a class="btn primary" href="${esc(j.url)}" target="_blank" rel="noopener">فتح الإعلان ↗</a>`:""}${j.email?`<button class="btn secondary" data-email-apply="${j._i}">تجهيز رسالة التقديم ✉</button>`:""}<button class="btn danger" data-delete="${j._i}">حذف</button></div></article>`).join("");
 $("savedJobs").querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{state.jobs.splice(+b.dataset.delete,1);saveLocal();renderJobs();cloudSave();toast("تم حذف الوظيفة.")});
 $("savedJobs").querySelectorAll("[data-status]").forEach(s=>s.onchange=()=>{state.jobs[+s.dataset.status].status=s.value;saveLocal();renderJobs();cloudSave();toast("تم تحديث حالة التقديم.")});
 $("savedJobs").querySelectorAll("[data-email-apply]").forEach(b=>b.onclick=()=>{
  const j=state.jobs[+b.dataset.emailApply];if(!j||!j.email)return;
  const subject=`Application for ${j.title}`;
  const body=`Dear Hiring Team,\\n\\nI would like to apply for the ${j.title} position${j.company?` at ${j.company}`:""}. Please find my CV attached.\\n\\nThank you for your time and consideration.\\n\\nBest regards`;
  const gmail="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(j.email)+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  window.open(gmail,"_blank","noopener");toast("راجع المسودة وأرفق سيرتك الذاتية قبل الإرسال.");
 });
}
function stats(){$("historyStat").textContent=state.history.length;$("jobsStat").textContent=state.jobs.length;$("connectionStat").textContent=state.user?"متصل":"محلي"}
function page(name){
 document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));
 document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
 $("mobileNav").hidden=true;if(name==="saved")renderJobs();if(name==="account")refreshAccount();window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>page(b.dataset.page));
$("menuBtn").onclick=()=>{$("mobileNav").hidden=!$("mobileNav").hidden};
$("openPicker").onclick=()=>{$("picker").hidden=!$("picker").hidden;if(!$("picker").hidden)renderPicker()};
$("closePicker").onclick=()=>$("picker").hidden=true;
$("searchBtn").onclick=runSearch;$("jobQuery").onkeydown=e=>{if(e.key==="Enter")runSearch()};
document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>{$("jobQuery").value=b.dataset.quick;runSearch()});
$("savedSearch").oninput=renderJobs;$("savedStatusFilter").onchange=renderJobs;
$("saveSearch").onclick=()=>{const q=$("jobQuery").value.trim();if(!q){toast("اكتب المسمى أولًا.");return}const h={q,region:$("region").value,days:$("date").value,sort:$("sort").value,date:new Date().toISOString()};state.history=[h,...state.history.filter(x=>x.q!==q)].slice(0,20);saveLocal();renderHistory();cloudSave();toast("تم حفظ البحث.")};
$("clearHistory").onclick=()=>{state.history=[];saveLocal();renderHistory();cloudSave();toast("تم مسح السجل.")};
$("newSearch").onclick=()=>{$("results").hidden=true;$("jobQuery").focus()};
$("dataEntry").onclick=()=>{$("jobQuery").value="Data Entry";groupIndex=0;renderPicker();$("picker").hidden=false;$("picker").scrollIntoView({behavior:"smooth",block:"center"})};

$("addJob").onclick=()=>{$("jobForm").reset();$("jobDialog").showModal()};
$("closeDialog").onclick=()=>$("jobDialog").close();
$("jobForm").onsubmit=e=>{
 e.preventDefault();const rawUrl=$("manualUrl").value.trim(),url=rawUrl?urlOK(rawUrl):"",email=$("manualEmail").value.trim();if(rawUrl&&!url){toast("رابط الإعلان غير صحيح.");return}if(!url&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)){toast("أدخل رابط الإعلان أو بريد التوظيف الصحيح.");return}
 state.jobs.unshift({id:Date.now().toString(),title:$("manualTitle").value.trim(),company:$("manualCompany").value.trim(),location:$("manualLocation").value.trim(),url,email,date:$("manualDate").value,salary:$("manualSalary").value.trim(),workMode:$("manualWorkMode").value,status:$("manualStatus").value,notes:$("manualNotes").value.trim()});
 saveLocal();renderJobs();cloudSave();$("jobDialog").close();toast("تم حفظ الوظيفة.");
};

/* Store CV locally in IndexedDB on this browser. */
function openDB(){return new Promise((ok,no)=>{const r=indexedDB.open("109c4-files",1);r.onupgradeneeded=()=>r.result.createObjectStore("files");r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
async function dbSet(k,v){const d=await openDB();return new Promise((ok,no)=>{const t=d.transaction("files","readwrite");t.objectStore("files").put(v,k);t.oncomplete=ok;t.onerror=()=>no(t.error)})}
async function dbGet(k){const d=await openDB();return new Promise((ok,no)=>{const r=d.transaction("files").objectStore("files").get(k);r.onsuccess=()=>ok(r.result||null);r.onerror=()=>no(r.error)})}
async function dbDel(k){const d=await openDB();return new Promise((ok,no)=>{const t=d.transaction("files","readwrite");t.objectStore("files").delete(k);t.oncomplete=ok;t.onerror=()=>no(t.error)})}
async function cvRefresh(){
 state.cv=await dbGet("cv");
 if(state.cv){$("cvStatus").textContent="تم حفظ "+state.cv.name+" على هذا الجهاز.";$("cvStatus").className="status success";$("downloadCv").disabled=false;$("deleteCv").hidden=false}
 else{$("cvStatus").textContent="لم يتم اختيار ملف بعد.";$("cvStatus").className="status";$("downloadCv").disabled=true;$("deleteCv").hidden=true}
}
$("cvFile").onchange=async()=>{
 const f=$("cvFile").files?.[0];if(!f)return;
 if(!/\.(pdf|doc|docx)$/i.test(f.name)){toast("اختر PDF أو DOC أو DOCX.");return}
 if(f.size>8*1024*1024){toast("الحد الأقصى 8 MB.");return}
 try{await dbSet("cv",f);await cvRefresh();toast("تم حفظ السيرة الذاتية محليًا.")}catch(e){console.error(e);toast("تعذر حفظ الملف في هذا المتصفح.")}
};
$("downloadCv").onclick=async()=>{const f=state.cv||await dbGet("cv");if(!f)return;const u=URL.createObjectURL(f);const a=document.createElement("a");a.href=u;a.download=f.name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2500)};
$("deleteCv").onclick=async()=>{await dbDel("cv");$("cvFile").value="";await cvRefresh();toast("تم حذف السيرة الذاتية.")};
$("gmailDraft").onclick=()=>{
 const to=$("mailTo").value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)){toast("أدخل بريدًا صحيحًا لجهة التوظيف.");return}
 const u="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(to)+"&su="+encodeURIComponent($("mailSubject").value)+"&body="+encodeURIComponent($("mailBody").value);
 window.open(u,"_blank","noopener");toast("راجع المسودة وأرفق CV يدويًا قبل الإرسال.")
};
$("clearData").onclick=async()=>{
 if(!confirm("سيتم حذف سجل البحث والمحفوظات والسيرة الذاتية من هذا المتصفح. متابعة؟"))return;
 state.jobs=[];state.history=[];saveLocal();await dbDel("cv");await cvRefresh();renderHistory();renderJobs();cloudSave();toast("تم مسح بيانات هذا المتصفح.")
};

/* Optional Firebase Auth + Firestore. No fake sign-in when config is missing. */
async function firebaseInit(config){
 try{
  const A=await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
  const U=await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const F=await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const app=A.getApps().length?A.getApp():A.initializeApp(config),auth=U.getAuth(app),db=F.getFirestore(app);
  state.fb={auth,db,U,F};await U.setPersistence(auth,U.browserLocalPersistence);
  U.onAuthStateChanged(auth,async user=>{state.user=user;refreshAccount();if(user){await cloudLoad();toast("تم تسجيل الدخول.")}});
  $("authStatus").textContent="تم تهيئة Firebase. يمكنك تسجيل الدخول.";
  return true;
 }catch(e){console.error(e);$("authStatus").textContent="تعذر تهيئة Firebase: "+(e.message||"تحقق من الإعدادات.");return false}
}
$("saveFirebase").onclick=async()=>{
 let c;try{c=JSON.parse($("firebaseConfig").value.trim())}catch{toast("إعداد Firebase ليس JSON صحيحًا.");return}
 if(!c.apiKey||!c.authDomain||!c.projectId||!c.appId){toast("إعداد Firebase ناقص.");return}
 localStorage.setItem(K.firebase,JSON.stringify(c));if(await firebaseInit(c))toast("تم إعداد Firebase.");
};
async function ensureFirebase(){
 if(state.fb)return true;const c=read(K.firebase,null);
 if(!c){toast("أضف إعداد Firebase أولًا من هذه الصفحة.");page("account");return false}
 return firebaseInit(c);
}
$("login").onclick=async()=>{
 if(!await ensureFirebase())return;
 try{await state.fb.U.signInWithEmailAndPassword(state.fb.auth,$("email").value.trim(),$("password").value)}
 catch(e){toast(authMsg(e))}
};
$("register").onclick=async()=>{
 if(!await ensureFirebase())return;
 if($("password").value.length<6){toast("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");return}
 try{await state.fb.U.createUserWithEmailAndPassword(state.fb.auth,$("email").value.trim(),$("password").value)}
 catch(e){toast(authMsg(e))}
};
$("google").onclick=async()=>{
 if(!await ensureFirebase())return;
 try{const p=new state.fb.U.GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});await state.fb.U.signInWithPopup(state.fb.auth,p)}
 catch(e){toast(authMsg(e))}
};
$("logout").onclick=async()=>{if(state.fb)await state.fb.U.signOut(state.fb.auth);state.user=null;refreshAccount()};
function authMsg(e){const m={"auth/operation-not-allowed":"فعّل طريقة الدخول في Firebase Authentication.","auth/unauthorized-domain":"أضف نطاق GitHub Pages إلى Firebase Authorized domains.","auth/email-already-in-use":"هذا البريد مسجل مسبقًا.","auth/invalid-credential":"البريد أو كلمة المرور غير صحيحة.","auth/weak-password":"كلمة المرور ضعيفة؛ استخدم 6 أحرف على الأقل.","auth/popup-blocked":"اسمح بالنوافذ المنبثقة للمتابعة مع Google."};return m[e.code]||e.message||"تعذر تسجيل الدخول."}
async function cloudSave(){
 if(!state.user||!state.fb)return;
 try{const {F,db}=state.fb;await F.setDoc(F.doc(db,"users",state.user.uid,"109c4","data"),{jobs:state.jobs,history:state.history,updatedAt:F.serverTimestamp()},{merge:true})}
 catch(e){console.warn(e);toast("لم تتم المزامنة. تحقق من Firestore Rules.")}
}
async function cloudLoad(){
 try{const {F,db}=state.fb,s=await F.getDoc(F.doc(db,"users",state.user.uid,"109c4","data"));if(!s.exists()){await cloudSave();return}
 const d=s.data(),map=new Map(state.jobs.map(j=>[j.url,j]));(d.jobs||[]).forEach(j=>{if(j.url&&!map.has(j.url))map.set(j.url,j)});state.jobs=[...map.values()];
 const keys=new Set(state.history.map(h=>h.q+"|"+h.region));state.history=[...state.history,...(d.history||[]).filter(h=>!keys.has(h.q+"|"+h.region))].slice(0,30);
 saveLocal();renderHistory();renderJobs();
 }catch(e){console.warn(e);toast("تعذر تحميل السحابة. تحقق من Firestore Rules.")}
}
function refreshAccount(){
 if(state.user){$("authStatus").textContent="متصل: "+(state.user.email||"Google account");$("authStatus").className="status success";$("logout").hidden=false}
 else{$("authStatus").textContent=read(K.firebase,null)?"Firebase مضبوط. سجّل الدخول للمزامنة.":"المزامنة السحابية غير مفعّلة. البحث والحفظ المحلي يعملان الآن.";$("authStatus").className="status warning";$("logout").hidden=true}
 stats();
}
$("firebaseConfig").value=JSON.stringify(read(K.firebase,{}),null,2);
const savedConfig=read(K.firebase,null);if(savedConfig)firebaseInit(savedConfig);
renderHistory();renderJobs();cvRefresh();stats();refreshAccount();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));
