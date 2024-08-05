interface Window {
  SpeechRecognition?: any
  webkitSpeechRecognition?: any
  annyang?: any
  navigator?: any
}

interface ResponsiveVoiceOption {
  pitch?: number
  rate?: number
  volume?: number
  onstart?: () => void
  onend?: () => void
  getVoices?: () => unknown
  isPlaying?: () => boolean
}

interface ResponsiveVoice {
  version: '1.8.3'
  setDefaultVoice: (voice: string) =>void
  responsivevoices: [
    {
      name: 'UK English Female'
      flag: 'gb'
      gender: 'f'
      lang: 'en-GB'
      voiceIDs: [3, 7, 171, 201, 5, 1, 528, 257, 286, 342, 258, 287, 343, 8]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google UK English Female'
        }
      }
    },
    {
      name: 'UK English Male'
      flag: 'gb'
      gender: 'm'
      lang: 'en-GB'
      voiceIDs: [0, 277, 202, 75, 4, 2, 256, 285, 341, 159]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google UK English Male'
        }
      }
    },
    {
      name: 'US English Female'
      flag: 'us'
      gender: 'f'
      lang: 'en-US'
      voiceIDs: [432, 433, 434, 40, 41, 42, 383, 205, 204, 43, 481, 173, 235, 283, 339, 408, 44]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Microsoft Zira - English (United States)'
          lang: 'en-US'
        }
      }
    },
    {
      name: 'US English Male'
      flag: 'us'
      gender: 'm'
      lang: 'en-US'
      voiceIDs: [431, 39, 234, 282, 338, 236, 284, 340, 2, 4, 0, 75, 195, 169]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google US English'
          timerSpeed: 1
        }
      }
    },
    {
      name: 'Arabic Male'
      flag: 'ar'
      gender: 'm'
      lang: 'ar-SA'
      voiceIDs: [96, 95, 97, 196, 388]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Arabic Male'
          lang: 'ar'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Arabic Female'
      flag: 'ar'
      gender: 'f'
      lang: 'ar-SA'
      voiceIDs: [483, 98]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Arabic'
          lang: 'ar'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Armenian Male'
      flag: 'hy'
      gender: 'f'
      lang: 'hy-AM'
      voiceIDs: [99]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Armenian'
          lang: 'hy'
          fallbackvoice: true
          service: 'g5'
          gender: 'male'
        }
      }
    },
    {
      name: 'Australian Female'
      flag: 'au'
      gender: 'f'
      lang: 'en-AU'
      voiceIDs: [495, 415, 276, 201, 87, 5, 88]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Australian Female'
          lang: 'en-AU'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Australian Male'
      flag: 'au'
      gender: 'm'
      lang: 'en-AU'
      voiceIDs: [86, 386]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Australian Male'
          lang: 'en-AU'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Bangla Bangladesh Female'
      flag: 'bd'
      gender: 'f'
      lang: 'bn-BD'
      voiceIDs: [435]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Bangla Bangladeh Female'
          lang: 'bn-BD'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Bangla Bangladesh Male'
      flag: 'bd'
      gender: 'm'
      lang: 'bn-BD'
      voiceIDs: [485, 410, 436]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Bangla Bangladeh Male'
          lang: 'bn-BD'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Bangla India Female'
      flag: 'bd'
      gender: 'f'
      lang: 'bn-IN'
      voiceIDs: [447]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Bangla India Female'
          lang: 'bn-IN'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Bangla India Male'
      flag: 'bd'
      gender: 'm'
      lang: 'bn-IN'
      voiceIDs: [492, 411, 448]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Bangla India Male'
          lang: 'bn-IN'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Brazilian Portuguese Female'
      flag: 'br'
      gender: 'f'
      lang: 'pt-BR'
      voiceIDs: [245, 124, 123, 125, 499, 186, 223, 126]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google português do Brasil'
        }
      }
    },
    {
      name: 'Brazilian Portuguese Male'
      flag: 'br'
      gender: 'm'
      lang: 'pt-BR'
      voiceIDs: [315, 332, 371, 399]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Brazilian Portuguese Male'
          lang: 'pt-BR'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Chinese Female'
      flag: 'cn'
      gender: 'f'
      lang: 'zh-CN'
      voiceIDs: [249, 58, 59, 452, 380, 281, 231, 155, 60, 513, 191, 268, 297, 353, 269, 298, 354, 409, 61]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google 普通话（中国大陆）'
        }
      }
    },
    {
      name: 'Chinese Male'
      flag: 'cn'
      gender: 'm'
      lang: 'zh-CN'
      voiceIDs: [317, 334, 373, 389]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Chinese'
          lang: 'zh-CN'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Chinese (Hong Kong) Female'
      flag: 'hk'
      gender: 'f'
      lang: 'zh-HK'
      voiceIDs: [463, 464, 192, 193, 232, 250, 251, 270, 299, 355, 409, 444, 252]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google 粤語（香港）'
        }
      }
    },
    {
      name: 'Chinese (Hong Kong) Male'
      flag: 'hk'
      gender: 'm'
      lang: 'zh-HK'
      voiceIDs: [430, 318, 335, 374, 445, 390]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Cantonese Hong Kong Male'
          lang: 'yue-HK'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Chinese Taiwan Female'
      flag: 'tw'
      gender: 'f'
      lang: 'zh-TW'
      voiceIDs: [469, 194, 233, 253, 254, 305, 322, 361, 384, 319, 336, 375, 409, 255]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google 粤語（香港）'
        }
      }
    },
    {
      name: 'Chinese Taiwan Male'
      flag: 'tw'
      gender: 'm'
      lang: 'zh-TW'
      voiceIDs: [320, 337, 376, 391]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Chinese TW'
          lang: 'zh-TW'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Czech Female'
      flag: 'cz'
      gender: 'f'
      lang: 'cs-CZ'
      voiceIDs: [504, 412, 101, 100, 102, 197, 103]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Czech'
          lang: 'cs'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Czech Male'
      flag: 'cz'
      gender: 'm'
      lang: 'cs-CZ'
      voiceIDs: [161]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Czech Male'
          lang: 'cs'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Danish Female'
      flag: 'dk'
      gender: 'f'
      lang: 'da-DK'
      voiceIDs: [474, 413, 105, 104, 106, 198, 107]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Danish'
          lang: 'da'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Danish Male'
      flag: 'da'
      gender: 'm'
      lang: 'da-DK'
      voiceIDs: [162]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Danish Male'
          lang: 'da'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Deutsch Female'
      flag: 'de'
      gender: 'f'
      lang: 'de-DE'
      voiceIDs: [27, 28, 29, 30, 78, 170, 275, 199, 31, 502, 261, 290, 346, 262, 291, 347, 32]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google Deutsch'
        }
      }
    },
    {
      name: 'Deutsch Male'
      flag: 'de'
      gender: 'm'
      lang: 'de-DE'
      voiceIDs: [307, 324, 363, 377, 393]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Deutsch Male'
          lang: 'de'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Dutch Female'
      flag: 'nl'
      gender: 'f'
      lang: 'nl-NL'
      voiceIDs: [243, 219, 84, 157, 158, 496, 184, 45]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google Nederlands'
        }
      }
    },
    {
      name: 'Dutch Male'
      flag: 'nl'
      gender: 'm'
      lang: 'nl-NL'
      voiceIDs: [157, 220, 407]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Dutch Male'
          lang: 'nl'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Estonian Male'
      flag: 'ee'
      gender: 'm'
      lang: 'et-EE'
      voiceIDs: [476, 416, 446]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Estonian Male'
          lang: 'et-EE'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Filipino Female'
      flag: 'ph'
      gender: 'f'
      lang: 'fil-PH'
      voiceIDs: [507, 418, 437]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Filipino Female'
          lang: 'fil-PH'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Finnish Female'
      flag: 'fi'
      gender: 'f'
      lang: 'fi-FI'
      voiceIDs: [490, 417, 90, 89, 91, 209, 92]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Finnish'
          lang: 'fi'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Finnish Male'
      flag: 'fi'
      gender: 'm'
      lang: 'fi-FI'
      voiceIDs: [160]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Finnish Male'
          lang: 'fi'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'French Female'
      flag: 'fr'
      gender: 'f'
      lang: 'fr-FR'
      voiceIDs: [240, 21, 22, 23, 77, 178, 279, 210, 493, 266, 295, 351, 304, 321, 360, 26]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google français'
        }
      }
    },
    {
      name: 'French Male'
      flag: 'fr'
      gender: 'm'
      lang: 'fr-FR'
      voiceIDs: [311, 328, 367, 378, 392]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback French Male'
          lang: 'fr'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'French Canadian Female'
      flag: 'ca'
      gender: 'f'
      lang: 'fr-CA'
      voiceIDs: [497, 419, 210, 449]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback French Canadian Female'
          lang: 'fr-CA'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'French Canadian Male'
      flag: 'ca'
      gender: 'm'
      lang: 'fr-CA'
      voiceIDs: [450]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback French Canadian Male'
          lang: 'fr-CA'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Greek Female'
      flag: 'gr'
      gender: 'f'
      lang: 'el-GR'
      voiceIDs: [488, 414, 62, 63, 80, 200, 64]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Greek'
          lang: 'el'
          fallbackvoice: true
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Greek Male'
      flag: 'gr'
      gender: 'm'
      lang: 'el-GR'
      voiceIDs: [163]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Greek Male'
          lang: 'el'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Hindi Female'
      flag: 'hi'
      gender: 'f'
      lang: 'hi-IN'
      voiceIDs: [247, 66, 154, 179, 213, 489, 259, 288, 344, 67]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google हिन्दी'
        }
      }
    },
    {
      name: 'Hindi Male'
      flag: 'hi'
      gender: 'm'
      lang: 'hi-IN'
      voiceIDs: [394]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Hindi Male'
          lang: 'hi'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Hungarian Female'
      flag: 'hu'
      gender: 'f'
      lang: 'hu-HU'
      voiceIDs: [470, 420, 9, 10, 81, 214, 11]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Hungarian Female'
          lang: 'hu'
          fallbackvoice: true
          service: 'g1'
        }
      }
    },
    {
      name: 'Hungarian Male'
      flag: 'hu'
      gender: 'm'
      lang: 'hu-HU'
      voiceIDs: [164]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Hungarian Male'
          lang: 'hu'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Indonesian Female'
      flag: 'id'
      gender: 'f'
      lang: 'id-ID'
      voiceIDs: [241, 111, 112, 524, 180, 215, 113]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google Bahasa Indonesia'
        }
      }
    },
    {
      name: 'Indonesian Male'
      flag: 'id'
      gender: 'm'
      lang: 'id-ID'
      voiceIDs: [395]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Indonesian Male'
          lang: 'id'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Italian Female'
      flag: 'it'
      gender: 'f'
      lang: 'it-IT'
      voiceIDs: [242, 33, 34, 35, 36, 37, 79, 181, 216, 508, 271, 300, 356, 38]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google italiano'
        }
      }
    },
    {
      name: 'Italian Male'
      flag: 'it'
      gender: 'm'
      lang: 'it-IT'
      voiceIDs: [312, 329, 368, 406]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Italian Male'
          lang: 'it'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Japanese Female'
      flag: 'jp'
      gender: 'f'
      lang: 'ja-JP'
      voiceIDs: [51, 280, 217, 52, 153, 517, 182, 273, 302, 358, 274, 303, 359, 53]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Japanese Female'
          lang: 'ja'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Japanese Male'
      flag: 'jp'
      gender: 'm'
      lang: 'ja-JP'
      voiceIDs: [248, 50, 313, 330, 369, 396]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google 日本語'
        }
      }
    },
    {
      name: 'Korean Female'
      flag: 'kr'
      gender: 'f'
      lang: 'ko-KR'
      voiceIDs: [54, 55, 56, 156, 183, 218, 466, 306, 323, 362, 384, 57]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google 한국의'
          timerSpeed: 1
        }
      }
    },
    {
      name: 'Korean Male'
      flag: 'kr'
      gender: 'm'
      lang: 'ko-KR'
      voiceIDs: [397]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Korean Male'
          lang: 'ko'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Latin Female'
      flag: 'va'
      gender: 'f'
      lang: 'la'
      voiceIDs: [114]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Latin Female'
          lang: 'la'
          fallbackvoice: true
          service: 'g2'
          gender: 'female'
        }
      }
    },
    {
      name: 'Latin Male'
      flag: 'va'
      gender: 'm'
      lang: 'la'
      voiceIDs: [165]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Latin Male'
          lang: 'la'
          fallbackvoice: true
          service: 'g2'
          voicename: ''
          gender: 'male'
        }
      }
    },
    {
      name: 'Nepali'
      flag: 'np'
      gender: 'f'
      lang: 'ne-NP'
      voiceIDs: [509, 423, 441]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Nepali Female'
          lang: 'ne-NP'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Norwegian Female'
      flag: 'no'
      gender: 'f'
      lang: 'nb-NO'
      voiceIDs: [473, 422, 72, 73, 221, 74]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Norwegian'
          lang: 'no'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Norwegian Male'
      flag: 'no'
      gender: 'm'
      lang: 'nb-NO'
      voiceIDs: [166]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Norwegian Male'
          lang: 'no'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
        }
      }
    },
    {
      name: 'Polish Female'
      flag: 'pl'
      gender: 'f'
      lang: 'pl-PL'
      voiceIDs: [244, 120, 119, 121, 185, 222, 505, 267, 296, 352, 122]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google polski'
        }
      }
    },
    {
      name: 'Polish Male'
      flag: 'pl'
      gender: 'm'
      lang: 'pl-PL'
      voiceIDs: [314, 331, 370, 398]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Polish Male'
          lang: 'pl'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Portuguese Female'
      flag: 'br'
      gender: 'f'
      lang: 'pt-BR'
      voiceIDs: [128, 127, 129, 187, 224, 479, 272, 301, 357, 130]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Portuguese'
          lang: 'pt-PT'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Portuguese Male'
      flag: 'br'
      gender: 'm'
      lang: 'pt-BR'
      voiceIDs: [400]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Portuguese Male'
          lang: 'pt-PT'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Romanian Female'
      flag: 'ro'
      gender: 'f'
      lang: 'ro-RO'
      voiceIDs: [526, 424, 151, 150, 152, 225, 46]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Romanian'
          lang: 'ro'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Russian Female'
      flag: 'ru'
      gender: 'f'
      lang: 'ru-RU'
      voiceIDs: [246, 47, 48, 83, 468, 188, 226, 260, 289, 345, 49]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google русский'
        }
      }
    },
    {
      name: 'Russian Male'
      flag: 'ru'
      gender: 'm'
      lang: 'ru-RU'
      voiceIDs: [316, 333, 372, 387]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Russian Male'
          lang: 'ru'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Sinhala'
      flag: 'lk'
      gender: 'f'
      lang: 'si-LK'
      voiceIDs: [501, 425, 442]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Sinhala Female'
          lang: 'si-LK'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Slovak Female'
      flag: 'sk'
      gender: 'f'
      lang: 'sk-SK'
      voiceIDs: [506, 426, 133, 132, 134, 227, 135]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Slovak'
          lang: 'sk'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Slovak Male'
      flag: 'sk'
      gender: 'm'
      lang: 'sk-SK'
      voiceIDs: [167]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Slovak Male'
          lang: 'sk'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Spanish Female'
      flag: 'es'
      gender: 'f'
      lang: 'es-ES'
      voiceIDs: [19, 238, 16, 17, 18, 20, 76, 174, 207, 514, 521, 263, 292, 348, 264, 293, 349, 15]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google español'
        }
      }
    },
    {
      name: 'Spanish Male'
      flag: 'es'
      gender: 'm'
      lang: 'es-ES'
      voiceIDs: [309, 326, 365, 401]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Spanish Male'
          lang: 'es'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
          deprecated: true
        }
      }
    },
    {
      name: 'Spanish Latin American Female'
      flag: 'es'
      gender: 'f'
      lang: 'es-MX'
      voiceIDs: [239, 137, 136, 138, 175, 208, 265, 294, 350, 139]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Google español de Estados Unidos'
        }
      }
    },
    {
      name: 'Spanish Latin American Male'
      flag: 'es'
      gender: 'm'
      lang: 'es-MX'
      voiceIDs: [136, 310, 327, 366, 402]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Spanish (Latin American) Male'
          lang: 'es-419'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Swedish Female'
      flag: 'sv'
      gender: 'f'
      lang: 'sv-SE'
      voiceIDs: [482, 427, 85, 149, 228, 65]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Swedish'
          lang: 'sv'
          fallbackvoice: true
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Swedish Male'
      flag: 'sv'
      gender: 'm'
      lang: 'sv-SE'
      voiceIDs: [148, 168]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Swedish Male'
          lang: 'sv'
          fallbackvoice: true
          service: 'g3'
          voicename: ''
          gender: 'male'
        }
      }
    },
    {
      name: 'Tamil Female'
      flag: 'hi'
      gender: 'm'
      lang: 'hi-IN'
      voiceIDs: [458, 516, 451]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Tamil'
          lang: 'ta'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Tamil Male'
      flag: 'hi'
      gender: 'm'
      lang: 'hi-IN'
      voiceIDs: [141]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Tamil'
          lang: 'ta'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Thai Female'
      flag: 'th'
      gender: 'f'
      lang: 'th-TH'
      voiceIDs: [143, 142, 144, 471, 189, 229, 145]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Thai Female'
          lang: 'th'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Thai Male'
      flag: 'th'
      gender: 'm'
      lang: 'th-TH'
      voiceIDs: [403]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Thai Male'
          lang: 'th'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Turkish Female'
      flag: 'tr'
      gender: 'f'
      lang: 'tr-TR'
      voiceIDs: [69, 70, 82, 475, 190, 230, 71]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Turkish'
          lang: 'tr'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Turkish Male'
      flag: 'tr'
      gender: 'm'
      lang: 'tr-TR'
      voiceIDs: [465, 404]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Turkish Male'
          lang: 'tr'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Ukrainian Female'
      flag: 'ua'
      gender: 'f'
      lang: 'uk-UA'
      voiceIDs: [494, 428, 443]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Ukrainian Female'
          lang: 'uk-UA'
          fallbackvoice: true
          timerSpeed: 0
          service: 'g3'
          gender: 'female'
        }
      }
    },
    {
      name: 'Vietnamese Female'
      flag: 'vi'
      gender: 'f'
      lang: 'vi-VN'
      voiceIDs: [480, 429, 405]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Vietnamese Female'
          lang: 'vi'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    },
    {
      name: 'Vietnamese Male'
      flag: 'vi'
      gender: 'm'
      lang: 'vi-VN'
      voiceIDs: [146]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Vietnamese Male'
          lang: 'vi'
          fallbackvoice: true
          service: 'g3'
          gender: 'male'
        }
      }
    },
    {
      name: 'Afrikaans Male'
      flag: 'af'
      gender: 'm'
      lang: 'af-ZA'
      voiceIDs: [93]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Afrikans'
          lang: 'af'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Albanian Male'
      flag: 'sq'
      gender: 'm'
      lang: 'sq-AL'
      voiceIDs: [94]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Albanian'
          lang: 'sq'
          fallbackvoice: true
          service: 'g2'
          gender: 'male'
        }
      }
    },
    {
      name: 'Bosnian Male'
      flag: 'bs'
      gender: 'm'
      lang: 'bs'
      voiceIDs: [14]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Bosnian Male'
          lang: 'bs'
          fallbackvoice: true
          service: 'g2'
          gender: 'male'
        }
      }
    },
    {
      name: 'Catalan Male'
      flag: 'catalonia'
      gender: 'm'
      lang: 'ca-ES'
      voiceIDs: [68]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Catalan'
          lang: 'ca'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Croatian Male'
      flag: 'hr'
      gender: 'm'
      lang: 'hr-HR'
      voiceIDs: [13]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Croatian Male'
          lang: 'hr'
          rate: 0.5
          fallbackvoice: true
          service: 'g2'
          gender: 'male'
        }
      }
    },
    {
      name: 'Esperanto Male'
      flag: 'eo'
      gender: 'm'
      lang: 'eo'
      voiceIDs: [108]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Esperanto'
          lang: 'eo'
          fallbackvoice: true
          service: 'g5'
          gender: 'male'
        }
      }
    },
    {
      name: 'Icelandic Male'
      flag: 'is'
      gender: 'm'
      lang: 'is-IS'
      voiceIDs: [110]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Icelandic'
          lang: 'is'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Icelandic Female'
      flag: 'is'
      gender: 'm'
      lang: 'is-IS'
      voiceIDs: [110]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Icelandic'
          lang: 'is'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Latvian Male'
      flag: 'lv'
      gender: 'm'
      lang: 'lv-LV'
      voiceIDs: [115]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Latvian Male'
          lang: 'lv'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Macedonian Male'
      flag: 'mk'
      gender: 'm'
      lang: 'mk-MK'
      voiceIDs: [116]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Macedonian Male'
          lang: 'mk'
          fallbackvoice: true
          service: 'g5'
          gender: 'male'
        }
      }
    },
    {
      name: 'Moldavian Female'
      flag: 'md'
      gender: 'f'
      lang: 'md'
      voiceIDs: [117]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Moldavian Female'
          lang: 'mo'
          fallbackvoice: true
          service: 'g2'
          gender: 'female'
        }
      }
    },
    {
      name: 'Moldavian Male'
      flag: 'md'
      gender: 'm'
      lang: 'md'
      voiceIDs: [117]
      deprecated: true
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Moldavian Female'
          lang: 'mo'
          fallbackvoice: true
          service: 'g2'
          gender: 'female'
        }
      }
    },
    {
      name: 'Montenegrin Male'
      flag: 'me'
      gender: 'm'
      lang: 'me'
      voiceIDs: [118]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Montenegrin Male'
          lang: 'sr-ME'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Serbian Male'
      flag: 'sr'
      gender: 'm'
      lang: 'sr-RS'
      voiceIDs: [12]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Serbian Male'
          lang: 'sr'
          fallbackvoice: true
          service: 'g1'
          gender: 'male'
        }
      }
    },
    {
      name: 'Serbo-Croatian Male'
      flag: 'hr'
      gender: 'm'
      lang: 'hr-HR'
      voiceIDs: [131]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Serbo-Croation'
          lang: 'sh'
          fallbackvoice: true
          service: 'g2'
          gender: 'male'
        }
      }
    },
    {
      name: 'Swahili Male'
      flag: 'sw'
      gender: 'm'
      lang: 'sw-KE'
      voiceIDs: [140]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Swahili'
          lang: 'sw'
          fallbackvoice: true
          service: 'g2'
          gender: 'male'
        }
      }
    },
    {
      name: 'Welsh Male'
      flag: 'cy'
      gender: 'm'
      lang: 'cy'
      voiceIDs: [147]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback Welsh'
          lang: 'cy'
          fallbackvoice: true
          service: 'g5'
          gender: 'male'
        }
      }
    },
    {
      name: 'Fallback UK Female'
      flag: 'gb'
      gender: 'f'
      lang: 'en-GB'
      voiceIDs: [8]
      mappedProfile: {
        systemvoice: {}
        collectionvoice: {
          name: 'Fallback en-GB Female'
          lang: 'en-GB'
          fallbackvoice: true
          service: 'g1'
          gender: 'female'
        }
      }
    }
  ]
  cancel: () => void
  speak: (text: string, voice?: string, options?: ResponsiveVoiceOption) => void
}

declare const responsiveVoice: ResponsiveVoice
