// fixed.js (module) — updated: prevent resume after submit, avoid re-opening the same submitted exam

/* ---------------------------
   Data (exam list)
   --------------------------- */
var exams = [
    {
        id: 0,
        link: 'https://docs.google.com/document/d/1-ouKtGL_8KeedIHVt46tR0hq0_Bk8rTk/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ansLink: 'https://docs.google.com/document/d/1hhpFBNloKkHQ-qF2atTrmsI3I7W-a1Dk/edit?usp=sharing&ouid=106265925099932943627&rtpof=true&sd=true',
        ans1: [
            'B','D','D','D','B','A','B','C','A','D',
            'B','A','B','D','D','D','B','B'
        ],
        ans2: [
            ['Đ','S','S','S'],
            ['S','Đ','Đ','S'],
            ['S','S','Đ','Đ'],
            ['Đ','S','S','Đ']
        ],
        ans3: [
            '4','4','92,3','1,68','1,45','12,9'
        ]
    }
];

/* ---------------------------
   LocalStorage keys & state
   --------------------------- */
const LS_REPEAT_KEY = 'repeat-exam';
const LS_ANS_KEY_PREFIX = 'exam-answers-'; // + examId
const LS_RESULT_PREFIX = 'exam-result-';   // + examId
const LS_START_PREFIX = 'exam-start-';     // + examId

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
function loadResultForExamId(examId) { try { const raw = localStorage.getItem(LS_RESULT_PREFIX + examId); return raw ? JSON.parse(raw) : null; } catch(e){ return null; } }
function clearResultForExamId(examId) { localStorage.removeItem(LS_RESULT_PREFIX + examId); }

function loadStart() { if (!currentExam) return null; const key = LS_START_PREFIX + currentExam.id; const raw = localStorage.getItem(key); return raw ? Number(raw) : null; }
function saveStart(ts) { if (!currentExam) return; const key = LS_START_PREFIX + currentExam.id; localStorage.setItem(key, String(ts)); }
function clearStart() { if (!currentExam) return; localStorage.removeItem(LS_START_PREFIX + currentExam.id); }
function clearSavedAnswers() { if (!currentExam) return; localStorage.removeItem(LS_ANS_KEY_PREFIX + currentExam.id); }

function normalizeNumberAnswer(s) { if (s === null || s === undefined) return ''; return String(s).trim().replace(/\./g, ','); }

/* ---------------------------
   Pick random non-repeat exam
   - updated: try to pick an exam that hasn't been submitted yet.
   --------------------------- */
function pickRandomExamIndex() {
    let repeat = loadRepeat();
    // if all used, reset
    if (repeat.length === exams.length) repeat = [];

    let available = exams.map((_, i) => i).filter(i => !repeat.includes(i));
    if (available.length === 0) {
        available = exams.map((_, i) => i);
        repeat = [];
    }

    // try to pick an exam that doesn't have a saved result (not previously submitted)
    // attempt limited times (avoid infinite loop)
    const attempts = available.slice(); // copy
    while (attempts.length) {
        const randomIndexInAvailable = Math.floor(Math.random() * attempts.length);
        const chosen = attempts.splice(randomIndexInAvailable, 1)[0];
        const existingResult = loadResultForExamId(exams[chosen].id);
        if (!existingResult) {
            repeat.push(chosen);
            saveRepeat(repeat);
            return chosen;
        }
        // otherwise keep trying another available
    }

    // if all available were previously submitted, clear all results (start fresh) and pick random
    exams.forEach(ex => clearResultForExamId(ex.id));
    // reset repeat and pick any
    repeat = [];
    available = exams.map((_, i) => i);
    const chosen = available[Math.floor(Math.random() * available.length)];
    repeat.push(chosen);
    saveRepeat(repeat);
    return chosen;
}

/* ---------------------------
   Render UI
   --------------------------- */
