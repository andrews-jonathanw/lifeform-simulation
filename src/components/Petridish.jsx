import { useRef, useEffect } from 'react';
import Lifeform from '../lib/Lifeform';

export default function Petridish() {
  const canvasRef = useRef(null);
  const lifeformsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    context.scale(dpr, dpr);

    const createLifeforms = () => {
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * (rect.width - 10) + 5;
        const y = Math.random() * (rect.height - 10) + 5;
        const color = i % 2 === 0 ? 'red' : 'blue';
        lifeformsRef.current.push(new Lifeform(x, y, color));
      }
    };


    if (lifeformsRef.current.length === 0) {
      createLifeforms();
    }

    let animationFrameId;
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      lifeformsRef.current.forEach(lifeform => {
        lifeform.attract(lifeformsRef.current, 'red', 200);
        lifeform.repel(lifeformsRef.current, 'blue', 200);

        lifeform.separate(lifeformsRef.current);
        lifeform.applyVelocity();
        lifeform.applyBoundaries(rect.width, rect.height);
        lifeform.draw(context);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas className='canvas' ref={canvasRef}/>
  );
}


