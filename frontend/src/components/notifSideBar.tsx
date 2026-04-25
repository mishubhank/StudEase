import React from "react";

interface Notification {
  id: number;
  message?: string;
  content?: string;
  createdAt?: string;
}

interface NotifSideBarProps {
  notis: Notification[];
  open: boolean;
}

const NotifSideBar: React.FC<NotifSideBarProps> = ({ notis, open }) => {
  //const [notifs, setNotifs] = useState<Notification[]>(notis); // Initialize state with `notis`

  if (open) {
    return (
      <div className="flex flex-col bg-slate-950 border border-slate-800 absolute top-20 right-8 z-50 w-80 rounded-lg shadow-2xl overflow-hidden">
        {notis.length > 0 ? (
          notis.map((notif) => (
            <div
              key={notif.id}
              className="border-b border-slate-800 flex flex-col gap-1 w-auto p-3 text-slate-200"
            >
              <span className="text-sm">{notif.content || notif.message}</span>
              {notif.createdAt && (
                <span className="text-[10px] text-slate-500">
                  {new Date(notif.createdAt).toLocaleString("en-IN")}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="border-b border-slate-800 p-3 text-sm text-slate-400">
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
