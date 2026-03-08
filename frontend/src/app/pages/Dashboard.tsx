import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";

interface Appointment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  submitted_at: string;
  assigned_counsellor_id: string | null;
  appointment_date: string | null;
  mode: string | null;
}

interface Service {
  id: string;
  name: string;
  category: string;
  icon_url: string | null;
  short_description: string;
  long_description: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function authHeaders(token: string | null): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (token) (h as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  return h;
}

export default function Dashboard() {
  const { user, token, isAuthenticated, logout, isAdmin, isCounsellor } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const loadAppointments = useCallback(async () => {
    if (!token) return;
    const url = statusFilter ? `/api/appointments?status_filter=${statusFilter}` : "/api/appointments";
    const res = await fetch(url, { headers: authHeaders(token) });
    if (res.ok) setAppointments(await res.json());
  }, [token, statusFilter]);

  const loadServices = useCallback(async () => {
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
  }, []);

  const loadFaqs = useCallback(async () => {
    const res = await fetch("/api/faqs");
    if (res.ok) setFaqs(await res.json());
  }, []);

  const loadUsers = useCallback(async () => {
    if (!token || !isAdmin) return;
    const res = await fetch("/api/auth/users", { headers: authHeaders(token) });
    if (res.ok) setUsers(await res.json());
  }, [token, isAdmin]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/staff");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      await Promise.all([loadAppointments(), loadServices(), loadFaqs(), loadUsers()]);
      setLoading(false);
    })();
  }, [token, loadAppointments, loadServices, loadFaqs, loadUsers]);

  const updateAppointment = async (id: string, data: { status?: string; assigned_counsellor_id?: string | null }) => {
    if (!token) return;
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Appointment updated");
      loadAppointments();
    } else toast.error("Failed to update");
  };

  if (!isAuthenticated) return null;

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;

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
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Total Appointments</h3>
                      <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-900">Confirmed</h3>
                      <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900">Pending</h3>
                      <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Manage Appointments</CardTitle>
                <CardDescription>View and update contact form submissions and appointments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2 items-center">
                  <Label>Filter by status</Label>
                  <Select value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        {isAdmin && <TableHead>Assigned to</TableHead>}
                        <TableHead className="w-32">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{new Date(a.submitted_at).toLocaleDateString()}</TableCell>
                          <TableCell>{a.full_name}</TableCell>
                          <TableCell>{a.email}</TableCell>
                          <TableCell>
                            <Select
                              value={a.status}
                              onValueChange={(v) => updateAppointment(a.id, { status: v })}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <Select
                                value={a.assigned_counsellor_id || "unassigned"}
                                onValueChange={(v) =>
                                  updateAppointment(a.id, {
                                    assigned_counsellor_id: v === "unassigned" ? null : v,
                                  })
                                }
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Unassigned" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unassigned">Unassigned</SelectItem>
                                  {users
                                    .filter((u) => u.role === "counsellor" || u.role === "admin")
                                    .map((u) => (
                                      <SelectItem key={u.id} value={u.id}>
                                        {u.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          )}
                          <TableCell />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {!loading && appointments.length === 0 && (
                  <p className="text-gray-500 py-4">No appointments yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="services">
              <ServicesTab
                services={services}
                loading={loading}
                token={token}
                onRefresh={loadServices}
              />
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="faqs">
              <FaqsTab faqs={faqs} loading={loading} token={token} onRefresh={loadFaqs} />
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="users">
              <UsersTab users={users} loading={loading} token={token} onRefresh={loadUsers} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

function ServicesTab({
  services,
  loading,
  token,
  onRefresh,
}: {
  services: Service[];
  loading: boolean;
  token: string | null;
  onRefresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "main",
    icon_url: "",
    short_description: "",
    long_description: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      category: "main",
      icon_url: "",
      short_description: "",
      long_description: "",
    });
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      name: s.name,
      category: s.category,
      icon_url: s.icon_url || "",
      short_description: s.short_description,
      long_description: s.long_description,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    setSaving(true);
    const body = {
      ...form,
      icon_url: form.icon_url || null,
    };
    const url = editing ? `/api/services/${editing.id}` : "/api/services";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: authHeaders(token),
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Service updated" : "Service created");
      setOpen(false);
      onRefresh();
    } else toast.error("Failed to save");
  };

  const remove = async (id: string) => {
    if (!token) return;
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (res.ok) {
      toast.success("Service deleted");
      setDeleteId(null);
      onRefresh();
    } else toast.error("Failed to delete");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Services</CardTitle>
        <CardDescription>Add, edit, and delete services.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="mb-4">
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle>
              <DialogDescription>Fill in the service details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Service name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main</SelectItem>
                    <SelectItem value="auxiliary">Auxiliary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Icon URL (optional)</Label>
                <Input
                  value={form.icon_url}
                  onChange={(e) => setForm((f) => ({ ...f, icon_url: e.target.value }))}
                  placeholder="/icons/name.svg"
                />
              </div>
              <div className="grid gap-2">
                <Label>Short description</Label>
                <Input
                  value={form.short_description}
                  onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
                  placeholder="Brief description"
                />
              </div>
              <div className="grid gap-2">
                <Label>Long description</Label>
                <textarea
                  className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.long_description}
                  onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))}
                  placeholder="Full description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.category}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(s)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => setDeleteId(s.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete service?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deleteId && remove(deleteId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

