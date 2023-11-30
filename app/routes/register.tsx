import RegisterForm from "~/components/RegisterForm"

const Register = () => {
  return (
    <div className="flex flex-row h-screen">
      <RegisterForm />
      <div className="flex flex-col text-left flex-1 justify-center p-4">
        <h1 className="text-9xl font-extrabold mb-4">Welcome!</h1>
        <p className="text-5xl f font-bold text-gray-600">
          Get ready to transform your fitness journey. Start customizing your perfect workout plan and embrace a healthier, stronger you. Let's achieve your goals together!"
        </p>
      </div>
    </div>
  )
}

export default Register