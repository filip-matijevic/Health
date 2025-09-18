import { useEffect, useRef, useState } from "react";
import ToggleBarButton from "./ToggleBar/ToggleBarButton";
import { ExclamationSvg, FeedSvg, FileDetailsSvg, RulerSvg, UserSettingsSvg } from "../../../icons/Icons";

export default function LGNavigationBar() {
  const [selected, setSelected] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [knobPlaying, setKnobPlaying] = useState(false);
  let focusKnobWidth : number = 100;

  function ResetAnimation() {
    setKnobPlaying(false); // remove to reset
    requestAnimationFrame(() => setKnobPlaying(true)); // re-add next frame
  }

  useEffect(() => {
    console.log(selected);

    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll("button");
    const buttonRect = buttons[selected].getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    focusKnobWidth = containerRect.width/buttons.length
    console.log(containerRect.left)
    console.log(buttonRect.left)
    setIndicatorPosition(
        -containerRect.width/2 + (buttonRect.left - containerRect.left) + buttonRect.width/2
    );
  }, [selected]);

  function SetActive(index : number){
    console.log("setting active " + index);
    setSelected(index);
    ResetAnimation();
  }

  return (
    <nav className="fixed bottom-2 flex justify-center space-x-2">
      <div
        className="h-full flex-1 bg-white/0 shadow-inset shadow-white/20 rounded-full justify-center flex flex-row items-center"
        ref={containerRef}
      >
        <div
          className={`absolute w-19 h-14 
            
            pointer-events-none 
            transition-all ease-in-out duration-200`}
          style={{ transform: `translateX(${indicatorPosition}px)` }}
        >
          <div
            className={`h-full w-full 
            shadow-inset shadow-white/20 rounded-full bg-light-a0/20  ${
              knobPlaying ? "animate-squish-300" : ""
            }`}
            onAnimationEnd={() => setKnobPlaying(false)}
          ></div>
        </div>
        <ToggleBarButton onSelect={SetActive} index={0} icon={<FeedSvg/>}/>
        <ToggleBarButton onSelect={SetActive} index={1} icon={<RulerSvg/>}/>
        <ToggleBarButton onSelect={SetActive} index={2} icon={<FileDetailsSvg/>}/>
        <ToggleBarButton onSelect={SetActive} index={3} icon={<UserSettingsSvg/>}/>
      </div>
      {/* <div className="h-15 w-15 bg-white/0 shadow-inner shadow-white/20 rounded-full"></div> */}
    </nav>
  );
}
