import { useAuth } from "./components/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Dashboard() {
  const { user, isAuthenticated, logout, isAdmin, isCounsellor } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/staff");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0B2C4D]">Staff Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#0B2C4D]">Welcome, {user?.name}</span>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            {isAdmin && <TabsTrigger value="services">Services</TabsTrigger>}
            {isAdmin && <TabsTrigger value="faqs">FAQs</TabsTrigger>}
            {isAdmin && <TabsTrigger value="users">Users</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>
                  Welcome to the ARCKAE staff dashboard. Manage appointments, services, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Total Appointments</h3>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900">Confirmed</h3>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Manage Appointments</CardTitle>
                <CardDescription>
                  View and manage contact form submissions and appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Appointments management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Services</CardTitle>
                  <CardDescription>
                    Add, edit, and delete services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Services management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="faqs">
              <Card>
                <CardHeader>
                  <CardTitle>Manage FAQs</CardTitle>
                  <CardDescription>
                    Add, edit, and delete frequently asked questions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>FAQs management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>
                    Manage staff accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Users management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}