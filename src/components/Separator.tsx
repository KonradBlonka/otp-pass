"use client"

import { HTMLAttributes } from "react";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
  }
  
export const Separator: React.FC<SeparatorProps> = ({ text, ...otherProps }) => {
    return (
      <div className="separator" {...otherProps}>
        {text}
      </div>
    );
  };