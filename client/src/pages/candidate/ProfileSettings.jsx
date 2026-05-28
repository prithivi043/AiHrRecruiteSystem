
import { useState } from "react";

import {
  getUser,
} from "../../services/authService";

import {
  updateProfile,
} from "../../api/candidateApi";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaSave,
} from "react-icons/fa";

const ProfileSettings =
  () => {

    const user = getUser();

    const [loading, setLoading] =
      useState(false);

    const [skillInput, setSkillInput] =
      useState("");

    // ========================================

    const [formData, setFormData] =
      useState({

        name:
          user?.name || "",

        email:
          user?.email || "",

        phone:
          user?.phone || "",

        department:
          user?.department ||
          "",

        designation:
          user?.designation ||
          "",

        bio:
          user?.bio || "",

        skills:
          user?.skills || [],

        experience:
          user?.experience ||
          "",

        education:
          user?.education ||
          "",
      });

    // ========================================

    const handleChange = (
      e
    ) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

    // ========================================

    const addSkill = () => {

      if (
        !skillInput.trim()
      ) {
        return;
      }

      setFormData({

        ...formData,

        skills: [

          ...formData.skills,

          skillInput,
        ],
      });

      setSkillInput("");
    };

    // ========================================

    const removeSkill =
      (index) => {

        const updatedSkills =
          formData.skills.filter(
            (_, i) =>
              i !== index
          );

        setFormData({

          ...formData,

          skills:
            updatedSkills,
        });
      };

    // ========================================

   
    const handleSubmit =
      async (e) => {

        e.preventDefault();

        try {

          setLoading(true);

          // UPDATE PROFILE

          const response =
            await updateProfile(
              formData
            );

          
        // SAVE UPDATED USER

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

      // UPDATE DASHBOARD LIVE

      window.dispatchEvent(
        new Event("userUpdated")
      );

      alert(
        "Profile Updated Successfully"
      );



          // FORCE REFRESH

          window.location.reload();

          alert(
            "Profile Updated Successfully"
          );

        } catch (error) {

          console.log(error);

          alert(
            "Profile Update Failed"
          );

        } finally {

          setLoading(false);
        }
      };


    return (

      <div className="space-y-8">

        {/* PROFILE HEADER */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-700
            rounded-[32px]
            p-8
            text-white
            shadow-2xl
            relative
            overflow-hidden
          "
        >

          {/* BACKGROUND */}

          <div
            className="
              absolute
              top-0
              right-0
              w-72
              h-72
              bg-white/10
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                gap-6
              "
            >

              {/* AVATAR */}

              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-white/20
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  text-5xl
                  font-bold
                  border-4
                  border-white/30
                "
              >
                {formData.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              {/* INFO */}

              <div>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                  "
                >
                  {formData.name}
                </h2>

                <p
                  className="
                    text-blue-100
                    text-lg
                    mt-2
                  "
                >
                  {formData.designation ||
                    "Candidate"}
                </p>

                <p
                  className="
                    text-blue-200
                    mt-2
                  "
                >
                  {formData.email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FORM CARD */}

        <div
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            p-8
          "
        >

          {/* TITLE */}

          <div className="mb-8">

            <h2
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              Profile Settings
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your profile
              information and skills
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            {/* NAME */}

            <div className="space-y-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Full Name
              </label>

              <div className="relative">

                <FaUser
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="space-y-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="space-y-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Phone Number
              </label>

              <div className="relative">

                <FaPhone
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* EXPERIENCE */}

            <div className="space-y-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Experience
              </label>

              <div className="relative">

                <FaBriefcase
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* EDUCATION */}

            <div className="space-y-2 md:col-span-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Education
              </label>

              <div className="relative">

                <FaGraduationCap
                  className="
                    absolute
                    left-4
                    top-5
                    text-gray-400
                  "
                />

                <textarea
                  rows="3"
                  name="education"
                  value={
                    formData.education
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-12
                    p-4
                    rounded-2xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* BIO */}

            <div className="space-y-2 md:col-span-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Professional Bio
              </label>

              <textarea
                rows="5"
                name="bio"
                value={
                  formData.bio
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>

            {/* SKILLS */}

            <div className="md:col-span-2">

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-600
                "
              >
                Skills
              </label>

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                  mt-3
                "
              >

                <div className="relative flex-1">

                  <FaCode
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    value={
                      skillInput
                    }
                    onChange={(e) =>
                      setSkillInput(
                        e.target.value
                      )
                    }
                    placeholder="Add Skill"
                    className="
                      w-full
                      border
                      border-gray-200
                      pl-12
                      p-4
                      rounded-2xl
                    "
                  />

                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    px-8
                    rounded-2xl
                    hover:scale-105
                    transition
                  "
                >
                  Add Skill
                </button>

              </div>

              {/* SKILL TAGS */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                "
              >

                {formData.skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        flex
                        items-center
                        gap-3
                        font-medium
                      "
                    >

                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(
                            index
                          )
                        }
                        className="
                          text-red-500
                          hover:text-red-700
                        "
                      >
                        ✕
                      </button>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2
                bg-gradient-to-r
                from-blue-600
                to-indigo-700
                hover:scale-[1.01]
                transition
                text-white
                py-4
                rounded-2xl
                text-lg
                font-semibold
                flex
                items-center
                justify-center
                gap-3
                shadow-lg
              "
            >

              <FaSave />

              {loading
                ? "Updating Profile..."
                : "Save Profile"}

            </button>

          </form>

        </div>

      </div>
    );
};

export default ProfileSettings;

