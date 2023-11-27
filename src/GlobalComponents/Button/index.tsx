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
      className={
        "hoverzoom-sm hover:shadow-xl text-md bg-pin rounded shadow-sm px-8 py-2 h-12 bg-blue-light text-midnight  " +
        className +
        " " +
        (isDisabled ? "cursor-not-allowed" : "cursor-pointer")
      }
    >
      {label}
    </button>
  )
}

export default Button
