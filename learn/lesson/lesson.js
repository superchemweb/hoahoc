import { lessons } from "../scripts/unit.js";
import { updateProgressBar } from "../../utils/util.js";

const params = new URLSearchParams(window.location.search);
const unit = params.get('unit');
const level = Number(params.get('level'));
const type = params.get('type');

var lesson = lessons[unit - 1].content;

if (type === 'theory') {
    let html = `
        <div class="header">
            <h1 class="title">Lí thuyết trọng tâm</h1>
            <div class="footer">
                <div class="done-btn">Đánh dấu là đã đọc</div>
            </div>
        </div>
        <div class="theory-doc">
            <iframe src="${lesson[level].filename}
                frameborder="0" style="width: 70%; height: 88vh">
            </iframe>
        </div>
        
    `;

    document.querySelector('.screen').innerHTML = html;

    // done-btn
    document.querySelector('.done-btn').addEventListener('click', () => {
        window.location.href = `../learn.html?mark=true&unit=${unit}&level=${level}`
    });
} else if (type === 'ex1') {
    // Giả sử đã có biến: unit, level, lesson
    const screen = document.querySelector('.screen');

    // Khởi tạo toàn bộ giao diện quiz bên trong .screen
    screen.innerHTML = `
        <div class="header">
            <h1 class="title">Luyện tập - Trắc nghiệm lựa chọn</h1>
        </div>
        <div class="top-section">
            <a class="exit-btn" href="../learn.html">
                <img src="../../assets/images/home-btn.svg">
            </a>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        </div>
        <div class="content">
            <div class="question"></div>
            <div class="img"></div>
            <div class="options-container"></div>
            <div class="explain"></div>
        </div>
        <div class="bottom-section">
            <div class="check-btn">Kiểm tra</div>
            <div class="continue-btn hide">Tiếp tục</div>
        </div>
    `;

    // Dữ liệu câu hỏi
    const questions = lesson[level].questions;
    const maxPoint = questions.length;
    let point = 0;
    let lessonQueue = [...questions];

    // Hàm cập nhật thanh tiến trình
    function updateProgressBar(current, total) {
        const progressBar = document.querySelector('.progress-bar');
        const progress = (current / total) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Hiển thị câu hỏi
    function displayQuestion() {
        if (lessonQueue.length === 0) {
            alert("Bạn đã hoàn thành tất cả câu hỏi!");
            document.location.href = `../learn.html?mark=true&unit=${unit}&level=${level}`;
            return;
        }

        const { question, answers, img, explain } = lessonQueue[0];
        const correctAnswer = answers[0];
        const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

        // DOM elements
        const questionElement = document.querySelector('.question');
        const imgElement = document.querySelector('.img');
        const optionsContainer = document.querySelector('.options-container');
        const explainElement = document.querySelector('.explain');
        const checkButton = document.querySelector('.check-btn');
        const continueButton = document.querySelector('.continue-btn');

        // Reset UI
        questionElement.innerHTML = question;
        explainElement.innerHTML = '';
        optionsContainer.innerHTML = '';
        continueButton.classList.add('hide');

        // Ảnh (nếu có)
        if (img && img !== 'none') {
            imgElement.innerHTML = `<img src="../../assets/learn-assets/ques-img/${img}" alt="Question image" class="question-img">`;
        } else {
            imgElement.innerHTML = '';
        }

        // Track selected option
        let selectedOption = null;

        // Render các đáp án
        shuffledAnswers.forEach(answer => {
            const option = document.createElement('div');
            option.className = 'option';
            option.innerHTML = answer;

            option.addEventListener('click', () => {
                if (selectedOption) selectedOption.classList.remove('selected');
                option.classList.add('selected');
                selectedOption = option;
            });

            optionsContainer.appendChild(option);
        });

        // Reset và thêm event cho nút "Kiểm tra"
        const newCheckButton = document.querySelector('.check-btn');
        const newButtonClone = newCheckButton.cloneNode(true);
        newCheckButton.parentNode.replaceChild(newButtonClone, newCheckButton);

        newButtonClone.addEventListener('click', () => {
            if (!selectedOption) {
                alert("Vui lòng chọn một đáp án!");
                return;
            }

            const isCorrect = selectedOption.innerHTML === correctAnswer;
            selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

            if (isCorrect) {
                point++;
                lessonQueue.shift();
                updateProgressBar(point, maxPoint);
                explainElement.innerHTML = explain;
            } else {
                const currentQuestion = lessonQueue.shift();
                lessonQueue.push(currentQuestion);
                explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
            }

            // Sound
            const audio = new Audio(`../../assets/sounds/${isCorrect}.mp3`);
            audio.play();

            // Disable interaction
            optionsContainer.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');
            newCheckButton.style.pointerEvents = 'none';

            // Show continue
            continueButton.classList.remove('hide');
        });
    }

    // Nút tiếp tục
    function setContinueButton() {
        const continueButton = document.querySelector('.continue-btn');
        continueButton.addEventListener('click', displayQuestion);
    }

    // Khởi tạo quiz
    setContinueButton();
    displayQuestion();

} else if (type === 'ex2') {
    const screen = document.querySelector('.screen');

    // Giao diện tổng thể
    screen.innerHTML = `
        <div class="header">
            <h1 class="title">Luyện tập - Đúng / Sai</h1>
        </div>
        <div class="top-section">
            <a class="exit-btn" href="../learn.html">
                <img src="../../assets/images/home-btn.svg">
            </a>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        </div>
        <div class="content">
            <div class="question-block"></div>
            <div class="explain"></div>
        </div>
        <div class="bottom-section">
            <div class="check-btn">Kiểm tra</div>
            <div class="continue-btn hide">Tiếp tục</div>
        </div>
    `;

    // Dữ liệu câu hỏi
    const questions = lesson[level].questions;
    const maxPoint = questions.length;
    let point = 0;
    let lessonQueue = [...questions]; // queue để xoay các câu sai

    function updateProgressBar(current, total) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = `${(current / total) * 100}%`;
    }

    function displayQuestion() {
        if (lessonQueue.length === 0) {
            alert("Bạn đã hoàn thành tất cả câu hỏi!");
            document.location.href = `../learn.html?mark=true&unit=${unit}&level=${level}`;
            return;
        }

        const q = lessonQueue[0];
        const block = document.querySelector('.question-block');
        const explain = document.querySelector('.explain');
        const checkButton = document.querySelector('.check-btn');
        const continueButton = document.querySelector('.continue-btn');

        explain.innerHTML = '';
        continueButton.classList.add('hide');

        // Ảnh minh họa
        const imgHTML = q.img && q.img !== 'none' ? 
            `<img src="${q.img}" alt="image" class="question-img">` : '';

        // Bảng đúng/sai
        let rows = '';
        q.ideas.forEach((idea, i) => {
            rows += `
                <tr>
                    <td class="idea-text">${idea}</td>
                    <td><button class="btn-tf" data-choice="Đúng">✔</button></td>
                    <td><button class="btn-tf" data-choice="Sai">✖</button></td>
                </tr>
            `;
        });

        block.innerHTML = `
            <div class="question-title">${q.question}</div>
            ${imgHTML}
            <table class="tf-table">
                <thead>
                    <tr>
                        <th>Phát biểu</th>
                        <th>Đúng</th>
                        <th>Sai</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;

        // Chọn đáp án
        const rowsEl = block.querySelectorAll('tbody tr');
        rowsEl.forEach(row => {
            const buttons = row.querySelectorAll('.btn-tf');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });
        });

        // Reset event nút kiểm tra
        const newCheckBtn = checkButton.cloneNode(true);
        checkButton.parentNode.replaceChild(newCheckBtn, checkButton);

        newCheckBtn.addEventListener('click', () => {
            let allAnswered = true;
            let isAllCorrect = true; // để kiểm tra toàn bộ ý đúng
            rowsEl.forEach((row, i) => {
                const selected = row.querySelector('.btn-tf.selected');
                const correctAnswer = q.answers[i];
                if (!selected) {
                    allAnswered = false;
                    return;
                }

                const isCorrect = selected.dataset.choice === correctAnswer;
                selected.classList.add(isCorrect ? 'correct' : 'wrong');

                if (!isCorrect) {
                    isAllCorrect = false;
                    // highlight đáp án đúng
                    row.querySelector(`[data-choice="${correctAnswer}"]`).classList.add('highlight-correct');
                }
            });

            if (!allAnswered) {
                alert("Vui lòng chọn đáp án cho tất cả các phát biểu!");
                return;
            }

            // Nếu tất cả đúng → cộng điểm và loại bỏ câu ra khỏi queue
            // Nếu không → đẩy câu về cuối queue, không cộng điểm
            if (isAllCorrect) {
                point++;
                lessonQueue.shift();
            } else {
                const wrongQ = lessonQueue.shift();
                lessonQueue.push(wrongQ);
            }

            updateProgressBar(maxPoint - lessonQueue.length, maxPoint);

            // Giải thích
            explain.innerHTML = `<div class="explain-text">${q.explain}</div>`;

            // Hiện nút tiếp tục
            continueButton.classList.remove('hide');
        });
    }

    // Nút tiếp tục
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);

    // Khởi chạy câu đầu
    displayQuestion();
} else if (type === 'ex3') {
    const screen = document.querySelector('.screen');

    // Giao diện tổng thể
    screen.innerHTML = `
        <div class="header">
            <h1 class="title">Luyện tập - Tự luận trả lời ngắn</h1>
        </div>
        <div class="top-section">
            <a class="exit-btn" href="../learn.html">
                <img src="../../assets/images/home-btn.svg">
            </a>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        </div>
        <div class="content">
            <div class="question-block"></div>
            <div class="explain"></div>
        </div>
        <div class="bottom-section">
            <div class="check-btn">Kiểm tra</div>
            <div class="continue-btn hide">Tiếp tục</div>
        </div>
    `;

    const questions = lesson[level].questions;
    const maxPoint = questions.length;
    let point = 0;
    let lessonQueue = [...questions];

    const checkButton = document.querySelector('.check-btn');
    const continueButton = document.querySelector('.continue-btn');

    function updateProgressBar(current, total) {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = `${(current / total) * 100}%`;
    }

    function displayQuestion() {
        if (lessonQueue.length === 0) {
            alert("Bạn đã hoàn thành tất cả câu hỏi!");
            document.location.href = `../learn.html?mark=true&unit=${unit}&level=${level}`;
            return;
        }

        const q = lessonQueue[0];
        const block = document.querySelector('.question-block');
        const explain = document.querySelector('.explain');

        explain.innerHTML = '';
        continueButton.classList.add('hide');

        // Ảnh minh họa
        const imgHTML = q.img && q.img !== 'none' ? 
            `<img src="${q.img}" alt="image" class="question-img">` : '';

        // Hiển thị câu hỏi + input
        block.innerHTML = `
            <div class="question-title">${q.question}</div>
            ${imgHTML}
            <div class="answer-input">
                <input type="text" placeholder="Nhập số" class="short-answer">
            </div>
        `;

        const inputEl = block.querySelector('.short-answer');

        // Reset trạng thái nút kiểm tra
        checkButton.style.pointerEvents = 'auto';
        checkButton.style.opacity = 1;

        checkButton.onclick = () => {
            const userAnswer = inputEl.value.trim();
            if (userAnswer === '') {
                alert("Vui lòng nhập câu trả lời!");
                return;
            }

            const correctAnswer = q.answer.toString().trim();
            const isCorrect = userAnswer === correctAnswer;

            // Phát âm thanh đúng / sai
            const audio = new Audio(`../../assets/sounds/${isCorrect ? 'true' : 'false'}.mp3`);
            audio.play();

            // Hiệu ứng màu input
            inputEl.style.backgroundColor = isCorrect ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)';
            inputEl.style.borderColor = isCorrect ? '#4caf50' : '#f44336';
            inputEl.style.color = 'black';

            // Disable nút kiểm tra
            checkButton.style.pointerEvents = 'none';
            checkButton.style.opacity = 0.6;

            // Cập nhật queue và điểm
            if (isCorrect) {
                point++;
                lessonQueue.shift();
            } else {
                lessonQueue.push(lessonQueue.shift());
            }

            updateProgressBar(maxPoint - lessonQueue.length, maxPoint);

            // Hiển thị giải thích
            explain.innerHTML = `<div class="explain-text">${q.explain}</div>`;

            // Hiện nút tiếp tục
            continueButton.classList.remove('hide');
        };
    }

    // Nút tiếp tục
    continueButton.onclick = displayQuestion;

    // Hiển thị câu đầu tiên
    displayQuestion();
}



