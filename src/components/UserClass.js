import React from 'react';

// Class Component
class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "Anushka Sarkar",
                location: "Kolkata",
                avatar_url: "https://avatars.githubusercontent.com/u/100450168?v=4",
                bio: "I am a React Developer",
            },
            count: 0,
            count1: 1,
        };

        // console.log(this.props.name + "Child constructor called");
    }

    async componentDidMount() {  //componentDidMount is a lifecycle method that is called after the component is mounted to the DOM. It is commonly used for making API calls, setting up subscriptions, or performing any side effects that require the component to be in the DOM.
        const data = await fetch("https://api.github.com/users/Anu1606-dev");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });
        
        console.log(json);
    }

    render() {
        const {name, bio, avatar_url, location} = this.state.userInfo;

        return (
            <div className="user-card">
                <h2>Name: {name}</h2>
                <br />
                {/* never directly modify state variable */}
                <button onClick={() => {
                    this.setState({ count: count + 1 });
                }}>Increment</button>
                <button onClick={() => {
                    this.setState({ count: count - 1 });
                }}>Decrement</button>
                <br />
                <br />
                <img src={avatar_url} alt="Avatar" />
                <h3> Location: {location}</h3>
                <h4>Contact: @anushka1606</h4>
                <h3> Bio: {bio}</h3>
                
            </div>
        );
    }
};
export default UserClass;