import { useState, type ReactNode } from "react";
import MeasurementList from "../elements/measurement/MeasurementList";
import MeasurementDetailsView from "../views/MeasurementDetailsView";
import NewMeasurementView from "../views/NewMeasurementView";
import type { MeasurementType } from "./MeasurementPage";
import { measurementMock } from "../mock/measurementMock";

export default function NewMeasurementPage() {
  const [headerView, setHeaderView] = useState<ReactNode>(null);
  const [measurementsData, setMeasurementsData] = useState<MeasurementType[]>(measurementMock);
  function showCreateView(): void {
    setHeaderView(<NewMeasurementView />);
  }

  function showSelectedMeasurement(measurement: MeasurementType | null): void {
    if (measurement === null) {
      setHeaderView(null);
    } else {
      setHeaderView(<MeasurementDetailsView />);
    }
  }

  return (
    <div className="text-white">
      {headerView}
      <MeasurementList
        onCreateBegin={showCreateView}
        onMeasurementSelect={showSelectedMeasurement}
        data={measurementsData}
      />
    </div>
  );
}
