import * as THREE from 'three';

export function updateTexture(appState) {
    const ctx = appState.textureContext;
    if (!ctx) return;

    const intensitySlider = document.getElementById('intensitySlider');
    const intensity = intensitySlider ? intensitySlider.value : 1.0;
    const finalColor = appState.selectedColor.clone();

    if (intensity < 1) {
        finalColor.lerp(new THREE.Color(0x000000), 1 - intensity);
    }

    ctx.fillStyle = `#${finalColor.getHexString()}`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    appState.tattooLayers.forEach(layer => {
        if (!layer.visible) return;

        const size = ctx.canvas.width * layer.size;
        // Use the UV property for positioning
        const x = layer.uv.x * ctx.canvas.width;
        const y = (1 - layer.uv.y) * ctx.canvas.height;

        ctx.save();
        ctx.globalAlpha = layer.opacity;
        ctx.translate(x, y);
        ctx.rotate(layer.rotation * Math.PI / 180);
        ctx.drawImage(layer.image, -size / 2, -size / 2, size, size);
        ctx.restore();
    });

    if (appState.texture) appState.texture.needsUpdate = true;
}