import {AxiosError} from "axios";

export const getMessageFromAxiosError =
  (error: AxiosError): string =>
    error.response?.data.error.message || 'response is badly formed';

const capitalize = (word: string) => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word;

export const getErrorFromAxiosError = (error: AxiosError): Error => new Error(capitalize(getMessageFromAxiosError(error)));
