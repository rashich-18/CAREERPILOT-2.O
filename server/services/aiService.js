import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing from environment variables."
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
};

export const testGemini = async () => {
  const ai = getAI();

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents:
      "Say hello to CareerPilot in one short sentence.",
  });

  return response.text;
};

export const analyzeResume = async (resumeText) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, an intelligent career coach.

Analyze the following resume carefully.

RESUME:
${resumeText}

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "",

  "technicalSkills": [],
  "softSkills": [],
  "education": [],
  "experience": [],
  "projects": [],
  "strengths": [],
  "weaknesses": [],
  "suggestedRoles": [],
  "missingSkills": []
}


Rules:

- technicalSkills: technical/programming/tools/framework skills.
- softSkills: communication, leadership, teamwork, problem-solving, etc.
- education: include degree, institution, field, and dates when available.
- experience: include role, company, duration, and important responsibilities when available.
- projects: include project name, technologies, and description when available.
- strengths: identify strengths supported by the resume.
- weaknesses: identify areas that appear weak or missing.
- suggestedRoles: suggest realistic career roles based on the resume.
-missingSkills:

Return ONLY the names of skills that the candidate should learn or strengthen.

Do not include explanations.

Do not include reasons.

Do not include priority.

Do not include sentences.

Each item must be a short skill name.

Good:
[
  "Docker",
  "REST APIs",
  "AWS",
  "Unit Testing",
  "TypeScript"
]

Bad:
[
  "Learn Docker because it is commonly used in production",
  "Improve your knowledge of REST APIs",
  "You should learn AWS"
]
- Do not invent information that is not supported by the resume.
- If information is unavailable, return an empty array or empty string.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  // Remove markdown code fences if Gemini adds them
  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleanedText);
};



//career match analysis

export const analyzeCareerMatch = async ({
  resumeText,
  targetRole,
  jobDescription = "",
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, an advanced career intelligence and job-fit analysis system.

Analyze how well the candidate matches their target career.

CANDIDATE RESUME:
${resumeText}

TARGET ROLE:
${targetRole}

JOB DESCRIPTION:
${
  jobDescription ||
  "No specific job description was provided. Evaluate against realistic expectations for this target role."
}

Analyze:

1. Technical skills
2. Soft skills
3. Projects
4. Experience
5. Education
6. Required skills
7. Evidence present in the resume
8. Evidence missing from the resume

IMPORTANT DISTINCTIONS:

Strong match:
The resume clearly demonstrates the requirement.

Partial match:
The candidate has some relevant evidence but does not fully demonstrate the requirement.

Critical gap:
The candidate appears to lack an important skill or requirement.

Hidden gap:
An important requirement that the candidate may not have considered.

Evidence gap:
The candidate may have the skill, but the resume does not provide enough evidence.

Experience gap:
The role expects practical/professional experience that is not demonstrated.

Do not invent skills, experience, projects, certifications, or achievements.

SCORING:

Return realistic scores from 0 to 100 for:

- Overall match
- Skill match
- Experience match
- Project match

APPLICATION RECOMMENDATION:

Choose exactly one:

- Apply
- Apply after improving key gaps
- Low fit

SKILL PRIORITIES:

For important missing or weak skills provide:

- skill
- priority
- reason
- impact
- effort

RESUME IMPROVEMENTS:

Suggest improvements only when supported by the candidate's actual experience.

Never tell the candidate to claim experience they do not have.

CAREER INSIGHT:

Write a clear and easy-to-understand career insight for the candidate.

The insight must explain all of the following:

1. CURRENT POSITION
- Explain where the candidate currently stands for the target role.
- Say whether they are a strong match, partial match, or currently need improvement.
- Mention the most important evidence from their resume.

2. BIGGEST ADVANTAGE
- Explain the candidate's strongest advantage for this role.
- Mention the actual skills, projects, education, or experience that support this.

3. BIGGEST WEAKNESS
- Explain the most important weakness or gap.
- Be specific and honest.
- Do not criticize the candidate personally.

4. WHAT IS MISSING
- Explain the most important skills, experience, or evidence that is missing.
- Distinguish between a skill the candidate may actually lack and a skill that may simply not be shown clearly on the resume.

5. WHAT TO DO NEXT
- Give practical advice on what the candidate should improve first.
- Prioritize the most important improvements.
- Explain why each improvement matters for the target role.

6. OVERALL CAREER DIRECTION
- Explain whether the candidate should apply now, improve first, or consider building more experience.
- Give a realistic next step.

WRITING STYLE:

- Use very simple language that anyone can understand.
- Sound like a helpful human career advisor.
- Avoid complicated technical or corporate language.
- Avoid generic AI phrases.
- Do not say "Based on the analysis".
- Do not say "Your resume contains relevant information for this assessment."
- Do not mention that you are an AI.
- Do not repeat the scores because they are already shown elsewhere.
- Do not repeat the same point multiple times.
- Do not make the insight unnecessarily long.
- Keep it detailed enough to be useful, but easy to scan.
- Use short sentences.
- Be honest and practical.
- Never invent experience, skills, projects, achievements, or qualifications.

IMPORTANT:

The insight should feel personalized to THIS candidate and THIS target role.

Start directly with the candidate's situation.

For example, instead of:
"Your resume contains relevant information for this assessment."

Write something like:
"You have a good starting point for a Frontend Developer role because your projects show experience with React and JavaScript. Your biggest gap is practical experience with testing and production-level applications. Building one strong project that includes testing, deployment, and a real API would make your profile much stronger."

Return the insight as ONE clear paragraph.

Return ONLY valid JSON.

Use exactly this structure:

{
  "matchScore": 0,
  "skillMatch": 0,
  "experienceMatch": 0,
  "projectMatch": 0,
  "strongMatches": [],
  "partialMatches": [],
  "criticalGaps": [],
  "hiddenGaps": [],
  "evidenceGaps": [],
  "experienceGaps": [],
  "skillPriorities": [],
  "applyRecommendation": "",
  "resumeSuggestions": [],
  "careerInsight": ""
}

Do not use markdown or code fences.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleanedText);
};


