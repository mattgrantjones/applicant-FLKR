import { ReactNode } from "react"

type FieldHelperTextProps = {
  errorMessage?: string
  helperMessage?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  className?: string
}

const FieldHelperText: React.FC<FieldHelperTextProps> = ({
  errorMessage,
  helperMessage,
  leadingIcon,
  trailingIcon,
  className,
}) => {
  return (
    <p
      className={
        "text-sm absolute bottom-0  " +
        className +
        " " +
        (errorMessage ? "text-pink-medium" : "text-zinc-dark")
      }
    >
      {leadingIcon}
      <span className="shrink grow truncate">
        {errorMessage || helperMessage}
      </span>
      {trailingIcon}
    </p>
  )
}

export default FieldHelperText
