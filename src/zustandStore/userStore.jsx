import { create } from 'zustand'

const useUserStore = create((set) => ({
  bears: 0,
  nfirstname: "",
  n_user_lastname: "",
  n_user_pic: "",
  n_user_email: "",
  updateFirstname: (firstname) => set({nfirstname:  firstname}),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

}))

export default useUserStore;