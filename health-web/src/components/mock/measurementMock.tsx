import type { MeasurementType } from "../pages/MeasurementPage";

export const measurementMock : MeasurementType[] =  [
    {
      name: "Weight",
      id: "whatevs",
      description: "test",
      values: [
        { value: 99.2, time: "NO_FORMAT" },
        { value: 94.2, time: "NO_FORMAT" },
        { value: 92.2, time: "NO_FORMAT" },
        { value: 91.0, time: "NO_FORMAT" },
      ],
    },
    {
      name: "Height",
      id: "whatevs",
      description: "test",
      values: [{ value: 99.2, time: "NO_FORMAT" }],
    },
    { name: "Biceps size", id: "whatevs", description: "test" },
    { name: "Quad size", id: "whatevs", description: "test" },
  ];