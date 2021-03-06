import React, { Component } from 'react';
import classNames from 'classnames';
import Button from './Button';
import SORTS from '../utils/SORTS';

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );
  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
}

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '50%' }}>
            <Sort
              sortKey={ 'TITLE' }
              onSort={this.onSort}
              activeSortKey={sortKey}
              >
              Title
              <i className="fa fa-sort" aria-hidden="true"></i>
              </Sort>

          </span>
          <span style={{ width: '20%' }}>
            <Sort
              sortKey={ 'AUTHOR' }
              onSort={this.onSort}
              activeSortKey={sortKey}
              >
              Author
              <i className="fa fa-sort" aria-hidden="true"></i>
              </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={ 'COMMENTS' }
              onSort={this.onSort}
              activeSortKey={sortKey}
              >
              Comments
              <i className="fa fa-sort" aria-hidden="true"></i>
              </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={ 'POINTS' }
              onSort={this.onSort}
              activeSortKey={sortKey}
              >
              Points
              <i className="fa fa-sort" aria-hidden="true"></i>
              </Sort>
          </span>
          <span style={{ width: '10%' }}>
            Archive
          </span>
        </div>

      { reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '50%' }}>
              <a className="title-url" href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '20%' }}>
              {item.author}
            </span>
            <span style={{ width: '10%' }}>
              {item.num_comments}
            </span>
            <span style={{ width: '10%' }}>
              {item.points}
            </span>
            <span style={{ width: '10%' }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
                >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Table;
