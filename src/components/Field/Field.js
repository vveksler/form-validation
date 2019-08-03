import React, { Component } from 'react';
import Label from './Label';

export default class Field extends Component {
  render() {
    const { onChange, name, value } = this.props;
    const titles = {
      firstname: 'Имя',
      lastname: 'Фамилия',
      password: 'Пароль'
    };

    return (
      <p className="field">
        <label className="field__label" htmlFor={name}>
          <Label title={titles[name]} />
          <input
            onChange={onChange(name)}
            name={name}
            value={value}
            type="text"
            className="field__input field-input t-input-firstname"
          />
        </label>
      </p>
    );
  }
}
