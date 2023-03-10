import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Home/Navbar";
import ViewProfile from "../components/Candidate/ViewProfile";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../utils/api";
import axios from "axios";
import Loading from "../components/Loading";
//setup user profile
const UserProfile = () => {
  const { authModal } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const inputFile = useRef(null);
  //form data

  const [Phone, setPhone] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [Email, setEmail] = useState("");
  const [Location, setLocation] = useState("");
  const [PrimaryRole, setPrimaryRole] = useState("");
  const [Statement, setStatement] = useState("");
  const [skillData, setskillData] = useState([]);
  //resume file
  const [resume, setResume] = useState(null);

  //for loading animation
  const [isLoading, setisLoading] = useState(false);

  //upload resume to cloudinary
  const uploadResume = async () => {
    const data = new FormData();
    data.append("file", resume);
    data.append("upload_preset", "jobs.lk-CV");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/aghb/image/upload",
        data
      );
      return uploadRes?.data?.secure_url;
    } catch (error) {
      console.log(error);
      toast.error("error in uploading CV", { theme: "dark" });
    }
  };

  //form validation
  const [valLocation, setValLocation] = useState("");
  const [valRole, setValRole] = useState("");
  const [valStatment, setValStatment] = useState("");
  const [valCV, setValcv] = useState("");
  const [valphone, setValphone] = useState("");
  const [valLinkedin, setValLinkedin] = useState("");
  const [valEmail, setValEmail] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleemail = (e) => {
    setEmail(e.target.value);
  };

  //resume exits or not
  const [resumeExist, setresumeExist] = useState(false);

  const [skill, setSkills] = useState("");
  const [YOE, setYOE] = useState("");

  //upload cv button
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  //remove CV fil

  const removeCV = () => {
    setResume(null);
  };
  //remove skills
  const removeSkill = (skillToRemove) => {
    const index = skillData.findIndex(({ skill }) => skill === skillToRemove);
    if (index !== -1) {
      setskillData([
        ...skillData.slice(0, index),
        ...skillData.slice(index + 1),
      ]);
    }
  };
  //add resume
  const add = async () => {
    if (resume === null) {
      setValcv("cv is required");
    } else {
      setValcv("");
    }

    if (Linkedin.length === 0) {
      setValLinkedin("Linkedin link is required");
    } else {
      setValLinkedin("");
    }

    if (!isValidEmail(Email)) {
      setValEmail("Email address is invalid");
    } else {
      setValEmail("");
    }

    if (Phone.length !== 11) {
      setValphone("phone number should be 11 numbers");
    } else {
      setValphone("");
    }

    if (Location.length < 3) {
      setValLocation("Location should be more that 3 characters");
    } else {
      setValLocation("");
    }
    if (PrimaryRole.length < 3) {
      setValRole("Primary Role should be more that 3 characters");
    } else {
      setValRole("");
    }
    if (Statement.length < 3) {
      setValStatment("Statement should be more that 3 characters");
    } else {
      setValStatment("");
    }
    if (
      resume === null ||
      Email.length === 0 ||
      Linkedin.length === 0 ||
      Phone.length !== 11 ||
      Location.length < 3 ||
      PrimaryRole.length < 3 ||
      Statement.length < 3
    ) {
      return;
    }
    //get cv file url
    setisLoading(true);
    const cv = await uploadResume();
    const API_URL = `candidate/addResume`;
    const response = await api.post(API_URL, {
      Phone:Phone,
      Linkedin:Linkedin,
      Email:Email,
      userID: user.userId,
      skills: skillData,
      Location: Location,
      PrimaryRole: PrimaryRole,
      Statement: Statement,
      CV: cv,
    });
    getResume();
    setResume(null);
    setisLoading(false);
    toast.info(response.data.msg, { theme: "dark" });
  };
  //add skill
  const AddSkill = (e) => {
    if (!skill) {
      toast.info("skill cannot be empty", { theme: "dark" });
      return;
    }
    if (!YOE) {
      toast.info("Years of experience cannot be empty", { theme: "dark" });
      return;
    }
    if (YOE < 0) {
      toast.info("Expirience cannot be less that 0", { theme: "dark" });
      return;
    }
    const data = {
      skill: skill,
      YOE: YOE,
    };
    const skillToCheck = skill;
    const index = skillData.findIndex(({ skill }) => skill === skillToCheck);
    if (index !== -1) {
      toast.info("Skill already added", { theme: "dark" });
      return;
    }
    setskillData([...skillData, data]);
  };
  //get resume to check if it already exists
  const getResume = async () => {
    const API_URL = `candidate/viewResume/${user.userId}`;
    const response = await api.get(API_URL);
    if (response.data.find === null) {
      setresumeExist(false);
      return;
    }
    if (
      !response.data.find.Location &&
      !response.data.find.CV &&
      !response.data.find.PrimaryRole &&
      !response.data.find.Statement
    ) {
      setresumeExist(false);
    } else {
      setresumeExist(true);
    }
    //setresumeExist(response.data.find)
  };
  useEffect(() => {
    getResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  if (!resumeExist) {
    return (
      <div className={`${authModal && "h-screen overflow-hidden"}`}>
        <Navbar />
        <header className="header-container">
          <h1 className="header-title">Set Your Resume Details</h1>
        </header>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-center pt-4">
              <div className="box-border h-auto w-4/5  pt-4 ">
                <div className="flex">
                  <button
                    onClick={add}
                    type="button"
                    className=" flex font-medium rounded-md text-white text-md  px-4 py-2.5   bg-[#312ECB] hover:bg-blue-700 focus:outline-none"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div className="pl-2">Add</div>
                  </button>
                </div>
                <p className="font-sans text-2xl pt-12">About You</p>
                <div className="pt-12 pl-6 pr-6">
                  <p className="font-sans text-xl font-bold">
                    CV{" "}
                    <span className="font-sans text-sm font-bold">(PDF) </span>
                  </p>
                  <div className="flex justify-center items-center  box-border h-60 shadow-md border-2  rounded-lg w-full  ">
                    <div className="flex">
                      {resume === null && (
                        <>
                          <button onClick={onButtonClick} className="flex">
                            <p className="font-sans text-2xl font-bold">
                              Add CV
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                              />
                            </svg>
                          </button>
                          <input
                            type="file"
                            id="file"
                            accept="application/pdf"
                            required
                            ref={inputFile}
                            onChange={(e) => setResume(e.target.files[0])}
                            style={{ display: "none" }}
                          />
                        </>
                      )}
                      {resume !== null && (
                        <>
                          <p className="font-sans text-sm font-bold truncate">
                            {resume.name}
                          </p>
                          <button onClick={removeCV} className="flex pl-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <br />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valCV}</p>

                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">Phone</p>
                    <input
                      type="number"
                      required
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      placeholder="Your Phone"
                      className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                    />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valphone}</p>

                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">Linkedin</p>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setLinkedin(e.target.value);
                      }}
                      placeholder="Your Linkedin link"
                      className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                    />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valLinkedin}</p>

                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">Email</p>
                    <input
                      type="text"
                      required
                      onChange={handleemail}
                      placeholder="Your Email"
                      className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                    />
                  </div>
                  {valEmail && (
                    <p className="text-xs text-red-500 pt-0.5">{valEmail}</p>
                  )}

                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">Address</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                      placeholder="Cairo"
                      className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                    />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valLocation}</p>
                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">
                      Whats your primary Role
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setPrimaryRole(e.target.value);
                      }}
                      placeholder="eg: Student"
                      className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full  p-2.5"
                      required
                    />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valRole}</p>
                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">
                      Personal Statment
                    </p>
                    <textarea
                      type="text"
                      onChange={(e) => {
                        setStatement(e.target.value);
                      }}
                      placeholder="Opt..."
                      className="bg-gray-50  shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full resize-y p-2.5"
                    />
                  </div>
                  <p className="text-xs text-red-500 pt-0.5">{valStatment}</p>
                  <div className="pt-4">
                    <p className="font-sans text-xl font-bold">Skills</p>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="eg:java"
                        onChange={(e) => {
                          setSkills(e.target.value);
                        }}
                        className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5"
                      />
                      <div className="pl-2"></div>
                      <input
                        type="number"
                        min="0"
                        placeholder="years of experience"
                        onChange={(e) => {
                          setYOE(e.target.value);
                        }}
                        className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center pt-12">
                    <button onClick={AddSkill}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {skillData.map((skill) => (
                    <div key={skill.skill} className="pt-4">
                      <div className="flex pl-4">
                        <div
                          type="text"
                          placeholder="eg:java"
                          onChange={(e) => {
                            setSkills(e.target.value);
                          }}
                          className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5"
                        >
                          {skill.skill}
                        </div>
                        <div className="pl-2"></div>
                        <div
                          type="text"
                          placeholder="years of experience"
                          onChange={(e) => {
                            setYOE(e.target.value);
                          }}
                          className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5"
                        >
                          {skill.YOE}
                        </div>
                        <button
                          className="no-underline pl-2 hover:underline text-red-700 pr-4"
                          onClick={(e) => {
                            removeSkill(skill.skill);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  if (resumeExist) {
    return <ViewProfile />;
  }
};

export default UserProfile;
