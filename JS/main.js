// --- دیتابیس اطلاعات ---
// اطلاعات هر نقطه را اینجا تغییر دهید
const data = {
    'center': {
        title: "هسته مرکزی",
        desc: "توضیحات اصلی یا بیوگرافی شما در اینجا قرار می‌گیرد.",
        image: "https://via.placeholder.com/300x200/003300/00ff88?text=CORE"
    },
    'project1': {
        title: "پروژه شماره یک",
        desc: "توضیحات مربوط به پروژه نقطه پایین چپ.",
        image: "https://via.placeholder.com/300x200/001133/00aaff?text=Project+1"
    },
    'project2': {
        title: "پروژه شماره دو",
        desc: "توضیحات مربوط به پروژه نقطه بالا چپ.",
        image: "https://via.placeholder.com/300x200/330000/ff2a2a?text=Project+2"
    },
    'project3': {
        title: "پروژه شماره سه",
        desc: "توضیحات مربوط به پروژه نقطه بالا راست.",
        image: "https://via.placeholder.com/300x200/333300/ffff00?text=Project+3"
    }
};

// انتخاب المنت‌ها
const panelLeft = document.getElementById('panel-left');
const panelRight = document.getElementById('panel-right');
const titleEl = document.getElementById('content-title');
const descEl = document.getElementById('content-desc');
const mediaEl = document.getElementById('content-media');
const nodes = document.querySelectorAll('.node');

// تابع نمایش اطلاعات
window.showInfo = function(key) {
    // گرفتن اطلاعات
    const info = data[key];
    if (!info) return;

    // آپدیت متن و تصویر
    titleEl.textContent = info.title;
    descEl.textContent = info.desc;
    mediaEl.innerHTML = `<img src="${info.image}" alt="${info.title}">`;

    // نمایش پنل‌ها
    panelLeft.classList.add('visible');
    panelRight.classList.add('visible');
    
    // مدیریت کلاس active برای دایره‌ها
    nodes.forEach(n => n.classList.remove('active'));
}

// تابع بستن پنل‌ها
window.closePanels = function() {
    panelLeft.classList.remove('visible');
    panelRight.classList.remove('visible');
    nodes.forEach(n => n.classList.remove('active'));
}

// اضافه کردن ایونت لیسنر برای روشن ماندن دایره انتخاب شده
nodes.forEach(node => {
    node.addEventListener('click', function() {
        nodes.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
    });
});
