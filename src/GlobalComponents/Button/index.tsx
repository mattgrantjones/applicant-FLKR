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
        "shadow-sm shadow-white text-md bg-pin rounded x-8 py-2 h-12 bg-blue-light text-midnight active:scale-100 active:duration-[50ms] active:ease-linear  " +
        (isDisabled
          ? "opacity-50 hover:scale-100 cursor-auto "
          : "cursor-pointer hoverzoom-sm  ") +
        " " +
        className
      }
    >
      {label}
    </button>
  )
}

export default Button
