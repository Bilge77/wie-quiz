// =======================
//  WIE QUIZ - FINAL (stable)
//  - 6 questions
//  - question images
//  - result images
//  - guaranteed single winner
//  - onedio-style result text + "bunlara benziyorsun"
// =======================

const archetypes = {
  discoverer: {
    tr: "KAŞİF",
    en: "The Discoverer",
    img: "assets/r-discoverer.png",
    desc: `Sen olaylara duygudan çok gerçekler üzerinden bakanlardansın.
“Bana kanıtını göster” demeden ikna olmuyorsun.
Yeni bir problem gördüğünde önce analiz eder, sonra harekete geçersin.
Merakın seni ileri taşırken ayağın hep yere basıyor.`,
    looksLike: "Marie Curie · Tu Youyou · Hypatia"
  },
  builder: {
    tr: "USTA",
    en: "The Builder",
    img: "assets/r-builder.png",
    desc: `Senin için “olmuş” demek gerçekten olmuş demek.
Detaylar senin oyun alanın; yarım işler seni hiç mutlu etmiyor.
Saatlerce aynı konu üzerinde çalışabilir, ortaya sağlam bir şey koyarsın.`,
    looksLike: "Marie Curie · Ada Lovelace · Rosalind Franklin"
  },
  innovator: {
    tr: "YENİLİKÇİ",
    en: "The Innovator",
    img: "assets/r-innovator.png",
    desc: `Sen fikirlerin konuşarak büyüdüğüne inanıyorsun.
Ortamda enerjin hissediliyor ve insanları kolayca bir araya getirebiliyorsun.
Bilim senin için paylaşınca ve anlatınca daha da anlam kazanıyor.`,
    looksLike: "Jane Goodall · Mae Jemison · Katie Bouman"
  },
  planner: {
    tr: "PLANLAYICI",
    en: "The Planner",
    img: "assets/r-planner.png",
    desc: `Sen kaosu sevmiyorsun.
Her şeyin bir zamanı, bir sırası ve bir planı olmalı.
Sessiz ama kararlı şekilde ilerliyor, sistemi ayakta tutuyorsun.`,
    looksLike: "Rosalind Franklin · Barbara McClintock · Emmy Noether"
  }
};

// tie-break için sabit sıra (son çare)
const stableOrder = ["discoverer", "builder", "innovator", "planner"];

// 6 soru (sıra sabit)
const questions = [
  {
    q: "Bir problem ile karşılaştığında bunu çözmek için nasıl bir yöntem kullanırsın?",
    img: "assets/q-problem.png",
    a: [
      { label: "A", text: "Nesnel değerlendirme yaparak çözüm ararım", primary: "discoverer",
        score: { discoverer: 3, builder: 1, innovator: 0, planner: 1 } },
      { label: "B", text: "Detaylara odaklanarak sorunun derinine inerim", primary: "builder",
        score: { discoverer: 0, builder: 3, innovator: 0, planner: 1 } },
      { label: "C", text: "Fikir alışverişinde bulunarak çözmeye çalışırım", primary: "innovator",
        score: { discoverer: 0, builder: 0, innovator: 3, planner: 1 } },
      { label: "D", text: "İyi bir plan çıkartarak kontrollü bir biçimde ilerlerim", primary: "planner",
        score: { discoverer: 1, builder: 0, innovator: 0, planner: 3 } },
    ],
  },
  {
    q: "Okulda kahveni nereden içersin?",
    img: "assets/q-coffee.png",
    a: [
      { label: "A", text: "Mio", primary: "discoverer",
        score: { discoverer: 2, builder: 2, innovator: 1, planner: 1 } },
      { label: "B", text: "Starbucks", primary: "builder",
        score: { discoverer: 0, builder: 3, innovator: 0, planner: 2 } },
      { label: "C", text: "Fuaye", primary: "innovator",
        score: { discoverer: 0, builder: 0, innovator: 4, planner: 0 } },
      { label: "D", text: "Otomat", primary: "planner",
        score: { discoverer: 1, builder: 0, innovator: 0, planner: 3 } },
    ],
  },
  {
    q: "Okuldaki favori yemek mekanın neresi?",
    img: "assets/q-food.png",
    a: [
      { label: "A", text: "Subway", primary: "innovator",
        score: { discoverer: 1, builder: 0, innovator: 3, planner: 0 } },
      { label: "B", text: "Dışarıdan söylerim.", primary: "planner",
        score: { discoverer: 0, builder: 2, innovator: 0, planner: 3 } },
      { label: "C", text: "Nar", primary: "builder",
        score: { discoverer: 2, builder: 3, innovator: 0, planner: 1 } },
      { label: "D", text: "Etü Mutfak", primary: "planner",
        score: { discoverer: 1, builder: 0, innovator: 0, planner: 2 } },
    ],
  },
  {
    q: "Yeni bir işe başlıyorsunuz. İlk günkü yaklaşımınız ne olur?",
    img: "assets/q-firstday.png",
    a: [
      { label: "A", text: "Süreci değerlendirebilmek için mevcut yaklaşımları öğrenirim", primary: "discoverer",
        score: { discoverer: 3, builder: 1, innovator: 0, planner: 1 } },
      { label: "B", text: "İş ile alakalı ayrıntıları eksiksiz bir şekilde öğrenmeye çalışırım", primary: "builder",
        score: { discoverer: 0, builder: 3, innovator: 0, planner: 1 } },
      { label: "C", text: "Ekip üyelerime kendimi tanıtarak işleyişi kavramaya çalışırım", primary: "innovator",
        score: { discoverer: 0, builder: 0, innovator: 3, planner: 1 } },
      { label: "D", text: "Görevlerimi planlayarak bir çalışma düzeni oluşturmaya çalışırım", primary: "planner",
        score: { discoverer: 1, builder: 0, innovator: 0, planner: 3 } },
    ],
  },
  {
    q: "Final haftası senin için nasıl geçer?",
    img: "assets/q-finals.png",
    a: [
      { label: "A", text: "Son dakika çıkmışlara bakar, sınavdan sonra koşarak okey oynamaya giderim.", primary: "innovator",
        score: { discoverer: 2, builder: 0, innovator: 2, planner: 0 } },
      { label: "B", text: "Kütüphaneden çıkmam.", primary: "builder",
        score: { discoverer: 1, builder: 4, innovator: 0, planner: 1 } },
      { label: "C", text: "Fuayede çay çorbayla sabahlarım.", primary: "innovator",
        score: { discoverer: 0, builder: 1, innovator: 4, planner: 0 } },
      { label: "D", text: "Kendimi eve/yurda kapatırım.", primary: "planner",
        score: { discoverer: 0, builder: 2, innovator: 0, planner: 4 } },
    ],
  },
  {
    q: "Motivasyonunu sağlamak için ne yaparsın?",
    img: "assets/q-motivation.png",
    a: [
      { label: "A", text: "Analitik ve mantıklı sonuçlara ulaşmak", primary: "discoverer",
        score: { discoverer: 4, builder: 1, innovator: 0, planner: 1 } },
      { label: "B", text: "Çalışmanın eksiksiz ve detaylı olması", primary: "builder",
        score: { discoverer: 0, builder: 4, innovator: 0, planner: 2 } },
      { label: "C", text: "Takım çalışması sonucu ortaya çıkmış bir ürün olması", primary: "innovator",
        score: { discoverer: 0, builder: 0, innovator: 4, planner: 1 } },
      { label: "D", text: "Planlanan programa birebir uyum sağlayabilmek", primary: "planner",
        score: { discoverer: 1, builder: 1, innovator: 0, planner: 4 } },
    ],
  },
];

