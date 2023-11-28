type FieldHelperTextProps = {
  errorMessage?: string
  helperMessage?: string
  className?: string
}

const FieldHelperText: React.FC<FieldHelperTextProps> = ({
  errorMessage,
  helperMessage,
  className,
}) => {
  return (
    <p
      className={
        "text-sm absolute -bottom-0  " +
        className +
        " " +
        (errorMessage ? "text-pink-medium" : "text-zinc-dark")
      }
    >
      <span className="shrink grow truncate">
        {errorMessage || helperMessage}
      </span>
    </p>
  )
}

export default FieldHelperText