function renderAll() {
    const iframe = el('#main-iframe');
    if (currentExam && iframe) iframe.src = currentExam.link;

    renderMCQ();
    renderTrueFalse();
    renderShortAnswers();

    // load any saved answers; if none, initialize arrays
    const saved = loadUserAnswers();
    if (saved) {
        userAnswers = saved;
        applyAnswersToUI();
    } else {
        userAnswers = {
            ans1: new Array(currentExam.ans1.length).fill(null),
            ans2: currentExam.ans2.map(sub => new Array(sub.length).fill(null)),
            ans3: new Array(currentExam.ans3.length).fill('')
        };
        saveUserAnswers();
    }

    // only start timer if this exam has NOT been submitted before
    const prevResult = loadResultForExamId(currentExam.id);
    if (!prevResult) {
        startOrResumeTimer();
    } else {
        // show the saved result (if you want) OR show static text
        const timeEl = el('.point.time');
        if (timeEl) timeEl.textContent = `Bài đã nộp • Điểm: ${prevResult.score.toFixed(2)} / ${prevResult.maxScore.toFixed(2)}`;
        // do not start timer
    }
}

function renderMCQ() {
    const container = el('.ex1-answer');
    if (!container) return;
    container.innerHTML = '';
    currentExam.ans1.forEach((_, idx) => {
        const qWrap = document.createElement('div');
        qWrap.className = 'question-ex1';
        qWrap.dataset.qidx = String(idx);

        const label = document.createElement('div');
        label.className = 'q-label';
        label.textContent = `Câu ${idx+1}:`;
        qWrap.appendChild(label);

        ['A','B','C','D'].forEach(choice => {
            const d = document.createElement('div');
            d.className = 'choice ' + choice;
            d.tabIndex = 0;
            d.textContent = choice;
            d.dataset.choice = choice;
            d.addEventListener('click', onMCQChoiceClick);
            d.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); d.click(); }
            });
            qWrap.appendChild(d);
        });

        container.appendChild(qWrap);
    });
}

function onMCQChoiceClick(e) {
    if (isSubmitted) return;
    const target = e.currentTarget;
    const qWrap = target.closest('.question-ex1');
    const qidx = Number(qWrap.dataset.qidx);
    const choice = target.dataset.choice;

    elAll('.choice', qWrap).forEach(ch => ch.classList.remove('selected'));
    target.classList.add('selected');

    userAnswers.ans1[qidx] = choice;
    saveUserAnswers();
}

function renderTrueFalse() {
    const container = el('.ex2-answer');
    if (!container) return;
    container.innerHTML = '';

    currentExam.ans2.forEach((subQ, qIndex) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-ex2';
        qDiv.dataset.qidx = String(qIndex);

        const h2 = document.createElement('h2');
        h2.textContent = `Câu ${qIndex+1}:`;
        qDiv.appendChild(h2);

        subQ.forEach((_, ideaIdx) => {
            const idea = document.createElement('div');
            idea.className = 'idea-container';
            idea.dataset.ideaIdx = String(ideaIdx);

            const span = document.createElement('span');
            span.textContent = `${String.fromCharCode(97 + ideaIdx)})`;
            idea.appendChild(span);

            const trueBtn = document.createElement('div');
            trueBtn.className = 'true-choice';
            trueBtn.tabIndex = 0;
            trueBtn.textContent = 'Đ';
            trueBtn.dataset.value = 'Đ';
            trueBtn.addEventListener('click', onTFChoiceClick);
            trueBtn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); trueBtn.click(); } });

            const falseBtn = document.createElement('div');
            falseBtn.className = 'false-choice';
            falseBtn.tabIndex = 0;
            falseBtn.textContent = 'S';
            falseBtn.dataset.value = 'S';
            falseBtn.addEventListener('click', onTFChoiceClick);
            falseBtn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); falseBtn.click(); } });

            idea.appendChild(trueBtn);
            idea.appendChild(falseBtn);
            qDiv.appendChild(idea);
        });

        container.appendChild(qDiv);
    });
}

function onTFChoiceClick(e) {
    if (isSubmitted) return;
    const btn = e.currentTarget;
    const idea = btn.closest('.idea-container');
    const qDiv = btn.closest('.question-ex2');
    const qIndex = Number(qDiv.dataset.qidx);
    const ideaIdx = Number(idea.dataset.ideaIdx);
    const val = btn.dataset.value;

    const [trueBtn, falseBtn] = elAll('.true-choice, .false-choice', idea);
    trueBtn.classList.remove('selected');
    falseBtn.classList.remove('selected');
    btn.classList.add('selected');

    if (!Array.isArray(userAnswers.ans2)) userAnswers.ans2 = [];
    if (!Array.isArray(userAnswers.ans2[qIndex])) userAnswers.ans2[qIndex] = new Array(currentExam.ans2[qIndex].length).fill(null);
    userAnswers.ans2[qIndex][ideaIdx] = val;
    saveUserAnswers();
}

