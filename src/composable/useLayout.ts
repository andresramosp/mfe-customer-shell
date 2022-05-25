import { ref } from 'vue'
import useTheme from 'Shell/useTheme'

const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)
const menuClick = ref(false)

const { setUserPreferences, getUserPreferences } = useTheme()

const onWrapperClick = () => {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
  menuClick.value = false
}

const onMenuToggle = (event) => {
  menuClick.value = true

  if (isDesktop()) {
    staticMenuInactive.value = !staticMenuInactive.value
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }

  setUserPreferences({ menuClosed: staticMenuInactive.value })
  event.preventDefault()
}

const onSidebarClick = () => {
  menuClick.value = true
}

const onMenuItemClick = (event) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
}
const addClass = (element, className) => {
  if (element.classList) element.classList.add(className)
  else element.className += ' ' + className
}
const removeClass = (element, className) => {
  if (element.classList) element.classList.remove(className)
  else {
    element.className = element.className.replace(
      new RegExp(
        '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
        'gi'
      ),
      ' '
    )
  }
}
const isDesktop = () => {
  return window.innerWidth >= 992
}

const openMenu = () => {
  staticMenuInactive.value = getUserPreferences().menuClosed
}

export default function useLayout () {
  return {
    onWrapperClick,
    onMenuToggle,
    onSidebarClick,
    onMenuItemClick,
    isDesktop,
    addClass,
    removeClass,
    mobileMenuActive,
    staticMenuInactive,
    openMenu
  }
}
