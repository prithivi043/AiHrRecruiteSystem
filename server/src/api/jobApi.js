import API from "./axios";

// ========================================
// Get All Jobs
// ========================================

export const getAllJobs =
  async (query = "") => {
    try {
      const response =
        await API.get(
          `/jobs${query}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch jobs",
        }
      );
    }
  };

// ========================================
// Get Single Job
// ========================================

export const getJobById =
  async (jobId) => {
    try {
      const response =
        await API.get(
          `/jobs/${jobId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch job",
        }
      );
    }
  };

// ========================================
// Create Job
// ========================================

export const createJob =
  async (jobData) => {
    try {
      const response =
        await API.post(
          "/jobs",
          jobData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to create job",
        }
      );
    }
  };

// ========================================
// Update Job
// ========================================

export const updateJob =
  async (
    jobId,
    updatedData
  ) => {
    try {
      const response =
        await API.put(
          `/jobs/${jobId}`,
          updatedData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to update job",
        }
      );
    }
  };

// ========================================
// Delete Job
// ========================================

export const deleteJob =
  async (jobId) => {
    try {
      const response =
        await API.delete(
          `/jobs/${jobId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to delete job",
        }
      );
    }
  };

// ========================================
// Apply for Job
// ========================================

export const applyForJob =
  async (
    jobId,
    applicationData
  ) => {
    try {
      const response =
        await API.post(
          `/jobs/apply/${jobId}`,
          applicationData,
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
            "Job application failed",
        }
      );
    }
  };


// ========================================
// Upload Resume
// ========================================

export const uploadResume =
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
          "/resume/upload",
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
            "Resume upload failed",
        }
      );
    }
  };

// ========================================
// AI Candidate Match Score
// ========================================

export const getCandidateMatchScore =
  async (
    jobId,
    candidateId
  ) => {
    try {
      const response =
        await API.get(
          `/jobs/match-score/${jobId}/${candidateId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch AI match score",
        }
      );
    }
  };

// ========================================
// Get Applied Candidates
// ========================================

export const getAppliedCandidates =
  async (jobId) => {
    try {
      const response =
        await API.get(
          `/jobs/candidates/${jobId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch candidates",
        }
      );
    }
  };

// ========================================
// Shortlist Candidate
// ========================================

export const shortlistCandidate =
  async (
    candidateId,
    shortlistData
  ) => {
    try {
      const response =
        await API.put(
          `/jobs/shortlist/${candidateId}`,
          shortlistData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to shortlist candidate",
        }
      );
    }
  };

// ========================================
// Reject Candidate
// ========================================

export const rejectCandidate =
  async (
    candidateId,
    rejectData
  ) => {
    try {
      const response =
        await API.put(
          `/jobs/reject/${candidateId}`,
          rejectData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to reject candidate",
        }
      );
    }
  };

// ========================================
// Schedule Interview
// ========================================

export const scheduleInterview =
  async (
    candidateId,
    interviewData
  ) => {
    try {
      const response =
        await API.post(
          `/interviews/${candidateId}`,
          interviewData
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Interview scheduling failed",
        }
      );
    }
  };

// ========================================
// Get Interview Schedule
// ========================================

export const getInterviews =
  async () => {
    try {
      const response =
        await API.get(
          "/interviews"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch interviews",
        }
      );
    }
  };

// ========================================
// Recruitment Analytics
// ========================================

export const getRecruitmentAnalytics =
  async () => {
    try {
      const response =
        await API.get(
          "/analytics/recruitment"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Failed to fetch analytics",
        }
      );
    }
  };

// ========================================
// Search Jobs
// ========================================

export const searchJobs =
  async (keyword) => {
    try {
      const response =
        await API.get(
          `/jobs/search/${keyword}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Job search failed",
        }
      );
    }
  };

// ========================================
// Filter Jobs
// ========================================

export const filterJobs =
  async (filters) => {
    try {
      const response =
        await API.post(
          "/jobs/filter",
          filters
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Job filtering failed",
        }
      );
    }
  };