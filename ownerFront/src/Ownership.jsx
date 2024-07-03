import { Chart } from "react-google-charts";

export default function Ownership({percentage}){

    const data = [
        ["Task", "Hours per Day"],
        ["You", percentage],
        ["Others", 100 - percentage],
       
      ];
      
    const options = {
        title: "Ownership percentage",
        is3D: true,
      };

    return (
        <div className="p-4">
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"96%"}
                height={"295px"}
                style={{margin: '0 auto'}}
            
            />

        </div>
    )
}