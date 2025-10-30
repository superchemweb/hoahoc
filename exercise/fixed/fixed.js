// fixed.js (module) — full file (updated)
// ... (same header/data as you provided) ...

/* ---------------------------
   Data (exam list)
   --------------------------- */
var exams = [
    { // 0
        id: 0,
        link: 'https://docs.google.com/document/d/1-ouKtGL_8KeedIHVt46tR0hq0_Bk8rTk/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1hhpFBNloKkHQ-qF2atTrmsI3I7W-a1Dk/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'B', 'D', 'D', 'D', 'B', 'A', 'B', 'C', 'A', 'D',
            'B', 'A', 'B', 'D', 'D', 'D', 'B', 'B'
        ],
        ans2: [
            ['Đ', 'S', 'S', 'S'],
            ['S', 'Đ', 'Đ', 'S'],
            ['S', 'S', 'Đ', 'Đ'],
            ['Đ', 'S', 'S', 'Đ']
        ],
        ans3: [
            '4', '4', '92,3', '1,68', '1,45', '12,9'
        ]
    }, { // 1
        id: 1,
        link: 'https://docs.google.com/document/d/1AHW9uXUMnUnqrAITuui1YhWJlUTECjz6/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1YRyrLEB7iiuH5J5_iMjrPZTwWzJ5-aVv/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'D','B','C','A','D','D','C','C','B','C','B','D','C','B','D','C','B','D'
        ],
        ans2: [
            ['Đ', 'Đ', 'Đ', 'S'],
            ['Đ', 'S', 'Đ', 'S'],
            ['Đ', 'S', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '25,4', '125', '5', '134', '42', '37'
        ]
    }, { // 2
        id: 2,
        link: 'https://docs.google.com/document/d/1Dk4QY6zaKhARNPkgMemEe-cCCCxPfRw5/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1iVDfslyVrR7bqzQxeflvOV0NwFprEe12/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'B','B','D','D','B','B','B','A','D','D','B','B','C','D','C','A','B','D'
        ],
        ans2: [
            ['Đ', 'S', 'S', 'Đ'],
            ['Đ', 'S', 'S', 'S'],
            ['Đ', 'Đ', 'S', 'Đ'],
            ['S', 'Đ', 'S', 'S']
        ],
        ans3: [
            '157', '124', '23', '77', '594', '3'
        ]
    }, { // 3
        id: 3,
        link: 'https://docs.google.com/document/d/1joD6g3GQiERw8A6cHAqd0rMqVLUmMiRw/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1pddzHukQRUvWJ2cXH6gNDUcc2RHEO8YS/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'A','C','C','A','D','C','B','C','B','D','B','D','D','D','A','B','B','B'
        ],
        ans2: [
            ['Đ', 'Đ', 'Đ', 'S'],
            ['Đ', 'Đ', 'Đ', 'S'],
            ['S', 'Đ', 'S', 'Đ'],
            ['S', 'S', 'Đ', 'S']
        ],
        ans3: [
            '234', '13', '75', '3', '124', '2,02'
        ]
    }, { // 4
        id: 4,
        link: 'https://docs.google.com/document/d/1ehAPFOySkL034YvjqHGSbmrm_eX9HABj/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1eKxGLGjm9Psn-Dy6pQzkrZr3dhEE0r-W/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'D','B','D','D','C','B','C','A','D','A','D','B','D','D','D','A','B','A'
        ],
        ans2: [
            ['Đ', 'S', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'Đ', 'S'],
            ['S', 'Đ', 'S', 'Đ'],
            ['S', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '5', '878', '231', '2153', '300', '72'
        ]
    }, { // 5
        id: 5,
        link: 'https://docs.google.com/document/d/1Ps5nMFLE2u3Hj_Lc-fjc99fImVbU_hQv/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1LxCiSNSgjhixzCZLV-TYvyXcRYvWE7no/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'B','C','C','C','C','C','A','A','A','B','C','D','A','A','A','C','C','B'
        ],
        ans2: [
            ['Đ', 'Đ', 'Đ', 'S'],
            ['S', 'Đ', 'Đ', 'Đ'],
            ['S', 'S', 'Đ', 'Đ'],
            ['Đ', 'S', 'Đ', 'S']
        ],
        ans3: [
            '2421', '526', '4', '6', '1,16', '0,59'
        ]
    }, { // 6
        id: 6,
        link: 'https://docs.google.com/document/d/1Tr7MLtu3tBNa0E64LirKdelvdIEhwWwe/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1bDq8OYNbPt1G_vlbMEMGBNsdCagRXis7/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'A','C','B','C','A','A','B','C','C','A','D','C','B','C','D','C','D','D'
        ],
        ans2: [
            ['Đ', 'Đ', 'Đ', 'S'],
            ['S', 'Đ', 'S', 'S'],
            ['Đ', 'S', 'S', 'S'],
            ['Đ', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '4', '3', '4', '2,04', '2', '96,6'
        ]
    }, { // 7
        id: 7,
        link: 'https://docs.google.com/document/d/1PpcFXZQCZ9uTlliDWTNG4-XLWSEiUkyf/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1RQ8hqYuzkdCVHCuqUJm7GaJgwnx7f_hZ/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'D','D','B','A','C','A','C','A','B','B','C','C','B','B','A','A','D','D'
        ],
        ans2: [
            ['Đ', 'S', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'Đ', 'S'],
            ['S', 'Đ', 'Đ', 'S'],
            ['Đ', 'Đ', 'Đ', 'S']
        ],
        ans3: [
            '1380', '245', '8', '5', '2', '76,5'
        ]
    }, { // 8
        id: 8,
        link: 'https://docs.google.com/document/d/16Rklo_Zf-xJN29n2SqX6jfdiba7egfP5/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/19sXqpdx8q22n-3paUXqgbkZUH22UHkZi/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'B','D','B','C','A','D','A','D','A','D','B','A','C','D','B','D','C','C'
        ],
        ans2: [
            ['S', 'S', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'Đ', 'S'],
            ['Đ', 'Đ', 'S', 'S'],
            ['Đ', 'Đ', 'Đ', 'Đ']
        ],
        ans3: [
            '5', '5', '3', '6258', '74,6', '2000'
        ]
    }, { // 9
        id: 9,
        link: 'https://docs.google.com/document/d/1yK0r1Fe_pNbLO1L4VkYTmuxgXZ2tpXGg/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1r0-zSDr2MAJGVb4nbGIXo3RsmxguA1l0/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'A','A','B','C','B','A','A','C','B','D','A','D','C','C','B','B','A','D'
        ],
        ans2: [
            ['Đ', 'S', 'Đ', 'S'],
            ['Đ', 'S', 'S', 'Đ'],
            ['Đ', 'S', 'S', 'Đ'],
            ['S', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '405', '23,3', '245', '6,95', '6,2', '1345'
        ]
    }, { // 10
        id: 10,
        link: 'https://docs.google.com/document/d/18IUg58F2_16jyzbmE7NnmiiD4cjsjkqO/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1blHkmPPNGrl5YVO-tLLaPLD0lrv1EeXY/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'C','B','C','A','C','B','C','A','B','A','C','B','A','C','C','D','A','C'
        ],
        ans2: [
            ['S', 'Đ', 'Đ', 'S'],
            ['S', 'S', 'Đ', 'S'],
            ['S', 'S', 'S', 'Đ'],
            ['Đ', 'S', 'Đ', 'Đ']
        ],
        ans3: [
            '862', '2,27', '231', '145', '3', '0,8'
        ]
    }, { // 11
        id: 11,
        link: 'https://docs.google.com/document/d/1oYhLUjrBRidpsfZwIdJ86Wmk2e8r-8R4/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1VYVw6dhwWz-_MyWoIXKPZKY920giW3-N/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'C','B','C','C','B','A','B','A','B','D','A','D','D','A','A','D','B','D'
        ],
        ans2: [
            ['Đ', 'Đ', 'S', 'S'],
            ['S', 'Đ', 'Đ', 'Đ'],
            ['Đ', 'S', 'S', 'S'],
            ['S', 'S', 'Đ', 'Đ']
        ],
        ans3: [
            '0,03', '31,8', '1', '7', '1', '27'
        ]
    }, { // 12
        id: 12,
        link: 'https://docs.google.com/document/d/1XsNThl_sXyQ5QdT3ljnCulo-4lN4jQ4a/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1xODstiGDRW687Kd7euYBxhLkNH8DRLrc/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'A','A','B','C','A','D','B','A','B','A','B','B','A','A','D','D','C','B'
        ],
        ans2: [
            ['Đ', 'Đ', 'Đ', 'S'],
            ['Đ', 'Đ', 'S', 'Đ'],
            ['S', 'Đ', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '25,5', '3412', '8', '42,8', '1380', '5'
        ]
    }, { // 13
        id: 13,
        link: 'https://docs.google.com/document/d/1Sj4yTfZsrXyI8xXpNoixkr6QyF6rS1bn/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/157x0j43apDZ1oKwaRkbdPRuFL-S8ZxF6/edit?usp=drive_link&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'A','D','C','C','C','C','D','A','B','B','A','C','B','D','D','B','A','C'
        ],
        ans2: [
            ['S', 'S', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'Đ', 'Đ'],
            ['Đ', 'Đ', 'S', 'Đ'],
            ['Đ', 'Đ', 'S', 'Đ']
        ],
        ans3: [
            '433', '5', '2', '232', '124', '2025'
        ]
    },
];

