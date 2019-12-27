import { firebase } from "../../common/utils/firebase";

export const logout = async () => {
    await firebase.auth().signOut()
};
