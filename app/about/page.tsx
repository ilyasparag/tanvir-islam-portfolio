import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Scramble from "@/components/motion/Scramble";
import Container from "@/components/ui/Container";
import { profile, education, interests, languages, experience } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: profile.intro,
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
          <Reveal className="flex flex-col gap-5">
            <p className="max-w-[60ch] text-lg leading-relaxed text-bone">{profile.intro}</p>
            <p className="max-w-[60ch] leading-relaxed text-bone-2">
              My internship put that in a production setting, inside a bank, where an
              unmaintained record stops being a theoretical problem. You cannot patch,
              back up or plan capacity for a database nobody remembers exists.
            </p>
            <p className="max-w-[60ch] leading-relaxed text-bone-2">
              At the same time my thesis pulled me into applied machine learning —
              extracting acoustic features from voice recordings to detect laryngeal
              disease. The two look unrelated. They are not: both are questions about
              what a representation keeps and what it quietly throws away.
            </p>
            <p className="max-w-[60ch] leading-relaxed text-bone-2">
              I am most interested in where machine learning genuinely extends database
              work — anomaly detection, capacity forecasting, query behaviour — rather
              than where it is simply fashionable to bolt on.
            </p>
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
