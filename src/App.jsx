import { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";

const NAV_ITEMS = ["hero", "about", "experience", "projects", "contact"];

const NAV_LABELS = {
  hero: "Home",
  about: "About",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};

const SKILLS = [
  "Python", "SQL", "Pandas", "Scikit-learn", "Power BI", "Tableau",
  "Matplotlib", "Seaborn", "AWS S3", "Databricks", "Snowflake",
  "BigQuery", "Apache Airflow", "Git", "Excel",
];

const STATS = [
  { number: "3+", label: "Years of experience" },
  { number: "15+", label: "Projects delivered" },
  { number: "5+", label: "BI tools mastered" },
];

const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    org: "Community Dreams Foundation · Remote",
    period: "Aug 2025 – Present",
    desc: "Analyze structured and semi-structured datasets using Python and SQL to identify business trends and performance insights. Developed and implemented data quality rules and validation frameworks, improving data accuracy by 40% and information management processes by 30%.",
    tags: ["Python", "SQL", "Data Quality", "Data Validation"],
  },
  {
    role: "M.S. in Computer Science",
    org: "Sacred Heart University · Fairfield, CT",
    period: "Jan 2024 – Aug 2025",
    desc: "Master's in Computer Science with a cumulative GPA of 3.93/4.0. Also served as a Machine Learning Research Intern (Apr–Aug 2024), building regression models to predict residential housing prices using Python (Pandas, Scikit-learn), improving prediction accuracy by 20% while maintaining 95%+ data integrity.",
    tags: ["Machine Learning", "Python", "Scikit-learn", "Pandas", "GPA: 3.93"],
  },
  {
    role: "Analytics Engineer",
    org: "Hex N Bit · India",
    period: "Jan 2022 – Dec 2023",
    desc: "Cleaned and merged e-commerce datasets from 4 disparate sources using Python, SQL, and AWS S3, reducing data errors by 30%. Built an interactive Power BI dashboard tracking real-time KPIs — replacing 10+ static Excel reports. Delivered monthly insights to client leadership, influencing Q3 marketing strategy that improved conversion rates by 18%.",
    tags: ["Python", "SQL", "AWS S3", "Power BI", "Matplotlib", "Seaborn"],
  },
  {
    role: "B.S. in Computer Science",
    org: "SRM University · Amaravathi, India",
    period: "Jun 2019 – Aug 2023",
    desc: "Bachelor's in Computer Science with a cumulative GPA of 3.4/4.0. Built a strong foundation in data structures, algorithms, databases, and software engineering principles.",
    tags: ["Academic", "Computer Science", "GPA: 3.4"],
  },
];

