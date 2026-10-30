/* =========================================================
   Hadis Content Creator Academy — script.js
   Narasi: Radar Pikiran (Husnul Islam)
   Layout: Menggunakan class dari style.css milik user
   ========================================================= */

let currentFrame = 0; // Selalu mulai dari Adegan-1 (indeks 0)
let playTimer = null;
let isPlaying = false;

/* ---------- 1. DATA NARASI RADAR PIKIRAN ---------- */
const scenes = [
  {
    title: "Adegan-1",
    time: "0-10 detik",
    judul: "Sistem Pertahanan Mental",
    teksLayar: "Bukan sekadar adab, melainkan pertahanan mental.",
    narasi: "Meninggalkan hal yang bukan urusan kita ternyata bukan sekadar adab, melainkan sistem pertahanan mental yang sangat canggih."
  },
  {
    title: "Adegan-2",
    time: "10-20 detik",
    judul: "Radar Pikiran",
    teksLayar: "Pikiran kita adalah radar.",
    narasi: "Setiap hari energi kita habis terkuras oleh informasi luar yang tak penting. Bayangkan kapasitas pikiran kita sebagai sebuah radar."
  },
  {
    title: "Adegan-3",
    time: "20-30 detik",
    judul: "Kebisingan Informasi",
    teksLayar: "Layar dipenuhi titik bising.",
    narasi: "Tiba-tiba layar ini dipenuhi titik-titik kebisingan, drama orang lain, gosip, dan perdebatan liar."
  },
  {
    title: "Adegan-4",
    time: "30-40 detik",
    judul: "Sistem Macet",
    teksLayar: "Kehilangan target penting.",
    narasi: "Saat radar memproses semua titik bising ini tanpa disaring, sistem langsung macet. Kehilangan kapasitas untuk melacak target yang benar-benar penting. Masalahnya radar kita sering tertipu. Ia menganggap semua kebisingan ini sebagai keadaan darurat yang harus segera direspons."
  },
  {
    title: "Adegan-5",
    time: "40-50 detik",
    judul: "Saringan Aktif",
    teksLayar: "Buang yang bukan urusan kita.",
    narasi: "Di sinilah fungsi saringan aktif bekerja. Dengan sadar, membuang dan mengabaikan titik-titik yang bukan urusan kita, ruang dan kecepatan operasi radar langsung pulih secara drastis."
  },
  {
    title: "Adegan-6",
    time: "50-60 detik",
    judul: "Husnul Islam",
    teksLayar: "Ruang jernih, energi utuh.",
    narasi: "Ruang pikiran yang kembali jernih inilah wujud nyata dari husnul Islam. Karena energi yang tadinya terbuang sia-sia kini utuh sepenuhnya untuk tujuan yang bermanfaat dan radar pikiran yang tadinya macet kini beroperasi dengan tenang dan terarah."
  }
];

/* ---------- 2. RENDER GRID/CARD SESUAI STYLE.CSS ---------- */
function renderScenes() {
  const wrap = document.getElementById("scenes");
  if (!wrap) return;

  // Menggunakan class .scene, .visual, .body, dan .pill milik style.css Anda
  wrap.innerHTML = scenes.map((s, i) => `
    <div class="scene">
      <div class="visual" style="min-height: 80px; font-size: 22px; font-weight: bold;">
        ${s.title}
      </div>
      <div class="body">
        <span class="pill">${s.time}</span>
        <label>Judul</label>
        <input type="text" value="${s.judul}" oninput="updateScene(${i}, 'judul', this.value)">
        <label>Teks layar</label>
        <textarea oninput="updateScene(${i}, 'teksLayar', this.value)" style="min-height: 70px;">${s.teksLayar}</textarea>
        <label>Narasi</label>
        <textarea oninput="updateScene(${i}, 'narasi', this.value)" style="min-height: 100px;">${s.narasi}</textarea>
      </div>
    </div>
  `).join("");
}

function updateScene(index, field, value) {
  scenes[index][field] = value;
}

