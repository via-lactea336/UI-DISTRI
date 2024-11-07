import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

type handleClickParams = (
  e:
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  url: string
) => void;

export const useViewTransition = () => {
  const navigate = useNavigate();
  const handleClick: handleClickParams = (e, url) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      navigate(url);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        const anchor = (e.target as HTMLElement).closest("a");
        if (!anchor) return;
        navigate(
          (e.target as HTMLElement)
            .closest("a")!
            .href.slice(window.location.origin.length)
        );
      });
    });
  };
  return { handleClick };
};

export default useViewTransition;
