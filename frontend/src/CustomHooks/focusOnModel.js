import * as THREE from "three";


export const focusOnModel = (obj, object3D, camera, controls, duration = 1000, focusSide = 'front') => {
    if (!object3D) {
        console.warn("⚠️ focusOnModel called with null object3D:", obj);
        return;
    }
    if (!object3D || !camera || !controls) return;
object3D.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object3D);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());


    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = obj.type === "countertop" ? maxDim * 3 : (obj.type === "jumpseat" && obj.label === "Jump Seat") ? maxDim * 1.1 : obj.type === "counter-top" ? maxDim * 1 : obj?.type === "backsplash" ? maxDim * 3 : maxDim * 1.5;

    const focusDirections = {
        front: { x: 0, y: 0.5, z: -1 },
        counterTopEx: { x: 0.4, y: 0.5, z: -1 },
        KitchenCabinet: { x: 0.7, y: 0.2, z: -1 },
        wallKabinetDriver: { x: -0.7, y: 0.2, z: -1 },
        back: { x: 0, y: 0.5, z: 0.7 },
        left: { x: -1, y: 0.7, z: 0 },
        right: { x: 1, y: 0.5, z: 0.6 },
        backSplash: { x: 1, y: 0, z: 0.6 },

        top: { x: 0, y: 1, z: 0.1 },
        counterTop: { x: -1, y: 0.7, z: 1 },
        partitionPanel: { x: 1, y: 0, z: 0.7 },
        defaultPosition: { x: -4, y: 3, z: -4.8 },
        swivelseat: { x: 0.5, y: 0.5, z: 0.2 },
        jumpseat: { x: -0.4, y: 0.3, z: 0 },
        lagunTable: { x: -0.4, y: 0.5, z: 0.15 },
        ac: { x: 0.5, y: 1, z: 0.5 },
        kitchen: { x: 3.5, y: 3, z: 0.6 },
    };

    let direction = focusDirections[focusSide] || focusDirections.front;

    // 🔁 Override direction if object type is 'flooring'
    if (obj?.type === 'flooring') {
        direction = focusDirections.front; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'kitchen' || obj?.type === 'appliance') {
        direction = focusDirections.kitchen; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === "shower" || obj?.type === "wall-ceiling" || obj?.type === "wall-ceiling-door-panel" || obj?.type === "wall-panel" || obj?.type === "ladder" || obj?.type === "Popout" || obj?.type === "window") {
        direction = focusDirections.right; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'wall-cabinet-driver') {
        direction = focusDirections.wallKabinetDriver; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'climate-control' || obj?.type === 'ventilation') {
        direction = focusDirections.ac; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'solar') {
        direction = focusDirections.lagunTable; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'counter-top' || obj?.type === 'stove' || obj?.type === "sink-cover") {
        direction = focusDirections.right; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'wall-cabinet-kitchen') {
        direction = focusDirections.KitchenCabinet; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'backsplash') {
        direction = focusDirections.backSplash; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'partition-panel') {
        direction = focusDirections.partitionPanel; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'awning') {
        direction = focusDirections.front; // 👈 Change view to X-axis (side)
    }
    // ---------------------------------------------------------------------------------------------------
    if (obj?.type === 'swivelseat') {
        direction = focusDirections.swivelseat; // 👈 Change view to X-axis (side)
    }
    if (obj?.type === 'jumpseat') {
        direction = focusDirections.jumpseat; // 👈 Change view to X-axis (side)
    }

    if (obj?.label === 'Lagun Table' && obj.type === "jumpseat") {
        direction = focusDirections.lagunTable; // 👈 Change view to X-axis (side)
    }

    const directionVector = new THREE.Vector3(direction?.x, direction?.y, direction?.z)?.normalize();

    const targetPosition = new THREE.Vector3(
        center?.x + directionVector?.x * distance,
        center?.y + directionVector?.y * distance,
        center?.z + directionVector?.z * distance
    );

    const startPosition = camera.position.clone();
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const progress = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        camera.position.lerpVectors(startPosition, targetPosition, progress);

        const startTarget = controls?.target?.clone?.();
        const endTarget = center?.clone?.();

        if (!startTarget || !endTarget) {
            console.warn("❗ startTarget or endTarget is undefined, skipping update");
            return;
        }

        const interpolatedTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, progress);
        controls.target.copy(interpolatedTarget); // 💥 this line causes error if `interpolatedTarget` is bad

        controls.update();

        if (t < 1) requestAnimationFrame(animate);
    };


    animate();
};
