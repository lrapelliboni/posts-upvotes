import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import api from '../../services/api';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchPosts } = this.props;
        fetchPosts();
    }

    async updateVotes(item, operation) {
        const { fetchPosts } = this.props;

        var obj = item;
        switch (operation) {
            case '+':
                obj.votes = item.votes + 1;
                break;
            case '-':
                obj.votes = item.votes - 1;
            default:
                break;
        }
        let response = await api.put('/posts/' + obj.id, obj);
        if (response.data && response.status === 200) {
            fetchPosts();
        }
    }

    createList() {
        const { items, loaded } = this.props;

        let iterable = items;
        if (!loaded)
            return (<p>Carregando...</p>)

        return (
            <ul className="posts-list">
                {
                    iterable.map((item, index) => {
                        return (
                            <li key={index}>
                                <strong>{item.title}</strong>
                                <div className="description">
                                    {item.description}
                                </div>
                                <div className="buttons">
                                    <FontAwesomeIcon
                                        className={
                                            classNames({
                                                red: true
                                            })
                                        }
                                        icon={faArrowDown}
                                        onClick={() => this.updateVotes(item, '-')}
                                    />
                                    <input className={
                                        classNames({
                                            'input-votes': true,
                                            red: (item.votes < 0) ? true : false,
                                            green: (item.votes > 0) ? true : false
                                        })
                                    } disabled value={item.votes} />
                                    <FontAwesomeIcon
                                        className={
                                            classNames({
                                                green: true
                                            })
                                        }
                                        icon={faArrowUp}
                                        onClick={() => this.updateVotes(item, '+')}
                                    />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );

    }

    render() {
        return (
            <>
                <h1>Posts</h1>
                <div className="posts-container">
                    <div className="row store-items">
                        {this.createList()}
                    </div>
                </div>
            </>
        )
    }
}

HomePage.propTypes = {
    items: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
}

export default HomePage