import React from "react";

export default function useBottom() {
  const [isBottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 50;
      setBottom(isBottom);
      console.log(isBottom);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isBottom;
}
