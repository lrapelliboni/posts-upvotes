import React, { Component } from 'react'
import {
    withRouter,
    Link
} from "react-router-dom";
import api from'../services/api';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        }
    }
    async submitForm() {
        const { title, description } = this.state;
        const response = await api.post('/posts', {
            title,
            description,
            votes: 0
        });
        if (response.status === 201) {
            this.props.history.push("/");
        } else {
            alert('Não foi possível salvar o post!');
        }
    }
    render() {
        
        return (
            <div>
                <h1>Adicionar Post</h1>
                <div className="box">
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            this.submitForm();
                        }
                    }>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input  onChange={e => this.state.title = e.target.value} required className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <textarea  onChange={e => this.state.description = e.target.value} required className="form-control" id="description"></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Salvar</button>
                            &nbsp;
                            <Link className="btn" to="/">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default withRouter(AddPost)