import { Chart } from "react-google-charts";

export default function Ownership({percentage}){

    //const []
    
    const total = 100;
    const you = Number(percentage);
    const oth = total - you

    const data = [
        ["Component", "Ownership"],
        ["You", you],
        ["Others", oth],
       
      ];
      
    const options = {
        title: "Ownership percentage",
        pieHole: 5,
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