export enum LanguageEnum {
  EN = 'en',
  VI = 'vi',
}

export const LanguageNameMapping: {[key in LanguageEnum]: string} = {
  [LanguageEnum.EN]: "English",
  [LanguageEnum.VI]: "Tiếng Việt"
}

export const LanguageVoiceMapping: {[key in LanguageEnum]: string} = {
  [LanguageEnum.EN]: "US English Female",
  [LanguageEnum.VI]: "Vietnamese Male"
}

