import { Chart } from "react-google-charts";

export default function Ownership({percentage}){

    const data = [
       
        ["You", percentage],
        ["Others", "55"],
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