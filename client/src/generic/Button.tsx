import React from "react";
import "./Button.scss";

interface ButtonProps {
  onClick?(): void;
  color?: "primary" | "link" | "info" | "success" | "warning" | "danger";
  light?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "default" | "normal" | "medium" | "large";
  text?: string;
  type?: "button" | "reset" | "submit";
}

function createClassName(type: string) {
  return `is-${type}`;
}

const Button = ({
  light,
  color,
  loading,
  outlined,
  rounded,
  disabled,
  size,
  text,
  type
}: ButtonProps) => {
  const className = [
    "button",
    light && createClassName("light"),
    color && createClassName(color),
    loading && createClassName("loading"),
    outlined && createClassName("outlined"),
    rounded && createClassName("rounded"),
    size && createClassName(size)
  ]
    .join(" ")
    .trim();

  return (
    <button className={className} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
