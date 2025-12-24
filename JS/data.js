window.myProjects = [
    // --- پروژه اصلی (ترکیبی: پایان‌نامه + کار دیجیتال) ---
    {
        category: 'animation',
        title: 'Deformation in Shahnameh: A Morphing Study',
        image: 'projects/tasvir1.jpg', // عکس کاور در صفحه اصلی
        isFullProject: true, // فعال کردن حالت اسکرولی طولانی
        content: [
            // ۱. ویدیو یوتیوب اول
            { type: 'video', url: 'https://www.youtube.com/embed/8gR4G_BL9uc' },

            // ۲. استیتمنت کامل (دقیقا همان متنی که خواستید)
            { type: 'text', value: `
                <div style="margin: 40px 0; text-align: justify; border-left: 3px solid #00f2ff; padding-left: 20px;">
                    <h4 style="color: #00f2ff; font-family: sans-serif; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase;">Deformation in Shahnameh: A Morphing Study</h4>
                    <p style="font-size: 0.85rem; opacity: 0.6; margin-bottom: 20px;">(Undergraduate Thesis Project – Art University of Tabriz)</p>
                    
                    <div style="line-height: 1.8; font-size: 1rem; color: rgba(255,255,255,0.9);">
                        <strong>Statement:</strong><br>
                        "This project explores the intersection of traditional Persian Miniature and digital fluidity. 
                        Rather than treating animation merely as a medium for storytelling, I utilized the <strong>Morphing technique</strong> 
                        as an analytical tool to discover new possibilities in <strong>Deformation</strong>. 
                        By transitioning between the classical motifs of the Shahnameh of Shah Tahmasp, 
                        I sought to capture the 'in-between' moments of form—where tradition meets abstraction. 
                        The resulting paintings are not static figures, but frozen frames of a continuous metamorphic process, 
                        bridging the gap between historical aesthetics and contemporary visual language."
                    </div>
                </div>` 
            },

            // ۳. تصویر نقاشی اصلی
            { type: 'image', url: 'projects/tasvir1.jpg', caption: 'Medium: Acrylic on canvas | Dimension: 170*50 cm | 2023' },

            // ۴. تصاویر دیتیل
            { type: 'image', url: 'projects/tasvir11.jpg', caption: 'Detail View 1' },
            { type: 'image', url: 'projects/tasvir111.jpg', caption: 'Detail View 2' },

            // ۵. فاصله انداز (برای جدا کردن دو پروژه)
            { type: 'spacer', height: '100px' },

            // ۶. ویدیو دوم (دیجیتال)
            { type: 'video', url: 'https://www.youtube.com/embed/NFKwnTPaU8A' },

            // ۷. تصویر کار دیجیتال
            { type: 'image', url: 'projects/tasvir2.jpg', caption: 'Medium: Digital Painting | Dimension: 4000*8000 pixels | 2023' }
        ]
    },

    // --- کارهای قدیمی (Vimeo) ---
    {
        category: 'video',
        title: 'Visual Journey I',
        image: 'projects/tasvir2.jpg', // موقتا از تصویر ۲ استفاده کردیم
        videoUrl: 'https://player.vimeo.com/video/906983541',
        concept: 'Experimental visual exploration.'
    },
    {
        category: 'work',
        title: 'Animatore (WIP)',
        image: 'projects/animatore.jpg', // حتما عکسی با این نام بسازید یا آدرس دیگری بدهید
        videoUrl: 'https://player.vimeo.com/video/906988251',
        concept: 'A journey through creation and reflection.'
    }
];
