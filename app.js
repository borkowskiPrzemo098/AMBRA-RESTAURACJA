// Godziny otwarcia: dzień tygodnia (0 = niedziela) -> [otwarcie, zamknięcie] w minutach
const HOURS = { 0: [780, 1200], 1: null, 2: null, 3: [1050, 1380], 4: [1050, 1380], 5: [1050, 1440], 6: [1050, 1440] };
const DAYS = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];
const SHORT = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
const MONTHS = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const hm = m => `${Math.floor(m / 60) % 24}:${String(m % 60).padStart(2, '0')}`;
const zl = n => n.toLocaleString('pl-PL').replace(/ /g, ' ') + ' zł';
const $ = s => document.querySelector(s);

// --- status
function updateStatus() {
  const now = new Date(), d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
  const t = HOURS[d], el = $('#status'), txt = $('#statusText');
  const open = t && m >= t[0] && m < t[1];
  el.classList.toggle('is-open', !!open);
  el.classList.toggle('is-closed', !open);
  if (open) txt.textContent = `Dziś otwarte do ${hm(t[1])}`;
  else if (t && m < t[0]) txt.textContent = `Dziś kolacje od ${hm(t[0])}`;
  else {
    let n = 1; while (!HOURS[(d + n) % 7]) n++;
    const nd = (d + n) % 7;
    txt.textContent = `Otwieramy ${n === 1 ? 'jutro' : 'w ' + DAYS[nd]} o ${hm(HOURS[nd][0])}`;
  }
  const map = { 3: 3, 4: 3, 5: 5, 6: 5, 0: 0, 1: 1, 2: 2 };
  document.querySelectorAll('#hours li').forEach(li => li.classList.toggle('is-today', +li.dataset.d === map[d]));
}
updateStatus();
setInterval(updateStatus, 60000);

