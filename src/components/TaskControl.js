import React, {Component} from 'react';
import Search from './TaskSearchControl';
import Sort from './TaskSortControl';

class Control extends Component {
    render() {
        return (
            <div className="row">
                <Search onSearch={this.props.onSearch} />
                <Sort 
                onSort={this.props.onSort}
                sortBy={this.props.sortBy}
                sortValue={this.props.sortValue}
                 />
            </div>
        );
    }

}

export default Control;
