import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// ✅ Preview-safe version (no shadcn, no @/ alias, no recharts)
// Works in simple React preview environments.

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "Data Lakehouse Implementation (Databricks)",
    tag: "Databricks · Delta Lake · Medallion Architecture",
    description:
      "Designed and implemented a scalable data lakehouse using Databricks and Delta Lake following the Medallion architecture.",
    bullets: [
      "Built end-to-end ETL pipelines using PySpark and SQL (Bronze → Silver → Gold)",
      "Optimized Spark jobs through partitioning and performance tuning",
      "Delivered analytics-ready datasets for business reporting",
    ],
  },
  {
    title: "End-to-End ETL Pipeline for Sales Analytics",
    tag: "Airflow · SQL · Data Warehousing",
    description:
      "Designed an automated ETL pipeline to ingest raw sales data into relational databases.",
    bullets: [
      "Automated ingestion workflows using Apache Airflow DAGs",
      "Built SQL-based data models for revenue trend analysis",
      "Enabled KPI reporting for monthly sales performance",
    ],
  },
  {
    title: "Customer Churn Analysis",
    tag: "Machine Learning · Python · Tableau",
    description:
      "Performed telecom churn analysis to identify drivers of customer attrition.",
    bullets: [
      "Conducted EDA and feature engineering using Python",
      "Improved retention insights reducing churn risk by 15%",
      "Visualized insights using Tableau dashboards",
    ],
  },
];

const skills = [
  { group: "Languages", items: ["Python (Pandas, NumPy, Scikit-learn)", "SQL", "PySpark", "C++", "Bash"] },
  { group: "Data Engineering", items: ["ETL/ELT", "Apache Airflow", "Databricks (Medallion)", "Apache Spark", "Delta Lake", "Snowflake"] },
  { group: "Cloud & Storage", items: ["AWS", "Azure", "MS SQL", "MySQL", "PostgreSQL", "Data Warehousing"] },
  { group: "Analytics & Tools", items: ["Machine Learning", "EDA", "Feature Engineering", "Tableau", "Power BI", "Git", "Linux"] },
];

const bars = [
  { name: "Python", level: 85 },
  { name: "SQL", level: 80 },
  { name: "Databricks", level: 70 },
  { name: "Airflow", level: 65 },
  { name: "Power BI", level: 75 },
];

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function Card({ className, children }) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-orange-500/25 bg-zinc-950/60 p-6 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

function Button({ variant = "solid", className, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-orange-500/60";
  const solid =
    "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700";
  const outline =
    "border border-orange-500/30 bg-black/20 text-white hover:bg-orange-600/15";
  return (
    <button
      className={cx(base, variant === "outline" ? outline : solid, className)}
      {...props}
    />
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          {kicker ? (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {kicker}
            </div>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Anchor({ href, children }) {
  return (
    <a
      href={href}
      className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
    >
      {children}
    </a>
  );
}

export default function Website() {
  const [active, setActive] = useState("home");
  const [topic, setTopic] = useState("data-engineering");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const heroLine = useMemo(() => {
    const map = {
      "data-engineering": {
        headline: "Building Scalable Data Engineering Solutions.",
        sub:
          "Data Engineer experienced in ETL pipelines, Apache Airflow automation, and Medallion Architecture using Databricks & Delta Lake.",
      },
      portfolio: {
        headline: "Show your work. Get hired.",
        sub:
          "A crisp portfolio layout with projects, skills, and a contact section that looks great on mobile.",
      },
      startup: {
        headline: "Launch a landing page today.",
        sub: "Hero + proof + CTA, with a clean black & orange theme.",
      },
    };
    return map[topic] ?? map["data-engineering"];
  }, [topic]);

  React.useEffect(() => {
    const ids = nav.map((n) => n.id);
    const handler = () => {
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
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Submitted! Hook this form to EmailJS/Formspree or your backend.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-orange-500/40 bg-orange-500/15 shadow-sm">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">GOPICHAND GOTTIPATI</div>
              <div className="text-xs text-white/90">Data Engineer Portfolio</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={cx(
                  "rounded-lg px-3 py-2 text-sm transition hover:bg-orange-600/15",
                  active === n.id ? "bg-white/5" : ""
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:block">
              <Button variant="outline">Contact</Button>
            </a>
            <a href="#projects">
              <Button>View Projects</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
               
              </div>

              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                {heroLine.headline}
              </h1>
              <p className="mt-4 max-w-prose text-base text-white/90 md:text-lg">
                {heroLine.sub}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact">
                  <Button>Let’s talk</Button>
                </a>
                <a href="#skills">
                  <Button variant="outline">See Skills</Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Skills Snapshot</div>
                    
                  </div>
                  <Chip>2026</Chip>
                </div>

                <div className="space-y-3">
                  {bars.map((b) => (
                    <div key={b.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">{b.name}</span>
                        <span className="text-white/70">{b.level}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-700"
                          style={{ width: `${b.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

             
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" kicker="A short story section">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <div className="text-lg font-semibold">About Me</div>
            
            <div className="mt-4 space-y-3 text-sm text-white/90">
              <p>
                Data Engineer specializing in building scalable ETL pipelines and automated data workflows using Apache Airflow, Databricks, and Delta Lake. Experienced in Medallion Architecture, cloud platforms (AWS & Azure), and transforming raw data into analytics-ready solutions. Passionate about designing reliable data systems that drive data-driven decision making.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold">Quick links</div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div>
                GitHub: <Anchor href="https://github.com/chandugottipati915-boop">github.com/gopichand</Anchor>
              </div>
              <div>
                LinkedIn: <Anchor href="https://www.linkedin.com/in/gopichand-gottipati-987a02229/">linkedin.com/in/gopichand</Anchor>
              </div>
              <div>
                Email: <Anchor href="mailto:chandugottipati@gmail.com">chandugottipati@gmail.com</Anchor>
              </div>
             
            </div>
          </Card>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" kicker="Selected work">
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full hover:border-orange-500/40 hover:bg-zinc-950/80">
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-xs text-white/80">{p.tag}</div>
                <p className="mt-3 text-sm text-white/90">{p.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" kicker="What I use">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <div className="text-lg font-semibold">Skill groups</div>
            <div className="mt-1 text-sm text-white/85">
              Keep it readable and ATS-friendly.
            </div>

            <div className="mt-4 space-y-4">
              {skills.map((s) => (
                <div key={s.group} className="space-y-2">
                  <div className="text-sm font-medium text-white/95">{s.group}</div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Chip key={it}>{it}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" kicker="Let’s connect">
        <div className="grid gap-6 md:grid-cols-2">
          

          <Card>
            <div className="text-lg font-semibold">Direct</div>
            

            <div className="mt-4 space-y-3 text-sm text-white/90">
              <div>
                Email: <Anchor href="mailto:chandugottipati@gmail.com">chandugottipati@gmail.com</Anchor>
              </div>
              <div>
                LinkedIn: <Anchor href="https://www.linkedin.com/in/gopichand-gottipati-987a02229/">linkedin.com/in/gopichand</Anchor>
              </div>
              <div>
                GitHub: <Anchor href="https://github.com/chandugottipati915-boop">github.com/gopichand</Anchor>
              </div>

            </div>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/85">
            © {new Date().getFullYear()} GOPICHAND GOTTIPATI — Built with React
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-white/85 hover:text-white">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}