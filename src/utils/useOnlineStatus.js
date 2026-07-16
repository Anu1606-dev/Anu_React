import { useState, useEffect } from "react";

const useOnlineStatus = () => {
    // check if online or offline
    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        window.addEventListener("online", () => setOnlineStatus(true));
        window.addEventListener("offline", () => setOnlineStatus(false));
    }, []);

    return onlineStatus; // boolean value returned
}

export default useOnlineStatus;