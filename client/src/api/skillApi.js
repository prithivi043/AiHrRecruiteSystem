import API from "./axios";

// ========================================
// Get Employee Skill Analysis
// ========================================

export const getEmployeeSkillAnalysis =
  async (employeeId) => {
    try {
      const response =
        await API.get(
          `/skills/employee/${employeeId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch employee skill analysis",
        }
      );
    }
  };

// ========================================
// Get Candidate Skill Analysis
// ========================================

export const getCandidateSkillAnalysis =
  async (candidateId) => {
    try {
      const response =
        await API.get(
          `/skills/candidate/${candidateId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch candidate skill analysis",
        }
      );
    }
  };

// ========================================
// AI Skill Gap Analysis
// ========================================

export const getSkillGapAnalysis =
  async (
    userId,
    targetRole
  ) => {
    try {
      const response =
        await API.post(
          "/skills/gap-analysis",
          {
            userId,
            targetRole,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch skill gap analysis",
        }
      );
    }
  };

// ========================================
// Get AI Skill Recommendations
// ========================================

export const getSkillRecommendations =
  async (userId) => {
    try {
      const response =
        await API.get(
          `/skills/recommendations/${userId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch skill recommendations",
        }
      );
    }
  };

// ========================================
// Update Employee Skills
// ========================================

export const updateEmployeeSkills =
  async (
    employeeId,
    skillsData
  ) => {
    try {
      const response =
        await API.put(
          `/skills/${employeeId}`,
          skillsData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to update skills",
        }
      );
    }
  };

// ========================================
// Get Skill Score
// ========================================

export const getSkillScore =
  async (userId) => {
    try {
      const response =
        await API.get(
          `/skills/score/${userId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch skill score",
        }
      );
    }
  };

// ========================================
// Get Department Skill Analytics
// ========================================

export const getDepartmentSkillAnalytics =
  async (department) => {
    try {
      const response =
        await API.get(
          `/skills/department/${department}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch department skill analytics",
        }
      );
    }
  };

// ========================================
// Resume Skill Extraction
// ========================================

export const extractResumeSkills =
  async (resumeFile) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      const response =
        await API.post(
          "/skills/extract-resume",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Resume skill extraction failed",
        }
      );
    }
  };

// ========================================
// AI Training Recommendations
// ========================================

export const getTrainingRecommendations =
  async (userId) => {
    try {
      const response =
        await API.get(
          `/skills/training/${userId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch training recommendations",
        }
      );
    }
  };

// ========================================
// Get Employee Strength Report
// ========================================

export const getStrengthReport =
  async (employeeId) => {
    try {
      const response =
        await API.get(
          `/skills/strength-report/${employeeId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch strength report",
        }
      );
    }
  };

// ========================================
// Get Performance-Based Skill Insights
// ========================================

export const getPerformanceSkillInsights =
  async (employeeId) => {
    try {
      const response =
        await API.get(
          `/skills/performance-insights/${employeeId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch performance insights",
        }
      );
    }
  };

// ========================================
// AI Candidate Skill Match
// ========================================

export const getCandidateSkillMatch =
  async (
    candidateId,
    jobId
  ) => {
    try {
      const response =
        await API.get(
          `/skills/match/${candidateId}/${jobId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch candidate skill match",
        }
      );
    }
  };

// ========================================
// Get Skill Dashboard Analytics
// ========================================

export const getSkillDashboardAnalytics =
  async () => {
    try {
      const response =
        await API.get(
          "/skills/dashboard-analytics"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch dashboard analytics",
        }
      );
    }
  };