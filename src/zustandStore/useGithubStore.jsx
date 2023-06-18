import { create } from 'zustand';

const useGithubStore = create((set) => ({
    client_id: 'd9f4003010dee1bf18f1',
    redirect_uri: 'http://localhost:3000/',
    proxy_url: '',
    client_secret: '8f7f0cf5c4c6edb5b28ae65350e411b413ab14c7',
    gitusername: '',
    gitfirstname: '',
    gitlastname: '',
    gitprofilepic: '',
    gitemail: '',
    initfirstname: (firstname) => set(() => ({gitfirstname: firstname})),
    initlastname: (lastname) => set(() => ({gitlastname: lastname})),
    initusername: (username) => set(() => ({gitusername: username})),
    initemail: (email) => set(() => ({gitemail: email})),
    initprofilepic: (profilepic) => set(() => ({gitprofilepic: profilepic})),
}));

export default useGithubStore;