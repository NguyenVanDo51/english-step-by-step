import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
var serviceAccount = require("../../englishstepbystep-88acf-firebase-adminsdk-cxvn7-51c3f50faf.json")
// https://firebase.google.com/docs/web/setup#available-libraries

const alreadyCreatedApp = getApps()

let app =
  alreadyCreatedApp.length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : alreadyCreatedApp[0]

export const firestore = getFirestore(app)