/* ---------------------------
   LocalStorage keys & state
   --------------------------- */
const LS_REPEAT_KEY = 'repeat-exam';
const LS_ANS_KEY_PREFIX = 'exam-answers-';
const LS_RESULT_PREFIX = 'exam-result-';
const LS_START_PREFIX = 'exam-start-';

let currentExamIndex = 0;
let currentExam = null;
let userAnswers = { ans1: [], ans2: [], ans3: [] };
let timerInterval = null;
let startTimestamp = null;
let isSubmitted = false;

/* ---------------------------
   Helpers
   --------------------------- */
const el = (sel, ctx=document) => ctx.querySelector(sel);
const elAll = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

function saveRepeat(repeat) { localStorage.setItem(LS_REPEAT_KEY, JSON.stringify(repeat)); }
function loadRepeat() { try { return JSON.parse(localStorage.getItem(LS_REPEAT_KEY)) || []; } catch(e){ return []; } }

function saveUserAnswers() { if (!currentExam) return; localStorage.setItem(LS_ANS_KEY_PREFIX + currentExam.id, JSON.stringify(userAnswers)); }
function loadUserAnswers() { if (!currentExam) return null; try { const raw = localStorage.getItem(LS_ANS_KEY_PREFIX + currentExam.id); return raw ? JSON.parse(raw) : null; } catch(e){ return null; } }

