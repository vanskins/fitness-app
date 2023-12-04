import moment from "moment"

type FeedCardProps = {
  postedBy: any;
  routinePlan: string;
  createdAt: string;
}
const FeedCard = ({ postedBy, routinePlan, createdAt }: FeedCardProps) => {
  const convertRoutinePlan = (plan: string) => {
    const message = JSON.parse(plan).split("\n")
    return message.map((i: string, k: number) => {
      const divideTwo = message.length / 2;
      if (i === "") {
        return <br />
      }
      if (k === 0) {
        return (<p className="font-bold text-xl" key={k}>{i}</p>)
      } else if (k < divideTwo) {
        return (
          <p className="font-medium text-lg" key={k}>{i}</p>
        )
      } else {
        return null
      }
    })
  }

  return (
    <div className="shadow-lg m-10 p-10">
      <p className="text-xl font-bold text-blue-600 mt-4">@{postedBy.firstName}</p>
      <p className="text-lg mb-4 text-gray-400">{moment(createdAt).fromNow()}</p>
      {convertRoutinePlan(routinePlan)}
      <p className="text-xl font-bold text-blue-600">View more</p>
    </div>
  )
}

export default FeedCard