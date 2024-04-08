"use client"

import { Slot, FakeDash } from "@/components/Slot";
import { OTPInput } from "input-otp";
import { useState } from "react";


type InputList = (number | string)[];

const Home: React.FC<{ inputList: InputList }> = ({ inputList }) => {
  const [otp, setOtp] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);



  const onSubmit = () => {
    console.log("Values: ", otp);
    setIsValidating(true);
  };

  const renderSlots = () => {
    let currentIndex = 0;
    const slots: JSX.Element[] = [];
    inputList.forEach((item, idx) => {
      if (typeof item === "number") {
        for (let i = 0; i < item; i++) {
          slots.push(
            <Slot
              key={`${idx}${i}`}
              isActive={false}
              char={otp ? otp[currentIndex] : ""}
              hasFakeCaret={true}
            />
          );
          currentIndex++; // Zwiększa indeks po dodaniu cyfry do `otp`
        }
      } else if (typeof item === "string") {
        slots.push(<FakeDash key={`${idx}`} />);
      }
    });
    return slots;
  };

  return (
    <form className="absolute inset-0 flex flex-col justify-center items-center">
      <OTPInput
        onComplete={onSubmit}
        onChange={setOtp}
        value={otp ?? ""}
        maxLength={12}
        containerClassName="group flex items-center has-[:disabled]:opacity:30"
        render={({ slots }) => <>{renderSlots()}</>}
      />
    </form>
  );
};

export default Home;