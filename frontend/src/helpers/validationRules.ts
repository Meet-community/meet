export const isNotEmpty = <V>(value: V) => !!value && !(/^\s*$/.test(String(value)));

export const isEmail = <V>(value: V) => {
  const regExp = new RegExp(/^[^\s]+@[^\s]+\.[^\s]+$/);

  return regExp.test(String(value));
};

export const isLink = <V>(value: V) => {
  const regExp = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._s+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);

  return regExp.test(String(value));
};

export const isLinkIfNotEmpty = <V>(value: V) => {
  const regExp = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._s+~#=]{2,256}\.[a-z]{2,8}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);

  return regExp.test(String(value)) || !value;
};

export const isYouTubeVideoLink = <V>(value: V) => {
  const regExp = new RegExp(/^(?:http(s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=([-a-zA-Z0-9@:%._s+~#=]+)|youtu\.be\/([-a-zA-Z0-9@:%._s+~#=]+))(?:&.*)?/);

  return regExp.test(String(value)) || !value;
};

export const isTelegramProfileLink = <V>(value: V) => {
  const regExp = new RegExp(/^(?:http(s)?:\/\/)?(www\.)?(?:t\.me\/([a-zA-Z0-9_]+))(?:&.*)?/);

  return regExp.test(String(value)) || !value;
};

export const isLinkedInProfileLink = <V>(value: V) => {
  const regExp = new RegExp(/^(?:http(s)?:\/\/)?(www\.)?(?:linkedin\.com\/in\/([a-zA-Z0-9_-]+))(?:&.*)?/);

  return regExp.test(String(value)) || !value;
};

export const isPhoneNumber = <V>(value: V) => {
  const regExp = new RegExp(/^[+][0-9]{1,3}[\s/0-9]{2,4}[\s/0-9]{2,8}[\s/0-9][\s/0-9]/);
  const regExpWithScopes = new RegExp(/^[+][0-9]{1,2}[\s]*[(]?[0-9]{3}[)]?[\s/0-9]{3}[\s/0-9]{3}[\s/0-9][\s/0-9]/);

  return regExp.test(String(value)) || regExpWithScopes.test(String(value));
};

export const isValidPassword = <V>(value: V) => {
  const str = String(value) || '';

  return str.length >= 7;
};

export const minValue = (min: number) => <V>(value: V) => Number(value) >= min;

export const maxValue = (max: number) => <V>(value: V) => Number(value) <= max;

export const minArrayValue = (min: number) => (
  <V>(value: V) => {
    if (value instanceof Array) {
      return (minValue(min))(value.length);
    }

    return true;
  }
);

export const maxArrayValue = (max: number) => (
  <V>(value: V) => {
    if (value instanceof Array) {
      return (maxValue(max))(value.length);
    }

    return true;
  }
);

export const hasNoSpaces = <V>(value: V) => {
  const regExp = new RegExp(/^\S+$/);

  return regExp.test(String(value));
};

export const isValidForSlug = <V>(value: V) => {
  const regExp = new RegExp(/^[a-zA-Z-._~\s\d]*$/);

  return regExp.test(String(value)) || !value;
};

export const hasOnlyLetters = <V>(value: V) => {
  const regExp = new RegExp(/^[a-zA-Z]+$/);

  return regExp.test(String(value)) || !value;
};

export const isImageUrlAndNoEmpty = <V>(value: V) => {
  const regExp = new RegExp(/(https?:\/\/.*\.(?:png|jpg|jpeg|svg))/i);

  return regExp.test(String(value)) || !value;
};

export const isValidForFileName = <V>(value: V) => {
  const regExp = new RegExp(/^[a-zA-Z_.]*$/);

  return regExp.test(String(value)) || !value;
};
