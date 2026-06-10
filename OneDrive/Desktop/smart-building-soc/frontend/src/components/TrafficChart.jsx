import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrafficChart({ traffic }) {

  const data = {
    labels: traffic.map((_, i) => i + 1),
    datasets: [
      {
        label: "Traffic Events",
        data: traffic.map((_, i) => i + 1),
      }
    ]
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}
    >
      <Line data={data} />
    </div>
  );
}