import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

// Components
import FieldHelperText from "../FieldHelperText"
import FormLabel from "../FormLabel"

type CheckBoxProps = {
  label: string
  name: string
  className?: string
  id?: string
  isDisabled?: boolean
  helperMessage?: string
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  className,
  id,
  isDisabled = false,
  helperMessage,
}) => {
  // Hooks
  const { register, trigger, watch, setValue, getFieldState } = useFormContext()
  const inputId = id || `checkbox-input-${name}`
  const { error } = getFieldState(name)
  const isChecked = watch(name)

  const formStateClasses = useMemo(() => {
    if (error) {
      // Error Styles
      const containerStyles = "text-pink-medium  "
      const inputStyles = "[&_input]:text-pink-light "
      const labelStyles = "[&_label]:text-pink-medium [&_label]:font-normal  "
      return containerStyles + inputStyles + labelStyles
    }
    // Base Styles (no error)
    return "[&_input]:text-blue-medium "
  }, [error])

  return (
    <div
      className={
        "relative flex gap-2 py-5 w-full " +
        className +
        (!isDisabled ? "cursor-pointer " : "cursor-auto ") +
        formStateClasses
      }
      onClick={() => {
        if (!isDisabled) {
          setValue(name, !isChecked)
          error && trigger(name)
        }
      }}
    >
      <input
        {...register(name)}
        name={name}
        id={inputId}
        type="checkbox"
        disabled={isDisabled}
        className="w-5 h-5 rounded-md "
      />
      <FormLabel
        htmlFor={name}
        labelContent={label}
        className="font-normal text-blue-dark pointer-events-none "
      />
      {(error || helperMessage) && (
        <FieldHelperText
          errorMessage={error?.message}
          helperMessage={helperMessage}
          className={
            "text-xs bg-opacity-50 text-midnight rounded-md px-2 py-1 translate-y-2 " +
            (error
              ? "bg-pink-light text-pink-medium"
              : "bg-blue-light text-zinc-dark")
          }
        />
      )}
    </div>
  )
}

export default CheckBox
