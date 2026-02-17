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

export default function LineChart({
  labels,
  data,
  label = "Price",
  colorIndex = 0,
}) {
  const palette = [
    { border: "rgba(0,240,255,1)", fill: "rgba(0,240,255,0.15)" }, // cyan
    { border: "rgba(255,0,229,1)", fill: "rgba(255,0,229,0.12)" }, // pink
    { border: "rgba(196,113,255,1)", fill: "rgba(196,113,255,0.14)" }, // purple
    { border: "rgba(34,197,94,1)", fill: "rgba(34,197,94,0.12)" }, // green
    { border: "rgba(250,204,21,1)", fill: "rgba(250,204,21,0.12)" }, // yellow
  ];

  const c = palette[colorIndex % palette.length];

  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        elements: { point: { radius: 2, hoverRadius: 5 } },
        scales: {
          x: { ticks: { maxTicksLimit: 6 } },
          y: { ticks: { maxTicksLimit: 6 } },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            tension: 0.35,
            fill: true,
            borderColor: c.border,
            backgroundColor: c.fill,
            pointBackgroundColor: c.border,
            pointBorderColor: c.border,
          },
        ],
      }}
    />
  );
}
