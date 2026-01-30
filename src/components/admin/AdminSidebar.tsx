import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Circle, ChevronLeft } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: Circle,
      children: [{ to: "/admin/dashboard", label: "Dashboard" }],
    },
    {
      key: "users",
      label: "User Management",
      icon: Circle,
      children: [{ to: "/admin/users", label: "All Users" }],
    },
    {
      key: "ai",
      label: "AI Feedback",
      icon: Circle,
      children: [{ to: "/admin/ai-rating", label: "AI Ratings" }],
    },
    {
      key: "notifications",
      label: "Notification",
      icon: Circle,
      children: [
        { to: "/admin/notifications", label: "All Notifications" },
        { to: "/admin/notifications/create", label: "Create Notification" },
      ],
    },
  ];

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // smart route matching
  const isRouteActive = (to: string) => {
    if (location.pathname === to) return true;

    // prevent base list page from matching subroutes
    if (to !== "/admin/notifications" && location.pathname.startsWith(to)) {
      return true;
    }

    return false;
  };

  // auto open correct parent
  useEffect(() => {
    const activeMenu = menus.find(menu =>
      menu.children.some(child => isRouteActive(child.to))
    );
    if (activeMenu) {
      // setOpenMenu(activeMenu.key);
      const timer = setTimeout(() => setOpenMenu(activeMenu.key), 0);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleParentClick = (menu: typeof menus[number]) => {
    if (menu.children.length === 1) {
      navigate(menu.children[0].to);
      setOpenMenu(menu.key);
    } else {
      setOpenMenu(prev => (prev === menu.key ? null : menu.key));
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-[#2c2f5a] text-white hidden md:block">
      <nav className="space-y-2 p-3">
        {menus.map(menu => {
          const isAnyChildActive = menu.children.some(child =>
            isRouteActive(child.to)
          );
          const isOpen = openMenu === menu.key;

          return (
            <div key={menu.key}>
              {/* MAIN ITEM */}
              <button
                onClick={() => handleParentClick(menu)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition
                  ${
                    isAnyChildActive
                      ? "bg-[#3b3f7a]"
                      : "hover:bg-[#35386a]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <menu.icon size={10} className="text-blue-400" />
                  <span className="font-medium">{menu.label}</span>
                </div>

                {isOpen ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>

              {/* SUB MENU */}
              {isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {menu.children.map(child => {
                    const isActive = isRouteActive(child.to);

                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={`block px-3 py-2 rounded-md text-sm transition
                          ${
                            isActive
                              ? "bg-gray-800 text-white"
                              : "text-gray-300 hover:bg-[#44488c]"
                          }`}
                      >
                        {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
