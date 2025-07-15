import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import { Blocks } from "react-loader-spinner";
//import Select from "react-dropdown-select";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface AreaOptions {
  label: string;
  value: string;
}
interface ClassOptions {
  label: string;
  value: number;
}
interface SubjectOption {
  label: string;
  value: string;
}

//import Select from "react-select";
const StudentPost = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState<AreaOptions>({
    label: "Vijay Nagar",
    value: "vijay_nagar",
  });
  const [subject, setSubject] = useState<SubjectOption[]>([
    {
      label: "Hindi",
      value: "hindi",
    },
  ]);
  const [con, setCont] = useState<string>("");
  const [std, setStd] = useState<ClassOptions>({ label: "V", value: 5 });
  const [msg, setMsg] = useState<string>("");
  const [loader, setLoading] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const PostFun = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    console.log("form data", std, area, msg, "message");
    const cls = std.value;
    const areax = area.label;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/student/post",
        {
          std: cls,
          Area: areax,
          contact: con,
          message: msg,
          subjects: subject.map((sub) => ({ name: sub.value })),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      setLoading(false);
      //  navigate("/student/dashboard");

      return { message: "posteed the requiremetn" };
    } catch {
      setLoading(false);

      console.log("logged Error");
      toast("Failed Posting Requirement");
    }
  };

  const [location, setLocation] = useState({ lat: null, long: null });

  var optionss = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    const LocPerm = localStorage.getItem("locAccess");
    if (LocPerm == "block") {
    }
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            const a = navigator.geolocation.getCurrentPosition((pos) => {});
            navigator.geolocation.getCurrentPosition(success, errors, optionss);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, optionss);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable
            //  localStorage.setItem({)
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const [selected, setSelected] = useState([]);

  function changeSel(selected: any) {
    setSelected(selected);
  }

  const options: ClassOptions[] = [
    { label: "I", value: 1 },
    { label: "II", value: 2 },
    { label: "III", value: 3 },
    { label: "IV", value: 4 },
    { label: "V", value: 5 },
    { label: "VI", value: 6 },
    { label: "VII", value: 7 },
    { label: "VIII", value: 8 },
    { label: "IX", value: 9 },
    { label: "X", value: 10 },
    { label: "XI", value: 11 },
    { label: "XII", value: 12 },
    { label: "Other", value: 13 },
  ];

  const areas: AreaOptions[] = [
    { label: "Vijay Nagar", value: "vijay_nagar" },
    { label: "Civil Lines", value: "civil_lines" },
    { label: "Sadar", value: "sadar" },
    { label: "Napier Town", value: "napier_town" },
    { label: "Wright Town", value: "wright_town" },
    { label: "Adhartal", value: "adhartal" },
    { label: "Gorakhpur", value: "gorakhpur" },
    { label: "Bhedaghat", value: "bhedaghat" },
    { label: "Tilhari", value: "tilhari" },
    { label: "Madan Mahal", value: "madan_mahal" },
    { label: "Shakti Nagar", value: "shakti_nagar" },
    { label: "Ranital", value: "ranital" },
    { label: "Damoh Naka", value: "damoh_naka" },
    { label: "Pachpedi", value: "pachpedi" },
    { label: "Katanga", value: "katanga" },
    { label: "Gwarighat", value: "gwarighat" },
    { label: "Garha", value: "garha" },
    { label: "Lalitpur Colony", value: "lalitpur_colony" },
    { label: "South Civil Lines", value: "south_civil_lines" },
    { label: "Kachnar City", value: "kachnar_city" },
    { label: "Russell Chowk", value: "russell_chowk" },
    { label: "Polipather", value: "polipather" },
    { label: "Shastri Bridge", value: "shastri_bridge" },
    { label: "Ganjipura", value: "ganjipura" },
    { label: "Karmeta", value: "karmeta" },
    { label: "Suhagi", value: "suhagi" },
    { label: "Tripuri Chowk", value: "tripuri_chowk" },
    { label: "Medical College Area", value: "medical_college_area" },
    { label: "Bargi Hills", value: "bargi_hills" },
    { label: "Ranjhi", value: "ranjhi" },
    { label: "Gol Bazaar", value: "gol_bazaar" },
    { label: "Machhli Ghar", value: "machhli_ghar" },
    { label: "Nagpur Road", value: "nagpur_road" },
    { label: "Transport Nagar", value: "transport_nagar" },
    { label: "Manegaon", value: "manegaon" },
    { label: "Kachhpura", value: "kachhpura" },
    { label: "Chhoti Omti", value: "chhoti_omti" },
    { label: "Bada Omti", value: "bada_omti" },
    { label: "Lakhera Bagh", value: "lakhera_bagh" },
    { label: "Shahpura", value: "shahpura" },
    { label: "Chhota Fuhara", value: "chhota_fuhara" },
    { label: "Bada Fuhara", value: "bada_fuhara" },
    { label: "Baldeo Bagh", value: "baldeo_bagh" },
  ];
  const SubjectOptions: SubjectOption[] = [
    { label: "Hindi", value: "Hindi" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "English", value: "English" },
    { label: "Computer Science", value: "Computer Science" },
    { label: "Economics", value: "Economics" },
    { label: "Accountancy", value: "Accountancy" },
    { label: "Business Studies", value: "Business Studies" },
    { label: "History", value: "History" },
    { label: "Geography", value: "Geography" },
    { label: "Political Science", value: "Political Science" },
    { label: "Psychology", value: "Psychology" },
    { label: "Sociology", value: "Sociology" },
    { label: "Other", value: "Other" },
  ];

  const handleArea = (selectedOptions: any) => {
    setArea(selectedOptions); // Ensure no undefined values
  };
  const handleClas = (selectedStd: any) => {
    setStd(selectedStd);
  };
  function Submit() {}

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Section */}
        {!loader && (
          <div className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center ">
            <form
              className="w-full max-w-lg space-y-4 sm:space-y-6 "
              onSubmit={PostFun}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-4 sm:mb-8">
                Post Your Requirements
              </h2>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-indigo-100">
                <label className="block">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">
                    Standard
                  </span>
                  <Select options={options} onChange={handleClas} />
                </label>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-indigo-100">
                <label className="block">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">
                    Contact - this will be shared only after matching
                    <input
                      placeholder="studease@gmail.com..."
                      onChange={(e) => {
                        console.log(con);

                        setCont(e.target.value);
                      }}
                      className="mt-2 w-full p-2 sm:p-3 border border-indigo-200 rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />{" "}
                  </span>
                </label>
              </div>
              <div>
                <h1>Select Subject</h1>
                <pre>{JSON.stringify(setSubject)}</pre>
                <MultiSelect
                  options={SubjectOptions}
                  value={subject}
                  onChange={setSubject}
                  labelledBy="Select"
                />
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-indigo-100">
                <label className="block">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">
                    Location
                  </span>
                  {/* <input
                  placeholder="VijayNagar? etc"
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-2 w-full p-2 sm:p-3 border border-indigo-200 rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                /> */}
                </label>
                <Select
                  className="w-48"
                  options={areas}
                  onChange={handleArea}

                  // debounceDuration={200}
                  //labelledBy="Select"
                />{" "}
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-indigo-100">
                <label className="block">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">
                    Message
                  </span>
                  <textarea
                    placeholder="Looking for an English tutor..."
                    onChange={(e) => {
                      setMsg(e.target.value);
                      console.log("changeing message");
                    }}
                    className="mt-2 w-full p-2 sm:p-3 border border-indigo-200 rounded-lg text-base sm:text-lg resize-none h-24 sm:h-32 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
              >
                Post Tuition Request
              </button>
              <ToastContainer
                aria-label={"faf"}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                // transition={Bounce}
              />
            </form>
          </div>
        )}
        {loader && (
          <div className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            {" "}
            {loader && (
              <Blocks
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            )}{" "}
          </div>
        )}
        {/* Information Section */}
        <div className="flex-1 bg-indigo-800 text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <div className="max-w-lg space-y-6 py-6 lg:py-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Find What's Best for Your Child
            </h1>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-700 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Verified Tutors
                  </h3>
                  <p className="text-sm sm:text-base text-indigo-200">
                    All our tutors undergo thorough background checks and
                    verification processes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-700 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Personalized Learning
                  </h3>
                  <p className="text-sm sm:text-base text-indigo-200">
                    Customized teaching approaches to match your child's
                    learning style
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-700 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Quick Response
                  </h3>
                  <p className="text-sm sm:text-base text-indigo-200">
                    Get matched with qualified tutors within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPost;
