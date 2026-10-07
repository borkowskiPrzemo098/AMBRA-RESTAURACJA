// Godziny otwarcia: dzień tygodnia (0 = niedziela) -> [otwarcie, zamknięcie] w minutach
const HOURS = { 0: [600, 1260], 1: null, 2: [720, 1320], 3: [720, 1320], 4: [720, 1320], 5: [720, 1380], 6: [600, 1380] };
const DAYS = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];
const hm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;

// --- status "otwarte teraz"
function updateStatus() {
  const now = new Date();
  const d = now.getDay();
  const m = now.getHours() * 60 + now.getMinutes();
  const today = HOURS[d];
  const el = document.getElementById('status');
  const txt = document.getElementById('statusText');
  const open = today && m >= today[0] && m < today[1];
  el.classList.toggle('is-open', !!open);
  el.classList.toggle('is-closed', !open);
  if (open) {
    const left = today[1] - m;
    txt.textContent = left <= 60 ? `Otwarte jeszcze ${left} min — kuchnia do ${hm(today[1] - 30)}` : `Otwarte teraz · do ${hm(today[1])}`;
  } else if (today && m < today[0]) {
    txt.textContent = `Zamknięte · otwieramy dziś o ${hm(today[0])}`;
  } else {
    let n = 1;
    while (!HOURS[(d + n) % 7]) n++;
    const nd = (d + n) % 7;
    txt.textContent = `Zamknięte · otwieramy ${n === 1 ? 'jutro' : 'w ' + DAYS[nd]} o ${hm(HOURS[nd][0])}`;
  }
  document.querySelectorAll('#hours li').forEach(li => li.classList.toggle('is-today', +li.dataset.d === d));
}
updateStatus();
setInterval(updateStatus, 60000);

// --- menu
const MENU = [
  { c: 'start', n: 'Chleb na zakwasie z naszego pieca', d: 'Masło ziołowe, smalec z jabłkiem, ogórek kiszony', p: 18, t: ['vege'] },
  { c: 'start', n: 'Tatar z polędwicy', d: 'Żółtko marynowane w soi, grzyby leśne, grzanka', p: 44, t: [] },
  { c: 'start', n: 'Śledź w trzech odsłonach', d: 'W oleju lnianym, w śmietanie, z burakiem', p: 36, t: ['gf'] },
  { c: 'start', n: 'Pieczony burak z kozim serem', d: 'Orzechy włoskie, miód gryczany, rukola', p: 32, t: ['vege', 'gf'] },
  { c: 'soup', n: 'Żurek na zakwasie żytnim', d: 'Biała kiełbasa z Kaszub, jajko, chrzan', p: 26, t: [] },
  { c: 'soup', n: 'Krem z pieczonej dyni', d: 'Pestki dyni, olej z pestek, kwaśna śmietana', p: 24, t: ['vege', 'gf'] },
  { c: 'soup', n: 'Rosół z kury zagrodowej', d: 'Domowy makaron, marchew, natka', p: 22, t: [] },
  { c: 'main', n: 'Polędwica z Kaszub', d: 'Sezonowana 28 dni, masło z czosnkiem niedźwiedzim, pieczona marchew', p: 89, t: ['gf'] },
  { c: 'main', n: 'Tagliatelle z kurkami', d: 'Ręcznie krojony makaron, śmietana, tymianek, parmezan', p: 46, t: ['vege'] },
  { c: 'main', n: 'Dorsz z Jastarni', d: 'Puree z selera, masło palone, kapusta pak choi', p: 64, t: ['gf'] },
  { c: 'main', n: 'Pierogi z kaszą i twarogiem', d: 'Skwarki lub cebula karmelizowana, kwaśna śmietana', p: 38, t: ['vege'] },
  { c: 'main', n: 'Kaczka pieczona z jabłkami', d: 'Modra kapusta, kluski śląskie, sos z żurawiny', p: 72, t: [] },
  { c: 'main', n: 'Risotto z boczniakami', d: 'Ryż carnaroli, masło, szczypiorek, ser bursztyn', p: 48, t: ['vege', 'gf'] },
  { c: 'dessert', n: 'Pavlova z jagodami', d: 'Beza, krem z mascarpone, jagody z Borów Tucholskich', p: 28, t: ['vege', 'gf'] },
  { c: 'dessert', n: 'Szarlotka na ciepło', d: 'Lody waniliowe, kruszonka z orzechami', p: 24, t: ['vege'] },
  { c: 'dessert', n: 'Sernik baskijski', d: 'Karmel z masłem solonym, śliwki w occie balsamicznym', p: 26, t: ['vege', 'gf'] },
];
const TAGS = { vege: 'Wege', gf: 'Bez glutenu' };
const state = { cat: 'all', tags: new Set() };
const box = document.getElementById('dishes');
const empty = document.getElementById('empty');

function renderMenu() {
  const list = MENU.filter(x => (state.cat === 'all' || x.c === state.cat) && [...state.tags].every(t => x.t.includes(t)));
  box.innerHTML = list.map((x, i) => `
    <article class="dish" style="animation-delay:${Math.min(i, 8) * 30}ms">
      <h3>${x.n}</h3><span class="price">${x.p} zł</span>
      <p>${x.d}</p>
      ${x.t.length ? `<div class="tags">${x.t.map(t => `<span class="tag">${TAGS[t]}</span>`).join('')}</div>` : ''}
    </article>`).join('');
  empty.hidden = list.length > 0;
}
document.querySelectorAll('.chip').forEach(btn => btn.addEventListener('click', () => {
  if (btn.dataset.filter) {
    state.cat = btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
  } else {
    const t = btn.dataset.tag;
    state.tags.has(t) ? state.tags.delete(t) : state.tags.add(t);
    btn.classList.toggle('is-on', state.tags.has(t));
    btn.setAttribute('aria-pressed', state.tags.has(t));
  }
  renderMenu();
}));
document.getElementById('reset').addEventListener('click', () => {
  state.tags.clear();
  document.querySelectorAll('[data-tag]').forEach(b => { b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); });
  document.querySelector('[data-filter="all"]').click();
});
renderMenu();

