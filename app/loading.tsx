import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader
        absoluteStrokeWidth
        className="animate-spin"
        size={28}
        strokeWidth={2.25}
      />
    </div>
  );
}
