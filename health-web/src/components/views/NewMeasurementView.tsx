type Props = {
  onMeasurementCreated?: () => void;
};

export default function NewMeasurementView({
}: Props) {
  return (
    <div className="text-white h-50 flex flex-col justify-center text-center border-dashed border-1 rounded-xl m-2">
      a couple of input fields to create a new measurement. should input the name, short description. optional inputs could be 
      time to reach the goal and goal.
    </div>
  );
}
