/**
 * Created by ani41 on 11/5/2017.
 */
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: 'hello'};                        // functional based components don't have state property
    }
    render() {
        return ( <div className="search-bar">
                <input type="text" onChange={ (event) => this.onInputChange(event.target.value)}
                       placeholder="enter something"/>
            </div>
        );
    }
    onInputChange(term) {
        this.setState({term:term});
        this.props.onsearchTermChange(term);
    }
}
export default SearchBar;