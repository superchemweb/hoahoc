import { trac_nghiem1, trac_nghiem2 } from './trac-nghiem.js';
import { dung_sai1, dung_sai2 } from './dung-sai.js';
import { tu_luan1, tu_luan2 } from './tu-luan.js';

// -------------------- CẤU HÌNH CHÍNH --------------------
const userAnswers = {};
const correctAnswers1 = [];
const correctAnswers2 = [];
const correctAnswers3 = [];
const plusPoint = [1, 1, 2, 1, 1];

let time = 0, time2 = 0, totalPoint = 0;
let intervalIds = [];

console.log("contest.js loaded");

window.userSelect = userSelect;
window.submitExam = submitExam;
window.showAskForSubmit = showAskForSubmit;
window.hideAskForSubmit = hideAskForSubmit;
window.showCancelExam = showCancelExam;
window.hideCancelExam = hideCancelExam;

// -------------------- SỰ KIỆN CHÍNH --------------------
const turnBack = document.querySelector('.turn-back');
turnBack.addEventListener('click', showCancelExam);

createEx1();
createEx2();
createEx3();
setupTime();

// -------------------- PHẦN I: TRẮC NGHIỆM 4 ĐÁP ÁN --------------------
function createEx1() {
    console.log('Tạo phần EX1');

    let questions = [];
    questions = [
    ...trac_nghiem1.sort(() => Math.random() - 0.5).slice(0, 14),
    ...trac_nghiem2.sort(() => Math.random() - 0.5).slice(0, 4)
    ];


    let html = ``;
    questions.forEach((q, index) => {
        const correct = q.choices[0];
        const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
        const correctLetter = ['A', 'B', 'C', 'D'][shuffled.indexOf(correct)];
        correctAnswers1.push(correctLetter);
        const qid = `q${index + 1}`;
        userAnswers[qid] = null;

        html += `
            <div class="line"></div>
            <label class="question-id">Câu ${index + 1}:</label>
            <label class="question-name">${q.question}</label>
            ${q.img && q.img !== 'none' ? `<div class="question-img"><img src="${q.img}" alt="image"></div>` : ''}

            <div class="btn-group">
                ${shuffled.map((opt, i) => `
                    <div class="choice ${qid} ${['A','B','C','D'][i]}">
                        <div class="select-circle ${qid}-choices ${['A','B','C','D'][i]}"
                            onclick="userSelect('${qid}','${['A','B','C','D'][i]}')">
                            ${['A','B','C','D'][i]}
                        </div>
                        <div class="answer">${opt}</div>
                        <div class="result-icon"></div>
                    </div>`).join('')}
            </div>
            <div class="explain hide-explain">${q.explain ? '*Giải thích:<br>' + q.explain : ''}</div>
        `;
    });

    document.querySelector('.ex1').innerHTML = html;
}

// -------------------- PHẦN II: ĐÚNG / SAI --------------------
function createEx2() {
    console.log('Tạo phần EX2');

    let questions = [];
    questions = [
    ...dung_sai1.sort(() => Math.random() - 0.5).slice(0, 2),
    ...dung_sai2.sort(() => Math.random() - 0.5).slice(0, 2)
    ];


    let html = ``;
    questions.forEach((q, idx) => {
        const qid = `ex2q${idx + 1}`;
        correctAnswers2.push(q.options.map(o => o.correct));
        userAnswers[qid] = [];

        html += `
        <div class="line"></div>
        <div class="question-block">
            <label class="question-id">Câu ${idx + 1}:</label>
            <<label class="question-name">${q.question}</label>
            ${q.img && q.img !== 'none' ? `<div class="question-img"><img src="${q.img}" alt="image"></div>` : ''}

            <table class="true-false-table">
                <tr><th>Ý</th><th>Đúng</th><th>Sai</th></tr>
                ${q.options.map((opt, i) => `
                    <tr>
                        <td>${String.fromCharCode(97 + i)}) ${opt.question}</td>
                        <td><input type="checkbox" class="right" name="${qid}-${i}-right"></td>
                        <td><input type="checkbox" class="wrong" name="${qid}-${i}-wrong"></td>
                    </tr>
                `).join('')}
            </table>
        </div>`;
    });

    document.querySelector('.ex2').innerHTML = html;

    // logic: chỉ chọn 1 trong 2 checkbox
    document.querySelectorAll('.true-false-table input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', e => {
            const name = e.target.name;
            const [qid, idx, type] = name.split('-');
            const twinType = type === 'right' ? 'wrong' : 'right';
            const twin = document.querySelector(`input[name="${qid}-${idx}-${twinType}"]`);
            if (twin && e.target.checked) twin.checked = false;
        });
    });
}

