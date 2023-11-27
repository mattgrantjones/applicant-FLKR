// Hooks
import { useFormContext } from "react-hook-form"

// Components
import FormLabel from "../FormLabel"
import FieldHelperText from "../FieldHelperText"
import { useMemo } from "react"

type InputProps = {
  label: string
  name: string
  className?: string
  id?: string
  isDisabled?: boolean
  fullWidth?: boolean
  maxCharacters?: number
  helperMessage?: string
  hideHelperTextIfValid?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  className,
  id,
  isDisabled = false,
  fullWidth = true,
  maxCharacters,
  helperMessage,
  hideHelperTextIfValid = true,
}) => {
  // Hooks
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext()
  const inputId = id || `text-input-${name}`
  const error = errors[name]
  const isValid = getFieldState(name).isTouched && !error

  // Styles
  const formStateClasses = useMemo(() => {
    if (error) {
      // Error Styles
      const containerStyles = "text-pink-medium  "
      const inputStyles = "[&_input]:ring-pink-medium [&_input]:bg-pink-light  "
      const labelStyles = "[&_label]:text-pink-medium [&_label]:font-normal  "
      return containerStyles + inputStyles + labelStyles
    }
    // Base Styles (no error)
    return "[&_input]:ring-black [&_input]:bg-blue-light  "
  }, [error])

  return (
    <div
      className={
        "relative flex flex-col gap-1 items-start pb-6  " +
        className +
        formStateClasses
      }
    >
      <FormLabel labelContent={label} htmlFor={inputId} />
      <input
        {...register(name)}
        type="text"
        id={inputId}
        name={name}
        disabled={isDisabled}
        formNoValidate
        className={
          "px-2 h-10 rounded-lg bg-blue-light text-xl focus:outline-none focus:ring-1  " +
          (fullWidth ? "w-full" : "w-auto")
        }
        maxLength={maxCharacters}
      />
      <FieldHelperText
        errorMessage={
          error
            ? (typeof error?.message === "string" && error.message) ||
              "Invalid input"
            : undefined
        }
        helperMessage={
          hideHelperTextIfValid && isValid ? undefined : helperMessage
        }
      />
    </div>
  )
}

export default Input
