import { ResumeDataType } from "@/app/data/data";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";


const s = StyleSheet.create({
    page: {

    }
})

interface SectionProps {
    data: ResumeDataType
}

function SectionExperience({ data }: SectionProps) {
    return (
        <View>
            <Text>Experience</Text>
            <View />
            {data.experience.map((item, index) => (
                <View key={index}>
                    <Text>{item.company}</Text>
                    <Text>{item.company}</Text>
                    <Text>{item.startDate} - {item.endDate}</Text>
                    <Text>{item.summary}</Text>
                </View>
            ))}
        </View>
    )
}

function SectionSkills({ data }: SectionProps) {
    return (
        <View>
            <Text>Skills</Text>
            <View />
            {data.skill.map((item, index) => (
                <View key={index}>
                    <Text>{item.category}</Text>
                    <Text>{item.skills.join(", ")}</Text>
                </View>
            ))}
        </View>
    )
}

function SectionProjects({ data }: SectionProps) {
    return (
        <View>
            <Text>Projects</Text>
            <View />
            {data.project.map((item, index) => (
                <View key={index}>
                    <Text>{item.name}</Text>
                    <Text>{item.techStack}</Text>
                    <Text>{item.year} </Text>
                    <Text>{item.highlights}</Text>
                </View>
            ))}
        </View>
    )
}

function SectionEducation({ data }: SectionProps) {
    return (
        <View>
            <Text>Education</Text>
            <View />
            {data.education.map((item, index) => (
                <View key={index}>
                    <Text>{item.institute}</Text>
                    <Text>{item.degree}</Text>
                    <Text>{item.startYear} - {item.endYear}</Text>
                    <Text>{item.description}</Text>
                </View>
            ))}
        </View>
    )
}

const SECTION_RENDERERS: Record<string, React.ComponentType<SectionProps>> = {
    experience: SectionExperience,
    skills: SectionSkills,
    projects: SectionProjects,
    education: SectionEducation
}

interface ResumePdfDocumentProps {
    data: ResumeDataType,
    sectionOrder?: string[]
}

export function ResumePdfDocumnet(
    {
        data,
        sectionOrder = ["profile", "experience", "skill", "project", "education"]
    }: ResumePdfDocumentProps
) {

    return (
        <Document title={`${data.profile.name} - Resume`} author={data.profile.name}>
            <Page size={"A4"} style={s.page}>

                {/* profile header is always first */}
                <Text>{data.profile.name}</Text>
                <View>
                    {data.profile.phone && <Text>{data.profile.phone}</Text>}
                    {data.profile.email && <Text>{data.profile.email}</Text>}
                    {data.profile.linkedin && <Text>{data.profile.linkedin}</Text>}
                    {data.profile.github && <Text>{data.profile.github}</Text>}
                    {data.profile.website && <Text>{data.profile.website}</Text>}
                    {data.profile.location && <Text>{data.profile.location}</Text>}
                </View>

                {data.profile.aboutme && (
                    <View>
                        <Text>About Me</Text>
                        <View />
                        <Text>{data.profile.aboutme}</Text>
                    </View>
                )}

                {
                    sectionOrder.filter((id) => id !== "profile").map((id) => {
                        const Renderer = SECTION_RENDERERS[id]
                        return Renderer ? <Renderer key={id} data={data} /> : null
                    })
                }

            </Page>
        </Document>
    )
}