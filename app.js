// Paste the values from Supabase > Project Settings > API here.
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const backendReady = !SUPABASE_URL.startsWith('YOUR_') && !SUPABASE_ANON_KEY.startsWith('YOUR_');
const supabaseClient = backendReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
let currentUser = null;

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
    pageTitle:'یلدای ایران | انتخاب آهنگ استان‌ها', brand:'یلدای ایران', navMap:'نقشه', navSongs:'آهنگ‌ها', navStory:'درباره یلدا', navEvent:'مراسم', navFaq:'سؤالات', addSong:'افزودن آهنگ', languageLabel:'زبان',
    heroEyebrow:'یک یلدا، سی‌ویک صدا', heroTitle1:'آهنگ محبوب شهرت را', heroTitle2:'به نقشه یلدای ایران اضافه کن', heroText:'استانت را انتخاب کن، آهنگ پیشنهادی‌ات را ثبت کن و به انتخاب‌های بقیه رأی بده.', chooseProvince:'انتخاب استان',
    mapEyebrow:'از روی نقشه انتخاب کن', mapTitle:'استان موردنظرت کجاست؟', noneSelected:'هنوز استانی انتخاب نشده', mapLoading:'در حال آماده‌سازی نقشه تعاملی…', mapLoadError:'نقشه وکتوری آنلاین بارگذاری نشد؛ انتخاب از فهرست همچنان فعال است.', mapNote:'روی هر استان برو تا نام آن نمایش داده شود؛ با کلیک فقط همان استان انتخاب می‌شود.', selectedProvinceLabel:'استان انتخاب‌شده', provinceHelpDefault:'از روی نقشه یک استان را انتخاب کن.', addForProvince:'+ افزودن آهنگ برای این استان', songsCount:'آهنگ', likesCount:'لایک', chooseFromList:'انتخاب از فهرست', chooseProvinceOption:'یک استان را انتخاب کن',
    peopleChoice:'انتخاب مردم', popularSongs:'محبوب‌ترین آهنگ‌های یلدایی', songsOf:'آهنگ‌های یلدایی {province}', allProvinces:'همه استان‌ها', emptyTitle:'هنوز آهنگی ثبت نشده', emptyText:'اولین انتخاب این استان را تو اضافه کن.', footerText:'ساخته‌شده برای کنار هم شنیدن صداهای ایران',
    yourSuggestion:'پیشنهاد تو', addSongFor:'افزودن آهنگ برای', songName:'نام آهنگ', songPlaceholder:'مثلاً شب یلدا', artistName:'نام خواننده', artistPlaceholder:'نام خواننده یا گروه', songLink:'لینک آهنگ', optional:'(اختیاری)', yourName:'نام شما', guestPlaceholder:'مهمان یلدا', submitSong:'ثبت آهنگ', privacy:'نسخه آزمایشی اطلاعات را در مرورگر خودت ذخیره می‌کند.',
    selectedBadge:'استان انتخاب‌شده: {province}', provinceHelp:'حالا می‌توانی آهنگ محبوبت برای شب یلدا را به فهرست {province} اضافه کنی.', suggestedBy:'پیشنهاد از {name}', guest:'مهمان یلدا', listen:'شنیدن ↗', chooseFirst:'اول یک استان را انتخاب کن', addedSuccess:'آهنگ با موفقیت اضافه شد 🎉',
    eventEyebrow:'دورهمی شب یلدا', eventTitle:'اطلاعات جشن', ageBadge:'ورود برای ۱۸ سال به بالا', venueLabel:'محل برگزاری', eventAudience:'این جشن برای همه آزاد است و فقط مخصوص دانشجویان نیست.', dateLabel:'تاریخ', eventDate:'جمعه ۱۸ دسامبر ۲۰۲۶', timeLabel:'زمان شروع', eventTime:'ساعت ۲۲:۰۰', addressLabel:'آدرس', openMap:'نمایش در Google Maps ↗',
    storyEyebrow:'قصه بلندترین شب سال', storyTitle:'چرا ایرانی‌ها شب یلدا را جشن می‌گیرند؟', storyLead:'یلدا، شب آخر پاییز و بلندترین شب سال، جشنی دیرینه برای استقبال از روشنایی و بلندترشدن روزهاست؛ شبی که خانواده‌ها و دوستان را دور یک سفره جمع می‌کند.', historyTitle:'ریشه و معنای یلدا', historyText1:'واژه «یلدا» به معنای زایش است و این جشن با انقلاب زمستانی پیوند دارد. از فردای یلدا، روزها آرام‌آرام بلندتر می‌شوند؛ به همین دلیل این شب در فرهنگ ایرانی نماد پیروزی نور بر تاریکی و امید به آغاز دوباره است.', historyText2:'این آیین در طول سده‌ها در بخش‌های مختلف ایران با رسم‌های محلی گوناگون ادامه یافته، اما قلب آن همیشه یکی بوده است: باهم‌بودن، قصه‌گویی و گرم‌کردن سردترین شب‌های سال.', traditionFoodTitle:'سفره رنگارنگ', traditionFoodText:'هندوانه، انار، آجیل و میوه خشک پای ثابت سفره یلدا هستند. سرخی انار و هندوانه یادآور گرمای خورشید و شادی است.', traditionPoetryTitle:'فال حافظ و شعرخوانی', traditionPoetryText:'بسیاری از خانواده‌ها دیوان حافظ را باز می‌کنند، شعر می‌خوانند و تعبیر آن را با آرزوهایشان پیوند می‌دهند.', hafezCta:'فال حافظ بگیر ↗', traditionFamilyTitle:'دورهمی و قصه‌گویی', traditionFamilyText:'خانواده‌ها معمولاً در خانه بزرگ‌ترها جمع می‌شوند، شام می‌خورند، خاطره تعریف می‌کنند، موسیقی گوش می‌دهند و تا پاسی از شب بیدار می‌مانند.',
    faqEyebrow:'پیش از آمدن بدانید', faqTitle:'سؤالات متداول', faqIntro:'پاسخ کوتاه به مهم‌ترین سؤال‌ها درباره جشن و ثبت آهنگ.', faqStudentsQ:'آیا جشن فقط برای دانشجویان است؟', faqStudentsA:'خیر. شرکت در جشن برای همه آزاد است.', faqAgeQ:'آیا محدودیت سنی وجود دارد؟', faqAgeA:'بله. ورود فقط برای افراد ۱۸ سال و بالاتر امکان‌پذیر است.', faqSongsQ:'محدودیت افزودن آهنگ چگونه است؟', faqSongsA:'برای افزودن آهنگ باید وارد حساب خود شوید. هر حساب می‌تواند هر ۶۰ ثانیه یک آهنگ ثبت کند و فعلاً سقفی برای تعداد کل آهنگ‌ها وجود ندارد.', faqWhereQ:'جشن کجا و چه زمانی برگزار می‌شود؟', faqWhereA:'جمعه ۱۸ دسامبر ۲۰۲۶ از ساعت ۲۲:۰۰ در KulturCafé، Universitätsstraße 150, 44801 Bochum Süd.'
  },
  en: {
    pageTitle:'Yalda of Iran | Provincial Music Map', brand:'Yalda of Iran', navMap:'Map', navSongs:'Songs', navStory:'About Yalda', navEvent:'Event', navFaq:'FAQ', addSong:'Add song', languageLabel:'Language',
    heroEyebrow:'One Yalda, thirty-one voices', heroTitle1:'Add your city’s favorite song', heroTitle2:'to Iran’s Yalda music map', heroText:'Choose your province, submit a song and vote for other people’s suggestions.', chooseProvince:'Choose a province',
    mapEyebrow:'Choose on the map', mapTitle:'Which province is yours?', noneSelected:'No province selected yet', mapLoading:'Preparing the interactive map…', mapLoadError:'The online vector map could not be loaded. You can still choose from the list.', mapNote:'Hover over a province to see its name. Click to select only that province.', selectedProvinceLabel:'Selected province', provinceHelpDefault:'Choose a province on the map.', addForProvince:'+ Add a song for this province', songsCount:'Songs', likesCount:'Likes', chooseFromList:'Choose from list', chooseProvinceOption:'Choose a province',
    peopleChoice:'People’s choice', popularSongs:'Most popular Yalda songs', songsOf:'Yalda songs from {province}', allProvinces:'All provinces', emptyTitle:'No songs yet', emptyText:'Be the first to add a song for this province.', footerText:'Made to hear the many voices of Iran together',
    yourSuggestion:'Your suggestion', addSongFor:'Add a song for', songName:'Song title', songPlaceholder:'For example: Shab-e Yalda', artistName:'Artist', artistPlaceholder:'Artist or band name', songLink:'Song link', optional:'(optional)', yourName:'Your name', guestPlaceholder:'Yalda guest', submitSong:'Submit song', privacy:'This prototype stores data in your own browser.',
    selectedBadge:'Selected province: {province}', provinceHelp:'You can now add your favorite Yalda song to the {province} list.', suggestedBy:'Suggested by {name}', guest:'Yalda guest', listen:'Listen ↗', chooseFirst:'Choose a province first', addedSuccess:'Song added successfully 🎉',
    eventEyebrow:'Yalda Night gathering', eventTitle:'Event information', ageBadge:'Admission: ages 18+', venueLabel:'Venue', eventAudience:'The event is open to everyone and is not limited to students.', dateLabel:'Date', eventDate:'Friday, 18 December 2026', timeLabel:'Starts at', eventTime:'22:00', addressLabel:'Address', openMap:'Open in Google Maps ↗',
    storyEyebrow:'The story of the longest night', storyTitle:'Why do Iranians celebrate Yalda Night?', storyLead:'Yalda, the final night of autumn and the longest night of the year, is an ancient celebration welcoming the return of light and longer days—a night that gathers family and friends around one table.', historyTitle:'Yalda’s roots and meaning', historyText1:'The word “Yalda” means birth, and the celebration is connected to the winter solstice. From the following day, daylight gradually grows longer; in Iranian culture the night therefore symbolizes light overcoming darkness and hope for a new beginning.', historyText2:'Over the centuries, communities across Iran have kept the tradition alive through many local customs. Its heart has remained the same: being together, sharing stories and bringing warmth to the coldest nights of the year.', traditionFoodTitle:'A colorful table', traditionFoodText:'Watermelon, pomegranates, nuts and dried fruit are Yalda staples. The red of pomegranate and watermelon evokes the warmth of the sun and joy.', traditionPoetryTitle:'Hafez and poetry', traditionPoetryText:'Many families open the Divan of Hafez, read a poem and connect its interpretation with their hopes and wishes.', hafezCta:'Get a Hafez fortune ↗', traditionFamilyTitle:'Family and storytelling', traditionFamilyText:'Families often gather at the elders’ home, share dinner and memories, listen to music and stay awake late into the night.',
    faqEyebrow:'Good to know', faqTitle:'Frequently asked questions', faqIntro:'Quick answers to the most important questions about the event and song submissions.', faqStudentsQ:'Is the event only for students?', faqStudentsA:'No. The event is open to everyone.', faqAgeQ:'Is there an age restriction?', faqAgeA:'Yes. Admission is limited to guests aged 18 and over.', faqSongsQ:'What are the song submission limits?', faqSongsA:'You must be signed in to add a song. Each account can submit one song every 60 seconds, and there is currently no overall submission limit.', faqWhereQ:'Where and when is the event?', faqWhereA:'Friday, 18 December 2026 from 22:00 at KulturCafé, Universitätsstraße 150, 44801 Bochum Süd.'
  },
  de: {
    pageTitle:'Yalda im Iran | Musikkarte der Provinzen', brand:'Yalda im Iran', navMap:'Karte', navSongs:'Lieder', navStory:'Über Yalda', navEvent:'Feier', navFaq:'FAQ', addSong:'Lied hinzufügen', languageLabel:'Sprache',
    heroEyebrow:'Eine Yalda, einunddreißig Stimmen', heroTitle1:'Füge das Lieblingslied deiner Stadt', heroTitle2:'zur Yalda-Musikkarte Irans hinzu', heroText:'Wähle deine Provinz, schlage ein Lied vor und stimme für die Vorschläge anderer ab.', chooseProvince:'Provinz auswählen',
    mapEyebrow:'Auf der Karte auswählen', mapTitle:'Welche Provinz ist deine?', noneSelected:'Noch keine Provinz ausgewählt', mapLoading:'Interaktive Karte wird vorbereitet…', mapLoadError:'Die Online-Vektorkarte konnte nicht geladen werden. Die Auswahl aus der Liste funktioniert weiterhin.', mapNote:'Fahre über eine Provinz, um ihren Namen zu sehen. Mit einem Klick wird nur diese Provinz ausgewählt.', selectedProvinceLabel:'Ausgewählte Provinz', provinceHelpDefault:'Wähle eine Provinz auf der Karte aus.', addForProvince:'+ Lied für diese Provinz hinzufügen', songsCount:'Lieder', likesCount:'Likes', chooseFromList:'Aus Liste auswählen', chooseProvinceOption:'Provinz auswählen',
    peopleChoice:'Wahl der Community', popularSongs:'Beliebteste Yalda-Lieder', songsOf:'Yalda-Lieder aus {province}', allProvinces:'Alle Provinzen', emptyTitle:'Noch keine Lieder vorhanden', emptyText:'Füge das erste Lied für diese Provinz hinzu.', footerText:'Geschaffen, um die Stimmen Irans gemeinsam zu hören',
    yourSuggestion:'Dein Vorschlag', addSongFor:'Lied hinzufügen für', songName:'Liedtitel', songPlaceholder:'Zum Beispiel: Shab-e Yalda', artistName:'Interpret', artistPlaceholder:'Name des Interpreten oder der Band', songLink:'Link zum Lied', optional:'(optional)', yourName:'Dein Name', guestPlaceholder:'Yalda-Gast', submitSong:'Lied eintragen', privacy:'Dieser Prototyp speichert die Daten in deinem Browser.',
    selectedBadge:'Ausgewählte Provinz: {province}', provinceHelp:'Du kannst jetzt dein Lieblingslied für Yalda zur Liste von {province} hinzufügen.', suggestedBy:'Vorgeschlagen von {name}', guest:'Yalda-Gast', listen:'Anhören ↗', chooseFirst:'Wähle zuerst eine Provinz aus', addedSuccess:'Lied erfolgreich hinzugefügt 🎉',
    eventEyebrow:'Yalda-Nacht-Treffen', eventTitle:'Informationen zur Feier', ageBadge:'Einlass ab 18 Jahren', venueLabel:'Veranstaltungsort', eventAudience:'Die Feier ist für alle offen und nicht nur für Studierende.', dateLabel:'Datum', eventDate:'Freitag, 18. Dezember 2026', timeLabel:'Beginn', eventTime:'22:00 Uhr', addressLabel:'Adresse', openMap:'In Google Maps öffnen ↗',
    storyEyebrow:'Die Geschichte der längsten Nacht', storyTitle:'Warum feiern Iranerinnen und Iraner die Yalda-Nacht?', storyLead:'Yalda, die letzte Nacht des Herbstes und die längste Nacht des Jahres, ist ein altes Fest zur Begrüßung des Lichts und der wieder länger werdenden Tage – eine Nacht, die Familie und Freunde an einem Tisch vereint.', historyTitle:'Ursprung und Bedeutung', historyText1:'Das Wort „Yalda“ bedeutet Geburt; das Fest ist mit der Wintersonnenwende verbunden. Vom nächsten Tag an werden die Tage allmählich länger. Deshalb steht diese Nacht in der iranischen Kultur für den Sieg des Lichts über die Dunkelheit und die Hoffnung auf einen Neuanfang.', historyText2:'Über Jahrhunderte wurde der Brauch in den verschiedenen Regionen Irans mit unterschiedlichen lokalen Traditionen weitergegeben. Sein Herz blieb gleich: Zusammensein, Geschichten erzählen und den kältesten Nächten Wärme schenken.', traditionFoodTitle:'Ein farbenfroher Tisch', traditionFoodText:'Wassermelone, Granatapfel, Nüsse und Trockenfrüchte gehören zu Yalda. Das Rot von Granatapfel und Wassermelone erinnert an Sonnenwärme und Freude.', traditionPoetryTitle:'Hafez und Poesie', traditionPoetryText:'Viele Familien öffnen den Diwan von Hafez, lesen ein Gedicht und verbinden seine Deutung mit ihren Hoffnungen und Wünschen.', hafezCta:'Hafez-Orakel öffnen ↗', traditionFamilyTitle:'Familie und Geschichten', traditionFamilyText:'Familien treffen sich oft bei den Älteren, essen gemeinsam, erzählen Erinnerungen, hören Musik und bleiben bis spät in die Nacht wach.',
    faqEyebrow:'Gut zu wissen', faqTitle:'Häufig gestellte Fragen', faqIntro:'Kurze Antworten auf die wichtigsten Fragen zur Feier und zum Eintragen von Liedern.', faqStudentsQ:'Ist die Feier nur für Studierende?', faqStudentsA:'Nein. Die Feier ist für alle offen.', faqAgeQ:'Gibt es eine Altersbeschränkung?', faqAgeA:'Ja. Der Einlass ist nur für Personen ab 18 Jahren möglich.', faqSongsQ:'Welche Beschränkungen gelten beim Hinzufügen von Liedern?', faqSongsA:'Um ein Lied hinzuzufügen, musst du angemeldet sein. Jedes Konto kann alle 60 Sekunden ein Lied eintragen; derzeit gibt es keine Gesamtobergrenze.', faqWhereQ:'Wo und wann findet die Feier statt?', faqWhereA:'Am Freitag, 18. Dezember 2026 ab 22:00 Uhr im KulturCafé, Universitätsstraße 150, 44801 Bochum Süd.'
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
let currentLang = localStorage.getItem('yaldaLanguage') || 'fa';
if (!translations[currentLang]) currentLang = 'fa';
let selected = '';
const fallbackSongs = [
  {id:1,province:'fars',title:'شب یلدا',artist:'گروه دنگ شو',link:'https://www.youtube.com/results?search_query=شب+یلدا+آهنگ',by:'سارا',likes:18,liked:false},
  {id:2,province:'gilan',title:'گل انار',artist:'آهنگ محلی گیلکی',link:'https://www.youtube.com/results?search_query=آهنگ+محلی+گیلکی+یلدا',by:'امیر',likes:14,liked:false},
  {id:3,province:'tehran',title:'زمستون',artist:'افشین مقدم',link:'https://www.youtube.com/results?search_query=افشین+مقدم+زمستون',by:'مهمان یلدا',likes:31,liked:false}
];
let songs = fallbackSongs;
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
async function toggleLike(id){
  if(!requireLogin()) return;
  const song=songs.find(item=>item.id===id); if(!song) return;
  const query=supabaseClient.from('song_likes');
  const {error}=song.liked
    ? await query.delete().eq('song_id',id).eq('user_id',currentUser.id)
    : await query.insert({song_id:id,user_id:currentUser.id});
  if(error){toast('ثبت رأی انجام نشد');return}
  song.liked=!song.liked; song.likes+=song.liked?1:-1; renderSongs(); updateStats();
}
const dialog=$('#songDialog');
function openDialog(){if(!selected){toast(t('chooseFirst'));return}if(!requireLogin())return;$('#dialogProvince').textContent=provinceName(selected);dialog.showModal();setTimeout(()=>$('#songTitle').focus(),50)}
$('#addSongBtn').addEventListener('click',openDialog); $('#openAddTop').addEventListener('click',()=>{if(selected)openDialog();else document.querySelector('#map-section').scrollIntoView()});
$('#closeDialog').addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
$('#songForm').addEventListener('submit',async e=>{
  e.preventDefault(); if(!requireLogin())return;
  const submitButton=e.target.querySelector('[type="submit"]'); submitButton.disabled=true;
  const payload={province:selected,title:$('#songTitle').value.trim(),artist:$('#artistName').value.trim(),link:$('#songLink').value.trim()||null,submitted_by:$('#submitter').value.trim(),user_id:currentUser.id};
  const {error}=await supabaseClient.from('songs').insert(payload);
  submitButton.disabled=false;
  if(error){toast(error.message.includes('wait')?'لطفاً ۶۰ ثانیه تا ثبت آهنگ بعدی صبر کنید':'ثبت آهنگ انجام نشد');return}
  e.target.reset();dialog.close();filterProvince.value=selected;await loadSongs();toast(t('addedSuccess'));document.querySelector('#songs-section').scrollIntoView({behavior:'smooth'});
});
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function escapeAttr(v=''){return escapeHtml(v)}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}