// --- menu degustacyjne
const IMG = id => `https://images.unsplash.com/${id}?w=1100&q=80`;
const MENUS = {
  bursztyn: {
    name: 'Bursztyn', price: 590,
    intro: 'Pełna opowieść o Pomorzu — od przystani w Jastarni po sady Kaszub.',
    pair: 'Dobór win klasyczny +390 zł · Prestige +790 zł · bezalkoholowy +190 zł',
    courses: [
      ['Chleb żytni i masło z ikry', 'Mąka z młyna w Kościerzynie, masło klarowane, ikra pstrąga', 'photo-1414235077428-338989a2e8c0'],
      ['Śledź, kiszone jabłko', 'Śledź bałtycki marynowany 40 dni, jabłko antonówka, koperek', 'photo-1592417817098-8fd3d9eb14a5'],
      ['Ostryga z Zatoki i rokitnik', 'Rokitnik fermentowany, olej z lubczyku', 'photo-1467003909585-2f8a72700288'],
      ['Burak pieczony w soli', 'Kozi twaróg z Kaszub, czarny czosnek, kminek łąkowy', 'photo-1592417817098-8fd3d9eb14a5'],
      ['Sandacz z Zalewu Wiślanego', 'Sos beurre blanc z cydrem, por grillowany, kawior z Czarnego Potoku', 'photo-1580959375944-abd7e991f971'],
      ['Kaczka z Żuław dojrzewana 14 dni', 'Wiśnie w occie, pieczona marchew, sos z podrobów', 'photo-1414235077428-338989a2e8c0'],
      ['Ser Bursztyn 24 miesiące', 'Miód gryczany, orzech laskowy, chleb na zakwasie', 'photo-1592417817098-8fd3d9eb14a5'],
      ['Rokitnik, maślanka, jodła', 'Sorbet z rokitnika, mus z maślanki, olejek z igieł jodły', 'photo-1551024506-0bccd828d307'],
      ['Karmel z masłem solonym', 'Petit four: krówka, galaretka z pigwy, trufla z miodu', 'photo-1551024506-0bccd828d307'],
    ],
  },
  baltyk: {
    name: 'Bałtyk', price: 420,
    intro: 'Sześć dań z ryb i owoców morza złowionych najwyżej dwa dni wcześniej.',
    pair: 'Dobór win klasyczny +290 zł · Prestige +590 zł · bezalkoholowy +150 zł',
    courses: [
      ['Chleb żytni i masło z ikry', 'Mąka z młyna w Kościerzynie, masło klarowane, ikra pstrąga', 'photo-1414235077428-338989a2e8c0'],
      ['Ostryga z Zatoki i rokitnik', 'Rokitnik fermentowany, olej z lubczyku', 'photo-1467003909585-2f8a72700288'],
      ['Tatar z łososia bałtyckiego', 'Ogórek małosolny, chrzan, kwaśna śmietana', 'photo-1467003909585-2f8a72700288'],
      ['Sandacz z Zalewu Wiślanego', 'Sos beurre blanc z cydrem, por grillowany, kawior', 'photo-1580959375944-abd7e991f971'],
      ['Dorsz wędzony na olsze', 'Ziemniak z masłem, sos z małży, jarmuż', 'photo-1580959375944-abd7e991f971'],
      ['Rokitnik, maślanka, jodła', 'Sorbet z rokitnika, mus z maślanki, olejek jodłowy', 'photo-1551024506-0bccd828d307'],
    ],
  },
  ogrod: {
    name: 'Ogród', price: 380,
    intro: 'Siedem dań roślinnych z warzyw z naszego ogrodu pod Kartuzami.',
    pair: 'Dobór win klasyczny +320 zł · bezalkoholowy +170 zł',
    courses: [
      ['Chleb żytni i masło z orzechów laskowych', 'Mąka z Kościerzyny, masło roślinne z prażonych orzechów', 'photo-1414235077428-338989a2e8c0'],
      ['Pomidory z ogrodu i lubczyk', 'Pomidory malinowe, serwatka owsiana, kwiaty nasturcji', 'photo-1592417817098-8fd3d9eb14a5'],
      ['Tatar z buraka', 'Burak pieczony w soli, żółtko z kalafiora, kapary z nasturcji', 'photo-1592417817098-8fd3d9eb14a5'],
      ['Seler w popiele', 'Sos z grzybów leśnych, orzech włoski, tymianek', 'photo-1414235077428-338989a2e8c0'],
      ['Pierogi z kaszą i borowikami', 'Masło z czosnkiem niedźwiedzim, cebula w occie', 'photo-1467003909585-2f8a72700288'],
      ['Gruszka, siano, karmel', 'Gruszka pieczona w sianie, lody z mleka owsianego', 'photo-1551024506-0bccd828d307'],
      ['Petit four', 'Krówka owsiana, galaretka z pigwy', 'photo-1551024506-0bccd828d307'],
    ],
  },
};
const img = $('#courseImg'), cap = $('#courseCap');
let swapT;
function showCourse(c) {
  const src = IMG(c[2]);
  cap.textContent = c[0];
  if (img.src === src) return;
  clearTimeout(swapT);
  img.classList.add('is-swap');
  swapT = setTimeout(() => { img.src = src; img.onload = () => img.classList.remove('is-swap'); }, 220);
}
function renderMenu(key) {
  const m = MENUS[key];
  $('#menuIntro').textContent = m.intro;
  $('#menuPrice').textContent = zl(m.price);
  $('#menuPair').textContent = m.pair;
  $('#courses').innerHTML = m.courses.map((c, i) => `<li class="course${i === 0 ? ' is-on' : ''}" data-i="${i}" tabindex="0"><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('');
  $('#menuBook').dataset.menu = key;
  showCourse(m.courses[0]);
  document.querySelectorAll('.course').forEach(li => {
    const on = () => {
      document.querySelectorAll('.course').forEach(x => x.classList.toggle('is-on', x === li));
      showCourse(m.courses[+li.dataset.i]);
    };
    li.addEventListener('mouseenter', on);
    li.addEventListener('focus', on);
  });
}
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => { const on = x === t; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); });
  renderMenu(t.dataset.menu);
}));
$('#menuBook').addEventListener('click', e => {
  const r = document.querySelector(`input[name="menu"][value="${e.currentTarget.dataset.menu}"]`);
  if (r) { r.checked = true; updateSummary(); }
});
renderMenu('bursztyn');

// --- nawigacja mobilna
const burger = $('#burger'), nav = $('#nav');
function setNav(open) {
  nav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
}
burger.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

// --- galeria
const track = $('#track'), arrows = document.querySelectorAll('.arrow');
arrows.forEach(a => a.addEventListener('click', () => {
  track.scrollBy({ left: (track.querySelector('img').offsetWidth + 22) * +a.dataset.dir, behavior: 'smooth' });
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
const form = $('#form'), daysEl = $('#days'), timesEl = $('#times');
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const people = n => n === 1 ? '1 osoba' : n < 5 ? `${n} osoby` : `${n} osób`;

(function buildDays() {
  const html = [];
  for (let i = 0; i < 60; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const closed = !HOURS[d.getDay()];
    html.push(`<label><input type="radio" name="day" value="${iso(d)}"${closed ? ' disabled' : ''}><span><small>${i === 0 ? 'dziś' : i === 1 ? 'jutro' : SHORT[d.getDay()]}</small><b>${d.getDate()}</b><em>${MONTHS[d.getMonth()]}</em></span></label>`);
  }
  daysEl.innerHTML = html.join('');
})();

function buildTimes() {
  const v = form.day.value;
  if (!v) return;
  const d = new Date(v + 'T12:00'), h = HOURS[d.getDay()];
  const isToday = v === iso(new Date());
  const nowM = new Date().getHours() * 60 + new Date().getMinutes() + 90;
  // pseudo-losowo zajęte terminy, stałe dla danego dnia
  const seed = d.getDate() * 7 + d.getMonth();
  const slots = [];
  for (let m = h[0]; m <= h[1] - 210; m += 30) slots.push(m);
  timesEl.innerHTML = slots.map((m, i) => {
    const taken = (isToday && m < nowM) || (seed + i * 3) % 5 === 0;
    return `<label><input type="radio" name="time" value="${hm(m)}"${taken ? ' disabled' : ''}><span>${hm(m)}</span></label>`;
  }).join('') || '<p class="hint">Na ten dzień nie ma już wolnych stolików.</p>';
  if (!timesEl.querySelector('input:not(:disabled)')) timesEl.innerHTML = '<p class="hint">Na ten dzień nie ma już wolnych stolików. Wybierz inny dzień.</p>';
}

function updateSummary() {
  const m = MENUS[form.menu.value], n = +form.people.value;
  $('#sMenu').textContent = `${m.name} · ${m.courses.length} dań`;
  $('#sPeople').textContent = people(n);
  const day = form.day.value, time = form.time ? form.time.value : '';
  $('#sWhen').textContent = day ? new Date(day + 'T12:00').toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'long' }) + (time ? `, ${time}` : '') : '—';
  $('#sTotal').textContent = zl(m.price * n);
}
form.addEventListener('change', e => {
  if (e.target.name === 'day') { buildTimes(); setErr('day', ''); }
  if (e.target.name === 'time') setErr('time', '');
  updateSummary();
});
updateSummary();

function setErr(id, msg) {
  $(`#${id}-err`).textContent = msg;
  const input = document.getElementById(id);
  if (input) { input.closest('.field').classList.toggle('has-err', !!msg); msg ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid'); }
}
['name', 'phone', 'email'].forEach(id => document.getElementById(id).addEventListener('input', () => setErr(id, '')));

form.addEventListener('submit', e => {
  e.preventDefault();
  const errs = [];
  if (!form.day.value) errs.push(['day', 'wybierz dzień', daysEl]);
  if (!form.time || !form.time.value) errs.push(['time', 'wybierz godzinę', timesEl]);
  if (form.name.value.trim().length < 3) errs.push(['name', 'Podaj imię i nazwisko — na nie zapiszemy stolik.']);
  if (form.phone.value.replace(/\D/g, '').length < 9) errs.push(['phone', 'Podaj numer telefonu (9 cyfr), żebyśmy mogli się skontaktować.']);
  if (!/^\S+@\S+\.\S+$/.test(form.email.value.trim())) errs.push(['email', 'Podaj poprawny e-mail — wyślemy na niego potwierdzenie.']);
  ['day', 'time', 'name', 'phone', 'email'].forEach(id => setErr(id, ''));
  if (errs.length) {
    errs.forEach(([id, m]) => setErr(id, m));
    const first = errs[0];
    (first[2] ? first[2].querySelector('input:not(:disabled)') : document.getElementById(first[0]))?.focus();
    (first[2] || document.getElementById(first[0])).scrollIntoView({ block: 'center', behavior: 'smooth' });
    return;
  }
  const btn = $('#submit');
  btn.disabled = true; btn.textContent = 'Rezerwuję…';
  setTimeout(() => {
    const m = MENUS[form.menu.value], n = +form.people.value;
    const d = new Date(form.day.value + 'T12:00').toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });
    $('#doneText').textContent = `Menu ${m.name} dla ${n === 1 ? '1 osoby' : n + ' osób'}, ${d}, godz. ${form.time.value}. Potwierdzenie i link do przedpłaty (${zl(200 * n)}) wyślemy na ${form.email.value.trim()}.`;
    $('#formBody').hidden = true;
    const done = $('#done'); done.hidden = false; done.focus();
    btn.disabled = false; btn.textContent = 'Potwierdź rezerwację';
  }, 900);
});
$('#again').addEventListener('click', () => {
  form.reset();
  timesEl.innerHTML = '<p class="hint">Najpierw wybierz dzień.</p>';
  updateSummary();
  $('#done').hidden = true; $('#formBody').hidden = false;
  daysEl.querySelector('input:not(:disabled)').focus();
});

// --- pływający przycisk
const fab = $('.fab');
new IntersectionObserver(([en]) => fab.classList.toggle('is-hidden', en.isIntersecting), { threshold: .1 }).observe($('#rezerwacja'));

// --- ruch: zdjęcie hero rozszerza się do pełnej szerokości, paralaksa sali prywatnej
window.addEventListener('load', () => {
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo('#heroMedia', { width: () => Math.min(1320, innerWidth - 32) }, {
    width: () => innerWidth, ease: 'none',
    scrollTrigger: { trigger: '#heroMedia', start: 'top 85%', end: 'top 15%', scrub: true, invalidateOnRefresh: true },
  });
  gsap.fromTo('#heroMedia img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#heroMedia', start: 'top bottom', end: 'bottom top', scrub: true } });
  if (innerWidth > 640) gsap.fromTo('#privImg', { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.private', start: 'top bottom', end: 'bottom top', scrub: true } });
});
