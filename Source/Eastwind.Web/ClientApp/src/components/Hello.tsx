import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

const Hello = (props: HelloProps) => <h1>Hello from aa {props.compiler} and {props.framework}!</h1>;

export default Hello;