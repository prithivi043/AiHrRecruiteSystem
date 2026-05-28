import API from "./axios";

// ========================================
// POST JOB
// ========================================

export const postJob =
  async (jobData) => {
    const response =
      await API.post(
        "/hr/jobs",
        jobData
      );

    return response.data;
  };

// ========================================
// GET CANDIDATES
// ========================================

export const getCandidates =
  async () => {
    const response =
      await API.get(
        "/hr/candidates"
      );

    return response.data;
  };

// ========================================
// SCHEDULE INTERVIEW
// ========================================

export const scheduleInterview =
  async (
    interviewData
  ) => {
    const response =
      await API.post(
        "/hr/interviews",
        interviewData
      );

    return response.data;
  };

// ========================================
// SKILL ANALYSIS
// ========================================

export const getSkillAnalysis =
  async () => {
    const response =
      await API.get(
        "/hr/skills-analysis"
      );

    return response.data;
  };

  
// ========================================
// GET INTERVIEWS
// ========================================

export const getInterviews =
  async () => {

    const response =
      await API.get(
        "/hr/interviews"
      );

    return response.data;
  };



  // ========================================
// UPDATE APPLICATION STATUS
// ========================================

export const updateApplicationStatus =
  async (
    id,
    status
  ) => {

    const response =
      await API.put(

        `/hr/application-status/${id}`,

        {
          status,
        }
      );

    return response.data;
  };

  // ======================================== // GET JOBS // ======================================== 
  export const getJobs = async () => {
     const response = await API.get( "/candidate/jobs" );
      return response.data;
     };



// ========================================
// ASSIGN TASK
// ========================================

export const assignTask =
  async (data) => {

    const response =
      await API.post(

        "/hr/assign-task",

        data
      );

    return response.data;
  };


// ========================================
// GET EMPLOYEES
// ========================================

export const getEmployees =
  async () => {

    const response =
      await API.get(
        "/hr/employees"
      );

    return response.data;
  };

