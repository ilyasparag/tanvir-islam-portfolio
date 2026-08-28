import { profile } from "@/content/site";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Section";

const CHANNELS = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "phone", value: profile.phone, href: "tel:+8801740640605" },
  { label: "github", value: "github.com/islamtanvir42", href: profile.links.github },
  { label: "linkedin", value: "/in/tanvir-islam", href: profile.links.linkedin },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="pt-20 pb-10 sm:pt-28">
      <Container>
        {/* same marker and same decode as every other section — this one was
            the odd one out, static and differently labelled */}
        <SectionHead
          index="04"
          label="Contact"
          title="Let's build something together"
          subtitle={`${profile.seeking} If that sounds like a fit, or you just want to talk about databases, my inbox is open.`}
        />

        <Reveal>
          <Button href={`mailto:${profile.email}`}>{profile.email}</Button>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-glass-line bg-glass-line sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <div key={c.label} className="bg-void/60 p-5 backdrop-blur-xl">
                <dt className="eyebrow mb-1.5">{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono text-[12.5px] break-all text-bone-2 transition-colors hover:text-lime"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-glass-line pt-6">
          <p className="font-mono text-[11px] text-bone-3">
            © {new Date().getFullYear()} {profile.name} · Dhaka, Bangladesh
          </p>
          <p className="font-mono text-[11px] text-bone-3">
            References available on request
          </p>
        </div>
      </Container>
    </footer>
  );
}
