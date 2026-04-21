const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Gopichand Gottipati, a Data Analyst.

About Gopichand:
- Email: chandugottipati915@gmail.com
- Phone: +1 908 530 8636
- GitHub: github.com/chandugottipati915-boop
- LinkedIn: linkedin.com/in/gopichand08

Education:
- M.S. Computer Science, Sacred Heart University, Fairfield CT (Jan 2024 – Aug 2025) — GPA 3.93/4.0
- B.S. Computer Science, SRM University, India (Jun 2019 – Aug 2023) — GPA 3.4/4.0

Work Experience:
- Data Analyst Intern, Community Dreams Foundation (Aug 2025 – Present): Python/SQL analysis, built data quality frameworks improving accuracy by 40%
- ML Research Intern, Sacred Heart University (Apr 2024 – Aug 2024): Built regression models for housing price prediction, improved accuracy by 20%
- Analytics Engineer, Hex N Bit, India (Jan 2022 – Dec 2023): Power BI dashboards, e-commerce pipeline with Python/SQL/AWS S3, reduced data errors 30%, improved conversion rates 18%

Skills: Python, SQL, Pandas, Scikit-learn, Power BI, Tableau, Matplotlib, Seaborn, AWS S3, Databricks, Snowflake, BigQuery, Apache Airflow, Git, Excel

Projects:
1. Residential Housing Price Prediction — regression models with Scikit-learn, 20% accuracy improvement
2. E-Commerce KPI Dashboard — Power BI dashboard replacing 10+ Excel reports, real-time KPI tracking
3. Data Quality Validation Framework — validation rules improving data accuracy by 40%

Answer questions about Gopichand's skills, experience, and projects. Be concise and friendly. If asked something unrelated, politely redirect.`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [] } = req.body || {};
  if (!message) return res.status(400).json({ error: "Message is required" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY is not configured" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map(({ role, content }) => ({ role, content })),
          { role: "user", content: message },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);
      return res.status(500).json({ error: "Groq API error", detail: data });
    }

    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
