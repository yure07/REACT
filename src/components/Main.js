import React, { Component } from 'react';

import Form from './Form';

import './Main.css';
import Tarefa from './Tarefas';

export default class Main extends Component {
  state = {
    NovaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return; //se tarefa não existir
    this.setState({ tarefas });
  }

  componentDidUpdate(prevState) {
    //função própria do react que salva algo a função recebe dois parametros automaticamente
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return; //isso quer dizer que as tarefas são iguais (tarefas = estado anterior de tarefas)

    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //salvando tarefas no localstorage
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { NovaTarefa } = this.state;
    NovaTarefa = NovaTarefa.trim();

    if (tarefas.indexOf(NovaTarefa) !== -1) return; //impedir que seja criado tarefa igual

    const NovaTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...NovaTarefas, NovaTarefa],
        NovaTarefa: '',
      });
    } else {
      NovaTarefas[index] = NovaTarefa;

      this.setState({
        index: -1,
        tarefas: [...NovaTarefas],
      });
    }
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    let NovaTarefas = [...tarefas];
    NovaTarefas.splice(index, 1);

    this.setState({
      tarefas: [...NovaTarefas],
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      NovaTarefa: tarefas[index],
    });
  };

  handleChange = (e) => {
    this.setState({
      NovaTarefa: e.target.value,
    });
  };

  render() {
    const { NovaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          NovaTarefa={NovaTarefa}
        />

        <Tarefa
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />
      </div>
    );
  }
}
