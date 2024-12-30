import type { RootState } from '@/src/store/store';

import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
