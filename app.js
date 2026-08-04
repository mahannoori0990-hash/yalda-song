const provinceNames = {
  fa: {
    alborz:'البرز', ardabil:'اردبیل', 'azerbaijan-east':'آذربایجان شرقی', 'azerbaijan-west':'آذربایجان غربی',
    bushehr:'بوشهر', 'chaharmahal-bakhtiari':'چهارمحال و بختیاری', fars:'فارس', gilan:'گیلان', golestan:'گلستان',
    hamadan:'همدان', hormozgan:'هرمزگان', ilam:'ایلام', isfahan:'اصفهان', kerman:'کرمان', kermanshah:'کرمانشاه',
    khuzestan:'خوزستان', 'kohgiluyeh-boyer-ahmad':'کهگیلویه و بویراحمد', kurdistan:'کردستان', lorestan:'لرستان', markazi:'مرکزی',
    mazandaran:'مازندران', 'north-khorasan':'خراسان شمالی', qazvin:'قزوین', qom:'قم', 'razavi-khorasan':'خراسان رضوی',
    semnan:'سمنان', 'sistan-baluchestan':'سیستان و بلوچستان', 'south-khorasan':'خراسان جنوبی', tehran:'تهران', yazd:'یزد', zanjan:'زنجان'
  },
  en: {
    alborz:'Alborz', ardabil:'Ardabil', 'azerbaijan-east':'East Azerbaijan', 'azerbaijan-west':'West Azerbaijan',
    bushehr:'Bushehr', 'chaharmahal-bakhtiari':'Chaharmahal and Bakhtiari', fars:'Fars', gilan:'Gilan', golestan:'Golestan',
    hamadan:'Hamadan', hormozgan:'Hormozgan', ilam:'Ilam', isfahan:'Isfahan', kerman:'Kerman', kermanshah:'Kermanshah',
    khuzestan:'Khuzestan', 'kohgiluyeh-boyer-ahmad':'Kohgiluyeh and Boyer-Ahmad', kurdistan:'Kurdistan', lorestan:'Lorestan', markazi:'Markazi',
    mazandaran:'Mazandaran', 'north-khorasan':'North Khorasan', qazvin:'Qazvin', qom:'Qom', 'razavi-khorasan':'Razavi Khorasan',
    semnan:'Semnan', 'sistan-baluchestan':'Sistan and Baluchestan', 'south-khorasan':'South Khorasan', tehran:'Tehran', yazd:'Yazd', zanjan:'Zanjan'
  },
  de: {
    alborz:'Alborz', ardabil:'Ardabil', 'azerbaijan-east':'Ost-Aserbaidschan', 'azerbaijan-west':'West-Aserbaidschan',
    bushehr:'Buschehr', 'chaharmahal-bakhtiari':'Tschahār Mahāl und Bachtiyāri', fars:'Fars', gilan:'Gilan', golestan:'Golestan',
    hamadan:'Hamadan', hormozgan:'Hormozgan', ilam:'Ilam', isfahan:'Isfahan', kerman:'Kerman', kermanshah:'Kermanschah',
    khuzestan:'Chuzestan', 'kohgiluyeh-boyer-ahmad':'Kohgiluye und Boyer Ahmad', kurdistan:'Kurdistan', lorestan:'Lorestan', markazi:'Markazi',
    mazandaran:'Mazandaran', 'north-khorasan':'Nord-Chorasan', qazvin:'Qazvin', qom:'Ghom', 'razavi-khorasan':'Razavi-Chorasan',
    semnan:'Semnan', 'sistan-baluchestan':'Sistan und Belutschistan', 'south-khorasan':'Süd-Chorasan', tehran:'Teheran', yazd:'Yazd', zanjan:'Zandschan'
  }
};

