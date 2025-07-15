import React, { JSXElementConstructor, FC } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { DiVim } from "react-icons/di";
import { PiStudent } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PiConfettiFill } from "react-icons/pi";
interface student {
  std: number;
  Area: string;
  PostedOn: Date;
  About: string;
  Subject: string;
  studentId: number;

  matches: {
    tutorcon: boolean;
    studentcon: boolean;
    status: boolean;
  };

  onDetails: () => void;
  onApply: () => void;
}

const StudentCard: FC<student> = ({
  std,
  Area,
  PostedOn,
  About,
  matches,

  Subject,
  onApply,
  onDetails,
}: student): JSX.Element => {
  const getButtonText = () => {
    if (matches.status == true) return "Matched";
    if (matches.tutorcon == true && matches.studentcon == false)
      return "Applied";
    if (matches.studentcon == true && matches.tutorcon == false)
      return "Respond";
    return "Apply";
  };

  const getButtonStyles = () => {
    if (matches.status == true) return "bg-primary   ";
    else if (matches.tutorcon == true && matches.studentcon == false) {
      return "bg-yellow-500 hover:bg-yellow-600";
    } else if (matches.studentcon == true) {
      return " bg-green-500 hover:bg-green-600";
    }
    return "bg-primary hover:bg-primary/90 border-2 border-black ";
  };
  const navigate = useNavigate();
  const Match = (status: boolean) => {
    if (status) {
      return (
        <>
          <button
            // disabled

            onClick={() => navigate("/contact")}
            className=" flex items-center justify-center font-mono  pr-2 pl-2 border-black border-2"
          >
            {" "}
            <PiConfettiFill />
            Contact{" "}
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            disabled
            // disabled

            onClick={() => navigate("/contact")}
            className="font-mono  pr-2 pl-2 border-black border-2"
          >
            {" "}
            Contact{" "}
          </button>
        </>
      );
    }
  };

  return (
    <div className="">
      <div className="h-81 w-72 flex flex-col items-center justify-center bg-blue-300  m-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-[#f9f9f9] space-y-2">
        <div className="flex items-center space-x-4 ">
          <div className="">
            {" "}
            <PiStudent />{" "}
          </div>
          <div className=" border-slate-400 text-2xl font-medium">
            {" "}
            Standard- {`${std}`}th{" "}
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <CiLocationOn />
          {Area}
        </div>
        <div className="flex items-center m-2 text-gray-500 justify-center border-1 border-slate-500">
          <div className="flex items-center min-h-8 min-w-8 font-bold">
            <div className="font-bold text-black">PostedOn</div>
            <CiCalendarDate />{" "}
          </div>{" "}
          {`${PostedOn}`}
        </div>
        <div className="flex items-center overflow-y-scroll m-3 text-sm text-gray-600 h-16">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsum
          omnis quo maiores illo cupiditate laborum, necessitatibus aliquam modi
          nam doloribus, tempore a repudiandae, quibusdam sed consequuntur nisi
          ducimus ad.
        </div>
        <div className="h-1/6 w-full flex justify-center space-x-8 m-">
          <button
            className="rounded-lg bg-slate-100 w-1/3 py-1 hover:bg-slate-200 hover:text-gray-900 transition-colors"
            onClick={onDetails}
          >
            Details
          </button>
          <button
            className={`w-1/3 rounded-xl ${getButtonStyles()}`}
            onClick={onApply}
          >
            {getButtonText()}
          </button>
        </div>

        <div className="  flex w-full justify-center  bg-pink-100 h-10 items-center">
          {" "}
          {Match(matches.status)}
        </div>
      </div>
    </div>
  );
};
export default StudentCard;
