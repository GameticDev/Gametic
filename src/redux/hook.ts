import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed version of useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Optional: Typed version of useSelector (recommended too!)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
