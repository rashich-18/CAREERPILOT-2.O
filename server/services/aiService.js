import { GoogleGenAI } from "@google/genai";
const GEMINI_MODEL = "gemini-3.6-flash";
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
    model: GEMINI_MODEL,
    contents:
      "Say hello to CareerPilot in one short sentence.",
  });

  return response.text;
};

export const analyzeResume = async (resumeText) => {
  const ai = getAI();

  if (!resumeText || !resumeText.trim()) {
    throw new Error("Resume text is empty.");
  }

  const prompt = `
You are CareerPilot AI, an expert resume analyzer and career coach.

Analyze the COMPLETE resume provided below.

IMPORTANT RULES:

1. Extract information directly from the resume.
2. Do NOT invent information.
3. Do NOT assume skills that are not present.
4. Do NOT unnecessarily summarize or remove useful resume details.
5. Preserve important technologies, tools, responsibilities, achievements, metrics, project details, education details, and experience.
6. If a section does not exist, return [] or "".
7. Return ONLY valid JSON.
8. Do NOT return markdown.
9. Do NOT return code fences.
10. Follow the exact JSON structure below.

========================
RESUME
========================

${resumeText}

========================
OUTPUT STRUCTURE
========================

{
  "resumeScore": {
    "overall": 0,
    "contentQuality": 0,
    "skills": 0,
    "projectsExperience": 0,
    "keywords": 0,
    "structure": 0,
    "feedback": ""
  },

  "summary": "",

  "technicalSkills": [],

  "softSkills": [],

  "education": [
    {
      "degree": "",
      "institution": "",
      "field": "",
      "dates": "",
      "score": ""
    }
  ],

  "experience": [
    {
      "role": "",
      "company": "",
      "duration": "",
      "responsibilities": []
    }
  ],

  "projects": [
    {
      "name": "",
      "technologies": [],
      "description": ""
    }
  ],

  "strengths": [],

  "weaknesses": [],

  "suggestedRoles": [],

  "missingSkills": []
}

========================
RESUME SCORE
========================

Calculate a realistic score from 0 to 100.

Evaluate:

contentQuality:
- clarity
- relevance
- professional wording
- quality of descriptions
- measurable achievements

skills:
- programming languages
- frameworks
- databases
- tools
- technical abilities
- demonstrated soft skills

projectsExperience:
- quality of projects
- relevance
- technical depth
- work experience
- internships
- responsibilities
- measurable impact

keywords:
- technical keywords
- industry keywords
- role-specific keywords
- ATS-friendly terminology

structure:
- organization
- readability
- completeness
- consistency
- section structure

Do not inflate scores.

A resume containing many technologies should NOT automatically receive a high score.

The overall score must represent the balanced quality of the entire resume.

"feedback" must contain ONE concise sentence describing the resume's most important overall improvement.

========================
SUMMARY
========================

Create a professional 3-5 sentence summary.

Mention, when available:

- educational background
- technical background
- strongest skills
- important projects
- work experience
- career direction

Do not invent information.

========================
TECHNICAL SKILLS
========================

Extract ALL technical skills explicitly present in the resume.

Include:

- programming languages
- frameworks
- libraries
- databases
- APIs
- developer tools
- cloud platforms
- technologies
- version control
- development platforms

Return short skill names.

Example:

[
  "C++",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Git"
]

========================
SOFT SKILLS
========================

Extract soft skills explicitly mentioned or clearly demonstrated.

Examples:

[
  "Leadership",
  "Teamwork",
  "Communication",
  "Problem Solving"
]

Do not invent soft skills.

========================
EDUCATION
========================

Extract EVERY education entry.

Return EXACTLY:

{
  "degree": "",
  "institution": "",
  "field": "",
  "dates": "",
  "score": ""
}

Examples of score information:

- CGPA
- GPA
- percentage
- marks
- grade

If unavailable, use "".

========================
EXPERIENCE
========================

Extract EVERY:

- internship
- job
- freelance role
- research position
- professional experience

Return EXACTLY:

{
  "role": "",
  "company": "",
  "duration": "",
  "responsibilities": []
}

IMPORTANT:

responsibilities MUST ALWAYS be an array.

Each responsibility must be a separate string.

Example:

{
  "role": "Software Developer Intern",
  "company": "ABC Technologies",
  "duration": "June 2026 - August 2026",
  "responsibilities": [
    "Developed REST APIs",
    "Built React components",
    "Integrated MongoDB",
    "Implemented authentication"
  ]
}

Do not combine all responsibilities into one string.

========================
PROJECTS
========================

Extract EVERY project.

Return EXACTLY:

{
  "name": "",
  "technologies": [],
  "description": ""
}

The description should preserve important information from the resume.

Include when available:

- purpose
- features
- candidate contribution
- technical implementation
- technologies
- measurable results

========================
STRENGTHS
========================

Return 3-7 concise strengths supported by the resume.

Example:

[
  "Strong frontend development foundation",
  "Hands-on database experience",
  "Multiple practical projects"
]

Do not invent strengths.

========================
WEAKNESSES
========================

Identify genuine areas for improvement based on the resume.

Examples:

[
  "Limited professional experience",
  "Few measurable achievements",
  "Limited cloud exposure"
]

Do not make unsupported claims.

========================
SUGGESTED ROLES
========================

Suggest 3-6 realistic career roles based ONLY on the candidate's actual:

- skills
- education
- projects
- experience

Examples:

[
  "Frontend Developer",
  "Full Stack Developer",
  "Software Engineer"
]

========================
MISSING SKILLS
========================

Return ONLY short skill names.

These should be useful skills the candidate should learn or strengthen for realistic career progression.

Good:

[
  "TypeScript",
  "Docker",
  "AWS",
  "Unit Testing",
  "REST APIs"
]

Bad:

[
  "Learn Docker because it is widely used",
  "Improve your knowledge of AWS",
  "You should learn TypeScript"
]

Do NOT include explanations.

Do NOT include reasons.

Do NOT include priorities.

Do NOT include sentences.

========================
FINAL VALIDATION
========================

Before returning JSON verify:

- resumeScore exists
- summary exists
- technicalSkills is an array
- softSkills is an array
- education is an array
- experience is an array
- projects is an array
- strengths is an array
- weaknesses is an array
- suggestedRoles is an array
- missingSkills is an array
- experience.responsibilities is ALWAYS an array
- projects.technologies is ALWAYS an array
- no information has been invented
- output is valid JSON

RETURN ONLY JSON.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("INVALID GEMINI JSON:");
    console.error(cleanedText);

    throw new Error("Gemini returned invalid JSON.");
  }
};




//career match analysis

export const analyzeCareerMatch = async ({
  resumeText,
  targetRole,
  targetCompany = "",
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

TARGET COMPANY:
${targetCompany || "Not specified"}

JOB DESCRIPTION:
${
  jobDescription ||
  "No specific job description was provided. Evaluate against realistic expectations for this target role."
}



IMPORTANT:
- The target company is contextual information only.
- Do not increase or decrease the match score simply because of the company's reputation or name.
- Evaluate the candidate based on their resume, target role, and job description when provided.
- If a job description is provided, use it as the primary source for company-specific requirements.
- If no job description is provided, do not invent company-specific requirements.


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

SKILLS TO DEVELOP:

Create a separate list called "skillsToDevelop".

This is the candidate's actual skill gap list.

The list must contain ONLY specific skills that the candidate should learn or strengthen to become better qualified for the TARGET ROLE.

IMPORTANT DECISION PROCESS:

For every potential skill:

1. Check whether the skill is genuinely important for the TARGET ROLE.
2. Check whether the candidate's resume clearly demonstrates that skill.
3. If the skill is clearly demonstrated, DO NOT include it.
4. If the skill is not demonstrated and is genuinely important for the role, include it.
5. If the candidate may know the skill but the resume does not provide enough evidence, treat it as an "evidence gap", NOT a skill gap.
6. If the candidate has the skill but lacks professional experience using it, treat it as an "experience gap", NOT a skill gap.

STRICT RULES:

- Each item must be ONLY a short skill name.
- No explanations.
- No sentences.
- No reasons.
- No priority.
- No impact.
- No effort.
- No experience requirements.
- No education requirements.
- No certifications unless the certification itself represents a required technical skill.
- No generic phrases.
- No vague requirements.
- No duplicate skills.
- Do not include skills already clearly demonstrated in the resume.
- Do not include skills simply because they are commonly associated with the target role.
- Only include skills that are genuinely relevant to this specific target role.
- Prefer specific skills over broad categories.

GOOD:

[
  "TypeScript",
  "Docker",
  "REST APIs",
  "Unit Testing",
  "AWS",
  "System Design"
]

BAD:

[
  "Gain more practical experience",
  "Improve backend knowledge",
  "Build better projects",
  "Get production experience",
  "Improve technical skills",
  "Learn everything required for the role"
]

If the candidate already demonstrates the important skills required for the role, return an empty array.

IMPORTANT:

skillsToDevelop must NOT simply be a list of all skills normally expected for the target role.

It must represent the difference between:

ROLE REQUIREMENTS
minus
SKILLS CLEARLY DEMONSTRATED BY THE CANDIDATE

Return only the genuine remaining skill gaps.

If there are no genuine skill gaps, return [].

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
  "skillsToDevelop": [],
  "hiddenGaps": [],
  "evidenceGaps": [],
  "experienceGaps": [],
  "applyRecommendation": "",
  "resumeSuggestions": [],
  "careerInsight": ""
}

Do not use markdown or code fences.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
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

// ==========================================
// CREATE CAREER MATCH ANALYSIS
// ==========================================

export const createCareerMatch = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found.",
      });
    }

    // ==========================================
    // GET INPUT
    // ==========================================

    const { resumeId, targetRole,targetCompany, jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required.",
      });
    }

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: "Target career role is required.",
      });
    }

    // ==========================================
    // FIND USER'S RESUME
    // ==========================================

    const resume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // ==========================================
    // AI CAREER MATCH ANALYSIS
    // ==========================================

    console.log("🤖 Generating Career Match...");

    const analysis = await analyzeCareerMatch({
      resumeText: resume.resumeText,
      targetRole: targetRole.trim(),
      targetCompany: targetCompany?.trim() || "",
      jobDescription: jobDescription?.trim() || "",
    });

    console.log("✅ Career Match generated");

    // ==========================================
    // SAVE CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.create({
      user: userId,
      resume: resume._id,

      targetRole: targetRole.trim(),
      targetCompany: targetCompany?.trim() || "",
      jobDescription: jobDescription?.trim() || "",

      ...analysis,
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Career Match analysis generated successfully.",
      careerMatch,
    });
  } catch (error) {
    console.error("CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Career Match analysis.",
      error: error.message,
    });
  }
};


// ==========================================
// GET CAREER MATCH HISTORY
// ==========================================

export const getCareerMatchHistory = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    // ==========================================
    // GET USER'S CAREER MATCHES
    // ==========================================

    const careerMatches = await CareerMatch.find({
      user: userId,
    })
      .select(
        "_id resume targetRole matchScore applyRecommendation createdAt updatedAt"
      )
      .sort({
        createdAt: -1,
      });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      careerMatches,
    });
  } catch (error) {
    console.error("CAREER MATCH HISTORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Career Match history.",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE CAREER MATCH
// ==========================================

export const getCareerMatchById = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    // ==========================================
    // FIND CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findOne({
      _id: req.params.id,
      user: userId,
    }).populate("resume", "fileName uploadedAt");

    // ==========================================
    // CHECK RESULT
    // ==========================================

    if (!careerMatch) {
      return res.status(404).json({
        success: false,
        message: "Career Match analysis not found.",
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      careerMatch,
    });
  } catch (error) {
    console.error("GET CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Career Match analysis.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE CAREER MATCH
// ==========================================

export const deleteCareerMatch = async (req, res) => {
  try {
    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user.id;

    // ==========================================
    // DELETE ONLY USER'S OWN CAREER MATCH
    // ==========================================

    const careerMatch = await CareerMatch.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!careerMatch) {
      return res.status(404).json({
        success: false,
        message: "Career Match analysis not found.",
      });
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Career Match deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE CAREER MATCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete Career Match.",
      error: error.message,
    });
  }
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
    model: GEMINI_MODEL,
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



// ==========================================================
// GENERATE AI INTERVIEW QUESTIONS
// ==========================================================

export const generateInterviewQuestions = async ({
  userProfile,
  resume,
  careerMatch,
  role,
  company,
  companyCategory,
  interviewType,
  difficulty,
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, an expert interviewer.

Create a personalized mock interview for the candidate below.

==================================================
INTERVIEW SETUP
==================================================

TARGET ROLE:
${role}

COMPANY:
${company || "Not specified"}

COMPANY CATEGORY:
${companyCategory || "Not specified"}

INTERVIEW TYPE:
${interviewType}

DIFFICULTY:
${difficulty}

==================================================
CANDIDATE PROFILE
==================================================

Name:
${userProfile?.name || ""}

Education:
${JSON.stringify(userProfile?.education || {})}

Skills:
${JSON.stringify(userProfile?.skills || [])}

Interests:
${JSON.stringify(userProfile?.interests || [])}

Career:
${JSON.stringify(userProfile?.career || {})}

==================================================
RESUME
==================================================

Resume Text:
${resume?.resumeText || ""}

Resume Analysis:
${JSON.stringify(resume?.analysis || {})}

==================================================
CAREER MATCH
==================================================

Target Role:
${careerMatch?.targetRole || role}

Match Score:
${careerMatch?.matchScore ?? 0}

Skill Match:
${careerMatch?.skillMatch ?? 0}

Experience Match:
${careerMatch?.experienceMatch ?? 0}

Project Match:
${careerMatch?.projectMatch ?? 0}

Strong Matches:
${JSON.stringify(careerMatch?.strongMatches || [])}

Partial Matches:
${JSON.stringify(careerMatch?.partialMatches || [])}

Critical Gaps:
${JSON.stringify(careerMatch?.criticalGaps || [])}

Skills To Develop:
${JSON.stringify(careerMatch?.skillsToDevelop || [])}

Hidden Gaps:
${JSON.stringify(careerMatch?.hiddenGaps || [])}

Experience Gaps:
${JSON.stringify(careerMatch?.experienceGaps || [])}

Career Insight:
${careerMatch?.careerInsight || ""}

==================================================
INTERVIEW REQUIREMENTS
==================================================

Generate 5 initial interview questions.

Questions must be personalized to THIS candidate.

Do NOT generate generic questions when the resume provides useful information.

For technical interviews:
- Ask about technologies the candidate actually mentions.
- Ask about projects from the resume.
- Test understanding rather than memorization.
- Include questions related to the target role.
- Include questions that test important skill gaps when appropriate.

For HR interviews:
- Ask realistic behavioral questions.
- Use the candidate's background when relevant.

For behavioral interviews:
- Ask questions that encourage specific examples.
- Prefer questions related to projects, teamwork, challenges and problem solving.

For mixed interviews:
- Create a realistic mixture of technical, HR and behavioral questions.

DIFFICULTY:

Easy:
Basic understanding and straightforward questions.

Medium:
Require explanation, reasoning and practical understanding.

Hard:
Require deeper technical reasoning, trade-offs, architecture or challenging scenarios where appropriate.

IMPORTANT:

Do not invent projects, skills, companies, experience or achievements.

If information is unavailable, ask a general question relevant to the target role instead.

==================================================
FOLLOW-UP QUESTIONS
==================================================

For every main question, provide 1 possible follow-up question.

The follow-up should depend on the type of answer the candidate gives.

It should help the interviewer dig deeper.

==================================================
OUTPUT
==================================================

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Use exactly this structure:

{
  "questions": [
    {
      "question": "",
      "questionType": "technical",
      "difficulty": "medium",
      "followUpQuestion": ""
    }
  ]
}

questionType must be exactly one of:

"technical"
"hr"
"behavioral"

difficulty must be exactly one of:

"easy"
"medium"
"hard"

Generate exactly 5 questions.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("INTERVIEW AI JSON ERROR:", error);
    console.error("RAW INTERVIEW RESPONSE:", text);

    throw new Error(
      "CareerPilot AI returned an invalid interview format."
    );
  }
};

// ==========================================================
// GENERATE FINAL INTERVIEW REPORT
// ==========================================================

export const generateInterviewReport = async ({
  role,
  company,
  companyCategory,
  interviewType,
  difficulty,
  questions,
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, a strict but fair professional interview evaluator.

Your job is to evaluate a candidate's interview performance based ONLY on the
questions, answers, transcripts, question types, and speech metrics provided.

Do NOT assume skills, experience, knowledge, confidence, or achievements that
are not demonstrated in the answers.

==================================================
INTERVIEW CONTEXT
==================================================

Target Role:
${role}

Company:
${company || "Not specified"}

Company Category:
${companyCategory || "Not specified"}

Interview Type:
${interviewType}

Difficulty:
${difficulty}

==================================================
CANDIDATE RESPONSES
==================================================

${JSON.stringify(questions, null, 2)}

==================================================
EVALUATION RULES
==================================================

Evaluate every question individually before deciding the final scores.

For each answer consider:

1. Correctness
2. Completeness
3. Depth of understanding
4. Relevance to the question
5. Role relevance
6. Clarity
7. Structure
8. Conciseness
9. Behavioral quality where applicable
10. Technical accuracy where applicable
11. Filler words
12. Speaking pace

IMPORTANT:

A confident-sounding answer is NOT automatically a good answer.

A technically incorrect answer must receive a lower technical score even if
the candidate communicates it fluently.

A vague answer must not receive a high score simply because it is grammatically
correct.

If the candidate does not answer the question, score the answer accordingly.

If an answer is extremely short, incomplete, irrelevant, or empty, penalize it.

Do not invent missing information.

==================================================
TECHNICAL EVALUATION
==================================================

For technical questions:

- Check whether the explanation is factually correct.
- Identify missing important concepts.
- Identify incorrect technical claims.
- Check whether the answer demonstrates understanding rather than memorized
  keywords.
- Evaluate according to the target role: ${role}.
- Difficulty is ${difficulty}, so expectations should match that level.

For example, for a Backend Developer, relevant technical areas may include
APIs, databases, authentication, server-side logic, system design, error
handling, scalability, etc.

For a Frontend Developer, consider React/component concepts, state management,
browser behavior, APIs, performance, accessibility, etc.

Do NOT force irrelevant concepts into the evaluation.

==================================================
BEHAVIORAL EVALUATION
==================================================

For behavioral questions, evaluate:

- Whether the candidate actually answered the question
- Specificity
- Real examples
- Ownership
- Problem solving
- Decision making
- Reflection
- Communication structure

Prefer specific examples over generic statements.

==================================================
COMMUNICATION EVALUATION
==================================================

Evaluate:

- Clarity
- Relevance
- Organization
- Ability to explain ideas
- Conciseness
- Rambling
- Whether the answer directly addresses the question

Do not confuse technical correctness with communication quality.

==================================================
SPEECH EVALUATION
==================================================

Use the provided speech metrics when available.

Filler words:
- Consider frequency relative to the amount of speech.
- A few filler words should NOT heavily reduce the score.
- Frequent filler words should reduce the speech score.

Speaking pace:
- Around 120-160 words per minute is generally comfortable for an interview.
- Very slow speech may reduce clarity.
- Very fast speech may reduce clarity.
- Do NOT punish the candidate heavily when there is insufficient transcript
  data to judge pace reliably.

IMPORTANT:

You cannot determine facial confidence, eye contact, body language, or actual
vocal tone from transcript data alone.

Do NOT claim that the candidate had strong/weak eye contact or facial
confidence unless such data is explicitly provided.

==================================================
SCORING RUBRIC
==================================================

Use this general scale:

90-100 = Exceptional
80-89  = Strong
70-79  = Good
60-69  = Needs improvement
50-59  = Weak
0-49   = Poor

Do not give 80+ unless the evidence genuinely supports it.

Do not give 90+ unless the candidate demonstrates exceptional performance.

If the candidate gives several weak or incomplete answers, the final score
must reflect that.

==================================================
CATEGORY SCORES
==================================================

technicalScore:

Judge technical knowledge and correctness.

communicationScore:

Judge clarity, structure, relevance and explanation quality.

behavioralScore:

Judge behavioral responses. If there are no meaningful behavioral questions,
give a conservative estimate based on available evidence instead of inventing
performance.

speechScore:

Judge filler words and speaking pace only when those metrics are available.

overallScore:

Calculate this from the actual category performance.

Use approximately:

Technical: 35%
Communication: 25%
Behavioral: 20%
Speech: 20%

However, if a category has insufficient evidence, reduce its influence rather
than pretending there is strong evidence.

==================================================
STRENGTHS
==================================================

Return 3-5 strengths.

Every strength must be supported by something in the candidate's responses.

BAD:
"Good communication skills."

GOOD:
"Explained the project architecture clearly and connected the frontend,
backend, and database responsibilities."

Do not write generic compliments.

==================================================
WEAKNESSES
==================================================

Return 3-5 weaknesses.

Every weakness must identify an actual problem, missing concept, unclear
answer, or speech issue.

BAD:
"Improve technical knowledge."

GOOD:
"Your REST API explanation mentioned HTTP methods but did not explain status
codes or authentication, which are important for the target backend role."

==================================================
RECOMMENDATIONS
==================================================

Return 3-5 practical recommendations.

Recommendations must directly address the weaknesses discovered.

BAD:
"Practice more."

GOOD:
"Revise REST API design, HTTP status codes and JWT authentication, then
practice explaining each concept in a 60-90 second answer."

Recommendations should be actionable and specific to the target role.

==================================================
SUMMARY
==================================================

Write one personalized paragraph.

The summary must contain:

1. Overall performance
2. Main strength
3. Most important weakness
4. What the candidate should focus on next

Do not use generic motivational language.

==================================================
IMPORTANT FINAL RULE
==================================================

Before producing the final JSON, internally evaluate every answer separately.

Do NOT expose your internal reasoning.

Only return the final report.

Return ONLY valid JSON.

Use exactly this structure:

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "behavioralScore": 0,
  "speechScore": 0,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "summary": ""
}

Rules for JSON:

- Scores must be integers from 0 to 100.
- strengths must contain 3 to 5 strings.
- weaknesses must contain 3 to 5 strings.
- recommendations must contain 3 to 5 strings.
- summary must be one string.
- Do not return null.
- Do not return markdown.
- Do not use code fences.
- Do not add any fields outside the specified structure.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const report = JSON.parse(cleanedText);

    // ==========================================
    // VALIDATE AI RESPONSE
    // ==========================================

    const scoreFields = [
      "overallScore",
      "technicalScore",
      "communicationScore",
      "behavioralScore",
      "speechScore",
    ];

    for (const field of scoreFields) {
      if (
        typeof report[field] !== "number" ||
        report[field] < 0 ||
        report[field] > 100
      ) {
        throw new Error(
          `Invalid ${field} returned by AI.`
        );
      }

      report[field] = Math.round(report[field]);
    }

    if (!Array.isArray(report.strengths)) {
      report.strengths = [];
    }

    if (!Array.isArray(report.weaknesses)) {
      report.weaknesses = [];
    }

    if (!Array.isArray(report.recommendations)) {
      report.recommendations = [];
    }

    if (typeof report.summary !== "string") {
      report.summary = "";
    }

    return report;

  } catch (error) {
    console.error(
      "FINAL INTERVIEW AI JSON ERROR:",
      error
    );

    console.error(
      "RAW AI RESPONSE:",
      text
    );

    throw new Error(
      "CareerPilot AI returned an invalid final interview report."
    );
  }
};


// ==========================================================
// EVALUATE SINGLE INTERVIEW ANSWER
// ==========================================================

export const evaluateInterviewAnswer = async ({
  role,
  company,
  interviewType,
  difficulty,
  question,
  answer,
  questionType,
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, an expert interview evaluator.

Evaluate ONE interview answer.

ROLE:
${role}

COMPANY:
${company || "Not specified"}

INTERVIEW TYPE:
${interviewType}

DIFFICULTY:
${difficulty}

QUESTION TYPE:
${questionType}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer || "No answer provided."}

Evaluate the answer based on:

1. Relevance to the question
2. Correctness
3. Clarity
4. Structure
5. Depth
6. Communication
7. Technical understanding when applicable

IMPORTANT:

- Do not invent information about the candidate.
- Judge only the answer provided.
- Empty answers should receive a very low score.
- Keep feedback specific and useful.
- Do not be unnecessarily harsh.
- Do not give a high score just because the answer sounds confident.

Return a score from 0 to 100.

Return ONLY valid JSON.

Use exactly this structure:

{
  "score": 0,
  "feedback": ""
}

The feedback should be 2 to 4 short sentences.

Do not use markdown.
Do not use code fences.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(
      "INTERVIEW ANSWER AI JSON ERROR:",
      error
    );

    console.error(
      "RAW AI RESPONSE:",
      text
    );

    throw new Error(
      "CareerPilot AI returned an invalid answer evaluation."
    );
  }
};




// ==========================================
// GENERATE AI JOB APPLICATION
// ==========================================

export const generateJobApplication = async ({
  resumeText,
  role,
  company,
  jobDescription,
}) => {
  const ai = getAI();

  const prompt = `
You are CareerPilot AI, an expert career assistant and professional job application writer.

Your task is to analyze a candidate's resume against a target job and create a highly personalized job application.

IMPORTANT:
Use ONLY information present in the resume.
Do NOT invent:
- work experience
- internships
- projects
- technologies
- achievements
- certifications
- education
- responsibilities

==========================================
CANDIDATE RESUME
==========================================

${resumeText}

==========================================
JOB DETAILS
==========================================

Role:
${role}

Company:
${company}

Job Description:
${jobDescription || "Not provided"}



==========================================
ANALYSIS
==========================================

Analyze:

1. How well the candidate matches the role.
2. Which skills from the resume are relevant.
3. Which projects or experiences are useful for this role.
4. Which job requirements are missing or unsupported by the resume.
5. Whether the candidate appears ready to apply.

==========================================
COVER LETTER
==========================================

Write a professional, personalized cover letter.

The cover letter should:

- Be specific to the company and role.
- Reference relevant skills/projects from the resume.
- Connect the candidate's background to the job description.
- Avoid generic AI-sounding phrases.
- Sound like a real student/job applicant.
- Be concise.
- Do not invent information.
- Do not use placeholders such as [Name].
- Do not include fake contact information.

==========================================
APPLICATION MESSAGE
==========================================

Write a short professional message that could be used when applying through:

- LinkedIn
- Email
- Job portal

Keep it concise and natural.

==========================================
SCORING
==========================================

Give an applicationReadiness score from 0 to 100.

Do NOT automatically give a high score.

Consider:

- Relevant skills
- Relevant projects
- Experience
- Education relevance
- Job requirements
- Evidence in the resume

If the resume does not contain enough evidence, reduce the score.

==========================================
OUTPUT
==========================================

Return ONLY valid JSON.

Use exactly this structure:

{
  "applicationReadiness": 0,
  "candidateFit": "",
  "relevantSkills": [],
  "relevantExperience": [],
  "missingRequirements": [],
  "recommendation": "",
  "coverLetter": "",
  "applicationMessage": ""
}

Rules:

- applicationReadiness must be a number from 0 to 100.
- relevantSkills must contain specific skills found in the resume.
- relevantExperience must contain specific projects, internships, education or experiences actually present in the resume.
- missingRequirements must contain requirements from the job description that are missing or not supported by the resume.
- recommendation should explain whether the candidate should apply and why.
- coverLetter should be a complete professional cover letter.
- applicationMessage should be a short application message.
- Do not use markdown code fences.
- Do not add explanations outside JSON.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanedText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(
      "JOB APPLICATION AI JSON ERROR:",
      error
    );

    console.error(
      "RAW AI RESPONSE:",
      text
    );

    throw new Error(
      "CareerPilot AI returned an invalid job application response."
    );
  }
};