/* ---------- 3. TOGGLE ACCORDION ---------- */
function toggleScenarios() {
  const content = document.getElementById("produksi-content");
  const btn = document.getElementById("generateBtn");
  const label = document.getElementById("generateBtnLabel");
  const chevron = document.getElementById("generateBtnChevron");

  const isCollapsed = content.classList.contains("collapsed");

  if (isCollapsed) {
    currentFrame = 0; // Paksa mulai dari Adegan-1 saat dibuka
    renderScenes();
    renderFrame();

    content.classList.remove("collapsed");
    content.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    label.textContent = "Sembunyikan Skenario";
    chevron.textContent = "▴";
  } else {
    content.classList.add("collapsed");
    content.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    label.textContent = "Susun Skenario dari Hadis";
    chevron.textContent = "▾";
    stopPlay();
  }
}

/* ---------- 4. PRATINJAU 9:16 ---------- */
function renderFrame() {
  const s = scenes[currentFrame];
  if (!s) return;

  const timeEl = document.getElementById("frameTime");
  const titleEl = document.getElementById("frameTitle");
  const captionEl = document.getElementById("frameCaption");
  const arabicEl = document.getElementById("frameArabic");

  if (timeEl) timeEl.textContent = `STORYBOARD · ${s.time.toUpperCase()}`;
  if (titleEl) titleEl.textContent = s.title;
  if (captionEl) captionEl.textContent = s.narasi;
  if (arabicEl) arabicEl.textContent = "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ";
}

function nextFrame() {
  currentFrame = (currentFrame + 1) % scenes.length;
  renderFrame();
}

function prevFrame() {
  currentFrame = (currentFrame - 1 + scenes.length) % scenes.length;
  renderFrame();
}

function togglePlay() {
  if (isPlaying) stopPlay();
  else startPlay();
}

function startPlay() {
  if (isPlaying) return;
  isPlaying = true;
  currentFrame = 0; // Putar dari awal (Adegan-1)
  renderFrame();

  const btn = document.getElementById("playButton");
  if (btn) btn.textContent = "Jeda Storyboard";

  playTimer = setInterval(() => {
    if (currentFrame >= scenes.length - 1) {
      stopPlay();
      return;
    }
    currentFrame++;
    renderFrame();
  }, 4000);
}

function stopPlay() {
  isPlaying = false;
  if (playTimer) clearInterval(playTimer);
  playTimer = null;
  const btn = document.getElementById("playButton");
  if (btn) btn.textContent = "Putar Storyboard";
}

/* ---------- 5. CONTOH & CLEAR ---------- */
function loadExample() {
  document.getElementById("topic").value = "Husnul Islam: Meninggalkan yang Tidak Bermanfaat";
  document.getElementById("arabic").value = "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ";
  document.getElementById("translation").value = "Di antara kebaikan keislaman seseorang adalah ia meninggalkan perkara yang tidak bermanfaat baginya.";
  document.getElementById("source").value = "Sunan at-Tirmidzī, kitab az-Zuhd, hadis no. 2317 (dari Abū Hurairah); juga diriwayatkan Ibnu Mājah no. 3976 dan al-Muwaththa' Mālik.";
  document.getElementById("message").value = "Meninggalkan hal yang bukan urusan kita bukan sekadar adab, melainkan sistem pertahanan mental. Dengan menyaring kebisingan informasi, radar pikiran pulih: ruang jernih, energi tidak terbuang, dan fokus kembali pada tujuan yang bermanfaat. Inilah wujud nyata husnul Islam.";
}

