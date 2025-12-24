window.myProjects = [
    {
        category: 'animation',
        title: 'The Evolution of Form: From Miniature to Motion',
        dimensions: 'Complete Project Series',
        material: 'Mixed Media, Animation & Digital Painting',
        image: 'projects/tasvir1.jpg', 
        
        isFullProject: true, 
        content: [
            // ویدیو اول
            { type: 'video', url: 'https://www.youtube.com/embed/8gR4G_BL9uc' },
            
            // استیتمنت کامل شما
            { type: 'text', value: `
                <div style="margin: 40px 0; text-align: justify; border-left: 2px solid var(--accent); padding-left: 20px;">
                    <h4 style="color: var(--accent); font-family: 'Syncopate'; letter-spacing: 2px;">Deformation in Shahnameh: A Morphing Study</h4>
                    <p style="font-size: 0.85rem; opacity: 0.6; margin-bottom: 20px;">(Undergraduate Thesis Project – Art University of Tabriz)</p>
                    
                    <p style="line-height: 1.9; font-size: 1.05rem; color: rgba(255,255,255,0.9);">
                        <strong>Statement:</strong><br>
                        "This project explores the intersection of traditional Persian Miniature and digital fluidity. 
                        Rather than treating animation merely as a medium for storytelling, I utilized the <strong>Morphing technique</strong> 
                        as an analytical tool to discover new possibilities in <strong>Deformation</strong>. 
                        By transitioning between the classical motifs of the Shahnameh of Shah Tahmasp, 
                        I sought to capture the 'in-between' moments of form—where tradition meets abstraction. 
                        The resulting paintings are not static figures, but frozen frames of a continuous metamorphic process, 
                        bridging the gap between historical aesthetics and contemporary visual language."
                    </p>
                </div>` 
            },
            
            // تصاویر پروژه اول
            { type: 'image', url: 'projects/tasvir1.jpg', caption: 'Medium: Acrylic on canvas | Dimension: 170*50 cm | 2023' },
            { type: 'image', url: 'projects/tasvir11.jpg' },
            { type: 'image', url: 'projects/tasvir111.jpg' },
            
            // فاصله جداکننده
            { type: 'spacer', height: '100px' }, 
            
            // ویدیو دوم (دیجیتال)
            { type: 'video', url: 'https://www.youtube.com/embed/NFKwnTPaU8A' },
            
            // تصویر پروژه دوم
            { type: 'image', url: 'projects/tasvir2.jpg', caption: 'Medium: digital painting | Dimension: 4000*8000 pixels | 2023' }
        ]
    },
    // بازگرداندن کارهای قدیمی
    {
        category: 'video',
        title: 'Visual Journey I',
        image: 'https://vumbnail.com/906983541.jpg',
        videoUrl: 'https://player.vimeo.com/video/906983541',
        concept: 'Experimental visual exploration.'
    },
    {
        category: 'work',
        title: 'Animatore (WIP)',
        image: 'https://vumbnail.com/906988251.jpg',
        videoUrl: 'https://player.vimeo.com/video/906988251',
        concept: 'A journey through creation and reflection.'
    }
];
