const SUPABASE_URL = 'https://rvtufzcwjvvnonggqzoj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ylwegXC8xWEmlGSkQu4byw_3zQFKQBQ';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const provinceNames = {
  alborz:'البرز',ardabil:'اردبیل','azerbaijan-east':'آذربایجان شرقی','azerbaijan-west':'آذربایجان غربی',bushehr:'بوشهر','chaharmahal-bakhtiari':'چهارمحال و بختیاری',fars:'فارس',gilan:'گیلان',golestan:'گلستان',hamadan:'همدان',hormozgan:'هرمزگان',ilam:'ایلام',isfahan:'اصفهان',kerman:'کرمان',kermanshah:'کرمانشاه',khuzestan:'خوزستان','kohgiluyeh-boyer-ahmad':'کهگیلویه و بویراحمد',kurdistan:'کردستان',lorestan:'لرستان',markazi:'مرکزی',mazandaran:'مازندران','north-khorasan':'خراسان شمالی',qazvin:'قزوین',qom:'قم','razavi-khorasan':'خراسان رضوی',semnan:'سمنان','sistan-baluchestan':'سیستان و بلوچستان','south-khorasan':'خراسان جنوبی',tehran:'تهران',yazd:'یزد',zanjan:'زنجان'
};
const aliases={'chahar-mahal-and-bakhtiari':'chaharmahal-bakhtiari','chaharmahal-and-bakhtiari':'chaharmahal-bakhtiari','kohgiluyeh-and-boyer-ahmad':'kohgiluyeh-boyer-ahmad','khorasan-north':'north-khorasan','khorasan-razavi':'razavi-khorasan','khorasan-south':'south-khorasan'};
const colors=['#7a2638','#9d3d48','#b85d4d','#6a3746','#a66a3f','#8b4a3e','#5f4553','#a54c58'];
const $=s=>document.querySelector(s);
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const number=n=>new Intl.NumberFormat('fa-IR').format(n);
let selected='',songs=[],likes=[],user=null,authMode='login',pendingAdd=false;

function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function provinceName(id){return provinceNames[id]||id}
function resolveProvince(raw=''){
  const id=raw.toLowerCase().trim().replaceAll('_','-').replaceAll(' ','-');
  const compact=id.replace(/[^a-z]/g,'');
  if(compact.includes('chahar')&&compact.includes('bakht'))return 'chaharmahal-bakhtiari';
  if((compact.includes('kohg')||compact.includes('boyer'))&&compact.includes('ahmad'))return 'kohgiluyeh-boyer-ahmad';
  return aliases[id]||id;
}

function buildOptions(){
  const list=Object.keys(provinceNames).sort((a,b)=>provinceName(a).localeCompare(provinceName(b),'fa'));
  $('#provinceFallback').innerHTML='<option value="">یک استان را انتخاب کن</option>'+list.map(id=>`<option value="${id}">${provinceName(id)}</option>`).join('');
  $('#filterProvince').innerHTML='<option value="all">همه استان‌ها</option>'+list.map(id=>`<option value="${id}">${provinceName(id)}</option>`).join('');
}
async function loadMap(){
  try{
    const response=await fetch('https://raw.githubusercontent.com/nastoohir/iran-map-svg/master/iran.svg');
    const text=await response.text();if(!response.ok||!text.includes('<svg'))throw new Error();
    $('#svgLayer').innerHTML=text;const svg=$('#svgLayer svg');svg.removeAttribute('width');svg.removeAttribute('height');svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    svg.querySelectorAll('#provinces path').forEach((path,index)=>{const id=resolveProvince(path.id);path.dataset.province=id;path.style.setProperty('--province-color',colors[index%colors.length]);path.setAttribute('tabindex','0');path.setAttribute('role','button');path.setAttribute('aria-label',provinceName(id));path.addEventListener('pointerenter',e=>showTip(e,provinceName(id)));path.addEventListener('pointermove',moveTip);path.addEventListener('pointerleave',hideTip);path.addEventListener('click',()=>selectProvince(id));path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectProvince(id)}})});
    $('#mapStatus').remove();
  }catch{$('#mapStatus').textContent='نقشه بارگذاری نشد؛ از فهرست استان‌ها استفاده کن.'}
}
function showTip(e,name){$('#tooltip').textContent=name;$('#tooltip').classList.add('show');moveTip(e)}
function moveTip(e){const r=$('#mapStage').getBoundingClientRect();$('#tooltip').style.left=`${e.clientX-r.left}px`;$('#tooltip').style.top=`${e.clientY-r.top}px`}
function hideTip(){$('#tooltip').classList.remove('show')}
function selectProvince(id){
  if(!provinceNames[id])return;selected=id;document.querySelectorAll('#provinces path').forEach(p=>p.classList.toggle('is-selected',p.dataset.province===id));
  $('#selectedProvince').textContent=provinceName(id);$('#selectedBadge').textContent=`استان انتخاب‌شده: ${provinceName(id)}`;$('#provinceHelp').textContent=`حالا می‌توانی آهنگ محبوبت را به فهرست ${provinceName(id)} اضافه کنی.`;$('#addSongBtn').disabled=false;$('#provinceFallback').value=id;$('#filterProvince').value=id;renderSongs();updateStats();
}

