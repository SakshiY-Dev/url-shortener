import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [loaded, setLoaded] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/list`, {
        params: { admin_key: adminKey },
      });
      setUrls(res.data);
      setError("");
      setLoaded(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setLoaded(true);
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-[#f5f0e6] text-[#5d3a00]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6b4c00]">
        Admin
      </h1>

      {!loaded && (
        <div className="mb-6 flex justify-center items-center gap-4">
          <input
            type="password"
            placeholder="Enter admin key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="p-3 rounded border bg-[#f0e8d0] placeholder:text-[#a17c00] focus:outline-none focus:ring-2 focus:ring-[#a17c00]"
            style={{ borderColor: "#a17c00", color: "#5d3a00" }}
          />
          <button
            onClick={fetchUrls}
            className="px-5 py-3 rounded font-semibold transition bg-[#6b4c00] text-[#f5f0e6] hover:bg-[#533900]"
          >
            Load Data
          </button>
        </div>
      )}

      {error && <p className="text-center mb-4 text-[#b00020]">{error}</p>}

      {urls.length > 0 && (
        <div className="overflow-x-auto">
          <table
            className="w-full rounded-md shadow-md bg-[#f0e8d0]"
            style={{ border: "1px solid #a17c00" }}
          >
            <thead className="bg-[#d4c187] text-[#5d3a00]">
              <tr>
                <th
                  className="p-4 text-left border-b"
                  style={{ borderColor: "#a17c00" }}
                >
                  Original URL
                </th>
                <th
                  className="p-4 text-left border-b"
                  style={{ borderColor: "#a17c00" }}
                >
                  Short URL
                </th>
                <th
                  className="p-4 text-center border-b"
                  style={{ borderColor: "#a17c00" }}
                >
                  Visits
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((u) => (
                <tr
                  key={u._id}
                  className="border-b last:border-0 hover:bg-[#e6debc] transition"
                  style={{ borderColor: "#a17c00" }}
                >
                  <td className="p-4 break-all">{u.original_URL}</td>
                  <td className="p-4">
                    <a
                      href={`${BASE_URL}/${u.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#6b4c00] hover:text-[#533900]"
                    >
                      {`${BASE_URL}/${u.short_code}`}
                    </a>
                  </td>
                  <td className="p-4 text-center">{u.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