const PROJECTS = [
  {
    tag: "Machine Learning · Python · Scikit-learn",
    name: "Residential Housing Price Prediction",
    desc: "Built and optimized regression models to predict residential housing prices using Python (Pandas, Scikit-learn), improving prediction accuracy by 20%. Engineered features, conducted statistical analysis, and maintained 95%+ data integrity across training datasets.",
    github: "https://github.com/chandugottipati915-boop",
    thumbBg: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
    thumbAccent: "#0d9488",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    tag: "Analytics · Power BI · Python",
    name: "E-Commerce KPI Dashboard",
    desc: "Cleaned and merged datasets from 4 disparate sources using Python and AWS S3, reducing data errors by 30%. Built an interactive Power BI dashboard tracking real-time KPIs — sales, revenue, and retention — replacing 10+ static Excel reports and influencing Q3 marketing strategy to improve conversion rates by 18%.",
    github: "https://github.com/chandugottipati915-boop",
    thumbBg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    thumbAccent: "#d97706",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
      </svg>
    ),
  },
  {
    tag: "Data Quality · Python · SQL",
    name: "Data Quality Validation Framework",
    desc: "Designed and implemented data quality rules and validation frameworks to assess structured and semi-structured datasets. Improved data accuracy by 40% and streamlined information management processes by 30%, enabling reliable downstream analysis.",
    github: "https://github.com/chandugottipati915-boop",
    thumbBg: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
    thumbAccent: "#7c3aed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Nav scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) { alert("Please fill in all fields."); return; }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:chandugottipati915@gmail.com?subject=${subject}&body=${body}`;
    setFormSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* ── Nav ── */}
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="container nav-inner">
          <a href="#hero" className="nav-logo">
            <div className="nav-logo-mark">GG</div>
            <span>Gopichand Gottipati</span>
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
              >
                {NAV_LABELS[id]}
              </a>
            ))}
            <a href="#contact" className="nav-cta">Hire me</a>
          </div>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((id) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {NAV_LABELS[id]}
          </a>
        ))}
        <a href="#contact" onClick={closeMenu} style={{ color: "var(--accent)", fontWeight: 600 }}>Hire me →</a>
      </div>

      {/* ── Hero ── */}
      <section id="hero">
        <div className="container hero-inner">
          <div className="hero-badge reveal">Open to new opportunities</div>
          <h1 className="hero-title reveal reveal-delay-1">
            Hi, I'm <em>Gopichand</em> —<br />I make data work for you.
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            Data Analyst specializing in Python, SQL, and BI tools. I help teams move from scattered spreadsheets to confident, data-driven decisions.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <a href="#projects" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12l10 8 10-8"/><path d="M2 7l10 8 10-8"/>
              </svg>
              See my work
            </a>
            <a href="#contact" className="btn btn-outline">Let's connect</a>
            <a href="/resume.pdf" download className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </div>
          <div className="hero-scroll reveal">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="container">
          <p className="section-eyebrow reveal">About me</p>
          <h2 className="section-title reveal">Turning raw data into decisions that stick</h2>
          <div className="about-grid">
            <div className="about-photo reveal">
              <div className="about-photo-inner">
                <div className="about-photo-icon">GG</div>
                <p>Profile Photo</p>
                <small>Replace with your image</small>
              </div>
            </div>
            <div>
              <div className="about-stats reveal">
                {STATS.map((s) => (
                  <div key={s.label} className="stat-item">
                    <span className="stat-number">{s.number}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="about-bio reveal">
                <p>I'm a Data Analyst with a Master's in Computer Science from Sacred Heart University (GPA 3.93). I have hands-on experience across the full analytics lifecycle — from ingesting messy raw data all the way to polished dashboards that <strong>non-technical stakeholders actually use</strong>. My work spans Python, SQL, Power BI, Scikit-learn, and cloud platforms like AWS, Databricks, and Snowflake.</p>
                <p>What drives me is making data <strong>genuinely useful</strong> — not just technically correct. I focus on clear communication and storytelling so that decision-makers understand not just what happened, but what to do about it.</p>
              </div>
              <div className="reveal reveal-delay-1">
                <p className="skills-label">Core skills</p>
                <div className="skills-grid">
                  {SKILLS.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience">
        <div className="container">
          <p className="section-eyebrow reveal">Experience</p>
          <h2 className="section-title reveal">Where I've worked &amp; learned</h2>
          <p className="section-sub reveal">A timeline of roles and education that shaped how I think about data.</p>
          <div className="exp-timeline">
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.role} className={`exp-item reveal reveal-delay-${i}`}>
                <div className="exp-meta">
                  <p className="exp-period">{exp.period}</p>
                  <p className="exp-org">{exp.org}</p>
                </div>
                <div className="exp-body">
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-desc">{exp.desc}</p>
                  <div className="exp-tags">
                    {exp.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects">
        <div className="container">
          <p className="section-eyebrow reveal">Featured work</p>
          <h2 className="section-title reveal">Projects built with real data</h2>
          <p className="section-sub reveal">A selection of analytics, BI, and data engineering projects — each built to answer a real business question.</p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <article key={p.name} className={`project-card reveal reveal-delay-${i}`}>
                <div className="project-thumb" style={{ background: p.thumbBg }}>
                  <div className="thumb-icon" style={{ background: p.thumbAccent, boxShadow: `0 6px 20px ${p.thumbAccent}55` }}>{p.icon}</div>
                </div>
                <div className="project-body">
                  <p className="project-tag">{p.tag}</p>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-actions">
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      <GithubIcon /> GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="container">
          <p className="section-eyebrow reveal">Contact</p>
          <h2 className="section-title reveal">Let's work together</h2>
          <div className="contact-wrapper">
            {/* Form */}
            <div className="contact-form reveal">
              {formSuccess && (
                <div className="form-success">
                  Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
              {!formSuccess && (
                <>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Tell me about the role or project…" value={formData.message} onChange={e => setFormData(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Send message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Links */}
            <div className="contact-info reveal reveal-delay-1">
              <p className="contact-intro">
                I'm actively looking for data analyst and analytics engineer roles where clean data meets clear communication. If you're building a data team or have an opportunity in mind, I'd love to hear from you.
              </p>
              <div className="contact-links">
                <a href="https://github.com/chandugottipati915-boop" className="contact-link">
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </div>
                  <div className="contact-link-text">GitHub <small>chandugottipati915-boop</small></div>
                </a>
                <a href="https://www.linkedin.com/in/gopichand08/" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="contact-link-text">LinkedIn <small>gopichand-gottipati</small></div>
                </a>
                <a href="mailto:chandugottipati915@gmail.com" className="contact-link">
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-link-text">Email <small>chandugottipati915@gmail.com</small></div>
                </a>
                <a href="tel:+19085308636" className="contact-link">
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
                    </svg>
                  </div>
                  <div className="contact-link-text">Phone <small>+1 908 530 8636</small></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chatbot ── */}
      <Chatbot open={chatOpen} setOpen={setChatOpen} />

      {/* ── Footer ── */}
      <footer>
        <p>© {new Date().getFullYear()} <span>Gopichand Gottipati</span> · Data Analyst · United States</p>
      </footer>
    </>
  );
}
