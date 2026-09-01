"use client";

import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import type { ResumeDataType } from "@/app/data/data";

interface ResumePreviewProps {
  data: ResumeDataType;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { profile, experience, skill, project, education } = data;

  return (
    <div className="w-full h-full overflow-y-auto bg-zinc-900/30 p-4 md:p-6">
      {/* Paper-like resume */}
      <div className="mx-auto max-w-[780px] bg-white text-zinc-900 shadow-2xl shadow-black/40 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 border-b-2 border-indigo-600">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 uppercase">
            {profile.name}
          </h1>

          {/* Contact Row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-zinc-600">
            {profile.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-indigo-600" />
                {profile.phone}
              </span>
            )}
            {profile.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-indigo-600" />
                {profile.email}
              </span>
            )}
            {profile.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-3 w-3 text-indigo-600" />
                {profile.linkedin}
              </span>
            )}
            {profile.github && (
              <span className="flex items-center gap-1">
                <Github className="h-3 w-3 text-indigo-600" />
                {profile.github}
              </span>
            )}
            {profile.website && (
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3 text-indigo-600" />
                {profile.website}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-indigo-600" />
                {profile.location}
              </span>
            )}
          </div>
        </div>

        <div className="px-10 pb-10 pt-6 space-y-7">
          {/* About Me */}
          {profile.aboutme && (
            <section>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                About Me
              </h2>
              <div className="h-px bg-indigo-100 mb-3" />
              <p className="text-[11px] leading-relaxed text-zinc-700">
                {profile.aboutme}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                Experience
              </h2>
              <div className="h-px bg-indigo-100 mb-3" />
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">
                          {exp.company}
                        </p>
                        <p className="text-[11px] font-semibold text-indigo-600">
                          {exp.role}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-zinc-500">
                          {exp.startDate} – {exp.endDate ?? "Present"}
                        </p>
                        {exp.place && (
                          <p className="text-[10px] text-zinc-400">{exp.place}</p>
                        )}
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1 pl-4">
                      {exp.summary.map((point, j) => (
                        <li
                          key={j}
                          className="text-[10px] text-zinc-700 leading-relaxed list-disc"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skill.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                Skills
              </h2>
              <div className="h-px bg-indigo-100 mb-3" />
              <div className="space-y-2">
                {skill.map((s, i) => (
                  <div key={i} className="flex gap-2 text-[10px]">
                    <span className="font-bold text-zinc-800 whitespace-nowrap min-w-[80px]">
                      {s.category}:
                    </span>
                    <span className="text-zinc-600">{s.skills.join(", ")}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {project.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                Projects
              </h2>
              <div className="h-px bg-indigo-100 mb-3" />
              <div className="space-y-5">
                {project.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{p.name}</p>
                        <p className="text-[10px] text-indigo-500 mt-0.5">
                          {p.techStack.join(" · ")}
                        </p>
                      </div>
                      {p.year && (
                        <p className="text-[10px] text-zinc-500 flex-shrink-0">
                          {p.year}
                        </p>
                      )}
                    </div>
                    <ul className="mt-2 space-y-1 pl-4">
                      {p.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="text-[10px] text-zinc-700 leading-relaxed list-disc"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                Education
              </h2>
              <div className="h-px bg-indigo-100 mb-3" />
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold text-zinc-900">
                        {edu.institute}
                      </p>
                      <p className="text-[10px] text-zinc-600">{edu.degree}</p>
                      {edu.grade && (
                        <p className="text-[10px] text-indigo-500">{edu.grade}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-zinc-500">
                        {edu.startYear} – {edu.endYear ?? "Present"}
                      </p>
                      {edu.place && (
                        <p className="text-[10px] text-zinc-400">{edu.place}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
