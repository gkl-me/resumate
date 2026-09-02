import { ResumeDataType } from "@/app/data/data";
import { Document, Page, StyleSheet, Text, View, Link } from "@react-pdf/renderer";

const s = StyleSheet.create({
  page: {
    size: "LETTER",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 36,
    paddingRight: 36,
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#000000",
    lineHeight: 1.25,
  },
  header: {
    alignItems: "center",
    textAlign: "center",
    marginBottom: 6,
  },
  nameContainer: {
    alignItems: "center",
    textAlign: "center",
    marginBottom: 3,
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  contactContainer: {
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  contactLine: {
    fontSize: 9,
    fontFamily: "Times-Roman",
    textAlign: "center",
    color: "#000000",
    lineHeight: 1.3,
  },
  separator: {
    color: "#000000",
    fontSize: 9,
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
    fontSize: 9,
  },
  section: {
    marginTop: 6,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 0.75,
    borderBottomColor: "#000000",
    paddingBottom: 1.5,
    marginBottom: 4,
  },
  entryContainer: {
    marginBottom: 4,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  entrySubHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1.5,
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
  },
  italic: {
    fontFamily: "Times-Italic",
    fontSize: 9.5,
  },
  regular: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
  },
  date: {
    fontFamily: "Times-Roman",
    fontSize: 9,
    textAlign: "right",
  },
  locationItalic: {
    fontFamily: "Times-Italic",
    fontSize: 9,
    textAlign: "right",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 12,
  },
  bulletPoint: {
    width: 10,
    fontSize: 8,
    textAlign: "left",
    marginTop: 0.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.25,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.3,
    paddingLeft: 2,
    textAlign: "justify",
  },
  skillsListContainer: {
    paddingLeft: 2,
  },
  skillRow: {
    marginBottom: 2,
  },
  skillLine: {
    fontSize: 9,
    lineHeight: 1.3,
  },
});

interface SectionProps {
  data: ResumeDataType;
}

function SectionAboutMe({ data }: SectionProps) {
  if (!data.profile.aboutme) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>About Me</Text>
      <Text style={s.paragraph}>{data.profile.aboutme}</Text>
    </View>
  );
}

function SectionExperience({ data }: SectionProps) {
  if (!data.experience || data.experience.length === 0) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>Experience</Text>
      {data.experience.map((item, index) => (
        <View key={index} style={s.entryContainer}>
          <View style={s.entryHeaderRow}>
            <Text style={s.bold}>{item.role}</Text>
            <Text style={s.date}>
              {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
            </Text>
          </View>
          <View style={s.entrySubHeaderRow}>
            <Text style={s.italic}>{item.company}</Text>
            {item.place && <Text style={s.locationItalic}>{item.place}</Text>}
          </View>
          {item.summary &&
            (Array.isArray(item.summary) ? item.summary : [item.summary]).map(
              (point, pIndex) => (
                <View key={pIndex} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{point}</Text>
                </View>
              )
            )}
        </View>
      ))}
    </View>
  );
}

