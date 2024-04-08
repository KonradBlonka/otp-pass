"use client"

import { Slot, FakeDash } from "@/components/Slot";
import { OTPInput, SlotProps } from "input-otp";
import { useState } from "react";

type InputList = (number | string)[];

const Home: React.FC<{ inputList: InputList }> = ({ inputList }) => {
  const [otp, setOtp] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Obliczenie sumy liczb podanych w inputList, potrzebnych do maxLength w OTPInput
  // Jeżeli element nie jest liczbą, zwrócić tylko pozostałą sumę
  const totalInputs = inputList.reduce((sum: number, item) => {
    if (typeof item === "number") {
      return sum + item;
    } else {
      return sum;
    }
  }, 0);

  const onSubmit = () => {
    console.log("Values: ", otp);
    setIsValidating(true);
  };

  const renderSlots = () => {
    let currentIndex = 0;
    const renderedSlots: JSX.Element[] = [];

    inputList.forEach((item, idx) => {
      if (typeof item === "number") {
        for (let i = 0; i < item; i++) {
          renderedSlots.push(
            <Slot
              key={`${idx}${i}`}
              isActive={false}
              char={otp ? otp[currentIndex] : ""}
              hasFakeCaret={false}
            />
          );
          currentIndex++;
        }
      } else if (typeof item === "string") {
        renderedSlots.push(<FakeDash key={idx} value={item} />);
      }
    });

    return renderedSlots;
  };

  return (
    <form className="absolute inset-0 flex flex-col justify-center items-center">
      <OTPInput
        onComplete={onSubmit}
        onChange={setOtp}
        value={otp ?? ""}
        maxLength={totalInputs}
        containerClassName="group flex items-center has-[:disabled]:opacity:30"
        render={() => (
          <>
            <div className="flex">
              {renderSlots()}
            </div>
          </>
        )}
      />
    </form>
  );
};

export default Home;