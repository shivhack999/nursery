import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("hero");

  // Hero Section
  const [heroTitle, setHeroTitle] = useState("Welcome to Our Nursery");
  const [heroSubtitle, setHeroSubtitle] = useState("Best plants for your home");

  // Showcase
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Services
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
  });

  // Pavilions
  const [pavilions, setPavilions] = useState([]);
  const [newPavilion, setNewPavilion] = useState({ state: "", description: "" });
  const [pavilionFile, setPavilionFile] = useState(null);

  // ----------------- Logout -----------------
  const logout = () => {
    localStorage.removeItem("adminToken");
    // clear local state (optional)
    setImages([]);
    setServices([]);
    setPavilions([]);
    navigate("/admin/login");
  };

  // ----------------- fetchWithAuth helper -----------------
  // returns `Response` or null (if token missing/expired -> user is logged out)
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      logout();
      return null;
    }

    // Merge headers but don't override headers for FormData uploads (Content-Type)
    const mergedHeaders = { ...(options.headers || {}), Authorization: `Bearer ${token}` };

    try {
      const res = await fetch(url, { ...options, headers: mergedHeaders });
      if (res.status === 401) {
        // token invalid or expired
        logout();
        return null;
      }
      return res;
    } catch (err) {
      console.error("Network error:", err);
      return null;
    }
  };

  // ----------------- API functions -----------------
  const fetchImages = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/showcase`);
    if (!res) return;
    const data = await res.json();
    setImages(data);
  };

  const fetchServices = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/services`);
    if (!res) return;
    const data = await res.json();
    setServices(data);
  };

  const fetchPavilions = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/pavilions`);
    if (!res) return;
    const data = await res.json();
    setPavilions(data);
  };

  // ----------------- Hero -----------------
  const handleSaveHero = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/update-hero`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroTitle, heroSubtitle }),
    });
    if (!res) return;
    const data = await res.json();
    alert(data.message || "Saved!");
  };

  // ----------------- Showcase -----------------
  const handleUploadShowcase = async (e) => {
  e.preventDefault();
  if (!files || files.length === 0) return;

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]); // match backend field "images"
  }

  const res = await fetchWithAuth(`${BASE_URL}/add-showcase`, {
    method: "POST",
    body: formData,
  });
  if (!res) return;

  await fetchImages();
  setFiles([]); // reset after upload
};

  const handleDeleteShowcase = async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/delete-showcase/${id}`, {
      method: "DELETE",
    });
    if (!res) return;
    await fetchImages();
  };

  // ----------------- Services -----------------
  const handleAddService = async (e) => {
    e.preventDefault();
    const serviceData = {
      ...newService,
      features: newService.features ? newService.features.split(",").map((f) => f.trim()) : [],
    };

    const res = await fetchWithAuth(`${BASE_URL}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceData),
    });
    if (!res) return;
    await fetchServices();
    setNewService({ title: "", description: "", icon: "", features: "" });
  };

  const handleDeleteService = async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/services/${id}`, { method: "DELETE" });
    if (!res) return;
    await fetchServices();
  };

  // ----------------- Pavilions -----------------
  const handleAddPavilion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("state", newPavilion.state);
    formData.append("description", newPavilion.description);
    if (pavilionFile) formData.append("image", pavilionFile);

    const res = await fetchWithAuth(`${BASE_URL}/pavilions`, {
      method: "POST",
      body: formData,
    });
    if (!res) return;
    await fetchPavilions();
    setNewPavilion({ state: "", description: "" });
    setPavilionFile(null);
  };

  const handleDeletePavilion = async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/pavilions/${id}`, { method: "DELETE" });
    if (!res) return;
    await fetchPavilions();
  };

  // ----------------- Initial fetch & token check -----------------
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Run initial fetches
    fetchImages();
    fetchServices();
    fetchPavilions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------- Render -----------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
        <nav className="flex flex-col gap-3">
          <button
            className={`text-left p-2 rounded ${activeSection === "hero" ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setActiveSection("hero")}
          >
            Hero Section
          </button>
          <button
            className={`text-left p-2 rounded ${activeSection === "showcase" ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setActiveSection("showcase")}
          >
            Showcase
          </button>
          <button
            className={`text-left p-2 rounded ${activeSection === "services" ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setActiveSection("services")}
          >
            Services
          </button>
          <button
            className={`text-left p-2 rounded ${activeSection === "pavilions" ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setActiveSection("pavilions")}
          >
            Pavilions
          </button>
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Hero Section */}
        {activeSection === "hero" && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Edit Hero Section</h2>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="mb-3 w-full rounded border p-2"
              placeholder="Hero Title"
            />
            <input
              type="text"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="mb-3 w-full rounded border p-2"
              placeholder="Hero Subtitle"
            />
            <button onClick={handleSaveHero} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Save Changes
            </button>
          </div>
        )}

        {/* Showcase Manager */}
{activeSection === "showcase" && (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-xl font-semibold">Manage Showcase</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await handleUploadShowcase(e);
          toast.success("✅ Images uploaded successfully!");
          setFiles([]); // clear preview after upload
        } catch (error) {
          toast.error("❌ Upload failed. Try again.");
        }
      }}
      className="mb-6"
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files);
          if (selectedFiles.length > 10) {
            toast.error("⚠️ You can only select up to 10 images at a time.");
            e.target.value = ""; // reset input
            return;
          }
          setFiles(selectedFiles);
        }}
        className="mb-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>

    {/* 👇 Preview selected images before upload */}
    {files?.length > 0 && (
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Preview (not uploaded yet):</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-40 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {/* 👇 Already uploaded images */}
    <div>
      <h3 className="mb-2 text-lg font-medium">Uploaded Images:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={`${BASE_URL}/uploads/${img.filename}`}
              alt="Showcase"
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={async () => {
                try {
                  await handleDeleteShowcase(img.id);
                  toast.success("🗑️ Image deleted");
                } catch (error) {
                  toast.error("❌ Delete failed.");
                }
              }}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


        {/* Services Manager */}
        {activeSection === "services" && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Manage Services</h2>
            <form onSubmit={handleAddService} className="mb-6 space-y-3">
              <input type="text" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} className="w-full rounded border p-2" placeholder="Service Title" />
              <input type="text" value={newService.icon} onChange={(e) => setNewService({ ...newService, icon: e.target.value })} className="w-full rounded border p-2" placeholder="Icon (e.g. 🌸)" />
              <textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} className="w-full rounded border p-2" placeholder="Service Description" />
              <input type="text" value={newService.features} onChange={(e) => setNewService({ ...newService, features: e.target.value })} className="w-full rounded border p-2" placeholder="Features (comma separated)" />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Service</button>
            </form>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service.id} className="p-4 border rounded shadow">
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <ul className="list-disc ml-5 text-gray-600">
                    {service.features.map((f, i) => (<li key={i}>{f}</li>))}
                  </ul>
                  <button onClick={() => handleDeleteService(service.id)} className="mt-3 bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pavilions Manager */}
        {activeSection === "pavilions" && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Manage Pavilions</h2>
            <form onSubmit={handleAddPavilion} className="mb-6 space-y-3">
              <input type="text" value={newPavilion.state} onChange={(e) => setNewPavilion({ ...newPavilion, state: e.target.value })} className="w-full rounded border p-2" placeholder="State" />
              <textarea value={newPavilion.description} onChange={(e) => setNewPavilion({ ...newPavilion, description: e.target.value })} className="w-full rounded border p-2" placeholder="Description" />
              <input type="file" onChange={(e) => setPavilionFile(e.target.files[0])} />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Pavilion</button>
            </form>
            <div className="grid md:grid-cols-2 gap-4">
              {pavilions.map((p) => (
                <div key={p.id} className="p-4 border rounded shadow relative">
                  {p.image && <img src={`${BASE_URL}/uploads/${p.image}`} alt={p.state} className="w-full h-40 object-cover mb-2 rounded" />}
                  <h3 className="text-xl font-semibold">{p.state} Pavilion</h3>
                  <p className="text-gray-600">{p.description}</p>
                  <button onClick={() => handleDeletePavilion(p.id)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