function SectionSkills({ data }: SectionProps) {
  if (!data.skill || data.skill.length === 0) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>Technical Skills</Text>
      <View style={s.skillsListContainer}>
        {data.skill.map((item, index) => {
          const list = Array.isArray(item.skills)
            ? item.skills.join(", ")
            : item.skills;
          return (
            <View key={index} style={s.skillRow}>
              <Text style={s.skillLine}>
                <Text style={s.bold}>{item.category}: </Text>
                <Text style={s.regular}>{list}</Text>
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function SectionProjects({ data }: SectionProps) {
  if (!data.project || data.project.length === 0) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>Projects</Text>
      {data.project.map((item, index) => {
        const tech = Array.isArray(item.techStack)
          ? item.techStack.join(", ")
          : item.techStack;
        return (
          <View key={index} style={s.entryContainer}>
            <View style={s.entryHeaderRow}>
              <Text style={{ flex: 1 }}>
                <Text style={s.bold}>{item.name}</Text>
                {tech ? <Text style={s.italic}> | {tech}</Text> : null}
              </Text>
              {item.year && <Text style={s.date}>{item.year}</Text>}
            </View>

            {item.highlights &&
              (Array.isArray(item.highlights)
                ? item.highlights
                : [item.highlights]
              ).map((hl, hlIndex) => (
                <View key={hlIndex} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{hl}</Text>
                </View>
              ))}

            {(item.liveLink || item.github) && (
              <View style={s.bulletItem}>
                <Text style={s.bulletPoint}>•</Text>
                <Text style={s.bulletText}>
                  {item.liveLink && (
                    <Text>
                      Live:{" "}
                      <Link
                        src={
                          item.liveLink.startsWith("http")
                            ? item.liveLink
                            : `https://${item.liveLink}`
                        }
                        style={s.link}
                      >
                        {item.liveLink.replace(/^https?:\/\//, "")}
                      </Link>
                      {item.github ? "  |  " : ""}
                    </Text>
                  )}
                  {item.github && (
                    <Text>
                      GitHub:{" "}
                      <Link
                        src={
                          item.github.startsWith("http")
                            ? item.github
                            : `https://${item.github}`
                        }
                        style={s.link}
                      >
                        {item.github.replace(/^https?:\/\//, "")}
                      </Link>
                    </Text>
                  )}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function SectionEducation({ data }: SectionProps) {
  if (!data.education || data.education.length === 0) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>Education</Text>
      {data.education.map((item, index) => (
        <View key={index} style={s.entryContainer}>
          <View style={s.entryHeaderRow}>
            <Text style={s.bold}>{item.institute}</Text>
            {item.place && <Text style={s.locationItalic}>{item.place}</Text>}
          </View>
          <View style={s.entrySubHeaderRow}>
            <Text style={s.italic}>
              {item.degree}
              {item.grade ? ` – ${item.grade}` : ""}
            </Text>
            <Text style={s.date}>
              {item.startYear} {item.endYear ? `– ${item.endYear}` : ""}
            </Text>
          </View>
          {item.description && (
            <View style={s.bulletItem}>
              <Text style={s.bulletPoint}>•</Text>
              <Text style={s.bulletText}>{item.description}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const SECTION_RENDERERS: Record<string, React.ComponentType<SectionProps>> = {
  aboutme: SectionAboutMe,
  about: SectionAboutMe,
  experience: SectionExperience,
  skills: SectionSkills,
  skill: SectionSkills,
  projects: SectionProjects,
  project: SectionProjects,
  education: SectionEducation,
};

interface ResumePdfDocumentProps {
  data: ResumeDataType;
  sectionOrder?: string[];
}

export function ResumePdfDocument({
  data,
  sectionOrder = ["profile", "experience", "skill", "project", "education"],
}: ResumePdfDocumentProps) {
  // Build contact parts
  const contactParts: React.ReactNode[] = [];

  if (data.profile.phone) {
    contactParts.push(<Text key="phone">{data.profile.phone}</Text>);
  }
  if (data.profile.email) {
    contactParts.push(
      <Link key="email" src={`mailto:${data.profile.email}`} style={s.link}>
        {data.profile.email}
      </Link>
    );
  }
  if (data.profile.location) {
    contactParts.push(<Text key="loc">{data.profile.location}</Text>);
  }
  if (data.profile.linkedin) {
    const href = data.profile.linkedin.startsWith("http")
      ? data.profile.linkedin
      : `https://${data.profile.linkedin}`;
    contactParts.push(
      <Link key="linkedin" src={href} style={s.link}>
        {data.profile.linkedin.replace(/^https?:\/\//, "")}
      </Link>
    );
  }
  if (data.profile.github) {
    const href = data.profile.github.startsWith("http")
      ? data.profile.github
      : `https://${data.profile.github}`;
    contactParts.push(
      <Link key="github" src={href} style={s.link}>
        {data.profile.github.replace(/^https?:\/\//, "")}
      </Link>
    );
  }
  if (data.profile.website) {
    const href = data.profile.website.startsWith("http")
      ? data.profile.website
      : `https://${data.profile.website}`;
    contactParts.push(
      <Link key="website" src={href} style={s.link}>
        {data.profile.website.replace(/^https?:\/\//, "")}
      </Link>
    );
  }

  return (
    <Document
      title={`${data.profile.name || "Resume"} - Resume`}
      author={data.profile.name || "Resume"}
    >
      <Page size="LETTER" style={s.page}>
        {/* Heading / Contact */}
        <View style={s.header}>
          <View style={s.nameContainer}>
            <Text style={s.name}>{data.profile.name}</Text>
          </View>
          <View style={s.contactContainer}>
            <Text style={s.contactLine}>
              {contactParts.map((item, index) => (
                <Text key={index}>
                  {item}
                  {index < contactParts.length - 1 ? (
                    <Text style={s.separator}> | </Text>
                  ) : null}
                </Text>
              ))}
            </Text>
          </View>
        </View>

        {/* About Me */}
        {data.profile.aboutme && <SectionAboutMe data={data} />}

        {/* Ordered Sections */}
        {sectionOrder
          .filter((id) => id !== "profile" && id !== "aboutme" && id !== "about")
          .map((id) => {
            const Renderer = SECTION_RENDERERS[id];
            return Renderer ? <Renderer key={id} data={data} /> : null;
          })}
      </Page>
    </Document>
  );
}

// Retain alias for backward compatibility
export const ResumePdfDocumnet = ResumePdfDocument;