function saveResult(resultObj) { if (!currentExam) return; localStorage.setItem(LS_RESULT_PREFIX + currentExam.id, JSON.stringify(resultObj)); }
function loadStart() { if (!currentExam) return null; const key = LS_START_PREFIX + currentExam.id; const raw = localStorage.getItem(key); return raw ? Number(raw) : null; }
function saveStart(ts) { if (!currentExam) return; const key = LS_START_PREFIX + currentExam.id; localStorage.setItem(key, String(ts)); }
function clearStart() { if (!currentExam) return; localStorage.removeItem(LS_START_PREFIX + currentExam.id); }
function clearSavedAnswers() { if (!currentExam) return; localStorage.removeItem(LS_ANS_KEY_PREFIX + currentExam.id); }
function clearResult() { if (!currentExam) return; localStorage.removeItem(LS_RESULT_PREFIX + currentExam.id); }

function normalizeNumberAnswer(s) { if (s === null || s === undefined) return ''; return String(s).trim().replace(/\./g, ','); }

/* ---------------------------
   Pick random non-repeat exam
   --------------------------- */
function pickRandomExamIndex() {
    let repeat = loadRepeat();
    if (repeat.length === exams.length) repeat = [];

    let available = exams.map((_, i) => i).filter(i => !repeat.includes(i));
    if (available.length === 0) { available = exams.map((_, i) => i); repeat = []; }

    const chosen = available[Math.floor(Math.random() * available.length)];
    repeat.push(chosen);
    saveRepeat(repeat);
    return chosen;
}

/* ---------------------------
   Rendering UI
   --------------------------- */
