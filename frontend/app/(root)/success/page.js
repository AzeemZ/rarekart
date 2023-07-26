"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Wrapper from "@/components/Wrapper";

export default function Success() {
  const windowSize = useWindowSize();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(windowSize.width);
    setHeight(windowSize.height);

    console.log("Rerendered!");
  }, [width, height]);

  return (
    <>
      <Confetti
        width={width}
        height={height}
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />
      <div className="my-24 flex items-center">
        <Wrapper>
          <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
            <div className="text-2xl font-bold">
              Thanks for shopping with us!
            </div>
            <div className="text-lg font-bold mt-2">
              Your order has been placed successfully.
            </div>
            <div className="text-base mt-5">
              For any product related query, drop an email to
            </div>
            <div className="underline">rkart@shop.com</div>

            <Link href="/" className="font-bold mt-5">
              Continue Shopping
            </Link>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
