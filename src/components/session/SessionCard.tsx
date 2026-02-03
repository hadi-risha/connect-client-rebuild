import type { ReactNode } from "react";
import type { Session } from "../../features/session/session.types";

interface SessionCardProps {
  session: Session;

  primaryAction?: {
    label: string;
    onClick: (session: Session) => void;
  };

  secondaryAction?: {
    icon: ReactNode;
    onClick: (session: Session) => void;
    title?: string;
  };

  extraAction?: {
    icon: ReactNode;
    onClick: (session: Session) => void;
    title?: string;
  };
}

export default function SessionCard({
  session,
  primaryAction,
  secondaryAction,
  extraAction,
}: SessionCardProps) {
  return (
    <div className="group flex overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-lg transition">
      {/* image */}
      <img
        src={session.coverPhoto?.url || "/placeholder.png"}
        alt={session.title}
        className="h-48 w-48 object-cover"
      />

      {/* content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {session.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {session.introduction || session.description}
        </p>

        {/* meta */}
        <div className="mt-3 text-sm text-gray-500 flex gap-6">
          <span>{session.category}</span>
          <span>{session.duration} mins</span>
          <span>₹{session.fees}</span>
        </div>

        {/* actions */}
        <div className="mt-auto flex items-center justify-between pt-6">
          {primaryAction && (
            <button
              onClick={() => primaryAction.onClick(session)}
              className=" bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
              {primaryAction.label}
            </button>
          )}

          <div className="flex gap-4">
            {secondaryAction && (
              <button
                onClick={() => secondaryAction.onClick(session)}
                title={secondaryAction.title}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {secondaryAction.icon}
              </button>
            )}

            {extraAction && (
              <button
                onClick={() => extraAction.onClick(session)}
                title={extraAction.title}
                className="flex flex-col items-center gap-1 text-xs font-medium cursor-pointer"
              >
                {extraAction.icon}
                <span className="text-gray-600">
                  {extraAction.title}
                </span>
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

