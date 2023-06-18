import {create} from 'zustand';
import axios from "axios";
import {devtools, persist} from 'zustand/middleware';

let store = (set, get) => ({
    loggedIn: '',
    userInfo: [],
    data: [],
    isLoading: false,
    error: null,
    getEmployees: async () => {
        const url = `https://hrconnectapi.onrender.com/employees/files`;
        try {
          const employeeData = await axios.get(url).then((res) => {
            console.log(res.data);
            set({data: res.data});
          });
         console.log(employeeData);
        } catch (error) {
          console.log(error);
        }
    },
    getLoggedInUser: async (id) => {
        const user_id = id;
        set({loggedIn: user_id});
        const url = `https://hrconnectapi.onrender.com/user/${user_id}`;
        try {
            const userData = await axios.get(url).then((res) => {
                console.log(res.data);
                set({userInfo: res.data});
            })
            console.log(userData);
        } catch (error) {
            console.log(error);
        }
    }
})

store = devtools(store);
store = persist(store, {name: 'user_settings'});

export const useGoogleStore = create(store);

/* db.books.find({userid: `{loggedinuser}`})) */

