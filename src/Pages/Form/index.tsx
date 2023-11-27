import { zodResolver } from "@hookform/resolvers/zod"

// Hooks
import { FormProvider, useForm } from "react-hook-form"

// Form Validation
import { schema } from "./Schema"

// Components
import Button from "../../GlobalComponents/Button"
// import CheckBox from "../../GlobalComponents/Checkbox"
import Input from "../../GlobalComponents/Input"

const Form: React.FC = () => {
  // Hooks
  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", mobile: "", email: "" },
  })

  const { handleSubmit, getValues, formState } = formMethods

  // Form Helpers
  const submitForm = handleSubmit(async (formValues) => {
    console.log("submitted", { formValues })
  })

  const values = getValues()
  const { errors } = formState
  console.log({ values, errors })

  return (
    <FormProvider {...formMethods}>
      <h1>Applicant FLKR</h1>
      <form
        onSubmit={submitForm}
        className="flex flex-col max-w-3xl items-stretch w-full gap-2 bg-white rounded-xl shadow-2xl px-36 py-20"
      >
        <Input label="First name" name="firstName" />
        <Input label="Last name" name="lastName" />
        <Input label="Email" name="email" />
        <Input
          label="Phone Number"
          name="mobile"
          helperMessage="(Example: 0400 000 000 or +61 400 000 000)"
        />
        {/* <CheckBox label="Check me" name="check" /> */}
        <div className="flex flex-col gap-4 mt-12">
          <Button
            type="button"
            label="+ Add another applicant"
            className="secondary-inverted-light flk-shadow-purple "
          />
          <Button
            type="submit"
            label="Submit"
            onClick={submitForm}
            className="primary-medium flk-shadow-blue "
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
