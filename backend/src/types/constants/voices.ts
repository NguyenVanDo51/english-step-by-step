export const Voices: { [key in string]: string } = {
  UKEnglishFemale: 'UK English Female',
  UKEnglishMale: 'UK English Male',
  USEnglishFemale: 'US English Female',
  USEnglishMale: 'US English Male',
}

export const VoiceDefault = "US English Male"

export const VoiceOptions = Object.keys(Voices).map((key) => ({ value: key, label: Voices[key] }))
