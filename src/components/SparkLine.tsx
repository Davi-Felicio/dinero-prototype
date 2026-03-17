interface SparkLineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparkLine({ data, color = "hsl(145, 40%, 48%)", width = 60, height = 24 }: SparkLineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = color || (isPositive ? "hsl(145, 40%, 48%)" : "hsl(0, 72%, 51%)");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
