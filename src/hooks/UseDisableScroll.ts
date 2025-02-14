import { useEffect } from "react";

function useDisableScroll(){
  useEffect(() => {
    const disableScroll = (e: Event) => e.preventDefault();
    
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);
};

export default useDisableScroll;