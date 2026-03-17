import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, Code2, BarChart3, User2 } from "lucide-react";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "Customer Churn Analysis",
    category: "Analytics Project",
    description:
      "Analyzed telecom customer behavior to identify churn drivers and support retention-focused decision making.",
    bullets: [
      "Explored structured datasets using Python and SQL",
      "Identified patterns contributing to customer attrition",
      "Built dashboards to communicate churn trends and business insights",
    ],
  },
  {
    title: "Sales Performance Dashboard",
    category: "BI Dashboard",
    description:
      "Created an interactive reporting dashboard to track revenue, customer behavior, and business KPIs.",
    bullets: [
      "Built KPI-focused visuals in Power BI/Tableau",
      "Tracked sales growth, product performance, and customer trends",
      "Turned raw business data into actionable reporting views",
    ],
  },
  {
    title: "Automated Data Pipeline",
    category: "ETL Workflow",
    description:
      "Designed an analytics pipeline for ingesting, transforming, and preparing data for downstream reporting.",
    bullets: [
      "Used Python and SQL for transformation logic",
      "Automated workflows with Apache Airflow",
      "Prepared clean datasets for reporting and analysis",
    ],
  },
];

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    items: ["Python", "SQL", "PySpark", "Bash", "C++"],
  },
  {
    title: "Analytics & BI",
    icon: BarChart3,
    items: ["Power BI", "Tableau", "Looker", "Excel", "Statistical Analysis"],
  },
  {
    title: "Data Platforms",
    icon: Briefcase,
    items: ["Databricks", "Snowflake", "Redshift", "BigQuery", "MS SQL Server"],
  },
  {
    title: "Workflow & Tools",
    icon: User2,
    items: ["Apache Airflow", "Git", "GitHub", "Linux", "AWS", "Google Cloud"],
  },
];

const highlights = [
  "Python & SQL for analysis and reporting",
  "Dashboard development in Power BI and Tableau",
  "ETL, data cleaning, and transformation",
  "Experience with cloud and modern data platforms",
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">
      {children}
    </span>
  );
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          {eyebrow ? <div className="mb-3 text-sm font-medium text-cyan-300">{eyebrow}</div> : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({ className, children }) {
  return (
    <div className={cx("rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur", className)}>
      {children}
    </div>
  );
}

function LinkButton({ href, children, primary }) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition",
        primary
          ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      )}
    >
      {children}
    </a>
  );
}

export default function PortfolioRedesign() {
  const [active, setActive] = useState("home");

  const stats = useMemo(
    () => [
      { label: "Core Focus", value: "Data Analysis" },
      { label: "Top Tools", value: "Python · SQL" },
      { label: "Dashboards", value: "Power BI · Tableau" },
    ],
    []
  );

  useEffect(() => {
    const ids = nav.map((item) => item.id);
    const onScroll = () => {
      const y = window.scrollY;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y + 140 >= top) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-slate-950">
              GG
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">GOPICHAND GOTTIPATI</div>
              <div className="text-xs text-slate-400">Data Analyst Portfolio</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cx(
                  "rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white",
                  active === item.id && "bg-white/8 text-white"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <LinkButton href="#contact" primary>
            Contact Me
          </LinkButton>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Pill>Open to Data Analyst Opportunities</Pill>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              I build clear, business-ready insights from messy data.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Data Analyst with hands-on experience in Python, SQL, dashboards, ETL workflows, and data quality improvement. I enjoy transforming raw datasets into reports, visuals, and insights that help teams make better decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#projects" primary>
                View Projects
              </LinkButton>
              <LinkButton href="#skills">Explore Skills</LinkButton>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <Card key={item.label} className="rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-white">{item.value}</div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
            <Card className="relative overflow-hidden rounded-[28px] border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="text-sm font-medium text-cyan-300">Profile Snapshot</div>
              <div className="mt-4 text-2xl font-semibold">Data Analyst</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Strong foundation in reporting, dashboarding, SQL querying, data transformation, and business insight generation across analytics-focused projects.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-sm font-medium text-white">What I bring</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>• Data cleaning, transformation, and validation</li>
                  <li>• Business reporting with strong data storytelling</li>
                  <li>• Practical experience with modern data tools</li>
                  <li>• A balance of technical skills and communication</li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Section
        id="about"
        eyebrow="About Me"
        title="About Me"
        subtitle=""
      >
        <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <div className="text-xl font-semibold">Who I am</div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300 md:text-base">
              <p>
                I am a Data Analyst with experience working on structured and semi-structured datasets using Python and SQL. My work includes data cleaning, transformation, validation, exploratory analysis, and building dashboards that support decision-making.
              </p>
              <p>
                I also have exposure to ETL workflows, cloud data platforms, and tools such as Databricks, Snowflake, Redshift, BigQuery, AWS, and Google Cloud. I enjoy making data more reliable, understandable, and useful for real business needs.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-xl font-semibold">Quick Info</div>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-300" />
                <span>New Jersey, USA</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-300" />
                <a href="mailto:chandugottipati915@gmail.com" className="hover:text-white">
                  chandugottipati915@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-cyan-300" />
                <a href="tel:+19085308636" className="hover:text-white">
                  +1 9085308636
                </a>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="mt-0.5 h-4 w-4 text-cyan-300" />
                <a href="https://github.com/chandugottipati915-boop" className="hover:text-white">github.com/chandugottipati915-boop</a>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Featured Work"
        title="Projects that show applied data skills"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Card className="h-full rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">{project.category}</div>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Skills"
        title="Organized by capability, not just a long list"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <Card key={group.title} className="rounded-[28px]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{group.title}</div>
                    <div className="text-sm text-slate-400">Core tools and technologies</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let’s connect"
        subtitle="A simple closing section with cleaner spacing and stronger call-to-action."
      >
        <Card className="rounded-[32px] bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-fuchsia-500/10 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white md:text-3xl">Interested in data analyst opportunities?</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                I’m actively looking for opportunities where I can contribute through data analysis, dashboard development, reporting, and data-driven problem solving.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-200">
              <a href="mailto:chandugottipati915@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 hover:bg-slate-900">
                <Mail className="h-4 w-4 text-cyan-300" />
                chandugottipati915@gmail.com
              </a>
              <a href="tel:+19085308636" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 hover:bg-slate-900">
                <Phone className="h-4 w-4 text-cyan-300" />
                +1 9085308636
              </a>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Gopichand Gottipati</div>
          <div className="flex flex-wrap gap-4">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}