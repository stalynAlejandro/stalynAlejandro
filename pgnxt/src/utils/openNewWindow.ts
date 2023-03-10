export const openNewWindow = (url: string, focus: boolean = true) => {
  const win = window.open(url, '_blank');

  if (win != null && focus) {
    win.focus();
  }
};
