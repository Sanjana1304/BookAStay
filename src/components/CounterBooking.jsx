import React, { useState, useEffect, useRef } from 'react';

const CounterBooking = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    const animate = () => {
      setCount((prevCount) => {
        const increment = Math.ceil(endValue / 100);
        if (prevCount < endValue) {
          return Math.min(prevCount + increment, endValue);
        }
        return prevCount;
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [endValue]);

  return <span className='ml-3 font-bold'>{count}</span>;
};

export default CounterBooking;
