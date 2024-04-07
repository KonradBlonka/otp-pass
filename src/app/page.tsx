"use client"

import { Separator } from "@/components/Separator";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

interface InputItem {
  type: 'number' | 'separator';
  value?: number;
  separator?: string | null;
}

const generateInputGroups = (inputList: InputItem[]) => {
  const groups: React.ReactNode[] = [];
  let currentGroup: React.ReactNode[] = [];

  inputList.forEach((item, index) => {
    if (item.type === 'number' && typeof item.value === 'number') {
      // Tworzymy nową tablicę za pomocą Array(n).fill()
      const slots = Array(item.value).fill(null).map((_, slotIndex) => (
        <div key={index + slotIndex}>
          <InputOTPSlot index={index + slotIndex} /> 
        </div>
      ));
      currentGroup.push(...slots);  // Dołączamy wygenerowane sloty do grupy
    } 
  }); 

  // Dodanie ostatniej grupy
  if (currentGroup.length > 0) {
    groups.push(<InputOTPGroup key={groups.length}>{currentGroup}</InputOTPGroup>);
  }

  return groups;
};

export default function Home() {
  const [inputList] = useState<InputItem[]>([
    { type: 'number', value: 3 },
    { type: 'separator', separator: '-' },
    { type: 'number', value: 7 },
    { type: 'separator', separator: '=' },
    { type: 'number', value: 2 },
  ]);

  return (
    <InputOTP maxLength={inputList.reduce((a, b) => (typeof b === 'number' ? a + b : a), 0)}>
      {generateInputGroups(inputList)}
    </InputOTP>
  );
}