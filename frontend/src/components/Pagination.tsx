import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";

const Pages = () => {
  const [page, setPage] = useState<Number>(1);
  let pages;
  const token = localStorage.getItem("jwt");
  const decoded: any = jwtDecode(token as string);
  const role = decoded.role;

  return (
    <div>
      <div className="flex h-10 items-center justify-center  bg-blue-200  space-x-2 flex-row ">
        <div className=" cursor-pointer border border-gray-500 px-3 py-1 rounded">
          1
        </div>
        <div className="cursor-pointer border border-gray-500 px-3 py-1 rounded">
          2
        </div>
        <div className="border cursor-pointer border-gray-500 px-3 py-1 rounded">
          3
        </div>
        <div className="cursor pointer border border-gray-500 px-3 py-1 rounded">
          4
        </div>
      </div>
    </div>
  );
};

export default Pages;