// -------------------- PHẦN III: TỰ LUẬN --------------------
function createEx3() {
    console.log('Tạo phần EX3');
    let questions = [];
    questions = [
    ...tu_luan1.sort(() => Math.random() - 0.5).slice(0, 4),
    ...tu_luan2.sort(() => Math.random() - 0.5).slice(0, 2)
    ];


    let html = ``;
    questions.forEach((q, i) => {
        const qid = `ex3q${i + 1}`;
        correctAnswers3.push(String(q.answer));
        userAnswers[qid] = '';
        html += `
        <div class="line"></div>
        <label class="question-id">Câu ${i + 1}:</label>
        <label class="question-name">${q.question}</label>
        ${q.img && q.img !== 'none' ? `<div class="question-img"><img src="${q.img}" alt="image"></div>` : ''}

        <div class="answer-area">
            <input type="text" maxlength="4" class="your-answer" id="${qid}">
            <div class="result-icon"></div>
        </div>
        <div class="explain hide-explain">${q.explain ? '*Giải thích:<br>' + q.explain : ''}</div>
        `;
    });

    document.querySelector('.ex3').innerHTML = html;
}

// -------------------- CHỌN ĐÁP ÁN EX1 --------------------
function userSelect(q, ans) {
    userAnswers[q] = ans;
    document.querySelectorAll(`.${q}-choices`).forEach(b => b.classList.remove('selected'));
    document.querySelector(`.${q}-choices.${ans}`).classList.add('selected');
}

