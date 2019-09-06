import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://jhonylara.com.br:8080/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)

        this.state = { description: '', list: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)   
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)   
        this.handleMarkAsPenging = this.handleMarkAsPenging.bind(this)   
        this.handleSearch = this.handleSearch.bind(this)   
        this.handleClear = this.handleClear.bind(this)   
        
        this.refresh()
    }
    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`).then(
            resp => this.setState({...this.state, description, list: resp.data})
        )
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh(this.state.description))
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value })
    }

    handleAdd(){
        
        const description = this.state.description
        if(description === ''){
            return
        }
        axios.post(URL, { description }).then(resp => this.refresh())
    }

    handleMarkAsPenging(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: false}).then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(resp => this.refresh(this.state.description))
    }


    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    description={this.state.description}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TodoList list={this.state.list}
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPenging={this.handleMarkAsPenging}
                handleRemove={this.handleRemove} />
            </div>
        )
    }
}