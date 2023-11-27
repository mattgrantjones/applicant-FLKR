type ApplicantCardProps = {
  applicant: {
    firstName: string
    lastName: string
    mobile: string
    email: string
  }
  onClick: () => void
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant: { firstName, lastName, mobile, email },
  onClick,
}) => {
  return (
    <div>
      {firstName} {lastName} {mobile} {email}
      <span className="cursor-pointer p-5" onClick={onClick}>
        Edit
      </span>
    </div>
  )
}

export default ApplicantCard
