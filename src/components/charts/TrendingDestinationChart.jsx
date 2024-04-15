import { BorderColor } from "@mui/icons-material";
import { Bar } from "react-chartjs-2";

export const TrendingDestinationChart = ({ chartData }) => {
    let labels = [];
    let dataChart = [];

    chartData.forEach((node, index) => {
        labels.push(node.name);
        dataChart.push(node.planCount);
    });
    const data = {
        labels: labels,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Số kế hoạch được tạo',
                data: dataChart,
                // you can set indiviual colors for each bar
                // backgroundColor: [
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)'
                // ],
                backgroundColor: '#1e242a',
                BorderColor: "#1e242a",
                borderWidth: 2,
            }
        ]
    }
    const config = {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Địa điểm nổi bật'
                }
            }
        },
    }

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Thống kê top 10 địa điểm nổi bật</h2>
            <Bar 
                data={data}
                options={config}
            />
        </div>
    );
};