function renderShortAnswers() {
    const container = el('.ex3-answer');
    if (!container) return;
    container.innerHTML = '';

    const inner = document.createElement('div');
    inner.className = 'question-ex3';

    currentExam.ans3.forEach((_, idx) => {
        const shortItem = document.createElement('div');
        shortItem.className = 'short-item';
        shortItem.style.marginBottom = '12px';

        const h2 = document.createElement('h2');
        h2.textContent = `Câu ${idx+1}`;
        shortItem.appendChild(h2);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Trả lời:';
        input.dataset.idx = String(idx);
        input.addEventListener('input', (ev) => {
            userAnswers.ans3[idx] = ev.target.value;
            saveUserAnswers();
        });
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.preventDefault(); });

        shortItem.appendChild(input);
        inner.appendChild(shortItem);
    });

    container.appendChild(inner);
}

/* ---------------------------
   Apply saved answers to UI
   --------------------------- */
function applyAnswersToUI() {
    // MCQ
    elAll('.question-ex1').forEach(qWrap => {
        const qidx = Number(qWrap.dataset.qidx);
        const ans = (userAnswers.ans1 && userAnswers.ans1[qidx]) ? userAnswers.ans1[qidx] : null;
        elAll('.choice', qWrap).forEach(ch => ch.classList.toggle('selected', ch.dataset.choice === ans));
    });

    // TF
    elAll('.question-ex2').forEach(qDiv => {
        const qIndex = Number(qDiv.dataset.qidx);
        elAll('.idea-container', qDiv).forEach(idea => {
            const ideaIdx = Number(idea.dataset.ideaIdx);
            const saved = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            const [trueBtn, falseBtn] = elAll('.true-choice, .false-choice', idea);
            trueBtn.classList.toggle('selected', saved === 'Đ');
            falseBtn.classList.toggle('selected', saved === 'S');
        });
    });

    // short
    elAll('.ex3-answer input[type="text"]').forEach(inp => {
        const idx = Number(inp.dataset.idx);
        if (userAnswers.ans3 && userAnswers.ans3[idx] != null) {
            inp.value = userAnswers.ans3[idx];
        }
    });
}

/* ---------------------------
   Timer
   --------------------------- */
function fmtTimeElapsed(ms) {
    const s = Math.floor(ms / 1000);
    const mm = Math.floor(s / 60).toString().padStart(2,'0');
    const ss = (s % 60).toString().padStart(2,'0');
    return `${mm}:${ss}`;
}

function startOrResumeTimer() {
    const timeEl = el('.point.time');
    if (!timeEl) return;
    const savedStart = loadStart();
    if (savedStart) startTimestamp = savedStart;
    else {
        startTimestamp = Date.now();
        saveStart(startTimestamp);
    }

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTimestamp;
        timeEl.textContent = `Thời gian: ${fmtTimeElapsed(elapsed)}`;
    }, 500);
}

/* ---------------------------
   Submit / scoring / reset
   --------------------------- */
