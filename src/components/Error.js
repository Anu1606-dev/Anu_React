import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    
    return (
        <div>
            <h1>Oops!!!....</h1>
            <h2>Something went wrong!!....</h2>
            <h2>{err.status}: {err.statusText}</h2>
            <h2> Phirse kosis karle bhai...😅</h2>
            <div>
                <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTcyZm03b2docjU1ZzNmZzR4Zzl2ZGdhcTBjNXMwYzN5NmJtb2R0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9dgnO4jts7kmsFcSPq/giphy.gif" alt="Funny GIF" />
            </div>
        </div>
    );
};

export default Error;
