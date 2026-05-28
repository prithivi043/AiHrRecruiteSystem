import { useState } from "react";

import {
  FaUpload,
  FaFilePdf,
} from "react-icons/fa";

import {
  uploadResume,
} from "../../api/jobApi";

const ResumeUpload = ({
  onUploadSuccess,
}) => {
  const [resume, setResume] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleFileChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      return alert(
        "Only PDF/DOC/DOCX allowed"
      );
    }

    setResume(file);
  };

  const handleUpload =
    async () => {
      if (!resume) {
        return alert(
          "Select Resume"
        );
      }

      try {
        setLoading(true);

        const data =
          await uploadResume(
            resume
          );

        alert(
          "Resume Uploaded Successfully"
        );

        onUploadSuccess?.(data);

      } catch (error) {
        console.log(error);

        alert(
          error.message ||
            "Upload Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        Upload Resume
      </h2>

      <label
        className="
          border-2
          border-dashed
          border-blue-300
          rounded-2xl
          p-10
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          hover:bg-blue-50
          transition
        "
      >
        <FaUpload
          size={40}
          className="text-blue-500"
        />

        <p className="mt-4 text-gray-600">
          Upload PDF or DOC Resume
        </p>

        <input
          type="file"
          className="hidden"
          onChange={
            handleFileChange
          }
        />
      </label>

      {resume && (
        <div
          className="
            mt-5
            flex
            items-center
            gap-3
            bg-gray-100
            p-3
            rounded-xl
          "
        >
          <FaFilePdf
            className="text-red-500"
          />

          <span>
            {resume.name}
          </span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          mt-5
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          transition
        "
      >
        {loading
          ? "Uploading..."
          : "Upload Resume"}
      </button>
    </div>
  );
};

export default ResumeUpload;