function renderAll() {
    const iframe = el('#main-iframe');
    if (currentExam && iframe) iframe.src = currentExam.link;

    renderMCQ();
    renderTrueFalse();
    renderShortAnswers();

    const saved = loadUserAnswers();
    if (saved) { userAnswers = saved; applyAnswersToUI(); }
    else {
        userAnswers = {
            ans1: new Array(currentExam.ans1.length).fill(null),
            ans2: currentExam.ans2.map(sub => new Array(sub.length).fill(null)),
            ans3: new Array(currentExam.ans3.length).fill('')
        };
        saveUserAnswers();
    }

    startOrResumeTimer();
}

function renderMCQ() {
    const container = el('.ex1-answer'); if (!container) return; container.innerHTML = '';
    currentExam.ans1.forEach((_, idx) => {
        const qWrap = document.createElement('div'); qWrap.className = 'question-ex1'; qWrap.dataset.qidx = String(idx);
        const label = document.createElement('div'); label.className = 'q-label'; label.textContent = `Câu ${idx+1}:`;
        qWrap.appendChild(label);
        ['A','B','C','D'].forEach(choice => {
            const d = document.createElement('div'); d.className = 'choice ' + choice; d.tabIndex = 0; d.textContent = choice; d.dataset.choice = choice;
            d.addEventListener('click', onMCQChoiceClick);
            d.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); d.click(); } });
            qWrap.appendChild(d);
        });
        container.appendChild(qWrap);
    });
}

function onMCQChoiceClick(e) {
    if (isSubmitted) return; const target = e.currentTarget; const qWrap = target.closest('.question-ex1'); const qidx = Number(qWrap.dataset.qidx); const choice = target.dataset.choice;
    elAll('.choice', qWrap).forEach(ch => ch.classList.remove('selected'));
    target.classList.add('selected'); userAnswers.ans1[qidx] = choice; saveUserAnswers();
}

function renderTrueFalse() {
    const container = el('.ex2-answer'); if (!container) return; container.innerHTML = '';
    currentExam.ans2.forEach((subQ, qIndex) => {
        const qDiv = document.createElement('div'); qDiv.className = 'question-ex2'; qDiv.dataset.qidx = String(qIndex);
        const h2 = document.createElement('h2'); h2.textContent = `Câu ${qIndex+1}:`; qDiv.appendChild(h2);
        subQ.forEach((correctValue, ideaIdx) => {
            const idea = document.createElement('div'); idea.className = 'idea-container'; idea.dataset.ideaIdx = String(ideaIdx);
            const span = document.createElement('span'); span.textContent = `${String.fromCharCode(97 + ideaIdx)})`; idea.appendChild(span);
            const trueBtn = document.createElement('div'); trueBtn.className = 'true-choice'; trueBtn.tabIndex = 0; trueBtn.textContent = 'Đ'; trueBtn.dataset.value = 'Đ'; trueBtn.addEventListener('click', onTFChoiceClick);
            trueBtn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); trueBtn.click(); } });
            const falseBtn = document.createElement('div'); falseBtn.className = 'false-choice'; falseBtn.tabIndex = 0; falseBtn.textContent = 'S'; falseBtn.dataset.value = 'S'; falseBtn.addEventListener('click', onTFChoiceClick);
            falseBtn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); falseBtn.click(); } });
            idea.appendChild(trueBtn); idea.appendChild(falseBtn); qDiv.appendChild(idea);
        });
        container.appendChild(qDiv);
    });
}

function onTFChoiceClick(e) {
    if (isSubmitted) return; const btn = e.currentTarget; const idea = btn.closest('.idea-container'); const qDiv = btn.closest('.question-ex2'); const qIndex = Number(qDiv.dataset.qidx); const ideaIdx = Number(idea.dataset.ideaIdx); const val = btn.dataset.value;
    const [trueBtn, falseBtn] = elAll('.true-choice, .false-choice', idea); trueBtn.classList.remove('selected'); falseBtn.classList.remove('selected'); btn.classList.add('selected');
    if (!Array.isArray(userAnswers.ans2)) userAnswers.ans2 = []; if (!Array.isArray(userAnswers.ans2[qIndex])) userAnswers.ans2[qIndex] = new Array(currentExam.ans2[qIndex].length).fill(null);
    userAnswers.ans2[qIndex][ideaIdx] = val; saveUserAnswers();
}

