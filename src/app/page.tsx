"use client"

import { Slot, FakeDash } from "@/components/Slot";
import { Button } from "@/components/ui/button";
import { OTPInput } from "input-otp";
import { useState } from "react";

type InputList = (number | string)[];

const Home: React.FC<{ inputList: InputList }> = ({ inputList }) => {
  const [otp, setOtp] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleOtpChange = (value: string | null) => {
    setOtp(value);
  };

  const buildAlertMessage = () => {
    let message = "";
    let currentIndex = 0; // Zmienna śledząca bieżący indeks w `otp`
  
    inputList.forEach((item) => {
      // wartości otp muszą się znaleźć w przedziałach item
      if (typeof item === "number") {
        // Sprawdź, czy `otp` jest zdefiniowane i czy ma odpowiednią długość
        if (otp && currentIndex + item <= otp.length) {
          // Pobierz fragment `otp` od bieżącego indeksu do indeksu + item
          message += otp.slice(currentIndex, currentIndex + item);
          // Zaktualizuj bieżący indeks o wartość `item`
          currentIndex += item;
        }
      } else if (typeof item === "string") {
        message += item;
      }
    });
    return message;
  };

  const handleAlertMessage = () => {
    const message = buildAlertMessage();
    alert(message);
  }

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

    inputList.forEach((item, index) => {
      if (typeof item === "number") {
        for (let i = 0; i < item; i++) {
          
          let isActive = currentIndex === otp?.length;

          renderedSlots.push(
            <Slot
              key={`${index}${i}`}
              isActive={isActive}
              char={otp ? otp[currentIndex] : ""}
              hasFakeCaret={isActive}
              
            />
          );
          currentIndex++;
        }
      } else if (typeof item === "string") {
        renderedSlots.push(<FakeDash key={index} value={item} />);
      }
    });
    return renderedSlots;
  };

  return (
    <form className="absolute inset-0 flex flex-col justify-center items-center">
      <OTPInput
        onComplete={onSubmit}
        onChange={handleOtpChange}
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
      <Button className="mt-5" disabled={!isValidating} onClick={handleAlertMessage}>Submit</Button>
    </form>
  );
};

export default Home;