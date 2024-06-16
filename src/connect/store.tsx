import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { accountApi } from './authApi/accountApi';
import { pathsApi } from './pathsApi/pathsApi';

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        [pathsApi.reducerPath]: pathsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat([
            accountApi.middleware,
            pathsApi.middleware,
    ])
});

setupListeners(store.dispatch)

// type AppStore = typeof store
// type AppDispatch = AppStore['dispatch']

// //export const { setShowMenu } = menuStorage.actions 

// export type RootState = ReturnType<AppStore['getState']>
// export const useAppDispatch: () => AppDispatch = useDispatch