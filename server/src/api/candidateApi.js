
import API from "./axios";

// ========================================
// GET JOBS
// ========================================

export const getJobs =
  async () => {

    const response =
      await API.get(
        "/candidate/jobs"
      );

    return response.data;
  };

// ========================================
// APPLY JOB
// ========================================

export const applyJob =
  async (data) => {

    const formData =
      new FormData();

    formData.append(
      "jobId",
      data.jobId
    );

    formData.append(
      "resume",
      data.resume
    );

    const response =
      await API.post(
        "/candidate/apply",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// ========================================
// GET APPLICATIONS
// ========================================

export const getApplications =
  async () => {

    const response =
      await API.get(
        "/candidate/applications"
      );

    return response.data;
  };

// ========================================
// GET CANDIDATE INTERVIEWS
// ========================================

export const getCandidateInterviews =
  async () => {

    const response =
      await API.get(
        "/candidate/interviews"
      );

    return response.data;
  };

// ========================================
// UPDATE PROFILE
// ========================================

export const updateProfile =
  async (data) => {

    const response =
      await API.put(
        "/candidate/profile",
        data
      );

    return response.data;
  };

