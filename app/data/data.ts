

export interface Profile {
    name: string,
    phone: string,
    email: string,

    location?: string,

    linkedin?: string,
    github?: string,
    website?: string,

    aboutme?: string
}

export interface Experience {
    company: string,
    role: string,

    startDate: string,
    endDate?: string,

    place?: string,

    summary: string[]
}

export interface Skill {
    category: string,
    skills: string[]
}

export interface Project {
    name: string,

    highlights: string[]

    techStack: string[],

    liveLink?: string
    github?: string,

    year?: string
}

export interface Education {
    institute: string,
    degree: string,

    place?: string,

    startYear: string,
    endYear?: string,

    description?: string
    grade?: string
}


export interface ResumeDataType {
    profile: Profile,
    experience: Experience[],
    skill: Skill[],
    project: Project[],
    education: Education[]
}

export const ResumeData: ResumeDataType = {
    profile: {
        name: "Alex Morgan",
        phone: "+1 987 654 3210",
        email: "alex.morgan.dev@gmail.com",
        linkedin: "linkedin.com/in/alexmorgan",
        github: "github.com/alexmorgan",
        website: "alexmorgan.dev",
        aboutme:
            "Full Stack Developer with 4+ years of experience building scalable web applications, SaaS platforms, and RESTful APIs. Experienced in React, Next.js, Node.js, TypeScript, MongoDB, and PostgreSQL. Passionate about designing clean architectures, solving complex problems, and delivering reliable products from development to production."
    },

    experience: [
        {
            company: "TechNova Solutions",
            role: "Full Stack Developer",
            startDate: "2024",
            endDate: "Present",
            place: "Bangalore, India",
            summary: [
                "Developed and maintained scalable SaaS applications using React, Next.js, Node.js, and TypeScript.",
                "Designed and implemented RESTful APIs and backend services using Express.js and PostgreSQL.",
                "Implemented Redis caching and background job processing to improve application performance and reliability.",
                "Collaborated with designers and product teams to deliver responsive and user-friendly features.",
                "Containerized applications using Docker and managed CI/CD workflows for production deployments."
            ]
        },
        {
            company: "CodeCraft Technologies",
            role: "Junior Full Stack Developer",
            startDate: "2022",
            endDate: "2024",
            place: "Kochi, India",
            summary: [
                "Built responsive web applications using React, TypeScript, Node.js, and MongoDB.",
                "Developed authentication, role-based access control, and secure REST APIs.",
                "Integrated third-party services including payment gateways, email services, and cloud storage.",
                "Optimized database queries and API response times for high-traffic application modules.",
                "Worked closely with senior developers to design reusable components and maintain clean code."
            ]
        }
    ],

    skill: [
        {
            category: "Frontend",
            skills: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Redux Toolkit"
            ]
        },
        {
            category: "Backend",
            skills: [
                "Node.js",
                "Express.js",
                "REST APIs",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Prisma"
            ]
        },
        {
            category: "DevOps & Tools",
            skills: [
                "Docker",
                "Git",
                "GitHub Actions",
                "AWS",
                "Nginx",
                "Linux",
                "Postman"
            ]
        }
    ],

    project: [
        {
            name: "TaskFlow - Project Management SaaS",
            highlights: [
                "Built a multi-tenant project management platform supporting teams, projects, tasks, and role-based access control.",
                "Implemented real-time task updates and notifications using WebSockets.",
                "Designed REST APIs and database architecture for scalable project and workspace management.",
                "Implemented Redis-based caching and BullMQ background jobs for asynchronous processing."
            ],
            techStack: [
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Redis",
                "BullMQ"
            ],
            liveLink: "https://taskflow-demo.example.com",
            github: "https://github.com/alexmorgan/taskflow",
            year: "2025"
        },
        {
            name: "ShopSphere - E-commerce Platform",
            highlights: [
                "Developed a full-stack e-commerce platform with product catalog, shopping cart, checkout, and order management.",
                "Integrated Stripe payment processing with secure payment and order workflows.",
                "Built an admin dashboard for managing products, inventory, users, and orders.",
                "Implemented product search, filtering, coupons, wishlist, and sales analytics."
            ],
            techStack: [
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "TypeScript",
                "Stripe"
            ],
            liveLink: "https://shopsphere-demo.example.com",
            github: "https://github.com/alexmorgan/shopsphere",
            year: "2024"
        }
    ],

    education: [
        {
            institute: "National Institute of Technology",
            degree: "Bachelor of Technology in Computer Science",
            place: "Kozhikode, India",
            startYear: "2018",
            endYear: "2022"
        },
        {
            institute: "Kerala Higher Secondary School",
            degree: "Higher Secondary Education - Computer Science",
            place: "Kochi, India",
            startYear: "2016",
            endYear: "2018"
        }
    ]
};