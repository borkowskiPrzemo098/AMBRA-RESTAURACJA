(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Godziny otwarcia: dzień tygodnia (0 = niedziela) -> [otwarcie, zamknięcie] w minutach
  const HOURS = { 0: [780, 1200], 1: null, 2: null, 3: [1050, 1380], 4: [1050, 1380], 5: [1050, 1440], 6: [1050, 1440] };
  const DAYS = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];
  const hm = m => `${Math.floor(m / 60) % 24}:${String(m % 60).padStart(2, '0')}`;
  const zl = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł';
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = v => { const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d, 12); };

  // --- status otwarcia
  function updateStatus() {
    const now = new Date(), d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    const t = HOURS[d], el = $('#status'), txt = $('#statusText');
    const open = !!t && m >= t[0] && m < t[1];
    el.classList.toggle('is-open', open);
    if (open) txt.textContent = `Dziś otwarte do ${hm(t[1])}`;
    else if (t && m < t[0]) txt.textContent = `Dziś kolacje od ${hm(t[0])}`;
    else {
      let n = 1; while (!HOURS[(d + n) % 7]) n++;
      const nd = (d + n) % 7;
      txt.textContent = `Zapraszamy ${n === 1 ? 'jutro' : 'w ' + DAYS[nd]} od ${hm(HOURS[nd][0])}`;
    }
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  // --- header: przezroczysty na hero, pełny po przewinięciu
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- menu mobilne
  const burger = $('#burger'), nav = $('#nav');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  }
  burger.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) setNav(false); });

  // --- menu degustacyjne
  const U = id => `https://images.unsplash.com/${id}?w=1000&q=80`;
  const MENUS = {
    bursztyn: {
      name: 'Bursztyn', price: 590, img: 'photo-1580959375944-abd7e991f971',
      intro: 'Pełna opowieść o Pomorzu — od przystani w Jastarni po sady Kaszub.',
      pair: 'Dobór win: klasyczny +390 zł, Prestige +790 zł, bez alkoholu +190 zł.',
      courses: [
        ['Chleb żytni i masło z ikry', 'Mąka z młyna w Kościerzynie, ikra pstrąga'],
        ['Śledź i kiszone jabłko', 'Śledź bałtycki marynowany 40 dni, antonówka, koperek'],
        ['Ostryga i rokitnik', 'Rokitnik fermentowany, olej z lubczyku'],
        ['Burak pieczony w soli', 'Kozi twaróg z Kaszub, czarny czosnek, kminek'],
        ['Sandacz z Zalewu Wiślanego', 'Sos maślany z cydrem, grillowany por, kawior'],
        ['Kaczka z Żuław', 'Dojrzewana 14 dni, wiśnie w occie, pieczona marchew'],
        ['Ser Bursztyn 24 miesiące', 'Miód gryczany, orzech laskowy, chleb na zakwasie'],
        ['Rokitnik, maślanka, jodła', 'Sorbet z rokitnika, mus z maślanki, olejek jodłowy'],
        ['Słodkie zakończenie', 'Krówka, galaretka z pigwy, trufla miodowa'],
      ],
    },
    baltyk: {
      name: 'Bałtyk', price: 420, img: 'photo-1467003909585-2f8a72700288',
      intro: 'Sześć dań z ryb i owoców morza złowionych najwyżej dwa dni wcześniej.',
      pair: 'Dobór win: klasyczny +290 zł, Prestige +590 zł, bez alkoholu +150 zł.',
      courses: [
        ['Chleb żytni i masło z ikry', 'Mąka z młyna w Kościerzynie, ikra pstrąga'],
        ['Ostryga i rokitnik', 'Rokitnik fermentowany, olej z lubczyku'],
        ['Tatar z łososia bałtyckiego', 'Ogórek małosolny, chrzan, kwaśna śmietana'],
        ['Sandacz z Zalewu Wiślanego', 'Sos maślany z cydrem, grillowany por, kawior'],
        ['Dorsz wędzony na olsze', 'Ziemniak z masłem, sos z małży, jarmuż'],
        ['Rokitnik, maślanka, jodła', 'Sorbet z rokitnika, mus z maślanki, olejek jodłowy'],
      ],
    },
    ogrod: {
      name: 'Ogród', price: 380, img: 'photo-1592417817098-8fd3d9eb14a5',
      intro: 'Siedem dań roślinnych z warzyw z naszego ogrodu pod Kartuzami.',
      pair: 'Dobór win: klasyczny +320 zł, bez alkoholu +170 zł.',
      courses: [
        ['Chleb żytni i masło orzechowe', 'Mąka z Kościerzyny, masło z prażonych orzechów laskowych'],
        ['Pomidory z ogrodu', 'Pomidory malinowe, serwatka owsiana, nasturcja'],
        ['Tatar z buraka', 'Burak pieczony w soli, kapary z nasturcji'],
        ['Seler pieczony w popiele', 'Sos z grzybów leśnych, orzech włoski, tymianek'],
        ['Pierogi z kaszą i borowikami', 'Masło z czosnkiem niedźwiedzim, cebula w occie'],
        ['Gruszka, siano, karmel', 'Gruszka pieczona w sianie, lody z mleka owsianego'],
        ['Słodkie zakończenie', 'Krówka owsiana, galaretka z pigwy'],
      ],
    },
  };
  const menuImg = $('#menuImg');
  function renderMenu(key) {
    const m = MENUS[key];
    $('#menuIntro').textContent = m.intro;
    $('#menuPrice').textContent = zl(m.price);
    $('#menuPair').textContent = m.pair;
    $('#courses').innerHTML = m.courses.map(c => `<li><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('');
    $('#menuBook').dataset.menu = key;
    const src = U(m.img);
    if (menuImg.getAttribute('src') !== src) {
      menuImg.classList.add('is-fading');
      const pre = new Image();
      pre.onload = pre.onerror = () => { menuImg.src = src; menuImg.classList.remove('is-fading'); };
      pre.src = src;
    }
  }
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => { const on = x === t; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', String(on)); });
    renderMenu(t.dataset.menu);
  }));
  $('#menuBook').addEventListener('click', e => {
    const r = document.querySelector(`input[name="menu"][value="${e.currentTarget.dataset.menu}"]`);
    if (r) { r.checked = true; updateTicket(); }
  });
  renderMenu('bursztyn');

  // --- galeria
  const track = $('#track'), arrows = $$('.arrow');
  arrows.forEach(a => a.addEventListener('click', () => {
    const img = track.querySelector('img');
    track.scrollBy({ left: (img.offsetWidth + 20) * Number(a.dataset.dir), behavior: 'smooth' });
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
  const form = $('#form'), date = $('#date'), time = $('#time'), people = $('#people');
  const max = new Date(); max.setDate(max.getDate() + 60);
  date.min = iso(new Date());
  date.max = iso(max);

  function fillTimes() {
    time.innerHTML = '';
    if (!date.value) { time.add(new Option('Najpierw data', '')); time.disabled = true; return; }
    const d = parse(date.value), h = HOURS[d.getDay()];
    if (!h) { time.add(new Option('Tego dnia zamknięte', '')); time.disabled = true; return; }
    const isToday = date.value === iso(new Date());
    const nowM = new Date().getHours() * 60 + new Date().getMinutes() + 90;
    const slots = [];
    for (let m = h[0]; m <= h[1] - 210; m += 30) if (!isToday || m >= nowM) slots.push(m);
    if (!slots.length) { time.add(new Option('Brak wolnych godzin', '')); time.disabled = true; return; }
    time.add(new Option('Wybierz', ''));
    slots.forEach(m => time.add(new Option(hm(m), hm(m))));
    time.disabled = false;
  }

  function updateTicket() {
    const m = MENUS[form.menu.value], n = Number(people.value);
    $('#tMenu').textContent = m.name;
    $('#tPeople').textContent = String(n);
    $('#tDate').textContent = date.value ? parse(date.value).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', weekday: 'short' }) : '—';
    $('#tTime').textContent = time.value || '—';
    $('#tTotal').textContent = zl(m.price * n);
  }

  function setErr(id, msg) {
    const el = document.getElementById(id);
    $(`#${id}-err`).textContent = msg;
    el.closest('.field').classList.toggle('has-err', !!msg);
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  date.addEventListener('change', () => {
    fillTimes();
    const d = date.value ? parse(date.value) : null;
    setErr('date', d && !HOURS[d.getDay()] ? 'W poniedziałki i wtorki jesteśmy zamknięci — wybierz inny dzień.' : '');
    updateTicket();
  });
  time.addEventListener('change', () => { setErr('time', ''); updateTicket(); });
  form.addEventListener('change', e => { if (e.target.name === 'menu' || e.target === people) updateTicket(); });
  ['name', 'phone', 'email'].forEach(id => document.getElementById(id).addEventListener('input', () => setErr(id, '')));
  fillTimes();
  updateTicket();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errs = [];
    const d = date.value ? parse(date.value) : null;
    if (!d) errs.push(['date', 'Wybierz datę kolacji.']);
    else if (!HOURS[d.getDay()]) errs.push(['date', 'W poniedziałki i wtorki jesteśmy zamknięci — wybierz inny dzień.']);
    else if (date.value < date.min || date.value > date.max) errs.push(['date', 'Rezerwujemy na najbliższe 60 dni.']);
    if (!time.value) errs.push(['time', 'Wybierz godzinę.']);
    if (form.name.value.trim().length < 3) errs.push(['name', 'Podaj imię i nazwisko.']);
    if (form.phone.value.replace(/\D/g, '').length < 9) errs.push(['phone', 'Podaj numer telefonu (9 cyfr).']);
    if (!/^\S+@\S+\.\S+$/.test(form.email.value.trim())) errs.push(['email', 'Podaj poprawny adres e-mail.']);
    ['date', 'time', 'name', 'phone', 'email'].forEach(id => setErr(id, ''));
    if (errs.length) {
      errs.forEach(([id, msg]) => setErr(id, msg));
      const first = document.getElementById(errs[0][0]);
      first.focus({ preventScroll: true });
      first.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    const btn = $('#submit');
    btn.disabled = true; btn.textContent = 'Rezerwuję…';
    setTimeout(() => {
      const m = MENUS[form.menu.value], n = Number(people.value);
      const dd = d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });
      $('#doneText').textContent = `Menu ${m.name} dla ${n === 1 ? '1 osoby' : n + ' osób'}, ${dd}, godz. ${time.value}. Potwierdzenie i link do przedpłaty (${zl(200 * n)}) wyślemy na ${form.email.value.trim()}.`;
      $('#formBody').hidden = true;
      const done = $('#done'); done.hidden = false; done.focus();
      btn.disabled = false; btn.textContent = 'Potwierdź rezerwację';
    }, 800);
  });

  $('#again').addEventListener('click', () => {
    form.reset();
    ['date', 'time', 'name', 'phone', 'email'].forEach(id => setErr(id, ''));
    fillTimes(); updateTicket();
    $('#done').hidden = true; $('#formBody').hidden = false;
    date.focus();
  });

  // --- pływający przycisk rezerwacji (telefon): chowa się na hero i przy formularzu
  const fab = $('#fab');
  if ('IntersectionObserver' in window) {
    const seen = { hero: true, book: false };
    const sync = () => fab.classList.toggle('is-hidden', seen.hero || seen.book);
    new IntersectionObserver(([en]) => { seen.hero = en.isIntersecting; sync(); }, { threshold: 0.2 }).observe($('.hero'));
    new IntersectionObserver(([en]) => { seen.book = en.isIntersecting; sync(); }, { threshold: 0 }).observe($('#rezerwacja'));
    sync();
  }
})();
