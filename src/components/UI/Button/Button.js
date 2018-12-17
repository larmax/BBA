import React from 'react';
import styles from './Button.module.css';
console.log('Button.js');
const button = (props) => (

<button
styles={[styles.Button, styles[props.btnType]].join(' ')}
onClick={props.clicked}
disabled={props.disabled}
>
{props.children}
</button>
// ,console.log('props')
)

export default button;