// ==========================================================
// GENERATE PERSONALIZED CAREER ROADMAP
// ==========================================================

export const generateRoadmap = async ({
  targetRole,
  matchScore,
  skillMatch,
  experienceMatch,
  projectMatch,
  strongMatches,
  partialMatches,
  criticalGaps,
  hiddenGaps,
  evidenceGaps,
  experienceGaps,
  skillPriorities,
  resumeSuggestions,
  careerInsight,
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, a practical and friendly career coach.

Create a personalized career roadmap for a candidate who wants to become:

TARGET ROLE:
${targetRole}

CURRENT CAREER MATCH:
Overall Match: ${matchScore}/100
Skill Match: ${skillMatch}/100
Experience Match: ${experienceMatch}/100
Project Match: ${projectMatch}/100

STRONG MATCHES:
${JSON.stringify(strongMatches || [])}

PARTIAL MATCHES:
${JSON.stringify(partialMatches || [])}

CRITICAL GAPS:
${JSON.stringify(criticalGaps || [])}

HIDDEN GAPS:
${JSON.stringify(hiddenGaps || [])}

EVIDENCE GAPS:
${JSON.stringify(evidenceGaps || [])}

EXPERIENCE GAPS:
${JSON.stringify(experienceGaps || [])}

SKILL PRIORITIES:
${JSON.stringify(skillPriorities || [])}

RESUME SUGGESTIONS:
${JSON.stringify(resumeSuggestions || [])}

CAREER INSIGHT:
${careerInsight || ""}


YOUR TASK:

Create a realistic step-by-step roadmap that helps this candidate become job-ready for the target role.

IMPORTANT:

1. The roadmap must be personalized using the Career Match information above.

2. Prioritize the candidate's actual skill gaps.

3. Do NOT recommend skills that are completely unrelated to the target role.

4. Do NOT assume the candidate already knows a skill unless the Career Match indicates it.

5. Do NOT invent experience, projects, certifications, or achievements.

6. Start with the most important gaps first.

7. Keep the roadmap practical and achievable.

8. Include skills, practical projects, practice, resume preparation and interview preparation where relevant.

9. Do not make every task an enormous course.

10. Tasks should be small enough that a student can realistically complete them.

11. Use simple language that a student can easily understand.

12. Avoid generic motivational statements.

13. Avoid unnecessary AI-style wording.

14. The roadmap should feel like advice from a good career mentor.

ROADMAP STRUCTURE:

Create 4 to 6 phases.

Each phase should have:

- A clear title
- A short explanation
- An order number
- 3 to 6 practical tasks

Each task must contain:

- title
- description
- type
- priority
- estimatedTime
- completed

TASK TYPES:

Use exactly one of:

"skill"
"project"
"practice"
"resume"
"interview"

PRIORITY:

Use exactly one of:

"high"
"medium"
"low"

completed must ALWAYS be false because the candidate has not completed the roadmap yet.

ESTIMATED TIME:

Give realistic estimates such as:

"2-3 days"
"1 week"
"3-5 days"
"2 weeks"

Do not make every task the same duration.

ROADMAP PHASE EXAMPLES:

Possible phases could include:

1. Strengthen fundamentals
2. Close important skill gaps
3. Build practical projects
4. Improve resume and portfolio
5. Prepare for interviews
6. Become job-ready

But choose phases based on the candidate's actual gaps.

IMPORTANT:

Do not blindly use these phase names if they don't fit the candidate.

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Use EXACTLY this structure:

{
  "title": "",
  "overview": "",
  "phases": [
    {
      "title": "",
      "description": "",
      "order": 1,
      "tasks": [
        {
          "title": "",
          "description": "",
          "type": "skill",
          "priority": "high",
          "estimatedTime": "",
          "completed": false
        }
      ]
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  // Remove accidental markdown code fences
  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("ROADMAP AI JSON ERROR:", error);
    console.error("RAW ROADMAP RESPONSE:", text);

    throw new Error(
      "CareerPilot AI returned an invalid roadmap format."
    );
  }
};