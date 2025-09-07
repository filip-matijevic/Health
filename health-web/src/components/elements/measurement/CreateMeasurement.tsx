import { useRef, useState } from "react";
import RoundedButton from "../../inputs/RoundedButton";
import TextInput from "../../inputs/TextInput";
import { useFetch } from "../../../hooks/useFetch";

type Props = {
  onCreate: () => void;
};
export default function CreateMeasurement({ onCreate }: Props) {

    const nameRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string|undefined>("");

    const { refetch } = useFetch<string, { name: string|undefined;}>(
        "/api/Measurement",
        {
          method: "POST",
          body:{name},
          skip: true, // don't run automatically
        }
      );
      
    async function SubmitNewMeasurement(): Promise<void> {
        setName(nameRef.current?.value);
        console.log(name);
        await refetch();
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
