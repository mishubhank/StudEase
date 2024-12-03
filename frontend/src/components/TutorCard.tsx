import axios from "axios";
import React, { FC, useEffect, useState } from "react";

interface TutorProfile {
  image: string;
  reviews: number;
  offerings: string;
}

const TutorCard: FC<TutorProfile> = ({image,reviews,offerings}): JSX.Element => {
  


  return (
   <div className="bg-yellow-500 flex flex-col items-center max-h-64 w-64 rounded-2xl justify-center m-10 font-mono p-4">
  <img
    className="h-44 w-44  object-cover mb-4"
    src={image}
    alt="Tutor"
  />
  <h3 className="text-lg font-semibold">{reviews}</h3>
  <h3 className="text-sm text-gray-700">{offerings}</h3>
</div>

  );
};

export default TutorCard;
