import { useState, useEffect, useRef, useCallback } from "react";

// ─── TTS ───────────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "el-GR"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// ─── DATA ──────────────────────────────────────────────────
const SECTION1 = {
  id:"s1", title:"Εισαγωγική Ενότητα", subtitle:"Вводный раздел",
  units:[
    {
      id:"s1u1", title:"Γνωρίζω τις λέξεις", subtitle:"Знакомство со словами", emoji:"🃏",
      words:[
        {id:1,greek:"αεροπλάνο",ru:"самолёт",emoji:"✈️",cat:"Транспорт"},
        {id:2,greek:"βαπόρι",ru:"пароход",emoji:"🚢",cat:"Транспорт"},
        {id:3,greek:"τρένο",ru:"поезд",emoji:"🚆",cat:"Транспорт"},
        {id:4,greek:"ταξί",ru:"такси",emoji:"🚕",cat:"Транспорт"},
        {id:5,greek:"λεμόνι",ru:"лимон",emoji:"🍋",cat:"Еда"},
        {id:6,greek:"μπίρα",ru:"пиво",emoji:"🍺",cat:"Еда"},
        {id:7,greek:"σαλάτα",ru:"салат",emoji:"🥗",cat:"Еда"},
        {id:8,greek:"σούσι",ru:"суши",emoji:"🍣",cat:"Еда"},
        {id:9,greek:"κρουασάν",ru:"круассан",emoji:"🥐",cat:"Еда"},
        {id:10,greek:"κρέπα",ru:"блин/крепа",emoji:"🫓",cat:"Еда"},
        {id:11,greek:"ζάρι",ru:"игральный кубик",emoji:"🎲",cat:"Другое"},
        {id:12,greek:"μαγαζί",ru:"магазин",emoji:"🏪",cat:"Другое"},
        {id:13,greek:"κιμονό",ru:"кимоно",emoji:"👘",cat:"Одежда"},
        {id:14,greek:"κιθάρα",ru:"гитара",emoji:"🎸",cat:"Музыка"},
        {id:15,greek:"πιάνο",ru:"пианино",emoji:"🎹",cat:"Музыка"},
        {id:16,greek:"βάζο",ru:"ваза",emoji:"🏺",cat:"Дом"},
        {id:17,greek:"καναπές",ru:"диван",emoji:"🛋️",cat:"Дом"},
        {id:18,greek:"ντουλάπι",ru:"шкаф",emoji:"🪞",cat:"Дом"},
        {id:19,greek:"τσάντα",ru:"сумка",emoji:"👜",cat:"Одежда"},
        {id:20,greek:"ετικέτα",ru:"этикетка",emoji:"🏷️",cat:"Другое"},
        {id:21,greek:"φωτογραφία",ru:"фотография",emoji:"📷",cat:"Другое"},
        {id:22,greek:"δελφίνι",ru:"дельфин",emoji:"🐬",cat:"Природа"},
        {id:23,greek:"βάλτος",ru:"болото",emoji:"🌿",cat:"Природа"},
        {id:24,greek:"μανάβης",ru:"зеленщик",emoji:"🛒",cat:"Другое"},
        {id:25,greek:"ασανσέρ",ru:"лифт",emoji:"🛗",cat:"Дом"},
        {id:26,greek:"αφίσα",ru:"афиша/плакат",emoji:"🎪",cat:"Культура"},
        {id:27,greek:"μαγιό",ru:"купальник",emoji:"👙",cat:"Одежда"},
        {id:28,greek:"κασκόλ",ru:"шарф",emoji:"🧣",cat:"Одежда"},
      ],
    },
    {
      id:"s1u2", title:"Ακούω και λέω — Φωνήεντα", subtitle:"Гласные звуки", emoji:"🔤",
      words:[
        {id:101,greek:"ντομάτα",ru:"томат",emoji:"🍅",cat:"Еда"},
        {id:102,greek:"ελιές",ru:"маслины",emoji:"🫒",cat:"Еда"},
        {id:103,greek:"κρεμμύδι",ru:"лук",emoji:"🧅",cat:"Еда"},
        {id:104,greek:"αγγούρι",ru:"огурец",emoji:"🥒",cat:"Еда"},
        {id:105,greek:"λάδι",ru:"оливковое масло",emoji:"🫙",cat:"Еда"},
        {id:106,greek:"τυρί",ru:"сыр",emoji:"🧀",cat:"Еда"},
        {id:107,greek:"πιπεριά",ru:"перец",emoji:"🌶️",cat:"Еда"},
        {id:108,greek:"μπρόκολο",ru:"брокколи",emoji:"🥦",cat:"Еда"},
        {id:109,greek:"λάχανο",ru:"капуста",emoji:"🥬",cat:"Еда"},
        {id:110,greek:"γάλα",ru:"молоко",emoji:"🥛",cat:"Еда"},
        {id:111,greek:"παγωτό",ru:"мороженое",emoji:"🍦",cat:"Еда"},
        {id:112,greek:"μέλι",ru:"мёд",emoji:"🍯",cat:"Еда"},
        {id:113,greek:"νερό",ru:"вода",emoji:"💧",cat:"Еда"},
        {id:114,greek:"ψωμί",ru:"хлеб",emoji:"🍞",cat:"Еда"},
        {id:115,greek:"μήλα",ru:"яблоки",emoji:"🍎",cat:"Еда"},
        {id:116,greek:"πορτοκάλια",ru:"апельсины",emoji:"🍊",cat:"Еда"},
        {id:117,greek:"μακαρόνια",ru:"макароны",emoji:"🍝",cat:"Еда"},
        {id:118,greek:"ούζο",ru:"узо",emoji:"🥃",cat:"Еда"},
        {id:119,greek:"φρούτα",ru:"фрукты",emoji:"🍇",cat:"Еда"},
        {id:120,greek:"κοτόπουλο",ru:"курица",emoji:"🍗",cat:"Еда"},
        {id:121,greek:"σαμπουάν",ru:"шампунь",emoji:"🧴",cat:"Дом"},
        {id:122,greek:"παιχνίδι",ru:"игра/игрушка",emoji:"🎮",cat:"Дом"},
        {id:123,greek:"τηλεόραση",ru:"телевизор",emoji:"📺",cat:"Дом"},
        {id:124,greek:"ποδόσφαιρο",ru:"футбол",emoji:"⚽",cat:"Спорт"},
        {id:125,greek:"τένις",ru:"теннис",emoji:"🎾",cat:"Спорт"},
        {id:126,greek:"μπάσκετ",ru:"баскетбол",emoji:"🏀",cat:"Спорт"},
        {id:127,greek:"βόλτα",ru:"прогулка",emoji:"🚶",cat:"Спорт"},
        {id:128,greek:"ταινίες",ru:"фильмы",emoji:"🎬",cat:"Культура"},
        {id:129,greek:"θέατρο",ru:"театр",emoji:"🎭",cat:"Культура"},
        {id:130,greek:"διάβασμα",ru:"чтение",emoji:"📚",cat:"Культура"},
        {id:131,greek:"ταξίδι",ru:"путешествие",emoji:"✈️",cat:"Другое"},
      ],
    },
    {
      id:"s1u3", title:"Εποχές και Μήνες", subtitle:"Времена года и месяцы", emoji:"📅",
      words:[
        {id:201,greek:"φθινόπωρο",ru:"осень",emoji:"🍂",cat:"Время"},
        {id:202,greek:"χειμώνας",ru:"зима",emoji:"❄️",cat:"Время"},
        {id:203,greek:"καλοκαίρι",ru:"лето",emoji:"☀️",cat:"Время"},
        {id:204,greek:"άνοιξη",ru:"весна",emoji:"🌸",cat:"Время"},
        {id:205,greek:"Ιανουάριος",ru:"январь",emoji:"📅",cat:"Время"},
        {id:206,greek:"Φεβρουάριος",ru:"февраль",emoji:"📅",cat:"Время"},
        {id:207,greek:"Μάρτιος",ru:"март",emoji:"📅",cat:"Время"},
        {id:208,greek:"Αύγουστος",ru:"август",emoji:"📅",cat:"Время"},
        {id:209,greek:"Σεπτέμβριος",ru:"сентябрь",emoji:"📅",cat:"Время"},
        {id:210,greek:"Οκτώβριος",ru:"октябрь",emoji:"📅",cat:"Время"},
        {id:211,greek:"Νοέμβριος",ru:"ноябрь",emoji:"📅",cat:"Время"},
        {id:212,greek:"Δεκέμβριος",ru:"декабрь",emoji:"📅",cat:"Время"},
        {id:213,greek:"Δευτέρα",ru:"понедельник",emoji:"📆",cat:"Время"},
        {id:214,greek:"Τρίτη",ru:"вторник",emoji:"📆",cat:"Время"},
        {id:215,greek:"Τετάρτη",ru:"среда",emoji:"📆",cat:"Время"},
        {id:216,greek:"Πέμπτη",ru:"четверг",emoji:"📆",cat:"Время"},
        {id:217,greek:"Παρασκευή",ru:"пятница",emoji:"📆",cat:"Время"},
        {id:218,greek:"Σάββατο",ru:"суббота",emoji:"📆",cat:"Время"},
        {id:219,greek:"Κυριακή",ru:"воскресенье",emoji:"📆",cat:"Время"},
      ],
    },
    {
      id:"s1u4", title:"Ρούχα και Αντικείμενα", subtitle:"Одежда и предметы", emoji:"👗",
      words:[
        {id:301,greek:"παλτό",ru:"пальто",emoji:"🧥",cat:"Одежда"},
        {id:302,greek:"φόρεμα",ru:"платье",emoji:"👗",cat:"Одежда"},
        {id:303,greek:"μπλούζα",ru:"блузка",emoji:"👕",cat:"Одежда"},
        {id:304,greek:"μπουφάν",ru:"куртка",emoji:"🧥",cat:"Одежда"},
        {id:305,greek:"φούστα",ru:"юбка",emoji:"👗",cat:"Одежда"},
        {id:306,greek:"παντελόνι",ru:"брюки",emoji:"👖",cat:"Одежда"},
        {id:307,greek:"παντόφλες",ru:"тапочки",emoji:"🩴",cat:"Одежда"},
        {id:308,greek:"μπότες",ru:"сапоги",emoji:"👢",cat:"Одежда"},
        {id:309,greek:"παπούτσια",ru:"обувь/туфли",emoji:"👟",cat:"Одежда"},
        {id:310,greek:"ομπρέλα",ru:"зонт",emoji:"☂️",cat:"Одежда"},
        {id:311,greek:"πουκάμισο",ru:"рубашка",emoji:"👔",cat:"Одежда"},
        {id:312,greek:"σεντόνι",ru:"простыня",emoji:"🛏️",cat:"Дом"},
        {id:313,greek:"πετσέτα",ru:"полотенце",emoji:"🧻",cat:"Дом"},
        {id:314,greek:"τηλέφωνο",ru:"телефон",emoji:"📞",cat:"Дом"},
        {id:315,greek:"πορτοφόλι",ru:"кошелёк",emoji:"👛",cat:"Другое"},
        {id:316,greek:"όνομα",ru:"имя",emoji:"🪪",cat:"Другое"},
        {id:317,greek:"διεύθυνση",ru:"адрес",emoji:"🏠",cat:"Другое"},
        {id:318,greek:"γενέθλια",ru:"день рождения",emoji:"🎂",cat:"Другое"},
        {id:319,greek:"επίθετο",ru:"фамилия",emoji:"🪪",cat:"Другое"},
        {id:320,greek:"εφημερίδα",ru:"газета",emoji:"📰",cat:"Другое"},
        {id:321,greek:"σοκολάτα",ru:"шоколад",emoji:"🍫",cat:"Еда"},
        {id:322,greek:"γαριδάκια",ru:"крекеры/чипсы",emoji:"🍟",cat:"Еда"},
        {id:323,greek:"πορτοκαλάδα",ru:"апельсиновый сок",emoji:"🍊",cat:"Еда"},
        {id:324,greek:"περιοδικό",ru:"журнал",emoji:"📖",cat:"Другое"},
        {id:325,greek:"θάλασσα",ru:"море",emoji:"🌊",cat:"Природа"},
        {id:326,greek:"βουνό",ru:"гора",emoji:"⛰️",cat:"Природа"},
        {id:327,greek:"χωριό",ru:"деревня",emoji:"🏡",cat:"Природа"},
        {id:328,greek:"ταβέρνα",ru:"таверна",emoji:"🍽️",cat:"Другое"},
        {id:329,greek:"κινηματογράφος",ru:"кинотеатр",emoji:"🎬",cat:"Культура"},
      ],
    },
    {
      id:"s1u5", title:"Ζώα και Φύση", subtitle:"Животные и природа", emoji:"🐾",
      words:[
        {id:401,greek:"γάτα",ru:"кошка",emoji:"🐱",cat:"Животные"},
        {id:402,greek:"γαϊδούρι",ru:"осёл",emoji:"🫏",cat:"Животные"},
        {id:403,greek:"σκυλί",ru:"собака",emoji:"🐶",cat:"Животные"},
        {id:404,greek:"γουρούνι",ru:"свинья",emoji:"🐷",cat:"Животные"},
        {id:405,greek:"άλογο",ru:"лошадь",emoji:"🐴",cat:"Животные"},
        {id:406,greek:"λαγός",ru:"заяц",emoji:"🐰",cat:"Животные"},
        {id:407,greek:"κότα",ru:"курица",emoji:"🐔",cat:"Животные"},
        {id:408,greek:"κόκορας",ru:"петух",emoji:"🐓",cat:"Животные"},
        {id:409,greek:"κατσίκα",ru:"коза",emoji:"🐐",cat:"Животные"},
        {id:410,greek:"πουλί",ru:"птица",emoji:"🐦",cat:"Животные"},
        {id:411,greek:"κουνέλι",ru:"кролик",emoji:"🐇",cat:"Животные"},
        {id:412,greek:"δέντρο",ru:"дерево",emoji:"🌳",cat:"Природа"},
        {id:413,greek:"λιμάνι",ru:"порт/гавань",emoji:"⚓",cat:"Природа"},
        {id:414,greek:"λίμνη",ru:"озеро",emoji:"🏞️",cat:"Природа"},
        {id:415,greek:"πάρκο",ru:"парк",emoji:"🌳",cat:"Природа"},
        {id:416,greek:"λουλούδια",ru:"цветы",emoji:"🌸",cat:"Природа"},
        {id:417,greek:"μαρούλι",ru:"салат-латук",emoji:"🥬",cat:"Еда"},
        {id:418,greek:"αγκινάρα",ru:"артишок",emoji:"🌿",cat:"Еда"},
        {id:419,greek:"σπανάκι",ru:"шпинат",emoji:"🥬",cat:"Еда"},
        {id:420,greek:"φασολάκια",ru:"стручковая фасоль",emoji:"🫘",cat:"Еда"},
        {id:421,greek:"κεράσια",ru:"вишня",emoji:"🍒",cat:"Еда"},
        {id:422,greek:"γιαούρτι",ru:"йогурт",emoji:"🫙",cat:"Еда"},
        {id:423,greek:"κασέρι",ru:"сыр кашери",emoji:"🧀",cat:"Еда"},
        {id:424,greek:"μελιτζάνα",ru:"баклажан",emoji:"🍆",cat:"Еда"},
        {id:425,greek:"καρπούζι",ru:"арбуз",emoji:"🍉",cat:"Еда"},
        {id:426,greek:"παντζάρι",ru:"свёкла",emoji:"🟣",cat:"Еда"},
        {id:427,greek:"ζαμπόν",ru:"ветчина",emoji:"🥩",cat:"Еда"},
        {id:428,greek:"ρύζι",ru:"рис",emoji:"🍚",cat:"Еда"},
        {id:429,greek:"αλάτι",ru:"соль",emoji:"🧂",cat:"Еда"},
      ],
    },
    {
      id:"s1u6", title:"Μουσική και Τέχνες", subtitle:"Музыка, искусство и действия", emoji:"🎵",
      words:[
        {id:501,greek:"ντραμς",ru:"барабаны",emoji:"🥁",cat:"Музыка"},
        {id:502,greek:"βιολί",ru:"скрипка",emoji:"🎻",cat:"Музыка"},
        {id:503,greek:"ακορντεόν",ru:"аккордеон",emoji:"🪗",cat:"Музыка"},
        {id:504,greek:"μαντολίνο",ru:"мандолина",emoji:"🪕",cat:"Музыка"},
        {id:505,greek:"κασετίνα",ru:"пенал",emoji:"✏️",cat:"Школа"},
        {id:506,greek:"χάρακας",ru:"линейка",emoji:"📏",cat:"Школа"},
        {id:507,greek:"μολύβι",ru:"карандаш",emoji:"✏️",cat:"Школа"},
        {id:508,greek:"χάρτης",ru:"карта/атлас",emoji:"🗺️",cat:"Школа"},
        {id:509,greek:"χαρτί",ru:"бумага",emoji:"📄",cat:"Школа"},
        {id:510,greek:"ξύστρα",ru:"точилка",emoji:"✂️",cat:"Школа"},
        {id:511,greek:"ταξιδεύει",ru:"путешествует",emoji:"✈️",cat:"Глаголы"},
        {id:512,greek:"ξενυχτάει",ru:"не спит всю ночь",emoji:"🌙",cat:"Глаголы"},
        {id:513,greek:"τρώει",ru:"ест",emoji:"🍽️",cat:"Глаголы"},
        {id:514,greek:"δουλεύει",ru:"работает",emoji:"💼",cat:"Глаголы"},
        {id:515,greek:"ξοδεύει χρήματα",ru:"тратит деньги",emoji:"💸",cat:"Глаголы"},
        {id:516,greek:"σπαγγέτι",ru:"спагетти",emoji:"🍝",cat:"Еда"},
        {id:517,greek:"φαγγρί",ru:"морской лещ",emoji:"🐟",cat:"Еда"},
        {id:521,greek:"γιασεμί",ru:"жасмин",emoji:"🌼",cat:"Природа"},
      ],
    },
  ],
};

