// images
import blogImg1 from "/public/images/blog/img-1.jpg";
import blogImg2 from "/public/images/blog/img-2.jpg";
import blogImg3 from "/public/images/blog/img-3.jpg";

import blogSingleImg1 from "/public/images/blog/img-4.jpg";
import blogSingleImg2 from "/public/images/blog/img-6.jpg";
import blogSingleImg3 from "/public/images/blog/img-5.jpg";



const blogs = [ 
    {
        id: '1',
        title: 'Consulting Success is the most comprehensive learning',
        slug: 'Consulting-Success-is-the-most-comprehensive-learning',
        screens: blogImg1,
        description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
        author: 'Marilou Kelleher',
        authorTitle:'Sineor Consultant',
        create_at: 'Feb 16, 2024',
        create_day: '16',
        create_month: 'Feb',
        create_year: '2024',
        blogSingleImg:blogSingleImg1, 
        comment:'35',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Fields works with individual consult and consulting firms across',
        slug: 'Fields-works-with-individual-consult-and-consulting-firms-across',
        screens: blogImg2,
        description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
        author: 'Konal Biry',
        authorTitle:'Creative Director',
        create_at: 'March 17, 2024',
        create_day: '17',
        create_month: 'March',
        create_year: '2024',
        blogSingleImg:blogSingleImg2, 
        comment:'80',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: 'Proven advice on how to grow your consulting practice.',
        slug: 'Proven-advice-on-how-to-grow-your-consulting-practice.',
        screens: blogImg3,
        description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
        author: 'Aliza Anny',
        authorTitle:'Art Director',
        create_at: 'Jan 18, 2024',
        create_day: '18',
        create_month: 'Jan',
        create_year: '2024',
        blogSingleImg:blogSingleImg3,
        comment:'95',
        blClass:'format-video',
    },
];
export default blogs;