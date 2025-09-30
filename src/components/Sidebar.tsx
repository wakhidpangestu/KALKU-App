import { cn } from "@/lib/utils";
import { Home, Calculator, Flame, Thermometer, Zap, Menu, X, Atom, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard", 
    icon: Home,
  },
  {
    id: "glbb",
    label: "GLBB",
    icon: Zap,
  },
  {
    id: "ideal-gas",
    label: "Hukum Gas Ideal",
    icon: Atom,
  },
  {
    id: "heat-equation", 
    label: "Persamaan Kalor",
    icon: Flame,
  },
  {
    id: "carnot-efficiency",
    label: "Efisiensi Carnot", 
    icon: Thermometer,
  },
  {
    id: "pv-ts-diagram",
    label: "Diagram PV/TS",
    icon: BarChart2,
  },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Desktop default: expanded
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile default: closed
  const [isDesktop, setIsDesktop] = useState(true);
  const currentYear = new Date().getFullYear();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      
      // Reset states based on screen size
      if (desktop) {
        setIsMobileOpen(false); // Close mobile overlay on desktop
      } else {
        setIsExpanded(true); // Reset to expanded for mobile when it opens
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isDesktop) {
      setIsExpanded(!isExpanded);
    } else {
      setIsMobileOpen(!isMobileOpen);
    }
  };

  const closeMobileSidebar = () => {
    if (!isDesktop) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button - Top Left */}
      {!isDesktop && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/70 dark:bg-background/90 backdrop-blur-md border border-white/20 dark:border-primary/30 shadow-lg hover:bg-white/80 dark:hover:bg-primary/20 transition-all duration-300"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Menu 
              className={cn(
                "w-6 h-6 text-blue-500 dark:text-primary absolute transition-all duration-300 transform",
                isMobileOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
              )} 
            />
            <X 
              className={cn(
                "w-6 h-6 text-blue-500 dark:text-primary absolute transition-all duration-300 transform",
                isMobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-75"
              )} 
            />
          </div>
        </button>
      )}

      {/* Mobile Overlay */}
      {!isDesktop && isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 dark:bg-background/80 backdrop-blur-sm z-[99] transition-all"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <div className={cn(
        "fixed top-0 h-screen flex-col shadow-lg z-[100] transition-all ease-in-out duration-300 rounded-r-xl border-r border-white/20 dark:border-primary/30",
        isDesktop ? "flex left-0" : "flex",
        isDesktop && isExpanded ? "w-60 bg-white/70 dark:bg-background/90 backdrop-blur-lg" : "",
        isDesktop && !isExpanded ? "w-20 bg-white/70 dark:bg-background/90 backdrop-blur-lg" : "",
        !isDesktop && isMobileOpen ? "left-0 w-60 bg-white/70 dark:bg-background/90 backdrop-blur-lg" : "",
        !isDesktop && !isMobileOpen ? "-left-60 w-60 bg-white/0 dark:bg-background" : ""
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/20 bg-white/10 flex items-center justify-between">
          {/* Desktop Expanded or Mobile Open */}
          {((isDesktop && isExpanded) || (!isDesktop && isMobileOpen)) && (
            <div className="transition-opacity duration-300">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-primary">
                KALKU
              </h1>
              <p className="text-sm text-gray-600 dark:text-blue-200 font-medium mt-1">Alat Teknik Modern</p>
            </div>
          )}
          
          {/* Desktop Toggle Button */}
          {isDesktop && (
            <button
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center",
                !isExpanded && "mx-auto"
              )}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu 
                  className={cn(
                    "w-5 h-5 text-gray-700 absolute transition-all duration-300 transform",
                    !isExpanded ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-75"
                  )} 
                />
                <X 
                  className={cn(
                    "w-5 h-5 text-gray-700 absolute transition-all duration-300 transform",
                    isExpanded ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-75"
                  )} 
                />
              </div>
            </button>
          )}
        </div>

        {/* Navigation */}
  <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showLabel = (isDesktop && isExpanded) || (!isDesktop && isMobileOpen);
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  closeMobileSidebar();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-300 font-medium group",
                  isActive
                    ? "bg-blue-500/10 dark:bg-primary/20 text-blue-600 dark:text-primary shadow-md border border-blue-200/50 dark:border-primary/40"
                    : "text-gray-600 dark:text-blue-200 hover:bg-blue-500/5 dark:hover:bg-primary/10 hover:text-blue-600 dark:hover:text-primary hover:shadow-sm border border-transparent hover:border-blue-200/30 dark:hover:border-primary/30",
                  !showLabel ? "justify-center" : ""
                )}
                title={!showLabel ? item.label : undefined}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-blue-500/20 dark:bg-primary/30" 
                    : "group-hover:bg-blue-500/10 dark:group-hover:bg-primary/10"
                )}>
                  <Icon size={18} className={isActive ? "text-blue-600 dark:text-primary" : "text-gray-500 dark:text-blue-200 group-hover:text-blue-600 dark:group-hover:text-primary"} />
                </div>
                {showLabel && (
                  <span className="font-semibold text-sm transition-opacity duration-300">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/20 bg-white/10">
          {((isDesktop && isExpanded) || (!isDesktop && isMobileOpen)) && (
            <p className="text-xs text-gray-500 dark:text-blue-300 text-center font-medium transition-opacity duration-300">
              © {currentYear} KALKU by{" "}
              <a 
                href="https://instagram.com/semestalabs.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Semesta Labs
              </a>
            </p>
          )}
        </div>
      </div>

  {/* Mobile Bottom Navigation - Liquid Glass Capsule */}
  <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm flex justify-around py-2 bg-white/70 dark:bg-background/90 backdrop-blur-lg border border-white/20 dark:border-primary/30 rounded-full shadow-lg z-40">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                isActive
                  ? "bg-blue-500/20 dark:bg-primary/30 text-blue-600 dark:text-primary shadow-md scale-110"
                  : "text-gray-500 dark:text-blue-200 hover:bg-blue-500/10 dark:hover:bg-primary/10 hover:text-blue-600 dark:hover:text-primary hover:scale-105"
              )}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </nav>
    </>
  );
}