const ALL_SECTIONS = [SECTION1];
const ALL_WORDS = ALL_SECTIONS.flatMap(s => s.units.flatMap(u => u.words));
const TOTAL_WORDS = ALL_WORDS.length;
const WORDS_PER_PAGE = 100;

const PHONICS = [
  {sound:"[a]",letters:"Α, α",example:"αγγούρι, ντομάτα, γάλα"},
  {sound:"[e]",letters:"Ε, ε, αι",example:"ελιές, παιχνίδι, θέατρο"},
  {sound:"[i]",letters:"Ι, η, οι, ει, υι, υ",example:"ταξίδι, ποδόσφαιρο"},
  {sound:"[o]",letters:"Ο, ο, Ω, ω",example:"ομπρέλα, πορτοκάλια"},
  {sound:"[u]",letters:"ΟΥ, ου",example:"ούζο, σαμπουάν, κοτόπουλο"},
  {sound:"[v]",letters:"Β, β",example:"βάζο, βόλτα, Νοέμβριος"},
  {sound:"[(m)b]",letters:"μπ",example:"μπίρα, μπλούζα, μπότες"},
  {sound:"[p]",letters:"Π, π",example:"πιάνο, παντελόνι, παπούτσια"},
  {sound:"[f]",letters:"Φ, φ",example:"παλτό, φόρεμα, φούστα"},
  {sound:"[θ]",letters:"Θ, θ",example:"θάλασσα, θέατρο, τηλέφωνο"},
  {sound:"[δ]",letters:"Δ, δ",example:"διεύθυνση, σοκολάτα, εφημερίδα"},
  {sound:"[t]",letters:"Τ, τ",example:"ταβέρνα, τηλέφωνο, βουνό"},
  {sound:"[(n)d]",letters:"ντ",example:"ντομάτα, ντραμς, ντουλάπι"},
  {sound:"[γ/j]",letters:"Γ, γ",example:"γάτα, γαϊδούρι, γουρούνι"},
  {sound:"[x/ç]",letters:"Χ, χ",example:"χάρακας, χαρτί, χωριό"},
  {sound:"[k/c]",letters:"Κ, κ",example:"κιθάρα, κότα, κουνέλι"},
  {sound:"[z]",letters:"Ζ, ζ",example:"ζαμπόν, ζάρι, μελιτζάνα"},
  {sound:"[s]",letters:"Σ, σ, ς",example:"σαλάτα, γιαούρτι, κεράσια"},
  {sound:"[l]",letters:"Λ, λ",example:"λεμόνι, λουλούδια, λίμνη"},
  {sound:"[m]",letters:"Μ, μ",example:"μήλα, μέλι, μακαρόνια"},
  {sound:"[n]",letters:"Ν, ν",example:"νερό, όνομα"},
  {sound:"[ps]",letters:"Ψ, ψ",example:"ψωμί"},
  {sound:"[ks]",letters:"Ξ, ξ",example:"ξενυχτάει, ξύστρα"},
];

