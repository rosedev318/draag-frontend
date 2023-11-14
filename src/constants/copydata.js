export const copyToClipboard = async (str) => {
  // console.log('Start copy');
  if (str === undefined || str == null);
  if (isSafari()) {
    if (navigator.clipboard === undefined) {
      return copyByExecCommand(str);
    } else {
      return copyByClipboardApi(str);
    }
  }

  // Other browsers
  const clipboardWritPermissionQueryOps = {
    name: 'clipboard-write'
  };
  navigator.permissions
    .query(clipboardWritPermissionQueryOps)
    .then((permissionStatus) => {
      if (permissionStatus.state === 'granted') {
        return copyByClipboardApi(str);
      } else {
        return copyByExecCommand(str);
      }
    })
    .catch((error) => {
      // couldn't query the permission
      console.error(error);
    });
};

const copyByClipboardApi = async (str) => {
  // console.log('Copy using clipboard API');
  return navigator.clipboard.writeText(str);
};

const copyByExecCommand = async (str) => {
  // console.log('Copy using execCommand');
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  return new Promise((res, rej) => {
    // here the magic happens
    let result = document.execCommand('copy');
    console.log('result:', result);
    res();
    textArea.remove();
  });
};

const isSafari = () => {
  const userAgent = navigator.userAgent;
  return (
    !userAgent.match(/chrome|chromium|crios/i) &&
    !userAgent.match(/firefox|fxios/i) &&
    userAgent.match(/safari/i)
  );
};