function submitExam() {
    if (isSubmitted) return;
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    const elapsed = Date.now() - startTimestamp;

    // scoring rules:
    // MCQ: each correct = 0.25
    // TF: per question, number correct -> {0:0,1:0.1,2:0.25,3:0.5,4:1}
    // Short: each correct = 0.25

    let scoreValue = 0;

    // MCQ
    const mcqCount = currentExam.ans1.length;
    for (let i = 0; i < mcqCount; i++) {
        const correct = (currentExam.ans1[i] || '').toString().trim().toUpperCase();
        const user = (userAnswers.ans1 && userAnswers.ans1[i]) ? userAnswers.ans1[i].toString().trim().toUpperCase() : null;
        if (user && user === correct) scoreValue += 0.25;
    }

    // TF
    const tfQuestions = currentExam.ans2.length;
    for (let qIndex = 0; qIndex < tfQuestions; qIndex++) {
        const subQ = currentExam.ans2[qIndex];
        let correctCountForThisQ = 0;
        for (let ideaIdx = 0; ideaIdx < subQ.length; ideaIdx++) {
            const correctVal = subQ[ideaIdx];
            const userVal = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            if (userVal && userVal === correctVal) correctCountForThisQ++;
        }
        switch (correctCountForThisQ) {
            case 1: scoreValue += 0.1; break;
            case 2: scoreValue += 0.25; break;
            case 3: scoreValue += 0.5; break;
            case 4: scoreValue += 1; break;
            default: break;
        }
    }

    // Short answers
    const shortCount = currentExam.ans3.length;
    for (let i = 0; i < shortCount; i++) {
        const corrNorm = normalizeNumberAnswer(currentExam.ans3[i]);
        const userNorm = normalizeNumberAnswer((userAnswers.ans3 && userAnswers.ans3[i]) ? userAnswers.ans3[i] : '');
        if (userNorm !== '' && userNorm === corrNorm) scoreValue += 0.25;
    }

    const maxMcq = mcqCount * 0.25;
    const maxTf = tfQuestions * 1.0;
    const maxShort = shortCount * 0.25;
    const maxScore = +(maxMcq + maxTf + maxShort).toFixed(2);

    const scoreObj = {
        score: +(Math.round(scoreValue * 100) / 100).toFixed(2),
        maxScore,
        elapsedMs: elapsed,
        timestamp: Date.now()
    };

    // save result (keep for records)
    saveResult(scoreObj);

    // show UI results
    showResultsUI(scoreObj);
    isSubmitted = true;

    // After submit: clear resume keys so re-opening won't resume an in-progress exam
    clearStart();
    clearSavedAnswers();
}

/* ---------------------------
   Show results UI (mark answers etc)
   --------------------------- */
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

        const oldBadge = qWrap.querySelector('.status-badge');
        if (oldBadge) oldBadge.remove();
        elAll('.chosen-arrow', qWrap).forEach(a => a.remove());

        qWrap.classList.remove('unanswered');
        elAll('.choice', qWrap).forEach(ch => {
            ch.classList.remove('correct','wrong','user-choice');
            ch.style.cursor = 'default';
            ch.tabIndex = -1;
        });

        const correctEl = qWrap.querySelector(`.choice.${correct}`);
        if (correctEl) correctEl.classList.add('correct');

        if (!user) {
            qWrap.classList.add('unanswered');
            const badge = document.createElement('span');
            badge.className = 'status-badge unanswered';
            badge.textContent = 'Chưa chọn';
            qWrap.appendChild(badge);
        } else {
            const userEl = qWrap.querySelector(`.choice.${user}`);
            if (userEl) {
                userEl.classList.add('user-choice','selected');
                const arrow = document.createElement('span');
                arrow.className = 'chosen-arrow';
                arrow.textContent = '▴';
                const prevA = userEl.querySelector('.chosen-arrow'); if (prevA) prevA.remove();
                userEl.appendChild(arrow);

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
                qWrap.appendChild(badge);
            } else {
                const badge = document.createElement('span');
                badge.className = 'status-badge unanswered';
                badge.textContent = 'Chưa chọn';
                qWrap.appendChild(badge);
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
            [trueBtn, falseBtn].forEach(b => {
                b.classList.remove('selected','correct','wrong','user-choice');
                b.style.cursor = 'default';
                b.tabIndex = -1;
            });

            const correctVal = currentExam.ans2[qIndex][ideaIdx];
            if (correctVal === 'Đ') trueBtn.classList.add('correct');
            else falseBtn.classList.add('correct');

            const userVal = (userAnswers.ans2 && userAnswers.ans2[qIndex]) ? userAnswers.ans2[qIndex][ideaIdx] : null;
            const existingBadge = idea.querySelector('.status-badge');
            if (existingBadge) existingBadge.remove();

            if (!userVal) {
                idea.classList.add('unanswered');
                const b = document.createElement('span');
                b.className = 'status-badge unanswered';
                b.textContent = 'Chưa chọn';
                idea.appendChild(b);
            } else {
                const chosenBtn = (userVal === 'Đ') ? trueBtn : falseBtn;
                chosenBtn.classList.add('user-choice','selected');
                if (userVal !== correctVal) chosenBtn.classList.add('wrong');
                else chosenBtn.classList.add('correct');

                const b = document.createElement('span');
                b.className = 'status-badge ' + (userVal === correctVal ? 'correct' : 'wrong');
                b.textContent = userVal === correctVal ? 'Kết quả đúng' : 'Kết quả sai';
                idea.appendChild(b);
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
            inp.classList.add('unanswered');
            inp.placeholder = 'Chưa trả lời';
            const b = document.createElement('span');
            b.className = 'status-badge unanswered';
            b.textContent = 'Chưa trả lời';
            shortItem.appendChild(b);
            shortItem.appendChild(corrBox);
        } else if (userNorm === corrNorm) {
            inp.classList.add('correct');
            const b = document.createElement('span');
            b.className = 'status-badge correct';
            b.textContent = 'Kết quả đúng';
            shortItem.appendChild(b);
            shortItem.appendChild(corrBox);
        } else {
            inp.classList.add('wrong');
            inp.placeholder = `Đáp án: ${corrRaw}`;
            const b = document.createElement('span');
            b.className = 'status-badge wrong';
            b.textContent = 'Kết quả sai';
            shortItem.appendChild(b);
            shortItem.appendChild(corrBox);
        }
    });

    // disable event listeners (best-effort)
    disableInteractions();

    // reveal toggle answer button and set it to show answers file by default
    const toggleBtn = el('#toggle-ans-btn');
    if (toggleBtn) {
        toggleBtn.classList.remove('hide');
        toggleBtn.dataset.state = 'ans';
        toggleBtn.textContent = 'Xem đề';
        const iframe = el('#main-iframe'); if (iframe && currentExam && currentExam.ansLink) iframe.src = currentExam.ansLink;
    }
}