// ─── UTILS ─────────────────────────────────────────────────
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr, n) => shuffle(arr).slice(0, n);

function buildEx(word, pool, forceType) {
  const others = pool.filter(w => w.id !== word.id);
  const fallback = ALL_WORDS.filter(w => w.id !== word.id);
  const w3 = pick(others.length >= 3 ? others : fallback, 3);
  const types = ["FC","C4","WRITE","MATCH"];
  const type = forceType || types[Math.floor(Math.random() * types.length)];
  if (type === "MATCH") {
    const pairs = shuffle([word, ...pick(others.length >= 3 ? others : fallback, 3)]).slice(0,4);
    return { type, word, pairs, ll: shuffle(pairs.map(p => p.greek)), rl: shuffle(pairs.map(p => p.ru)) };
  }
  if (type === "FC") {
    // randomly grToRu or ruToGr
    const dir = Math.random() > 0.5 ? "grToRu" : "ruToGr";
    return { type, word, dir };
  }
  return { type, word, opts: shuffle([word, ...w3]) };
}

// ─── CSS ───────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Mulish:wght@300;400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b0d17;--sur:#13152a;--card:#1c1f38;--card2:#22254a;
  --acc:#4af0c4;--acc2:#ff6b81;--acc3:#ffd166;--acc4:#7c8cf8;
  --txt:#eef0ff;--mu:#6b7098;--ok:#06d6a0;--er:#ef476f;--r:14px;
}
body{font-family:'Mulish',sans-serif;background:var(--bg);color:var(--txt);min-height:100vh}
.app{max-width:480px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column}