async function loadSongs(){
  const [{data:songData,error:songError},{data:likeData,error:likeError}]=await Promise.all([db.from('songs').select('id,province,title,artist,link,submitted_by,user_id,created_at').order('created_at',{ascending:false}),db.from('song_likes').select('song_id,user_id')]);
  if(songError||likeError){toast('خطا در دریافت آهنگ‌ها؛ فایل setup-auth.sql را اجرا کن.');return}
  songs=songData||[];likes=likeData||[];renderSongs();updateStats();
}
function renderSongs(){
  const filter=$('#filterProvince').value||'all';const list=songs.filter(s=>filter==='all'||s.province===filter).map(s=>({...s,count:likes.filter(l=>l.song_id===s.id).length,liked:user&&likes.some(l=>l.song_id===s.id&&l.user_id===user.id)})).sort((a,b)=>b.count-a.count);
  $('#songsTitle').textContent=filter==='all'?'محبوب‌ترین آهنگ‌های یلدایی':`آهنگ‌های یلدایی ${provinceName(filter)}`;
  $('#songsGrid').innerHTML=list.map(s=>`<article class="song-card"><div class="song-top"><div><h3>${esc(s.title)}</h3><p class="artist">${esc(s.artist)}</p></div><span class="province-chip">${esc(provinceName(s.province))}</span></div><div class="song-meta">پیشنهاد از ${esc(s.submitted_by)}</div><div class="song-actions"><button class="like-btn ${s.liked?'liked':''}" data-like="${s.id}">♥ ${number(s.count)}</button>${s.link?`<a class="listen-link" target="_blank" rel="noopener noreferrer" href="${esc(s.link)}">شنیدن ↗</a>`:''}</div></article>`).join('');
  $('#emptyState').hidden=Boolean(list.length);document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>toggleLike(Number(btn.dataset.like))));
}
function updateStats(){const ids=new Set(songs.filter(s=>s.province===selected).map(s=>s.id));$('#provinceSongCount').textContent=number(ids.size);$('#provinceLikeCount').textContent=number(likes.filter(l=>ids.has(l.song_id)).length)}
async function toggleLike(songId){
  if(!user){pendingAdd=false;openAuth();toast('برای لایک‌کردن ابتدا وارد شو.');return}
  const existing=likes.find(l=>l.song_id===songId&&l.user_id===user.id);
  const query=existing?db.from('song_likes').delete().eq('song_id',songId).eq('user_id',user.id):db.from('song_likes').insert({song_id:songId,user_id:user.id});
  const {error}=await query;if(error){toast('لایک ثبت نشد؛ دوباره تلاش کن.');return}await loadSongs();
}

