import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ labels, data, label = "Allocation" }) {
  return (
    <Doughnut
      options={{ responsive: true, maintainAspectRatio: false }}
      data={{
        labels,
        datasets: [{ label, data }],
      }}
    />
  );
}
