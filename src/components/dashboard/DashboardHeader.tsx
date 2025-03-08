import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: "Executive" | "Pricing Analyst" | "Sales";
  notificationCount?: number;
  logoUrl?: string;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onLogoutClick?: () => void;
}

const DashboardHeader = ({
  userName = "John Doe",
  userRole = "Pricing Analyst",
  notificationCount = 3,
  logoUrl = "/vite.svg",
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onHelpClick = () => {},
  onLogoutClick = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={logoUrl} alt="Company Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-gray-900">
          B2B Pricing Analytics
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            Dashboard
          </a>
          <a
            href="/analytics"
            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            Analytics
          </a>
          <a
            href="/recommendations"
            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            Recommendations
          </a>
          <a
            href="/reports"
            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            Reports
          </a>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {notificationCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onHelpClick}
            className="hidden sm:flex"
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName.replace(
                      / /g,
                      "",
                    )}`}
                    alt={userName}
                  />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogoutClick}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
