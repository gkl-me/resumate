

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
        name: "John Doe",
        phone: "+1 415 555 0198",
        email: "john.doe@example.com",

        location: "San Francisco, CA, USA",

        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        website: "johndoe.dev",

        aboutme:
            "Full-Stack Developer experienced in building scalable SaaS platforms, real-time applications, and modern web systems. Skilled in TypeScript, React, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, and cloud infrastructure. Passionate about designing reliable backend systems, building intuitive user experiences, and taking products from concept to production."
    },

    experience: [
        {
            company: "Vertex Labs",
            role: "Full-Stack Software Engineer",
            startDate: "Jan 2025",
            endDate: "Present",

            place: "San Francisco, CA",

            summary: [
                "Designed and developed scalable web applications using Next.js, TypeScript, and Node.js.",
                "Built REST APIs and backend services using Express.js, PostgreSQL, and Prisma ORM.",
                "Implemented asynchronous background processing using BullMQ and Redis.",
                "Developed role-based access control and authentication systems for multi-user applications.",
                "Improved API performance through database query optimization, caching, and efficient data access patterns.",
                "Collaborated with product, design, and engineering teams to deliver features from concept to production."
            ]
        },

        {
            company: "Northstar Digital",
            role: "Software Engineer",
            startDate: "Jun 2023",
            endDate: "Dec 2024",

            place: "Remote",

            summary: [
                "Developed responsive web applications using React, TypeScript, and modern frontend architecture.",
                "Built reusable UI components and frontend systems using TailwindCSS and React.",
                "Integrated REST and HTTP APIs using Axios and RTK Query.",
                "Implemented form validation and type-safe API contracts using Zod.",
                "Optimized frontend performance through lazy loading, code splitting, and efficient state management.",
                "Worked with backend engineers to design API contracts and resolve production issues."
            ]
        }
    ],

    skill: [
        {
            category: "Backend",
            skills: [
                "Node.js",
                "Express.js",
                "REST APIs",
                "PostgreSQL",
                "MongoDB",
                "Prisma ORM",
                "Redis",
                "BullMQ"
            ]
        },

        {
            category: "Frontend",
            skills: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Redux Toolkit",
                "RTK Query",
                "TailwindCSS"
            ]
        },

        {
            category: "DevOps",
            skills: [
                "Docker",
                "Docker Compose",
                "AWS",
                "EC2",
                "Nginx",
                "PM2",
                "GitHub Actions",
                "Vercel"
            ]
        },

        {
            category: "Tools",
            skills: [
                "Git",
                "GitHub",
                "Postman",
                "Swagger",
                "Figma",
                "VS Code",
                "Linux"
            ]
        },

        {
            category: "Other Expertise",
            skills: [
                "OOP",
                "SOLID Principles",
                "Clean Architecture",
                "WebSockets",
                "Socket.io",
                "Authentication",
                "Payment Integration",
                "Agile & Scrum"
            ]
        }
    ],

    project: [
        {
            name: "TaskFlow - Multi-Tenant Project Management SaaS",

            highlights: [
                "Built a multi-tenant project management platform supporting organizations, teams, projects, and role-based permissions.",
                "Designed scalable backend APIs using Node.js, Express.js, TypeScript, and PostgreSQL.",
                "Implemented real-time task updates and notifications using Socket.io.",
                "Integrated Stripe for subscription management and recurring billing.",
                "Implemented asynchronous email and notification workflows using BullMQ and Redis.",
                "Containerized the application using Docker and deployed production workloads on AWS."
            ],

            techStack: [
                "Next.js",
                "TypeScript",
                "Express.js",
                "PostgreSQL",
                "Prisma",
                "Redis",
                "BullMQ",
                "Socket.io",
                "Stripe",
                "Docker"
            ],

            liveLink: "https://taskflow.example.com",
            github: "https://github.com/johndoe/taskflow",
            year: "2026"
        },

        {
            name: "CodeArena - Competitive Programming Platform",

            highlights: [
                "Developed an online competitive programming platform with contests, submissions, rankings, and user profiles.",
                "Implemented real-time contest updates and leaderboard synchronization using WebSockets.",
                "Built authentication using Google OAuth and JWT-based sessions.",
                "Designed a dynamic ranking system based on contest performance and historical results.",
                "Implemented pagination and optimized database queries for large leaderboard datasets."
            ],

            techStack: [
                "Next.js",
                "TypeScript",
                "Supabase",
                "PostgreSQL",
                "Socket.io",
                "TailwindCSS"
            ],

            liveLink: "https://codearena.example.com",
            github: "https://github.com/johndoe/codearena",
            year: "2025"
        },

        {
            name: "ShopSphere - E-commerce Platform",

            highlights: [
                "Built a full-stack e-commerce platform with product catalogs, shopping carts, checkout, and order management.",
                "Integrated Stripe for secure online payment processing.",
                "Developed an admin dashboard for managing products, inventory, customers, and orders.",
                "Implemented coupon, discount, wishlist, and referral systems.",
                "Built sales analytics dashboards for monitoring revenue and order trends.",
                "Deployed production workloads on AWS using Nginx and PM2."
            ],

            techStack: [
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Stripe",
                "EJS",
                "AWS",
                "Nginx"
            ],

            github: "https://github.com/johndoe/shopsphere",
            year: "2025"
        },

        {
            name: "MovieVault - Movie Discovery Platform",

            highlights: [
                "Built a movie discovery platform using external movie APIs.",
                "Implemented search, filtering, genre-based browsing, and personalized watchlists.",
                "Added server-side caching to reduce repeated API requests and improve response times.",
                "Implemented PostgreSQL persistence using Prisma ORM.",
                "Designed a responsive interface optimized for desktop, tablet, and mobile devices."
            ],

            techStack: [
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Prisma",
                "TMDB API",
                "TailwindCSS"
            ],

            liveLink: "https://movievault.example.com",
            github: "https://github.com/johndoe/movievault",
            year: "2024"
        },

        {
            name: "ConnectNow - Real-Time Chat Application",

            highlights: [
                "Built a real-time communication platform supporting one-to-one and group conversations.",
                "Implemented real-time messaging, typing indicators, online presence, and message delivery status.",
                "Used Socket.io for bidirectional communication between clients and servers.",
                "Implemented JWT authentication and protected API endpoints.",
                "Structured the application as a monorepo for scalable development and maintenance."
            ],

            techStack: [
                "React",
                "Node.js",
                "Express.js",
                "TypeScript",
                "Socket.io",
                "MongoDB",
                "Turborepo"
            ],

            github: "https://github.com/johndoe/connectnow",
            year: "2024"
        }
    ],

    education: [
        {
            institute: "University of California, Berkeley",
            degree: "B.S. in Computer Science",

            place: "Berkeley, CA, USA",

            startYear: "2020",
            endYear: "2024",

            description:
                "Coursework included data structures and algorithms, database systems, operating systems, computer networks, software engineering, and distributed systems.",

            grade: "3.7 GPA"
        },

        {
            institute: "Stanford Online",
            degree: "Professional Certificate in Cloud Application Development",

            place: "Online",

            startYear: "2024",
            endYear: "2025",

            description:
                "Focused on cloud architecture, distributed systems, containerization, APIs, application deployment, and scalable backend development.",

            grade: "Completed with Distinction"
        }
    ]
};