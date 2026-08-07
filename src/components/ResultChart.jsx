import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function ResultChart({ results }) {
    const resultItems = results?.results ?? [];

    const data = {
        labels: resultItems.map((result) => result.text),

        datasets: [
            {
                label: "Votes",
                data: resultItems.map((result) => result.votes),
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,

        animation: {
            duration: 800
        },

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    return (
        <div>
            <h2 className="mb-4">
                {results?.question}
            </h2>

            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}