function renderShortAnswers() {
    const container = el('.ex3-answer'); if (!container) return; container.innerHTML = '';
    const inner = document.createElement('div'); inner.className = 'question-ex3';
    currentExam.ans3.forEach((_, idx) => {
        const shortItem = document.createElement('div'); shortItem.className = 'short-item'; shortItem.style.marginBottom = '12px';
        const h2 = document.createElement('h2'); h2.textContent = `Câu ${idx+1}`; shortItem.appendChild(h2);
        const input = document.createElement('input'); input.type = 'text'; input.placeholder = 'Trả lời:'; input.dataset.idx = String(idx);
        input.addEventListener('input', (ev) => { userAnswers.ans3[idx] = ev.target.value; saveUserAnswers(); });
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.preventDefault(); });
        shortItem.appendChild(input); inner.appendChild(shortItem);
    });
    container.appendChild(inner);
}

function applyAnswersToUI() {
    elAll('.question-ex1').forEach(qWrap => {
        const qidx = Number(qWrap.dataset.qidx); const ans = (userAnswers.ans1 && userAnswers.ans1[qidx]) ? userAnswers.ans1[qidx] : null;
        elAll('.choice', qWrap).forEach(ch => ch.classList.toggle('selected', ch.dataset.choice === ans));
    });
    elAll('.question-ex2').forEach(qDiv => {
        const qIndex = Number(qDiv.dataset.qidx);
        elAll('.idea-container', qDiv).forEach(idea => {
            const ideaIdx = Number(idea.dataset.ideaIdx);
            const saved = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            const [trueBtn, falseBtn] = elAll('.true-choice, .false-choice', idea);
            trueBtn.classList.toggle('selected', saved === 'Đ'); falseBtn.classList.toggle('selected', saved === 'S');
        });
    });
    elAll('.ex3-answer input[type="text"]').forEach(inp => { const idx = Number(inp.dataset.idx); if (userAnswers.ans3 && userAnswers.ans3[idx] != null) inp.value = userAnswers.ans3[idx]; });
}

/* ---------------------------
   Timer
   --------------------------- */
function fmtTimeElapsed(ms) { const s = Math.floor(ms / 1000); const mm = Math.floor(s / 60).toString().padStart(2,'0'); const ss = (s % 60).toString().padStart(2,'0'); return `${mm}:${ss}`; }

function startOrResumeTimer() {
    const timeEl = el('.point.time'); if (!timeEl) return;
    const savedStart = loadStart(); if (savedStart) startTimestamp = savedStart; else { startTimestamp = Date.now(); saveStart(startTimestamp); }
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => { const elapsed = Date.now() - startTimestamp; timeEl.textContent = `Thời gian: ${fmtTimeElapsed(elapsed)}`; }, 500);
}

/* ---------------------------
   Submit / scoring / reset
   --------------------------- */
function submitExam() {
    if (isSubmitted) return; if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    const elapsed = Date.now() - startTimestamp;

    let scoreValue = 0;
    const mcqCount = currentExam.ans1.length;
    for (let i = 0; i < mcqCount; i++) {
        const correct = (currentExam.ans1[i] || '').toString().trim().toUpperCase();
        const user = (userAnswers.ans1 && userAnswers.ans1[i]) ? userAnswers.ans1[i].toString().trim().toUpperCase() : null;
        if (user && user === correct) scoreValue += 0.25;
    }

    const tfQuestions = currentExam.ans2.length;
    for (let qIndex = 0; qIndex < tfQuestions; qIndex++) {
        const subQ = currentExam.ans2[qIndex]; let correctCountForThisQ = 0;
        for (let ideaIdx = 0; ideaIdx < subQ.length; ideaIdx++) {
            const correctVal = subQ[ideaIdx]; const userVal = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            if (userVal && userVal === correctVal) correctCountForThisQ++;
        }
        switch (correctCountForThisQ) { case 1: scoreValue += 0.1; break; case 2: scoreValue += 0.25; break; case 3: scoreValue += 0.5; break; case 4: scoreValue += 1; break; default: break; }
    }

    const shortCount = currentExam.ans3.length;
    for (let i = 0; i < shortCount; i++) {
        const corrNorm = normalizeNumberAnswer(currentExam.ans3[i]);
        const userNorm = normalizeNumberAnswer((userAnswers.ans3 && userAnswers.ans3[i]) ? userAnswers.ans3[i] : '');
        if (userNorm !== '' && userNorm === corrNorm) scoreValue += 0.25;
    }

    const maxMcq = mcqCount * 0.25; const maxTf = tfQuestions * 1.0; const maxShort = shortCount * 0.25; const maxScore = +(maxMcq + maxTf + maxShort).toFixed(2);

    const scoreObj = {
        score: +(Math.round(scoreValue * 100) / 100).toFixed(2), // two decimals
        maxScore,
        elapsedMs: elapsed,
        timestamp: Date.now()
    };

    // save result (keep for records)
    saveResult(scoreObj);

    // show UI results
    showResultsUI(scoreObj);
    isSubmitted = true;

    // After submit we clear only the start timestamp and saved answers for this exam so that
    // when user leaves and returns the timer won't resume and the exam won't auto-resume.
    // Keep result stored for record but remove resume keys.
    clearStart();
    clearSavedAnswers();
}

