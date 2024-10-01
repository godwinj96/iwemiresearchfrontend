import { useNavigate } from 'react-router-dom';

export const useScrollToTop = () => {
  const navigate = useNavigate();

  const scrollToTop = (path, state = {}) => {
    navigate(path, { state });
    window.scrollTo(0, 0);
  };

  return scrollToTop;
};