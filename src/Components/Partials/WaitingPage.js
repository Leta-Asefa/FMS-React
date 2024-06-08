import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const WaitingPage = () => {
    const {isEnglish}=useContext(UserContext)



    return (<div className="w-80 mx-auto my-10 bg-slate-100 text-green-400 p-5 rounded-r-lg font-bold">
        <div>{isEnglish ? "You have registered successfully!" : "በተሳካ ሁኔታ ተመዝግበዋል !"}</div>
        <div>{isEnglish ? "Wait until your organization includes you the system" : "ድርጅቶች ወደ ሲስተም እስክሚያስገቧችሁ ድረስ በትዕግስት ይጠብቁ !"}</div>
        <img src="/wait.svg" className="w-10 h-10 mx-auto mt-10"/>
    </div>);
}

export default WaitingPage;