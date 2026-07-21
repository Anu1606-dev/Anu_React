import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';
import  UserContext  from '../utils/UserContext';

class About extends Component {
    constructor(props) {
        super(props);

        // console.log("Parent constructor called");
    }

    // async componentDidMount() {  //componentDidMount is a lifecycle method that is called after the component is mounted to the DOM. It is commonly used for making API calls, setting up subscriptions, or performing any side effects that require the component to be in the DOM.
    //     const data = await fetch("https://api.github.com/users/Anu1606-dev");
    //     const json = await data.json();
    //     console.log(json);
    // }

    render() {
        // console.log("Parent render called");
        return (
            <div>
                <div>
                    Logged in User: 
                    <UserContext.Consumer>{({ loggedInUser }) => 
                        <h1 className="font-bold text-lg">{loggedInUser}</h1>
                    }
                    </UserContext.Consumer>
                </div>
                <h2> Namaste React Series</h2>
                {/* Using Props in Functional Component */}
                {/* <User name={"Anushka Sarkar"} />  */}

                <UserClass name={"Debangan PaulChowdhury"} location={"Kolkata"} />
            </div>
        );
    }
}

export default About;