const translations = {
  fa: {
    pageTitle:'یلدای ایران | انتخاب آهنگ استان‌ها', brand:'یلدای ایران', navMap:'نقشه', navSongs:'آهنگ‌ها', addSong:'افزودن آهنگ', languageLabel:'زبان',
    heroEyebrow:'یک یلدا، سی‌ویک صدا', heroTitle1:'آهنگ محبوب شهرت را', heroTitle2:'به نقشه یلدای ایران اضافه کن', heroText:'استانت را انتخاب کن، آهنگ پیشنهادی‌ات را ثبت کن و به انتخاب‌های بقیه رأی بده.', chooseProvince:'انتخاب استان',
    mapEyebrow:'از روی نقشه انتخاب کن', mapTitle:'استان موردنظرت کجاست؟', noneSelected:'هنوز استانی انتخاب نشده', mapLoading:'در حال آماده‌سازی نقشه تعاملی…', mapLoadError:'نقشه وکتوری آنلاین بارگذاری نشد؛ انتخاب از فهرست همچنان فعال است.', mapNote:'روی هر استان برو تا نام آن نمایش داده شود؛ با کلیک فقط همان استان انتخاب می‌شود.', selectedProvinceLabel:'استان انتخاب‌شده', provinceHelpDefault:'از روی نقشه یک استان را انتخاب کن.', addForProvince:'+ افزودن آهنگ برای این استان', songsCount:'آهنگ', likesCount:'لایک', chooseFromList:'انتخاب از فهرست', chooseProvinceOption:'یک استان را انتخاب کن',
    peopleChoice:'انتخاب مردم', popularSongs:'محبوب‌ترین آهنگ‌های یلدایی', songsOf:'آهنگ‌های یلدایی {province}', allProvinces:'همه استان‌ها', emptyTitle:'هنوز آهنگی ثبت نشده', emptyText:'اولین انتخاب این استان را تو اضافه کن.', footerText:'ساخته‌شده برای کنار هم شنیدن صداهای ایران',
    yourSuggestion:'پیشنهاد تو', addSongFor:'افزودن آهنگ برای', songName:'نام آهنگ', songPlaceholder:'مثلاً شب یلدا', artistName:'نام خواننده', artistPlaceholder:'نام خواننده یا گروه', songLink:'لینک آهنگ', optional:'(اختیاری)', yourName:'نام شما', guestPlaceholder:'مهمان یلدا', submitSong:'ثبت آهنگ', privacy:'آهنگ برای همه بازدیدکنندگان در پایگاه داده ثبت می‌شود.',
    selectedBadge:'استان انتخاب‌شده: {province}', provinceHelp:'حالا می‌توانی آهنگ محبوبت برای شب یلدا را به فهرست {province} اضافه کنی.', suggestedBy:'پیشنهاد از {name}', guest:'مهمان یلدا', listen:'شنیدن ↗', chooseFirst:'اول یک استان را انتخاب کن', addedSuccess:'آهنگ با موفقیت اضافه شد 🎉', loadError:'دریافت آهنگ‌ها ممکن نشد. تنظیمات Supabase را بررسی کن.', saveError:'ثبت آهنگ ممکن نشد. دوباره تلاش کن.', likeError:'ثبت لایک ممکن نشد.'
  },
  en: {
    pageTitle:'Yalda of Iran | Provincial Music Map', brand:'Yalda of Iran', navMap:'Map', navSongs:'Songs', addSong:'Add song', languageLabel:'Language',
    heroEyebrow:'One Yalda, thirty-one voices', heroTitle1:'Add your city’s favorite song', heroTitle2:'to Iran’s Yalda music map', heroText:'Choose your province, submit a song and vote for other people’s suggestions.', chooseProvince:'Choose a province',
    mapEyebrow:'Choose on the map', mapTitle:'Which province is yours?', noneSelected:'No province selected yet', mapLoading:'Preparing the interactive map…', mapLoadError:'The online vector map could not be loaded. You can still choose from the list.', mapNote:'Hover over a province to see its name. Click to select only that province.', selectedProvinceLabel:'Selected province', provinceHelpDefault:'Choose a province on the map.', addForProvince:'+ Add a song for this province', songsCount:'Songs', likesCount:'Likes', chooseFromList:'Choose from list', chooseProvinceOption:'Choose a province',
    peopleChoice:'People’s choice', popularSongs:'Most popular Yalda songs', songsOf:'Yalda songs from {province}', allProvinces:'All provinces', emptyTitle:'No songs yet', emptyText:'Be the first to add a song for this province.', footerText:'Made to hear the many voices of Iran together',
    yourSuggestion:'Your suggestion', addSongFor:'Add a song for', songName:'Song title', songPlaceholder:'For example: Shab-e Yalda', artistName:'Artist', artistPlaceholder:'Artist or band name', songLink:'Song link', optional:'(optional)', yourName:'Your name', guestPlaceholder:'Yalda guest', submitSong:'Submit song', privacy:'The song is stored in the shared database for every visitor.',
    selectedBadge:'Selected province: {province}', provinceHelp:'You can now add your favorite Yalda song to the {province} list.', suggestedBy:'Suggested by {name}', guest:'Yalda guest', listen:'Listen ↗', chooseFirst:'Choose a province first', addedSuccess:'Song added successfully 🎉', loadError:'Could not load songs. Check the Supabase setup.', saveError:'Could not submit the song. Please try again.', likeError:'Could not save the like.'
  },
  de: {
    pageTitle:'Yalda im Iran | Musikkarte der Provinzen', brand:'Yalda im Iran', navMap:'Karte', navSongs:'Lieder', addSong:'Lied hinzufügen', languageLabel:'Sprache',
    heroEyebrow:'Eine Yalda, einunddreißig Stimmen', heroTitle1:'Füge das Lieblingslied deiner Stadt', heroTitle2:'zur Yalda-Musikkarte Irans hinzu', heroText:'Wähle deine Provinz, schlage ein Lied vor und stimme für die Vorschläge anderer ab.', chooseProvince:'Provinz auswählen',
    mapEyebrow:'Auf der Karte auswählen', mapTitle:'Welche Provinz ist deine?', noneSelected:'Noch keine Provinz ausgewählt', mapLoading:'Interaktive Karte wird vorbereitet…', mapLoadError:'Die Online-Vektorkarte konnte nicht geladen werden. Die Auswahl aus der Liste funktioniert weiterhin.', mapNote:'Fahre über eine Provinz, um ihren Namen zu sehen. Mit einem Klick wird nur diese Provinz ausgewählt.', selectedProvinceLabel:'Ausgewählte Provinz', provinceHelpDefault:'Wähle eine Provinz auf der Karte aus.', addForProvince:'+ Lied für diese Provinz hinzufügen', songsCount:'Lieder', likesCount:'Likes', chooseFromList:'Aus Liste auswählen', chooseProvinceOption:'Provinz auswählen',
    peopleChoice:'Wahl der Community', popularSongs:'Beliebteste Yalda-Lieder', songsOf:'Yalda-Lieder aus {province}', allProvinces:'Alle Provinzen', emptyTitle:'Noch keine Lieder vorhanden', emptyText:'Füge das erste Lied für diese Provinz hinzu.', footerText:'Geschaffen, um die Stimmen Irans gemeinsam zu hören',
    yourSuggestion:'Dein Vorschlag', addSongFor:'Lied hinzufügen für', songName:'Liedtitel', songPlaceholder:'Zum Beispiel: Shab-e Yalda', artistName:'Interpret', artistPlaceholder:'Name des Interpreten oder der Band', songLink:'Link zum Lied', optional:'(optional)', yourName:'Dein Name', guestPlaceholder:'Yalda-Gast', submitSong:'Lied eintragen', privacy:'Das Lied wird für alle Besucher in der gemeinsamen Datenbank gespeichert.',
    selectedBadge:'Ausgewählte Provinz: {province}', provinceHelp:'Du kannst jetzt dein Lieblingslied für Yalda zur Liste von {province} hinzufügen.', suggestedBy:'Vorgeschlagen von {name}', guest:'Yalda-Gast', listen:'Anhören ↗', chooseFirst:'Wähle zuerst eine Provinz aus', addedSuccess:'Lied erfolgreich hinzugefügt 🎉', loadError:'Lieder konnten nicht geladen werden. Prüfe die Supabase-Einrichtung.', saveError:'Das Lied konnte nicht gespeichert werden. Bitte versuche es erneut.', likeError:'Der Like konnte nicht gespeichert werden.'
  }
};

