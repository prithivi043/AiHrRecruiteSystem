
import {
  useState,
} from "react";

import {

  FaUser,

  FaEnvelope,

  FaPhone,

  FaBriefcase,

  FaGraduationCap,

  FaCode,

  FaSave,

} from "react-icons/fa";

// ========================================
// API
// ========================================

import {
  updateProfile,
} from "../../api/candidateApi";

// ========================================
// SERVICE
// ========================================

import {
  getUser,
} from "../../services/authService";

// ========================================
// COMPONENT
// ========================================

const EmployeeProfile =
  () => {

    const user =
      getUser();

    // ========================================
    // STATES
    // ========================================

    const [loading,
      setLoading] =
      useState(false);

    const [skillInput,
      setSkillInput] =
      useState("");

    const [formData,
      setFormData] =
      useState({

        name:
          user?.name || "",

        email:
          user?.email || "",

        phone:
          user?.phone || "",

        department:
          user?.department || "",

        designation:
          user?.designation || "",

        experience:
          user?.experience || "",

        education:
          user?.education || "",

        bio:
          user?.bio || "",

        skills:
          user?.skills || [],
      });

    // ========================================
    // HANDLE CHANGE
    // ========================================

    const handleChange =
      (e) => {

        setFormData({

          ...formData,

          [e.target.name]:
            e.target.value,
        });
      };

    // ========================================
    // ADD SKILL
    // ========================================

    const addSkill =
      () => {

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
    // REMOVE SKILL
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
    // SUBMIT
    // ========================================

    const handleSubmit =
      async (e) => {

        e.preventDefault();

        try {

          setLoading(true);

          const response =
            await updateProfile(
              formData
            );

          localStorage.setItem(

            "user",

            JSON.stringify(
              response.user
            )
          );

          alert(
            "Profile Updated Successfully"
          );

          window.location.reload();

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

        {/* HERO */}

        <div
          className="
            bg-gradient-to-r
            from-blue-700
            via-indigo-700
            to-purple-800
            rounded-[32px]
            p-8
            text-white
            shadow-2xl
          "
        >

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
                border-4
                border-white/30
                flex
                items-center
                justify-center
                text-5xl
                font-bold
              "
            >

              {formData.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            {/* INFO */}

            <div>

              <h1
                className="
                  text-4xl
                  font-extrabold
                "
              >
                {formData.name}
              </h1>

              <p
                className="
                  text-blue-100
                  mt-3
                  text-lg
                "
              >
                {formData.designation ||
                  "Employee"}
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

        {/* FORM */}

        <div
          className="
            bg-white
            rounded-[32px]
            p-8
            shadow-xl
          "
        >

          <div className="mb-8">

            <h2
              className="
                text-3xl
                font-bold
              "
            >
              Employee Profile
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Update your
              professional details
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
                "
              >
                Email
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
                "
              >
                Phone
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

            <div className="md:col-span-2">

              <label
                className="
                  text-sm
                  font-semibold
                "
              >
                Bio
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
                  p-4
                  rounded-2xl
                  mt-2
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
                    bg-blue-600
                    text-white
                    px-8
                    rounded-2xl
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
                text-white
                py-4
                rounded-2xl
                text-lg
                font-semibold
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <FaSave />

              {loading
                ? "Updating..."
                : "Save Profile"}

            </button>

          </form>

        </div>

      </div>
    );
};

export default EmployeeProfile;

