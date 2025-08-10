import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    if (!longUrl.trim()) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        original_URL: longUrl,
      });
      setShortUrl(res.data.short_url);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f5f0e6] text-[#5d3a00]">
      <h1 className="text-3xl font-bold mb-6 text-[#6b4c00]">URL Shortener</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#f0e8d0] p-6 rounded-lg shadow-md"
      >
        <input
          type="url"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-3 rounded border border-[#a17c00] bg-[#f5f0e6] placeholder:text-[#a17c00] text-[#5d3a00] focus:outline-none focus:ring-2 focus:ring-[#a17c00] mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-bold text-[#f5f0e6] transition ${
            loading ? "bg-[#a17c00]" : "bg-[#6b4c00] hover:bg-[#533900]"
          }`}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="text-center mt-4 text-[#b00020]">{error}</p>}

      {shortUrl && (
        <div className="mt-6 bg-[#f0e8d0] p-4 rounded-lg shadow-md text-center">
          <p className="text-[#4a732f] mb-2 font-semibold">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#6b4c00] hover:text-[#533900] break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
