export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
}

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}

export const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        website: "johndoe.com",
        github: "github.com/johndoe"
    },
    summary: "A passionate software engineer with experience in building scalable web applications. Strong understanding of modern JavaScript frameworks and cloud infrastructure.",
    experience: [
        {
            id: "exp-1",
            company: "Tech Corp",
            role: "Senior Software Engineer",
            startDate: "Jan 2020",
            endDate: "Present",
            description: "Leading the frontend team in rebuilding the core application using Next.js and Tailwind CSS. Improved performance metrics by 40% and reduced technical debt."
        },
        {
            id: "exp-2",
            company: "Startup Inc",
            role: "Software Engineer",
            startDate: "Mar 2018",
            endDate: "Dec 2019",
            description: "Developed new features for the flagship product using React and Node.js. Collaborated with design and product teams to deliver high-quality user experiences."
        }
    ],
    education: [
        {
            id: "edu-1",
            institution: "State University",
            degree: "B.S. Computer Science",
            startDate: "Aug 2014",
            endDate: "May 2018"
        }
    ],
    skills: [
        { id: "skill-1", name: "JavaScript / TypeScript", category: "Languages" },
        { id: "skill-2", name: "React / Next.js", category: "Frameworks" },
        { id: "skill-3", name: "Node.js", category: "Backend" },
        { id: "skill-4", name: "AWS / Docker", category: "Infrastructure" }
    ]
};
