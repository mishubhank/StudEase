import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

interface Location {
  name: string;
}
interface AreaOptions {
  label: string;
  value: string;
}

const TutorPost = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<AreaOptions[]>([]);
  const [deg, setDeg] = useState("");
  const [spec, setSpec] = useState("");
  const [pic, setPic] = useState<File | null>(null);
  const jwt_token = localStorage.getItem("jwt");

  // const handleLocationChange = (index: number, value: string) => {
  //   setLocations((prev) => {
  //     const updated = [...prev];
  //     updated[index].name = value;
  //     return updated;
  //   });
  // };
  const locationsForBackend = locations.map((loc) => ({
    name: loc.label,
  }));
  // const addLocation = (newLoc: Location) => {
  //   setLocations((prev) => [...prev, newLoc]);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPic(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "degree":
        setDeg(value);
        break;
      case "specilization":
        setSpec(value);
        break;
      default:
        break;
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deg || !spec || locations.length === 0 || !pic) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("tutorimage", pic);

    formData.append(
      "jsonData",
      JSON.stringify({
        degree: deg,
        specilization: spec,
        location: locationsForBackend,
      })
    );
    console.log("form data is", formData);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/tutor/post",
        formData,
        {
          headers: {
            authorization: `Bearer ${jwt_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", res.data);
      if (res.status === 201) {
        navigate("/tutor/dashboard");
      }
    } catch (error: any) {
      //navigate("/tutor/dashboard");
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[80%] h-[80%] bg-white shadow-md rounded-lg flex p-6">
        <form onSubmit={submitForm} className="max-w-sm mx-auto w-full">
          {/* Degree Field */}
          <label
            htmlFor="degree"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Degree
          </label>
          <input
            type="text"
            id="degree"
            value={deg}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter your degree (e.g., B.Tech, M.Tech)"
          />
          {/* Locations Field */}
          <label
            htmlFor="location"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Locations
          </label>
          {/* {locations.map((locx, index) => (
            <input
              key={index}
              type="text"
              id={`location-${index}`}
              value={locx.name}
              onChange={(e) => handleLocationChange(index, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="Enter locations (e.g., New York, San Francisco)"
            />
          ))} */}
          <MultiSelect
            className="w-full"
            options={areas}
            value={locations}
            onChange={setLocations}
            labelledBy="Select"
          />{" "}
          {/* Specialization Field */}
          <label
            htmlFor="specilization"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Specialization
          </label>
          <input
            type="text"
            id="specilization"
            value={spec}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter your specialization (e.g., Data Science)"
          />
          {/* File Upload */}
          <label
            htmlFor="file_input"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Upload Profile Photo (JPEG, PNG)
          </label>
          <input
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            id="file_input"
            type="file"
          />
          {/* Helper Text */}
          <p
            id="helper-text-explanation"
            className="mt-4 text-sm text-gray-500"
          >
            We’ll never share your details. Read our{" "}
            <a href="#" className="font-medium text-purple-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <button
            type="submit"
            className="m-2 text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 w-56"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
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
export default TutorPost;
