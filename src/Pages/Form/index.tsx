import { zodResolver } from "@hookform/resolvers/zod"

// Hooks
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

// Form Validation
import { formSchema } from "./Schema"

// Components
import Button from "../../GlobalComponents/Button"
import CheckBox from "../../GlobalComponents/Checkbox"
import Input from "../../GlobalComponents/Input"
import FieldHelperText from "../../GlobalComponents/FieldHelperText"
import TrashIcon from "../../Assets/Icons/TrashIcon"

const Form: React.FC = () => {
  // Default Values
  const defaultValues = {
    applicants: [
      {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        isPrimary: true,
      },
    ],
  }

  // Hooks
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Form Helpers
  const {
    formState: { errors, isValid },
    setValue,
    clearErrors,
    trigger,
    watch,
    handleSubmit,
  } = formMethods
  const applicants = watch("applicants")
  const deleteApplicant = (
    applicantToDelete: (typeof applicants)[number],
    applicantIndex: number
  ) => {
    applicants.length > 1 &&
      applicantIndex !== 0 &&
      setValue(
        "applicants",
        applicants?.filter((applicant) => applicant !== applicantToDelete)
      )
    clearErrors(`applicants.${applicantIndex}`)
    trigger()
  }

  const addNewApplicant = () => {
    trigger()
    if (isValid) {
      setValue(`applicants.${applicants.length}`, {
        ...defaultValues.applicants[0],
        isPrimary: false,
      })
    }
  }

  const onSubmit: SubmitHandler<Zod.infer<typeof formSchema>> = (
    formValues
  ) => {
    alert("Form Submitted! Please check the console to see the form values. ")
    console.log({ formValues })
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-3xl items-stretch w-full gap-7 bg-white rounded-xl shadow-2xl px-3 py-8 sm:px-12 sm:py-8 md:px-28 md:py-16 lg:px-32 lg:py-20"
      >
        <h1 className="pb-8 text-purple-medium">Application Form</h1>
        {applicants?.map((applicant, applicantIndex) => {
          const error =
            formMethods.formState.errors?.applicants?.[applicantIndex]
          return (
            <div
              id={`applicant-form-${applicantIndex}`}
              className={
                "FORM-CONTAINER flex flex-col gap-2 border-2 border-dashed shadow-blue-light shadow-lg rounded-xl p-8 mx-[-2px] " +
                (error
                  ? "border-pink-medium"
                  : "border-blue-medium border-opacity-70")
              }
              key={`applicant-form-${applicantIndex}`}
            >
              <div className="FORM-HEADER flex justify-between mb-4 border-b border-zinc-light ">
                <h3>Applicant Details</h3>
                {applicants.length > 1 && applicantIndex > 0 && (
                  <TrashIcon
                    width="20"
                    className="fill-zinc-dark hover:scale-105 hover:fill-pink-medium active:scale-75 active:duration-75 transition-all duration-200 ease-in-out cursor-pointer "
                    onClick={() => deleteApplicant(applicant, applicantIndex)}
                  />
                )}
              </div>
              <Input
                label="First name"
                name={`applicants[${applicantIndex}].firstName`}
              />
              <Input
                label="Last name"
                name={`applicants[${applicantIndex}].lastName`}
              />
              <Input
                label="Email"
                name={`applicants[${applicantIndex}].email`}
              />
              <Input
                label="Mobile Number"
                name={`applicants[${applicantIndex}].mobile`}
              />
              <CheckBox
                label="Primary Applicant"
                name={`applicants[${applicantIndex}].isPrimary`}
                isDisabled={applicants.length === 1}
              />
            </div>
          )
        })}

        <div className="ERROR-BLOCK relative flex pb-5">
          {errors && (
            <FieldHelperText
              errorMessage={
                errors?.applicants?.[applicants.length - 1]?.isPrimary?.message
              }
            />
          )}
        </div>

        <div className="BUTTON-CONTAINER relative flex flex-col gap-2">
          <Button
            type="button"
            label="+ Add another applicant"
            className="secondary-inverted-medium flk-shadow-purple "
            onClick={addNewApplicant}
          />
          <Button
            label={`Submit ${applicants?.length} ${
              applicants?.length === 1 ? "Applicant" : "Applicants"
            }`}
            type="submit"
            isDisabled={!applicants?.length}
            className="primary-medium flk-shadow-blue "
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
