"use client";

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "../types/resume";

// Register fonts
Font.register({
    family: "Inter",
    fonts: [
        { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuG1fAZ9hiA.woff2", fontWeight: 700 }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Inter",
        fontSize: 10,
        lineHeight: 1.5,
        color: "#1f2937",
    },
    header: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 700,
        color: "#111827",
        marginBottom: 4,
    },
    contactInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        color: "#4b5563",
        fontSize: 9,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: "#111827",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 4,
        marginBottom: 8,
        textTransform: "uppercase",
    },
    summary: {
        fontSize: 10,
    },
    itemGroup: {
        marginBottom: 10,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 700,
    },
    itemSubtitle: {
        fontSize: 10,
        fontStyle: "italic",
        color: "#4b5563",
    },
    itemDate: {
        fontSize: 9,
        color: "#6b7280",
    },
    itemDescription: {
        fontSize: 10,
        marginTop: 2,
    },
    skillsGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    skillCategory: {
        fontWeight: 700,
        marginRight: 4,
    }
});

export function ResumeDocument({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    <View style={styles.contactInfo}>
                        {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
                        {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
                        {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
                        {data.personalInfo.website && <Text>• {data.personalInfo.website}</Text>}
                        {data.personalInfo.github && <Text>• {data.personalInfo.github}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {data.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.summary}>{data.summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.itemGroup}>
                                <View style={styles.itemHeader}>
                                    <View>
                                        <Text style={styles.itemTitle}>{exp.company}</Text>
                                        <Text style={styles.itemSubtitle}>{exp.role}</Text>
                                    </View>
                                    <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                                </View>
                                {exp.description && <Text style={styles.itemDescription}>{exp.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={styles.itemGroup}>
                                <View style={styles.itemHeader}>
                                    <View>
                                        <Text style={styles.itemTitle}>{edu.institution}</Text>
                                        <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                                    </View>
                                    <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {data.skills.map((skill) => (
                            <View key={skill.id} style={{ flexDirection: "row", marginBottom: 2 }}>
                                <Text style={styles.skillCategory}>{skill.category}:</Text>
                                <Text>{skill.name}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
