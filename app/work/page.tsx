import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import Scramble from "@/components/motion/Scramble";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Database systems, a machine learning thesis, a co-authored paper, and university projects.",
};

export default function WorkIndex() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10">
          <p className="eyebrow mb-3">Work</p>
          <Scramble
            as="h1"
            text="Everything I have built"
            className="block max-w-[16ch] text-[clamp(2.2rem,6.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em]"
          />
          <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-bone-2">
            One internship project, a final-year thesis, a co-authored paper, and the
            coursework that taught me the rest. Every card says what it actually
            taught me — including the parts I got wrong first.
          </p>
        </Reveal>

        <ProjectGrid projects={projects} />
      </Container>
    </div>
  );
}
