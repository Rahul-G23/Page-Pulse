import { useState } from "react";
import api from "../services/api";

function Home() {
  // State to store the URL entered by the user
  const [url, setUrl] = useState("");

  // State to store the audit result returned from the backend
  const [result, setResult] = useState(null);

  // State to show loading while the API request is in progress
  const [loading, setLoading] = useState(false);

    // Returns color based on HTTP status
    const getStatusColor = (status) => {
    return status === 200 ? "#16a34a" : "#dc2626";
    };

    // Returns color based on response time
    const getResponseColor = (time) => {
    if (time < 500) return "#16a34a";     // Green
    if (time < 1500) return "#f59e0b";    // Orange
    return "#dc2626";                     // Red
    };

  // Function called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the input field is empty
    if (!url.trim()) {
      alert("Please enter a valid website URL.");
      return;
    }
      
      // Check if the URL starts with http:// or https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        setResult({
        success: false,
        message: "Please enter a valid URL including http:// or https://",
        });
        return;
    }

    try {
      // Show loading message
      setLoading(true);

      // Clear previous results
      setResult(null);

      // Send the URL to the backend API
      const response = await api.post("/audit", {
        url,
      });

      // Store the API response
      setResult(response.data);
    } catch (error) {
      // Display the error message returned by the backend
      setResult({
        success: false,
        message:
          error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* Application Title */}
        <h1>🔍 Page Pulse</h1>

        {/* Short Description */}
        <p className="subtitle">
          Analyze any website and view its basic page information.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit}>

          <label htmlFor="website">
            Website URL
          </label>

          <input
            id="website"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Audit Website"}
          </button>

        </form>

        {/* Result Section */}
        <div className="result">

          {/* Initial Message */}
          {!loading && !result && (
            <p>
              Results will appear here after analyzing a website.
            </p>
          )}

          {/* Loading Message */}
          {loading && (
            <p className="loading">
              🔄 Analyzing website...
            </p>
          )}

          {/* Success Result */}
          {!loading && result && result.success && (
            <>
              <h2>Audit Result</h2>

            <div className="result-item">
                <strong>🌐 Status</strong>

                <span
                    style={{
                    color: getStatusColor(result.status),
                    fontWeight: "bold",
                    }}
                >
                    {result.status} {result.status === 200 ? "OK" : ""}
                </span>
            </div>

            <div className="result-item">
                <strong>⚡ Response Time</strong>

                <span
                    style={{
                    color: getResponseColor(result.responseTime),
                    fontWeight: "bold",
                    }}
                >
                    {result.responseTime} ms
                </span>
            </div>

              <div className="result-item">
                <strong>📄 Title</strong>
                <span>{result.title}</span>
              </div>

              <div className="result-item">
                <strong>📝 Description</strong>
                <span className="description-text">{result.description}</span>
            </div>

              <div className="result-item">
                <strong>H1</strong>
                <span>{result.h1}</span>
              </div>

              <div className="result-item">
                <strong>Images</strong>
                <span>{result.images}</span>
              </div>

              <div className="result-item">
                <strong>Word Count</strong>
                <span>{result.wordCount}</span>
              </div>
            </>
          )}

          {/* Error Message */}
          {!loading && result && !result.success && (
            <p className="error">
              ❌ {result.message}
            </p>
          )}

        </div>

        {/* Assignment Requirement Footer */}
        <footer>
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
          >
            Built for Digital Heroes Training Task
            © Rahul G
          </a>
        </footer>

      </div>
    </div>
  );
}

export default Home;