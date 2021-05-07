import { useCallback } from "react";
import { useIntl } from "react-intl";

const useTranslate = (locale) => {
  const intl = useIntl();

  const t = useCallback((id, defaultMessage, values = {}) => {
    return intl.formatMessage({ id, defaultMessage }, values);
  }, [intl])

  if (locale) {
    return [t, intl.locale]
  }

  return t;
}

export default useTranslate;