function openSongDialog(){if(!selected){toast('اول یک استان را انتخاب کن.');return}if(!user){pendingAdd=true;openAuth();toast('برای ثبت آهنگ ابتدا وارد یا ثبت‌نام شو.');return}$('#dialogProvince').textContent=provinceName(selected);$('#songDialog').showModal()}
async function submitSong(event){
  event.preventDefault();if(!user)return openAuth();const button=event.submitter;button.disabled=true;
  const name=(user.user_metadata?.display_name||user.email.split('@')[0]).slice(0,50);const link=$('#songLink').value.trim()||null;
  const {error}=await db.from('songs').insert({province:selected,title:$('#songTitle').value.trim(),artist:$('#artistName').value.trim(),link,submitted_by:name,user_id:user.id});button.disabled=false;
  if(error){toast(error.code==='42501'?'اجازه ثبت وجود ندارد؛ setup-auth.sql را بررسی کن.':'ثبت انجام نشد؛ یک دقیقه بعد دوباره امتحان کن.');return}
  event.target.reset();$('#songDialog').close();$('#filterProvince').value=selected;await loadSongs();toast('آهنگ با موفقیت ثبت شد 🎉');$('#songs-section').scrollIntoView({behavior:'smooth'});
}

function openAuth(){renderAuth();$('#authDialog').showModal()}
function renderAuth(){
  $('#authGuestView').hidden=Boolean(user);$('#authUserView').hidden=!user;$('#accountBtn').classList.toggle('signed-in',Boolean(user));
  $('#accountBtn').textContent=user?(user.user_metadata?.display_name||'حساب من'):'ورود / ثبت‌نام';
  if(user){$('#userDisplayName').textContent=user.user_metadata?.display_name||'کاربر یلدا';$('#userEmail').textContent=user.email;return}
  const signup=authMode==='signup';$('#authTitle').textContent=signup?'ساخت حساب':'ورود';$('#authSubmit').textContent=signup?'ثبت‌نام':'ورود';$('#displayNameLabel').hidden=!signup;$('#displayName').required=signup;$('#switchAuthMode').textContent=signup?'حساب داری؟ وارد شو':'حساب نداری؟ ثبت‌نام کن';$('#authPassword').autocomplete=signup?'new-password':'current-password';
}
async function submitAuth(event){
  event.preventDefault();const email=$('#authEmail').value.trim();const password=$('#authPassword').value;const msg=$('#authMessage');msg.textContent='کمی صبر کن…';msg.className='form-message';
  let result;if(authMode==='signup'){result=await db.auth.signUp({email,password,options:{data:{display_name:$('#displayName').value.trim()}}})}else{result=await db.auth.signInWithPassword({email,password})}
  if(result.error){msg.textContent=result.error.message.includes('Invalid login')?'ایمیل یا رمز عبور اشتباه است.':result.error.message;return}
  if(authMode==='signup'&&!result.data.session){msg.textContent='لینک تأیید به ایمیلت فرستاده شد. ایمیل را تأیید کن و سپس وارد شو.';msg.classList.add('success');return}
  msg.textContent='';$('#authDialog').close();toast('با موفقیت وارد شدی.');
}
async function signOut(){await db.auth.signOut();$('#authDialog').close();toast('از حساب خارج شدی.')}

$('#provinceFallback').addEventListener('change',e=>e.target.value&&selectProvince(e.target.value));$('#filterProvince').addEventListener('change',renderSongs);
$('#addSongBtn').addEventListener('click',openSongDialog);$('#openAddTop').addEventListener('click',()=>selected?openSongDialog():$('#map-section').scrollIntoView({behavior:'smooth'}));
$('#closeDialog').addEventListener('click',()=>$('#songDialog').close());$('#songDialog').addEventListener('click',e=>e.target===$('#songDialog')&&$('#songDialog').close());$('#songForm').addEventListener('submit',submitSong);
$('#accountBtn').addEventListener('click',openAuth);$('#closeAuth').addEventListener('click',()=>$('#authDialog').close());$('#authDialog').addEventListener('click',e=>e.target===$('#authDialog')&&$('#authDialog').close());$('#switchAuthMode').addEventListener('click',()=>{authMode=authMode==='login'?'signup':'login';$('#authMessage').textContent='';renderAuth()});$('#authForm').addEventListener('submit',submitAuth);$('#signOutBtn').addEventListener('click',signOut);
$('#languageSelect').addEventListener('change',e=>{if(e.target.value!=='fa')toast('نسخه ورود در حال حاضر با رابط فارسی فعال است.');e.target.value='fa'});
db.auth.onAuthStateChange((_event,session)=>{user=session?.user||null;renderAuth();renderSongs();updateStats();if(user&&pendingAdd){pendingAdd=false;setTimeout(openSongDialog,200)}});

buildOptions();renderAuth();loadMap();loadSongs();
