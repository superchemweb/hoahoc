let units = JSON.parse(localStorage.getItem('units')) || [
// let units = [
    {
        id: 1,
        name: "Ester",
        levels: [
            {
                name: "Dạng 1. Khái niệm, Danh pháp, Tính chất vật lí",
                isDone: 'done',
                type: "theory"
            }, {
                name: "Luyện tập dạng 1 (Trắc nghiệm lựa chọn)",
                isDone: 'not-done',
                type: "ex1"
            }, {
                name: "Luyện tập dạng 1 (Trắc nghiệm đúng sai)",
                isDone: 'not-done',
                type: "ex2"
            }, {
                name: "Luyện tập dạng 1 (Tự luận trả lời ngắn)",
                isDone: 'not-done',
                type: "ex3"
            }, {
                name: "Dạng 2. Tính chất hóa học",
                isDone: 'done',
                type: "theory"
            }, {
                name: "Luyện tập dạng 2 (Trắc nghiệm lựa chọn)",
                isDone: 'not-done',
                type: "ex1"
            }, {
                name: "Luyện tập dạng 2 (Trắc nghiệm đúng sai)",
                isDone: 'not-done',
                type: "ex2"
            }, {
                name: "Luyện tập dạng 2 (Tự luận trả lời ngắn)",
                isDone: 'not-done',
                type: "ex3"
            }, {
                name: "Dạng 3. Ứng dụng, Điều chế",
                isDone: 'done',
                type: "theory"
            }, {
                name: "Luyện tập dạng 3 (Trắc nghiệm lựa chọn)",
                isDone: 'not-done',
                type: "ex1"
            }, {
                name: "Luyện tập dạng 3 (Trắc nghiệm đúng sai)",
                isDone: 'not-done',
                type: "ex2"
            }, {
                name: "Luyện tập dạng 3 (Tự luận trả lời ngắn)",
                isDone: 'not-done',
                type: "ex3"
            },
            
        ],
    }
];

localStorage.setItem('units', JSON.stringify(units));

const params = new URLSearchParams(window.location.search);
const mark_pr = params.get('mark');
const unit_pr = params.get('unit');
const level_pr = params.get('level');

if (mark_pr === 'true') {
    units[unit_pr - 1].levels[Number(level_pr)].isDone = 'done';
    localStorage.setItem('units', JSON.stringify(units));
}

function displayUnits() {
    let html = ``;
    units.forEach((unit, index) => {
        const {id, name, levels} = unit;
        html += `
            <div class="unit">
                <div class="unit-line">
                    <div class="unit-name">
                        ${id}: ${name}
                    </div>
                </div>        
                <div class="unit-levels">
        `;
        levels.forEach((level, idx) => {
            html += `
                <div class="level">
                    ${level.type === "theory" ? `<div class="part-name">${level.name}</div>` : ""}
                    <div class="level-btn ${level.isDone}-level">
                        <img src="../../assets/images/${level.type}-logo.svg" class="level-logo">
                    </div>
                    <div class="intro-level">
                        <span class="level-name">${level.name}</span>
                        <a class="start-btn" href="lesson/lesson.html?unit=${id}&level=${idx}&type=${level.type}">Bắt đầu</a>
                       </div>
                </div>
            `;
        });
        html += `
                </div>
            </div>
        `;
    });
    document.querySelector('.mid-section')
        .innerHTML = html;
}

function addEvent() {
    // Lấy tất cả các level-btn có trạng thái unlock
    const levelButtons = document.querySelectorAll('.level-btn');

    levelButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            // Ẩn tất cả các intro-level
            document.querySelectorAll('.intro-level').forEach(intro => {
                intro.classList.remove('show');
                intro.style.display = 'none';
            });

            // Hiển thị intro-level tương ứng
            console.log('show');
            const introLevel = btn.nextElementSibling;
            if (introLevel) {
                introLevel.style.display = 'flex'; // Hiển thị flex trước
                requestAnimationFrame(() => {
                    introLevel.classList.add('show'); // Thêm hiệu ứng phóng to
                });
            }
        });
    });
}

// Gọi hàm sau khi hiển thị nội dung
// resetUnits();
displayUnits();
addEvent();
saveScrollPosition();


function resetUnits() {
    units = []
    
    localStorage.setItem('units', JSON.stringify(units));
}

function saveScrollPosition() {
    // Lưu lại vị trí cuộn khi người dùng rời khỏi trang
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Khôi phục lại vị trí cuộn khi trang được tải lại
    window.addEventListener('load', function () {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition)); // Cuộn về vị trí đã lưu
        }
    });
}