import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  BorderStyle,
  AlignmentType,
  TabStopType,
} from "docx";
import type { ResumeDataType } from "@/app/data/data";

const RIGHT_TAB_STOP = 10800; // 12240 (letter width) - 720 - 720 (margins)
const FONT_NAME = "Times New Roman";

// Helper to create consistent section title
function createSectionTitle(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 120, after: 60, line: 240 },
    border: {
      bottom: {
        color: "000000",
        space: 2,
        style: BorderStyle.SINGLE,
        size: 6, // 6/8 pt = 0.75pt
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22, // 11pt
        font: FONT_NAME,
        color: "000000",
      }),
    ],
  });
}

// Section renderers returning Paragraph[]
function renderAboutMe(data: ResumeDataType): Paragraph[] {
  if (!data.profile.aboutme) return [];

  return [
    createSectionTitle("About Me"),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 40, after: 60, line: 260 },
      children: [
        new TextRun({
          text: data.profile.aboutme,
          size: 18, // 9pt
          font: FONT_NAME,
          color: "000000",
        }),
      ],
    }),
  ];
}

function renderExperience(data: ResumeDataType): Paragraph[] {
  if (!data.experience || data.experience.length === 0) return [];

  const paragraphs: Paragraph[] = [createSectionTitle("Experience")];

  data.experience.forEach((item) => {
    // Header row: Role (Bold, 9.5pt) | Date (Regular, 9pt)
    const dateText = `${item.startDate || ""} ${
      item.endDate ? `– ${item.endDate}` : ""
    }`.trim();

    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB_STOP }],
        spacing: { before: 80, after: 20, line: 240 },
        children: [
          new TextRun({
            text: item.role,
            bold: true,
            size: 19, // 9.5pt
            font: FONT_NAME,
            color: "000000",
          }),
          ...(dateText
            ? [
                new TextRun({
                  text: `\t${dateText}`,
                  size: 18, // 9pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
        ],
      })
    );

    // Subheader row: Company (Italic, 9.5pt) | Place (Italic, 9pt)
    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB_STOP }],
        spacing: { before: 0, after: 40, line: 240 },
        children: [
          new TextRun({
            text: item.company,
            italics: true,
            size: 19, // 9.5pt
            font: FONT_NAME,
            color: "000000",
          }),
          ...(item.place
            ? [
                new TextRun({
                  text: `\t${item.place}`,
                  italics: true,
                  size: 18, // 9pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
        ],
      })
    );

    // Bullet points
    if (item.summary) {
      const points = Array.isArray(item.summary)
        ? item.summary
        : [item.summary];
      points.forEach((point) => {
        paragraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 20, line: 250 },
            children: [
              new TextRun({
                text: point,
                size: 18, // 9pt
                font: FONT_NAME,
                color: "000000",
              }),
            ],
          })
        );
      });
    }
  });

  return paragraphs;
}

