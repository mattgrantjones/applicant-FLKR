type CheckBoxProps = {
  label: string
  name: string
  className?: string
  id?: string
  isDisabled?: boolean
  isCheckedByDefault?: boolean
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  className,
  id,
  isDisabled = false,
  isCheckedByDefault = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={id}
        type="checkbox"
        disabled={isDisabled}
        checked={isCheckedByDefault}
      ></input>
    </div>
  )
}

export default CheckBox
