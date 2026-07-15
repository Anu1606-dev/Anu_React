import {useState} from 'react';

const User = (props) => {
    const [count] = useState(0);
    const [count1] = useState(1);

    return (
        <div className="user-card">
            <h3>Count1: {count}</h3>
            <h3>Count2: {count1}</h3>
            <h2>Name: {props.name}</h2>
            <h3> Location: Kolkata</h3>
            <h4>Contact: @anushka1606</h4>
        </div>
    );
};

export default User;