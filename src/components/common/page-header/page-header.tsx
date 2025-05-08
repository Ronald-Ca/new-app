import * as React from 'react';
import { Button } from '@app/components/ui/button';

interface PageHeaderProps {
  title: React.ReactNode;
  titleIcon?: React.ReactNode;
  buttonText: React.ReactNode;
  buttonIcon?: React.ReactNode;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
}

export function PageHeader({
  title,
  titleIcon,
  buttonText,
  buttonIcon,
  onButtonClick,
  className = '',
  titleClassName = '',
  buttonClassName = '',
}: PageHeaderProps) {
  return (
    <div
      className={`mb-6 flex items-center justify-between ${className}`.trim()}
    >
      <h2
        className={`text-2xl font-bold text-cyan-400 flex items-center gap-2 ${
          titleClassName
        }`.trim()}
      >
        {titleIcon && (
          <span className="bg-cyan-500/10 p-2 rounded-md">
            {titleIcon}
          </span>
        )}
        {title}
      </h2>
      <Button
        onClick={onButtonClick}
        className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white ${
          buttonClassName
        }`.trim()}
      >
        {buttonIcon && (
          <span className="mr-1 flex items-center">
            {buttonIcon}
          </span>
        )}
        {buttonText}
      </Button>
    </div>
  );
}

export default PageHeader;
