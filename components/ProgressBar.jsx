import * as Progress from '@radix-ui/react-progress';

function ProgressBar({ value, max, className, indicatorclassName }) {
  return (
    <Progress.Root value={value} max={max} className={`w-full rounded-md ${className}`}>
      <Progress.Indicator 
        className={`h-full rounded-md transition-all ease-in-out duration-300 ${indicatorclassName}`}
        style={{ width: '70%' }} 
      />
    </Progress.Root>
  );
}

export default ProgressBar;
