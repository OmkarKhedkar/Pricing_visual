import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Briefcase, Building } from "lucide-react";

interface RoleSelectorProps {
  selectedRole?: string;
  onRoleChange?: (role: string) => void;
  showDescription?: boolean;
}

const RoleSelector = ({
  selectedRole = "analyst",
  onRoleChange = () => {},
  showDescription = true,
}: RoleSelectorProps) => {
  const [activeRole, setActiveRole] = useState<string>(selectedRole);

  const roles = [
    {
      id: "executive",
      name: "Executive",
      description: "High-level KPIs and strategic insights",
      icon: <Building className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "analyst",
      name: "Pricing Analyst",
      description: "Detailed analytics and recommendations",
      icon: <Briefcase className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "sales",
      name: "Sales Team",
      description: "Customer-specific pricing and deals",
      icon: <Users className="h-4 w-4" />,
      color: "bg-green-100 text-green-800",
    },
  ];

  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    onRoleChange(role);
  };

  // For mobile view
  const handleSelectChange = (value: string) => {
    handleRoleChange(value);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">View Dashboard As</CardTitle>
        {showDescription && (
          <CardDescription>
            Switch between different role perspectives
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {/* Desktop view - buttons */}
        <div className="hidden md:flex space-x-2 w-full">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={activeRole === role.id ? "default" : "outline"}
              className={`flex items-center justify-center flex-1 ${activeRole === role.id ? "bg-slate-900" : "border-gray-200"}`}
              onClick={() => handleRoleChange(role.id)}
            >
              <span className="mr-2">{role.icon}</span>
              {role.name}
              {activeRole === role.id && (
                <Badge className="ml-2 text-xs bg-slate-700 text-white">
                  Active
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Mobile view - select dropdown */}
        <div className="md:hidden w-full">
          <Select value={activeRole} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  <div className="flex items-center">
                    <span className="mr-2">{role.icon}</span>
                    <span>{role.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showDescription && activeRole && (
            <p className="mt-2 text-xs text-gray-500">
              {roles.find((r) => r.id === activeRole)?.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;