const normalizeId = id => id?.toLowerCase().trim().replaceAll('_','-').replaceAll(' ','-');
const provinceAliases = {
  'chahar-mahal-and-bakhtiari':'chaharmahal-bakhtiari', 'chaharmahal-and-bakhtiari':'chaharmahal-bakhtiari',
  'chahar-mahal-bakhtiari':'chaharmahal-bakhtiari', 'chaharmahal-bakhriari':'chaharmahal-bakhtiari',
  'kohgiluyeh-and-boyer-ahmad':'kohgiluyeh-boyer-ahmad', 'kohgiluyeh-va-boyer-ahmad':'kohgiluyeh-boyer-ahmad',
  'kohgiluyeh-boyerahmad':'kohgiluyeh-boyer-ahmad', 'khorasan-north':'north-khorasan',
  'khorasan-razavi':'razavi-khorasan', 'khorasan-south':'south-khorasan',
  'north-khorasan-province':'north-khorasan', 'razavi-khorasan-province':'razavi-khorasan', 'south-khorasan-province':'south-khorasan'
};
const resolveProvinceId = raw => {
  const id = normalizeId(raw); if (!id) return '';
  const compact = id.replace(/[^a-z]/g,'');
  if ((compact.includes('chahar') || compact.includes('charmahal') || compact.includes('chaharmahal')) && (compact.includes('bakht') || compact.includes('bakhr'))) return 'chaharmahal-bakhtiari';
  if ((compact.includes('kohg') || compact.includes('kohk') || compact.includes('kohgil') || compact.includes('boyer')) && (compact.includes('boyer') || compact.includes('ahmad'))) return 'kohgiluyeh-boyer-ahmad';
  return provinceAliases[id] || id;
};

