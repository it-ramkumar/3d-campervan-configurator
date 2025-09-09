  export const interiorDirectionNext = (camPros,setTargetPos) => {
    if (camPros[2] > 1.3) {
      return
    }
    setTargetPos(([x, y, z]) => [x, y, z + 0.3])
  };