// --- nawigacja mobilna
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
function setNav(open) {
  nav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
}
burger.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

// --- galeria
const track = document.getElementById('track');
const arrows = document.querySelectorAll('.arrow');
arrows.forEach(a => a.addEventListener('click', () => {
  const step = track.querySelector('img').offsetWidth + 20;
  track.scrollBy({ left: step * +a.dataset.dir, behavior: 'smooth' });
}));
function syncArrows() {
  arrows[0].disabled = track.scrollLeft < 8;
  arrows[1].disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
}
track.addEventListener('scroll', syncArrows, { passive: true });
track.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); arrows[1].click(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); arrows[0].click(); }
});
window.addEventListener('load', syncArrows);
syncArrows();

// --- rezerwacja
const form = document.getElementById('form');
const date = document.getElementById('date');
const time = document.getElementById('time');
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = new Date();
const max = new Date(); max.setDate(max.getDate() + 60);
date.min = iso(today);
date.max = iso(max);

function fillTimes() {
  time.innerHTML = '';
  if (!date.value) { time.add(new Option('Najpierw wybierz datę', '')); return; }
  const d = new Date(date.value + 'T12:00');
  const h = HOURS[d.getDay()];
  if (!h) { time.add(new Option('W poniedziałki zamknięte', '')); return; }
  const isToday = date.value === iso(new Date());
  const nowM = new Date().getHours() * 60 + new Date().getMinutes() + 60;
  time.add(new Option('Wybierz godzinę', ''));
  let any = false;
  for (let m = h[0]; m <= h[1] - 90; m += 30) {
    if (isToday && m < nowM) continue;
    time.add(new Option(hm(m), hm(m)));
    any = true;
  }
  if (!any) { time.innerHTML = ''; time.add(new Option('Na dziś brak wolnych godzin', '')); }
}
date.addEventListener('change', () => { fillTimes(); clearErr('date'); });
time.addEventListener('change', () => clearErr('time'));

function setErr(id, msg) { document.getElementById(id + '-err').textContent = msg; document.getElementById(id).closest('.field').classList.add('has-err'); document.getElementById(id).setAttribute('aria-invalid', 'true'); }
function clearErr(id) { document.getElementById(id + '-err').textContent = ''; document.getElementById(id).closest('.field').classList.remove('has-err'); document.getElementById(id).removeAttribute('aria-invalid'); }
['name', 'phone'].forEach(id => document.getElementById(id).addEventListener('input', () => clearErr(id)));

form.addEventListener('submit', e => {
  e.preventDefault();
  ['date', 'time', 'name', 'phone'].forEach(clearErr);
  const errs = [];
  if (!date.value) errs.push(['date', 'Wybierz datę wizyty.']);
  else if (!HOURS[new Date(date.value + 'T12:00').getDay()]) errs.push(['date', 'W poniedziałki jesteśmy zamknięci — wybierz inny dzień.']);
  else if (date.value < date.min || date.value > date.max) errs.push(['date', 'Rezerwujemy na najbliższe 60 dni.']);
  if (!time.value) errs.push(['time', 'Wybierz godzinę z listy.']);
  if (form.name.value.trim().length < 3) errs.push(['name', 'Podaj imię i nazwisko — na nie zapiszemy stolik.']);
  if (form.phone.value.replace(/\D/g, '').length < 9) errs.push(['phone', 'Podaj numer telefonu (9 cyfr) — wyślemy SMS z potwierdzeniem.']);
  if (errs.length) { errs.forEach(([id, m]) => setErr(id, m)); document.getElementById(errs[0][0]).focus(); return; }

  const btn = document.getElementById('submit');
  btn.disabled = true;
  btn.textContent = 'Rezerwuję…';
  setTimeout(() => {
    const people = form.people.value;
    const label = people === '6' ? '5–6 osób' : people === '8' ? '7–8 osób' : people === '1' ? '1 osobę' : `${people} osoby`;
    const d = new Date(date.value + 'T12:00').toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('doneText').textContent = `Stolik dla ${label}, ${d}, godz. ${time.value}. SMS z potwierdzeniem wyślemy na numer ${form.phone.value.trim()}.`;
    document.getElementById('formBody').hidden = true;
    const done = document.getElementById('done');
    done.hidden = false;
    done.focus();
    btn.disabled = false;
    btn.textContent = 'Zarezerwuj stolik';
  }, 900);
});
document.getElementById('again').addEventListener('click', () => {
  form.reset(); fillTimes();
  document.getElementById('done').hidden = true;
  document.getElementById('formBody').hidden = false;
  date.focus();
});

// --- pływający przycisk rezerwacji chowa się przy formularzu
const fab = document.querySelector('.fab');
new IntersectionObserver(([en]) => fab.classList.toggle('is-hidden', en.isIntersecting), { threshold: .15 })
  .observe(document.getElementById('rezerwacja'));