const provinceColors=['#7a2638','#9d3d48','#b85d4d','#6a3746','#a66a3f','#8b4a3e','#5f4553','#a54c58'];
const SUPABASE_URL='https://rvtufzcwjvvnonggqzoj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_ylwegXC8xWEmlGSkQu4byw_3zQFKQBQ';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
let currentLang = localStorage.getItem('yaldaLanguage') || 'fa';
if (!translations[currentLang]) currentLang = 'fa';
let selected = '';
let songs=[];
const likedSongIds=new Set(JSON.parse(localStorage.getItem('yaldaLikedSongs')||'[]'));
const $=s=>document.querySelector(s);
const t=(key,vars={})=>Object.entries(vars).reduce((text,[k,v])=>text.replaceAll(`{${k}}`,v),translations[currentLang][key]||key);
const provinceName=id=>provinceNames[currentLang][id] || provinceNames.en[id] || id;
const mapStage=$('#mapStage'), tooltip=$('#tooltip'), status=$('#mapStatus'), svgLayer=$('#svgLayer');
const provinceFallback=$('#provinceFallback'), filterProvince=$('#filterProvince');

function number(n){return new Intl.NumberFormat(currentLang==='fa'?'fa-IR':currentLang==='de'?'de-DE':'en-US').format(n)}
function rebuildProvinceOptions(){
  const fallbackValue=provinceFallback.value, filterValue=filterProvince.value || 'all';
  provinceFallback.innerHTML=`<option value="">${t('chooseProvinceOption')}</option>`;
  filterProvince.innerHTML=`<option value="all">${t('allProvinces')}</option>`;
  Object.keys(provinceNames.fa).sort((a,b)=>provinceName(a).localeCompare(provinceName(b),currentLang)).forEach(id=>{
    provinceFallback.insertAdjacentHTML('beforeend',`<option value="${id}">${provinceName(id)}</option>`);
    filterProvince.insertAdjacentHTML('beforeend',`<option value="${id}">${provinceName(id)}</option>`);
  });
  provinceFallback.value=fallbackValue; filterProvince.value=filterValue;
}
function applyLanguage(lang){
  currentLang=translations[lang]?lang:'fa'; localStorage.setItem('yaldaLanguage',currentLang);
  document.documentElement.lang=currentLang; document.documentElement.dir=currentLang==='fa'?'rtl':'ltr'; document.title=t('pageTitle');
  $('#languageSelect').value=currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder)});
  $('#closeDialog').setAttribute('aria-label',currentLang==='fa'?'بستن':currentLang==='de'?'Schließen':'Close');
  rebuildProvinceOptions();
  svgLayer.querySelectorAll('#provinces path').forEach(path=>path.setAttribute('aria-label',provinceName(path.dataset.province)));
  if(selected){
    $('#selectedProvince').textContent=provinceName(selected);
    $('#selectedBadge').textContent=t('selectedBadge',{province:provinceName(selected)});
    $('#provinceHelp').textContent=t('provinceHelp',{province:provinceName(selected)});
    $('#dialogProvince').textContent=provinceName(selected);
  } else {
    $('#selectedBadge').textContent=t('noneSelected'); $('#provinceHelp').textContent=t('provinceHelpDefault');
  }
  renderSongs(); updateStats();
}

