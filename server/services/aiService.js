
function calculateMatchScore(candidateSkills, requiredSkills) {
  let matched = 0;

  requiredSkills.forEach((skill) => {
    if (candidateSkills.includes(skill)) {
      matched++;
    }
  });

  return (matched / requiredSkills.length) * 100;
}

module.exports = calculateMatchScore;
