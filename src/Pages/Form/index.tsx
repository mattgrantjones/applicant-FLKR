import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

// Hooks
import { FormProvider, useForm } from "react-hook-form"

// Form Validation
import { schema } from "./Schema"

// Components
import Button from "../../GlobalComponents/Button"
// import CheckBox from "../../GlobalComponents/Checkbox"
import Input from "../../GlobalComponents/Input"
import ApplicantCard from "./Components/ApplicantCard"

const Form: React.FC = () => {
  // State
  const [applicants, setApplicants] = useState<
    Zod.infer<typeof schema>[] | undefined
  >()

  // Hooks
  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    },
  })

  // Form Helpers
  const { handleSubmit, getValues, formState, reset, trigger, setValue } =
    formMethods
  const { isValid, isDirty } = formState

  const submitForm = handleSubmit(async (formValues) => {
    !isDirty && trigger(undefined, { shouldFocus: true })
    console.log("submitted", { formValues, isDirty, isValid })
  })

  const resetToDefaultValues = () =>
    reset({
      id: 0,
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    })

  // Check if the current applicant (by ID or email) already exists in the applicants state
  const checkIfApplicantExists = () =>
    applicants?.some((applicant) => {
      const values = getValues()
      return applicant.id === values.id || applicant.email === values.email
    })

  // Assign a new ID to a new applicant
  const assignApplicantId = () => {
    return applicants?.length ? applicants.length + 1 : 1
  }

  // Save the current applicant to the applicants state after validating
  const saveChanges = (resetValue?: "default" | "previous") => {
    const isExistingApplicant = checkIfApplicantExists()
    const values = getValues()
    trigger()

    // Update the values for an existing applicant
    if (isExistingApplicant) {
      console.log("Is Exising Applicant", { values, isValid })
      isValid &&
        setApplicants([
          ...(applicants?.filter((applicant) => applicant.id !== values.id) ||
            []),
          values,
        ])
    }

    // Add a new applicant
    if (!isExistingApplicant) {
      console.log("Is New Applicant", { values, isValid })
      setValue("id", assignApplicantId())
      isValid &&
        setApplicants([
          ...(applicants || []),
          { ...values, id: assignApplicantId() },
        ])
    }

    // Reset the form
    if (isValid) {
      resetValue === "default"
        ? resetToDefaultValues()
        : resetValue === "previous"
        ? reset(applicants?.[applicants.length - 1])
        : null
    }
  }

  return (
    <FormProvider {...formMethods}>
      <h1>Applicant FLKR</h1>
      {applicants?.map((applicant) => (
        <ApplicantCard
          applicant={applicant}
          onClick={() => reset(applicant)}
          key={`applicant-${applicant.id}-${applicant.email}`}
        />
      ))}
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
        <div className="BUTTON-SECTION flex flex-col gap-4 mt-12">
          <div className="flex gap-2">
            <Button
              type="button"
              label={
                checkIfApplicantExists() ? "Save Changes" : "Save + Add Another"
              }
              className="secondary-inverted-light flk-shadow-purple grow "
              isDisabled={!isValid}
              onClick={() => saveChanges("default")}
            />
            <Button
              type="button"
              label="Cancel"
              className="bg-zinc-light border border-zinc-dark shadow-lg shadow-zinc-medium w-1/3 "
              isDisabled={!isDirty}
              onClick={() => {
                resetToDefaultValues()
              }}
            />
          </div>

          <Button
            label={`Submit ${
              // Get number of active applicants in the form
              applicants?.length
                ? `${applicants.length + (isDirty ? 1 : 0)} `
                : ""
            }
            ${
              // Get the appropriate pluralisation
              applicants?.length === 1 ? "Applicant" : "Applicants"
            }`}
            onClick={submitForm}
            isDisabled={!applicants?.length || (isDirty && !isValid)}
            className="primary-medium flk-shadow-blue "
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