function showResultsUI(scoreObj) {
    const timeEl = el('.point.time');
    if (timeEl) {
        timeEl.textContent = `Điểm: ${scoreObj.score.toFixed(2)} / ${scoreObj.maxScore.toFixed(2)} • ${fmtTimeElapsed(scoreObj.elapsedMs)}`;
    }

    /* ---------- MCQ ---------- */
    elAll('.question-ex1').forEach(qWrap => {
        const qidx = Number(qWrap.dataset.qidx);
        const correct = (currentExam.ans1[qidx] || '').toString().trim().toUpperCase();
        const user = (userAnswers.ans1 && userAnswers.ans1[qidx]) ? userAnswers.ans1[qidx] : null;

        // remove old badges/arrows
        const oldBadge = qWrap.querySelector('.status-badge'); if (oldBadge) oldBadge.remove();
        elAll('.chosen-arrow', qWrap).forEach(a => a.remove());

        // reset choices
        qWrap.classList.remove('unanswered');
        elAll('.choice', qWrap).forEach(ch => {
            ch.classList.remove('correct','wrong','user-choice');
            ch.style.cursor = 'default';
            ch.tabIndex = -1;
        });

        // mark correct answer visually on the choice itself
        const correctEl = qWrap.querySelector(`.choice.${correct}`);
        if (correctEl) correctEl.classList.add('correct');

        // prepare a dedicated result row (new line) under the question to show status
        let resultRow = qWrap.querySelector('.result-row');
        if (resultRow) resultRow.remove();
        resultRow = document.createElement('div');
        resultRow.className = 'result-row';
        resultRow.style.marginTop = '8px';

        if (!user) {
            qWrap.classList.add('unanswered');
            const badge = document.createElement('span');
            badge.className = 'status-badge unanswered';
            badge.textContent = 'Chưa chọn';
            resultRow.appendChild(badge);
            qWrap.appendChild(resultRow);
        } else {
            const userEl = qWrap.querySelector(`.choice.${user}`);
            if (userEl) {
                userEl.classList.add('user-choice','selected');
                const arrow = document.createElement('span');
                arrow.className = 'chosen-arrow';
                arrow.textContent = '▴';
                const prevA = userEl.querySelector('.chosen-arrow'); if (prevA) prevA.remove(); userEl.appendChild(arrow);

                const badge = document.createElement('span');
                if (user === correct) {
                    userEl.classList.add('correct');
                    badge.className = 'status-badge correct';
                    badge.textContent = 'Kết quả đúng';
                } else {
                    userEl.classList.add('wrong');
                    badge.className = 'status-badge wrong';
                    badge.textContent = 'Kết quả sai';
                }
                resultRow.appendChild(badge);
                qWrap.appendChild(resultRow);
            } else {
                const badge = document.createElement('span');
                badge.className = 'status-badge unanswered';
                badge.textContent = 'Chưa chọn';
                resultRow.appendChild(badge);
                qWrap.appendChild(resultRow);
            }
        }
    });

    /* ---------- True/False ---------- */
    elAll('.question-ex2').forEach(qDiv => {
        const qIndex = Number(qDiv.dataset.qidx);
        elAll('.idea-container', qDiv).forEach(idea => {
            const ideaIdx = Number(idea.dataset.ideaIdx);
            const trueBtn = idea.querySelector('.true-choice');
            const falseBtn = idea.querySelector('.false-choice');

            idea.classList.remove('unanswered');
            [trueBtn, falseBtn].forEach(b => { b.classList.remove('selected','correct','wrong','user-choice'); b.style.cursor='default'; b.tabIndex = -1; });

            const correctVal = currentExam.ans2[qIndex][ideaIdx];
            if (correctVal === 'Đ') trueBtn.classList.add('correct'); else falseBtn.classList.add('correct');

            const userVal = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            const existingBadge = idea.querySelector('.status-badge'); if (existingBadge) existingBadge.remove();

            if (!userVal) {
                idea.classList.add('unanswered'); const b = document.createElement('span'); b.className = 'status-badge unanswered'; b.textContent = 'Chưa chọn'; idea.appendChild(b);
            } else {
                const chosenBtn = (userVal === 'Đ') ? trueBtn : falseBtn;
                chosenBtn.classList.add('user-choice','selected');
                if (userVal !== correctVal) chosenBtn.classList.add('wrong'); else chosenBtn.classList.add('correct');
                const b = document.createElement('span'); b.className = 'status-badge ' + (userVal === correctVal ? 'correct' : 'wrong'); b.textContent = userVal === correctVal ? 'Kết quả đúng' : 'Kết quả sai'; idea.appendChild(b);
            }
        });
    });

    /* ---------- Short answers (Section III) ---------- */
    elAll('.ex3-answer .short-item').forEach(shortItem => {
        const inp = shortItem.querySelector('input[type="text"]');
        const idx = Number(inp.dataset.idx);
        const userRaw = (userAnswers.ans3 && userAnswers.ans3[idx]) ? userAnswers.ans3[idx] : '';
        const corrRaw = currentExam.ans3[idx];
        const userNorm = normalizeNumberAnswer(userRaw);
        const corrNorm = normalizeNumberAnswer(corrRaw);

        inp.classList.remove('correct','wrong','unanswered');
        inp.readOnly = true;

        const prevBadge = shortItem.querySelector('.status-badge'); if (prevBadge) prevBadge.remove();
        const prevCorr = shortItem.querySelector('.correct-answer'); if (prevCorr) prevCorr.remove();

        const corrBox = document.createElement('div'); corrBox.className = 'correct-answer'; corrBox.textContent = `Đáp án đúng: ${corrRaw}`;

        if (!userRaw || userNorm === '') {
            inp.classList.add('unanswered'); inp.placeholder = 'Chưa trả lời'; const b = document.createElement('span'); b.className = 'status-badge unanswered'; b.textContent = 'Chưa trả lời'; shortItem.appendChild(b); shortItem.appendChild(corrBox);
        } else if (userNorm === corrNorm) {
            inp.classList.add('correct'); const b = document.createElement('span'); b.className = 'status-badge correct'; b.textContent = 'Kết quả đúng'; shortItem.appendChild(b); shortItem.appendChild(corrBox);
        } else {
            inp.classList.add('wrong'); inp.placeholder = `Đáp án: ${corrRaw}`; const b = document.createElement('span'); b.className = 'status-badge wrong'; b.textContent = 'Kết quả sai'; shortItem.appendChild(b); shortItem.appendChild(corrBox);
        }
    });

    // disable event listeners
    disableInteractions();

    // reveal toggle answer button and set it to show answers by default
    const toggleBtn = el('#toggle-ans-btn');
    if (toggleBtn) {
        toggleBtn.classList.remove('hide');
        toggleBtn.dataset.state = 'ans';
        toggleBtn.textContent = 'Xem đề';
        // set iframe to answers file by default after submit
        const iframe = el('#main-iframe'); if (iframe && currentExam && currentExam.ansLink) iframe.src = currentExam.ansLink;
    }
}

