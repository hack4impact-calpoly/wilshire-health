import { Auth } from "aws-amplify";
import "../App.css";
import "./Home.css";
import Header from "./Header";

function Home() {
  async function signOut() {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      <Header />
      <div className="signout">
        <button type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    </>
  );
}

export default Home;