function clearMaterials() {
  ["student", "topic", "arabic", "translation", "source", "message"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const v = document.getElementById("verified");
  if (v) v.checked = false;
}

/* ---------- 6. DRAF (SIMPAN/MUAT) ---------- */
const DRAFT_KEY = "hadis-praktikum-draft-v3";

function saveDraft() {
  const fields = ["student", "topic", "arabic", "translation", "source", "message", "takhrij", "sanad", "matan", "context", "url", "feedback"];
  const data = {};
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  data.verified = document.getElementById("verified")?.checked || false;
  data.rubric = getRubricScores();
  
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    setStatus("Draf berhasil disimpan di browser.");
  } catch (e) {
    setStatus("Gagal menyimpan draf: " + e.message);
  }
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) {
      setStatus("Belum ada draf tersimpan.");
      return;
    }
    const data = JSON.parse(raw);
    Object.keys(data).forEach(id => {
      const el = document.getElementById(id);
      if (el && typeof data[id] === "string") el.value = data[id];
    });
    const v = document.getElementById("verified");
    if (v) v.checked = !!data.verified;
    if (data.rubric) applyRubricScores(data.rubric);
    setStatus("Draf berhasil dimuat kembali.");
  } catch (e) {
    setStatus("Gagal memuat draf: " + e.message);
  }
}

function setStatus(msg) {
  const el = document.getElementById("saveStatus");
  if (el) el.textContent = msg;
}

/* ---------- 7. RUBRIK ---------- */
const rubricCriteria = [
  { key: "takhrij",  name: "Ketepatan takhrij dan rujukan kitab hadis",  weight: 20 },
  { key: "sanad",    name: "Kajian sanad dan penilaian kualitas hadis",  weight: 20 },
  { key: "matan",    name: "Ketepatan matan, harakat, dan terjemahan",   weight: 15 },
  { key: "context",  name: "Kedalaman syarah dan konteks pemaknaan",     weight: 20 },
  { key: "creative", name: "Kreativitas storyboard dan narasi radar",    weight: 15 },
  { key: "ethics",   name: "Etika publikasi dan kejelasan rujukan",      weight: 10 }
];

function initRubric() {
  const tbody = document.getElementById("rubricRows");
  if (!tbody) return;
  tbody.innerHTML = rubricCriteria.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.weight}%</td>
      <td>
        <input type="number" min="0" max="100" step="1" class="rubric-input" data-key="${c.key}" placeholder="0–100" oninput="updateTotal()"/>
      </td>
    </tr>
  `).join("");
  updateTotal();
}

function getRubricScores() {
  const scores = {};
  document.querySelectorAll(".rubric-input").forEach(inp => {
    scores[inp.dataset.key] = inp.value === "" ? 0 : Math.max(0, Math.min(100, Number(inp.value)));
  });
  return scores;
}

function applyRubricScores(scores) {
  document.querySelectorAll(".rubric-input").forEach(inp => {
    if (scores[inp.dataset.key] !== undefined) inp.value = scores[inp.dataset.key];
  });
  updateTotal();
}

function updateTotal() {
  const scores = getRubricScores();
  let total = 0;
  rubricCriteria.forEach(c => {
    total += (scores[c.key] || 0) * (c.weight / 100);
  });
  const el = document.getElementById("total");
  if (el) el.textContent = total.toFixed(1).replace(".", ",");
}

/* ---------- 8. LAPORAN ---------- */
function makeReport() {
  const val = id => (document.getElementById(id)?.value || "").trim();
  const scores = getRubricScores();

  let total = 0;
  const scoreRows = rubricCriteria.map(c => {
    const s = scores[c.key] || 0;
    total += s * (c.weight / 100);
    return `- ${c.name} (${c.weight}%): ${s}`;
  }).join("\n");

  const rubricTable = `
<table>
  <tbody>
    ${scenes.map((s, i) => `
      <tr>
        <td style="width:32%"><strong>${s.title}</strong><br/><span class="small">${s.time}</span></td>
        <td>
          <p><strong>Judul:</strong> ${s.judul}</p>
          <p><strong>Teks Layar:</strong> ${s.teksLayar}</p>
          <p><strong>Narasi:</strong> ${s.narasi}</p>
        </td>
      </tr>
    `).join("")}
  </tbody>
