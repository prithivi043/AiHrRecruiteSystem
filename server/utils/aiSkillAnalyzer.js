// server/utils/aiSkillAnalyzer.js

// ==============================
// AI Skill Analyzer Utility
// ==============================

// This utility analyzes:
// - Candidate skills
// - Skill matching
// - Skill score
// - Missing skills
// - Recommendation level

const aiSkillAnalyzer = (
  candidateSkills = [],
  requiredSkills = []
) => {
  // Normalize Skills

  const normalizedCandidateSkills =
    candidateSkills.map(
      (skill) =>
        skill.toLowerCase()
    );

  const normalizedRequiredSkills =
    requiredSkills.map(
      (skill) =>
        skill.toLowerCase()
    );

  // Matched Skills

  const matchedSkills =
    normalizedRequiredSkills.filter(
      (skill) =>
        normalizedCandidateSkills.includes(
          skill
        )
    );

  // Missing Skills

  const missingSkills =
    normalizedRequiredSkills.filter(
      (skill) =>
        !normalizedCandidateSkills.includes(
          skill
        )
    );

  // Score Calculation

  const score =
    requiredSkills.length > 0
      ? Math.round(
          (matchedSkills.length /
            requiredSkills.length) *
            100
        )
      : 0;

  // Recommendation

  let recommendation =
    "Low Match";

  if (score >= 80) {
    recommendation =
      "Highly Recommended";
  } else if (
    score >= 50
  ) {
    recommendation =
      "Recommended";
  } else if (
    score >= 30
  ) {
    recommendation =
      "Average Match";
  }

  // Final Response

  return {
    matchedSkills,
    missingSkills,
    totalRequiredSkills:
      requiredSkills.length,
    matchedCount:
      matchedSkills.length,
    score,
    recommendation,
  };
};

export default aiSkillAnalyzer;