function renderSkills(data: ResumeDataType): Paragraph[] {
  if (!data.skill || data.skill.length === 0) return [];

  const paragraphs: Paragraph[] = [createSectionTitle("Technical Skills")];

  data.skill.forEach((item) => {
    const list = Array.isArray(item.skills)
      ? item.skills.join(", ")
      : item.skills;

    paragraphs.push(
      new Paragraph({
        spacing: { before: 20, after: 30, line: 250 },
        children: [
          ...(item.category
            ? [
                new TextRun({
                  text: `${item.category}: `,
                  bold: true,
                  size: 19, // 9.5pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
          new TextRun({
            text: list || "",
            size: 18, // 9pt
            font: FONT_NAME,
            color: "000000",
          }),
        ],
      })
    );
  });

  return paragraphs;
}

function renderProjects(data: ResumeDataType): Paragraph[] {
  if (!data.project || data.project.length === 0) return [];

  const paragraphs: Paragraph[] = [createSectionTitle("Projects")];

  data.project.forEach((item) => {
    const tech = Array.isArray(item.techStack)
      ? item.techStack.join(", ")
      : item.techStack;

    // Header row: Project Name (Bold, 9.5pt) | Tech (Italic, 9.5pt) | Year (Regular, 9pt)
    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB_STOP }],
        spacing: { before: 80, after: 30, line: 240 },
        children: [
          new TextRun({
            text: item.name,
            bold: true,
            size: 19, // 9.5pt
            font: FONT_NAME,
            color: "000000",
          }),
          ...(tech
            ? [
                new TextRun({
                  text: ` | ${tech}`,
                  italics: true,
                  size: 19, // 9.5pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
          ...(item.year
            ? [
                new TextRun({
                  text: `\t${item.year}`,
                  size: 18, // 9pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
        ],
      })
    );

    // Bullet points (highlights)
    if (item.highlights) {
      const hls = Array.isArray(item.highlights)
        ? item.highlights
        : [item.highlights];
      hls.forEach((hl) => {
        paragraphs.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 20, line: 250 },
            children: [
              new TextRun({
                text: hl,
                size: 18, // 9pt
                font: FONT_NAME,
                color: "000000",
              }),
            ],
          })
        );
      });
    }

    // Live Link & GitHub Bullet
    if (item.liveLink || item.github) {
      const linkChildren: (TextRun | ExternalHyperlink)[] = [];

      if (item.liveLink) {
        linkChildren.push(
          new TextRun({
            text: "Live: ",
            size: 18,
            font: FONT_NAME,
            color: "000000",
          })
        );
        const href = item.liveLink.startsWith("http")
          ? item.liveLink
          : `https://${item.liveLink}`;
        linkChildren.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: item.liveLink.replace(/^https?:\/\//, ""),
                size: 18,
                font: FONT_NAME,
                color: "000000",
                underline: {},
              }),
            ],
            link: href,
          })
        );
      }

      if (item.liveLink && item.github) {
        linkChildren.push(
          new TextRun({
            text: "  |  ",
            size: 18,
            font: FONT_NAME,
            color: "000000",
          })
        );
      }

      if (item.github) {
        linkChildren.push(
          new TextRun({
            text: "GitHub: ",
            size: 18,
            font: FONT_NAME,
            color: "000000",
          })
        );
        const href = item.github.startsWith("http")
          ? item.github
          : `https://${item.github}`;
        linkChildren.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: item.github.replace(/^https?:\/\//, ""),
                size: 18,
                font: FONT_NAME,
                color: "000000",
                underline: {},
              }),
            ],
            link: href,
          })
        );
      }

      paragraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 30, line: 250 },
          children: linkChildren,
        })
      );
    }
  });

  return paragraphs;
}

function renderEducation(data: ResumeDataType): Paragraph[] {
  if (!data.education || data.education.length === 0) return [];

  const paragraphs: Paragraph[] = [createSectionTitle("Education")];

  data.education.forEach((item) => {
    // Header row: Institute (Bold, 9.5pt) | Place (Italic, 9pt)
    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB_STOP }],
        spacing: { before: 80, after: 20, line: 240 },
        children: [
          new TextRun({
            text: item.institute,
            bold: true,
            size: 19, // 9.5pt
            font: FONT_NAME,
            color: "000000",
          }),
          ...(item.place
            ? [
                new TextRun({
                  text: `\t${item.place}`,
                  italics: true,
                  size: 18, // 9pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
        ],
      })
    );

    // Subheader row: Degree + Grade (Italic, 9.5pt) | Years (Regular, 9pt)
    const degreeText = `${item.degree || ""}${
      item.grade ? ` – ${item.grade}` : ""
    }`.trim();
    const yearsText = `${item.startYear || ""} ${
      item.endYear ? `– ${item.endYear}` : ""
    }`.trim();

    paragraphs.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB_STOP }],
        spacing: { before: 0, after: 40, line: 240 },
        children: [
          new TextRun({
            text: degreeText,
            italics: true,
            size: 19, // 9.5pt
            font: FONT_NAME,
            color: "000000",
          }),
          ...(yearsText
            ? [
                new TextRun({
                  text: `\t${yearsText}`,
                  size: 18, // 9pt
                  font: FONT_NAME,
                  color: "000000",
                }),
              ]
            : []),
        ],
      })
    );

    // Description bullet
    if (item.description) {
      paragraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 30, line: 250 },
          children: [
            new TextRun({
              text: item.description,
              size: 18, // 9pt
              font: FONT_NAME,
              color: "000000",
            }),
          ],
        })
      );
    }
  });

  return paragraphs;
}

