"use client"

// components/ui/chart.tsx
import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react"

interface ChartProps {
  type: "line" | "bar"
  data: any
  options: any
}

const ChartComponent = ({ type, data, options }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: type,
        data: data,
        options: options,
      })

      return () => {
        myChart.destroy()
      }
    }
  }, [data, options, type])

  return <canvas ref={chartRef} />
}

export const LineChart = ({ data, options }: { data: any; options: any }) => {
  return <ChartComponent type="line" data={data} options={options} />
}

export const BarChart = ({ data, options }: { data: any; options: any }) => {
  return <ChartComponent type="bar" data={data} options={options} />
}
