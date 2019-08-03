import React, { Component } from 'react';
import BondImg from './assets/bond_approve.jpg';
import './Form.css';
import user from '../../config';

export default class Form extends Component {
  state = {
    errors: {
      firstname: '',
      lastname: '',
      password: ''
    },
    values: {
      firstname: '',
      lastname: '',
      password: ''
    },
    isSubmited: false
  };

  validation = () => {
    const { values } = this.state;
    let isValidate = true;

    const emptyFields = {
      firstname: 'Нужно указать имя',
      lastname: 'Нужно указать фамилию',
      password: 'Нужно указать пароль'
    };

    const posibleErrors = {
      firstname: 'Имя указано не верно',
      lastname: 'Фамилия указана не верно',
      password: 'Пароль указан не верно'
    };

    Object.keys(values).forEach(value => {
      if (values[value] === '') {
        this.setState(state => ({
          errors: {
            ...state.errors,
            [value]: emptyFields[value]
          }
        }));

        isValidate = false;
      } else if (values[value] !== user[value]) {
        this.setState(state => ({
          errors: {
            ...state.errors,
            [value]: posibleErrors[value]
          }
        }));

        isValidate = false;
      }
    });

    return isValidate;
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.validation()) {
      this.setState({
        isSubmited: true
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      errors: {
        ...this.state.errors,
        firstname: '',
        lastname: '',
        password: ''
      },
      values: { ...this.state.values, [name]: value }
    });
  };

  render() {
    const { values, errors, isSubmited } = this.state;

    const titles = {
      firstname: 'Имя',
      lastname: 'Фамилия',
      password: 'Пароль'
    };

    if (isSubmited)
      return (
        <div className="app-container">
          <img src={BondImg} alt="bond approve" className="t-bond-image" />
        </div>
      );

    return (
      <div className="app-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <h1>Введите свои данные, агент</h1>
          {Object.keys(values).map(value => (
            <p className="field" key={value}>
              <label className="field__label" htmlFor={value}>
                <span className="field-label">{titles[value]}</span>
              </label>
              <input
                onChange={this.handleChange}
                id={value}
                name={value}
                value={values[value]}
                type={value === 'password' ? 'password' : 'text'}
                className={`field__input field-input t-input-${value}`}
              />
              <span className={`field__error field-error t-error-${value}`}>
                {errors[value]}
              </span>
            </p>
          ))}
          <div className="form__buttons">
            <input
              type="submit"
              className="button t-submit"
              value="Проверить"
            />
          </div>
        </form>
      </div>
    );
  }
}
