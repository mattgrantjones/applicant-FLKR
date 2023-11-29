import { useEffect } from "react"
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
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
    watch,
    handleSubmit,
    reset,
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
    if (!errors.applicants) {
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
    reset()
  }

  // Effect: Reset primary applicant if other applicants are deleted
  useEffect(() => {
    if (applicants?.length === 1 && !applicants[0].isPrimary) {
      setValue("applicants.0.isPrimary", true)
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicants.length])

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-3xl items-stretch w-full gap-7 bg-white bg-opacity-50 sm:bg-opacity-100 sm:rounded-xl shadow-2xl px-3 py-8 sm:px-12 sm:py-8 md:px-28 md:py-16 lg:px-32 lg:py-20"
      >
        <h1 className="text-gradient bg-gradient-to-br from-purple-light to-purple-dark">
          Application Form
        </h1>
        {applicants?.map((applicant, applicantIndex) => {
          const error =
            formMethods.formState.errors?.applicants?.[applicantIndex]
          return (
            <div
              id={`applicant-form-${applicantIndex}`}
              className={
                "FORM-CONTAINER flex flex-col gap-2 border-2 bg-white shadow-purple-light shadow-lg rounded-xl p-8 mx-[-2px] " +
                (error
                  ? "border-pink-medium ring-pink-medium "
                  : "border-blue-medium border-opacity-70 ring-blue-medium ") +
                (applicant.isPrimary ? "ring-2 " : "border-dashed ")
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
                type="number"
              />
              <CheckBox
                label="Primary Applicant"
                name={`applicants[${applicantIndex}].isPrimary`}
                isDisabled={applicants.length === 1}
              />
            </div>
          )
        })}
        {!!errors.root && (
          <div className="ERROR-PILL relative h-10 bg-[red] bg-opacity-50 sm:bg-white rounded-full">
            <FieldHelperText
              errorMessage={errors.root?.message}
              className="font-bold sm:font-normal left-4 -translate-y-1/2 text-white sm:text-pink-medium"
            />
          </div>
        )}

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
            className="primary-dark sm:primary-medium flk-shadow-blue "
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
