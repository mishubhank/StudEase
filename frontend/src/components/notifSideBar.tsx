import React, { useState } from "react";

interface Notification {
  id: number;
  message: string;
}

interface NotifSideBarProps {
  notis: Notification[];
  open: boolean;
}

const NotifSideBar: React.FC<NotifSideBarProps> = ({ notis, open }) => {
  //const [notifs, setNotifs] = useState<Notification[]>(notis); // Initialize state with `notis`

  if (open) {
    return (
      <div className="flex flex-col bg-white absolute top-0 right-0 z-50 mt-11">
        {notis.length > 0 ? (
          notis.map((notif) => (
            <div
              key={notif.id}
              className="border-2 flex items-center w-auto border-black p-2"
            >
              {notif.message}
            </div>
          ))
        ) : (
          <div className="border-2 border-black p-2">
            You have no notifications.
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex border-black border-r-2 p-2">
        {/* No new notifications */}
      </div>
    );
  }
};

export default NotifSideBar;