function disableInteractions() {
    elAll('.choice').forEach(ch => { ch.style.cursor = 'default'; ch.removeEventListener('click', onMCQChoiceClick); ch.tabIndex = -1; });
    elAll('.true-choice, .false-choice').forEach(btn => { btn.style.cursor = 'default'; btn.removeEventListener('click', onTFChoiceClick); btn.tabIndex = -1; });
    elAll('.ex3-answer input').forEach(inp => inp.readOnly = true);
}

// Toggle between exam file and answer file in iframe
function toggleExamAnswer() {
    const iframe = el('#main-iframe');
    const btn = el('#toggle-ans-btn');
    if (!iframe || !btn || !currentExam) return;

    if (btn.dataset.state === 'ans') {
        // currently showing answers, switch to exam
        iframe.src = currentExam.link;
        btn.dataset.state = 'exam';
        btn.textContent = 'Xem đáp án';
    } else {
        // switch to answers
        iframe.src = currentExam.ansLink;
        btn.dataset.state = 'ans';
        btn.textContent = 'Xem đề';
    }
}

/* ---------------------------
   Reset helpers (for exit)
   --------------------------- */
function resetCurrentExamState() {
    // stop timer
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }

    // clear resume + saved answers + result for this exam
    try {
        clearStart();
        clearSavedAnswers();
        clearResult();
    } catch (e) {
        console.warn('resetCurrentExamState: localStorage cleanup failed', e);
    }

    // reset in-memory state
    isSubmitted = false;
    startTimestamp = null;
    userAnswers = {
        ans1: new Array(currentExam.ans1.length).fill(null),
        ans2: currentExam.ans2.map(sub => new Array(sub.length).fill(null)),
        ans3: new Array(currentExam.ans3.length).fill('')
    };

    // optional: reset UI selections immediately (in case user stays on page)
    elAll('.choice').forEach(ch => ch.classList.remove('selected','correct','wrong','user-choice'));
    elAll('.true-choice, .false-choice').forEach(b => b.classList.remove('selected','correct','wrong','user-choice'));
    elAll('.ex3-answer input').forEach(inp => { inp.value = ''; inp.readOnly = false; inp.classList.remove('correct','wrong','unanswered'); });
    const timeEl = el('.point.time'); if (timeEl) timeEl.textContent = 'Thời gian: 00:00';
}

