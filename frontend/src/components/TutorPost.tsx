import axios from 'axios';
import React, { useState } from 'react';


interface Location {

  name: string

}

const TutorPost = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: '' }
  ]);
  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index].name = value;
    setLocations(updatedLocations);
  };
  const [deg, setDeg] = useState('');

  const [spec, setSpec] = useState('');
  const [pic, setPic] = useState<File | null>(null);
  const jwt_token = localStorage.getItem('jwt');
  console.log('TOKEN IS HERE', jwt_token);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPic(e.target.files[0]);
    }
  };
  const addLocation = (newLoc: Location) => {

    const prev = [...locations]
    prev.push(newLoc)
    setLocations(prev);

  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'degree':
        setDeg(value);
        break;
      case 'specilization':
        setSpec(value);
        break;
      // Add more cases as needed
    }
  };


  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Create FormData and append file and other form fields
    const formData = new FormData();

    if (pic) formData.append('tutorimage', pic);
    formData.append('specilization', spec);
    formData.append('degree', deg);
    formData.append('location', JSON.stringify(locations));
    console.log(pic, spec, locations, deg);
    console.log(formData);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/tutor/post',
        formData, // Send FormData as request body
        {
          headers: {
            'authorization': `Bearer ${jwt_token}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );
      console.log('Response:', res.data); // Handle the response
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const TutorPosxcxc = () => { }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[80%] h-[80%] bg-white shadow-md rounded-lg flex p-6">
        <form onSubmit={submitForm} className="max-w-sm mx-auto w-full">
          {/* Degree Field */}
          <label htmlFor="degree" className="block mb-2 text-sm font-medium text-gray-700">
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
          <label htmlFor="location" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Locations
          </label>
          {locations.map((locx, index) => (
            <input
              key={index}
              type="text"
              id={`location-${index}`}
              value={locx.name}
              onChange={(e) => handleLocationChange(index, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="Enter locations (e.g., New York, San Francisco)"
            />
          ))}

          {/* Specialization Field */}
          <label htmlFor="specilization" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
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
          <label htmlFor="file_input" className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Upload Profile Photo (JPEG, PNG)
          </label>
          <input
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            id="file_input"
            type="file"
          />

          {/* Helper Text */}
          <p id="helper-text-explanation" className="mt-4 text-sm text-gray-500">
            We’ll never share your details. Read our{' '}
            <a href="#" className="font-medium text-purple-600 hover:underline">
              Privacy Policy
            </a>.
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
}

export default TutorPost