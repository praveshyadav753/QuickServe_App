import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import useApi from "../../../../apihook";

const FeedbackDashboard = () => {
  const { data, loading, error } = useApi("/reviews/my-business/");
    const feedbackData = Array.isArray(data) ? data : []; // Ensure data is an array

  // Handle filter state
  const [filter, setFilter] = useState(0);
  const filteredFeedback = filter
    ? feedbackData.filter((fb) => Math.floor(fb.rating) === filter)
    : feedbackData;

  // Ensure ratings are properly parsed
  const validRatings = feedbackData
    .map((fb) => Number(fb.rating) || 0)
    .filter((r) => r > 0); // Remove invalid ratings

  const averageRating =
    validRatings.length > 0
      ? (validRatings.reduce((acc, r) => acc + r, 0) / validRatings.length).toFixed(1)
      : "N/A";

  const ratingDistribution = [1, 2, 3, 4, 5].map(
    (r) => feedbackData.filter((fb) => Math.floor(fb.rating) === r).length
  );

  if (loading) return <div className="flex items-center justify-center w-full"> loading...</div>

  return (


    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Business Feedback Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Feedback</h2>
          <p className="text-2xl font-bold">{feedbackData.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Average Rating</h2>
          <p className="text-2xl font-bold">{averageRating} / 5</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg h-55 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Positive vs Negative</h2>
          <Pie
            data={{
              labels: ["Positive", "Negative"],
              datasets: [
                {
                  data: [
                    feedbackData.filter((fb) => Number(fb.rating) > 3).length,
                    feedbackData.filter((fb) => Number(fb.rating) <= 3).length,
                  ],
                  backgroundColor: ["#4caf50", "#f44336"],
                },
              ],
            }}
            options={{
              plugins: {
                legend: { position: "bottom" },
              },
            }}
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Feedback Filtering & Table */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Rating:</label>
        <select
          className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          onChange={(e) => setFilter(Number(e.target.value))}
        >
          <option value="0">All</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>
      </div>

      <table className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-600">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Comment</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((fb) => (
            <tr key={fb.review_id} className="border-t">
              <td className="p-3">{fb.user || "Anonymous"}</td>
              <td className="p-3">{fb.service || "N/A"}</td>
              <td className="p-3">{Number(fb.rating) || 0} / 5</td>
              <td className="p-3">{fb.comment || "No comment provided"}</td>
              <td className="p-3">
                {fb.created_at ? new Date(fb.created_at).toLocaleDateString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Trends */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Feedback Trends</h2>
        <Line
          data={{
            labels: ["1★", "2★", "3★", "4★", "5★"],
            datasets: [
              {
                label: "Rating Distribution",
                data: ratingDistribution,
                borderColor: "#3b82f6",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default FeedbackDashboard;
