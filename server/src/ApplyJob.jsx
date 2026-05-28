import { useState } from "react";
import API from "../../api/axios";

const ApplyJob = () => {
  const [resume, setResume] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("resume", resume);

    try {
      await API.post(
        "/applications/upload",
        formData
      );

      alert("Resume Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Resume
      </button>
    </div>
  );
};

export default ApplyJob;