import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Scramble from "@/components/motion/Scramble";
import Container from "@/components/ui/Container";
import { profile, education, interests, languages, experience } from "@/content/site";

// Its own description — this page and the homepage previously shared one
// string, so they were indistinguishable in search results and link previews.
export const metadata: Metadata = {
  title: "About",
  description: profile.aboutMeta,
  openGraph: {
    title: `About — ${profile.name}`,
    description: profile.aboutMeta,
  },
};

export default function About() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="eyebrow mb-3">About</p>
          <Scramble
            as="h1"
            text="Still early, already specific"
            className="block max-w-[14ch] text-[clamp(2.2rem,6.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em]"
          />
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-[1.6fr_1fr]">
          {/* Prose was hardcoded here; it lives in content/site.ts now, like
              every other fact on the site. First paragraph keeps the larger
              size it always had. */}
          <Reveal className="flex flex-col gap-5">
            {profile.about.map((para, i) => (
              <p
                key={para.slice(0, 40)}
                className={
                  i === 0
                    ? "max-w-[60ch] text-lg leading-relaxed text-bone"
                    : "max-w-[60ch] leading-relaxed text-bone-2"
                }
              >
                {para}
              </p>
            ))}
            <p className="mt-2 max-w-[60ch] font-mono text-sm leading-relaxed text-tan">
              {profile.seeking}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-9">
            <section>
              <p className="eyebrow mb-4">Experience</p>
              {experience.map((e) => (
                <div key={e.org} className="flex flex-col gap-1">
                  <span className="font-semibold text-bone">{e.role}</span>
                  <span className="font-mono text-xs text-tan">
                    {e.org} · {e.period}
                  </span>
                </div>
              ))}
            </section>

            <section>
              <p className="eyebrow mb-4">Education</p>
              <div className="flex flex-col gap-4">
                {education.map((e) => (
                  <div key={e.qualification} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-bone">{e.qualification}</span>
                    <span className="text-sm text-bone-2">{e.institution}</span>
                    <span className="font-mono text-[11px] text-bone-3">{e.period}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="eyebrow mb-4">Interests</p>
              <ul className="flex flex-col gap-2">
                {interests.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-bone-2">
                    <span aria-hidden="true" className="text-tan">
                      ▸
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="eyebrow mb-4">Languages</p>
              <div className="flex flex-col gap-2">
                {languages.map((l) => (
                  <div key={l.name} className="flex flex-col">
                    <span className="text-sm font-medium text-bone">{l.name}</span>
                    <span className="text-sm text-bone-2">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
