export type MeasurementValueType = {
  value: number;
  time: string;
};

type Props = {
  value: MeasurementValueType;
};

export default function MeasurementValue({ value }: Props) {
  const date = new Date(value.time);

  const formatted = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short", // three-letter month (Jan, Feb, Mar…)
    day: "numeric",
  });
  return (
    <div className="text-center w-fit">
      <p className="text-[22px] font-bold text-light-a0">
        {value.value}
      </p>
      <p className="text-[10px] text-surface-tonal-a50 -mt-2">{formatted}</p>
    </div>
  );
}
