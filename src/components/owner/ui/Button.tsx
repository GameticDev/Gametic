
// import React, { ButtonHTMLAttributes } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'danger' | 'success';
//   size?: 'sm' | 'md' | 'lg';
//   isLoading?: boolean;
//   fullWidth?: boolean;
// }

// const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = 'primary',
//   size = 'md',
//   isLoading = false,
//   fullWidth = false,
//   className = '',
//   disabled,
//   ...props
// }) => {
//   // Base classes
//   const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

//   // Variant classes
//   const variantClasses = {
//     primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//     secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
//     danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
//     success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
//   };

//   // Size classes
//   const sizeClasses = {
//     sm: 'px-3 py-1.5 text-sm',
//     md: 'px-4 py-2 text-base',
//     lg: 'px-6 py-3 text-lg',
//   };

//   // Width classes
//   const widthClass = fullWidth ? 'w-full' : '';

//   // Disabled state
//   const disabledClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '';

//   return (
//     <button
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses} ${className}`}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading ? (
//         <span className="flex items-center justify-center">
//           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Loading...
//         </span>
//       ) : (
//         children
//       )}
//     </button>
//   );
// };

// export default Button;







"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