let step = 0;
let selected = Array(questions.length).fill(null);

const screen = document.getElementById("screen");
const progressBar = document.getElementById("progressBar");

function resetScores() {
  return { discoverer: 0, builder: 0, innovator: 0, planner: 0 };
}

function calcScoresAndPrimaryCounts() {
  const scores = resetScores();
  const primaryCounts = resetScores();

  selected.forEach((choiceIndex, qi) => {
    if (choiceIndex === null) return;
    const opt = questions[qi].a[choiceIndex];
    for (const k in opt.score) scores[k] += opt.score[k];
    primaryCounts[opt.primary] += 1;
  });

  return { scores, primaryCounts };
}

function getWinnerGuaranteed() {
  const { scores, primaryCounts } = calcScoresAndPrimaryCounts();

  // 1) max score
  let best = stableOrder[0];
  for (const k of stableOrder) if (scores[k] > scores[best]) best = k;

  const topScore = scores[best];
  let tied = stableOrder.filter(k => scores[k] === topScore);
  if (tied.length === 1) return tied[0];

  // 2) primaryCounts
  let best2 = tied[0];
  for (const k of tied) if (primaryCounts[k] > primaryCounts[best2]) best2 = k;

  const topPrimary = primaryCounts[best2];
  tied = tied.filter(k => primaryCounts[k] === topPrimary);
  if (tied.length === 1) return tied[0];

  // 3) stable order
  for (const k of stableOrder) if (tied.includes(k)) return k;
  return tied[0];
}

function setProgress() {
  const pct = Math.round((Math.min(step, questions.length) / questions.length) * 100);
  progressBar.style.width = `${pct}%`;
}

function renderQuestion(i) {
  const q = questions[i];

  screen.innerHTML = `
    <div class="questionBox">
      <div class="questionImageWrap">
        <img src="${q.img}" class="questionImage" alt="question visual">
      </div>

      <div class="q-title">${i + 1}. ${q.q}</div>

      <div class="options">
        ${q.a.map((opt, idx) => `
          <button type="button" class="option" data-idx="${idx}">
            <strong>${opt.label})</strong> ${opt.text}
          </button>
        `).join("")}
      </div>
    </div>
  `;

  setProgress();

  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-idx"));
      selected[i] = idx;

      // spam engeli
      document.querySelectorAll(".option").forEach(b => (b.disabled = true));

      // otomatik geçiş
      setTimeout(() => {
        step += 1;
        render();
      }, 180);
    });
  });
}

function renderResult() {
  progressBar.style.width = "100%";

  const key = getWinnerGuaranteed();
  const r = archetypes[key];

  screen.innerHTML = `
    <div class="questionBox">
      <div class="questionImageWrap">
        <img src="${r.img}" class="questionImage" alt="result visual">
      </div>

      <div class="q-title" style="font-size:24px;">
        ${r.tr}
        <span class="en-sub">${r.en}</span>
      </div>

      <p style="font-weight:650; line-height:1.55; margin: 10px 0 12px; color: rgba(26,16,40,.90);">
        ${r.desc.replace(/\n/g, "<br>")}
      </p>

      <p style="font-size:14px; margin: 0 0 14px; color: rgba(26,16,40,.85);">
        <strong>Bunlara benziyorsun:</strong><br>
        ${r.looksLike}
      </p>

      <div class="options" style="margin-top:8px;">
        <button class="option" id="restartBtn">Tekrar Dene</button>
      </div>
    </div>
  `;

  document.getElementById("restartBtn").addEventListener("click", () => {
    step = 0;
    selected = Array(questions.length).fill(null);
    render();
  });
}

function render() {
  if (step < questions.length) renderQuestion(step);
  else renderResult();
}

render();
