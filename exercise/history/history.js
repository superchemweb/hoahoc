const params = new URLSearchParams(window.location.search);
const index = params.get('index');

const historyData = JSON.parse(localStorage.getItem('history-exam-data'))[index];
console.log(historyData);

document.querySelector('.exam').innerHTML = historyData['data'];

document.querySelector('.turn-back').addEventListener('click', () => {
    window.location.href = '../';
})
