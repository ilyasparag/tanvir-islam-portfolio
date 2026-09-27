import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="py-20 sm:py-28">
      <Container>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs text-bone-3 transition-colors hover:text-lime"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          work
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-glass-line bg-glass px-2.5 py-1 font-mono text-[10px] tracking-wider text-bone-2 uppercase">
              {project.badge}
            </span>
            <span className="font-mono text-[11px] text-bone-3">{project.period}</span>
          </div>

          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.1rem,6vw,4.2rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-bone-2">
            {project.summary}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="glass rounded-lg px-3 py-1.5 font-mono text-[11.5px] text-bone-2"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* the fresher headline: what it taught him */}
        <Reveal delay={0.08} className="mt-12">
          <div className="glass rounded-2xl border-l-2 border-l-tan p-7">
            <p className="eyebrow mb-3 !text-tan">What it taught me</p>
            <p className="max-w-[62ch] text-lg leading-relaxed text-bone">
              {project.learned}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.7fr_1fr]">
          <Reveal className="flex flex-col gap-5">
            {project.body.map((para) => (
              <p key={para.slice(0, 40)} className="max-w-[64ch] leading-relaxed text-bone-2">
                {para}
              </p>
            ))}

            {project.restricted && (
              <aside className="mt-3 rounded-xl border border-tan/30 bg-tan/10 p-5">
                <p className="eyebrow mb-2 !text-tan">On disclosure</p>
                <p className="max-w-[58ch] text-sm leading-relaxed text-bone-2">
                  {project.restricted}
                </p>
              </aside>
            )}
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-8">
            {project.contributions && (
              <div>
                <p className="eyebrow mb-4">What I did</p>
                <ul className="flex flex-col gap-3">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-bone-2">
                      <span aria-hidden="true" className="text-tan">
                        ▸
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.status && (
              <div>
                <p className="eyebrow mb-2">Status</p>
                <p className="font-mono text-sm text-bone-2">{project.status}</p>
              </div>
            )}

            {project.repoUrl && (
              <div>
                <p className="eyebrow mb-2">Source</p>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Open repo"
                  className="inline-flex items-center gap-2 font-mono text-sm text-lime underline-offset-4 transition-colors hover:underline"
                >
                  View on GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </Reveal>
        </div>

        {project.code && (
          <Reveal className="mt-14">
            <p className="eyebrow mb-4">{project.code.language} script</p>
            <div className="glass max-h-[520px] overflow-auto rounded-2xl border border-glass-line p-5">
              <pre className="font-mono text-[12px] leading-relaxed text-bone-2">
                <code>{project.code.source}</code>
              </pre>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-20 border-t border-glass-line pt-8">
          <p className="eyebrow mb-3">Next project</p>
          <Link
            href={`/work/${next.slug}`}
            className="group block max-w-[22ch] text-[clamp(1.5rem,4vw,2.5rem)] leading-tight font-bold tracking-tight transition-colors hover:text-lime"
          >
            {next.title}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </article>
  );
}
