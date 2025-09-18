import { GlassSurface } from "../../../primitives/Rounded";

export default function MeasurementDetails() {
  return (
    <div className="space-y-2 flex flex-col items-end">
      <div className="space-x-2 flex flex-row justify-end items-center w-full">
        <GlassSurface className="w-26 h-11 rounded-full">
        </GlassSurface>
        <GlassSurface className="w-11 h-11 rounded-full"></GlassSurface>
      </div>
      <GlassSurface className="w-full rounded-3xl p-2 space-y-2 flex flex-col justify-center items-end">
        <div className="space-x-2 flex flex-row justify-between items-center w-full">
          <GlassSurface className="w-26 h-11 rounded-full bg-white/10  text-center">
            D W M Y
          </GlassSurface>
          <GlassSurface className="w-11 h-11 rounded-full bg-white/10"></GlassSurface>
        </div>
        <div className="w-full h-44 border-1 border-dashed border-white/20"></div>
        <GlassSurface className="w-30 h-15 rounded-full bg-white/10"></GlassSurface>
      </GlassSurface>
    </div>
  );
}
