import React from "react";

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
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/Anu1606-dev");
    const json = await data.json();
    this.setState({ userInfo: json });
  }

  render() {
    const { name, bio, avatar_url, location } = this.state.userInfo;

    return (
      <div className="p-2.5 border border-[#040404]">
        <h2>Name: {name}</h2>
        <br />
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>Decrement</button>
        <br />
        <br />
        <img className="w-20 h-20 rounded-full object-cover" src={avatar_url} alt="Avatar" />
        <h3>Location: {location}</h3>
        <h4>Contact: @anushka1606</h4>
        <h3>Bio: {bio}</h3>
      </div>
    );
  }
}

export default UserClass;