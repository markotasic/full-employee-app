import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useDelay = (showModal, closeDrawer) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeDrawer();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal, closeDrawer, dispatch]);
};

export default useDelay;
