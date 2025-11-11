// Minimal three.js fallback without react-three-fiber to avoid reconciler errors.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!containerRef.current) return;
		const width = containerRef.current.clientWidth;
		const height = containerRef.current.clientHeight;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
		camera.position.z = 3.2;
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		containerRef.current.appendChild(renderer.domElement);

		// Wireframe sphere
		const geometry = new THREE.SphereGeometry(1, 40, 40);
		const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true });
		const globe = new THREE.Mesh(geometry, material);
		scene.add(globe);

		// Resize handling
		const handleResize = () => {
			if (!containerRef.current) return;
			const w = containerRef.current.clientWidth;
			const h = containerRef.current.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener('resize', handleResize);

		let animationFrame: number;
		const animate = () => {
			globe.rotation.y += 0.0015 * 60; // stable speed independent of frame rate
			globe.rotation.x = 0.2;
			renderer.render(scene, camera);
			animationFrame = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', handleResize);
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			if (renderer.domElement.parentNode) {
				renderer.domElement.parentNode.removeChild(renderer.domElement);
			}
		};
	}, []);

	return <div ref={containerRef} className="w-full h-full" />;
}