const authDialog=$('#authDialog'); let authMode='login';
function requireLogin(){
  if(!backendReady){toast('ابتدا اطلاعات Supabase را در app.js وارد کنید');return false}
  if(currentUser)return true;
  authDialog.showModal();return false;
}
function renderAuth(){
  $('#authButton').textContent=currentUser?'حساب من':'ورود / ثبت‌نام';
  $('#accountEmail').textContent=currentUser?.email||'';
  if(currentUser&&!$('#submitter').value)$('#submitter').value=currentUser.user_metadata?.display_name||currentUser.email.split('@')[0];
}
$('#authButton').addEventListener('click',()=>{if(currentUser){$('#accountMenu').hidden=!$('#accountMenu').hidden}else authDialog.showModal()});
$('#closeAuthDialog').addEventListener('click',()=>authDialog.close());
authDialog.addEventListener('click',e=>{if(e.target===authDialog)authDialog.close()});
$('#authModeToggle').addEventListener('click',()=>{
  authMode=authMode==='login'?'signup':'login';
  $('#authTitle').textContent=authMode==='login'?'ورود به یلدای ایران':'ساخت حساب جدید';
  $('#authSubmit').textContent=authMode==='login'?'ورود':'ثبت‌نام';
  $('#authModeToggle').textContent=authMode==='login'?'حساب ندارید؟ ثبت‌نام کنید':'حساب دارید؟ وارد شوید';
  $('#authMessage').textContent='';
});
$('#authForm').addEventListener('submit',async e=>{
  e.preventDefault(); if(!backendReady){$('#authMessage').textContent='اطلاعات اتصال Supabase هنوز وارد نشده است.';return}
  const email=$('#authEmail').value.trim(),password=$('#authPassword').value;
  $('#authSubmit').disabled=true;
  const result=authMode==='login'?await supabaseClient.auth.signInWithPassword({email,password}):await supabaseClient.auth.signUp({email,password});
  $('#authSubmit').disabled=false;
  if(result.error){$('#authMessage').textContent=result.error.message;return}
  if(authMode==='signup'&&!result.data.session){$('#authMessage').textContent='لینک تأیید برای ایمیل شما ارسال شد.';return}
  authDialog.close();e.target.reset();toast('با موفقیت وارد شدید');
});
$('#signOutButton').addEventListener('click',async()=>{await supabaseClient.auth.signOut();$('#accountMenu').hidden=true;toast('از حساب خارج شدید')});

