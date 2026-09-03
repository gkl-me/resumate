"use client";

import type { ResumeDataType } from "@/app/data/data";

interface ResumePreviewProps {
  data: ResumeDataType;
  sectionOrder?: string[];
}

export default function ResumePreview({
  data,
  sectionOrder = ["profile", "experience", "skill", "project", "education"],
}: ResumePreviewProps) {
  const { profile, experience, skill, project, education } = data;

  // Build contact items
  const contactParts: { label: string; href?: string }[] = [];

  if (profile.phone) {
    contactParts.push({ label: profile.phone });
  }
  if (profile.email) {
    contactParts.push({
      label: profile.email,
      href: `mailto:${profile.email}`,
    });
  }
  if (profile.location) {
    contactParts.push({ label: profile.location });
  }
  if (profile.linkedin) {
    const href = profile.linkedin.startsWith("http")
      ? profile.linkedin
      : `https://${profile.linkedin}`;
    contactParts.push({
      label: profile.linkedin.replace(/^https?:\/\//, ""),
      href,
    });
  }
  if (profile.github) {
    const href = profile.github.startsWith("http")
      ? profile.github
      : `https://${profile.github}`;
    contactParts.push({
      label: profile.github.replace(/^https?:\/\//, ""),
      href,
    });
  }
  if (profile.website) {
    const href = profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`;
    contactParts.push({
      label: profile.website.replace(/^https?:\/\//, ""),
      href,
    });
  }

  const renderAboutMe = () => {
    if (!profile.aboutme) return null;
    return (
      <section className="mt-3">
        <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black font-serif">
          About Me
        </h2>
        <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-900 text-justify font-serif">
          {profile.aboutme}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <section className="mt-3">
        <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black font-serif">
          Experience
        </h2>
        <div className="space-y-2">
          {experience.map((exp, i) => (
            <div key={i} className="text-[11px] sm:text-xs font-serif">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-black">{exp.role}</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-900 font-normal">
                  {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ""}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-[10px] sm:text-[11px]">
                <span className="italic text-zinc-800">{exp.company}</span>
                {exp.place && (
                  <span className="italic text-zinc-700">{exp.place}</span>
                )}
              </div>
              {exp.summary && exp.summary.length > 0 && (
                <ul className="list-disc ml-5 mt-0.5 space-y-0.5 text-[10px] sm:text-[11px] leading-snug text-zinc-900">
                  {exp.summary.map((pt, j) => (
                    <li key={j} className="pl-0.5">
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!skill || skill.length === 0) return null;
    return (
      <section className="mt-3">
        <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black font-serif">
          Technical Skills
        </h2>
        <div className="text-[10px] sm:text-[11px] leading-relaxed text-zinc-900 font-serif space-y-0.5">
          {skill.map((s, i) => (
            <div key={i}>
              <span className="font-bold text-black">{s.category}: </span>
              <span>
                {Array.isArray(s.skills) ? s.skills.join(", ") : s.skills}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!project || project.length === 0) return null;
    return (
      <section className="mt-3">
        <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black font-serif">
          Projects
        </h2>
        <div className="space-y-2">
          {project.map((p, i) => (
            <div key={i} className="text-[11px] sm:text-xs font-serif">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-black">{p.name}</span>
                  {p.techStack && p.techStack.length > 0 && (
                    <span className="italic text-zinc-800">
                      {" | "}
                      {Array.isArray(p.techStack)
                        ? p.techStack.join(", ")
                        : p.techStack}
                    </span>
                  )}
                </div>
                {p.year && (
                  <span className="text-[10px] sm:text-[11px] text-zinc-900 font-normal">
                    {p.year}
                  </span>
                )}
              </div>
              {p.highlights && p.highlights.length > 0 && (
                <ul className="list-disc ml-5 mt-0.5 space-y-0.5 text-[10px] sm:text-[11px] leading-snug text-zinc-900">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="pl-0.5">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {(p.liveLink || p.github) && (
                <ul className="list-disc ml-5 text-[10px] sm:text-[11px] text-zinc-900">
                  <li className="pl-0.5">
                    {p.liveLink && (
                      <span>
                        Live:{" "}
                        <a
                          href={
                            p.liveLink.startsWith("http")
                              ? p.liveLink
                              : `https://${p.liveLink}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-indigo-600"
                        >
                          {p.liveLink.replace(/^https?:\/\//, "")}
                        </a>
                        {p.github ? " | " : ""}
                      </span>
                    )}
                    {p.github && (
                      <span>
                        GitHub:{" "}
                        <a
                          href={
                            p.github.startsWith("http")
                              ? p.github
                              : `https://${p.github}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-indigo-600"
                        >
                          {p.github.replace(/^https?:\/\//, "")}
                        </a>
                      </span>
                    )}
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <section className="mt-3">
        <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 text-black font-serif">
          Education
        </h2>
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div key={i} className="text-[11px] sm:text-xs font-serif">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-black">{edu.institute}</span>
                {edu.place && (
                  <span className="italic text-zinc-700 text-[10px] sm:text-[11px]">
                    {edu.place}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-baseline text-[10px] sm:text-[11px]">
                <span className="italic text-zinc-800">
                  {edu.degree}
                  {edu.grade ? ` – ${edu.grade}` : ""}
                </span>
                <span className="text-zinc-900 font-normal">
                  {edu.startYear} {edu.endYear ? `– ${edu.endYear}` : ""}
                </span>
              </div>
              {edu.description && (
                <ul className="list-disc ml-5 mt-0.5 text-[10px] sm:text-[11px] text-zinc-900">
                  <li className="pl-0.5">{edu.description}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const sectionMap: Record<string, () => React.ReactNode> = {
    aboutme: renderAboutMe,
    about: renderAboutMe,
    experience: renderExperience,
    skills: renderSkills,
    skill: renderSkills,
    projects: renderProjects,
    project: renderProjects,
    education: renderEducation,
  };

  return (
    <div className="w-full h-full overflow-y-auto p-2 sm:p-4 bg-zinc-900/30 custom-scrollbar">
      {/* Paper Container matching LaTeX */}
      <div
        className="mx-auto max-w-[800px] bg-white text-black shadow-2xl rounded-sm p-6 sm:p-10 my-2"
        style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
      >
        {/* Centered Heading */}
        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            {profile.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[11px] sm:text-xs text-black mt-1.5 leading-snug">
            {contactParts.map((item, index) => (
              <span key={index} className="inline-flex items-center">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-indigo-600"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < contactParts.length - 1 && (
                  <span className="mx-1 text-black font-normal">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* About Me */}
        {profile.aboutme && renderAboutMe()}

        {/* Dynamic Sections in order (normalized and deduplicated) */}
        {(() => {
          const renderedSet = new Set<string>();
          return (sectionOrder || [])
            .map((id) =>
              id === "skills" ? "skill" : id === "projects" ? "project" : id
            )
            .filter((id) => {
              if (
                id === "profile" ||
                id === "aboutme" ||
                id === "about"
              )
                return false;
              if (renderedSet.has(id)) return false;
              renderedSet.add(id);
              return true;
            })
            .map((id) => {
              const renderer = sectionMap[id];
              return renderer ? <div key={id}>{renderer()}</div> : null;
            });
        })()}
      </div>
    </div>
  );
}
