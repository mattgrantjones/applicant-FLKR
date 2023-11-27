type InputProps = {
  label: string
  name: string
  className?: string
  id?: string
  isDisabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  className,
  id,
  isDisabled = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={id} name={name} disabled={isDisabled} />
    </div>
  )
}

export default Input
