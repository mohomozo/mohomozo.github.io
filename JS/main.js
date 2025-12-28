const projectData = {
    'center': {
        title: "درباره Mohomozo",
        desc: "خوش آمدید. این یک پورتفولیو اینترکتیو است که بر اساس شبکه عصبی طراحی شده است.",
        image: "https://via.placeholder.com/300x200/222/00ff00?text=Welcome"
    },
    'p1': {
        title: "پروژه گرافیک",
        desc: "توضیحات مربوط به کارهای گرافیکی و بصری شما در این بخش قرار می‌گیرد.",
        image: "https://via.placeholder.com/300x200/111/ff0000?text=Graphic+Work"
    },
    'p2': {
        title: "توسعه وب",
        desc: "بخش کدنویسی و پروژه‌های گیت‌هاب که با کلیک روی نقطه بالایی باز می‌شود.",
        image: "https://via.placeholder.com/300x200/000/007bff?text=Web+Dev"
    },
    'p3': {
        title: "ارتباطات",
        desc: "اطلاعات تماس و لینک‌های شبکه‌های اجتماعی در این قسمت.",
        image: "https://via.placeholder.com/300x200/333/fff?text=Contact"
    }
};

function updateContent(key) {
    const data = projectData[key];
    
    // آپدیت متن با افکت
    const titleEl = document.getElementById('project-title');
    const descEl = document.getElementById('project-desc');
    const mediaEl = document.getElementById('display-media');

    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;

    setTimeout(() => {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        mediaEl.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
        
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
    }, 300);
}

// لود اولیه
window.onload = () => updateContent('center');
