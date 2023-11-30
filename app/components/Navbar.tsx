
import { Form, Link } from "@remix-run/react"

const Navbar = () => {
  return (
    <nav className="flex p-4 justify-center">
      <div className="w-full">
        <div className="flex flex-row items-end justify-between">
          <Link to="/">
            <h1 className="cursor-pointer font-bold text-2xl">FITNESS PLATFORM</h1>
          </Link>
          <div>
            <ul className="flex flex-row">
              {/* <li className="font-semibold mx-2 text-lg cursor-pointer">Projects</li>
              <li className="font-semibold mx-2 text-lg cursor-pointer">Blog</li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar