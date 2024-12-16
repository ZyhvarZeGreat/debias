/* eslint-disable react/prop-types */
"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




const chartConfig = {
    biased: {
        label: "Biased",
        color: "#679962",
    },
    unbiased: {
        label: "Unbiased",
        color: "#143450",
    },
}

export function DonutChart({ data, payload, setPayload, isStatic }) {
    console.log(data)
    const chartData2 = data?.percentage_biased ? [
        { label: "Biased", value: data?.percentage_biased, fill: "#D24781" },
        { label: "Unbiased", value: data?.percentage_nonbiased, fill: "#96939C" }, // Single Entry
    ] : [
        { label: "Biased", value: Number((data?.score * 100).toFixed()), fill: "#679962" },
        { label: "Unbiased", value: Number(((1 - data?.score) * 100).toFixed()), fill: "#143450" }, // Single Entry
    ]


    console.log(chartData2)

    const [inputValue, setInputValue] = React.useState('');

    // Function to handle the input change
    const handleInputChange = (e) => {
        setInputValue({
            "text": e.target.value
        });
    };

    // Function to handle the button click
    const handleSubmit = () => {
        // Handle the submission here
        console.log('Submitted Value:', inputValue);
        setPayload(inputValue)
        // You can also call an API or perform other actions here
    };
    return (
        <Card className="flex  text-[#143450] border-none py-16 overflow-hidden font-graphik items-center justify-center px-12 w-1/2 flex-col">
            <div>
                <h3 className="text-4xl font-semibold">
                    Debias
                </h3>
            </div>
            <CardContent className="flex-1  h-[60%] p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto px-12  h-[90%]"
                >
                    <PieChart className="p-0">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData2}
                            dataKey="value"
                            className="border border-white"
                            nameKey="label"
                            innerRadius={180}
                            strokeWidth={3}
                            paddingAngle={2}
                            cornerRadius={3}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy - 26}
                                                    className="fill-foreground text-xl font-medium"
                                                >
                                                    {!isStatic ? ' Your Prompt is' : ''}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    style={{ marginTop: '2rem' }}
                                                    className="fill-[#143450] font-semibold text-4xl"
                                                >
                                                    {!isStatic ? (chartData2[0].value).toFixed(2) : '0.00 '} % biased
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

            </CardContent>

            <CardFooter className="flex-col w-full gap-2 text-sm">
                <div className="flex  w-full gap-2 flex-col">

                    <div className="flex items-center gap-4">

                        <Input onChange={(e) => { handleInputChange(e) }} placeholder='Enter your Prompt' className='border h-20 rounded-md shadow-sm border-black' />
                        <Button onClick={() => {
                            handleSubmit()
                        }} className='rounded-full bg-[#143450] w-14 h-14'>
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                    </div>
                </div>
                <div className="flex border text-[#143450] border-black p-6 items-center w-[60%] mx-auto gap-4">
                    <p className="text-md text-center">
                        {data?.explanation ? data?.explanation : "No explanation provided"}
                    </p>
                </div>
            </CardFooter>

        </Card>
    )
}
