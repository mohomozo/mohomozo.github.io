window.myProjects = [
    // ===== PAINTING (8 کار) =====
    {
        id: 1,
        category: 'painting',
        title: 'Painting 1',
        image: 'projects/painting1.jpg',
        year: 2023,
        concept: 'Short note about why you painted this.',
        fullConcept: 'اینجا مفصل توضیح می‌دهی در این کار به چه چیزی فکر می‌کردی، چه چیزی را می‌خواستی جست‌وجو کنی و ربطش به بقیه بدنه کارت چیست.',
        dimensions: '100 × 150 cm',
        material: 'Acrylic on canvas',
        type: 'single'
    },
    {
        id: 2,
        category: 'painting',
        title: 'Painting 2',
        image: 'projects/painting2.jpg',
        year: 2023,
        concept: 'Short concept.',
        fullConcept: 'متن کامل درباره ایده نقاشی دوم.',
        dimensions: '80 × 120 cm',
        material: 'Oil on canvas',
        type: 'single'
    },
    {
        id: 3,
        category: 'painting',
        title: 'Painting 3',
        image: 'projects/painting3.jpg',
        year: 2022,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۳.',
        dimensions: '90 × 140 cm',
        material: 'Acrylic on canvas',
        type: 'single'
    },
    {
        id: 4,
        category: 'painting',
        title: 'Painting 4',
        image: 'projects/painting4.jpg',
        year: 2022,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۴.',
        dimensions: '70 × 100 cm',
        material: 'Acrylic on canvas',
        type: 'single'
    },
    {
        id: 5,
        category: 'painting',
        title: 'Painting 5',
        image: 'projects/painting5.jpg',
        year: 2021,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۵.',
        dimensions: '60 × 80 cm',
        material: 'Mixed media',
        type: 'single'
    },
    {
        id: 6,
        category: 'painting',
        title: 'Painting 6',
        image: 'projects/painting6.jpg',
        year: 2021,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۶.',
        dimensions: '100 × 100 cm',
        material: 'Oil on canvas',
        type: 'single'
    },
    {
        id: 7,
        category: 'painting',
        title: 'Painting 7',
        image: 'projects/painting7.jpg',
        year: 2020,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۷.',
        dimensions: '50 × 70 cm',
        material: 'Acrylic on canvas',
        type: 'single'
    },
    {
        id: 8,
        category: 'painting',
        title: 'Painting 8',
        image: 'projects/painting8.jpg',
        year: 2020,
        concept: 'Short concept.',
        fullConcept: 'متن کامل برای نقاشی ۸.',
        dimensions: '50 × 60 cm',
        material: 'Acrylic on canvas',
        type: 'single'
    },

    // ===== ILLUSTRATION (تک کارها) =====
    {
        id: 101,
        category: 'illustration',
        title: 'Illustration 1',
        image: 'projects/illustration1.jpg',
        year: 2023,
        concept: 'Short concept.',
        fullConcept: 'متن کامل تصویرسازی ۱.',
        dimensions: '3000 × 4000 px',
        material: 'Digital painting',
        type: 'single'
    },
    {
        id: 102,
        category: 'illustration',
        title: 'Book Illustration Project',
        image: 'projects/book/cover.jpg',
        year: 2024,
        concept: 'Book illustration series.',
        fullConcept: 'اینجا توضیح کلی درباره پروژه تصویرسازی کتاب می‌دهی.',
        dimensions: 'Series',
        material: 'Digital illustration',
        type: 'gallery',
        gallery: [
            { image: 'projects/book/page1.jpg', caption: 'Page 1' },
            { image: 'projects/book/page2.jpg', caption: 'Page 2' },
            { image: 'projects/book/page3.jpg', caption: 'Page 3' }
        ]
    },

    // ===== ANIMATION (۲ پروژه اصلی + ۴ لینک ساده) =====
    {
        id: 201,
        category: 'animation',
        title: 'Deformation in Shahnameh: A Morphing Study',
        image: 'projects/tasvir1.jpg',
        year: 2023,
        concept: 'Thesis project exploring deformation in Shahnameh miniatures.',
        fullConcept: '',
        type: 'full-project',
        content: [
            {
                type: 'video',
                url: 'https://www.youtube.com/embed/8gR4G_BL9uc'
            },
            {
                type: 'text',
                value: `
                <div style="margin: 40px 0; text-align: justify; border-left: 3px solid #00f2ff; padding-left: 20px;">
                    <h4 style="color: #00f2ff; font-family: sans-serif; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase;">
                        Deformation in Shahnameh: A Morphing Study
                    </h4>
                    <p style="font-size: 0.85rem; opacity: 0.6; margin-bottom: 20px;">Undergraduate Thesis Project – Art University of Tabriz</p>
                    <div style="line-height: 1.8; font-size: 1rem; color: rgba(255,255,255,0.9);">
                        این پروژه تلاقی مینیاتور کلاسیک ایرانی و سیالیت دیجیتال را بررسی می‌کند. 
                        در اینجا از تکنیک <strong>Morphing</strong> نه فقط به عنوان ابزار متحرک‌سازی، 
                        بلکه به عنوان روشی تحلیلی برای کشف امکان‌های تازه در <strong>Deformation</strong> استفاده شده است.
                    </div>
                </div>`
            },
            {
                type: 'image',
                url: 'projects/tasvir1.jpg',
                caption: 'Acrylic on canvas | 170 × 50 cm | 2023'
            },
            {
                type: 'image',
                url: 'projects/tasvir11.jpg',
                caption: 'Detail View 1'
            },
            {
                type: 'image',
                url: 'projects/tasvir111.jpg',
                caption: 'Detail View 2'
            },
            {
                type: 'spacer',
                height: '80px'
            },
            {
                type: 'video',
                url: 'https://www.youtube.com/embed/NFKwnTPaU8A'
            },
            {
                type: 'image',
                url: 'projects/tasvir2.jpg',
                caption: 'Digital painting | 4000 × 8000 px | 2023'
            }
        ]
    },
    {
        id: 202,
        category: 'animation',
        title: 'Animatore',
        image: 'projects/animatore.jpg',
        year: 2024,
        concept: 'A journey through creation and reflection.',
        fullConcept: 'در این پروژه در حال توسعه، روی روند خلق تصویر و بازتاب خودآگاه و ناخودآگاه در فرایند انیمیشن تمرکز شده است.',
        videoUrl: 'https://player.vimeo.com/video/906988251',
        type: 'simple-with-video'
    },
    {
        id: 203,
        category: 'animation',
        title: 'Short Animation 1',
        image: 'projects/short1.jpg',
        concept: 'Experimental short.',
        fullConcept: 'توضیح کوتاه درباره این انیمیشن.',
        videoUrl: 'https://player.vimeo.com/video/XXXXXXXX',
        type: 'simple'
    },
    {
        id: 204,
        category: 'animation',
        title: 'Short Animation 2',
        image: 'projects/short2.jpg',
        concept: 'Experimental short.',
        fullConcept: 'توضیح کوتاه.',
        videoUrl: 'https://player.vimeo.com/video/YYYYYYYY',
        type: 'simple'
    },

    // ===== WIP (فقط Animatore پرزنت ویژه) =====
    {
        id: 301,
        category: 'wip',
        title: 'Animatore (WIP)',
        image: 'projects/animatore-wip.jpg',
        year: 2024,
        concept: 'Work in progress.',
        fullConcept: 'توضیح مفصل درباره وضعیت فعلی پروژه Animatore، دغدغه‌ها، مسیر بعدی و آزمون و خطاهای فرمی/مفهومی.',
        videoUrl: 'https://player.vimeo.com/video/906988251',
        type: 'featured-wip'
    }
];
