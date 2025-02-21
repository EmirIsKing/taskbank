import * as Progress from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

function ProgressBar({ value, max, className, indicatorclassName }) {
  return (
    <Progress.Root value={value} max={max} className={`w-[220px] rounded-md ${className}`}>
      <Progress.Indicator
        className={cn(
          `h-full rounded-md transition-all w-full ease-in-out duration-300 ${indicatorclassName}`,
          {
            'bg-base-2': value >= max,
          }
        )}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </Progress.Root>
  );
}

export default ProgressBar;
