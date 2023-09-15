import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import authReducer, { signUp, signIn, signOut } from './authSlice';

const mockUser = {
   email: 'mn@gmail.com',
   password: '123'
};

describe('authSlice', () => {
   let store: Store;

   beforeEach(() => {
      store = configureStore({
         reducer: authReducer
      });
   });

   afterEach(() => {
      store.dispatch(signOut() as any);
   });

   it('should sign up a new user', async () => {
      const action = signUp(mockUser);
      await store.dispatch(action as unknown as AnyAction);
      expect(store.getState().user).not.toBeNull();
   });

   it('should sign in an existing user', async () => {
      const signUpAction = signUp(mockUser);
      await store.dispatch(signUpAction as unknown as AnyAction);

      const signInAction = signIn(mockUser);
      await store.dispatch(signInAction as unknown as AnyAction);

      expect(store.getState().user).not.toBeNull();
   });

   it('should sign out a signed in user', async () => {
      const signUpAction = signUp(mockUser);
      await store.dispatch(signUpAction as unknown as AnyAction);

      const signInAction = signIn(mockUser);
      await store.dispatch(signInAction as unknown as AnyAction);

      expect(store.getState().user).not.toBeNull();

      const signOutAction = signOut();
      await store.dispatch(signOutAction as unknown as AnyAction);

      expect(store.getState().user).toBeNull();
   });
});
