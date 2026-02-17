import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
);

export default function LineChart({ labels, data, label = "Price" }) {
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
      }}
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            tension: 0.35,
            fill: true,
          },
        ],
      }}
    />
  );
}
