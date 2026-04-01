 export const cameraDirectionBack = (camPros,setTargetPos) => {
    if (camPros[2] < -2) {
      return
    }
    setTargetPos(([x, y, z]) => [x, y, z - 0.3]);
  }