/* ---------------------------
   Disable interactions after submit
   --------------------------- */
function disableInteractions() {
    elAll('.choice').forEach(ch => {
        ch.style.cursor = 'default';
        try { ch.removeEventListener('click', onMCQChoiceClick); } catch(e){}
        ch.tabIndex = -1;
    });
    elAll('.true-choice, .false-choice').forEach(btn => {
        btn.style.cursor = 'default';
        try { btn.removeEventListener('click', onTFChoiceClick); } catch(e){}
        btn.tabIndex = -1;
    });
    elAll('.ex3-answer input').forEach(inp => inp.readOnly = true);
}

/* ---------------------------
   Toggle iframe between exam and answers
   --------------------------- */
function toggleExamAnswer() {
    const iframe = el('#main-iframe');
    const btn = el('#toggle-ans-btn');
    if (!iframe || !btn || !currentExam) return;

    if (btn.dataset.state === 'ans') {
        iframe.src = currentExam.link;
        btn.dataset.state = 'exam';
        btn.textContent = 'Xem đáp án';
    } else {
        iframe.src = currentExam.ansLink;
        btn.dataset.state = 'ans';
        btn.textContent = 'Xem đề';
    }
}

/* ---------------------------
   UI bindings & init
   --------------------------- */
window.showAskForSubmit = function() { el('.ask-for-submit').classList.remove('hide'); };
window.hideAskForSubmit = function() { el('.ask-for-submit').classList.add('hide'); };
window.showCancelExam = function() { el('.cancel-exam').classList.remove('hide'); };
window.hideCancelExam = function() { el('.cancel-exam').classList.add('hide'); };

function attachUiHandlers() {
    const turnBack = el('.turn-back');
    if (turnBack) {
        turnBack.addEventListener('click', showCancelExam);
    }

    elAll('.ask-for-submit .background, .cancel-exam .background').forEach(bg => {
        bg.addEventListener('click', () => {
            el('.ask-for-submit') && hideAskForSubmit();
            el('.cancel-exam') && hideCancelExam();
        });
    });

    window.submitExam = submitExam;
    window.toggleExamAnswer = toggleExamAnswer;
}

function init() {
    // pick an exam randomly (non-repeat) but avoid exams that already have a saved result
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