/* Nav — TOP */
.nav{background:var(--sur);border-bottom:1px solid rgba(255,255,255,.06);display:flex;padding:8px 8px 0;flex-shrink:0;order:-1}
.nt{flex:1;padding:9px 2px 8px;background:none;border:none;border-bottom:2px solid transparent;
  color:var(--mu);font-family:'Mulish',sans-serif;font-size:10px;font-weight:700;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;gap:3px;text-transform:uppercase;
  letter-spacing:.5px;transition:color .2s,border-color .2s}
.nt.on{color:var(--acc);border-bottom-color:var(--acc)}
.ni{font-size:17px}

/* Scroll */
.sc{flex:1;overflow-y:auto;padding:14px}
.sc::-webkit-scrollbar{width:3px}
.sc::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px}

/* Prog */
.pb-wrap{flex:1;height:5px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden}
.pb-fill{height:100%;background:linear-gradient(90deg,var(--acc),var(--acc4));border-radius:99px;transition:width .5s}

/* Global progress bar */
.global-prog{background:var(--sur);padding:8px 14px;border-bottom:1px solid rgba(255,255,255,.04);flex-shrink:0}
.gp-row{display:flex;justify-content:space-between;font-size:11px;color:var(--mu);margin-bottom:4px}

/* Scores */
.sco{display:flex;gap:6px;padding:8px 14px;background:var(--sur);border-bottom:1px solid rgba(255,255,255,.04);flex-shrink:0}
.chip{background:var(--card);border-radius:99px;padding:4px 11px;font-size:12px;font-weight:700;display:flex;align-items:center;gap:4px}
.g{color:var(--ok)}.r{color:var(--er)}.y{color:var(--acc3)}.b{color:var(--acc4)}

/* Card */
.card{background:var(--card);border-radius:var(--r);padding:22px;border:1px solid rgba(255,255,255,.06)}
.cc{text-align:center}
.be{font-size:58px;margin-bottom:8px}
.bw{font-family:'Unbounded',sans-serif;font-size:24px;font-weight:700}
.bwr{color:var(--acc3)}
.spk{background:none;border:none;font-size:20px;cursor:pointer;padding:3px 7px;border-radius:8px;transition:background .15s}
.spk:hover{background:rgba(255,255,255,.08)}
.fca{margin-top:14px;padding:12px 18px;background:rgba(76,240,196,.1);border:1px solid rgba(76,240,196,.3);
  border-radius:10px;font-size:19px;font-weight:700;color:var(--acc);animation:fi .3s ease}
.fcr{display:flex;gap:8px;margin-top:12px}

/* Choices */
.chs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
.cb2{padding:13px 10px;background:var(--card2);border:1.5px solid rgba(255,255,255,.08);border-radius:12px;
  font-family:'Mulish',sans-serif;font-size:13px;font-weight:600;color:var(--txt);cursor:pointer;transition:all .2s;text-align:center}
.cb2:disabled{cursor:default}
.cb2.ck{border-color:var(--ok);background:rgba(6,214,160,.12);color:var(--ok)}
.cb2.cw{border-color:var(--er);background:rgba(239,71,111,.12);color:var(--er)}

/* Write */
.wi{width:100%;padding:13px;background:var(--card2);border:1.5px solid rgba(255,255,255,.1);
  border-radius:12px;font-family:'Unbounded',sans-serif;font-size:16px;color:var(--txt);outline:none;transition:border-color .2s}
.wi:focus{border-color:var(--acc)}
.wi.wok{border-color:var(--ok)}
.wi.wfl{border-color:var(--er)}
.fb{padding:11px 14px;border-radius:10px;font-size:13px;font-weight:600;animation:fi .3s;margin-top:6px}
.fbok{background:rgba(6,214,160,.12);color:var(--ok)}
.fber{background:rgba(239,71,111,.12);color:var(--er)}
.swl{font-size:12px;color:var(--mu);cursor:pointer;text-decoration:underline;text-align:right;margin-top:6px}

