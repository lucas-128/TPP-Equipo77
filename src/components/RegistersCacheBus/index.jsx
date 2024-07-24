import { BaseEdge } from "reactflow";
import {
  registerCacheId,
  cacheMemoryId,
  registersId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const RegistersCacheBus = () => {
  const [edgePath] = usePosition({
    edgeId: registerCacheId,
    sourceComponentId: registersId,
    targetComponentId: cacheMemoryId,
  });

  return (
    <>
      <BaseEdge
        id={"registers-cache"}
        path={edgePath}
        style={{
          stroke: "grey",
          strokeWidth: 20,
        }}
      />
    </>
  );
};
