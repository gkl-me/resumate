import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Terminal, Zap, Briefcase, GraduationCap, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Resumate - Local-First Developer Resume Builder",
  description:
    "Craft the ultimate developer resume with Resumate. A fast, local-first, drag-and-drop resume builder with live PDF preview and zero data collection.",
  keywords: [
    "Resumate",
    "Developer Resume Builder",
    "Dev Resume",
    "Local-first Resume Builder",
    "Free Resume Maker",
    "Live PDF Preview",
    "ATS Friendly Resume",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Abstract Background Glow */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-zinc-950">
        <div className="absolute top-0 right-0 -m-20 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -m-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold tracking-tight text-zinc-100">Resumate</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <Link href="#about" className="hover:text-zinc-100 transition-colors">About</Link>
            <Link href="#features" className="hover:text-zinc-100 transition-colors">Features</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gkl-me/resumate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link
              href="/builder"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative px-6 py-24 sm:py-32 lg:px-8 lg:py-40 flex flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex justify-center">
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm">
                Built for Developers
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8">
              Craft the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ultimate</span> Dev Resume.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
              A lightning-fast, local-first resume builder.Drag and drop sections, edit content with ease, and see a live PDF preview instantly. No sign-ups required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/builder"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all hover:scale-105 active:scale-95"
              >
                Get Your Resume
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* About / Value Prop Section */}
        <section id="about" className="py-24 sm:py-32 bg-zinc-900/30 border-y border-zinc-800/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">Why Resumate?</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built by devs, for devs.
              </p>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Stop fighting with Word documents and complex layout engines. We provide a tailored, split-screen experience: edit your content on the left, and watch the live PDF update on the right. Simple, fast, and completely free.
              </p>
            </div>
          </div>
        </section>

        {/* Features Matrix Section */}
        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-cyan-400">Everything you need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Drag, drop, and deploy your career.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:bg-zinc-800/50 transition-colors">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <Briefcase className="h-5 w-5 text-indigo-400" aria-hidden="true" />
                    </div>
                    Drag & Drop Builder
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                    <p className="flex-auto">
                      Easily add, delete, or rearrange sections like Experience, Education, and Skills. Click any block to edit its contents with rich text formatting.
                    </p>
                  </dd>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:bg-zinc-800/50 transition-colors">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <Zap className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                    </div>
                    Live PDF Preview
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                    <p className="flex-auto">
                      Watch your resume take shape in real-time. The split-screen editor shows you exactly how the final downloaded PDF will look as you type.
                    </p>
                  </dd>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:bg-zinc-800/50 transition-colors">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Terminal className="h-5 w-5 text-purple-400" aria-hidden="true" />
                    </div>
                    Local-First & Private
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                    <p className="flex-auto">
                      No sign-ups, no data harvesting. All your resume data is saved locally in your browser so you can pick up right where you left off.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative isolate overflow-hidden bg-zinc-900/80 px-6 py-24 text-center shadow-2xl sm:px-16 border-t border-zinc-800">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to compile your next opportunity?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Join thousands of developers using Resumate to get past ATS filters and land interviews at top tech companies.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/builder"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all hover:scale-105 active:scale-95"
            >
              Start Building Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-zinc-500" />
            <span className="text-sm font-semibold text-zinc-400">Resumate</span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/gkl-me/resumate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Resumate Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