async function loadMap(){
  try{
    const url='https://raw.githubusercontent.com/nastoohir/iran-map-svg/master/iran.svg';
    const text=await (await fetch(url)).text(); if(!text.includes('<svg')) throw new Error('invalid svg');
    svgLayer.innerHTML=text; const svg=svgLayer.querySelector('svg'); svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    svg.querySelectorAll('#provinces path').forEach((path,index)=>{
      const id=resolveProvinceId(path.id); path.dataset.province=id; path.style.setProperty('--province-color',provinceColors[index%provinceColors.length]);
      path.setAttribute('tabindex','0'); path.setAttribute('role','button'); path.setAttribute('aria-label',provinceName(id));
      path.addEventListener('pointerenter',e=>showTip(e,provinceName(id))); path.addEventListener('pointermove',moveTip); path.addEventListener('pointerleave',hideTip);
      path.addEventListener('click',e=>{selectProvince(id);e.currentTarget.blur?.();document.activeElement?.blur?.();}); path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectProvince(id)}});
    }); status.remove();
  }catch(err){ status.textContent=t('mapLoadError'); status.style.color='#7a2638'; }
}
function showTip(e,name){tooltip.textContent=name;tooltip.classList.add('show');moveTip(e)}
function moveTip(e){const r=mapStage.getBoundingClientRect();tooltip.style.left=`${e.clientX-r.left}px`;tooltip.style.top=`${e.clientY-r.top}px`}
function hideTip(){tooltip.classList.remove('show')}
function selectProvince(id){
  if(!provinceNames.fa[id]) return; selected=id;
  svgLayer.querySelectorAll('#provinces path').forEach(p=>p.classList.toggle('is-selected',p.dataset.province===id));
  $('#selectedProvince').textContent=provinceName(id); $('#selectedBadge').textContent=t('selectedBadge',{province:provinceName(id)});
  $('#provinceHelp').textContent=t('provinceHelp',{province:provinceName(id)}); $('#addSongBtn').disabled=false;
  provinceFallback.value=id; filterProvince.value=id; renderSongs(); updateStats();
}
provinceFallback.addEventListener('change',e=>e.target.value&&selectProvince(e.target.value));
filterProvince.addEventListener('change',renderSongs);
$('#languageSelect').addEventListener('change',e=>applyLanguage(e.target.value));
function updateStats(){const list=songs.filter(s=>s.province===selected);$('#provinceSongCount').textContent=number(list.length);$('#provinceLikeCount').textContent=number(list.reduce((a,s)=>a+s.likes,0))}
function renderSongs(){
  const filter=filterProvince.value || 'all'; const list=songs.filter(s=>filter==='all'||s.province===filter).sort((a,b)=>b.likes-a.likes);
  $('#songsTitle').textContent=filter==='all'?t('popularSongs'):t('songsOf',{province:provinceName(filter)});
  $('#songsGrid').innerHTML=list.map(song=>`<article class="song-card">
    <div class="song-top"><div><h3>${escapeHtml(song.title)}</h3><p class="artist">${escapeHtml(song.artist)}</p></div><span class="province-chip">${provinceName(song.province)}</span></div>
    <div class="song-meta">${t('suggestedBy',{name:escapeHtml(song.by||t('guest'))})}</div>
    <div class="song-actions"><button class="like-btn ${song.liked?'liked':''}" data-like="${song.id}">♥ ${number(song.likes)}</button>${song.link?`<a class="listen-link" target="_blank" rel="noopener" href="${escapeAttr(song.link)}">${t('listen')}</a>`:''}</div>
  </article>`).join('');
  $('#emptyState').hidden=!!list.length; document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>toggleLike(Number(btn.dataset.like))));
}
async function loadSongs(){
  const {data,error}=await db.from('songs').select('*').order('likes',{ascending:false}).order('created_at',{ascending:false});
  if(error){console.error(error);toast(t('loadError'));return}
  songs=data.map(song=>({...song,by:song.submitted_by,liked:likedSongIds.has(song.id)}));
  renderSongs();updateStats();
}
async function toggleLike(id){
  const song=songs.find(x=>x.id===id);if(!song)return;
  const wasLiked=song.liked,changeBy=wasLiked?-1:1;
  song.liked=!wasLiked;song.likes=Math.max(0,song.likes+changeBy);renderSongs();updateStats();
  const {data,error}=await db.rpc('adjust_song_likes',{song_id:id,change_by:changeBy});
  if(error){song.liked=wasLiked;song.likes=Math.max(0,song.likes-changeBy);renderSongs();updateStats();console.error(error);toast(t('likeError'));return}
  song.likes=data;song.liked?likedSongIds.add(id):likedSongIds.delete(id);
  localStorage.setItem('yaldaLikedSongs',JSON.stringify([...likedSongIds]));renderSongs();updateStats();
}
const dialog=$('#songDialog');
function openDialog(){if(!selected){toast(t('chooseFirst'));return}$('#dialogProvince').textContent=provinceName(selected);dialog.showModal();setTimeout(()=>$('#songTitle').focus(),50)}
$('#addSongBtn').addEventListener('click',openDialog); $('#openAddTop').addEventListener('click',()=>{if(selected)openDialog();else document.querySelector('#map-section').scrollIntoView()});
$('#closeDialog').addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
$('#songForm').addEventListener('submit',async e=>{
  e.preventDefault();const submitButton=e.target.querySelector('[type="submit"]');submitButton.disabled=true;
  const payload={province:selected,title:$('#songTitle').value.trim(),artist:$('#artistName').value.trim(),link:$('#songLink').value.trim()||null,submitted_by:$('#submitter').value.trim()||t('guest')};
  const {data,error}=await db.from('songs').insert(payload).select().single();submitButton.disabled=false;
  if(error){console.error(error);toast(t('saveError'));return}
  songs.push({...data,by:data.submitted_by,liked:false});e.target.reset();dialog.close();filterProvince.value=selected;renderSongs();updateStats();toast(t('addedSuccess'));document.querySelector('#songs-section').scrollIntoView({behavior:'smooth'});
});
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function escapeAttr(v=''){return escapeHtml(v)}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}

applyLanguage(currentLang);loadMap();loadSongs();
