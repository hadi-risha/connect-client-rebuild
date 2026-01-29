// Typed hooks are ONLY for React components (TypeScript doesn’t know:Store shape,Dispatch types ->This file fixes that once, globally)
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from '../app/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