const FAQ_CATEGORIES = [
  "Getting Started",
  "Admissions",
  "IELTS",
  "Visa & Travel",
  "After Arrival",
] as const;

function FaqsTab({
  faqs,
  loading,
  token,
  onRefresh,
}: {
  faqs: FAQItem[];
  loading: boolean;
  token: string | null;
  onRefresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Getting Started",
  });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({ question: "", answer: "", category: "Getting Started" });
    setOpen(true);
  };
  const openEdit = (f: FAQItem) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, category: f.category });
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    setSaving(true);
    const url = editing ? `/api/faqs/${editing.id}` : "/api/faqs";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: authHeaders(token),
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "FAQ updated" : "FAQ created");
      setOpen(false);
      onRefresh();
    } else toast.error("Failed to save");
  };

  const remove = async (id: string) => {
    if (!token) return;
    const res = await fetch(`/api/faqs/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (res.ok) {
      toast.success("FAQ deleted");
      setDeleteId(null);
      onRefresh();
    } else toast.error("Failed to delete");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage FAQs</CardTitle>
        <CardDescription>Add, edit, and delete frequently asked questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="mb-4">
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
              <DialogDescription>Question and answer.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Question</Label>
                <Input
                  value={form.question}
                  onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                  placeholder="Question"
                />
              </div>
              <div className="grid gap-2">
                <Label>Answer</Label>
                <textarea
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.answer}
                  onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                  placeholder="Answer"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FAQ_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="max-w-md truncate">{f.question}</TableCell>
                  <TableCell>{f.category}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(f)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => setDeleteId(f.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deleteId && remove(deleteId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

function UsersTab({
  users,
  loading,
  token,
  onRefresh,
}: {
  users: User[];
  loading: boolean;
  token: string | null;
  onRefresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "counsellor" as "admin" | "counsellor" | "visitor",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!token) return;
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("User created");
      setOpen(false);
      setForm({ name: "", email: "", password: "", role: "counsellor" });
      onRefresh();
    } else {
      const data = await res.json();
      toast.error(data.detail || "Failed to create user");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
        <CardDescription>Staff accounts. Only admins can create new users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Create a new staff account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label>Password (min 8 characters)</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Password"
                />
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v: "admin" | "counsellor" | "visitor") =>
                    setForm((f) => ({ ...f, role: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="counsellor">Counsellor</SelectItem>
                    <SelectItem value="visitor">Visitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
