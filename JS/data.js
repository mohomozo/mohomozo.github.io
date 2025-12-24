const myProjects = [
    // --- پروژه اول: پایان‌نامه کارشناسی ---
    {
        category: 'animation',
        title: 'Deformation in Shahnameh: A Morphing Study',
        dimensions: 'Thesis Project',
        material: 'Acrylic on Canvas & Digital Morphing',
        concept: `
            <div style="text-align: left; line-height: 1.6;">
                <h4 style="color: var(--accent); margin-bottom: 10px;">Undergraduate Thesis Project – Art University of Tabriz</h4>
                <p style="font-size: 1.1rem; margin-bottom: 20px;"><strong>Statement:</strong></p>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                    "This project explores the intersection of traditional Persian Miniature and digital fluidity. 
                    Rather than treating animation merely as a medium for storytelling, I utilized the <b>Morphing technique</b> 
                    as an analytical tool to discover new possibilities in <b>Deformation</b>. 
                    By transitioning between the classical motifs of the Shahnameh of Shah Tahmasp, 
                    I sought to capture the 'in-between' moments of form—where tradition meets abstraction."
                </p>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                <p style="font-size: 0.9rem; color: var(--accent);">
                    The resulting paintings are not static figures, but frozen frames of a continuous metamorphic process, 
                    bridging the gap between historical aesthetics and contemporary visual language.
                </p>
            </div>
        `,
        image: 'projects/tasvir1.jpg', 
        videoUrl: 'https://www.youtube.com/embed/8gR4G_BL9uc', // ویدیو اول
        gallery: [
            'projects/tasvir1.jpg',   // تصویر اصلی زیر ویدیو و متن
            'projects/tasvir11.jpg',  // دیتیل اول
            'projects/tasvir111.jpg'  // دیتیل دوم
        ],
        // اطلاعات فنی زیر تصویر اول در لایت‌باکس
        detailsInfo: "Medium: Acrylic on Canvas | Dimensions: 170 x 50 cm | Year: 2023"
    },

    // --- پروژه دوم: نقاشی و انیمیشن دیجیتال ---
    {
        category: 'animation',
        title: 'Digital Metamorphosis',
        dimensions: 'Digital Series',
        material: 'Digital Painting & Frame Animation',
        concept: `
            <div style="text-align: left; padding-top: 20px;">
                <p style="font-size: 1.05rem; color: rgba(255,255,255,0.9);">
                    <b>Exploration of fluid pixels:</b> This work focuses on the organic evolution of form in a digital environment, 
                    where the animation acts as the soul of the static painting.
                </p>
            </div>
        `,
        image: 'projects/tasvir2.jpg',
        videoUrl: 'https://www.youtube.com/embed/NFKwnTPaU8A', // ویدیو دوم
        gallery: [
            'projects/tasvir2.jpg'
        ],
        detailsInfo: "Medium: Digital Painting | Dimensions: 4000 x 8000 Pixels | Year: 2023"
    }
];
