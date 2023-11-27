type ButtonProps = {
  label: string
  onClick?: () => void
  className?: string
  id?: string
  type?: "button" | "submit" | "reset"
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  id,
  type = "button",
  isDisabled = false,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={className}
    >
      {label}
    </button>
  )
}

export default Button