</table>`;

  const html = `
    <h3>Laporan Praktikum — Husnul Islam</h3>
    <p><strong>Mahasiswa:</strong> ${val("student") || "—"}<br/>
       <strong>Tema:</strong> ${val("topic") || "—"}</p>
    <h4>1. Bahan Hadis</h4>
    <p><strong>Teks Arab:</strong></p>
    <div class="arabic">${val("arabic") || "—"}</div>
    <p><strong>Terjemahan:</strong> ${val("translation") || "—"}</p>
    <p><strong>Sumber:</strong> ${val("source") || "—"}</p>
    <p><strong>Pesan utama:</strong> ${val("message") || "—"}</p>
    <h4>2. Verifikasi Ilmiah</h4>
    <p><strong>Takhrij:</strong> ${val("takhrij") || "—"}</p>
    <p><strong>Sanad:</strong> ${val("sanad") || "—"}</p>
    <p><strong>Matan:</strong> ${val("matan") || "—"}</p>
    <p><strong>Syarah/konteks:</strong> ${val("context") || "—"}</p>
    <p><strong>URL sumber:</strong> ${val("url") || "—"}</p>
    <p><strong>Pernyataan periksa mandiri:</strong> ${document.getElementById("verified")?.checked ? "Sudah" : "Belum"}</p>
    <h4>3. Storyboard — Narasi Radar Pikiran</h4>
    ${rubricTable}
    <h4>4. Penilaian Rubrik</h4>
    <pre style="white-space:pre-wrap">${scoreRows}</pre>
    <p><strong>Nilai akhir:</strong> ${total.toFixed(1).replace(".", ",")} / 100</p>
    <p><strong>Catatan penilai:</strong> ${val("feedback") || "—"}</p>
  `;

  const rep = document.getElementById("report");
  if (rep) {
    rep.classList.remove("notice");
    rep.innerHTML = html;
    rep.scrollIntoView({ behavior: "smooth" });
  }
}

function downloadReport() {
  const val = id => (document.getElementById(id)?.value || "").trim();
  const scores = getRubricScores();

  let total = 0;
  const scoreLines = rubricCriteria.map(c => {
    const s = scores[c.key] || 0;
    total += s * (c.weight / 100);
    return `- ${c.name} (${c.weight}%): ${s}`;
  }).join("\n");

  const sceneLines = scenes.map((s, i) =>
    `${s.title}\n${s.time}\nJudul: ${s.judul}\nTeks Layar: ${s.teksLayar}\nNarasi: ${s.narasi}`
  ).join("\n\n");

  const txt = [
    "LAPORAN PRAKTIKUM — HADIS CONTENT CREATOR ACADEMY",
    "UIN Sunan Ampel Surabaya · Prodi Ilmu Hadis · 2026",
    "===================================================",
    `Mahasiswa: ${val("student") || "—"}`,
    `Tema: ${val("topic") || "—"}`,
    "",
    "1. BAHAN HADIS",
    `Teks Arab: ${val("arabic") || "—"}`,
    `Terjemahan: ${val("translation") || "—"}`,
    `Sumber: ${val("source") || "—"}`,
    `Pesan utama: ${val("message") || "—"}`,
    "",
    "2. VERIFIKASI ILMIAH",
    `Takhrij: ${val("takhrij") || "—"}`,
    `Sanad: ${val("sanad") || "—"}`,
    `Matan: ${val("matan") || "—"}`,
    `Syarah: ${val("context") || "—"}`,
    `URL: ${val("url") || "—"}`,
    `Pernyataan: ${document.getElementById("verified")?.checked ? "Sudah" : "Belum"}`,
    "",
    "3. STORYBOARD (NARASI RADAR PIKIRAN)",
    sceneLines,
    "",
    "4. PENILAIAN RUBRIK",
    scoreLines,
    `Nilai akhir: ${total.toFixed(1).replace(".", ",")} / 100`,
    `Catatan penilai: ${val("feedback") || "—"}`,
    "",
    "Catatan: Materi dan penilaian wajib ditinjau dosen/pembimbing sebelum publikasi."
  ].join("\n");

  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "laporan-praktikum-husnul-islam.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------- 9. INISIALISASI ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initRubric();
  currentFrame = 0;
  renderFrame();

  document.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("keydown", e => {
      if (e.key === "Enter") e.preventDefault();
    });
  });
});