// -------------------- NỘP BÀI --------------------
function submitExam() {
    // Dừng timer
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Khóa nút nộp
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }

    let totalScore = 0;
    let totalQuestions = 0;

    // ==================== TRẮC NGHIỆM ====================
    const ex1Questions = document.querySelectorAll('.ex1 .question-id');
    ex1Questions.forEach((_, i) => {
        totalQuestions++;
        const qid = `q${i + 1}`;
        const correct = correctAnswers1[i];
        const user = userAnswers[qid];

        const choices = document.querySelectorAll(`.${qid}-choices`);
        choices.forEach(choice => {
            const letter = choice.textContent.trim();
            const parent = choice.closest('.choice');
            const result = parent.querySelector('.result-icon');
            result.textContent = '';
            parent.style.backgroundColor = '';

            if (!user) {
                if (letter === correct) {
                    parent.style.backgroundColor = '#cfcc00ff'; 
                    result.textContent = '?';
                    result.style.color = 'white';
                }
            } else {
                if (letter === correct) {
                    parent.style.backgroundColor = '#4CAF50'; 
                    result.textContent = '✓';
                    result.style.color = 'white';
                }
                if (user === letter && user !== correct) {
                    parent.style.backgroundColor = '#F44336'; 
                    result.textContent = '✗';
                    result.style.color = 'white';
                }
            }
        });

        if (user === correct) totalScore += 0.25; // mỗi câu đúng 0.25
    });

    // ==================== ĐÚNG / SAI ====================
    const ex2Questions = document.querySelectorAll('.ex2 .question-block');
    ex2Questions.forEach((block, qIndex) => {
        totalQuestions++;
        let correctCount = 0;

        const options = correctAnswers2[qIndex];
        const rows = block.querySelectorAll('tr');
        rows.forEach((row, i) => {
            if (i === 0) return;
            const tds = row.querySelectorAll('td');
            const trueBox = row.querySelector('input[name*="right"]');
            const falseBox = row.querySelector('input[name*="wrong"]');
            const correct = options[i - 1];

            tds[1].style.backgroundColor = '';
            tds[2].style.backgroundColor = '';
            tds[1].querySelector('.mark')?.remove();
            tds[2].querySelector('.mark')?.remove();

            const mark = (td, symbol, color) => {
                td.style.position = 'relative';
                td.style.backgroundColor = color;
                const span = document.createElement('span');
                span.textContent = symbol;
                span.className = 'mark';
                span.style.position = 'absolute';
                span.style.top = '4px';
                span.style.right = '8px';
                span.style.fontWeight = 'bold';
                span.style.color = 'white';
                td.appendChild(span);
            };

            if (trueBox.checked || falseBox.checked) {
                const userAnswer = trueBox.checked ? true : false;
                if (userAnswer === correct) {
                    const td = userAnswer ? tds[1] : tds[2];
                    mark(td, '✓', '#4CAF50');
                    correctCount++;
                } else {
                    const wrongTd = userAnswer ? tds[1] : tds[2];
                    mark(wrongTd, '✗', '#F44336');
                    const correctTd = correct ? tds[1] : tds[2];
                    mark(correctTd, '✓', '#4CAF50');
                }
            } else {
                const correctTd = correct ? tds[1] : tds[2];
                mark(correctTd, '?', '#FF9800');
            }
        });

        // Tính điểm đúng/sai theo số ý đúng
        let score = 0;
        if (correctCount === 1) score = 0.1;
        else if (correctCount === 2) score = 0.25;
        else if (correctCount === 3) score = 0.5;
        else if (correctCount === 4) score = 1;

        totalScore += score;

        const res = document.createElement('div');
        res.textContent = `Điểm câu này: ${score.toFixed(2)} / 1.00`;
        res.style.marginTop = '8px';
        res.style.fontWeight = 'bold';
        res.style.fontSize = '20px';
        res.style.color = '#15c0a4ff';
        block.appendChild(res);
    });

    // ==================== PHẦN TỰ LUẬN ====================
    const ex3Questions = document.querySelectorAll('.ex3 .question-id');
    ex3Questions.forEach((_, i) => {
        const qid = `ex3q${i + 1}`;
        const correct = String(correctAnswers3[i]).trim();
        const userInput = document.querySelector(`#${qid}`);
        const icon = userInput.parentElement.querySelector('.result-icon');
        icon.textContent = ''; // reset icon

        // Xóa dòng đáp án cũ nếu có
        const oldAnswer = userInput.parentElement.querySelector('.true-answer');
        if (oldAnswer) oldAnswer.remove();

        const val = userInput.value.trim();

        if (!val) {
            // chưa làm
            userInput.value = 'Trống';
            userInput.classList.add('missed');
            icon.textContent = '?';
            icon.style.color = '#FFA726';
        } else if (val === correct || val.replace(',', '.') === correct) {
            // đúng
            userInput.classList.add('correct');
            icon.textContent = '✓';
            icon.style.color = '#4CAF50';
        } else {
            // sai
            userInput.classList.add('wrong');
            icon.textContent = '✗';
            icon.style.color = '#E53935';
        }

        // Luôn hiển thị đáp án đúng bên dưới input
        userInput.insertAdjacentHTML('afterend', `<div class="true-answer">Đáp án đúng: <b>${correct}</b></div>`);

        // disable input sau khi chấm
        userInput.disabled = true;
    });


    // ==================== HIỂN THỊ KẾT QUẢ VÀ GIẢI THÍCH ====================
    let totalDiv = document.querySelector('.result');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.className = 'result';
        document.body.prepend(totalDiv);
    }

    totalDiv.innerHTML = `
        <h3>KẾT QUẢ BÀI THI</h3>
        <p><b>Tổng điểm:</b> ${totalScore.toFixed(2)}</p>
    `;
    totalDiv.style.padding = '12px';
    totalDiv.style.marginTop = '16px';
    totalDiv.style.border = '2px solid #2196F3';
    totalDiv.style.borderRadius = '8px';
    totalDiv.style.backgroundColor = '#1976D2';
    totalDiv.style.color = 'white';

    // Hiển thị phần giải thích cho tất cả câu
    document.querySelectorAll('.explain').forEach(div => {
        div.classList.remove('hide-explain');
    });

    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });

}

// -------------------- TIMER --------------------
function setupTime() {
    const params = new URLSearchParams(window.location.search);
    time = params.get('time') || 10;
    time2 = time * 60;
    intervalIds.push(setInterval(() => {
        time2--;
        if (time2 <= 0) return submitExam();
        const h = Math.floor(time2 / 3600).toString().padStart(2, '0');
        const m = Math.floor((time2 % 3600) / 60).toString().padStart(2, '0');
        const s = (time2 % 60).toString().padStart(2, '0');
        document.querySelector('.time').innerHTML = `${h}:${m}:${s}`;
    }, 1000));
}

// -------------------- POPUP XÁC NHẬN --------------------
function showAskForSubmit() {
    document.querySelector('.ask-for-submit').classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
function hideAskForSubmit() {
    document.querySelector('.ask-for-submit').classList.add('hide');
    document.body.style.overflow = 'auto';
}
function showCancelExam() {
    document.querySelector('.cancel-exam').classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
function hideCancelExam() {
    document.querySelector('.cancel-exam').classList.add('hide');
    document.body.style.overflow = 'auto';
}

