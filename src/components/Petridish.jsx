import { useRef, useEffect } from 'react';
import Lifeform from '../lib/Lifeform';

export default function Petridish() {
  const canvasRef = useRef(null);
  const lifeforms = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      lifeforms.push(new Lifeform(x, y));
    }

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, width, height);
      lifeforms.forEach(lifeform => {
        lifeform.move();
        lifeform.draw(context);
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [lifeforms]);


  return (
    <canvas className='canvas' ref={canvasRef}/>
  )
}
