type FormLabelProps = {
  labelContent: string
  className?: string
  htmlFor?: string
}

const FormLabel: React.FC<FormLabelProps> = ({
  labelContent,
  htmlFor,
  className,
}) => (
  <label
    htmlFor={htmlFor}
    className={"text-midnight font-light text-sm  " + className}
  >
    {labelContent}
  </label>
)

export default FormLabel
