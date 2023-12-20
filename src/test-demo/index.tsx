import { useId, useMemo } from 'react';

const letters = ['a', 'b', 'c', ['d', 'e', ['f', 'g']]];

const TestDemo = () => {
  const a = 1;
  const id = useId();
  const data = useMemo(() => {
    return letters.flat(2);
  }, []);

  return (
    <div className="tw-h-12 tw-w-48">
      <p className="tw-text-xl tw-font-medium tw-text-black">Test Demo</p>
      <p className="tw-text-xl">{a}</p>
      <p className="tw-text-xl">{id}</p>
      <p className="tw-text-xl tw-font-medium tw-text-black tw-p-0 tw-m-0">
        {data.join()}
      </p>
    </div>
  );
};

export default TestDemo;
