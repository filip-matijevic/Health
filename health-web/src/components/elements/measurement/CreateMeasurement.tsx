import { useRef } from "react";
import TextInput from "../../inputs/TextInput";
import useFetch from "../../../hooks/useFetch";

type Props = {
  onCreate: () => void;
};
export default function CreateMeasurement({ onCreate }: Props) {

    const nameRef = useRef<HTMLInputElement>(null);

    const createMeasurementHook = useFetch<string>(
        "/api/Measurement",
        {
          method: "POST",
        },
        { immediate: false, auth: true }
      );
      
    async function SubmitNewMeasurement(): Promise<void> {
        const measurementName = nameRef.current?.value?.trim();
        if (!measurementName) return;
        createMeasurementHook.updateRequestOptions({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: measurementName,
            }),
          });
        await createMeasurementHook.load();
        onCreate();
    }

  return (
    <div className="flex flex-row gap-2 p-2">
      <TextInput ref={nameRef}
      />
    </div>
  );
}