/* ---------------------------
   UI bindings & init
   --------------------------- */
window.showAskForSubmit = function() { el('.ask-for-submit').classList.remove('hide'); };
window.hideAskForSubmit = function() { el('.ask-for-submit').classList.add('hide'); };
window.showCancelExam = function() { el('.cancel-exam').classList.remove('hide'); };
window.hideCancelExam = function() { el('.cancel-exam').classList.add('hide'); };

function attachUiHandlers() {
    const turnBack = el('.turn-back'); if (turnBack) turnBack.addEventListener('click', showCancelExam);
    elAll('.ask-for-submit .background, .cancel-exam .background').forEach(bg => { bg.addEventListener('click', () => { el('.ask-for-submit') && hideAskForSubmit(); el('.cancel-exam') && hideCancelExam(); }); });

    // expose submit and toggle globally
    window.submitExam = submitExam;
    window.toggleExamAnswer = toggleExamAnswer;

    // OVERRIDE the cancel-exam 'Thoát' button's onclick so we can reset before navigating away.
    const cancelExitBtn = el('.cancel-exam .submit');
    if (cancelExitBtn) {
        // replace any inline onclick handler by assigning to .onclick — ensures our reset runs first
        cancelExitBtn.onclick = function(e) {
            // prevent default inline handlers if they rely on event, we will handle navigation
            e && e.preventDefault && e.preventDefault();

            // reset everything about current exam so next entry is fresh
            resetCurrentExamState();

            // hide modal quickly (optional)
            hideCancelExam();

            // navigate away (same as original behavior)
            document.location.href = '../index.html';
        };
    }
}

function init() {
    // pick an exam randomly (non-repeat)
    currentExamIndex = pickRandomExamIndex();
    currentExam = exams[currentExamIndex];

    userAnswers = {
        ans1: new Array(currentExam.ans1.length).fill(null),
        ans2: currentExam.ans2.map(sub => new Array(sub.length).fill(null)),
        ans3: new Array(currentExam.ans3.length).fill('')
    };

    renderAll();
    attachUiHandlers();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
