import { useRef } from "react";
import RoundedButton from "../../inputs/RoundedButton";
import TextInput from "../../inputs/TextInput";
import { useFetch } from "../../../hooks/useFetch";

type Props = {
  onCreate: () => void;
};
export default function CreateMeasurement({ onCreate }: Props) {

    const nameRef = useRef<HTMLInputElement>(null);

    const { refetch } = useFetch<string, { name: string;}>(
        "/api/Measurement",
        {
          method: "POST",
          skip: true, // don't run automatically
          auth: true
        }
      );
      
    async function SubmitNewMeasurement(): Promise<void> {
        const measurementName = nameRef.current?.value?.trim();
        if (!measurementName) return;

        await refetch({body : {name:measurementName}});
        onCreate();
    }

  return (
    <div className="flex flex-row gap-2 p-2">
      <TextInput ref={nameRef}
      />
      <RoundedButton
        label="submit"
        filled={false}
        onClick={SubmitNewMeasurement}
      />
    </div>
  );
}