async function loadSongs(){
  if(!backendReady){songs=fallbackSongs;renderSongs();updateStats();return}
  const [{data:rows,error},{data:likes}]=await Promise.all([
    supabaseClient.from('songs').select('id,province,title,artist,link,submitted_by,created_at').order('created_at',{ascending:false}),
    supabaseClient.from('song_likes').select('song_id,user_id')
  ]);
  if(error){toast('دریافت آهنگ‌ها انجام نشد');return}
  const allLikes=likes||[];
  songs=(rows||[]).map(row=>({...row,by:row.submitted_by,likes:allLikes.filter(l=>l.song_id===row.id).length,liked:!!currentUser&&allLikes.some(l=>l.song_id===row.id&&l.user_id===currentUser.id)}));
  renderSongs();updateStats();
}

async function initAuth(){
  if(!backendReady){renderAuth();await loadSongs();return}
  const {data}=await supabaseClient.auth.getSession(); currentUser=data.session?.user||null;renderAuth();await loadSongs();
  supabaseClient.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;renderAuth();loadSongs()});
}

function initRevealAnimations(){
  const items=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){items.forEach(item=>item.classList.add('is-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.14});
  items.forEach(item=>observer.observe(item));
}

applyLanguage(currentLang); loadMap(); initRevealAnimations(); initAuth();