const SECTION_MAP: Record<string, (data: ResumeDataType) => Paragraph[]> = {
  aboutme: renderAboutMe,
  about: renderAboutMe,
  experience: renderExperience,
  skills: renderSkills,
  skill: renderSkills,
  projects: renderProjects,
  project: renderProjects,
  education: renderEducation,
};

export async function generateResumeDocx(
  data: ResumeDataType,
  sectionOrder: string[] = ["profile", "experience", "skill", "project", "education"]
): Promise<Blob> {
  // Build contact items
  const contactRuns: (TextRun | ExternalHyperlink)[] = [];

  const addSeparator = () => {
    if (contactRuns.length > 0) {
      contactRuns.push(
        new TextRun({
          text: " | ",
          size: 18,
          font: FONT_NAME,
          color: "000000",
        })
      );
    }
  };

  if (data.profile.phone) {
    addSeparator();
    contactRuns.push(
      new TextRun({
        text: data.profile.phone,
        size: 18,
        font: FONT_NAME,
        color: "000000",
      })
    );
  }

  if (data.profile.email) {
    addSeparator();
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: data.profile.email,
            size: 18,
            font: FONT_NAME,
            color: "000000",
            underline: {},
          }),
        ],
        link: `mailto:${data.profile.email}`,
      })
    );
  }

  if (data.profile.location) {
    addSeparator();
    contactRuns.push(
      new TextRun({
        text: data.profile.location,
        size: 18,
        font: FONT_NAME,
        color: "000000",
      })
    );
  }

  if (data.profile.linkedin) {
    addSeparator();
    const href = data.profile.linkedin.startsWith("http")
      ? data.profile.linkedin
      : `https://${data.profile.linkedin}`;
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: data.profile.linkedin.replace(/^https?:\/\//, ""),
            size: 18,
            font: FONT_NAME,
            color: "000000",
            underline: {},
          }),
        ],
        link: href,
      })
    );
  }

  if (data.profile.github) {
    addSeparator();
    const href = data.profile.github.startsWith("http")
      ? data.profile.github
      : `https://${data.profile.github}`;
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: data.profile.github.replace(/^https?:\/\//, ""),
            size: 18,
            font: FONT_NAME,
            color: "000000",
            underline: {},
          }),
        ],
        link: href,
      })
    );
  }

  if (data.profile.website) {
    addSeparator();
    const href = data.profile.website.startsWith("http")
      ? data.profile.website
      : `https://${data.profile.website}`;
    contactRuns.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: data.profile.website.replace(/^https?:\/\//, ""),
            size: 18,
            font: FONT_NAME,
            color: "000000",
            underline: {},
          }),
        ],
        link: href,
      })
    );
  }

  // Children paragraphs collection
  const documentChildren: Paragraph[] = [
    // Header: Name (Centered, Bold, 22pt)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60, line: 240 },
      children: [
        new TextRun({
          text: data.profile.name || "Resume",
          bold: true,
          size: 44, // 22pt
          font: FONT_NAME,
          color: "000000",
        }),
      ],
    }),

    // Contact Line (Centered, 9pt)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120, line: 240 },
      children: contactRuns,
    }),
  ];

  // About Me (if present)
  if (data.profile.aboutme) {
    documentChildren.push(...renderAboutMe(data));
  }

  // Ordered sections
  const renderedSet = new Set<string>();
  const activeSections = (sectionOrder || ["profile", "experience", "skill", "project", "education"])
    .map((id) => (id === "skills" ? "skill" : id === "projects" ? "project" : id))
    .filter((id) => {
      if (id === "profile" || id === "aboutme" || id === "about") return false;
      if (renderedSet.has(id)) return false;
      renderedSet.add(id);
      return true;
    });

  activeSections.forEach((sectionId) => {
    const renderer = SECTION_MAP[sectionId];
    if (renderer) {
      documentChildren.push(...renderer(data));
    }
  });

  const doc = new Document({
    creator: data.profile.name || "Resume",
    title: `${data.profile.name || "Resume"} - Resume`,
    description: "Generated by Resumate",
    styles: {
      default: {
        document: {
          run: {
            font: FONT_NAME,
            color: "000000",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240, // Letter width (8.5 in)
              height: 15840, // Letter height (11 in)
            },
            margin: {
              top: 560, // 28pt
              bottom: 560, // 28pt
              left: 720, // 36pt
              right: 720, // 36pt
            },
          },
        },
        children: documentChildren,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
