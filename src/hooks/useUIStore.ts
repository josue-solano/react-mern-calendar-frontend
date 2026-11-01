import { onCloseDateModal, onOpenDateModal, type RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useUIStore = () => {
  const dispatch = useDispatch();

  // const { isDateModalOpen } = useSelector<RootState, RootState['ui']>(state => state.ui);
  const isDateModalOpen = useSelector(
    (state: RootState) => state.ui.isDateModalOpen,
  );

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    // Properties
    isDateModalOpen,

    // Methods
    openDateModal,
    closeDateModal,
  };
};
