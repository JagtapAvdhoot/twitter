import { create } from 'zustand';

export const localStorageThemeName = 'twt_theme_v1';
export const localStorageAccentName = 'twt_accent_v1';
export const localStorageFontSizeName = 'twt_fontSize_v1';

const globalStore = create((set,get) => ({
    fontSize: localStorage.getItem(localStorageFontSizeName) ?? "16px",
    accent: localStorage.getItem(localStorageAccentName) ?? "blue",
    theme: localStorage.getItem(localStorageThemeName) ?? "light",
    changeAccent: (accent) => {
        localStorage.setItem(localStorageAccentName, accent)
        set({ accent: accent })
    },
    changeTheme: (theme) => {
        localStorage.setItem(localStorageThemeName, theme)
        set({ theme: theme })
    },
    changeFontSize: (fontSize) => {
        localStorage.setItem(localStorageFontSizeName, fontSize)
        set({ fontSize })
    }
}));


export default globalStore;

export const globalStoreSelector = state => state;