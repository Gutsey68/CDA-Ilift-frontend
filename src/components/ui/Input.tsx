import * as React from 'react';
import { cn } from '../../lib/cn';

const Input = ({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-10 w-full rounded-md border border-neutral-6 bg-neutral-1 px-3 py-2 text-sm ring-offset-neutral-1 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
};

export { Input };
