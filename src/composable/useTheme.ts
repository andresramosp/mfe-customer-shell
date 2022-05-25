import { watchEffect, computed, ref } from "vue";

interface userPrefs {
  theme: string;
  menuClosed: boolean;
  language: string;
}

const userPrefsDefault: userPrefs = {
  theme: "md-light-deeppurple",
  menuClosed: false,
  language: "es-ES",
};

const getUserPreferences = () =>
  localStorage.getItem("userPreferences")
    ? JSON.parse(localStorage.getItem("userPreferences") || "")
    : userPrefsDefault;

const setUserPreferences = (val) => {
  const userPreferences: userPrefs = getUserPreferences();
  localStorage.setItem(
    "userPreferences",
    JSON.stringify({ ...userPreferences, ...val })
  );
};

const themeStore = getUserPreferences().theme || "md-light-deeppurple";
const theme = ref(themeStore);

watchEffect(() => {
  const oldElement = document.getElementById("theme-link");
  if (oldElement) document.head.removeChild(oldElement);
  const element = document.createElement("link");
  element.id = "theme-link";
  element.rel = "stylesheet";
  element.href = `${import.meta.env.VITE_APP_PUBLIC_PATH}/themes/${
    theme.value
  }/theme.css`;
  document.head.appendChild(element);
});

const switchTheme = () => {
  console.log("cambia tema");
  const newTheme =
    theme.value === "md-dark-deeppurple"
      ? "md-light-deeppurple"
      : "md-dark-deeppurple";
  theme.value = newTheme;

  setUserPreferences({ theme: theme.value });
};

const isDarkTheme = computed<boolean>(() => {
  return theme.value.includes("dark");
});

const logoPath = computed<string>(() => {
  return (
    import.meta.env.VITE_APP_PUBLIC_PATH +
    (isDarkTheme.value ? "images/iris_morado.svg" : "images/iris_morado.svg")
  );
});

export default function useTheme() {
  return {
    theme,
    isDarkTheme,
    switchTheme,
    logoPath,
    setUserPreferences,
    getUserPreferences,
  };
}