/* Match */
.mg{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.mc{display:flex;flex-direction:column;gap:6px}
.mi{padding:10px;background:var(--card2);border:1.5px solid rgba(255,255,255,.08);border-radius:10px;
  font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:all .2s;user-select:none}
.mi.ms{border-color:var(--acc);background:rgba(76,240,196,.1);color:var(--acc)}
.mi.mm{border-color:var(--ok);background:rgba(6,214,160,.1);color:var(--ok);opacity:.6}
.mi.mw{border-color:var(--er);background:rgba(239,71,111,.12)}

/* Btns */
.btn{padding:13px;border:none;border-radius:12px;font-family:'Mulish',sans-serif;font-size:13px;
  font-weight:700;cursor:pointer;flex:1;transition:transform .15s}
.btn:active{transform:scale(.96)}
.bok{background:var(--ok);color:#000}
.ber{background:var(--er);color:#fff}
.bpr{background:linear-gradient(135deg,var(--acc),var(--acc4));color:#000}
.bot{background:transparent;border:1.5px solid rgba(255,255,255,.15);color:var(--txt)}
.bfw{width:100%}
.br{display:flex;gap:8px}
.ex{font-size:10px;font-weight:700;letter-spacing:2px;color:var(--acc);text-transform:uppercase;margin-bottom:8px}
.ew{display:flex;flex-direction:column;gap:12px}

/* Section/Unit list */
.sb{background:var(--card);border-radius:var(--r);margin-bottom:12px;overflow:hidden;border:1px solid rgba(255,255,255,.06)}
.sh{padding:14px 16px;display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(76,240,196,.08),rgba(124,140,248,.08))}
.st{font-family:'Unbounded',sans-serif;font-size:12px;font-weight:700}
.ss{font-size:11px;color:var(--mu);margin-top:2px}
.ur{padding:12px 16px;display:flex;align-items:center;gap:10px;border-top:1px solid rgba(255,255,255,.05);cursor:pointer;transition:background .15s}
.ur:hover{background:rgba(255,255,255,.03)}
.ue{font-size:21px;width:26px;text-align:center}
.ui{flex:1}
.ut{font-size:13px;font-weight:700}
.us{font-size:11px;color:var(--mu);margin-top:2px}
.ub{background:var(--card2);border-radius:99px;padding:3px 9px;font-size:11px;color:var(--acc3)}
.sb2{background:linear-gradient(135deg,var(--acc),var(--acc4));border:none;border-radius:99px;
  padding:5px 13px;font-family:'Mulish',sans-serif;font-size:11px;font-weight:700;color:#000;cursor:pointer}

/* Word list */
.wlt{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}
.wls{flex:1;padding:9px 12px;background:var(--card);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-family:'Mulish',sans-serif;font-size:13px;color:var(--txt);outline:none}
.wls::placeholder{color:var(--mu)}
.wleb{padding:8px 13px;background:var(--card2);border:1px solid rgba(255,255,255,.1);border-radius:10px;font-size:12px;font-weight:700;color:var(--acc3);cursor:pointer}
.cl{font-size:10px;font-weight:700;letter-spacing:2px;color:var(--mu);text-transform:uppercase;padding:10px 0 5px;border-bottom:1px solid rgba(255,255,255,.05);margin-bottom:4px}
.wr{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.we{font-size:19px;width:24px;text-align:center}
.wg{font-family:'Unbounded',sans-serif;font-size:12px;font-weight:700;flex:1}
.wru{font-size:11px;color:var(--mu);margin-right:2px}
.wsp{background:none;border:none;font-size:15px;cursor:pointer;padding:2px 5px;border-radius:6px;color:var(--mu);transition:color .15s}
.wsp:hover{color:var(--acc)}
.cb3{width:17px;height:17px;accent-color:var(--acc);cursor:pointer;flex-shrink:0}
.pn{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px 0}
.pgb{width:30px;height:30px;border-radius:8px;border:none;background:var(--card);color:var(--txt);font-size:12px;font-weight:700;cursor:pointer}
.pgb.pa{background:var(--acc);color:#000}
.sar{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:12px;color:var(--mu)}

/* Practice */
.pe{text-align:center;padding:40px 20px;color:var(--mu)}

/* Popup */
.po{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:999;animation:fi .2s}
.pb2{background:var(--card);border-radius:var(--r);padding:22px;width:270px;border:1px solid rgba(255,255,255,.1);text-align:center}
.pt{font-family:'Unbounded',sans-serif;font-size:13px;margin-bottom:6px}
.pu{font-size:12px;color:var(--mu);margin-bottom:18px}

/* word popup */
.wp{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--card2);
  border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px 18px;z-index:990;
  animation:fi .2s;min-width:220px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.4)}

/* Phonics */
.phc{background:var(--card);border-radius:12px;padding:14px;border-left:3px solid var(--acc);margin-bottom:8px}
.phs{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:900;color:var(--acc)}
.phl{font-size:13px;font-weight:700;color:var(--acc3);margin:3px 0}
.phe{font-size:11px;color:var(--mu)}

/* Animations */
@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}
.pop{animation:pop .3s cubic-bezier(.175,.885,.32,1.275)}

/* Prog strip */
.ps{background:var(--sur);padding:7px 14px;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:10px;flex-shrink:0}
.pt2{font-size:11px;color:var(--mu);white-space:nowrap}
`;

export default function App() {
  const [tab, setTab] = useState("learn");
  const [checked, setChecked] = useState(() => new Set());

  // Learn
  const [mode, setMode] = useState("home");
  const [activeUnit, setActiveUnit] = useState(null);
  const [queue, setQueue] = useState([]);
  const [qi, setQi] = useState(0);
  const [ex, setEx] = useState(null);
  const [score, setScore] = useState({c:0,w:0,st:0});
  const [errs, setErrs] = useState([]);

  // FC state
  const [fcRev, setFcRev] = useState(false);
  // Choice
  const [chosen, setChosen] = useState(null);
  // Write
  const [wv, setWv] = useState("");
  const [ws, setWs] = useState(null);
  // Match
  const [mSelGr, setMSelGr] = useState(null);
  const [mSelRu, setMSelRu] = useState(null);
  const [mDone, setMDone] = useState([]);
  const [mWrong, setMWrong] = useState([]);
  const [mDoneAll, setMDoneAll] = useState(false);

  // Word list
  const [wlPage, setWlPage] = useState(0);
  const [wlSearch, setWlSearch] = useState("");
  const wlEndRef = useRef(null);

  // Practice
  const [pEx, setPEx] = useState(null);
  const [pFcRev, setPFcRev] = useState(false);
  const [pChosen, setPChosen] = useState(null);
  const [pMSelL, setPMSelL] = useState(null);
  const [pMSelR, setPMSelR] = useState(null);
  const [pMDone, setPMDone] = useState([]);
  const [pMWrong, setPMWrong] = useState([]);

  // Popups
  const [popup, setPopup] = useState(null);
  const [wPopup, setWPopup] = useState(null);
  const lpTimer = useRef(null);

  useEffect(() => {
    if (!queue.length) return;
    const word = queue[qi % queue.length];
    setEx(buildEx(word, queue));
    setFcRev(false); setChosen(null); setWv(""); setWs(null);
    setMSelGr(null); setMSelRu(null); setMDone([]); setMWrong([]); setMDoneAll(false);
  }, [qi, queue]);

  const startUnit = (unit) => {
    setActiveUnit(unit); setQueue(shuffle(unit.words)); setQi(0);
    setScore({c:0,w:0,st:0}); setErrs([]); setMode("unit");
  };

  const advance = (ok) => {
    setScore(s => ({c:s.c+(ok?1:0),w:s.w+(ok?0:1),st:ok?s.st+1:0}));
    if (!ok && ex?.word) setErrs(e => [...e, ex.word]);
    setQi(i => i+1);
  };

  // Switch write→choice4 with same word
  const switchToChoice = () => {
    if (!ex?.word) return;
    const others = queue.filter(w => w.id !== ex.word.id);
    const fallback = ALL_WORDS.filter(w => w.id !== ex.word.id);
    const w3 = pick(others.length >= 3 ? others : fallback, 3);
    setEx({ type:"C4", word: ex.word, opts: shuffle([ex.word, ...w3]) });
    setWv(""); setWs(null); setChosen(null);
  };

  const doWrite = () => {
    const ok = wv.trim().toLowerCase() === ex.word.greek.toLowerCase();
    setWs(ok ? "ok" : "fl");
    setTimeout(() => advance(ok), 1300);
  };

  // Match in unit
  const handleMGr = (gr) => {
    if (mDone.includes(gr)) return;
    speak(gr); // 🔊 always speak on click
    const sel = mSelRu;
    if (sel) {
      const pair = ex.pairs.find(p => p.greek === gr);
      if (pair && pair.ru === sel) {
        const nd = [...mDone, gr]; setMDone(nd); setMSelGr(null); setMSelRu(null);
        if (nd.length === ex.pairs.length) setMDoneAll(true);
      } else { setMWrong([gr,sel]); setTimeout(()=>{setMWrong([]);setMSelGr(null);setMSelRu(null);},700); }
    } else setMSelGr(gr);
  };
  const handleMRu = (ru) => {
    const pGr = ex.pairs.find(p => p.ru === ru)?.greek;
    if (mDone.includes(pGr)) return;
    if (mSelGr) {
      const pair = ex.pairs.find(p => p.greek === mSelGr);
      if (pair && pair.ru === ru) {
        const nd = [...mDone, mSelGr]; setMDone(nd); setMSelGr(null); setMSelRu(null);
        if (nd.length === ex.pairs.length) setMDoneAll(true);
      } else { setMWrong([mSelGr,ru]); setTimeout(()=>{setMWrong([]);setMSelGr(null);setMSelRu(null);},700); }
    } else setMSelRu(ru);
  };

  // Practice words
  const pracWords = ALL_WORDS.filter(w => checked.has(w.id));

  const buildPEx = useCallback(() => {
    if (!pracWords.length) return;
    const word = pracWords[Math.floor(Math.random() * pracWords.length)];
    const others = pracWords.filter(w => w.id !== word.id);
    const fallback = ALL_WORDS.filter(w => w.id !== word.id);
    const r = Math.random();
    if (r < 0.35) {
      const dir = Math.random() > 0.5 ? "grToRu" : "ruToGr";
      setPEx({t:"FC", word, dir}); setPFcRev(false);
    } else if (r < 0.65) {
      const opts = shuffle([word, ...pick(others.length >= 3 ? others : fallback, 3)]);
      setPEx({t:"CH", word, opts}); setPChosen(null);
    } else {
      const pairs = shuffle([word, ...pick(others.length >= 3 ? others : fallback, 3)]);
      setPEx({t:"MA", word, pairs, ll:shuffle(pairs.map(p=>p.greek)), rl:shuffle(pairs.map(p=>p.ru))});
      setPMSelL(null); setPMSelR(null); setPMDone([]); setPMWrong([]);
    }
  }, [pracWords.length, checked.size]);

  useEffect(() => { if (tab === "practice") buildPEx(); }, [tab]);

  const handlePL = (gr) => {
    speak(gr); // 🔊 always speak
    if (pMDone.includes(gr)) return;
    if (pMSelR) {
      const pair = pEx.pairs.find(p => p.greek === gr);
      if (pair && pair.ru === pMSelR) {
        const nd = [...pMDone, gr]; setPMDone(nd); setPMSelL(null); setPMSelR(null);
        if (nd.length === pEx.pairs.length) setTimeout(buildPEx, 600);
      } else { setPMWrong([gr, pMSelR]); setTimeout(()=>{setPMWrong([]);setPMSelL(null);setPMSelR(null);},700); }
    } else setPMSelL(gr);
  };
  const handlePR = (ru) => {
    const pGr = pEx.pairs.find(p => p.ru === ru)?.greek;
    if (pMDone.includes(pGr)) return;
    if (pMSelL) {
      const pair = pEx.pairs.find(p => p.greek === pMSelL);
      if (pair && pair.ru === ru) {
        const nd = [...pMDone, pMSelL]; setPMDone(nd); setPMSelL(null); setPMSelR(null);
        if (nd.length === pEx.pairs.length) setTimeout(buildPEx, 600);
      } else { setPMWrong([pMSelL, ru]); setTimeout(()=>{setPMWrong([]);setPMSelL(null);setPMSelR(null);},700); }
    } else setPMSelR(ru);
  };

  const startLP = (word) => { lpTimer.current = setTimeout(() => setPopup({word}), 650); };
  const stopLP = () => clearTimeout(lpTimer.current);

  // Word list
  const wlF = ALL_WORDS.filter(w => !wlSearch || w.greek.includes(wlSearch) || w.ru.toLowerCase().includes(wlSearch.toLowerCase()));
  const wlTP = Math.ceil(wlF.length / WORDS_PER_PAGE);
  const wlPW = wlF.slice(wlPage * WORDS_PER_PAGE, (wlPage + 1) * WORDS_PER_PAGE);
  const wlG = wlPW.reduce((a, w) => { (a[w.cat] = a[w.cat] || []).push(w); return a; }, {});
  const allCk = wlPW.length > 0 && wlPW.every(w => checked.has(w.id));
  const toggleAll = () => {
    const ids = wlPW.map(w => w.id);
    setChecked(prev => { const n = new Set(prev); allCk ? ids.forEach(id => n.delete(id)) : ids.forEach(id => n.add(id)); return n; });
  };

  // Global progress: words seen = unique words that appeared in exercises
  // We track checked as proxy for "added to study"
  const checkedCount = checked.size;

  // ── RENDER EXERCISE ──────────────────────────────────────
  const renderEx = () => {
    if (!ex) return null;
    const {type, word} = ex;

    const spkBtn = (
      <button className="spk" onClick={e => { e.stopPropagation(); speak(word.greek); }}>🔊</button>
    );

    if (type === "FC") {
      const isGrToRu = ex.dir === "grToRu";
      return (
        <div className="ew">
          <div className="ex">{isGrToRu ? "Греч → Рус" : "Рус → Греч"}</div>
          <div className="card cc">
            <div className="be">{word.emoji}</div>
            {isGrToRu ? (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <div className="bw">{word.greek}</div>{spkBtn}
              </div>
            ) : (
              <div className="bw bwr">{word.ru}</div>
            )}
            {!fcRev
              ? <div style={{marginTop:18,cursor:"pointer",color:"var(--mu)",fontSize:13}} onClick={() => setFcRev(true)}>
                  👆 Нажми — {isGrToRu ? "покажу перевод" : "покажу по-гречески"}
                </div>
              : <>
                  <div className="fca" style={isGrToRu ? {} : {display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    {isGrToRu ? word.ru : <>{word.greek}{spkBtn}</>}
                  </div>
                  <div className="fcr">
                    <button className="btn ber" onClick={() => advance(false)}>Не знал 😬</button>
                    <button className="btn bok" onClick={() => advance(true)}>Знал! ✅</button>
                  </div>
                </>
            }
          </div>
        </div>
      );
    }

    if (type === "C4") {
      const showRu = Math.random() > 0.5; // show greek, pick russian translation
      return (
        <div className="ew">
          <div className="ex">Выбери перевод</div>
          <div className="card cc">
            <div className="be">{word.emoji}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <div className="bw">{word.greek}</div>{spkBtn}
            </div>
          </div>
          <div className="chs">
            {ex.opts.map(o => {
              let c = "cb2";
              if (chosen) { if (o.id === word.id) c += " ck"; else if (o.id === chosen) c += " cw"; }
              return (
                <button key={o.id} className={c} disabled={!!chosen}
                  onClick={() => { setChosen(o.id); setTimeout(() => advance(o.id === word.id), 1000); }}>
                  {o.ru}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (type === "WRITE") {
      return (
        <div className="ew">
          <div className="ex">Напиши по-гречески</div>
          <div className="card cc">
            <div className="be">{word.emoji}</div>
            <div className="bw bwr">{word.ru}</div>
          </div>
          <input className={`wi${ws ? " w"+ws : ""}`} value={wv} disabled={!!ws}
            onChange={e => setWv(e.target.value)} onKeyDown={e => e.key === "Enter" && !ws && doWrite()}
            placeholder="Греческими буквами..." autoFocus />
          {ws
            ? <div className={`fb ${ws === "ok" ? "fbok" : "fber"}`}>
                {ws === "ok" ? `✅ Верно! ${word.greek}` : `❌ Правильно: ${word.greek}`}
              </div>
            : <>
                <button className="btn bpr bfw" onClick={doWrite}>Проверить</button>
                <div className="swl" onClick={switchToChoice}>Не могу писать — выбрать из 4 →</div>
              </>
          }
        </div>
      );
    }

    if (type === "MATCH") {
      return (
        <div className="ew">
          <div className="ex">Соедини пары · 🔊 при нажатии на греч.</div>
          {mDoneAll && <div className="card cc pop" style={{color:"var(--ok)",fontSize:16,fontWeight:700}}>🎉 Все пары найдены!</div>}
          <div className="mg">
            <div className="mc">
              {ex.ll.map(gr => {
                let c = "mi";
                if (mDone.includes(gr)) c += " mm";
                else if (mSelGr === gr) c += " ms";
                else if (mWrong.includes(gr)) c += " mw";
                return <div key={gr} className={c} onClick={() => handleMGr(gr)}>🔊 {gr}</div>;
              })}
            </div>
            <div className="mc">
              {ex.rl.map(ru => {
                const pair = ex.pairs.find(p => p.ru === ru);
                let c = "mi";
                if (mDone.includes(pair?.greek)) c += " mm";
                else if (mSelRu === ru) c += " ms";
                else if (mWrong.includes(ru)) c += " mw";
                return <div key={ru} className={c} onClick={() => handleMRu(ru)}>{ru}</div>;
              })}
            </div>
          </div>
          {mDoneAll && <button className="btn bpr bfw" onClick={() => advance(true)}>Далее →</button>}
        </div>
      );
    }
    return null;
  };

  // ── LEARN HOME ───────────────────────────────────────────
  const renderHome = () => (
    <div className="sc">
      {/* Global progress */}
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:10,color:"var(--mu)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>
          Прогресс учебника
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mu)",marginBottom:4}}>
          <span>📚 {ALL_SECTIONS.length} раздел · {ALL_SECTIONS.reduce((a,s)=>a+s.units.length,0)} юнитов</span>
          <span>{checkedCount}/{TOTAL_WORDS} слов в словаре</span>
        </div>
        <div className="pb-wrap" style={{height:8}}>
          <div className="pb-fill" style={{width:`${Math.min((checkedCount/TOTAL_WORDS)*100,100)}%`}}/>
        </div>
      </div>

      {ALL_SECTIONS.map(s => (
        <div key={s.id} className="sb">
          <div className="sh">
            <div style={{fontSize:22}}>📖</div>
            <div>
              <div className="st">{s.title}</div>
              <div className="ss">{s.subtitle} · {s.units.length} юнитов</div>
            </div>
          </div>
          {s.units.map(u => (
            <div key={u.id} className="ur" onClick={() => startUnit(u)}>
              <div className="ue">{u.emoji}</div>
              <div className="ui">
                <div className="ut">{u.title}</div>
                <div className="us">{u.subtitle} · {u.words.length} слов</div>
              </div>
              <div className="ub">{u.words.length} сл.</div>
              <button className="sb2" onClick={e => { e.stopPropagation(); startUnit(u); }}>▶</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderUnitEx = () => {
    if (qi >= queue.length) return (
      <div className="sc">
        <div className="card cc" style={{marginTop:20}}>
          <div style={{fontSize:52}}>🏆</div>
          <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:16,margin:"12px 0 6px"}}>Юнит пройден!</div>
          <div style={{fontSize:30,color:"var(--acc)",fontWeight:700,marginBottom:14}}>
            {Math.round((score.c/(score.c+score.w||1))*100)}%
          </div>
          <div style={{fontSize:12,color:"var(--mu)",marginBottom:14}}>
            ✅ {score.c} верно · ❌ {score.w} ошибок
          </div>
          {errs.length > 0 && (
            <button className="btn ber bfw" style={{marginBottom:8}}
              onClick={() => { setQueue(shuffle(errs)); setQi(0); setErrs([]); setScore({c:0,w:0,st:0}); }}>
              🔁 Повторить ошибки ({errs.length})
            </button>
          )}
          <button className="btn bpr bfw" onClick={() => setMode("home")}>← К юнитам</button>
        </div>
      </div>
    );

    const pct = Math.round((qi / queue.length) * 100);
    return (
      <>
        <div className="ps">
          <button style={{background:"none",border:"none",color:"var(--mu)",cursor:"pointer",fontSize:18}} onClick={() => setMode("home")}>←</button>
          <div style={{fontSize:11,color:"var(--mu)",whiteSpace:"nowrap"}}>{activeUnit?.title}</div>
          <div className="pb-wrap"><div className="pb-fill" style={{width:`${pct}%`}}/></div>
          <div className="pt2">{qi+1}/{queue.length}</div>
        </div>
        <div className="sco">
          <div className="chip g">✅ {score.c}</div>
          <div className="chip r">❌ {score.w}</div>
          <div className="chip y">🔥 {score.st}</div>
        </div>
        <div className="sc">{renderEx()}</div>
      </>
    );
  };

  // ── WORD LIST ─────────────────────────────────────────────
  const renderWords = () => (
    <div className="sc">
      <div className="wlt">
        <input className="wls" placeholder="Поиск..." value={wlSearch}
          onChange={e => { setWlSearch(e.target.value); setWlPage(0); }}/>
        <button className="wleb" onClick={() => wlEndRef.current?.scrollIntoView({behavior:"smooth"})}>↓ Конец</button>
      </div>
      <div className="sar">
        <input type="checkbox" className="cb3" checked={allCk} onChange={toggleAll}/>
        <span>Выбрать все на стр.</span>
        <span style={{marginLeft:"auto",color:"var(--acc3)"}}>⚡ {checked.size} в практике</span>
      </div>
      {Object.entries(wlG).map(([cat, words]) => (
        <div key={cat}>
          <div className="cl">{cat} ({words.length})</div>
          {words.map(w => (
            <div key={w.id} className="wr">
              <input type="checkbox" className="cb3" checked={checked.has(w.id)}
                onChange={() => setChecked(p => { const n = new Set(p); checked.has(w.id) ? n.delete(w.id) : n.add(w.id); return n; })}/>
              <div className="we">{w.emoji}</div>
              <div className="wg">{w.greek}</div>
              <div className="wru">{w.ru}</div>
              <button className="wsp" onClick={() => speak(w.greek)}>🔊</button>
            </div>
          ))}
        </div>
      ))}
      <div ref={wlEndRef}/>
      {wlTP > 1 && (
        <div className="pn">
          {Array.from({length:wlTP}, (_,i) => (
            <button key={i} className={`pgb${wlPage===i?" pa":""}`} onClick={() => setWlPage(i)}>{i+1}</button>
          ))}
        </div>
      )}
    </div>
  );

  // ── PRACTICE ─────────────────────────────────────────────
  const renderPractice = () => {
    if (!pracWords.length) return (
      <div className="pe">
        <div style={{fontSize:44,marginBottom:12}}>📋</div>
        <div style={{fontSize:15,fontWeight:700,marginBottom:8}}>Нет слов для практики</div>
        <div style={{fontSize:13}}>Отметь галочкой в разделе «Слова»</div>
      </div>
    );
    if (!pEx) return (
      <div className="sc">
        <button className="btn bpr bfw" onClick={buildPEx}>Начать практику</button>
      </div>
    );

    return (
      <div className="sc">
        <div style={{textAlign:"right",marginBottom:10,fontSize:12,color:"var(--mu)"}}>⚡ {pracWords.length} слов</div>

        {pEx.t === "FC" && (
          <div className="card cc"
            onMouseDown={() => startLP(pEx.word)} onMouseUp={stopLP} onMouseLeave={stopLP}
            onTouchStart={() => startLP(pEx.word)} onTouchEnd={stopLP}>
            <div style={{fontSize:50,marginBottom:8}}>{pEx.word.emoji}</div>
            {pEx.dir === "grToRu" ? (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:4}}>
                <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:20,fontWeight:700}}>{pEx.word.greek}</div>
                <button className="spk" onClick={e=>{e.stopPropagation();speak(pEx.word.greek);}}>🔊</button>
              </div>
            ) : (
              <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:20,fontWeight:700,color:"var(--acc3)",marginBottom:4}}>
                {pEx.word.ru}
              </div>
            )}
            {!pFcRev
              ? <button className="btn bot" style={{marginTop:14,flex:"unset",padding:"9px 22px"}}
                  onClick={() => setPFcRev(true)}>Показать {pEx.dir==="grToRu"?"перевод":"по-гречески"}</button>
              : <>
                  <div className="fca">
                    {pEx.dir === "grToRu" ? pEx.word.ru : (
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                        {pEx.word.greek}
                        <button className="spk" onClick={e=>{e.stopPropagation();speak(pEx.word.greek);}}>🔊</button>
                      </span>
                    )}
                  </div>
                  <div className="fcr">
                    <button className="btn ber" onClick={buildPEx}>Не знал</button>
                    <button className="btn bok" onClick={buildPEx}>Знал! ✅</button>
                  </div>
                </>
            }
          </div>
        )}

        {pEx.t === "CH" && (
          <>
            <div className="card cc"
              onMouseDown={() => startLP(pEx.word)} onMouseUp={stopLP} onMouseLeave={stopLP}
              onTouchStart={() => startLP(pEx.word)} onTouchEnd={stopLP}>
              <div style={{fontSize:50,marginBottom:8}}>{pEx.word.emoji}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:20,fontWeight:700}}>{pEx.word.greek}</div>
                <button className="spk" onClick={e=>{e.stopPropagation();speak(pEx.word.greek);}}>🔊</button>
              </div>
            </div>
            <div className="chs" style={{marginTop:10}}>
              {pEx.opts.map(o => {
                let c = "cb2";
                if (pChosen) { if (o.id === pEx.word.id) c += " ck"; else if (o.id === pChosen) c += " cw"; }
                return (
                  <button key={o.id} className={c} disabled={!!pChosen}
                    onClick={() => { setPChosen(o.id); setTimeout(buildPEx, 1000); }}>
                    {o.ru}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {pEx.t === "MA" && (
          <>
            <div style={{fontSize:10,color:"var(--mu)",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>
              Соедини · 🔊 = озвучка · удержи = убрать из практики
            </div>
            <div className="mg">
              <div className="mc">
                {pEx.ll.map(gr => {
                  const isD = pMDone.includes(gr);
                  let c = `mi${isD?" mm":pMSelL===gr?" ms":pMWrong.includes(gr)?" mw":""}`;
                  return (
                    <div key={gr} className={c}
                      onClick={() => handlePL(gr)}
                      onMouseDown={() => startLP(pEx.pairs.find(p=>p.greek===gr))}
                      onMouseUp={stopLP} onMouseLeave={stopLP}
                      onTouchStart={() => startLP(pEx.pairs.find(p=>p.greek===gr))} onTouchEnd={stopLP}>
                      🔊 {gr}
                    </div>
                  );
                })}
              </div>
              <div className="mc">
                {pEx.rl.map(ru => {
                  const pGr = pEx.pairs.find(p=>p.ru===ru)?.greek;
                  const isD = pMDone.includes(pGr);
                  let c = `mi${isD?" mm":pMSelR===ru?" ms":pMWrong.includes(ru)?" mw":""}`;
                  return <div key={ru} className={c} onClick={() => handlePR(ru)}>{ru}</div>;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ── PHONICS ───────────────────────────────────────────────
  const renderPhonics = () => (
    <div className="sc">
      {PHONICS.map((p,i) => (
        <div key={i} className="phc">
          <div className="phs">{p.sound}</div>
          <div className="phl">{p.letters}</div>
          <div className="phe">{p.example}</div>
        </div>
      ))}
    </div>
  );

  // ── POPUPS ─────────────────────────────────────────────────
  const renderPopup = () => popup && (
    <div className="po" onClick={() => setPopup(null)}>
      <div className="pb2" onClick={e => e.stopPropagation()}>
        <div className="pt">{popup.word?.greek}</div>
        <div className="pu">Убрать из практики слов?</div>
        <div className="br">
          <button className="btn bot" onClick={() => setPopup(null)}>Нет</button>
          <button className="btn ber" onClick={() => {
            setChecked(p => { const n = new Set(p); n.delete(popup.word.id); return n; });
            setPopup(null);
          }}>Да, убрать</button>
        </div>
      </div>
    </div>
  );

  const renderWPopup = () => wPopup && (
    <div className="wp">
      <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:15,marginBottom:3}}>{wPopup.greek}</div>
      <div style={{fontSize:12,color:"var(--mu)",marginBottom:12}}>{wPopup.ru}</div>
      <div className="br">
        <button className="btn bot" style={{padding:"8px"}} onClick={() => setWPopup(null)}>Закрыть</button>
        <button className="btn bpr" style={{padding:"8px"}} onClick={() => {
          setChecked(p => { const n = new Set(p); n.add(wPopup.id); return n; });
          setWPopup(null);
        }}>+ В практику ✅</button>
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* NAV — TOP */}
        <div className="nav">
          {[
            {id:"learn",  i:"🎓", l:"Учить"},
            {id:"words",  i:"📖", l:"Слова"},
            {id:"practice",i:"⚡",l:"Практика"},
            {id:"phonics", i:"🔤",l:"Фонетика"},
          ].map(t => (
            <button key={t.id} className={`nt${tab===t.id?" on":""}`} onClick={() => setTab(t.id)}>
              <span className="ni">{t.i}</span>{t.l}
            </button>
          ))}
        </div>

        {tab === "learn"    && (mode === "home" ? renderHome() : renderUnitEx())}
        {tab === "words"    && renderWords()}
        {tab === "practice" && renderPractice()}
        {tab === "phonics"  && renderPhonics()}

        {renderPopup()}
        {renderWPopup()}
      </div>
    </>
  );
}
