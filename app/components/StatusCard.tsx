import moment from "moment"

type statusCardProps = {
  postedBy: any;
  createdAt: string;
  post: string;
}

const StatusCard = ({ postedBy, createdAt, post }: statusCardProps) => {
  return (
    <div className="shadow-md p-6 w-full mx-10 my-10">
      <p className="text-xl font-bold text-blue-600">@{postedBy.firstName}</p>
      <p className="text-lg mb-4 text-gray-400">{moment(createdAt).fromNow()}</p>
      <p className="text-xl">{post}</p>
    </div>
  )
}

export default StatusCard