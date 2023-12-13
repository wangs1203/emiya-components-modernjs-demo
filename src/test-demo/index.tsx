import { useId, useMemo } from 'react';

const letters = ['a', 'b', 'c', ['d', 'e', ['f', 'g']]];

const TestDemo = () => {
  const a = 1;
  const id = useId();
  const data = useMemo(() => {
    return letters.flat(2);
  }, []);

  return (
    <div className="h-12 w-48">
      <p className="text-xl font-medium text-black">Test Demo</p>
      <p className="text-xl">{a}</p>
      <p className="text-xl">{id}</p>
      <p className="text-xl font-medium text-black p-0 m-0">{data.join()}</p>
    </div>
  );
};

export default TestDemo;
