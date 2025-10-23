var box = [
    {
        heading: `Các chuyên đề trọng tâm ôn thi THPT Quốc gia môn Hóa`,
        links: [
            {
                type: `Tổng hợp các chuyên đề trọng tâm ôn thi Hóa THPT Quốc gia`,
                link: `https://vietjack.com/on-thi-dai-hoc/chu-de-on-thi-tot-nghiep-hoa-hoc-2025.jsp`,
            },
            {
                type: `Phân loại và phương pháp giải nhanh trắc nghiệm Hóa học`,
                link: `https://vietjack.com/cong-thuc/cong-thuc-giai-nhanh-trac-nghiem-hoa-hoc.jsp`,
            },
            {
                type: `Công thức tính nhanh – Mẹo giải trắc nghiệm Hóa học 12`,
                link: `https://vietjack.com/cong-thuc/cong-thuc-giai-nhanh-trac-nghiem-hoa-hoc.jsp`,
            },
        ]
    },
    {
        heading: `Tổng hợp đề thi và đề minh họa THPT Quốc gia môn Hóa`,
        links: [
            {
                type: `Bộ đề thi minh họa Hóa học – Bộ GD&ĐT các năm`,
                link: `https://vietjack.com/on-thi-dai-hoc/de-on-thi-thpt-quoc-gia-mon-hoa.jsp`,
            },
            {
                type: `Tổng hợp 50+ đề thi thử THPT Quốc gia môn Hóa có đáp án chi tiết`,
                link: `https://thuvienhoclieu.com/series/cac-de-thi-thu-tot-nghiep-thpt-mon-hoa-nam-2025-co-dap-an-va-loi-giai/`,
            },
            {
                type: `Tuyển chọn đề thi Hóa học THPT Quốc gia từ các Sở GD`,
                link: `https://tailieuonthi.org/bo-de-thi-thu-tn-thpt-2025-mon-hoa-hoc/`,
            },
        ]
    },
    {
        heading: `Các dạng bài tập hay và chuyên đề luyện thi`,
        links: [
            {
                type: `Tổng hợp các dạng bài tập Hóa vô cơ ôn thi THPTQG`,
                link: `https://khoahoc.vietjack.com/thi-online/330-bai-tap-hoa-hoc-vo-co-on-thi-thpt-quoc-gia-co-loi-giai/11013`,
            },
            {
                type: `Tổng hợp các dạng bài tập Hữu cơ – Este, Amin, Lipid, Glucozo`,
                link: `https://vietjack.com/hoa-hoc-lop-12/este-lipit.jsp`,
            },
            {
                type: `Chuyên đề tổng hợp phương pháp giải nhanh bài toán nhận biết, tách chất`,
                link: `https://vietjack.com/hoa-hoc-lop-10/bai-tap-nhan-biet-tach-chat-nhom-halogen.jsp`,
            },
        ]
    }
];


html = ``
box.forEach(item => {
    var { heading, links } = item;
    html += `
        <div class="box-container">
            <h2>${heading}</h2>
            <ul>
                
    `;
    links.forEach(link => {
        var { type, link } = link;
        html += `
            <li>
                <div class="link-content">${type}</div>
                <div class="separator"> - </div>
                <a class="link" href="${link}" target="_blank">Link</a>
            </li>
        `;
    });
    html += `
        </div>
    `;
});

document.querySelector('.mid-section').innerHTML = html;